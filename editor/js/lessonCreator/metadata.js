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

    let nameInput = createInputWithLabel("Name","text");
    let starterCodeInput =createInputWithLabel("Starter Code","textarea");
    let unlistedInput = createInputWithLabel("Unlisted?","checkbox");

    lessonMetaEditPane.appendChild(nameInput);
    lessonMetaEditPane.appendChild(starterCodeInput);
    lessonMetaEditPane.appendChild(unlistedInput);

    document.body.appendChild(lessonMetaEditPane);
}

function createInputWithLabel(name,type){
    let wrap = document.createElement("div");

    let label = document.createElement("label");
    label.innerText=name;

    let input;
    if(type === "textarea"){
        input = document.createElement("textarea");
    }else {
        input = document.createElement("input");
    }
    input.setAttribute("type",type);

    label.appendChild(input);
    wrap.appendChild(label);

    return wrap;
}

function editLessonMeta(){
    metaPaneOpen = !metaPaneOpen;
    if(metaPaneOpen){
        lessonMetaEditPane.style.display = "block";
    }else{
        lessonMetaEditPane.style.display = "none";
    }
}