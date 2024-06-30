class LoadRegistry {

    static registry = [];

    static registerHtmlComponent(func) {
        this.registry.push(func);
    }
}

window.onload = function (){
    for(let func of LoadRegistry.registry){
        func()
    }
}