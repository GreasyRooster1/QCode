let scripts = [
    "ApiComponent.js",
    "ComponentRegistry.js",
]

let components = [
    "StepComponent.js"
]

function addScripts(){
    for(let scriptSrc of scripts){
        let script = document.createElement("script");
        script.src = "js/api/"+scriptSrc;
        script.defer = true;
        document.head.appendChild(script)
    }

    for(let componentSrc of components){
        let script = document.createElement("script");
        script.src = "js/api/components/"+componentSrc;
        document.head.appendChild(script)
    }
}

addScripts()