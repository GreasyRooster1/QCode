const newProjectButton = document.querySelector('.new-project-button');
const defaultCode = "function setup(){\n  //setup code here\n}\n\nfunction draw(){\n  //draw code goes here\n}\n"
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
