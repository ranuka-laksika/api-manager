import { Request } from 'har-format';
import React from 'react';
import { CodeSample } from './extractCodeSamples';
export interface RequestSamplesProps {
    request: Request;
    customCodeSamples?: CodeSample[];
    embeddedInMd?: boolean;
}
export declare const RequestSamples: React.NamedExoticComponent<RequestSamplesProps>;
