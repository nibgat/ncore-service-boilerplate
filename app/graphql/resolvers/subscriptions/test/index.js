import {
    pubsub,
    withFilter,
    TEST
} from "../../../constants";

const test = {
    subscribe: withFilter(
        () => pubsub.asyncIterator(TEST),
        (payload, variables, context, info) => {
            return payload.users.includes(context.userID);
        }
    )
};
export default test;
