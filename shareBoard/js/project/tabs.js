let tabBarSections = document.getElementsByClassName("section");
let tabBarTabs = document.getElementsByClassName("tab");

function changeTab(idName){
    for (let section of tabBarSections) {
        section.style.display = "none";
    }

    document.getElementById(idName).style.display = "block";
}

function initTabs(){
    changeTab("info")
    for (let tab of tabBarTabs) {
        tab.addEventListener("click", (e)=>{
            console.log(e.target.id);
            changeTab(e.target.id);
        })
    }
}