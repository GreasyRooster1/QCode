const newProjectButton = document.querySelector('.new-project-button');
const newProjectPopupContainer = document.querySelector('.new-project-popup-container');


newProjectButton.addEventListener('click', (e) => {
    showNewProjectPopup();
})

newProjectPopupContainer.addEventListener('click', (e) => {
    if(e.target===newProjectPopupContainer){
        hideNewProjectPopup();
    }
})

function showNewProjectPopup() {
    newProjectPopupContainer.style.opacity = '1';
    newProjectPopupContainer.style.pointerEvents = 'all';
}

function hideNewProjectPopup() {
    newProjectPopupContainer.style.opacity = '0';
    newProjectPopupContainer.style.pointerEvents = 'none';
}

function createProject(projectName){
    let cleanProjectId = projectName.toLowerCase().replaceAll("[^a-z0-9]","-");
    let user = getStoredUser();
    database.ref("userdata/"+user.uid+"/projects").child(cleanProjectId).once("value", (snap) => {
        if(snap.exists()){
            alert("Project already exists with that name!");
            return;
        }
        database.ref("userdata/"+user.uid+"/projects").child(cleanProjectId).set({
            code:defaultCode,
            lessonId:"none",
            name:projectName,
            currentChapter:0,
            currentStep:0,
            timestamp:Date.now()/1000,
        })
    })

}
