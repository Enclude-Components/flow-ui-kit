import { LightningElement, api } from 'lwc';

export default class FlowRecordRedirect extends LightningElement {
   @api objectApiName?: string;
   @api recordId?: string;

   connectedCallback(): void {
      window.location.href = `/lightning/r/${this.objectApiName}/${this.recordId}/view`;
   }
}
