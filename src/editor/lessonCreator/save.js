import {currentChapter, saveChapter} from "./chapter";
import {lessonMetadata} from "./metadata";
import {getCodeFromEditor} from "../codeExecution";
import {buttonContainer} from "./setup";
import {projectType} from "../load";
import {languageTypes} from "../languageTypes";

let createdLessonChapters = []
let lessonCreatorSaveButton = null;

function setCreatedLessonChapters(chapters){
    createdLessonChapters = chapters;
}

function createSaveButton(){
    lessonCreatorSaveButton = document.createElement("div")
    lessonCreatorSaveButton.innerHTML = "Download Lesson";

    lessonCreatorSaveButton.classList.add("save-lesson-button");
    lessonCreatorSaveButton.classList.add("lesson-creator-button");

    lessonCreatorSaveButton.addEventListener("click",saveLesson);

    buttonContainer.appendChild(lessonCreatorSaveButton);
}

function saveLesson(){
    saveChapter(currentChapter);
    let lessonData = {
        name:lessonMetadata.name??"LESSON NAME",
        type:projectType.identifier??"TYPE HERE",
        unlisted:true,
        chapters:convertChaptersToObjFormat(createdLessonChapters),
        coachCode:getCodeFromEditor(),
        tags:{
            0:"game",
        },
        thumb:"https://github.com/GreasyRooster1/QCodeStatic/blob/main/Global/missing.png",
    }
    console.log(lessonData.chapters)
    downloadLessonData(JSON.stringify(lessonData,null,4),lessonMetadata.name);
}

function convertChaptersToObjFormat(chapters){
    let outputChapters = {};
    let i=0;
    for(let chapter of chapters){
        outputChapters[i.toString()] = {steps:{},name:""};
        outputChapters[i.toString()].steps = Object.assign({},chapter.steps);
        outputChapters[i.toString()].name = chapter.name;
        i++;
    }
    return outputChapters
}

function downloadLessonData(data,name) {
    let date = new Date().toJSON().slice(0,10).replace(/-/g,'/');
    const file = new File([data], 'QCode_Lesson-'+name+"-"+date+'.json', {
        type: 'text/plain',
    })
    const link = document.createElement('a')
    const url = URL.createObjectURL(file)

    link.href = url
    link.download = file.name
    document.body.appendChild(link)
    link.click()

    document.body.removeChild(link)
    window.URL.revokeObjectURL(url)
}

export {createdLessonChapters,saveLesson,createSaveButton,downloadLessonData,setCreatedLessonChapters}