import {getStoredUser} from "../api/auth";
import {getSharedProjectId} from "../api/shareBoard";
import {db} from "../api/firebase";
import {get, ref} from "firebase/database";
import {getCodeFromEditor} from "./codeExecution";
import {projectId, projectType} from "./load";

const shareButton = document.querySelector('.share-button');
const popupContainer = document.querySelector('.share-popup-container');
const sharePopupButton = document.querySelector('.share-popup-button');
const closePopupButton = document.querySelector('.close-button');
const shareNameInput = document.querySelector('.share-popup-content .name-input');
const shareDescInput = document.querySelector('.share-popup-content .desc-input');
const previewIframe = document.getElementById('share-preview-frame');

let isAlreadyShared = false;



function setupShareEvents(){
    closePopupButton.addEventListener("click", (e) => {
        hidePopup();
    })

    sharePopupButton.addEventListener('click', (e) => {
        shareProject()
    })
}

//holy shit this function is huge
//todo: refactor
function shareProject(){
    if(shareNameInput.value === ''){
        shareNameInput.style.border = "5px solid red";
        return;
    }
    let desc = shareDescInput.value
    if(desc === ''){
        desc = undefined;
    }
    let sharedProjectId = getSharedProjectId(projectId,getStoredUser().uid);

    if(isAlreadyShared){
        db.ref("sharedProjects/metadata/" + sharedProjectId).once("value").then(function (snap) {
            let data = snap.val();
            console.log(data);
            let now = Date.now() / 1000

            db.ref("sharedProjects/metadata/" + sharedProjectId).set(cleanData(
                {
                    author: getStoredUser().uid,
                    name: shareNameInput.value,
                    shareDate: data.shareDate,
                    createdDate: data.createdDate,
                    updatedDate: now,
                    version: (data.version === undefined ? 0 : data.version) + 1,
                    desc: desc,
                    likedBy: data.likedBy,
                    startedBy: data.staredBy,
                    original: data.original,
                }
            )).then(() => {
                //set projectData
                db.ref("sharedProjects/projectData/" + sharedProjectId).set(getCodeFromEditor());
            })
        })
        hidePopup();
        return;
    }

    db.ref("userdata/"+getStoredUser().uid+"/projects/"+projectId).once("value").then(function (snap) {
        let data = snap.val();
        //set metadata
        db.ref("sharedProjects/metadata/"+sharedProjectId).set(cleanData({
            author:getStoredUser().uid,
            name:shareNameInput.value,
            shareDate:Date.now()/1000,
            createdDate:data.timestamp,
            version:1,
            desc:desc,
            original:data.original,
        })).then(()=> {
            //set projectData
            db.ref("sharedProjects/projectData/" + sharedProjectId).set(getCodeFromEditor());
        })
    })
    hidePopup();
}

function cleanData(data){
    return JSON.parse( JSON.stringify(data ) )
}

function showPopup(){
    popupContainer.style.opacity = "1";
    popupContainer.style.pointerEvents = "auto";
    if(isAlreadyShared){
        get(ref(db,"sharedProjects/metadata/"+getSharedProjectId(projectId,getStoredUser().uid))).then((snap) => {
            let data= snap.val();
            shareNameInput.value =data.name;
            shareDescInput.value =data.desc;
        })
    }else {
        get(ref(db,"userdata/" + getStoredUser().uid + "/projects/" + projectId + "/name")).then(function (snap) {
            shareNameInput.value = snap.val();
        })
    }
}

function hidePopup() {
    popupContainer.style.opacity = "0";
    popupContainer.style.pointerEvents = "none";
}

function runPopupPreviewCode(){
    previewIframe.contentWindow.location.reload();

    previewIframe.addEventListener("load", () => {
        previewIframe.contentWindow.postMessage(getCodeFromEditor())
    })
}
function checkSharedStatus(){
    get(ref(db,"sharedProjects/metadata/"+getSharedProjectId(projectId,getStoredUser().uid))).then((snap) => {
        if(snap.exists()){
            console.log("project is shared!");
            shareButton.innerText = "Update";
            isAlreadyShared = true;
        }
    })
}

export {setupShareEvents,checkSharedStatus,showPopup,runPopupPreviewCode}