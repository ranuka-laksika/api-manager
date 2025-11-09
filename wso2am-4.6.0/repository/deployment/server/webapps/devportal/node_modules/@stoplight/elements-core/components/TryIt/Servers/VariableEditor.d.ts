import { SelectProps } from '@stoplight/mosaic';
import * as React from 'react';
import { ServerVariable } from '../../../utils/http-spec/IServer';
interface VariableProps {
    variable: ServerVariable;
    value?: string;
    onChange: SelectProps['onChange'];
    validate?: boolean;
}
export declare const VariableEditor: React.FC<VariableProps>;
export {};
