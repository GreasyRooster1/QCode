class ListPane extends GenericButtonComponent {
    static validAttributes = [];
    static identifier = "list-pane"

    generateContent() {
        return `
            <div class="items">
            
            </div>
            <div class="details">
            
            </div>
        `
    }

    onCreated() {
        super.onCreated();
    }

    setDetails(){

    }

    createItem(){

    }
}

ComponentRegistry.register(ListPane);