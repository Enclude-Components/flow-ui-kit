import { LightningElement, api } from 'lwc';

export default class FlowField extends LightningElement {
    @api label?: string;
    @api value?: unknown;
    @api fieldType = 'text';

    get isEmpty(): boolean { return this.value === null || this.value === undefined || this.value === ''; }
    get isDateTime(): boolean { return this.fieldType === 'datetime'; }
    get isDate(): boolean     { return this.fieldType === 'date'; }
    get isNumber(): boolean   { return this.fieldType === 'number'; }
    get isCurrency(): boolean { return this.fieldType === 'currency'; }
    get isPercent(): boolean  { return this.fieldType === 'percent'; }
    get isPhone(): boolean    { return this.fieldType === 'phone'; }
    get isEmail(): boolean    { return this.fieldType === 'email'; }
    get isUrl(): boolean      { return this.fieldType === 'url'; }
}
