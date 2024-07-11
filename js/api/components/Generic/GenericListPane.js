class GenericListPane extends HtmlComponent {
    static validAttributes = ["component"];
    static identifier = "generic-list-pane"
    static registry = []
    attachedComponent;

    constructor() {
        super();
    }

    static getRegistry(name){
        for(let r of GenericListPane.registry){
            if(r.constructor.name === name){
                return r
            }
        }
    }

    static register(component){
        let instance = new component();
        GenericListPane.registry.push(instance)
    }

    onAttributeChanged(name, oldValue, newValue) {
        if(name==="component"){
            this.attachedComponent = GenericListPane.getRegistry(newValue);
            this.attachedComponent.htmlElement = this;
            console.log()
        }
    }

    generateContent() {
        return `
            <div class="items">
            
            </div>
            <div class="details">
            
            </div>
        `
    }

    onCreated() {
        this.attachedComponent.loadItems()
    }

    onLoadFinished(){
        for(let data of this.attachedComponent.loadedData){
            this.innerHTML+=this.attachedComponent.createItem(data)
        }
    }

}

class GenericListPaneEvents{
    loadedData = []
    htmlElement = null

    setDetails(){

    }

    createItem(){

    }

    loadItems(){

    }
}

class ListPaneItemData{
    name = ""
    data = {}

    constructor(name,data) {
        this.name = name;
        this.data = data

    }
}

ComponentRegistry.register(GenericListPane);