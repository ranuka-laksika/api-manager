import { IHttpEndpointOperation } from '@stoplight/types';
import { DocsComponentProps } from '..';
export declare type HttpOperationProps = DocsComponentProps<IHttpEndpointOperation>;
export declare const HttpOperation: import("react").FunctionComponent<HttpOperationProps & import("@stoplight/react-error-boundary").ErrorBoundaryProps<{}>>;
export declare function OperationHeader({ id, noHeading, hasBadges, name, isDeprecated, isInternal, hideServerUrl, method, path, }: {
    id: string;
    noHeading?: boolean;
    hasBadges?: boolean;
    name?: string;
    isDeprecated?: boolean;
    isInternal?: boolean;
    hideServerUrl?: boolean;
    method: string;
    path: string;
}): JSX.Element | null;
