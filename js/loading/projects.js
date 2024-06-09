
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

function createProjectElement(projectId,projectData){
    let el = document.createElement("project-link");
    el.setAttribute("href",getLinkToProject(projectId,getStoredUser().uid,projectData.currentChapter));
    el.setAttribute("name",projectData.name);
    projectsDisplay.appendChild(el);
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