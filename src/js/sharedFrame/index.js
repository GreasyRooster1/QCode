import '@style/global.css'
import '@style/sharedFrame/index.css'
import {ref,get } from "firebase/database";
import {db} from "@js/api/firebase.js";

let projectMetadata;
let projectCode;
let shareBoardId;

let execFrame;
let iWindow = null;

function init(){
    loadProject();
}

function loadProject() {
    const urlParams = new URLSearchParams(window.location.search);
    shareBoardId = urlParams.get('shareboardid');
    get(ref(db,"sharedProjects/metadata/"+shareBoardId)).then((snapshot) => {
        projectMetadata = snapshot.val();
    })
    get(ref(db,"sharedProjects/projectData/"+shareBoardId)).then((snapshot) => {
        projectCode = snapshot.val();
        execFrame.contentWindow.location.reload();
    })
}


init();
