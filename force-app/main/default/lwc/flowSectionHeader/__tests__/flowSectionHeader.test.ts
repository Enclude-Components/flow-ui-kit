import { createElement } from 'lwc';
import FlowSectionHeader from 'c/flowSectionHeader';

describe('c/flowSectionHeader', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('renders the default heading with no inline margin styles', () => {
        const element = createElement<FlowSectionHeader>('c-flow-section-header', { is: FlowSectionHeader });
        document.body.appendChild(element);

        const heading = element.shadowRoot!.querySelector('h2')!;
        expect(heading.textContent).toBe('Section');

        const root = element.shadowRoot!.querySelector<HTMLElement>('.section-header-root')!;
        expect(root.getAttribute('style')).toBeFalsy();
    });

    it('renders a custom heading and both margin styles when provided', () => {
        const element = createElement<FlowSectionHeader>('c-flow-section-header', { is: FlowSectionHeader });
        element.heading = 'Contact Info';
        element.marginTop = '1rem';
        element.marginBottom = '0.5rem';
        document.body.appendChild(element);

        const heading = element.shadowRoot!.querySelector('h2')!;
        expect(heading.textContent).toBe('Contact Info');

        const root = element.shadowRoot!.querySelector<HTMLElement>('.section-header-root')!;
        expect(root.style.marginTop).toBe('1rem');
        expect(root.style.marginBottom).toBe('0.5rem');
    });

    it('renders only the margin side that was provided', () => {
        const element = createElement<FlowSectionHeader>('c-flow-section-header', { is: FlowSectionHeader });
        element.marginTop = '2rem';
        document.body.appendChild(element);

        const root = element.shadowRoot!.querySelector<HTMLElement>('.section-header-root')!;
        expect(root.style.marginTop).toBe('2rem');
        expect(root.style.marginBottom).toBe('');
    });
});
