import { LightningElement, api } from 'lwc';
import locale from '@salesforce/i18n/locale';

export default class FlowCalendarDaySelectedRecordButton extends LightningElement {
    @api record?: Record<string, unknown>;
    @api dateTimeField?: string;
    @api dateTimeEndField?: string;

    formatTime(value: unknown): string {
        if (!value) return '';
        const dt = new Date(value as string | number);
        if (isNaN(dt.getTime())) return '';
        return dt.toLocaleTimeString(locale, { hour: 'numeric', minute: '2-digit' });
    }

    get formattedTime(): string {
        const start = this.formatTime(this.dateTimeField ? this.record?.[this.dateTimeField] : undefined);
        if (!start) return '';
        const end = this.dateTimeEndField ? this.formatTime(this.record?.[this.dateTimeEndField]) : null;
        return end ? `${start} – ${end}` : start;
    }

    handleRecordSelected(): void {
        this.dispatchEvent(new CustomEvent('recordselected', {
            detail: {
                record: this.record,
            },
            bubbles: true,
            composed: true,
        }));
    }
}
