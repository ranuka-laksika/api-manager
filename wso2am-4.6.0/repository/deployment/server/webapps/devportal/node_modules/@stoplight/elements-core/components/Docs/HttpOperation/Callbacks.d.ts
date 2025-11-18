import { IHttpCallbackOperation } from '@stoplight/types';
import { ExtensionAddonRenderer } from '../Docs';
export interface CallbacksProps {
    callbacks: IHttpCallbackOperation[];
    isCompact?: boolean;
}
export interface CallbackProps {
    data: IHttpCallbackOperation;
    isCompact?: boolean;
    renderExtensionAddon?: ExtensionAddonRenderer;
}
export declare const Callbacks: {
    ({ callbacks, isCompact }: CallbacksProps): JSX.Element;
    displayName: string;
};
export declare const Callback: ({ data, isCompact }: CallbackProps) => JSX.Element;
