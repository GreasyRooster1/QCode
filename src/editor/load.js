import {get, ref, set} from "firebase/database";
import {db} from "../api/firebase";
import {getStoredUser} from "../api/auth";
import {populateSteps} from "./utils/loadUtils";
import {scrollToCurrentStep} from "./steps";
import {setupLessonCreator} from "./lessonCreator/setup";
import {languageTypes} from "./languageTypes";

let projectId=null;
let userUid = null;
let isLessonCreator = false;
let hasLesson = true;
let projectType;
const scrollableSteps = document.querySelector('.scrollable-steps');

function loadProjectFromUrlData(){
    let searchParams = new URLSearchParams(location.search);
    if(!searchParams.has("projectId")){
        return;
    }
    projectId = searchParams.get("projectId");

    if(projectId==="$$lesson$$creator$$"){
        isLessonCreator = true;
        let type = prompt("enter a type (javascript|web|arduino)")
        updateLanguage(type).then((projectType) =>
        {
            projectType.setupEditor();
            projectType.setupEditorLanguage()
            projectType.setupEventListeners()
            setupLessonCreator()
        })
        return;
    }

    if(!searchParams.has("uid")) {
        return;
    }

    if(searchParams.get("uid")!==getStoredUser().uid){
        return;
    }

    get(ref(db,"userdata/"+getStoredUser().uid+"/projects/"+projectId+"/language")).then((snapshot)=> {
        let id = "javascript";
        if(snapshot.exists()){
            id = snapshot.val();
        }else{
            set(ref(db,"userdata/"+getStoredUser().uid+"/projects/"+projectId+"/language"),"javascript");
        }
        updateLanguage(id).then((projectType) =>
        {
            setupProjectType(projectType,searchParams)
        })
    });
}

function setupProjectType(projectType,searchParams){
    console.log(projectType.run)
    projectType.setupEditor();
    projectType.setupEditorLanguage()
    projectType.setupEventListeners()
    projectType.loadProjectData(searchParams.get("projectId"));
    if(!searchParams.has("cNum")) {
        return;
    }
    projectType.chapterNum = searchParams.get("cNum");
}


function updateLanguage(id){
    return new Promise((resolve, reject) => {
        let type = languageTypes[id];
        if(type===undefined){
            reject();
        }else{
            resolve(new type());
        }
    });
}


function loadLesson(lessonId){
    get(ref(db,"lessons/"+lessonId)).then((snapshot) => {
        const data = snapshot.val();
        console.log(lessonId)
        if(data.chapters[projectType.chapterNum]!==null) {
            scrollableSteps.innerHTML = "";
            populateSteps(data)
            scrollToCurrentStep(lessonId)
        }else{
            console.log("invalid lesson!");
        }
    });
}

export {loadProjectFromUrlData,loadLesson,projectType,projectId,scrollableSteps}