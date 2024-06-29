class ComponentRegistry {

    static componentRegistry = [];

    static registerApiComponent(component) {
        customElements.define(component.name, component);
        let instance = new component()
        this.componentRegistry.push(instance);
        instance.onRegister();
    }
}