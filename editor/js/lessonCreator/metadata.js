let lessonCreatorMetaButton;
let lessonMetaEditPane;
let metaPaneOpen = false;

function createMetaButton(){
    lessonCreatorMetaButton = document.createElement("div")
    lessonCreatorMetaButton.innerHTML = "Lesson Metadata";

    lessonCreatorMetaButton.classList.add("meta-lesson-button");

    lessonCreatorMetaButton.addEventListener("click",editLessonMeta);

    buttonContainer.appendChild(lessonCreatorMetaButton);
}

function createMetaEditPane(){
    lessonMetaEditPane = document.createElement("div")
    lessonMetaEditPane.classList.add("meta-edit-pane");

    document.body.appendChild(lessonMetaEditPane);
}

function editLessonMeta(){
    metaPaneOpen = !metaPaneOpen;
    if(metaPaneOpen){
        lessonMetaEditPane.style.display = "block";
    }else{
        lessonMetaEditPane.style.display = "none";
    }
}