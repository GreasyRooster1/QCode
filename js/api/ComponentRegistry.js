class ComponentRegistry {

    static componentRegistry = [];

    static registerHtmlComponent(component) {
        customElements.define(component.name, component);
        let instance = new component()
        this.componentRegistry.push(instance);
        instance.onRegister();
    }
}