import {get, ref, set} from "firebase/database";
import {db} from "../api/firebase";
import {getStoredUser} from "../api/auth";
import {projectCode, shareBoardId} from "./project";
import {getLinkToProject} from "../api/util/projects";
import {cleanProjectName} from "../api/project";


function initRemix(){

    document.querySelector(".remix-button").addEventListener('click', () => {
        let name = prompt("Enter a name for your new project");
        if(name==null){
            return;
        }
        let cleanProjectId = cleanProjectName(name);
        get(ref(db,"userdata/"+getStoredUser().uid+"/projects/"+cleanProjectId)).then( (snap) => {
            if(snap.exists()){
                alert("Project already exists with that name!");
                return;
            }
            set(ref(db,"userdata/"+getStoredUser().uid+"/projects/"+cleanProjectId),{
                code:projectCode,
                lessonId:"none",
                name:name,
                currentChapter:0,
                currentStep:0,
                timestamp:Date.now()/1000,
                original:shareBoardId,
            }).then(() => {
                location.href = getLinkToProject(cleanProjectId,getStoredUser().uid,0);
            })
        })
    })
}

export {initRemix};
