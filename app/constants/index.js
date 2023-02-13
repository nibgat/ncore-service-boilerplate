require("dotenv").config();

export const SERVER_ADDRESS = `${process.env.SERVER_ADDRESS}:${process.env.PORT}`;
export const PORT = process.env.PORT;

export const RESET_PASSWORD_FIRST_LAP_TIMEOUT = 300;
export const RESET_PASSWORD_SECOND_LAP_TIMEOUT = 900;

export const RETHINKDB_ADDRESS = "rethinkdbYN";
export const RETHINKDB_PORT = 28015;

export let JWT_KEY = "yardimnerede";
export const setJWTKey = (key) => {
    JWT_KEY = key;
};

export const DB = "yardimnerede";

export const MAIL_CONFIGS = {
    host: "mail.nibgat.com",
    port: 587,
    secure: false,
    auth: {
        user: "system@nibgat.com",
        pass: "a35f81633ccc9fe8af4e654ac3f04442"
    },
    from: "noreply@nibgat.com"
};
