import { Meta, StoryObj } from '@storybook/react';
import { AdditionalInfo } from './AdditionalInfo';
declare const meta: Meta<typeof AdditionalInfo>;
export default meta;
declare type Story = StoryObj<typeof AdditionalInfo>;
export declare const LicenseWithOnlyURL: Story;
export declare const LicenseWithOnlyIdentifier: Story;
export declare const LicenseWithURLAndIdentifier: Story;
