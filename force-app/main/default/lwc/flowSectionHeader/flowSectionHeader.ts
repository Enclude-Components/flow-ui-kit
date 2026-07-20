import { LightningElement, api } from 'lwc';

export default class FlowSectionHeader extends LightningElement {
    @api heading = 'Section';
    @api marginTop?: string;
    @api marginBottom?: string;

    get rootStyle(): string | undefined {
        const parts: string[] = [];
        if (this.marginTop) parts.push(`margin-top: ${this.marginTop}`);
        if (this.marginBottom) parts.push(`margin-bottom: ${this.marginBottom}`);
        return parts.join('; ') || undefined;
    }
}
