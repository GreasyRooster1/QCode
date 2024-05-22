class EditorHandleElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const block = document.createElement("div");
        block.classList.add("editor-handle-element-block");
        this.appendChild(block);
    }
}

customElements.define("edit-handle", EditorHandleElement);