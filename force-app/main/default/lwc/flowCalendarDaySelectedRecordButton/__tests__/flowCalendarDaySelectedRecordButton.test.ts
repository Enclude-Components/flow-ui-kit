import { createElement } from 'lwc';
import FlowCalendarDaySelectedRecordButton from 'c/flowCalendarDaySelectedRecordButton';

describe('c/flowCalendarDaySelectedRecordButton', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('renders the formatted start time and dispatches recordselected with the record when clicked', () => {
        const record = { Id: '001', StartDateTime__c: '2026-03-05T15:00:00.000Z' };
        const element = createElement<FlowCalendarDaySelectedRecordButton>('c-flow-calendar-day-selected-record-button', {
            is: FlowCalendarDaySelectedRecordButton,
        });
        element.record = record;
        element.dateTimeField = 'StartDateTime__c';
        document.body.appendChild(element);

        const button = element.shadowRoot!.querySelector<HTMLButtonElement>('button')!;
        expect(button.textContent!.trim()).not.toBe('');

        const handler = jest.fn();
        element.addEventListener('recordselected', handler);
        button.click();

        expect(handler).toHaveBeenCalledTimes(1);
        const event = handler.mock.calls[0][0] as CustomEvent<{ record: unknown }>;
        expect(event.detail.record).toEqual(record);
    });
});
