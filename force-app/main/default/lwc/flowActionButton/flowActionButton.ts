import { LightningElement, api } from 'lwc';
import { FlowNavigationNextEvent } from 'lightning/flowSupport';

export default class FlowActionButton extends LightningElement {
    @api buttonLabel?: string;
    @api buttonIcon?: string;

    _selected = false;

    @api
    get selected(): boolean {
        return this._selected;
    }
    set selected(value: boolean) {
        this._selected = value;
    }

    handleClick(): void {
        this._selected = true;
        this.dispatchEvent(new FlowNavigationNextEvent());
    }
}
