import { IMediaTypeContent } from '@stoplight/types';
import * as React from 'react';
import { BodyParameterValues } from './request-body-utils';
export interface BinaryBodyProps {
    specification?: IMediaTypeContent;
    values: BodyParameterValues;
    onChangeValues: (newValues: BodyParameterValues) => void;
}
export declare const BinaryBody: React.FC<BinaryBodyProps>;
