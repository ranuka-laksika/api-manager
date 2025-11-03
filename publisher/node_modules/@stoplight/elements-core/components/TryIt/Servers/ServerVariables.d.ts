import * as React from 'react';
import { ServerVariable } from '../../../utils/http-spec/IServer';
interface ServerVariablesProps<P extends keyof any = string> {
    variables: readonly ServerVariable[];
    values: Record<P, string>;
    onChangeValue: (op: 'set' | 'unset', variableName: P, newValue: string) => void;
}
export declare const ServerVariables: React.FC<ServerVariablesProps>;
export {};
