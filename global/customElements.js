class StepElement extends HTMLElement {
    head = null;
    headContent = null;
    content = null;
    contentWrapper = null;
    typeDisplay = null;

    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['type', 'head'];
    }

    connectedCallback() {
        this.head = document.createElement("div");
        this.head.classList.add("step-head");

        this.typeDisplay = document.createElement("div");
        this.typeDisplay.classList.add("type-display");

        this.headContent = document.createElement("div");
        this.headContent.classList.add("step-head-content");

        this.head.appendChild(this.headContent);
        this.head.appendChild(this.typeDisplay);

        this.content = document.createElement("div");
        this.content.classList.add("step-content");

        this.contentWrapper = document.createElement("div");
        this.contentWrapper.classList.add("step-content-wrapper");

        this.contentWrapper.appendChild(this.content);

        this.content.innerHTML = this.innerHTML;
        this.innerHTML = "";

        if (this.attributes.getNamedItem("head") !== null) {
            this.headContent.innerHTML = this.attributes.getNamedItem("head").value;
        }

        if (this.attributes.getNamedItem("type") !== null) {
            this.typeDisplay.innerHTML = this.attributes.getNamedItem("type").value;
        }

        this.appendChild(this.head);
        this.appendChild(this.contentWrapper);

        this.classList.add("step");
        this.style.display = "block";
    }

    getTypeDisplayString(){
        let typeStr = this.getAttribute("type");
        return typeStr.charAt(0).toUpperCase() + typeStr.slice(1);
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'type') {
                this.classList.add(newValue);
                if (this.typeDisplay === null) {
                    return;
                }
                this.typeDisplay = this.getTypeDisplayString();
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

class ConsoleLogElement extends HTMLElement {
    head = null;
    content = null;

    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['type', 'message',"head"];
    }

    connectedCallback() {
        this.head = document.createElement("div");
        this.head.classList.add("log-head");

        this.content = document.createElement("div");
        this.content.classList.add("log-content");

        if (this.attributes.getNamedItem("message") !== null) {
            this.content.innerHTML = this.attributes.getNamedItem("message").value;
        }

        if (this.attributes.getNamedItem("head") !== null) {
            this.head.innerHTML = this.attributes.getNamedItem("head").value;
        }

        this.appendChild(this.head);
        this.appendChild(this.content);

        this.classList.add("console-log");
        this.style.display = "block";
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'type') {
                this.classList.add(newValue);
            } else if (name === 'message') {
                if (this.content === null) {
                    return;
                }
                this.content.innerHTML = newValue;
            }else if (name === 'head') {
                if (this.head === null) {
                    return;
                }
                this.head.innerHTML = newValue;
            }
        }
    }
}

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


customElements.define("editor-step", StepElement);
customElements.define("brand-nav", BrandNav);
customElements.define("console-log", ConsoleLogElement);
customElements.define("project-link", ProjectLinkElement);