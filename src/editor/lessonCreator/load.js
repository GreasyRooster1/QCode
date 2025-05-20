import {writeToEditor} from "../utils/loadUtils";
import {loadCreatedChapter} from "./chapter";
import {buttonContainer} from "./setup";
import {createdLessonChapters, setCreatedLessonChapters} from "./save";

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
        let file = e.target.files[0];
        let reader = new FileReader();
        reader.readAsText(file,'UTF-8');
        reader.onload = readerEvent => {
            let content = readerEvent.target.result;
            let chapters = [];
            let parsed = JSON.parse(content)
            for(let [_,chapter] of Object.entries(parsed.chapters)){
                let steps = chapter.steps
                chapter.steps = [];
                for(let [_,step] of Object.entries(steps)){
                    if(step.type==="party"){
                        step.type = "no party";
                    }
                    chapter.steps.push(step);
                }
                chapters.push(chapter);
            }
            setCreatedLessonChapters(chapters);
            loadCreatedChapter(0)
            writeToEditor(parsed.coachCode);
        }

    }

    input.click();
}

export {createLoadButton, uploadLesson}