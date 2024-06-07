const badgeDisplay = document.querySelector(".badges-display");
const projectsDisplay = document.querySelector(".projects-display");
let user = getStoredUser();

function init(){
    loadBadges();
    loadProjects();
    removeNavHome();
}

function loadBadges(){
    let badgesRef = database.ref('userdata/'+user.uid+"/badges");
    badgesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        clearBadges();

        badgeDisplay.innerHTML = "";
        let badges = data.values().toArray().filter(b => b!==undefined);
        for(let badge of badges){
            let badgeConnect = firebase.database().ref().child("badges").child(badge.id).get();
            badgeConnect.then((snap)=>{
                createBadgeElementFromSnap(snap,badge.id)
            });
        }
    });
}

function loadProjects(){
    let projectsRef = database.ref('userdata/'+user.uid+"/projects");
    projectsRef.on('value', (snapshot) => {
        const data = snapshot.val();
        clearProjects();

        for(const [projectId, projectData] of Object.entries(data)){
            console.log("loaded project "+projectId);
            createProjectElement(projectId,projectData);
        }
    });
}


function createBadgeElementFromSnap(snap,id){
    let badgeProperties = snap.val();

    let badgeElement = document.createElement("div");
    badgeElement.classList.add("badge");

    let img = document.createElement("img");
    img.setAttribute("src",badgeProperties.image);
    img.setAttribute("alt",badgeProperties.name+" badge");
    img.setAttribute("title",badgeProperties.name);

    let hoverText = document.createElement("div");
    hoverText.classList.add("badge-desc");

    let hoverTextContent = document.createElement("div");
    hoverTextContent.classList.add("badge-desc-text");
    hoverTextContent.innerHTML = badgeProperties.value+"pts";

    hoverText.appendChild(hoverTextContent);

    badgeElement.setAttribute("data-badgeid",id)

    badgeElement.appendChild(img);
    badgeElement.appendChild(hoverText);

    badgeElement.addEventListener("click",function (e) {
        badgeClickEvent(e.currentTarget);
    })

    badgeDisplay.appendChild(badgeElement)
}

function createProjectElement(projectId,projectData){
    let el = document.createElement("project-link");
    el.setAttribute("href","editor/editor.html?projectId="+projectId+"&uid="+getStoredUser().uid);
    el.setAttribute("name",projectData.name);
    projectsDisplay.appendChild(el);
}

function clearProjects(){
    projectsDisplay.innerHTML = "";
}

function clearBadges(){
    badgeDisplay.innerHTML = "";
}

function removeNavHome(){
    let home = document.querySelector(".home-link");
    home.remove();
}

init();