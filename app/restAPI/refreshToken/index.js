import error_log from "error-printer";
import localize from "../../locales";
import axios from "axios";
import {
    NAUTH_ADDRESS,
    NAUTH_API_KEY
} from "../../constants";

const refreshToken = async ({
    req
}) => {
    const request = req.body;

    const locale = localize(request.lang || "en");

    try {
        return await axios({
            method: "POST",
            url: `${NAUTH_ADDRESS}/refreshToken`,
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
        const errorMessage = `${locale["unexpected-error-when-refresh-token"]}: ${err.message} ${locale["error-code"]}: f0bdd974894ae626b04f3eaca4355239`;
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
export default refreshToken;
