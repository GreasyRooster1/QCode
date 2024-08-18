let currentProjectViewPage = 1;

function loadProjects(){
    let projectsRef = database.ref('userdata/'+user.uid+"/projects").orderByChild("timestamp")
    projectsRef.on('value', (snapshot) => {
        clearProjects();
        let i=0;
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            console.log("loaded project " + childSnapshot.key + " " + i);
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
