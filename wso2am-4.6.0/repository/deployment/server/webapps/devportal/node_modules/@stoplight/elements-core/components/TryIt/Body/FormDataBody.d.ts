import { Choice } from '@stoplight/json-schema-viewer';
import { IMediaTypeContent } from '@stoplight/types';
import * as React from 'react';
import { BodyParameterValues, ParameterOptional } from './request-body-utils';
export interface FormDataBodyProps {
    specification: IMediaTypeContent;
    values: BodyParameterValues;
    onChangeValues: (newValues: BodyParameterValues) => void;
    onChangeParameterAllow: (newValue: ParameterOptional) => void;
    isAllowedEmptyValues: ParameterOptional;
}
export declare const FormDataBody: React.FC<FormDataBodyProps>;
export interface OneOfMenuProps {
    choices: Choice[];
    choice: Choice;
    onChange: (choice: Choice) => void;
}
export declare function OneOfMenu({ choices: subSchemas, choice, onChange }: OneOfMenuProps): JSX.Element | null;
