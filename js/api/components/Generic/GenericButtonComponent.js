class GenericButtonComponent extends HtmlComponent{
    static validAttributes = ['component'];
    static identifier = "generic-button";
    defaultClass = "generic-button-component"
    static registry = []
    attachedComponent;

    constructor() {
        super();
    }

    static getRegistry(name){
        for(let r of GenericButtonComponent.registry){
            console.log(r.constructor.name,name)
            if(r.constructor.name === name){
                return r
            }
        }
    }

    static register(component){
        let instance = new component();
        GenericButtonComponent.registry.push(instance)
    }

    addComponentClass() {
        this.classList.add(this.defaultClass);
        if(this.attachedComponent!==null){
            console.log(this.attachedComponent)
            let splitClass =  this.attachedComponent.constructor.name.match(/[A-Z][a-z]+/g);
            let lowerSplit = []
            for(let str of splitClass){
                lowerSplit.push(str.toLowerCase());
            }
            this.classList.add(lowerSplit.join("-"));
        }
        console.log(GenericButtonComponent.registry)
    }

    onAttributeChanged(name, oldValue, newValue) {
        if(name!=="component"){
            return;
        }
        this.attachedComponent = GenericButtonComponent.getRegistry(newValue);
        this.addComponentClass()
    }

    addEvents() {
        this.addClickListener((e)=>{
            this.attachedComponent.onClick(e);
        })
    }
}

class GenericButtonEvents{
    onClick(){

    }
}

ComponentRegistry.register(GenericButtonComponent);