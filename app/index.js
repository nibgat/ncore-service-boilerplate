require("babel-core/register");
require("babel-polyfill");
require("dotenv").config();

import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import fs from "fs";
import {
    createServer as createHTTPServer
} from "http";
import {
    createServer as createHTTPSServer
} from "https";
import {
    setJWTKey,
    PORT
} from "./constants";
import {
    r
} from "./database";
import login from "./restAPI/login";
import register from "./restAPI/register";
import refreshToken from "./restAPI/refreshToken";
import createResetPasswordEvent from "./restAPI/resetPassword/createResetPasswordEvent";
import cancelResetPassword from "./restAPI/resetPassword/cancelResetPassword";
import codeControlForResetPassword from "./restAPI/resetPassword/codeControlForResetPassword";
import updatePasswordForResetPassword from "./restAPI/resetPassword/updatePasswordForResetPassword";
import {
    setOptions
} from "error-printer";
import localize from "./locales";
import getAuthStatus from "./authentication";
import schema from "./graphql";
import {
    graphqlHTTP
} from "express-graphql";
import {
    execute,
    subscribe
} from "graphql";
import {
    SubscriptionServer
} from "subscriptions-transport-ws";
import {
    MockData
} from "./initialize";

MockData();

const locale = localize("en");

setOptions({
    messageTitle: locale["error-message"],
    codeTitle: locale["error-code"],
    datePureTitle: locale["error-date-pure"],
    dateFormattedTitle: locale["error-date-formatted"]
});

const app = express();
app.use(cors());

const urlEncoded = bodyParser.urlencoded({
    extended: true
});
const jsonParser = bodyParser.json();

app.use("/graphql", async (req, res, next) => {
    if(!req.headers || !req.headers.authorization) {
        res.send({
            message: "Authorization required.",
            code: 403
        });
        return;
    }

    getAuthStatus({
        token: req.headers.authorization
    })
        .then((response) => {
            req.data = response.payload;
            next();
        })
        .catch((error) => {
            res.statusCode = error.code;
            res.send(error.message);
        });
},
graphqlHTTP((req) => ({
    schema: schema,
    context: req.data,
    graphiql: process.env.NODE_ENV === "development"
})));

app.post("/register", jsonParser, async (req, res) => {
    const result = await register({
        req
    });
    res.statusCode = result.code;
    res.send(result);
});

app.post("/login", jsonParser, async (req, res) => {
    const result = await login({
        req
    });
    res.statusCode = result.code;
    res.send(result);
});

app.post("/verify", jsonParser, async (req, res) => {
    const result = await verify({
        req
    });
    res.statusCode = result.code;
    res.send(result);
});

app.post("/refreshToken", jsonParser, async (req, res) => {
    const result = await refreshToken({
        req
    });
    res.statusCode = result.code;
    res.send(result);
});

app.post("/createResetPasswordEvent", jsonParser, async (req, res) => {
    const result = await createResetPasswordEvent({
        req
    });
    res.statusCode = result.code;
    res.send(result);
});

app.get("/cancelResetPassword", jsonParser, async (req, res) => {
    const result = await cancelResetPassword({
        req
    });
    if(typeof result === "string") {
        res.statusCode = 200;
    } else {
        res.statusCode = result.code;
    }
    res.send(result);
});

app.post("/codeControlForResetPassword", jsonParser, async (req, res) => {
    const result = await codeControlForResetPassword({
        req
    });
    res.statusCode = result.code;
    res.send(result);
});

app.post("/updatePasswordForResetPassword", jsonParser, async (req, res) => {
    const result = await updatePasswordForResetPassword({
        req
    });
    res.statusCode = result.code;
    res.send(result);
});

const createJWTKey = async () => {
    const newKey = await r.uuid();
    setJWTKey(newKey);
};
createJWTKey();

const wsServer = process.env.NODE_ENV === "production" ? createHTTPSServer(
    {
        key: fs.readFileSync(`/etc/letsencrypt/live/${process.env.DOMAIN}/privkey.pem`),
        cert: fs.readFileSync(`/etc/letsencrypt/live/${process.env.DOMAIN}/cert.pem`)
    },
    app
) : createHTTPServer(app);

SubscriptionServer.create(
    {
        execute,
        subscribe,
        schema,
        onConnect: (args, socket, context) => {
            if(!args.headers || !args.headers.authorization) {
                throw new Error("Authorization required.");
            }

            socket.authorization = args.headers.authorization;
        },
        onOperation: async (message, params, socket) => {
            try {
                const response = await getAuthStatus({
                    token: socket.authorization
                });

                if(response.code === 200) {
                    params.context = response.payload;
                    return {
                        params: params,
                        context: response.payload,
                        schema
                    };
                } else {
                    return false;
                }
            } catch(err) {
                throw new Error(err);
            }
        }
    },
    {
        server: wsServer,
        path: "/subscriptions"
    }
);
wsServer.listen(PORT, () => {
    console.log(`Server is ready on :${PORT}`);
});
