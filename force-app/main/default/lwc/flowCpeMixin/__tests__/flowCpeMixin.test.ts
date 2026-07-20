import { FlowCpeMixin, type FlowGenericTypeMapping, type FlowInputVariable } from 'c/flowCpeMixin';

class FakeHost {
    genericTypeMappings?: FlowGenericTypeMapping[];
    inputVariables?: FlowInputVariable[];
    dispatchEvent = jest.fn();
}

describe('c/flowCpeMixin', () => {
    it('derives objectType from the "T" generic type mapping and reads input variable values', () => {
        const Mixed = FlowCpeMixin(FakeHost);
        const host = new Mixed();
        host.genericTypeMappings = [{ typeName: 'T', typeValue: 'Account' }];
        host.inputVariables = [{ name: 'records', value: 'myCollectionVar' }];

        expect(host.objectType).toBe('Account');
        expect(host.isObjectTypeEmpty).toBe(false);
        expect(host._inputVar('records')).toBe('myCollectionVar');
        expect(host._inputVar('missing')).toBeUndefined();
    });

    it('dispatches a generic type mapping changed event', () => {
        const Mixed = FlowCpeMixin(FakeHost);
        const host = new Mixed();

        host._dispatchTypeMapping('T', 'Contact');

        expect(host.dispatchEvent).toHaveBeenCalledTimes(1);
        const event = host.dispatchEvent.mock.calls[0][0] as CustomEvent<{ typeName: string; typeValue: string }>;
        expect(event.type).toBe('configuration_editor_generic_type_mapping_changed');
        expect(event.detail).toEqual({ typeName: 'T', typeValue: 'Contact' });
    });
});
