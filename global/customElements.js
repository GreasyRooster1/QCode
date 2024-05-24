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
    head = null;
    content = null;

    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['type','head'];
    }

    connectedCallback() {
        this.head = document.createElement("div");
        this.head.classList.add("step-head");


        this.content = document.createElement("div");
        this.content.classList.add("step-content");

        this.content.innerHTML = this.innerHTML;
        this.innerHTML = "";

        if(this.attributes.getNamedItem("head")!==null) {
            this.head.innerHTML = this.attributes.getNamedItem("head").value;
        }

        this.appendChild(this.head);
        this.appendChild(this.content);

        this.classList.add("step");
        this.style.display = "block";
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if(oldValue !== newValue) {
            if(name==='type') {
                this.classList.add(newValue);
            }else if(name==='head') {
                if(this.head===null){
                    return;
                }
                this.head.innerHTML = newValue;
            }
        }
    }
}

customElements.define("editor-gutter", GutterElement);
customElements.define("editor-step", StepElement);