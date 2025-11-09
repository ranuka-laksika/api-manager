import { IHttpEndpointOperation } from '@stoplight/types';
export interface ResponseExamplesProps {
    httpOperation: IHttpEndpointOperation;
    responseStatusCode?: string;
    responseMediaType?: string;
}
export declare const ResponseExamples: ({ httpOperation, responseMediaType, responseStatusCode }: ResponseExamplesProps) => JSX.Element | null;
