function createProjectElement(projectId,projectData){
    let el = document.createElement("project-link");
    el.setAttribute("href","editor/editor.html?projectId="+projectId+"&uid="+getStoredUser().uid);
    el.setAttribute("name",projectData.name);
    projectsDisplay.appendChild(el);
}

function clearProjects(){
    projectsDisplay.innerHTML = "";
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