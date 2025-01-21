import {get, ref} from "firebase/database";
import {db} from "../firebase";
import {createProject} from "../project";
import {getStoredUser} from "../auth";

function openProjectInEditor(projectId,uid,chapterNumber){
    window.location.href = getLinkToProject(projectId,uid,chapterNumber)
}

function getLinkToProject(projectId,uid,chapterNumber){
    return "./editor.html?projectId=" + projectId + "&uid=" + uid + "&cNum=" + chapterNumber;
}

function startExternalLesson(lessonData){
    window.location.href = lessonData.link;
}

function startInternalLesson(ref,lessonId,lessonData){
    let starterCode = lessonData.starterCode;
    if(starterCode==="default"){
        starterCode = defaultCode;
    }
    createProject(lessonId,lessonData.name,lessonData.type,lessonId)
    openProjectInEditor(lessonId,getStoredUser().uid,0);
}

function openLesson(lessonId){
    let uid = getStoredUser().uid;
    let loc = "userdata/"+uid+"/projects/";
    let projectId = lessonId
    get(ref(db,loc+projectId)).then(function (snap) {
        if(snap.exists()){
            openProjectInEditor(projectId,uid,snap.val().currentChapter);
            return;
        }
        get(ref(db,"lessons/"+lessonId)).then(function (snap) {
            let lessonData = snap.val();
            if(lessonData.isExternal){
                startExternalLesson(lessonData);
            }else {
                startInternalLesson(loc,lessonId,lessonData)
            }
        });
    })
}

export {getLinkToProject,openProjectInEditor,openLesson}