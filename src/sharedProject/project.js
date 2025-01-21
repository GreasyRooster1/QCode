import {get, ref} from "firebase/database";
import {db} from "../api/firebase";
import {getDateString} from "../api/util/util";
import {openLesson} from "../api/util/projects";
import {editorView} from "./code";

let projectMetadata;
let projectCode;

let shareBoardId;

let execFrame;
let iWindow = null;

function loadProject() {
    const urlParams = new URLSearchParams(window.location.search);
    shareBoardId = urlParams.get('shareboardid');
    get(ref(db,"sharedProjects/metadata/"+shareBoardId)).then((snapshot) => {
        projectMetadata = snapshot.val();
        insertInfo()
    })
    get(ref(db,"sharedProjects/projectData/"+shareBoardId)).then((snapshot) => {
        projectCode = snapshot.val();
        execFrame.contentWindow.location.reload();
        editorView.dispatch({changes: {
            from: 0,
            to: editorView.state.doc.length,
            insert: projectCode
        }})
    })
}

function insertInfo(){
    let title = document.querySelector(".info-title");

    let dateShared = document.querySelector(".info-date-shared");
    let dateCreated = document.querySelector(".info-date-created");
    let dateUpdated = document.querySelector(".info-date-updated");
    let version = document.querySelector(".info-version");

    let authorImg = document.querySelector(".info-author .author-icon img");
    let authorUsername = document.querySelector(".info-author .author-username");

    let originalInfo = document.querySelector(".info-original");
    let originalImg = document.querySelector(".info-original .original-icon img");
    let originalUsername = document.querySelector(".info-original .original-username");
    let originalTitle = document.querySelector(".info-original .original-block .title");

    let desc = document.querySelector(".info-desc");

    title.innerText = projectMetadata.name;
    if(projectMetadata.desc===undefined) {
        desc.innerText = "No Description";
    }else{
        desc.innerText = projectMetadata.desc;
    }
    dateShared.innerText = "Date Shared: "+getDateString(projectMetadata.shareDate);
    dateCreated.innerText = "Date Created: "+getDateString(projectMetadata.createdDate);
    dateUpdated.innerText = "Date Updated: "+getDateString(projectMetadata.updatedDate);

    if(projectMetadata.version===undefined){
        version.innerText = "Version: 1";
    }else{
        version.innerText = "Version: "+ projectMetadata.version;
    }

    get(ref(db,"userdata/"+projectMetadata.author+"/username")).then((snapshot) => {
        authorUsername.innerText = snapshot.val();
    });
    get(ref(db,"userdata/"+projectMetadata.author+"/profileIcon")).then((snapshot) => {
        authorImg.setAttribute("src",snapshot.val());
    });

    if(projectMetadata.original!==undefined){
        insertOriginalInfo(originalInfo,originalImg,originalUsername,originalTitle);
    }

    if(projectMetadata.lessonId!==null&&projectMetadata.lessonId!==undefined){
        document.querySelector(".code-editor").remove()
        document.querySelector(".lesson-button-container").style.display = "flex";
        get(ref(db,"lessons/"+projectMetadata.lessonId+"/name")).then((snapshot) => {
            document.querySelector(".lesson-title").innerHTML = snapshot.val()
        });
        get(ref(db,"lessons/"+projectMetadata.lessonId+"/thumb")).then((snapshot) => {
            document.querySelector(".lesson-thumb").src = snapshot.val()
        });
        document.querySelector(".lesson-button").addEventListener("click",()=>{
            openLesson(projectMetadata.lessonId);
        });
    }
}

function insertOriginalInfo(originalInfo,originalImg,originalUsername,originalTitle){
    originalInfo.style.display="flex";

    get(ref(db,"sharedProjects/metadata/"+projectMetadata.original)).then((snapshot) => {
        let data = snapshot.val();

        loadUserToHTML(originalUsername,originalImg,data.author);
        originalTitle.innerText=data.name;
    })

    originalInfo.lastElementChild.addEventListener("click",()=>{
        window.location.href="project.html?shareboardid="+projectMetadata.original;
    })

}

function loadUserToHTML(usernameEl,imgEl,uid){
    get(ref(db,"userdata/"+uid+"/username")).then((snapshot) => {
        usernameEl.innerText = snapshot.val();
    });
    get(ref(db,"userdata/"+uid+"/profileIcon")).then((snapshot) => {
        imgEl.setAttribute("src",snapshot.val());
    });
}

function setupFrame(){
    execFrame = document.getElementById("exec-frame");
    execFrame.addEventListener("load", () => {
        if(projectCode===null){
            return;
        }
        iWindow = execFrame.contentWindow;
        iWindow.postMessage(projectCode);
    });
}

export {setupFrame,loadProject,projectCode,projectMetadata,shareBoardId}