class Modal extends HTMLElement {
    constructor(){
        super();
        this.isOpen = false;
        this.attachShadow({mode: 'open'});
        this.shadowRoot.innerHTML = `
            <style>
                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: rgba(0,0,0,0.75);
                    z-index: 10;  
                    opacity: 0;
                    pointer-events: none;
                }

                #modal {
                    position: fixed;
                    top: 10vh;
                    left: 25%;
                    width: 50%;
                    z-index: 100;
                    background: white;
                    border-radius: 3px;
                    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.26);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    pointer-events: none;
                    opacity: 0;
                    transition:  all 0.3s ease-out;
                }

                header{
                    padding : 1rem;
                    border-bottom: 1px solid #ccc;
                }

                :host([opened]) #modal,
                :host([opened]) #backdrop{
                    pointer-events: all;
                    opacity: 1;
                }

                :host([opened]) #modal{
                    top: 15vh;
                }

                ::slotted(){
                    padding: 1 rem;
                }

                ::slotted(p){
                    margin: 0;
                }

                #actions{
                    border-top: 1px solid #ccc;
                    padding: 1rem;
                    display: flex;
                    justify-content: flex-end;
                }
                #main{
                    padding: 1rem;
                }    
                #actions button{
                    margin: 0 0.25rem;
                }

            </style>    
            <div id="backdrop"></div>
            <div id="modal">
                <header>
                    <slot name="title"></slot>
                </header>
                <section id="main">
                    <slot></slot>
                </section>
                <section id="actions">
                    <button id='cancel-btn'>Cancel</button>
                    <button id='confirm-btn'>Okay</button>
                </section>
            </div>

        `;

        const cancelBtn = this.shadowRoot.querySelector('#cancel-btn');
        const confirmBtn = this.shadowRoot.querySelector('#confirm-btn');
        cancelBtn.addEventListener('click', this._cancel.bind(this));
        confirmBtn.addEventListener('click', this._confirm.bind(this));
    }

     attributeChangedCallback(name, oldVal, newVal){
     
             if(this.hasAttribute('opened')){
                 this.isOpen = true;
            }else{
                 this.isOpen = false;
            }
     }

     _cancel(event) {
        this.hide();
        //way 1: to dispatch Custom Event
        event.target.dispatchEvent(new Event('cancel',{ composed: true }));
     }

     _confirm(event) {
        this.hide();
        //way 2: to dispatch Custom Event , here this refers to Modal Class which extends its 
        //properties from HTMLElement so this also refers to HTMLElement.
        this.dispatchEvent(new Event('confirm'));
     }

     hide(){
        if(this.hasAttribute('opened')){
             this.removeAttribute('opened');
             this.isOpen = false;
         }
     }
     

    static get observedAttributes() {
        return ['opened'];
    }

    open(){
        this.setAttribute('opened','');
        this.isOpen = true;
    }
}

customElements.define('wc-modal',Modal);