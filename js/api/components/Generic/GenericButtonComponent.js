class GenericButtonComponent extends HtmlComponent{
    static validAttributes = ['component'];
    static name = "generic-button";
    defaultClass = "generic-button-component"
    static registry = []
    attachedComponent;

    constructor() {
        super();
    }

    static getRegistry(name){
        for(let r of GenericButtonComponent.registry){
            if(r.constructor.name === name){
                return r
            }
        }
    }

    static register(component){
        let instance = new component();
        GenericButtonComponent.registry.push(instance)
    }

    setClassToDefault() {
        this.classList.add(this.defaultClass);
        if(this.constructor.name!=="GenericButtonComponent"){
            console.log(this.constructor.name)
            let splitClass =  this.constructor.name.match(/[A-Z][a-z]+/g);
            let lowerSplit = []
            for(let str of splitClass){
                lowerSplit.push(str.toLowerCase());
            }
            this.classList.add(lowerSplit.join("-"));
        }
    }

    onAttributeChanged(name, oldValue, newValue) {
        this.attachedComponent = GenericButtonComponent.getRegistry(newValue);
    }

    addEvents() {
        this.addClickListener((e)=>{
            this.attachedComponent.onClick(e);
        })
    }

    onClick(){

    }
}

class GenericButtonEvents{

}

ComponentRegistry.register(GenericButtonComponent);