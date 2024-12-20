let projectId=null;
let userUid = null;
let chapterNum = null;
let isLessonCreator = false;
let hasLesson = true;
let projectType;
const scrollableSteps = document.querySelector('.scrollable-steps');

function loadProjectFromUrlData(){
    if(!searchParams.has("projectId")){
        return;
    }
    if(!searchParams.has("uid")) {
        return;
    }

    if(searchParams.get("uid")===getStoredUser().uid){
        updateLanguage().then(()=>{
            projectType.loadProjectData(searchParams.get("projectId"));
        })
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
    return new Promise((resolve, reject) => {
        if (id === "javascript") {
            import("./languageTypes/javascript.js").then((mod) => {
                languageType = new mod.JavascriptType();
                resolve(languageType)
            });
            return;
        }
        if (id === "web") {
            import("./languageTypes/web.js").then((mod) => {
                languageType = new mod.WebType();
                resolve(languageType)
            });
            return;
        }
        reject();
    });
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