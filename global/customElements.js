class StepElement extends HTMLElement {
    head = null;
    content = null;
    contentWrapper = null;

    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['type', 'head'];
    }

    connectedCallback() {
        this.head = document.createElement("div");
        this.head.classList.add("step-head");


        this.content = document.createElement("div");
        this.content.classList.add("step-content");

        this.contentWrapper = document.createElement("div");
        this.contentWrapper.classList.add("step-content-wrapper");

        this.contentWrapper.appendChild(this.content);

        this.content.innerHTML = this.innerHTML;
        this.innerHTML = "";

        if (this.attributes.getNamedItem("head") !== null) {
            this.head.innerHTML = this.attributes.getNamedItem("head").value;
        }

        this.appendChild(this.head);
        this.appendChild(this.contentWrapper);

        this.classList.add("step");
        this.style.display = "block";
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'type') {
                this.classList.add(newValue);
            } else if (name === 'head') {
                if (this.head === null) {
                    return;
                }
                this.head.innerHTML = newValue;
            }
        }
    }
}

class BrandNav extends HTMLElement {

    constructor() {
        super();
    }

    connectedCallback() {
        this.innerHTML = `
            <div class="navbar">
                <div class="account-dropdown-wrapper">
                    <div class="username-link">Login</div>
                    <div class="account-options">
                        <div class="logout-button option">Logout</div>
                    </div>
                </div>
            </div>
            <div class="navbar-visibility-button">
                ^
            </div>
            <div class="nav-shift-fix"></div>
        `
    }
}

customElements.define("editor-step", StepElement);
customElements.define("brand-nav", BrandNav);