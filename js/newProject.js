const newProjectButton = document.querySelector('.new-project-button');

newProjectButton.addEventListener('click', (e) => {
    //createProject();
})

function createProject(projectName){
    let user = getStoredUser();
    let date = new Date();
    database.ref("userdata/"+user.uid+"/projects").child(projectName).set({
        code:"function setup(){\n  //setup code here\n}\n\nfunction draw(){\n  //draw code goes here\n}\n",
        lessonId:"none",
        name:projectName
    })
}