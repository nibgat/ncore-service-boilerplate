import {
    PubSub,
    withFilter as filter
} from "graphql-subscriptions";

export const pubsub = new PubSub();
export const withFilter = filter;

export const UPDATED_PRIVATE_INFO = "UPDATED_PRIVATE_INFO";
export const UPDATED_INFO_WITH_ID = "UPDATED_INFO_WITH_ID";
export const NEW_PRIVATE_INFO = "NEW_PRIVATE_INFO";
export const TEST = "TEST";
