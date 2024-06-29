class ApiComponent extends HTMLElement{
    observedAttributes = [];
    name = "";

    constructor(){
        super();
    }

    //events

    onRegister(){
        customElements.define(name, this.constructor);
    }

    createContent(){

    }

    onAttributeChanged(name, oldValue, newValue){

    }

    onRemoved(){

    }

    //helper functions

    callAttributeEventOnSet(){
        for(let i=0;i<this.attributes.length;i++){
            let attr = this.attributes.item(i);
            this.onAttributeChanged(attr.name, null, attr.value);
        }
    }

    //HTMLElement callbacks

    connectedCallback(){
        this.callAttributeEventOnSet()
        this.createContent();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(oldValue === newValue) {
            return;
        }
        this.onAttributeChanged(name, oldValue, newValue);
    }

    disconnectedCallback() {
        this.onRemoved();
    }
}