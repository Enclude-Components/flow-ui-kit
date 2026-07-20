import { LightningElement, api } from 'lwc';
import { FlowAttributeChangeEvent } from 'lightning/flowSupport';

interface ValidationResult {
    isValid: boolean;
    errorMessage?: string;
}

export default class FlowConsent extends LightningElement {
    @api label?: string;
    hasError = false;
    _isChecked = false;

    @api
    get isChecked(): boolean {
        return this._isChecked;
    }
    set isChecked(value: boolean) {
        this._isChecked = value;
        if (value) {
            this.hasError = false;
        }
    }

    get formElementClass(): string {
        return this.hasError
            ? 'slds-form-element slds-has-error'
            : 'slds-form-element';
    }

    handleChange(event: Event): void {
        this.dispatchEvent(new FlowAttributeChangeEvent('isChecked', (event.target as HTMLInputElement).checked));
    }

    @api
    validate(): ValidationResult {
        if (!this._isChecked) {
            this.hasError = true;
            return { isValid: false, errorMessage: 'This field is required.' };
        }
        this.hasError = false;
        return { isValid: true };
    }
}
