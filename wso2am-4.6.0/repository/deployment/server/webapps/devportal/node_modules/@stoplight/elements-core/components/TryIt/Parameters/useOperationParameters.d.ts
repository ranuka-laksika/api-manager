import { IHttpEndpointOperation } from '@stoplight/types';
import { ParameterSpec } from './parameter-utils';
export declare const useRequestParameters: (httpOperation: IHttpEndpointOperation) => {
    allParameters: ParameterSpec[];
    parameterValuesWithDefaults: {
        [k: string]: string;
    };
    updateParameterValue: (name: string, value: string) => void;
};
