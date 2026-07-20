import { createElement } from 'lwc';
import FlowCollectionPickerEditor from 'c/flowCollectionPickerEditor';

describe('c/flowCollectionPickerEditor', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('falls back to defaults when no input variables are set, and dispatches a value-changed event for required', () => {
        const element = createElement<FlowCollectionPickerEditor>('c-flow-collection-picker-editor', {
            is: FlowCollectionPickerEditor,
        });
        document.body.appendChild(element);

        const labelInput = element.shadowRoot!.querySelector<HTMLElement & { value: unknown }>(
            'lightning-input[data-name="labelFieldName"]',
        )!;
        expect(labelInput.value).toBe('Name');

        // LWC compiles known @api props like `type` onto base components as JS properties, not
        // HTML attributes, so an attribute selector like `[type="toggle"]` won't match here.
        const inputs = Array.from(
            element.shadowRoot!.querySelectorAll<HTMLElement & { type?: string; checked?: unknown }>('lightning-input'),
        );
        const toggle = inputs.find((input) => input.type === 'toggle')!;
        expect(toggle.checked).toBe(false);

        const handler = jest.fn();
        element.addEventListener('configuration_editor_input_value_changed', handler);

        toggle.dispatchEvent(new CustomEvent('change', { detail: { checked: true } }));

        expect(handler).toHaveBeenCalledTimes(1);
        const event = handler.mock.calls[0][0] as CustomEvent<{ name: string; newValue: boolean; newValueDataType: string }>;
        expect(event.detail).toEqual({ name: 'required', newValue: true, newValueDataType: 'Boolean' });
    });
});
