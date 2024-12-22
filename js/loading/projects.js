let currentProjectViewPage = 1;

function loadProjects(){
    let projectsRef = database.ref('userdata/'+user.uid+"/projects").orderByChild("dateUpdated")
    let projects = []
    projectsRef.on('value', (snapshot) => {
        clearProjects();
        let i=0;
        snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            console.log("loaded project " + childSnapshot.key + " " + i);
            projects.push({
                key: childSnapshot.key,
                data: data
            });
        });
        console.log(projects);
        projects.sort((a,b) => {
            return a.data.timestamp - b.data.timestamp;
        })
        for(let project of projects){
            createProjectElement(project.key, project.data);
        }
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
    if(window.location.href.includes("index.html")||window.location.href.endsWith("/")){
        return "editor/editor.html?projectId="+projectId+"&uid="+uid+"&cNum="+chapterNumber;
    }else {
        return "../editor/editor.html?projectId="+projectId+"&uid="+uid+"&cNum="+chapterNumber;
    }
}
