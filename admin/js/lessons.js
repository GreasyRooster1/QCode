const lessonsDisplay = document.querySelector(".lessons-display");

const lessonDetailsName = document.querySelector(".lesson-details .name");
const lessonDetailsId = document.querySelector(".lesson-details .id");
const lessonDetailsUnlisted = document.querySelector(".lesson-details .unlisted");
const lessonDetailsChapterCount = document.querySelector(".lesson-details .chapter-count");
const lessonDetailsStepCount = document.querySelector(".lesson-details .step-count");

const lessonCreatorButton = document.querySelector(".lesson-creator-button");

function setupLessons(){
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
    linkWrapper.classList.add("listed-data-item-wrapper");

    let link = document.createElement("span");

    link.classList.add("lesson-link");
    link.classList.add("listed-data-item");
    link.setAttribute("data-lessonid",lessonId);
    link.addEventListener("click",showLessonDetails);

    if(lessonData.unlisted){
        link.classList.add("unlisted");
    }

    link.innerHTML = lessonData.name;

    linkWrapper.appendChild(link)
    lessonsDisplay.appendChild(linkWrapper);
}

function showLessonDetails(e){
    let lessonId = e.currentTarget.getAttribute("data-lessonid");
    database.ref("lessons/"+lessonId).once("value").then((snap)=>{
        let data = snap.val();
        lessonDetailsName.innerHTML = data.name;
        lessonDetailsId.innerHTML = lessonId;
        lessonDetailsChapterCount.innerHTML = data.chapters.length.toLocaleString();

        let totalSteps = 0;
        for(let chapter of data.chapters){
            totalSteps += chapter.steps.length;
        }
        lessonDetailsStepCount.innerHTML = totalSteps.toLocaleString();


        if(data.unlisted){
            lessonDetailsUnlisted.classList.add("unlisted-red")
            lessonDetailsUnlisted.classList.remove("unlisted-blue")
            lessonDetailsUnlisted.innerHTML = "Unlisted"
        }else{
            lessonDetailsUnlisted.classList.add("unlisted-blue")
            lessonDetailsUnlisted.classList.remove("unlisted-red")
            lessonDetailsUnlisted.innerHTML = "Visible"
        }
    });
}

function clearLessons(){
    lessonsDisplay.innerHTML = "";
}

lessonCreatorButton.addEventListener("click",(e) => {
    window.location.href = "../editor/editor.html?projectId=$$lesson$$creator$$"
})

setupLessons();