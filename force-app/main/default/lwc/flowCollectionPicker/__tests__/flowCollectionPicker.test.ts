import { createElement } from 'lwc';
import FlowCollectionPicker from 'c/flowCollectionPicker';

const RECORDS = [
    { Id: '001', Name: 'Acme' },
    { Id: '002', Name: 'Globex' },
];

describe('c/flowCollectionPicker', () => {
    afterEach(() => {
        document.body.innerHTML = '';
    });

    it('renders one option per record and selects one on change', () => {
        const element = createElement<FlowCollectionPicker>('c-flow-collection-picker', { is: FlowCollectionPicker });
        element.records = RECORDS;
        document.body.appendChild(element);

        const radios = element.shadowRoot!.querySelectorAll<HTMLInputElement>('input[type="radio"]');
        expect(radios.length).toBe(2);

        expect(radios[1].value).toBe('002');
        radios[1].dispatchEvent(new Event('change'));

        expect(element.selectedRecord).toEqual(RECORDS[1]);
    });

    it('fails validation when required and nothing is selected', () => {
        const element = createElement<FlowCollectionPicker>('c-flow-collection-picker', { is: FlowCollectionPicker });
        element.records = RECORDS;
        element.required = true;
        document.body.appendChild(element);

        expect(element.validate()).toEqual({ isValid: false, errorMessage: 'Please select a record.' });
    });
});
