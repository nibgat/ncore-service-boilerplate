require("dotenv").config();

export const SERVER_ADDRESS = `${process.env.SERVER_ADDRESS}:${process.env.PORT}`;
export const PORT = process.env.PORT;

export const NAUTH_ADDRESS = "https://nauth.nibgat.space";
export const NAUTH_API_KEY = "YOUR_NAUTH_API_KEY";

export const RESET_PASSWORD_FIRST_LAP_TIMEOUT = 300;
export const RESET_PASSWORD_SECOND_LAP_TIMEOUT = 900;

export const RETHINKDB_ADDRESS = "rethinkdb";
export const RETHINKDB_PORT = 28015;

export let JWT_KEY = "YOUR_APP_NAME";
export const setJWTKey = (key) => {
    JWT_KEY = key;
};

export const DB = "YOUR_APP_NAME";

export const MAIL_CONFIGS = {
    host: "YOUR_SMTP_HOST",
    port: YOUR_SMTP_PORT,
    secure: false,
    auth: {
        user: "YOUR_SMTP_AUTH_USER",
        pass: "YOUR_SMTP_AUTH_PASS"
    },
    from: "YOUR_SMTP_FROM_MAIL"
};
