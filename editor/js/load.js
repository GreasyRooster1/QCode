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

getUrlData()