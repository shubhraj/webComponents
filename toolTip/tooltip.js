class Tooltip extends HTMLElement {
    constructor(){
        super();
        this._tooltipContainer;
        this._tooltipText = 'this is default';
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
        <style>
            div{
                background-color : black;
                color : white;
                position : absolute;
                z-index : 10;
            }
        </style>
        <slot>Some Defaults</slot>
        <span>(?)</span>`;
    }

    connectedCallback(){
        if(this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }
        const tooltipIcon = this.shadowRoot.querySelector('span');  

        //bind events
        tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        
        //this.shadowRoot.appendChild(tooltipIcon); 
        this.style.position = 'relative';
    }

    _showTooltip(){ 
        this._tooltipContainer = document.createElement('div');
        this._tooltipContainer.textContent = this._tooltipText;
        this.shadowRoot.appendChild(this._tooltipContainer);
    }

    _hideTooltip() {
        this.shadowRoot.removeChild(this._tooltipContainer); 
    }
}


customElements.define('wc-tooltip', Tooltip);