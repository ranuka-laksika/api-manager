"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var graphql_1 = require("graphql");
var hasSubscriptionOperation = function (graphQlParams) {
    var queryDoc = graphql_1.parse(graphQlParams.query);
    for (var _i = 0, _a = queryDoc.definitions; _i < _a.length; _i++) {
        var definition = _a[_i];
        if (definition.kind === 'OperationDefinition') {
            var operation = definition.operation;
            if (operation === 'subscription') {
                return true;
            }
        }
    }
    return false;
};
exports.graphQLFetcher = function (subscriptionsClient, fallbackFetcher) {
    var activeSubscriptionId = null;
    return function (graphQLParams) {
        if (subscriptionsClient && activeSubscriptionId !== null) {
            subscriptionsClient.unsubscribe(activeSubscriptionId);
        }
        if (subscriptionsClient && hasSubscriptionOperation(graphQLParams)) {
            return {
                subscribe: function (observer) {
                    observer.next('Your subscription data will appear here after server publication!');
                    activeSubscriptionId = subscriptionsClient.subscribe({
                        query: graphQLParams.query,
                        variables: graphQLParams.variables,
                    }, function (error, result) {
                        if (error) {
                            observer.error(error);
                        }
                        else {
                            observer.next(result);
                        }
                    });
                },
            };
        }
        else {
            return fallbackFetcher(graphQLParams);
        }
    };
};
//# sourceMappingURL=fetcher.js.map