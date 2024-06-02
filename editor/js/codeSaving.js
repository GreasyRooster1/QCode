const saveButton = document.querySelector('.save-button');
let projectId = "test-project-1"


saveButton.addEventListener("click", function() {
    saveCode();
});

function saveCode() {
    let code = getCodeFromEditor();
    let user = getStoredUser();
    database.ref("userdata/"+user.uid+"/projects/"+projectId+"/code").set(code);
}
