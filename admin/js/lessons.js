const lessonsDisplay = document.querySelector(".lessons-display");

const lessonDetailsName = document.querySelector(".lesson-details .name");
const lessonDetailsId = document.querySelector(".lesson-details .id");
const lessonDetailsUnlisted = document.querySelector(".lesson-details .unlisted");
const lessonDetailsStepCount = document.querySelector(".lesson-details .step-count");

function lessons(){
    let lessonsRef = database.ref('lessons');
    lessonsRef.on('value', (snapshot) => {
        const data = snapshot.val();
        clearLessons();
        console.log(data);
        for(const [lessonId, lessonData] of Object.entries(data)){
            createLessonElement(lessonId,lessonData);
        }
    });
}

function createLessonElement(lessonId,lessonData){
    let linkWrapper = document.createElement("div");
    linkWrapper.classList.add("lesson-link-wrapper");

    let link = document.createElement("span");

    link.classList.add("lesson-link");
    link.setAttribute("data-lessonid",lessonId);
    link.addEventListener("click",showLessonDetails);

    if(lessonData.unlisted){
        link.classList.add("unlisted");
    }

    link.innerHTML = lessonData.name;

    linkWrapper.appendChild(link)
    lessonsDisplay.appendChild(linkWrapper);
}

function clearLessons(){
    lessonsDisplay.innerHTML = "";
}

function showLessonDetails(e){
    let lessonId = e.currentTarget.getAttribute("data-lessonid");
    database.ref("lessons/"+lessonId).once("value").then(s)
}

lessons();