import { LogoProps } from '../../types';
import type { TableOfContentsItem } from '../TableOfContents';
export declare const MobileTopNav: ({ name, logo, tree, pathname, onTocClick, }: {
    name: string;
    logo?: string | LogoProps | undefined;
    tree: TableOfContentsItem[];
    pathname: string;
    onTocClick(): void;
}) => JSX.Element;
