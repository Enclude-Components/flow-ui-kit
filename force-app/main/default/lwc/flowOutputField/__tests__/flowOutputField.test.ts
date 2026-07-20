import { createElement } from 'lwc';
import FlowOutputField from 'c/flowOutputField';

describe('c/flowOutputField', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('renders a plain value as-is', () => {
        const element = createElement<FlowOutputField>('c-flow-output-field', { is: FlowOutputField });
        element.label = 'Status';
        element.value = 'Open';
        document.body.appendChild(element);

        expect(element.shadowRoot!.querySelector('.label')!.textContent).toBe('Status');
        expect(element.shadowRoot!.querySelector('.value')!.textContent).toBe('Open');
    });

    it('formats a date-only value instead of rendering it raw', () => {
        const element = createElement<FlowOutputField>('c-flow-output-field', { is: FlowOutputField });
        element.value = '2026-03-05';
        document.body.appendChild(element);

        expect(element.shadowRoot!.querySelector('.value')!.textContent).not.toBe('2026-03-05');
    });
});
