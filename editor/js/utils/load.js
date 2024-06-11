function populateSteps(data){
    createChapterStep(data);

    console.log(data.chapters[chapterNum])
    let steps = data.chapters[chapterNum].steps.values().toArray()

    let count = 1;
    for (let step of steps) {
        createStep(step.head,step.content,step.image,step.type,count);
        count++;
    }
    createBufferSpace()
    setupPanes(true);
}

function createStep(head,content,image,type,count){
    let stepEl = document.createElement("editor-step");
    stepEl.setAttribute("head", head);
    stepEl.setAttribute("type", type);
    stepEl.setAttribute("count", count);
    stepEl.setAttribute("image", image);
    stepEl.innerHTML = content;
    scrollableSteps.appendChild(stepEl);
    return stepEl;
}

function createStepFromObj(step){
    return createStep(step.head,step.content,step.image,step.type,step.count);
}

function createBufferSpace(){
    let buffer = document.createElement("div");
    buffer.classList.add("buffer");
    scrollableSteps.appendChild(buffer);
}

function writeToEditor(data){
    const transaction = editor.state.update({changes: {from: 0, to: editor.state.doc.length, insert: data}})
    const update = editor.state.update(transaction);
    editor.update([update]);
}

function createChapterStep(data){
    createStep(data.name,getChapterStepContent(data.chapters),"none","chapters","0");
}

function getChapterStepContent(chapters){
    let content="";
    let count=1;
    for(let chapter of chapters){
        content+=createChapterLink(count-1,chapter)+"<br>";
        count++;
    }
    return content;
}
function getChapterStepContentNoLink(chapters){
    let content="";
    let count=1;
    for(let chapter of chapters){
        content+="Chapter "+count+" - "+chapter.name+"<br>";
        count++;
    }
    return content;
}

function createChapterLink(chapterNum,chapterData){
    let name = "Chapter "+chapterNum+" - "+chapterData.name;
    let linkEl = document.createElement("a");
    linkEl.innerHTML = name;
    linkEl.setAttribute("href",getLinkToProject(projectId,getStoredUser().uid,chapterNum));
    linkEl.classList.add("chapter-link")
    return linkEl.outerHTML;
}