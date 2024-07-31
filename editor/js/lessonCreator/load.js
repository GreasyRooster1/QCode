let lessonCreatorLoadButton = null;

function createLoadButton(){
    lessonCreatorLoadButton = document.createElement("div")
    lessonCreatorLoadButton.innerHTML = "Upload Lesson";

    lessonCreatorLoadButton.classList.add("load-lesson-button");
    lessonCreatorLoadButton.classList.add("lesson-creator-button");

    lessonCreatorLoadButton.addEventListener("click",uploadLesson);

    buttonContainer.appendChild(lessonCreatorLoadButton);
}

function uploadLesson(){
    let input = document.createElement('input');
    input.type = 'file';

    input.onchange = e => {

        // getting a hold of the file reference
        let file = e.target.files[0];

        // setting up the reader
        let reader = new FileReader();
        reader.readAsText(file,'UTF-8');

        // here we tell the reader what to do when it's done reading...
        reader.onload = readerEvent => {
            let content = readerEvent.target.result; // this is the content!
            createdLessonChapters = content;
            loadCreatedChapter(0)
        }

    }

    input.click();
}