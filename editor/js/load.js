let projectId=null;
let userUid = null;
/**
 * @type {string | number | null}
 */
let chapterNum = null;
let isLessonCreator = false;
let hasLesson = true;
let projectType;
const scrollableSteps = document.querySelector('.scrollable-steps');

function loadProjectFromUrlData(){
    let searchParams = new URLSearchParams(location.search);
    if(!searchParams.has("projectId")){
        return;
    }
    if(!searchParams.has("uid")) {
        return;
    }

    if(searchParams.get("uid")===getStoredUser().uid){
        database.ref("userdata/"+getStoredUser().uid+"/projects/"+this.projectId).once("value",(snapshot)=> {
            let id = "javascript";
            if(snapshot.exists()){
                id = snapshot.val();
            }
            updateLanguage(id).then((projectType) => {
                projectType.setupEditor();
                projectType.loadProjectData(searchParams.get("projectId"));
            })
        });
    }
}



function updateLanguage(id){
    return new Promise((resolve, reject) => {
        if (id === "javascript") {
            import("./languageTypes/javascript.js").then((mod) => {
                projectType = new mod.JavascriptType();
                resolve(projectType)
            });
            return;
        }
        if (id === "web") {
            import("./languageTypes/web.js").then((mod) => {
                projectType = new mod.WebType();
                resolve(projectType)
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

loadProjectFromUrlData()