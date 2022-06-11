// Mutations:
import testMutation from "./mutations/test";

// Queries:
import testQuery from "./queries/test";
import subscriptionTest from "./queries/subscriptionTest";

// Subscriptions:
import testSubscription from "./subscriptions/test";

const resolvers = {
    Subscription: {
        test: testSubscription
    },
    Mutation: {
        test: testMutation
    },
    Query: {
        test: testQuery,
        subscriptionTest
    }
};
export default resolvers;
