import error_log from "error-printer";
import localize from "../../../locales";
import axios from "axios";
import {
    NAUTH_ADDRESS,
    NAUTH_API_KEY
} from "../../../constants";

const cancelResetPassword = async ({
    req
}) => {
    const request = req.query;

    const currentLocale = request.lang || "en";
    const locale = localize(currentLocale);

    try {
        return await axios({
            method: "GET",
            url: `${NAUTH_ADDRESS}/cancelResetPassword`,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Api-Key": NAUTH_API_KEY
            },
            params: request
        })
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                return err.response.data;
            });
    } catch(err) {
        const errorMessage = `${locale["unexpected-error-when-cancel-reset-password"]} ${err.message} ${locale["error-code"]}: 5de637f40215bbaf17cb57d4c4610cfb`;
        error_log({
            messageTitle: locale["error-message"],
            codeTitle: locale["error-code"],
            datePureTitle: locale["error-date-pure"],
            dateFormattedTitle: locale["error-date-formatted"],
            message: errorMessage,
            code: 500
        });
        return {
            message: errorMessage,
            code: 500
        };
    }
};
export default cancelResetPassword;
