import { Request as HarFormatRequest } from 'har-format';
export declare const convertRequestToSample: (language: string, library: string | undefined, request: HarFormatRequest) => Promise<string | null>;
