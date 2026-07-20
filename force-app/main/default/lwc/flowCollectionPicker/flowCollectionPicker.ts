import { LightningElement, api } from 'lwc';

type PickerRecord = Record<string, unknown> & { Id: string };

interface ValidationResult {
    isValid: boolean;
    errorMessage?: string;
}

interface PickerOption {
    inputId: string;
    value: string;
    label: unknown;
    description?: unknown;
}

export default class FlowCollectionPicker extends LightningElement {
    @api records?: PickerRecord[];
    @api labelFieldName      = 'Name';
    @api descriptionFieldName?: string;
    @api iconName?: string;
    @api required            = false;

    _groupName = `picker-group-${Math.random().toString(36).slice(2)}`;
    _selectedRecord?: PickerRecord | null;
    selectedValue?: string | null;
    errorMessage?: string | null;

    @api
    get selectedRecord(): PickerRecord | null | undefined {
        return this._selectedRecord;
    }
    set selectedRecord(value: PickerRecord | null | undefined) {
        this._selectedRecord = value;
    }

    @api
    validate(): ValidationResult {
        if (this.required && !this._selectedRecord) {
            this.errorMessage = 'Please select a record.';
            return { isValid: false, errorMessage: this.errorMessage };
        }
        this.errorMessage = null;
        return { isValid: true };
    }

    get options(): PickerOption[] {
        if (!this.records) return [];
        return this.records.map(r => ({
            inputId:     `picker-${r.Id}`,
            value:       r.Id,
            label:       r[this.labelFieldName] ?? r.Id,
            description: this.descriptionFieldName ? r[this.descriptionFieldName] : undefined,
        }));
    }

    handleClick(e: Event): void {
        const target = e.target as HTMLInputElement;
        if (target.value === this.selectedValue) {
            this.selectedValue   = null;
            this._selectedRecord = null;
            target.checked       = false;
        }
    }

    handleChange(e: Event): void {
        const target = e.target as HTMLInputElement;
        this.selectedValue   = target.value;
        this._selectedRecord = this.records?.find(r => r.Id === this.selectedValue);
        this.errorMessage    = null;
    }
}
