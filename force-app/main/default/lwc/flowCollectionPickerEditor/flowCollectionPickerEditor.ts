import { LightningElement, api } from 'lwc';
import { FlowCpeMixin, type FlowInputVariable, type FlowGenericTypeMapping, type FlowBuilderContext } from 'c/flowCpeMixin';

export default class FlowCollectionPickerEditor extends FlowCpeMixin(LightningElement) {
    @api inputVariables: FlowInputVariable[] | undefined = undefined;
    @api genericTypeMappings: FlowGenericTypeMapping[] | undefined = undefined;
    @api builderContext: FlowBuilderContext | undefined = undefined;

    // ── Getters ───────────────────────────────────────────────────────────

    get recordsValue(): unknown {
        return this._inputVar('records');
    }

    get labelFieldNameValue(): unknown {
        return this._inputVar('labelFieldName') ?? 'Name';
    }

    get descriptionFieldNameValue(): unknown {
        return this._inputVar('descriptionFieldName') ?? '';
    }

    get iconNameValue(): unknown {
        return this._inputVar('iconName') ?? '';
    }

    get requiredValue(): unknown {
        return this._inputVar('required') ?? false;
    }

    // ── Handlers ──────────────────────────────────────────────────────────

    handleObjectTypeChange(event: Event): void {
        this._dispatchTypeMapping('T', (event.target as HTMLInputElement).value);
    }

    handleRecordsChange(event: CustomEvent<{ value: string }>): void {
        this._dispatchValueChanged('records', event.detail.value, 'reference');
    }

    handleStringChange(event: CustomEvent<{ value: string }>): void {
        const name = (event.target as HTMLElement).dataset.name as string;
        this._dispatchValueChanged(name, event.detail.value, 'String');
    }

    handleRequiredChange(event: CustomEvent<{ checked: boolean }>): void {
        this._dispatchValueChanged('required', event.detail.checked, 'Boolean');
    }
}
