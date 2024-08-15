let currentProjectViewPage = 1;

function loadProjects(){
    console.log((currentProjectViewPage-1)*5,(currentProjectViewPage)*5)
    let projectsRef = database.ref('userdata/'+user.uid+"/projects").orderByChild("timestamp").endBefore(50);
    projectsRef.on('value', (snapshot) => {
        clearProjects();
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();

            console.log("loaded project " + childSnapshot.key);
            createProjectElement(childSnapshot.key, data);
        });
    });
}

function createProjectElement(projectId,projectData){
    let el = document.createElement("project-link");
    el.setAttribute("href",getLinkToProject(projectId,getStoredUser().uid,projectData.currentChapter));
    el.setAttribute("name",projectData.name);
    el.setAttribute("timestamp",projectData.timestamp);
    projectsDisplay.prepend(el);
}

function clearProjects(){
    projectsDisplay.innerHTML = "";
}

function openProjectInEditor(projectId,uid,chapterNumber){
    window.location.href = getLinkToProject(projectId,uid,chapterNumber)
}

function getLinkToProject(projectId,uid,chapterNumber){
    return "editor/editor.html?projectId="+projectId+"&uid="+uid+"&cNum="+chapterNumber;
}

function updateProjectPageDisplay(){
    document.querySelector(".project-pages > .page-display").innerHTML = currentProjectViewPage;
    loadProjects()
}

document.querySelector(".project-pages > .left-arrow").onclick = function(){
    if(currentProjectViewPage > 1){
        currentProjectViewPage--;
        updateProjectPageDisplay()
    }
}

document.querySelector(".project-pages > .right-arrow").onclick = function(){
    currentProjectViewPage++;
    updateProjectPageDisplay()
}
