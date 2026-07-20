import { LightningElement, api } from 'lwc';
import LOCALE from '@salesforce/i18n/locale';
import TIMEZONE from '@salesforce/i18n/timeZone';

export default class FlowOutputField extends LightningElement {
    @api label?: string;
    @api value?: string;

    get formattedValue(): string | undefined {
        if (!this.value) return this.value;

        if (/^\d{4}-\d{2}-\d{2}T/.test(this.value)) {
            return new Intl.DateTimeFormat(LOCALE, {
                dateStyle: 'long',
                timeStyle: 'short',
                timeZone: TIMEZONE
            }).format(new Date(this.value));
        }

        if (/^\d{4}-\d{2}-\d{2}$/.test(this.value)) {
            return new Intl.DateTimeFormat(LOCALE, {
                dateStyle: 'long'
            }).format(new Date(this.value + 'T00:00:00'));
        }

        return this.value;
    }
}
