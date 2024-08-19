function populateSteps(data){
    createChapterStep(data);

    console.log(data.chapters[chapterNum])
    let steps = data.chapters[chapterNum].steps.values().toArray()

    let count = 1;
    for (let step of steps) {
        createStep(step.head,step.content,step.image,step.type,count);
        count++;
    }
    createNextChapterStep(data);
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
    createStep(data.name,getChapterStepContent(data.chapters),"none","chapters","-1");
}

function createNextChapterStep(data){
    if(data.chapters[chapterNum+1]===undefined){
        createStep("You're done!","You finished the lesson!\nGo back <span class='chapter-end-home-link'>home</span>","none","next","-1");
        document.querySelector(".chapter-end-home-link").addEventListener('click',homeLinkClick)
        return;
    }
    createStep("Move on to the next chapter","<span class='next-chapter-text'>Chapter "+(chapterNum+2)+" - "+data.chapters[chapterNum+1].name+"</span>","none","next","-1");
    document.querySelector(".next-chapter-text").addEventListener('click',nextChapterClick)
}


function homeLinkClick(){
    saveCode();
    window.location.href = window.location.href="../index.html";
}

function nextChapterClick(){
    saveCode();
    window.location.href = window.location.href.replace("cNum="+chapterNum,"cNum="+(chapterNum+1))
}

function getChapterStepContent(chapters){
    let content="";
    let count=1;
    for(let chapter of chapters){
        content+=createChapterLink(count,chapter)+"<br>";
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

function createChapterLink(chapterNumber,chapterData){
    let name = "Chapter "+chapterNumber+" - "+chapterData.name;
    let linkEl = document.createElement("a");
    linkEl.innerHTML = name;
    linkEl.setAttribute("href",getLinkToProject(projectId,getStoredUser().uid,chapterNumber-1));
    linkEl.classList.add("chapter-link")
    if(chapterNumber-1 === chapterNum) {
        linkEl.classList.add("current-chapter")
    }
    return linkEl.outerHTML;
}