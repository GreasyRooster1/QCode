import {database} from "../api/firebase";
import {getStoredUser} from "../api/auth";

const newProjectButton = document.querySelector('.new-project-button');
const popupCloseButton = document.querySelector('.close-button');
const popupCreateButton = document.querySelector('.create-button');
const popupNameInput = document.querySelector('.name-input');
const popupTypeInput = document.querySelector('.type-select');
const newProjectPopupContainer = document.querySelector('.new-project-popup-container');

function cleanProjectName(projectName){
    return projectName.toLowerCase().trim().replace(/[\W_]+/g,"-");
}

function showNewProjectPopup() {
    newProjectPopupContainer.style.opacity = '1';
    newProjectPopupContainer.style.pointerEvents = 'all';
}

function hideNewProjectPopup() {
    newProjectPopupContainer.style.opacity = '0';
    newProjectPopupContainer.style.pointerEvents = 'none';
}

function createProject(cleanProjectId,projectName,type,lessonId){
    return new Promise((resolve,reject)=>{
        let user = getStoredUser();
        database.ref("userdata/"+user.uid+"/projects").child(cleanProjectId).once("value", (snap) => {
            if(snap.exists()){
                reject();
            }
            database.ref("userdata/"+user.uid+"/projects").child(cleanProjectId).set(
                setupProjectForType(type,projectName,lessonId)
            )
            resolve();
        })
    });
}

function setupProjectForType(type,projectName,lessonId){
    switch(type){
        case 'javascript':
            return getJSProjectData(projectName,lessonId)
        case 'web':
            return getWebProjectData(projectName,lessonId)
        case 'arduino':
            return getArduinoProjectData(projectName,lessonId)
    }
}

function getJSProjectData(projectName,lessonId){
    return {
        code:defaultCodeJs,
        lessonId:lessonId??"none",
        name:projectName,
        currentChapter:0,
        currentStep:0,
        timestamp:Date.now()/1000,
        language:"javascript",
    }
}

function getWebProjectData(projectName,lessonId){
    return {
        files:defaultFilesWeb,
        lessonId:lessonId??"none",
        name:projectName,
        currentChapter:0,
        currentStep:0,
        timestamp:Date.now()/1000,
        language:"web",
    }
}

function getArduinoProjectData(projectName,lessonId){
    return {
        code:defaultCodeArduino,
        lessonId:lessonId??"none",
        name:projectName,
        currentChapter:0,
        currentStep:0,
        timestamp:Date.now()/1000,
        language:"arduino",
    }
}

function setupNewProjectEvents(){
    newProjectButton.addEventListener('click', (e) => {
        showNewProjectPopup();
    })

    newProjectPopupContainer.addEventListener('click', (e) => {
        if(e.target===newProjectPopupContainer){
            hideNewProjectPopup();
        }
    })

    popupCloseButton.addEventListener('click', (e) => {
        hideNewProjectPopup();
    })

    popupCreateButton.addEventListener('click', (e) => {
        let projectName = popupNameInput.value;
        let type = popupTypeInput.value;
        let cleanProjectId = cleanProjectName(projectName);
        createProject(cleanProjectId,projectName,type).then(()=>{
            openProjectInEditor(cleanProjectId,getStoredUser().uid,0);
        }).catch(() => {
            alert("Project with that name already exists");
        })
    })
}

export {cleanProjectName,createProject,setupNewProjectEvents}