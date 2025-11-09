import { IHttpOperationResponse } from '@stoplight/types';
interface ResponsesProps {
    responses: IHttpOperationResponse[];
    onMediaTypeChange?: (mediaType: string) => void;
    onStatusCodeChange?: (statusCode: string) => void;
    isCompact?: boolean;
}
export declare const Responses: {
    ({ responses: unsortedResponses, onStatusCodeChange, onMediaTypeChange, isCompact, }: ResponsesProps): JSX.Element | null;
    displayName: string;
};
export {};
