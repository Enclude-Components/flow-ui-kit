import { createElement } from 'lwc';
import FlowRecordRedirect from 'c/flowRecordRedirect';

describe('c/flowRecordRedirect', () => {
    let originalLocation: Location;

    beforeEach(() => {
        // jsdom doesn't implement real navigation, so window.location.href never actually
        // changes when set. Swap in a plain mock object so we can observe the assignment.
        originalLocation = window.location;
        // @ts-expect-error - intentionally replacing location with a minimal mock for this test
        delete window.location;
        // @ts-expect-error - same as above
        window.location = { href: '' };
    });

    afterEach(() => {
        document.body.innerHTML = '';
        // @ts-expect-error - restoring the real Location object after the mock swap above
        window.location = originalLocation;
    });

    it('redirects to the record view page for the given object and record id', () => {
        const element = createElement<FlowRecordRedirect>('c-flow-record-redirect', { is: FlowRecordRedirect });
        element.objectApiName = 'Account';
        element.recordId = '001XXXXXXXXXXXXXXX';
        document.body.appendChild(element);

        expect(window.location.href).toBe('/lightning/r/Account/001XXXXXXXXXXXXXXX/view');
    });
});
