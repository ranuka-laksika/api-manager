import { Dictionary, IHttpOperation, IMediaTypeContent, IServer } from '@stoplight/types';
import { Request as HarRequest } from 'har-format';
import { HttpSecuritySchemeWithValues } from './Auth/authentication-utils';
import { BodyParameterValues } from './Body/request-body-utils';
import { MockData } from './Mocking/mocking-utils';
interface BuildRequestInput {
    httpOperation: IHttpOperation;
    mediaTypeContent: IMediaTypeContent | undefined;
    parameterValues: Dictionary<string, string>;
    serverVariableValues: Dictionary<string, string>;
    bodyInput?: BodyParameterValues | string | File;
    mockData?: MockData;
    auth?: HttpSecuritySchemeWithValues[];
    chosenServer?: IServer | null;
    credentials?: 'omit' | 'include' | 'same-origin';
    corsProxy?: string;
}
export declare const getQueryParams: ({ httpOperation, parameterValues, }: Pick<BuildRequestInput, 'httpOperation'> & Pick<BuildRequestInput, 'parameterValues'>) => {
    name: string;
    value: string;
}[];
export declare function buildFetchRequest({ httpOperation, mediaTypeContent, bodyInput, parameterValues, serverVariableValues, mockData, auth, chosenServer, credentials, corsProxy, }: BuildRequestInput): Promise<Parameters<typeof fetch>>;
export declare function buildHarRequest({ httpOperation, bodyInput, parameterValues, serverVariableValues, mediaTypeContent, auth, mockData, chosenServer, corsProxy, }: BuildRequestInput): Promise<HarRequest>;
export declare function getAcceptedMimeTypes(httpOperation: IHttpOperation): string[];
export {};
