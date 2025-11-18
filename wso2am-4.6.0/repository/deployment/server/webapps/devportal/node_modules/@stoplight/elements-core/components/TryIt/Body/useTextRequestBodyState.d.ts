import { IMediaTypeContent } from '@stoplight/types';
import * as React from 'react';
export declare const useTextRequestBodyState: (mediaTypeContent: IMediaTypeContent | undefined, skipReadOnly: boolean) => [string, React.Dispatch<React.SetStateAction<string>>];
