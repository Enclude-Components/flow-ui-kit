import { createElement } from 'lwc';
import FlowEventCard from 'c/flowEventCard';

describe('c/flowEventCard', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('renders the event name and a formatted date/time when a start datetime is provided', () => {
        const element = createElement<FlowEventCard>('c-flow-event-card', { is: FlowEventCard });
        element.name = 'Team Sync';
        element.startDatetime = '2026-03-05T15:00:00.000Z';
        document.body.appendChild(element);

        expect(element.shadowRoot!.querySelector('.event-card__name')!.textContent).toBe('Team Sync');
        expect(element.shadowRoot!.querySelector('.event-card__date')!.textContent).not.toBe('');
    });

    it('shows no datetime block when neither start nor end datetime is provided', () => {
        const element = createElement<FlowEventCard>('c-flow-event-card', { is: FlowEventCard });
        element.name = 'No Date Event';
        document.body.appendChild(element);

        expect(element.shadowRoot!.querySelector('.event-card__date')).toBeNull();
    });
});
