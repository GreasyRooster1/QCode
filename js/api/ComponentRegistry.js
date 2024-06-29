class ComponentRegistry {

    static componentRegistry = [];

    static registerApiComponent(component) {
        this.componentRegistry.push(component);
        component.onRegister();
    }
}