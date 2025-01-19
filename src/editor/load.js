import {get, ref} from "firebase/database";
import {db} from "../api/firebase";
import {getStoredUser} from "../api/auth";
import {JavascriptType} from "./languageTypes/javascript";
import {WebType} from "./languageTypes/web/web";
import {ArduinoType} from "./languageTypes/arduino";
import {setupPanes} from "./panes";

let projectId=null;
let userUid = null;
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
    let projectId = searchParams.get("projectId");
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
            db.ref("userdata/"+getStoredUser().uid+"/projects/"+projectId+"/language").set("javascript");
        }
        updateLanguage(id).then((projectType) =>
        {
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


function loadLesson(projectId){
    get(ref(db,"lessons/"+projectId)).then((snapshot) => {
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

export {loadProjectFromUrlData,loadLesson,projectType,projectId,scrollableSteps}