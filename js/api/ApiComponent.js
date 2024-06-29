class ApiComponent extends HTMLElement{
    static validAttributes = [];
    static name = "";
    defaultClass = "";

    static get observedAttributes() {
        return this.validAttributes;
    }

    constructor() {
        super();
    }

    //events

    onRegister(){
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

    getInnerByClass(name){
        return this.querySelector("."+name);
    }
    getInnerById(id){
        return this.querySelector("#"+id);
    }
    getInnerQuerySelector(selector){
        return this.querySelector(selector);
    }

    //HTMLElement callbacks

    connectedCallback(){
        this.innerHTML = this.createContent();
        this.classList.add(this.defaultClass);
        this.callAttributeEventOnSet()
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