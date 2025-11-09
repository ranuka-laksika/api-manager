import { HttpSecurityScheme } from '@stoplight/types';
import * as React from 'react';
import { HttpSecuritySchemeWithValues } from './authentication-utils';
interface TryItAuthProps {
    operationSecuritySchemes: HttpSecurityScheme[][];
    operationAuthValue: HttpSecuritySchemeWithValues[] | undefined;
    setOperationAuthValue: React.Dispatch<HttpSecuritySchemeWithValues | undefined>;
    setCurrentScheme: React.Dispatch<HttpSecuritySchemeWithValues[] | undefined>;
}
export declare const TryItAuth: React.FC<TryItAuthProps>;
export {};
