import { LightningElement, api } from 'lwc';

export interface CalendarDayModel {
    key: string;
    value: Date;
    number: number;
    records: Record<string, unknown>[];
}

export default class FlowCalendarDay extends LightningElement {
    @api day: Partial<CalendarDayModel> = {};
    @api inputRecords: Record<string, unknown>[] = [];

    get styleClass(): string {
        const classes = ['calendar-day', 'slds-button', 'slds-m-top_small', 'slds-align_absolute-center'];
        if (this.disabled) {
            classes.push('slds-button_base');
        } else {
            classes.push('slds-button_outline-brand');
        }
        return classes.join(' ');
    }

    get dayNumber(): number | undefined {
        return this.day?.number;
    }

    get disabled(): boolean {
        return !this.day.records?.length;
    }

    handleDaySelected(): void {
        if (!this.disabled) {
            this.dispatchEvent(new CustomEvent('dayselected', {
                detail: {
                    day: this.day,
                },
                bubbles: true,
                composed: true,
            }));
        }
    }
}
