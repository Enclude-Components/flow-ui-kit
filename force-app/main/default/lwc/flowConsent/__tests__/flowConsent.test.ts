import { createElement } from 'lwc';
import FlowConsent from 'c/flowConsent';
import { FlowAttributeChangeEventName } from 'lightning/flowSupport';

describe('c/flowConsent', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('dispatches a flow attribute change event when the checkbox is clicked', () => {
        const element = createElement<FlowConsent>('c-flow-consent', { is: FlowConsent });
        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener(FlowAttributeChangeEventName, handler);

        const checkbox = element.shadowRoot!.querySelector<HTMLInputElement>('input[type="checkbox"]')!;
        checkbox.checked = true;
        checkbox.dispatchEvent(new Event('click'));

        expect(handler).toHaveBeenCalledTimes(1);
    });

    it('fails validation and shows an error when unchecked', () => {
        const element = createElement<FlowConsent>('c-flow-consent', { is: FlowConsent });
        document.body.appendChild(element);

        const result = element.validate();

        expect(result).toEqual({ isValid: false, errorMessage: 'This field is required.' });
        return Promise.resolve().then(() => {
            expect(element.shadowRoot!.querySelector('.slds-form-error')).not.toBeNull();
        });
    });

    it('passes validation when checked', () => {
        const element = createElement<FlowConsent>('c-flow-consent', { is: FlowConsent });
        element.isChecked = true;
        document.body.appendChild(element);

        const result = element.validate();

        expect(result).toEqual({ isValid: true });
    });
});
