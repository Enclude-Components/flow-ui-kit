import { createElement } from 'lwc';
import FlowCalendarRecordSelection from 'c/flowCalendarRecordSelection';
import { FlowNavigationNextEventName } from 'lightning/flowSupport';

const DAY = {
    key: '2026-2-5',
    value: new Date(2026, 2, 5),
    number: 5,
    records: [{ Id: '001', Name: 'Standup' }],
};

describe('c/flowCalendarRecordSelection', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('fails validation when required and nothing is selected', () => {
        const element = createElement<FlowCalendarRecordSelection>('c-flow-calendar-record-selection', {
            is: FlowCalendarRecordSelection,
        });
        element.required = true;
        document.body.appendChild(element);

        expect(element.validate()).toEqual({ isValid: false, errorMessage: 'Please Select a Record' });
    });

    it('shows the day\'s records after a day is selected, and advances the flow once a record is picked', () => {
        const element = createElement<FlowCalendarRecordSelection>('c-flow-calendar-record-selection', {
            is: FlowCalendarRecordSelection,
        });
        document.body.appendChild(element);

        expect(element.shadowRoot!.querySelector('c-flow-calendar')).not.toBeNull();

        const calendar = element.shadowRoot!.querySelector('c-flow-calendar')!;
        calendar.dispatchEvent(new CustomEvent('dayselected', { detail: { day: DAY } }));

        return Promise.resolve().then(() => {
            const recordButton = element.shadowRoot!.querySelector('c-flow-calendar-day-selected-record-button')!;
            expect(recordButton).not.toBeNull();

            const handler = jest.fn();
            element.addEventListener(FlowNavigationNextEventName, handler);

            recordButton.dispatchEvent(new CustomEvent('recordselected', { detail: { record: DAY.records[0] } }));

            expect(element.selectedRecord).toEqual(DAY.records[0]);
            expect(handler).toHaveBeenCalledTimes(1);
        });
    });
});
