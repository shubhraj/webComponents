import { Component, h, Prop, State, Method } from "@stencil/core";

@Component({
    tag: 'wc-side-drawer',
    shadow: true,
    styleUrl: './side-drawer.css' 
})

export class SideDrawer {
    //internal chanegs
    @State() showContactInfo = false; 
     
    //outside+inside changes
    @Prop({reflect: true}) title: string;
    @Prop({reflect: true}) open: boolean;

    onCloseDrawer(){
        this.open = false;
    }

    onContentChange(content: string){
        this.showContactInfo = content === 'contact';
    }

    @Method()
    openDrawer(){
        this.open = true
    }

    render(){
        let mainContent = <slot/>;
        if(this.showContactInfo){
            let contactUsContent = (
                <div id='contact-info'>
                    <h2>This is Contact Info</h2>
                    <p>you can contact us by Phone or Email</p>
                    <ul>
                        <li>Phone : 23213213</li>
                        <li>Email : <a href="mailto:something@something.com">something@something.com</a></li>
                    </ul>
                </div>
            )
            mainContent = contactUsContent;
        }
      
        return [
            <div class="backdrop" onClick={this.onCloseDrawer.bind(this)}></div>,
            <aside>
                <header>
                    <h1>{this.title}</h1>
                    <button id='close-btn' onClick={this.onCloseDrawer.bind(this)}>X</button>    
                </header>
                <section id="tabs">
                    <button
                    class = {!this.showContactInfo ? 'active': ''}
                    onClick={this.onContentChange.bind(this,'nav')}>Navigation</button>
                    <button 
                    class = {this.showContactInfo ? 'active': ''}
                    onClick={this.onContentChange.bind(this,'contact')}>Contact Us</button>
                </section>
                <main>
                    {mainContent}
                </main> 
            </aside>
        ];
    }
}

