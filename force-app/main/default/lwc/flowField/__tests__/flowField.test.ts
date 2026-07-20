import { createElement } from 'lwc';
import FlowField from 'c/flowField';

describe('c/flowField', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('renders an em dash when the value is empty', () => {
        const element = createElement<FlowField>('c-flow-field', { is: FlowField });
        element.label = 'Status';
        document.body.appendChild(element);

        expect(element.shadowRoot!.textContent).toContain('—');
    });

    it('renders a lightning-formatted-number for a number field type', () => {
        const element = createElement<FlowField>('c-flow-field', { is: FlowField });
        element.label = 'Amount';
        element.value = 42;
        element.fieldType = 'number';
        document.body.appendChild(element);

        const formatted = element.shadowRoot!.querySelector<HTMLElement & { value: unknown }>('lightning-formatted-number');
        expect(formatted).not.toBeNull();
        expect(formatted?.value).toBe(42);
    });
});
