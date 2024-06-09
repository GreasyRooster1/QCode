let lessonCreatorChapterButton = null;
let currentChapter = 1;

function createChapterButton(){
    lessonCreatorChapterButton = document.createElement("div")
    lessonCreatorChapterButton.innerHTML = "Open Chapter";

    lessonCreatorChapterButton.classList.add("chapter-lesson-button");
    lessonCreatorChapterButton.classList.add("lesson-creator-button");

    lessonCreatorChapterButton.addEventListener("click",chapterClick);

    buttonContainer.appendChild(lessonCreatorChapterButton);
}

function chapterClick(){
    saveChapter(currentChapter-1);

    scrollableSteps.innerHTML = '';

    createLessonCreatorChapterStep();

    currentChapter = prompt("Enter a chapter to jump to");
    loadCreatedChapter(currentChapter);
}

function loadCreatedChapter(){

}