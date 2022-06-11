import {
    pubsub,
    TEST
} from "../../../constants";

const subscriptionTest = async (obj, args, context) => {
    const {
        userID
    } = context;

    pubsub.publish(
        TEST,
        {
            users: [
                userID
            ],
            test: {
                message: "Subscription başarıyla yakalandı.",
                code: 200
            }
        }
    );

    return {
        message: `Test erişimi (subscription) başarılı. Subscription tetiklendi.`,
        code: 200
    };
};
export default subscriptionTest;
