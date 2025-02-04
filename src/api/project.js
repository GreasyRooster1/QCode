import {getStoredUser} from "./auth";
import {db} from "./firebase";
import {defaultCodeArduino, defaultCodeJs, defaultFilesWeb} from "./util/code";
import {ref,get,set} from "firebase/database";

function createProject(cleanProjectId,projectName,type,lessonId){

    return new Promise((resolve,reject)=>{
        let user = getStoredUser();
        get(ref(db,"userdata/"+user.uid+"/projects/"+cleanProjectId)).then((snap) => {
            debugger
            if(snap.exists()){
                reject();
            }
            set(ref(db,"userdata/"+user.uid+"/projects/"+cleanProjectId),setupProjectForType(type,projectName,lessonId)).then(()=>{
                resolve();
            });
        })
    });
}

function setupProjectForType(type,projectName,lessonId){
    switch(type){
        case 'javascript':
            return getJSProjectData(projectName,lessonId)
        case 'web':
            return getWebProjectData(projectName,lessonId)
        case 'arduino':
            return getArduinoProjectData(projectName,lessonId)
    }
}

function getJSProjectData(projectName,lessonId){
    return {
        code:defaultCodeJs,
        lessonId:lessonId??"none",
        name:projectName,
        currentChapter:0,
        currentStep:0,
        timestamp:Date.now()/1000,
        language:"javascript",
    }
}

function getWebProjectData(projectName,lessonId){
    return {
        files:defaultFilesWeb,
        lessonId:lessonId??"none",
        name:projectName,
        currentChapter:0,
        currentStep:0,
        timestamp:Date.now()/1000,
        language:"web",
    }
}

function getArduinoProjectData(projectName,lessonId){
    return {
        code:defaultCodeArduino,
        lessonId:lessonId??"none",
        name:projectName,
        currentChapter:0,
        currentStep:0,
        timestamp:Date.now()/1000,
        language:"arduino",
    }
}

function cleanProjectName(projectName){
    return projectName.toLowerCase().trim().replace(/[\W_]+/g,"-");
}

export {
    createProject,
    getArduinoProjectData,
    getJSProjectData,
    getWebProjectData,
    cleanProjectName,
    setupProjectForType
}