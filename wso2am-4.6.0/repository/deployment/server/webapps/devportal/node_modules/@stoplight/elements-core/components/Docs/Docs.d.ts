import { SchemaNode } from '@stoplight/json-schema-tree';
import type { NodeHasChangedFn, NodeType } from '@stoplight/types';
import { Location } from 'history';
import * as React from 'react';
import { ParsedNode } from '../../types';
import { ReferenceResolver } from '../../utils/ref-resolving/ReferenceResolver';
import { ExportButtonProps } from './HttpService/ExportButton';
declare type NodeUnsupportedFn = (err: 'dataEmpty' | 'invalidType' | Error) => void;
export declare type VendorExtensionsData = Record<string, unknown>;
export declare type ExtensionRowProps = {
    schemaNode: SchemaNode;
    nestingLevel: number;
    vendorExtensions: VendorExtensionsData;
};
export declare type ExtensionAddonRenderer = (props: ExtensionRowProps) => React.ReactNode;
interface BaseDocsProps {
    className?: string;
    uri?: string;
    location?: Location;
    nodeTitle?: string;
    allowRouting?: boolean;
    exportProps?: ExportButtonProps;
    tryItCredentialsPolicy?: 'omit' | 'include' | 'same-origin';
    tryItCorsProxy?: string;
    layoutOptions?: {
        hideTryIt?: boolean;
        hideSamples?: boolean;
        hideTryItPanel?: boolean;
        noHeading?: boolean;
        showPoweredByLink?: boolean;
        hideModelExamples?: boolean;
        hideServerInfo?: boolean;
        hideSecurityInfo?: boolean;
        hideExport?: boolean;
        compact?: number | boolean;
    };
    nodeHasChanged?: NodeHasChangedFn<React.ReactNode>;
    nodeUnsupported?: NodeUnsupportedFn;
    renderExtensionAddon?: ExtensionAddonRenderer;
}
export interface DocsProps extends BaseDocsProps {
    nodeType: NodeType;
    nodeData: unknown;
    useNodeForRefResolving?: boolean;
    refResolver?: ReferenceResolver;
    maxRefDepth?: number;
}
export interface DocsComponentProps<T = unknown> extends BaseDocsProps {
    data: T;
}
export declare const Docs: React.NamedExoticComponent<DocsProps>;
export interface ParsedDocsProps extends BaseDocsProps {
    node: ParsedNode;
}
export declare const ParsedDocs: ({ node, nodeUnsupported, ...commonProps }: ParsedDocsProps) => JSX.Element | null;
export { DocsSkeleton } from './Skeleton';
