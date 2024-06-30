class ProjectLinkElement extends HTMLElement {
    link = null;

    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['href','name'];
    }

    connectedCallback() {
        this.link = document.createElement("a");

        if (this.attributes.getNamedItem("href") !== null) {
            let href = this.attributes.getNamedItem("href").value;
            this.link.setAttribute("href",href);
        }

        if (this.attributes.getNamedItem("name") !== null) {
            this.link.innerHTML = this.attributes.getNamedItem("name").value;
        }

        this.appendChild(this.link);
        this.classList.add("project-link");
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'href') {
                if(this.link!==null) {
                    this.link.href = newValue;
                }
            }else if(name === 'name'){
                if(this.link!==null) {
                    this.link.innerHTML = newValue;
                }
            }
        }
    }
}

customElements.define("project-link", ProjectLinkElement);