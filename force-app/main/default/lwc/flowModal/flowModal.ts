import { LightningElement, api } from 'lwc';
import { inSitePreview } from 'c/siteUtils';

/**
* @slot flow
*/
export default class FlowModal extends LightningElement {
    @api buttonLabel = 'Open';
    @api modalLabel = 'Flow';
    @api size = 'standard';  // small | standard | large
    @api width = 'default';  // default | full
    @api alignment = 'left'; // left | center | right

    isOpen = false;

    get containerClass(): string {
        const align = ['left', 'center', 'right'].includes(this.alignment) ? this.alignment : 'left';
        return `container align-${align}` + (this.width === 'full' ? ' full-width' : '');
    }

    get buttonClass(): string {
        const classes = ['slds-button', 'slds-button_brand'];
        if (this.size === 'small') classes.push('slds-button_small');
        if (this.size === 'large') classes.push('btn-large');
        if (this.width === 'full') classes.push('btn-full');
        return classes.join(' ');
    }

    isInSitePreview = inSitePreview;

    handleOpen(): void {
        this.isOpen = true;
        document.body.style.overflow = 'hidden';
    }

    handleClose(): void {
        this.isOpen = false;
        document.body.style.overflow = '';
    }

    handleKeyDown(event: KeyboardEvent): void {
        if (event.key === 'Escape') this.handleClose();
    }

    handleStatusChange(event: CustomEvent<{ status: string }>): void {
        const { status } = event.detail;
        if (status === 'FINISHED' || status === 'FINISHED_SCREEN') {
            this.handleClose();
        }
    }

}
