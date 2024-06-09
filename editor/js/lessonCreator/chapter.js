let lessonCreatorChapterButton = null;
let currentChapter = 0;

function createChapterButton(){
    lessonCreatorChapterButton = document.createElement("div")
    lessonCreatorChapterButton.innerHTML = "Open Chapter";

    lessonCreatorChapterButton.classList.add("chapter-lesson-button");
    lessonCreatorChapterButton.classList.add("lesson-creator-button");

    lessonCreatorChapterButton.addEventListener("click",chapterClick);

    buttonContainer.appendChild(lessonCreatorChapterButton);
}

function chapterClick(){
    saveChapter(currentChapter);

    currentChapter = prompt("Enter a chapter to jump to")-1;
    if(createdLessonChapters[currentChapter]!==undefined) {
        scrollableSteps.innerHTML = '';
        createLessonCreatorChapterStep();
        loadCreatedChapter(currentChapter);
    }else{
        scrollableSteps.innerHTML = '';
        createLessonCreatorChapterStep();
    }
}

function loadCreatedChapter(chapterNum){
    let count = 1;
    for (let step of createdLessonChapters[chapterNum].steps) {
        createStep(step.head,step.content,step.image,step.type,count);
        count++;
    }
    chapterStep.querySelector(".step-head-content").innerHTML = createdLessonChapters[chapterNum].name;
    createBufferSpace()
}

function saveChapter(chapterNum){
    let chapterSteps = [];
    for (let step of scrollableSteps.children){
        if(step.classList.contains("buffer")||step.classList.contains("chapters")){
            continue;
        }
        let stepData = {
            head:step.getAttribute("head"),
            content:step.querySelector(".step-text-content").innerHTML,
            image:step.getAttribute("image"),
            type:step.getAttribute("type"),
        }
        chapterSteps.push(stepData);
    }
    createdLessonChapters[chapterNum]={
        steps:[],
        name:"",
    }
    createdLessonChapters[chapterNum].steps = chapterSteps;
    createdLessonChapters[chapterNum].name = scrollableSteps.querySelector(".step:first-child .step-head-content").innerText;
}