import { CodeViewerLanguage } from '@stoplight/mosaic-code-viewer';
import { Dictionary } from '@stoplight/types';
export declare type SupportedLanguage = string;
export declare type SupportedLibrary = string;
export interface LibraryConfig {
    httpSnippetLibrary: string;
}
export interface LanguageConfig {
    mosaicCodeViewerLanguage: CodeViewerLanguage;
    httpSnippetLanguage: string;
    libraries?: Dictionary<LibraryConfig, SupportedLibrary>;
}
export declare type RequestSampleConfigs = Dictionary<LanguageConfig, SupportedLanguage>;
export declare const requestSampleConfigs: RequestSampleConfigs;
