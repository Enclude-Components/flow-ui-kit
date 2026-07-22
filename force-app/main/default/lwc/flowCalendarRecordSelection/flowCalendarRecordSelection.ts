import { LightningElement, api } from 'lwc';
import locale from '@salesforce/i18n/locale';
import { FlowAttributeChangeEvent, FlowNavigationNextEvent } from 'lightning/flowSupport';
import type { CalendarDayModel } from 'c/flowCalendarDay';

type CalendarInputRecord = Record<string, unknown> & { Id?: string; Name?: string };

interface ValidationResult {
    isValid: boolean;
    errorMessage: string;
}

export default class FlowCalendarRecordSelection extends LightningElement {
    @api inputRecords: CalendarInputRecord[] = [];
    @api selectedRecord?: CalendarInputRecord;
    @api dateTimeField = '';
    @api required = false;
    daySelected: CalendarDayModel | null = null;

    handleDaySelected(event: CustomEvent<{ day: CalendarDayModel }>): void {
        if (!event?.detail?.day) return;
        this.daySelected = event.detail.day;
    }

    clearSelectedDay(): void {
        this.daySelected = null;
    }

    get daySelectedRecords(): Record<string, unknown>[] {
        return this.daySelected?.records || [];
    }

    get daySelectedDate(): string {
        if (!this.daySelected?.value) return '';
        const dateTime = this.daySelected.value;
        return dateTime.toLocaleDateString(locale, {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        });
    }

    get records(): { label: string; value: string }[] {
        return this.inputRecords.map((record) => ({
            label: record.Name ?? '',
            value: record.Id ?? '',
        }));
    }

    handleRecordSelected(event: CustomEvent<{ record: CalendarInputRecord }>): void {
        this.selectedRecord = event?.detail?.record;
        this.dispatchEvent(new FlowAttributeChangeEvent('selectedRecord', this.selectedRecord));
        this.dispatchEvent(
            new FlowNavigationNextEvent(),
        );
    }

    @api
    validate(): ValidationResult {
        return {
            isValid: !this.required || !!this.selectedRecord,
            errorMessage: 'Please Select a Record',
        };
    }
}
