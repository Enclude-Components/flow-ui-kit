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

declare module 'lightning/uiObjectInfoApi' {
    import type { WireAdapterConstructor } from 'lwc';

    export interface FieldInfo {
        apiName: string;
        dataType: string;
        label: string;
        [key: string]: unknown;
    }

    export interface ObjectInfo {
        apiName: string;
        fields: Record<string, FieldInfo>;
        [key: string]: unknown;
    }

    export interface ObjectInfoWireResult {
        data?: ObjectInfo;
        error?: unknown;
    }

    export const getObjectInfo: WireAdapterConstructor<{ objectApiName: string }, ObjectInfoWireResult>;
}
