import {getStoredUser} from "./auth";
import {db} from "./firebase";

function createProject(cleanProjectId,projectName,type,lessonId){
    return new Promise((resolve,reject)=>{
        let user = getStoredUser();
        db.ref("userdata/"+user.uid+"/projects").child(cleanProjectId).once("value", (snap) => {
            if(snap.exists()){
                reject();
            }
            db.ref("userdata/"+user.uid+"/projects").child(cleanProjectId).set(
                setupProjectForType(type,projectName,lessonId)
            )
            resolve();
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