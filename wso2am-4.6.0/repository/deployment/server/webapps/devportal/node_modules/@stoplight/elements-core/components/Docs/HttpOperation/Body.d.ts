import { IHttpOperationRequestBody } from '@stoplight/types';
export interface BodyProps {
    body: IHttpOperationRequestBody;
    onChange?: (requestBodyIndex: number) => void;
    isHttpWebhookOperation?: boolean;
}
export declare const isBodyEmpty: (body?: BodyProps['body']) => boolean;
export declare const Body: {
    ({ body, onChange, isHttpWebhookOperation }: BodyProps): JSX.Element | null;
    displayName: string;
};
