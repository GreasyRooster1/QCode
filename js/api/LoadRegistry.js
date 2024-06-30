class LoadRegistry {

    static registry = [];

    static register(func) {
        this.registry.push(func);
    }
}

window.onload = function (){
    for(let func of LoadRegistry.registry){
        func()
    }
}