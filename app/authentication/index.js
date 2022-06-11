import {
    NAUTH_ADDRESS
} from "../constants";
import axios from "axios";

const getAuthStatus = ({
    token
}) => {
    return new Promise(async (resolve, reject) => {
        if(process.env.NODE_ENV === "development" && token === "bebed427c48e6c1f296ab13f1fb31fc4") {
            resolve({
                userID: "bebed427c48e6c1f296ab13f1fb31fc4",
                lang: "en"
            });
        }

        try {
            axios(`${NAUTH_ADDRESS}/verify`, {
                method: "POST",
                data: JSON.stringify({
                    token: token
                }),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            })
                .then((response) => {
                    const _response = response.data;
                    if(_response.code === 200) {
                        resolve(response.data);
                    }
                })
                .catch((err) => {
                    reject(err.response.data);
                });
        } catch(err) {
            reject({
                message: err.message,
                code: 503
            });
        }
    });
};
export default getAuthStatus;
