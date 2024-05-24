class GutterElement extends HTMLElement {
    constructor() {
        super();
    }

    connectedCallback() {
        const block = document.createElement("div");
        block.classList.add("gutter-block");
        this.appendChild(block);
        this.classList.add("gutter");
    }
}

customElements.define("gutter", GutterElement);