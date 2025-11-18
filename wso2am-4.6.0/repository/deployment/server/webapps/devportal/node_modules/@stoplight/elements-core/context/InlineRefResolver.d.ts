import * as React from 'react';
import { ReferenceResolver } from '../utils/ref-resolving/ReferenceResolver';
declare type InlineRefResolverContext = {
    resolver: ReferenceResolver | undefined;
    maxRefDepth: number | undefined;
};
declare const InlineRefResolverContext: React.Context<InlineRefResolverContext | undefined>;
declare type InlineRefResolverProviderProps = {
    document?: unknown;
    resolver?: ReferenceResolver;
    maxRefDepth?: number;
};
export declare const InlineRefResolverProvider: React.FC<InlineRefResolverProviderProps>;
export declare const useInlineRefResolver: () => InlineRefResolverContext | undefined;
export declare const useDocument: () => object | undefined;
export declare const useResolvedObject: (currentObject: object) => object;
export declare const useSchemaInlineRefResolver: () => [ReferenceResolver, number | undefined];
export {};
