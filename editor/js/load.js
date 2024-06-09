let projectId=null;
let userUid = null;
let chapterNum = null;
let isLessonCreator = false;
const scrollableSteps = document.querySelector('.scrollable-steps');

function getUrlData(){
    const searchParams = new URLSearchParams(window.location.search);
    if(searchParams.has("uid")){
        userUid = searchParams.get("uid");
    }
    if(searchParams.has("projectId")){
        projectId = searchParams.get("projectId");
        if(projectId==="$$lesson$$creator$$"){
            isLessonCreator = true;
            setupLessonCreator();
            return;
        }
    }

    if(searchParams.has("cNum")){
        chapterNum = searchParams.get("cNum");
    }

    if(userUid===getStoredUser().uid){
        loadProjectCode(projectId);
    }
}

function loadProjectCode(id){
    user = getStoredUser();
    database.ref("userdata/"+user.uid+"/projects/"+id).once('value').then((snapshot) => {
        const data = snapshot.val();
        writeToEditor(data.code);
        if(data.lessonId!=="none"){
            loadLesson(data.lessonId);
        }else{
            setupPanes(false);
        }
    });
}

function loadLesson(id){
    database.ref("lessons/"+id).once('value').then((snapshot) => {
        const data = snapshot.val();
        if(data.chapters[chapterNum]!==null) {
            scrollableSteps.innerHTML = "";
            populateSteps(data)
        }else{
            console.log("invalid lesson!");
            setupPanes(false);
        }
    });
}

function populateSteps(data){
    createChapterStep(data);

    let count = 1;
    for (let step of data.chapters[chapterNum].steps) {
        createStep(step.head,step.content,step.image,step.type,count);
        count++;
    }
    createBufferSpace()
    setupPanes(true);
}

function createStep(head,content,image,type,count){
    let stepEl = document.createElement("editor-step");
    stepEl.setAttribute("head", head);
    stepEl.setAttribute("type", type);
    stepEl.setAttribute("count", count);
    stepEl.setAttribute("image", image);
    stepEl.innerHTML = content;
    scrollableSteps.appendChild(stepEl);
    return stepEl;
}

function createStepFromObj(step){
    return createStep(step.head,step.content,step.image,step.type,step.count);
}

function createBufferSpace(){
    let buffer = document.createElement("div");
    buffer.classList.add("buffer");
    scrollableSteps.appendChild(buffer);
}

function writeToEditor(data){
    const transaction = editor.state.update({changes: {from: 0, to: editor.state.doc.length, insert: data}})
    const update = editor.state.update(transaction);
    editor.update([update]);
}

function createChapterStep(data){
    createStep(data.name,getChapterStepContent(data.chapters),"none","chapters","0");
}

function getChapterStepContent(chapters){
    let content="";
    let count=1;
    for(let chapter of chapters){
        content+=createChapterLink(count-1,chapter)+"<br>";
        count++;
    }
    return content;
}
function getChapterStepContentNoLink(chapters){
    let content="";
    let count=1;
    for(let chapter of chapters){
        content+="Chapter "+count+" - "+chapter.name+"<br>";
        count++;
    }
    return content;
}

function createChapterLink(chapterNum,chapterData){
    let name = "Chapter "+chapterNum+" - "+chapterData.name;
    let linkEl = document.createElement("span");
    linkEl.innerHTML = name;
    linkEl.setAttribute("data-href",getLinkToProject(projectId,getStoredUser().uid,chapterNum));
    linkEl.classList.add("chapter-link")
    return linkEl.outerHTML;
}

getUrlData()