class Interaction {

    static queryClickEvent(querySelector,func) {
        let element = document.querySelector(querySelector);
        element.addEventListener("click",func);
    }

    static elementClickEvent(element,func) {
        element.addEventListener("click",func);
    }
}