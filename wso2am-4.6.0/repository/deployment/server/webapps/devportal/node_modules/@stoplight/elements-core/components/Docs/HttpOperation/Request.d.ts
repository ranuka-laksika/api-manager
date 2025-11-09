import { IHttpEndpointOperation } from '@stoplight/types';
import * as React from 'react';
interface IRequestProps {
    operation: IHttpEndpointOperation;
    hideSecurityInfo?: boolean;
    onChange?: (requestBodyIndex: number) => void;
    isHttpWebhookOperation?: boolean;
}
export declare const Request: React.FunctionComponent<IRequestProps>;
export {};
