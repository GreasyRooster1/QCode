import {get, ref, set} from "firebase/database";
import {db} from "../api/firebase";
import {getStoredUser} from "../api/auth";
import {JavascriptType} from "./languageTypes/javascript.ts";
import {WebType} from "./languageTypes/web/web.ts";
import {ArduinoType} from "./languageTypes/arduino.ts";
import {setupPanes} from "./panes";
import {populateSteps} from "./utils/loadUtils";
import {scrollToCurrentStep} from "./steps";

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
            console.log(projectType.run)
            projectType.setupEditor();
            projectType.setupEditorLanguage()
            projectType.setupEventListeners()
            projectType.loadProjectData(searchParams.get("projectId"));
            if(!searchParams.has("cNum")) {
                return;
            }
            projectType.chapterNum = searchParams.get("cNum");
        })
    });
}



function updateLanguage(id){
    return new Promise((resolve, reject) => {
        if (id === "javascript") {
            projectType = new JavascriptType();
            resolve(projectType)
            return;
        }
        if (id === "web") {
            projectType = new WebType();
            resolve(projectType)
            return;
        }
        if (id === "arduino") {
            projectType = new ArduinoType();
            resolve(projectType)
            return;
        }
        reject();
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
            setupPanes(false);
        }
    });
}

export {loadProjectFromUrlData,loadLesson,projectType,projectId,scrollableSteps}