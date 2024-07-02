class GenericButtonComponent extends HtmlComponent{
    static validAttributes = ['component'];
    static name = "generic-button";
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