let projectId=null;
let hasLesson = false;
const scrollableSteps = document.querySelector('.scrollable-steps');

function getProject(){
    const searchParams = new URLSearchParams(window.location.search);
    if(searchParams.has("projectId")){
        projectId = searchParams.get("projectId");
        loadProjectCode(projectId);
    }
    setupPanes(hasLesson);
}

function loadProjectCode(id){
    user = getStoredUser();
    database.ref("userdata/"+user.uid+"/projects/"+projectId).on('value', (snapshot) => {
        const data = snapshot.val();
        writeToEditor(data.code);
        if(data.lessonId!=="none"){
            loadLesson(data.lessonId);
            hasLesson = true;
        }
    });
}

function loadLesson(id){
    database.ref("lessons/"+id).on('value', (snapshot) => {
        const data = snapshot.val();
        console.log(data)
        scrollableSteps.innerHTML = "";
        populateSteps(data)
    });
}

function populateSteps(data){
    for (let step of data.steps) {
        let stepEl = document.createElement("editor-step");
        stepEl.setAttribute("head", step.head);
        stepEl.setAttribute("type", step.type);
        stepEl.innerHTML = step.content;
        scrollableSteps.appendChild(stepEl);
    }
}

function writeToEditor(data){
    const transaction = editor.state.update({changes: {from: 0, to: editor.state.doc.length, insert: data}})
    const update = editor.state.update(transaction);
    editor.update([update]);
}

getProject()