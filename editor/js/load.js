let projectId=null;
let userUid = null;
let chapterNum = null;
let isLessonCreator = false;
let hasLesson = true;
let languageType;
const scrollableSteps = document.querySelector('.scrollable-steps');

function loadProjectFromUrlData(){
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
        chapterNum = parseInt(searchParams.get("cNum"));
    }

    if(userUid===getStoredUser().uid){
        loadProjectCode(projectId);
    }
}

function loadProjectCode(id){
    user = getStoredUser();
    database.ref("userdata/"+user.uid+"/projects/"+id+"/code").once('value').then((snapshot) => {
        const data = snapshot.val();
        writeToEditor(data);
        database.ref("userdata/"+user.uid+"/projects/"+id+"/lessonId").once('value').then((snapshot) => {
            let lessonId = snapshot.val();
            if (lessonId !== "none") {
                loadLesson(lessonId);
            } else {
                hasLesson = false;
                setupPanes(false);
            }
        });
    });

    database.ref("userdata/"+user.uid+"/projects/"+id+"/languageType").once('value').then((snapshot) => {
        let id = "javascript"
        if(snapshot.exists()){
            id = snapshot.val();
        }
        updateLanguage(id);
    })
}

function updateLanguage(id){
    if(id==="javascript"){
        import("./languageTypes/javascript.js").then((mod)=> {
            languageType = new mod.JavascriptType();
        });
    }
    if(id==="web"){
        import("./languageTypes/web.js").then((mod)=> {
            languageType = new mod.WebType();
        });
    }
}

function loadLesson(projectId){
    database.ref("lessons/"+projectId).once('value').then((snapshot) => {
        const data = snapshot.val();
        if(data.chapters[chapterNum]!==null) {
            scrollableSteps.innerHTML = "";
            populateSteps(data)
            scrollToCurrentStep(projectId)
        }else{
            console.log("invalid lesson!");
            setupPanes(false);
        }
    });
}
loadProjectFromUrlData()