import { LightningElement, api, track } from 'lwc';
import type { CalendarDayModel } from 'c/flowCalendarDay';

const MONTH_NAMES = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December',
];

const DAYS_OF_WEEK = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'];

export default class FlowCalendar extends LightningElement {
    @api inputRecords: Record<string, unknown>[] = [];
    @api dateTimeField = '';
    @track currentDate = new Date();
    selectedDate: Date | null = null;

    // One-time cache built when component initializes
    _recordsByDate = new Map<string, Record<string, unknown>[]>();
    _cacheBuilt = false;

    get monthYearTitle(): string {
        return `${MONTH_NAMES[this.currentDate.getMonth()]} ${this.currentDate.getFullYear()}`;
    }

    get daysOfWeek(): string[] {
        return DAYS_OF_WEEK;
    }

    get calendarDays(): CalendarDayModel[] {
        // Build cache once on first access
        if (!this._cacheBuilt) {
            this.buildRecordsCache();
        }

        const year = this.currentDate.getFullYear();
        const month = this.currentDate.getMonth();

        // Pre-calculate commonly used dates
        const firstDay = new Date(year, month, 1);
        const lastDay = new Date(year, month + 1, 0).getDate();
        const prevMonthLastDay = new Date(year, month, 0).getDate();

        // Calculate start day once
        let startDay = firstDay.getDay();
        startDay = startDay === 0 ? 6 : startDay - 1; // Convert to Monday start

        const days: CalendarDayModel[] = [];

        // Add previous month's trailing days
        for (let i = startDay - 1; i >= 0; i--) {
            const dayNum = prevMonthLastDay - i;
            const date = new Date(year, month - 1, dayNum);
            days.push({
                key: this.getDateKey(date),
                value: date,
                number: dayNum,
                records: [], // Previous month days have no records
            });
        }

        // Add current month's days
        for (let dayNum = 1; dayNum <= lastDay; dayNum++) {
            const date = new Date(year, month, dayNum);
            const dateKey = this.getDateKey(date);
            days.push({
                key: dateKey,
                value: date,
                number: dayNum,
                records: this._recordsByDate.get(dateKey) || [],
            });
        }

        // Add next month's leading days
        const remainingCells = 42 - days.length;
        for (let dayNum = 1; dayNum <= remainingCells; dayNum++) {
            const date = new Date(year, month + 1, dayNum);
            days.push({
                key: this.getDateKey(date),
                number: dayNum,
                value: date,
                records: [], // Next month days have no records
            });
        }

        return days;
    }

    handlePreviousMonth(): void {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() - 1, 1);
    }

    handleNextMonth(): void {
        this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 1);
    }

    // Build the cache once when component loads
    buildRecordsCache(): void {
        this._recordsByDate.clear();

        if (this.inputRecords && this.dateTimeField) {
            for (const record of this.inputRecords) {
                const dateValue = record[this.dateTimeField] as string | number | undefined;
                if (dateValue) {
                    const date = new Date(dateValue);
                    if (!isNaN(date.getTime())) { // Valid date check
                        const dateKey = this.getDateKey(date);

                        if (!this._recordsByDate.has(dateKey)) {
                            this._recordsByDate.set(dateKey, []);
                        }
                        this._recordsByDate.get(dateKey)!.push(record);
                    }
                }
            }
        }

        this._cacheBuilt = true;
    }

    // Consistent date key generation
    getDateKey(date: Date): string {
        return `${date.getFullYear()}-${String(date.getMonth()).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')}`;
    }

    // Public method for getting records for a specific date
    getDateRecords(date: Date): Record<string, unknown>[] {
        if (!this._cacheBuilt) {
            this.buildRecordsCache();
        }
        const dateKey = this.getDateKey(date);
        return this._recordsByDate.get(dateKey) || [];
    }
}
