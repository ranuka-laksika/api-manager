import type { Dictionary, INodeVariable, IServer } from '@stoplight/types';
export declare type ServerVariable = INodeVariable & {
    name: string;
};
export declare const getServersToDisplay: (originalServers: IServer[], mockUrl: string | undefined, inlineDefaults: boolean) => IServer[];
export declare const getServerVariables: (server?: IServer | null) => ServerVariable[];
export declare const getServerVariableDefaults: (server: IServer) => Record<string, string>;
export declare function resolveUrl(urlString: string | null): string | null;
export declare const getServerUrlWithVariableValues: (server: IServer, values: Dictionary<string, string>) => string;
