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

class StepElement extends HTMLElement {
    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['type'];
    }

    connectedCallback() {
        const head = document.createElement("div");
        head.classList.add("step-head");


        const content = document.createElement("div");
        content.classList.add("step-content");

        content.innerHTML = this.innerHTML;
        this.innerHTML = "";

        this.appendChild(head);
        this.appendChild(content);

        this.classList.add("step");
        this.style.display = "block";
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(oldValue !== newValue) {
            this.classList.add(newValue);
        }
    }
}

customElements.define("editor-gutter", GutterElement);
customElements.define("editor-step", StepElement);