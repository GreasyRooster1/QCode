let tabBarSections = document.getElementsByClassName("section");
let tabBarTabs = document.getElementsByClassName("tab");

function changeTab(idName){
    for (let section of tabBarSections) {
        section.style.display = "none";
    }

    document.getElementById(idName).style.display = "block";
}