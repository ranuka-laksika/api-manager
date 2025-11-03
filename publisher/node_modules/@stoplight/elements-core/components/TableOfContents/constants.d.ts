import { IIconProps, ITextColorProps } from '@stoplight/mosaic';
import { HttpMethod } from '@stoplight/types';
export declare const NODE_TYPE_TITLE_ICON: Readonly<{
    [nodeType: string]: IIconProps['icon'];
}>;
export declare const NODE_GROUP_ICON: Readonly<{
    [itemType: string]: IIconProps['icon'];
}>;
export declare const NODE_TYPE_META_ICON: Readonly<{
    [nodeType: string]: IIconProps['icon'];
}>;
export declare const NODE_TYPE_ICON_COLOR: Readonly<{
    [nodeType: string]: ITextColorProps['color'];
}>;
export declare const NODE_GROUP_ICON_COLOR: Readonly<{
    [nodeType: string]: ITextColorProps['color'];
}>;
export declare const NODE_META_COLOR: Readonly<Record<HttpMethod, string>>;
