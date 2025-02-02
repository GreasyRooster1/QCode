import {db} from "../../api/firebase";
import {getStoredUser} from "../../api/auth";
import {get, ref, set} from "firebase/database";
import {createProject} from "../../api/project";
import {openLesson, openProjectInEditor} from "../../api/util/projects";
import {lessonsDisplay} from "../index";

let defaultRecommendedLessons = [
    "intro-to-js",
    "bouncing-rainbow-squares"
]

function loadLessons(){
    setupLessonChartLink();

    get(ref(db,"userdata/"+getStoredUser().uid+"/recommendedLessons")).then( (snapshot) => {
        let data;
        if(snapshot.exists()){
            data = snapshot.val();
        }else{
            set(ref(db,"userdata/"+getStoredUser().uid+"/recommendedLessons"),defaultRecommendedLessons);
            data = defaultRecommendedLessons;
        }
        for(let lessonId of data){
            get(ref(db,"lessons/"+lessonId)).then((snapshot) => {
                createLessonElement(lessonId,snapshot.val())
            })
        }
    });
}

function createLessonElement(lessonId,lessonData){
    let link = document.createElement("div");
    let linkWrapper = document.createElement("div");
    let statusDisplay = document.createElement("div");

    linkWrapper.classList.add("lesson-link-wrapper");

    link.setAttribute("data-lessonid",lessonId);
    link.addEventListener("click",lessonClickHandle);
    link.classList.add("lesson-link");

    setupStatusDisplay(statusDisplay,lessonData.isExternal,lessonId);

    link.innerHTML = lessonData.name;

    linkWrapper.appendChild(link)
    linkWrapper.appendChild(statusDisplay);
    lessonsDisplay.appendChild(linkWrapper);
}

function setupStatusDisplay(statusDisplay,isExternal,lessonId){
    statusDisplay.classList.add("status-display");
    if(isExternal){
        statusDisplay.innerHTML = "external";
        statusDisplay.classList.add("external");
        return;
    }
    statusDisplay.innerHTML = "not started";
    statusDisplay.classList.add("not-started");

    get(ref(db,"userdata/"+getStoredUser().uid+"/lessonStatuses/"+lessonId)).then((snapshot)=>{

        if(snapshot.exists()){
            let data= snapshot.val()
            if(data.started) {
                statusDisplay.innerHTML = "started";
                statusDisplay.classList.add("started");
            }
            if(data.completed){
                statusDisplay.innerHTML = "completed";
                statusDisplay.classList.add("completed");
            }
        }
    })
}

function lessonClickHandle(e){
    let linkEl = e.target;
    let lessonId = linkEl.getAttribute("data-lessonid");
    openLesson(lessonId);
}

function clearLessons(){
    lessonsDisplay.innerHTML = "";
}

function setupLessonChartLink(){
    document.querySelector(".lessons-chart-link").addEventListener("click", function(){
        window.location.href = "./lessons.html";
    })
}

export {loadLessons};