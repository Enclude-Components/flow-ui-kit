import { createElement } from 'lwc';
import FlowModal from 'c/flowModal';

describe('c/flowModal', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('opens the modal when the trigger button is clicked, and closes on backdrop click', () => {
        const element = createElement<FlowModal>('c-flow-modal', { is: FlowModal });
        element.buttonLabel = 'Open Flow';
        document.body.appendChild(element);

        expect(element.shadowRoot!.querySelector('.slds-modal')).toBeNull();

        const openButton = element.shadowRoot!.querySelector<HTMLButtonElement>('button')!;
        expect(openButton.textContent).toBe('Open Flow');
        openButton.click();

        return Promise.resolve().then(() => {
            const backdrop = element.shadowRoot!.querySelector<HTMLElement>('.slds-backdrop')!;
            expect(backdrop).not.toBeNull();

            backdrop.click();

            return Promise.resolve().then(() => {
                expect(element.shadowRoot!.querySelector('.slds-modal')).toBeNull();
            });
        });
    });
});
