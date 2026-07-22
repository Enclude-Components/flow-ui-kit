import { createElement } from 'lwc';
import FlowCalendarRecordSelectionEditor from 'c/flowCalendarRecordSelectionEditor';
import { getObjectInfo } from 'lightning/uiObjectInfoApi';

interface LdsTestWireAdapter {
    emit: (data: unknown) => Promise<void> | void;
}

describe('c/flowCalendarRecordSelectionEditor', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('dispatches a generic type mapping changed event when the object type input changes', () => {
        const element = createElement<FlowCalendarRecordSelectionEditor>('c-flow-calendar-record-selection-editor', {
            is: FlowCalendarRecordSelectionEditor,
        });
        document.body.appendChild(element);

        const handler = jest.fn();
        element.addEventListener('configuration_editor_generic_type_mapping_changed', handler);

        // `name` is a known @api prop on lightning-input, so LWC sets it as a JS property rather
        // than reflecting it as an HTML attribute - filter by property instead of an attribute selector.
        const objectTypeInput = Array.from(
            element.shadowRoot!.querySelectorAll<HTMLInputElement & { name?: string }>('lightning-input'),
        ).find((input) => input.name === 'objectType')!;
        objectTypeInput.value = 'Contact';
        objectTypeInput.dispatchEvent(new CustomEvent('change', { detail: {} }));

        expect(handler).toHaveBeenCalledTimes(1);
        const event = handler.mock.calls[0][0] as CustomEvent<{ typeName: string; typeValue: string }>;
        expect(event.detail).toEqual({ typeName: 'T', typeValue: 'Contact' });
    });

    it('populates the date/time field options from the wired object describe once a record type is set', () => {
        const element = createElement<FlowCalendarRecordSelectionEditor>('c-flow-calendar-record-selection-editor', {
            is: FlowCalendarRecordSelectionEditor,
        });
        element.genericTypeMappings = [{ typeName: 'T', typeValue: 'Contact' }];
        document.body.appendChild(element);

        // createLdsTestWireAdapter's emit() wraps whatever is passed as `{ data: value, error: undefined }`,
        // so this should be the raw object info, not an already-wrapped envelope.
        (getObjectInfo as unknown as LdsTestWireAdapter).emit({
            apiName: 'Contact',
            fields: {
                Birthdate__c: { apiName: 'Birthdate__c', dataType: 'Date', label: 'Birthdate' },
                LastModifiedDate: { apiName: 'LastModifiedDate', dataType: 'DateTime', label: 'Last Modified Date' },
            },
        });

        return Promise.resolve().then(() => {
            const combos = Array.from(
                element.shadowRoot!.querySelectorAll<HTMLElement & { label?: string; options?: { label: string; value: string }[] }>(
                    'lightning-combobox',
                ),
            );
            const dateTimeCombo = combos.find((combo) => combo.label === 'Date Time Field')!;
            expect(dateTimeCombo.options).toEqual([{ label: 'LastModifiedDate', value: 'LastModifiedDate' }]);
        });
    });
});
