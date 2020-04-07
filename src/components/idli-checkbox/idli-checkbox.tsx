import {Component, Prop, h, EventEmitter, Event} from '@stencil/core';

@Component({
    tag: 'idli-checkbox',
    styleUrl: 'idli-checkbox.scss',
    shadow: true
})
export class IdliCheckbox {
    /**
     * The input field label.
     */
    @Prop() label: string;

    @Prop() controlLabel: string;

    /**
     * Button variants
     * Possible values are `"default"`, `"dashed"`. Defaults to `"default"`.
     */
    @Prop() variant: 'default' | 'dashed' = 'default';

    /**
     * The input field value.
     */
    @Prop() value: boolean = false;

    /**
     * The button size.
     * Possible values are: `"sm"`, `"md"`, `"lg"`. Defaults to `"md"`.
     */
    @Prop() size: 'sm' | 'md' | 'lg' = 'md';

    /**
     * If true, the form will be in inline format. Defaults to `false`.
     */
    @Prop() inline: boolean = false;

    /**
     * If true, the user cannot interact with the button. Defaults to `false`.
     */
    @Prop() disabled: boolean = false;

    /**
     * On change of input a CustomEvent 'inputChange' will be triggered. Event details contains parent event, oldValue, newValue of input.
     */
    @Event() inputChange: EventEmitter;

    getVariantClass() {
        let variant = "variant-";
        if (!this.variant)
            variant = variant + 'default';
        else
            variant = variant + this.variant;
        return variant;
    }

    getSizeClass() {
        let size = "size-";
        if (!this.size)
            size = size + 'md';
        else
            size = size + this.size;
        return size;
    }

    getInlineClass() {
        let inline = "";
        if (this.inline)
            inline = 'inline';
        return inline;
    }

    getCheckedClass() {
        let style = "";
        if (this.value)
            style += 'checkbox-checked';
        if (this.disabled)
            style += 'checkbox-disabled';
        return style;
    }

    handleInputChange(event: any) {
        if (!this.disabled) {
            const oldValue = this.value;
            this.value = !JSON.parse(event.target.value);
            this.inputChange.emit({event, oldValue, newValue: this.value});
        }
    }

    getLabelElement() {
        if (this.label)
            return <label class="label">{this.label}</label>;
    }

    private getCheckboxElement() {
        const that = this;
        return <div class="checkbox-element">
            <label class="checkbox-wrapper">
            <span class={"checkbox " + this.getCheckedClass()}>
                <input type="checkbox" class="checkbox-input " value={this.value + ''} onClick={(evt) => {
                    this.handleInputChange(evt)
                }} disabled={this.disabled}/>
                    <span class="checkbox-inner"/>
             </span> {
                (function () {
                    if (that.controlLabel)
                        return <span>{that.controlLabel}</span>
                })()
            }
            </label>
        </div>;
    }

    render() {
        return <div
            class={"idli-checkbox-component  " + this.getInlineClass() + " " + this.getSizeClass() + " " + this.getVariantClass()}>
            {[this.getLabelElement(), this.getCheckboxElement()]}
        </div>;
    }
}
