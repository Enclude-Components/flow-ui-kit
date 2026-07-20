declare module 'lightning/flowSupport' {
    export const FlowNavigationNextEventName: string;
    export const FlowNavigationBackEventName: string;
    export const FlowNavigationPauseEventName: string;
    export const FlowNavigationFinishEventName: string;
    export const FlowAttributeChangeEventName: string;

    export class FlowNavigationNextEvent extends CustomEvent<void> {
        constructor();
    }

    export class FlowNavigationBackEvent extends CustomEvent<void> {
        constructor();
    }

    export class FlowNavigationPauseEvent extends CustomEvent<void> {
        constructor();
    }

    export class FlowNavigationFinishEvent extends CustomEvent<void> {
        constructor();
    }

    export class FlowAttributeChangeEvent extends CustomEvent<{
        attributeName: string;
        attributeValue: unknown;
    }> {
        constructor(attributeName: string, attributeValue: unknown);
    }
}
