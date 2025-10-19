import * as React from 'react';
import { LogoProps } from '../../types';
import type { TableOfContentsItem } from '../TableOfContents';
declare type ResponsiveSidebarLayoutProps = {
    maxContentWidth?: number;
    sidebarWidth?: number;
    children?: React.ReactNode;
    name: string;
    logo?: string | LogoProps;
    tree?: TableOfContentsItem[];
    onTocClick?(): void;
};
export declare const ResponsiveSidebarLayout: React.ForwardRefExoticComponent<ResponsiveSidebarLayoutProps & React.RefAttributes<HTMLDivElement>>;
export declare const Sidebar: ({ name, logo, tree, pathname, onTocClick, isInResponsiveMode, }: {
    name: string;
    logo?: string | LogoProps | undefined;
    tree: TableOfContentsItem[];
    pathname: string;
    onTocClick?(): void;
    isInResponsiveMode: boolean;
}) => JSX.Element;
export {};
