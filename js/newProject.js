const newProjectButton = document.querySelector('.new-project-button');
const popupCloseButton = document.querySelector('.close-button');
const popupCreateButton = document.querySelector('.create-button');
const popupNameInput = document.querySelector('.name-input');
const popupTypeInput = document.querySelector('.type-select');
const newProjectPopupContainer = document.querySelector('.new-project-popup-container');


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
    let cleanProjectId = projectName.toLowerCase().replace(/[\W_]+/g,"-").trim();
    createProject(cleanProjectId,projectName,type).then(()=>{
        openProjectInEditor(cleanProjectId,getStoredUser().uid,0);
    }).catch(() => {
        alert("Project with that name already exists");
    })
})

function showNewProjectPopup() {
    newProjectPopupContainer.style.opacity = '1';
    newProjectPopupContainer.style.pointerEvents = 'all';
}

function hideNewProjectPopup() {
    newProjectPopupContainer.style.opacity = '0';
    newProjectPopupContainer.style.pointerEvents = 'none';
}

function createProject(cleanProjectId,projectName,type){
    return new Promise((resolve,reject)=>{
        let user = getStoredUser();
        database.ref("userdata/"+user.uid+"/projects").child(cleanProjectId).once("value", (snap) => {
            if(snap.exists()){
                reject();
            }
            database.ref("userdata/"+user.uid+"/projects").child(cleanProjectId).set({
                code:defaultCode,
                lessonId:"none",
                name:projectName,
                currentChapter:0,
                currentStep:0,
                timestamp:Date.now()/1000,
                language:type,
            })
            resolve();
        })
    });
}
