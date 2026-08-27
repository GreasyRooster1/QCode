import '@style/global.css'
import '@style/sharedFrame/index.css'
import {ref,get } from "firebase/database";
import {db} from "@js/api/firebase.js";
import {capitalizeFirstLetter} from "@js/api/util/util.js";

let projectMetadata;
let projectCode;
let shareBoardId;

let execFrame;
let iWindow = null;

function init(){
    setupFrame();
    loadProject();
}

function loadProject() {
    const urlParams = new URLSearchParams(window.location.search);
    shareBoardId = urlParams.get('shareboardid');
    get(ref(db,"sharedProjects/metadata/"+shareBoardId)).then((snapshot) => {
        projectMetadata = snapshot.val();
        document.querySelector(".name").innerText = projectMetadata.name;
        get(ref(db,"userdata/"+projectMetadata.author+"/username")).then((snapshot) => {
            document.querySelector(".author").innerText = capitalizeFirstLetter(snapshot.val());
        });
    })
    get(ref(db,"sharedProjects/projectData/"+shareBoardId)).then((snapshot) => {
        projectCode = snapshot.val();
        execFrame.contentWindow.location.reload();
    })
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

init();
