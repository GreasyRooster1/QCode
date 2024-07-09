class HtmlComponent extends HTMLElement{
    static validAttributes = [];
    static identifier = "";
    defaultClass;

    static get observedAttributes() {
        return this.validAttributes;
    }

    constructor() {
        super();
    }

    static new(){
        return document.createElement(name+"-component");
    }

    //events

    onRegister(){
    }

    generateContent(){

    }

    onCreated(){

    }

    onAttributeChanged(name, oldValue, newValue){

    }

    onRemoved(){

    }

    setStyle(style){

    }

    addEvents(){

    }

    //helper functions

    getInnerByClass(name){
        return this.querySelector("."+name);
    }
    getInnerById(id){
        return this.querySelector("#"+id);
    }
    getInnerQuerySelector(selector){
        return this.querySelector(selector);
    }

    addClickListener(func){
        Interaction.elementClickEvent(this,func);
    }

    addInnerClickListener(name,func){
        let el = this.getInnerByClass(name)
        Interaction.elementClickEvent(el,(e)=>{
            func(e,e.target);
        });
    }

    //internal helpers

    callAttributeEventOnSet(){
        for(let i=0;i<this.attributes.length;i++){
            let attr = this.attributes.item(i);
            this.onAttributeChanged(attr.name, null, attr.value);
        }
    }

    setClassToDefault(){
        if(this.defaultClass===undefined){
            return;
        }
        this.classList.add(this.defaultClass);
    }

    checkGeneratedContent(){
        if(this.generateContent()!==null){
            this.innerHTML = this.generateContent();
        }
    }

    //HTMLElement callbacks

    connectedCallback(){
        this.callAttributeEventOnSet()
        this.setClassToDefault();
        this.setStyle(this.style);
        this.addEvents()
        this.onCreated()
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