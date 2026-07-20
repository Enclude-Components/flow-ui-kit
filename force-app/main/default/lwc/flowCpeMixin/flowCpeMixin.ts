const EVT_TYPE_MAPPING  = 'configuration_editor_generic_type_mapping_changed';
const EVT_VALUE_CHANGED = 'configuration_editor_input_value_changed';

export interface FlowInputVariable {
    name: string;
    value: unknown;
}

export interface FlowGenericTypeMapping {
    typeName: string;
    typeValue: string;
}

export interface FlowBuilderContextVariable {
    name: string;
    isCollection?: boolean;
    objectType?: string;
}

export interface FlowBuilderContext {
    variables?: FlowBuilderContextVariable[];
}

type Constructor<T = object> = new (...args: any[]) => T;

interface DispatchEventHost {
    dispatchEvent(event: Event): boolean;
}

const FlowCpeMixin = <TBase extends Constructor<DispatchEventHost>>(Base: TBase) => class extends Base {

    // ── Generic type T ────────────────────────────────────────────────────

    declare inputVariables?: FlowInputVariable[];
    declare genericTypeMappings?: FlowGenericTypeMapping[];
    declare builderContext?: FlowBuilderContext;

    get objectType(): string {
        return this.genericTypeMappings?.find(({ typeName }) => typeName === 'T')?.typeValue ?? '';
    }

    get isObjectTypeEmpty(): boolean {
        return !this.objectType;
    }

    // ── Collection variable options filtered by T ─────────────────────────

    get collectionVariableOptions(): { label: string; value: string }[] {
        if (!this.objectType || !this.builderContext?.variables) return [];
        return this.builderContext.variables
            .filter(v => v.isCollection && v.objectType === this.objectType)
            .map(v => ({ label: v.name, value: v.name }));
    }

    // ── Helpers ───────────────────────────────────────────────────────────

    _inputVar(name: string): unknown {
        return this.inputVariables?.find(v => v.name === name)?.value;
    }

    _dispatchTypeMapping(typeName: string, typeValue: string): void {
        this.dispatchEvent(new CustomEvent(EVT_TYPE_MAPPING, {
            bubbles: true, cancelable: false, composed: true,
            detail: { typeName, typeValue },
        }));
    }

    _dispatchValueChanged(name: string, newValue: unknown, newValueDataType: string): void {
        this.dispatchEvent(new CustomEvent(EVT_VALUE_CHANGED, {
            bubbles: true, cancelable: false, composed: true,
            detail: { name, newValue, newValueDataType },
        }));
    }
};

export { FlowCpeMixin };
