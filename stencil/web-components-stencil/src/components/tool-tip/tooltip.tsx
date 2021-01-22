import { Component, h, State, Prop } from "@stencil/core";

@Component({
    tag: 'wc-tool-tip',
    styleUrl: './tool-tip.css',
    shadow: true
})
export class ToolTip {
    @State() tooltipVisible = false; 
    @Prop() text: string;

    onToggleTooltip(){
        this.tooltipVisible = !this.tooltipVisible;
    }

    render(){
        let tooltip = null;
        if(this.tooltipVisible){
            tooltip = <div id='tooltip-text'> {this.text} </div>
        }
        return [
            <slot />,
            <span id='tooltip-icon' onClick={this.onToggleTooltip.bind(this)}>?</span>,
            tooltip
        ]
    }
}