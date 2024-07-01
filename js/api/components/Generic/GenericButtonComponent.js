class GenericButtonComponent extends HtmlComponent{
    static validAttributes = ['component'];
    static name = "generic-button";
    static registry = []
    attachedComponent;

    static getRegistry(name){
        for(let r of GenericButtonComponent.registry){
            if(r.name === name){
                return r
            }
        }
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
}

ComponentRegistry.register(GenericButtonComponent);