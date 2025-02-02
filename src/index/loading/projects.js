import {projectsDisplay} from "../index";
import {onValue, orderByChild, query, ref} from "firebase/database";
import {db} from "../../api/firebase";
import {getStoredUser} from "../../api/auth";
import {openProjectInEditor,getLinkToProject} from "../../api/util/projects";

let currentProjectViewPage = 1;

function loadProjects(){
    let projectsRef = query(ref(db,'userdata/'+getStoredUser().uid+"/projects"),orderByChild("dateUpdated"))
    onValue(projectsRef, (snapshot) => {
        clearProjects();
        let projects = []
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
            return (a.data.dateUpdated??a.data.timestamp) - (b.data.dateUpdated??b.data.timestamp);
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
    el.setAttribute("timestamp",projectData.dateUpdated??projectData.timestamp);
    projectsDisplay.prepend(el);
}

function clearProjects(){
    projectsDisplay.innerHTML = "";
}

export {loadProjects};
