class ComponentRegistry {

    static componentRegistry = [];

    static registerHtmlComponent(component) {
        customElements.define(component.name+"-component", component);
        let instance = new component()
        this.componentRegistry.push(instance);
        instance.onRegister();
    }
}