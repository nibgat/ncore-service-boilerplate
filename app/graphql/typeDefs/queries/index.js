export default `
    type Query {
        test(
            parameter: String
        ): DefaultResponse,
        subscriptionTest: DefaultResponse
    }
`;
