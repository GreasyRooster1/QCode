

function initRemix(){

    document.querySelector(".remix-button").addEventListener('click', () => {
        let name = prompt("Enter a name for your new project");
        if(name==null){
            return;
        }
        let cleanProjectId = name.toLowerCase().replaceAll("[^a-z0-9]","-");
        database.ref("userdata/"+getStoredUser().uid+"/projects/"+cleanProjectId).set({
            code:projectCode,
            lessonId:"none",
            name:name,
            currentChapter:0,
            currentStep:0,
            timestamp:Date.now()/1000,
            original:shareBoardID,
        }).then(() => {
            location.href = "../editor/editor.html"
        })
    })
}