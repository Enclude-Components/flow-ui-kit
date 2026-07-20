import { createElement } from 'lwc';
import FlowActionButton from 'c/flowActionButton';
import { FlowNavigationNextEventName } from 'lightning/flowSupport';

describe('c/flowActionButton', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('renders the button label', () => {
        const element = createElement<FlowActionButton>('c-flow-action-button', { is: FlowActionButton });
        element.buttonLabel = 'Continue';
        document.body.appendChild(element);

        const button = element.shadowRoot!.querySelector('button')!;
        expect(button.textContent!.trim()).toBe('Continue');
    });

    it('marks itself selected and dispatches a flow navigation next event on click', () => {
        const element = createElement<FlowActionButton>('c-flow-action-button', { is: FlowActionButton });
        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener(FlowNavigationNextEventName, handler);

        const button = element.shadowRoot!.querySelector('button')!;
        button.click();

        expect(element.selected).toBe(true);
        expect(handler).toHaveBeenCalledTimes(1);
    });
});
