import { createElement } from 'lwc';
import FlowCalendarDay, { type CalendarDayModel } from 'c/flowCalendarDay';

describe('c/flowCalendarDay', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('is disabled and does not dispatch dayselected when the day has no records', () => {
        const element = createElement<FlowCalendarDay>('c-flow-calendar-day', { is: FlowCalendarDay });
        element.day = { key: '2026-2-5', value: new Date(2026, 2, 5), number: 5, records: [] };
        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('dayselected', handler);

        const button = element.shadowRoot!.querySelector<HTMLButtonElement>('button')!;
        expect(button.disabled).toBe(true);
        expect(button.textContent!.trim()).toBe('5');

        button.click();
        expect(handler).not.toHaveBeenCalled();
    });

    it('dispatches dayselected with the day payload when it has records', () => {
        const day: CalendarDayModel = { key: '2026-2-5', value: new Date(2026, 2, 5), number: 5, records: [{ Id: '001' }] };
        const element = createElement<FlowCalendarDay>('c-flow-calendar-day', { is: FlowCalendarDay });
        element.day = day;
        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('dayselected', handler);

        const button = element.shadowRoot!.querySelector<HTMLButtonElement>('button')!;
        expect(button.disabled).toBe(false);
        button.click();

        expect(handler).toHaveBeenCalledTimes(1);
        const event = handler.mock.calls[0][0] as CustomEvent<{ day: CalendarDayModel }>;
        expect(event.detail.day).toEqual(day);
    });
});
