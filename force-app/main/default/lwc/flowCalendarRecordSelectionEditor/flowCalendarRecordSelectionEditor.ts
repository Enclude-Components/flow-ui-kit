import { LightningElement, api, wire } from 'lwc';
import { getObjectInfo, type ObjectInfoWireResult } from 'lightning/uiObjectInfoApi';
import type { FlowInputVariable, FlowGenericTypeMapping, FlowBuilderContext } from 'c/flowCpeMixin';

export default class FlowCalendarRecordSelectionEditor extends LightningElement {
    /*===========================================
     Input Variables
    ===========================================*/
    @api inputVariables: FlowInputVariable[] | undefined = undefined;
    @api builderContext: FlowBuilderContext | undefined = undefined;
    @api genericTypeMappings: FlowGenericTypeMapping[] | undefined = undefined;
    /*===========================================
     Wires
    ===========================================*/
    @wire(getObjectInfo, { objectApiName: '$inputType' })
    wiredSObjectDescribe?: ObjectInfoWireResult;
    /*===========================================
     Getters
    ===========================================*/
    get inputRecordsValue(): unknown {
        const param = this.inputVariables?.find(({ name }) => name === 'inputRecords');
        return param && param.value;
    }
    get inputType(): string | undefined {
        const typeMapping = this.genericTypeMappings?.find(({ typeName }) => typeName === 'T');
        return typeMapping && typeMapping.typeValue;
    }
    get dateTimeFieldValue(): unknown {
        const param = this.inputVariables?.find(({ name }) => name === 'dateTimeField');
        return param && param.value;
    }
    get requiredValue(): unknown {
        const param = this.inputVariables?.find(({ name }) => name === 'required');
        return param && param.value;
    }
    get dateTimeFieldOptions(): { label: string; value: string }[] {
        const fields = this.wiredSObjectDescribe?.data?.fields || {};
        const dateTimeFields = Object.values(fields).filter((field) => field.dataType === 'DateTime');
        return dateTimeFields.map((field) => ({
            label: field.apiName,
            value: field.apiName,
        }));
    }
    get valueOptions(): { label: string; value: string }[] {
        if (!this.inputType || !this.builderContext?.variables) {
            return [];
        }
        return this.builderContext.variables
            .filter((variable) => variable.isCollection && variable.objectType === this.inputType)
            .map((variable) => ({
                label: variable.name,
                value: variable.name,
            }));
    }
    get isDisabled(): boolean {
        return !this.inputType;
    }
    /*===========================================
     Methods
    ===========================================*/
    handleInputTypeChange(event: Event): void {
        if (!(event as CustomEvent).detail) return;
        this.dispatchEvent(new CustomEvent('configuration_editor_generic_type_mapping_changed', {
            bubbles: true,
            cancelable: false,
            composed: true,
            detail: {
                typeName: 'T',
                typeValue: (event.target as HTMLInputElement).value,
            },
        }));
    }
    handleRequiredChange(event: CustomEvent<{ checked: boolean }>): void {
        if (!event?.detail) return;
        this.dispatchEvent(new CustomEvent('configuration_editor_input_value_changed', {
            bubbles: true,
            cancelable: false,
            composed: true,
            detail: {
                name: 'required',
                newValue: event.detail.checked,
                newValueDataType: 'Boolean',
            },
        }));
    }
    handleRecordCollectionSelection(event: CustomEvent<{ value: string }>): void {
        if (!event?.detail) return;
        this.dispatchEvent(new CustomEvent('configuration_editor_input_value_changed', {
            bubbles: true,
            cancelable: false,
            composed: true,
            detail: {
                name: 'inputRecords',
                newValue: event.detail.value,
                newValueDataType: 'reference',
            },
        }));
    }
    handleDateTimeSelection(event: CustomEvent<{ value: string }>): void {
        if (!event?.detail) return;
        this.dispatchEvent(new CustomEvent('configuration_editor_input_value_changed', {
            bubbles: true,
            cancelable: false,
            composed: true,
            detail: {
                name: 'dateTimeField',
                newValue: event.detail.value,
                newValueDataType: 'String',
            },
        }));
    }
}
