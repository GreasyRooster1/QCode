class StepComponent extends ApiComponent{
    name = "editor-step";
    defaultClass = "step";

    createContent() {
        return `
            <div class="step-head">
                <div class="step-head-content">
                
                </div>
                <div class="step-head-stats">
                    <div class="type-display">
                
                    </div>
                    <div class="step-count">
                
                    </div>
                </div>
            </div>
            <div class="step-content">
                <img class="step-image">
            </div>
        `;
    }

    onAttributeChanged(name, oldValue, newValue) {
        if (name === 'type') {
            this.clearTypes();
            this.classList.add(newValue);
            let typeDisplay = this.getInnerByClass("type-display")
            if (typeDisplay === null) {
                return;
            }
            typeDisplay.innerHTML = this.getTypeDisplayString();
        } else if (name === 'head') {
            let head = this.getInnerByClass("step-head-content")
            if (head === null) {
                return;
            }
            head.innerHTML = newValue;
        }else if (name === 'count') {
            let stepCount = this.getInnerByClass("step-count")
            if (stepCount === null) {
                return;
            }
            stepCount.innerHTML = "Step "+newValue;
        }else if (name === 'image') {
            let image = this.getInnerByClass("step-image")
            if(image===null) {
                return;
            }
            image.setAttribute("src",newValue);
        }
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
}