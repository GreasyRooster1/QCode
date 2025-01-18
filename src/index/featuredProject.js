import {db} from "../api/firebase";
import {getStoredUser} from "../api/auth";
import {ref, query, orderByChild, limitToLast, get} from "firebase/database";

let featuredProjectData = {};
const frame = document.querySelector('#featured-exec-frame');

function runCode(){
    if (frame.contentWindow === null) {
        return;
    }

    console.log(featuredProjectData.code)
    frame.contentWindow.postMessage(featuredProjectData.code);
}

function setupFeaturedProject() {
    window.addEventListener("message", (event) => {
        let log = JSON.parse(event.data);
        console.log("received log from frame: "+log.type+" - "+log.message);
    });
    let projDataRef = query(ref(db,"userdata/"+getStoredUser().uid+"/projects"),orderByChild('timestamp'),limitToLast(1))
    get(projDataRef).then((snap)=>{
        featuredProjectData = Object.entries(snap.val())[0][1];
    })

    document.querySelector(".featured-project-thumb .play-icon").addEventListener("click", function() {
        document.querySelector(".featured-project-thumb").classList.toggle("active");
        console.log(featuredProjectData)
        runCode();
    });
}

export {setupFeaturedProject};