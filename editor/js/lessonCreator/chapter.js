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

    scrollableSteps.innerHTML = '';

    createLessonCreatorChapterStep();

    currentChapter = prompt("Enter a chapter to jump to");
    if(lessonCreatorChapterButton[currentChapter]===undefined){
        currentChapter.name = prompt("Enter a name for the new chapter");
    }
}