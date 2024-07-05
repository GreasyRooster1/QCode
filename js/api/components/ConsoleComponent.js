class ConsoleComponent extends HtmlComponent{
    static validAttributes = ['type', 'message',"head"];
    static identifier = "console"

    generateContent() {
        return `
            <div class="log-head">
            
            </div>
            <div class="log-content">
            
            </div>
        `
    }

    setStyle(style){
        style.display = "block";
    }

    onAttributeChanged(name, oldValue, newValue) {
        if (name === 'type') {
            this.classList.add(newValue);
        } else if (name === 'message') {
            this.getInnerByClass("log-content").innerHTML = newValue;
        }else if (name === 'head') {
            this.getInnerByClass("log-head").innerHTML = newValue;
        }
    }
}

ComponentRegistry.register(ConsoleComponent);