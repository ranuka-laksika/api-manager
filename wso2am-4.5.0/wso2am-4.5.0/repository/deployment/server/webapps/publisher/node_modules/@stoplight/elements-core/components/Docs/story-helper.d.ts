import type { ErrorBoundaryProps } from '@stoplight/react-error-boundary';
import type { Meta, StoryFn } from '@storybook/react';
import * as React from 'react';
import { ExtensionAddonRenderer } from './Docs';
declare type DocsProps = {
    data: any;
    renderExtensionAddon?: ExtensionAddonRenderer;
} & ErrorBoundaryProps;
declare type storyOptions = DocsProps & {
    layoutOptions?: object;
};
interface HelperReturn<P extends DocsProps> {
    meta: Meta<DocsProps>;
    createStory(name: string, input: storyOptions): StoryFn<P>;
    createHoistedStory(input: storyOptions): StoryFn<P>;
}
export declare const createStoriesForDocsComponent: (Component: React.ComponentType<DocsProps>, title?: string) => HelperReturn<DocsProps>;
export {};
