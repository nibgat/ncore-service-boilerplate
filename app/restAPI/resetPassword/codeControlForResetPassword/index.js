import error_log from "error-printer";
import localize from "../../../locales";
import axios from "axios";
import {
    NAUTH_ADDRESS,
    NAUTH_API_KEY
} from "../../../constants";

const codeControlForResetPassword = async ({
    req
}) => {
    const request = req.body;

    const currentLocale = request.lang || "en";
    const locale = localize(currentLocale);

    try {
        return await axios({
            method: "POST",
            url: `${NAUTH_ADDRESS}/codeControlForResetPassword`,
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Api-Key": NAUTH_API_KEY
            },
            data: JSON.stringify(request)
        })
            .then((response) => {
                return response.data;
            })
            .catch((err) => {
                return err.response.data;
            });
    } catch(err) {
        const errorMessage = `${locale["unexpected-error-when-code-control-for-reset-password"]} ${err.message} ${locale["error-code"]}: 82fb4fc49e6f94bc6aacf9912b4d796c`;
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
export default codeControlForResetPassword;
