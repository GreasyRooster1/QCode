let lessonCreatorMetaButton;
let lessonMetaEditPane;
let metaPaneOpen = false;

let nameInput;
let starterCodeInput;
let unlistedInput;

let lessonMetadata ={
    name:"",
    unlisted:true,
    starterCode:defaultCode,
}

function createMetaButton(){
    lessonCreatorMetaButton = document.createElement("div")
    lessonCreatorMetaButton.innerHTML = "Lesson Metadata";

    lessonCreatorMetaButton.classList.add("meta-lesson-button");
    lessonCreatorMetaButton.classList.add("lesson-creator-button");

    lessonCreatorMetaButton.addEventListener("click",editLessonMeta);


    buttonContainer.appendChild(lessonCreatorMetaButton);
}

function createMetaEditPane(){
    lessonMetaEditPane = document.createElement("div")
    lessonMetaEditPane.classList.add("meta-edit-pane");

    nameInput = createInputWithLabel("Name","text","meta-name-input");
    starterCodeInput =createInputWithLabel("Starter Code","textarea","meta-code-input");
    unlistedInput = createInputWithLabel("Unlisted?","checkbox","meta-unlisted-input");

    let submitButton = document.createElement("button");
    submitButton.classList.add("meta-submit-button");
    submitButton.addEventListener("click", saveMeta);
    submitButton.innerHTML = "Save Meta";

    lessonMetaEditPane.appendChild(nameInput);
    lessonMetaEditPane.appendChild(starterCodeInput);
    lessonMetaEditPane.appendChild(unlistedInput);
    lessonMetaEditPane.appendChild(submitButton);

    document.body.appendChild(lessonMetaEditPane);
}

function createInputWithLabel(name,type,clazz){
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
    input.classList.add(clazz);

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

function saveMeta(){
    lessonMetadata.name=nameInput.querySelector("input").value;
    lessonMetadata.unlisted=unlistedInput.querySelector("input").value==="on";
    lessonMetadata.starterCode=starterCodeInput.querySelector("textarea").value;
    if(lessonMetadata.starterCode==="default"){
        lessonMetadata.starterCode=defaultCode;
    }
}