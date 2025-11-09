import { HttpSecurityScheme } from '@stoplight/types';
import React from 'react';
interface SecuritySchemesProps {
    secSchemes: HttpSecurityScheme[][];
    defaultScheme?: string;
    defaultCollapsed?: boolean;
    parentId: string;
}
export declare const SecuritySchemes: React.FC<SecuritySchemesProps>;
export {};
