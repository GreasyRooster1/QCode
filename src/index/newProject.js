import {getStoredUser} from "../api/auth";
import {cleanProjectName, createProject} from "../api/project";
import {openProjectInEditor} from "../api/util/projects";

const newProjectButton = document.querySelector('.new-project-button');
const popupCloseButton = document.querySelector('.close-button');
const popupCreateButton = document.querySelector('.create-button');
const popupNameInput = document.querySelector('.name-input');
const popupTypeInput = document.querySelector('.type-select');
const newProjectPopupContainer = document.querySelector('.new-project-popup-container');

function showNewProjectPopup() {
    newProjectPopupContainer.style.opacity = '1';
    newProjectPopupContainer.style.pointerEvents = 'all';
}

function hideNewProjectPopup() {
    newProjectPopupContainer.style.opacity = '0';
    newProjectPopupContainer.style.pointerEvents = 'none';
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

export {setupNewProjectEvents}