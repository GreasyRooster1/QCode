const newProjectButton = document.querySelector('.new-project-button');
newProjectButton.addEventListener('click', (e) => {
    createProject(prompt("name for new project"));
})

function createProject(projectName){
    let user = getStoredUser();
    let projectId = projectName.replace(" ","-").toLowerCase();
    database.ref("userdata/"+user.uid+"/projects").child(projectId).set({
        code:defaultCode,
        lessonId:"none",
        name:projectName
    })
}
