class ComponentRegistry {

    static componentRegistry = [];

    static registerApiComponent(component) {
        customElements.define(component.name, component);
        this.componentRegistry.push(component);
        component.onRegister();
    }
}