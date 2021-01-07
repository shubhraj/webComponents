class Tooltip extends HTMLElement {
    constructor(){  
        super();
        this._tooltipContainer;
        this._tooltipIcon;
        this._tooltipText = 'this is default value of tooltip';
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
        <style>
            div{
                font-weight: normal;
                background-color : black;
                color : white;
                position : absolute;
                top: 1.5rem;
                left: .75rem;
                z-index : 10;
                padding: 0.15rem;
                border-radius: 3px;
                box-shadow: 1px 1px 6px rgba(0,0,0,0.26); 
            }

            .highlight {
                background-color: red;
            }

            ::slotted(.highlight){
                border-bottom : 1px dotted blue;
            }

            :host {
                position: relative; 
            }

            :host(.important){
                background : var(--html-color, #ccc);
                padding: 0.15rem;
            }

            :host-context(p.wcWithClass){
                font-weight: bold;
            }

            .icon{
                background: black;
                color : white;
                padding: 0.15rem 0.25rem;
                text-align : center;
                border-radius : 50%;
            }
        </style>
        <slot>Slot Default value</slot>
        <span class='icon'>?</span>`;
    }

    connectedCallback(){
        if(this.hasAttribute('text')) {
            this._tooltipText = this.getAttribute('text');
        }
        this._tooltipIcon = this.shadowRoot.querySelector('span');  

        //bind events
        this._tooltipIcon.addEventListener('mouseenter', this._showTooltip.bind(this));
        this._tooltipIcon.addEventListener('mouseleave', this._hideTooltip.bind(this));
        
    }

    attributeChangedCallback(name, oldVal, newVal){
        if(oldVal === newVal) return;
        if(name === 'text') {
            this._tooltipText = newVal;
        }
    }

    static get observedAttributes(){
        return ['text']
    }

    disconnectedCallback(){
        this._tooltipIcon.removeEventListener('mouseenter', this._showTooltip);
        this._tooltipIcon.removeEventListener('mouseleave', this._hideTooltip);
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