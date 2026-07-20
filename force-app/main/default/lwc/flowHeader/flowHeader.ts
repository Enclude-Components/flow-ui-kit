import { LightningElement, api } from 'lwc';

export default class FlowHeader extends LightningElement {
    @api heading = 'Section';
    @api iconName?: string; // optional, e.g. 'standard:account'
}
