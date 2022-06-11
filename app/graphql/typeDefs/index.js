import subscriptions from "./subscriptions";
import mutations from "./mutations";
import queries from "./queries";

import DefaultResponse from "./spesificTypes/defaultResponse";

export default `
    scalar Upload,

    ${DefaultResponse},
    ${subscriptions}
    ${mutations},
    ${queries}
`;
