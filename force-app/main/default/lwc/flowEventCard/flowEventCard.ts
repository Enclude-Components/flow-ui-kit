import { LightningElement, api } from 'lwc';
import LOCALE from '@salesforce/i18n/locale';
import TIMEZONE from '@salesforce/i18n/timeZone';

const DATE_FORMAT: Intl.DateTimeFormatOptions = { timeZone: TIMEZONE, weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' };
const TIME_FORMAT: Intl.DateTimeFormatOptions = { timeZone: TIMEZONE, hour: 'numeric', minute: '2-digit' };
const FULL_FORMAT: Intl.DateTimeFormatOptions = { ...DATE_FORMAT, ...TIME_FORMAT };

export default class FlowEventCard extends LightningElement {
    @api name?: string;
    @api startDatetime?: string;
    @api endDatetime?: string;
    @api scheduleSummary?: string;

    get _start(): Date | null { return this.startDatetime ? new Date(this.startDatetime) : null; }
    get _end(): Date | null   { return this.endDatetime   ? new Date(this.endDatetime)   : null; }
    get hasDatetime(): boolean { return !!(this._start || this._end); }

    get isSameDay(): boolean {
        if (!this._start || !this._end) return false;
        const fmt = new Intl.DateTimeFormat(LOCALE, { timeZone: TIMEZONE, dateStyle: 'short' });
        return fmt.format(this._start) === fmt.format(this._end);
    }

    get formattedDate(): string {
        return this._start ? new Intl.DateTimeFormat(LOCALE, DATE_FORMAT).format(this._start) : '';
    }

    get formattedTime(): string {
        if (!this._start) return '';
        const fmt = new Intl.DateTimeFormat(LOCALE, TIME_FORMAT);
        return this._end
            ? `${fmt.format(this._start)} – ${fmt.format(this._end)}`
            : fmt.format(this._start);
    }

    get formattedStartFull(): string {
        return this._start ? new Intl.DateTimeFormat(LOCALE, FULL_FORMAT).format(this._start) : '';
    }

    get formattedEndFull(): string {
        return this._end ? new Intl.DateTimeFormat(LOCALE, FULL_FORMAT).format(this._end) : '';
    }
}
