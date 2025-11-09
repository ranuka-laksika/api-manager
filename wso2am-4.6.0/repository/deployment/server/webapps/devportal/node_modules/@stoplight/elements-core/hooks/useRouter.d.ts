import * as React from 'react';
import { RouterType } from '../types';
interface RouterProps {
    basename?: string;
    location?: string;
}
export declare const useRouter: (router: RouterType, basePath: string, staticRouterPath?: string) => {
    Router: React.ComponentType<{}>;
    routerProps: RouterProps;
};
export {};
