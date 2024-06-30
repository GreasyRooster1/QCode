class Interaction {
    static addClickEvent(querySelector,func) {
        let element = document.querySelector(querySelector);
        element.addEventListener("click",func);
    }
}