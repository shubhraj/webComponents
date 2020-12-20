class ToggleButton extends HTMLElement {
    constructor(){
        super();
        this._isVisible = false;
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
        <style>
            #info-box{
                display: none;
            }
        </style>

        <button id='toggle-btn'> Show </button>
        <p id='info-box'>
          <slot>this is default</slot>
        </p>`;
    
         this._toggleButton = this.shadowRoot.querySelector('#toggle-btn');
         this._infoBox = this.shadowRoot.querySelector('#info-box');
         this._toggleButton.addEventListener('click', this._toggleInfo.bind(this));
    }

    _toggleInfo(){
        this._isVisible = !this._isVisible;
        this._toggleButton.textContent = this._isVisible ? 'Hide' : 'Show';
        this._infoBox.style.display = this._isVisible ? 'block' : 'none'; 
    }
}

customElements.define('wc-toggle-button', ToggleButton);