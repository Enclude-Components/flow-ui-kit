import { createElement } from 'lwc';
import FlowCalendar from 'c/flowCalendar';

describe('c/flowCalendar', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('renders the current month title and navigates to the next month', () => {
        const element = createElement<FlowCalendar>('c-flow-calendar', { is: FlowCalendar });
        document.body.appendChild(element);

        const initialTitle = element.shadowRoot!.querySelector('h2')!.textContent;
        expect(initialTitle).toMatch(/^[A-Z][a-z]+ \d{4}$/);

        const [, nextButton] = element.shadowRoot!.querySelectorAll<HTMLElement>('lightning-button-icon');
        nextButton.click();

        return Promise.resolve().then(() => {
            expect(element.shadowRoot!.querySelector('h2')!.textContent).not.toBe(initialTitle);
        });
    });

    it('places records under the calendar day matching their date-time field', () => {
        const element = createElement<FlowCalendar>('c-flow-calendar', { is: FlowCalendar });
        const today = new Date();
        element.inputRecords = [{ Id: '001', When__c: today.toISOString() }];
        element.dateTimeField = 'When__c';
        document.body.appendChild(element);

        const days = element.shadowRoot!.querySelectorAll<HTMLElement & { day?: { records: unknown[] } }>('c-flow-calendar-day');
        const dayWithRecord = Array.from(days).find((day) => (day.day?.records.length ?? 0) > 0);
        expect(dayWithRecord).toBeDefined();
    });
});
