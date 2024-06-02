const saveButton = document.querySelector('.save-button');

saveButton.addEventListener("click", function() {
    saveCode();
});

function saveCode() {
    let code = getCodeFromEditor();
    let user = getStoredUser();
    database.ref("userdata/"+user.uid+"/projects/"+projectId+"/code").set(code);
}
