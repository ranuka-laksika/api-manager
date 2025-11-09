import { RegularNode, SchemaNode } from '@stoplight/json-schema-tree';
import type { IHttpParam, INodeExample, INodeExternalExample } from '@stoplight/types';
import { JSONSchema7, JSONSchema7Definition } from 'json-schema';
export declare type ParameterSpec = Pick<IHttpParam, 'name' | 'schema' | 'required'> & {
    examples?: (Omit<INodeExample, 'id'> | Omit<INodeExternalExample, 'id'>)[];
};
export declare function parameterOptions(parameter: ParameterSpec): ({
    value: string | number;
} | {
    label: string;
    value: string;
})[] | null;
export declare const selectExampleOption: {
    value: string;
    label: string;
};
export declare function exampleOptions(parameter: ParameterSpec): {
    value: string;
    label: string;
}[] | null;
export declare function parameterSupportsFileUpload(parameter?: Pick<ParameterSpec, 'schema'>): boolean | undefined;
export declare function getPlaceholderForParameter(parameter: ParameterSpec): string;
export declare function getPlaceholderForSelectedParameter(parameter: ParameterSpec): string | undefined;
export declare const initialParameterValues: (params: readonly ParameterSpec[]) => Record<string, string>;
export declare function mapSchemaPropertiesToParameters(properties: {
    [key: string]: JSONSchema7Definition;
}, required: string[] | undefined): {
    required?: boolean | undefined;
    name: string;
    schema: JSONSchema7 | undefined;
    examples: {
        key: string;
        value: string | number | true | import("json-schema").JSONSchema7Object | import("json-schema").JSONSchema7Array;
    }[] | undefined;
}[];
export declare function toParameterSpec(jsonTreeNode: RegularNode): ParameterSpec;
export declare function isRequired(n: SchemaNode): boolean | undefined;
