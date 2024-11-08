let tabBarSections = document.getElementsByClassName("section");
let tabBarTabs = document.getElementsByClassName("tab");

function changeTab(className){
    for (let section in tabBarSections) {
        section.style.display = "none";
    }

    section.getElementsByClassName(className).style.display = "block";
}