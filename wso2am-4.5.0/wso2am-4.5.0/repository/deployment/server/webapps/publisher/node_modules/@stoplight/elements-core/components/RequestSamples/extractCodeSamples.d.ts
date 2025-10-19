export declare type CodeSample = {
    lang: string;
    lib?: string;
    label: string;
    source: string;
};
export declare const extractCodeSamples: (obj: unknown) => CodeSample[];
