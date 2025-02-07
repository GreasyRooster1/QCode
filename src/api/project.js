import {getStoredUser} from "./auth";
import {db} from "./firebase";
import {defaultCodeArduino, defaultCodeJs, defaultFilesWeb} from "./util/code";
import {ref,get,update} from "firebase/database";
import {languageTypes} from "../editor/languageTypes";

function createProject(cleanProjectId,projectName,type,lessonId){

    return new Promise((resolve,reject)=>{
        let user = getStoredUser();
        get(ref(db,"userdata/"+user.uid+"/projects/"+cleanProjectId)).then((snap) => {
            debugger
            if(snap.exists()){
                reject();
            }
            update(ref(db,"userdata/"+user.uid+"/projects/"+cleanProjectId),getProjectDataForType(type,projectName,lessonId)).then(()=>{
                resolve();
            });
        })
    });
}

function getProjectDataForType(type,projectName,lessonId){
    return languageTypes[type].getProjectDBData(projectName,lessonId)
}

function cleanProjectName(projectName){
    if(projectName.length<1){
        projectName = "unnamed";
    }
    return projectName.toLowerCase().trim().replace(/[\W_]+/g,"-");
}

export {
    createProject,
    cleanProjectName,
    getProjectDataForType
}