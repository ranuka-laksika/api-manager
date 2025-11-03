import type { IHttpEndpointOperation } from '@stoplight/types';
import { Request as HarRequest } from 'har-format';
import * as React from 'react';
export interface TryItProps {
    httpOperation: IHttpEndpointOperation;
    mockUrl?: string;
    onRequestChange?: (currentRequest: HarRequest) => void;
    requestBodyIndex?: number;
    embeddedInMd?: boolean;
    hideTryItPanel?: boolean;
    tryItCredentialsPolicy?: 'omit' | 'include' | 'same-origin';
    corsProxy?: string;
}
export declare const TryIt: React.FC<TryItProps>;
