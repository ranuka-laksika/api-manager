declare type ElementsNode = 'docs';
export declare enum ScreenType {
    Phone = 415,
    Tablet = 750,
    Resized_Browser = 980,
    Normal_Browser = 1000000
}
export declare const useResponsiveLayout: () => {
    isResponsiveLayoutEnabled: boolean;
    screenType: ScreenType | undefined;
    getElementsBreakpoint: (node: ElementsNode) => number;
};
export {};
