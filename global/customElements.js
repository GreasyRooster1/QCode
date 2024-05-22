class EditorHandleElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const block = document.createElement("div");
        block.classList.add("edit-handle-block");
        this.appendChild(block);
        this.classList.add("gutter");
    }
}

customElements.define("edit-handle", EditorHandleElement);