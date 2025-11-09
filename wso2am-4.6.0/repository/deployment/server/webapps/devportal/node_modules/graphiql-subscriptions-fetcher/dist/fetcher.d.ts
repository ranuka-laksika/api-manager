import { SubscriptionClient } from 'subscriptions-transport-ws';
export declare const graphQLFetcher: (subscriptionsClient: SubscriptionClient, fallbackFetcher: Function) => (graphQLParams: any) => any;
