import { createElement } from 'lwc';
import FlowHeader from 'c/flowHeader';

describe('c/flowHeader', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('renders the default heading with no icon', () => {
        const element = createElement<FlowHeader>('c-flow-header', { is: FlowHeader });
        document.body.appendChild(element);

        const heading = element.shadowRoot!.querySelector('h1')!;
        expect(heading.textContent).toBe('Section');
        expect(element.shadowRoot!.querySelector('lightning-icon')).toBeNull();
    });

    it('renders a custom heading and icon when provided', () => {
        const element = createElement<FlowHeader>('c-flow-header', { is: FlowHeader });
        element.heading = 'Contact Details';
        element.iconName = 'standard:contact';
        document.body.appendChild(element);

        const heading = element.shadowRoot!.querySelector('h1')!;
        expect(heading.textContent).toBe('Contact Details');

        const icon = element.shadowRoot!.querySelector<HTMLElement & { iconName: string }>('lightning-icon');
        expect(icon).not.toBeNull();
        expect(icon?.iconName).toBe('standard:contact');
    });
});
