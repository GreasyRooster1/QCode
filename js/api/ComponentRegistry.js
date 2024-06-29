class ComponentRegistry {

    static componentRegistry = [];

    static registerApiComponent(componentClass) {
        let componentInstance = new componentClass();
        this.componentRegistry.push(componentInstance);
        componentInstance.onRegister();
    }
}