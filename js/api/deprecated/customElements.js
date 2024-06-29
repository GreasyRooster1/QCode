class StepElement extends HTMLElement {
    head = null;
    headContent = null;
    typeDisplay = null;
    stepCount = null;
    headStat = null;
    image = null;

    content = null;
    textContent = null;

    constructor() {
        super();
    }

    static get observedAttributes() {
        return ['type', 'head', 'image', 'count'];
    }

    connectedCallback() {
        this.head = document.createElement("div");
        this.head.classList.add("step-head");

        this.typeDisplay = document.createElement("div");
        this.typeDisplay.classList.add("type-display");

        this.stepCount = document.createElement("div");
        this.stepCount.classList.add("step-count");

        this.headContent = document.createElement("div");
        this.headContent.classList.add("step-head-content");

        this.headStat = document.createElement("div");
        this.headStat.classList.add("step-head-stats")


        this.headStat.appendChild(this.typeDisplay);
        this.headStat.appendChild(this.stepCount);

        this.head.appendChild(this.headContent);
        this.head.appendChild(this.headStat);

        this.content = document.createElement("div");
        this.content.classList.add("step-content");

        this.image = document.createElement("img");
        this.image.classList.add("step-image");

        this.textContent = document.createElement("div");
        this.textContent.classList.add("step-text-content");

        this.content.appendChild(this.textContent);
        this.content.appendChild(this.image);

        this.textContent.innerHTML = this.innerHTML;
        this.innerHTML = "";

        if (this.attributes.getNamedItem("head") !== null) {
            this.headContent.innerHTML = this.attributes.getNamedItem("head").value;
        }

        if (this.attributes.getNamedItem("type") !== null) {
            this.typeDisplay.innerHTML = this.getTypeDisplayString();
        }

        if (this.attributes.getNamedItem("count") !== null) {
            this.stepCount.innerHTML = "Step "+this.attributes.getNamedItem("count").value;
        }

        if (this.attributes.getNamedItem("image") !== null) {
            this.image.setAttribute("src",this.attributes.getNamedItem("image").value);
        }

        this.appendChild(this.head);
        this.appendChild(this.content);

        this.classList.add("step");
    }

    getTypeDisplayString(){
        let typeStr = this.getAttribute("type");
        return typeStr.charAt(0).toUpperCase() + typeStr.slice(1);
    }

    clearTypes(){
        for(let type of stepTypes){
            this.classList.remove(type);
        }
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === 'type') {
                this.clearTypes();
                this.classList.add(newValue);
                if (this.typeDisplay === null) {
                    return;
                }
                this.typeDisplay.innerHTML = this.getTypeDisplayString();
            } else if (name === 'head') {
                if (this.head === null) {
                    return;
                }
                this.head.innerHTML = newValue;
            }else if (name === 'count') {
                if (this.stepCount === null) {
                    return;
                }
                this.stepCount.innerHTML = "Step "+newValue;
            }else if (name === 'image') {
                if(this.image===null) {
                    return;
                }

                this.image.setAttribute("src",newValue);
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
                <div class="home-link">Home</div>
                <div class="points-display">
                    Points: <span class="points-display-num">0</span>
                </div>
                <div class="account-dropdown-wrapper">
                    <div class="account-dropdown">
                        <div class="username-link">Login</div>
                        <div class="account-options">
                            <div class="logout-button option">Logout</div>
                        </div>
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