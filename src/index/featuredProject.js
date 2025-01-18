import {db} from "../api/firebase";
import {getStoredUser} from "../api/auth";
import {ref} from "firebase/database";

let featuredProjectData = {};
const frame = document.querySelector('#featured-exec-frame');

function runCode(){
    if (frame.contentWindow === null) {
        return;
    }

    frame.contentWindow.postMessage(featuredProjectData.code);
}

function setupFeaturedProject() {
    window.addEventListener("message", (event) => {
        let log = JSON.parse(event.data);
        console.log("received log from frame: "+log.type+" - "+log.message);
    });
    ref(db,"userdata/"+getStoredUser().uid+"/projects").orderByChild('timestamp').limitToLast(1).once("value").then(function(snapshot) {
        featuredProjectData = Object.entries(snapshot.val())[0][1];
    })

    document.querySelector(".featured-project-thumb .play-icon").addEventListener("click", function() {
        document.querySelector(".featured-project-thumb").classList.toggle("active");
        console.log(featuredProjectData)
        runCode();
    });
}

export {setupFeaturedProject};