class ComponentRegistry {

    static registry = [];

    static register(component) {
        customElements.define(component.name+"-component", component);
        let instance = new component()
        this.registry.push(instance);
        instance.onRegister();
    }
}