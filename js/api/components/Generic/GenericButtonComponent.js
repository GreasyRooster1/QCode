class GenericButtonComponent extends HtmlComponent{
    static validAttributes = ['component'];
    static name = "generic-button";
    static registry = []
    attachedComponent;

    static getRegistry(name){
        for(let r of GenericButtonComponent.registry){
            if(r.constructor.name === name){
                return r
            }
        }
    }

    static register(component){
        registry.push(component)
    }

    onAttributeChanged(name, oldValue, newValue) {
        if(name==='component'){
            this.attachedComponent = GenericButtonComponent.getRegistry(name);
        }
    }

    addEvents() {
        this.addClickListener((e)=>{
            this.attachedComponent.onClick(e);
        })
    }

    onClick(){

    }
}

ComponentRegistry.register(GenericButtonComponent);