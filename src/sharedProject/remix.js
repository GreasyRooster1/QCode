import {get, ref, set} from "firebase/database";
import {db} from "../api/firebase";
import {getStoredUser} from "../api/auth";


function initRemix(){

    document.querySelector(".remix-button").addEventListener('click', () => {
        let name = prompt("Enter a name for your new project");
        if(name==null){
            return;
        }
        let cleanProjectId = name.toLowerCase().replaceAll("[^a-z0-9]","-");
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
                original:shareBoardID,
            }).then(() => {
                location.href = getLinkToProject(cleanProjectId,getStoredUser().uid,0);
            })
        })
    })
}

function getLinkToProject(projectId,uid,chapterNumber){
    return "editor/editor.html?projectId="+projectId+"&uid="+uid+"&cNum="+chapterNumber;
}
export {getLinkToProject,initRemix};
