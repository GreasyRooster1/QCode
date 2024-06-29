function openProjectInEditor(projectId,uid,chapterNumber){
    window.location.href = getLinkToProject(projectId,uid,chapterNumber)
}

function getLinkToProject(projectId,uid,chapterNumber){
    let link = "editor/editor.html?projectId="+projectId+"&uid="+uid+"&cNum="+chapterNumber;
    if(window.location.href.includes("index.html")||window.location.href.endsWith("/")){
        return link;
    }else {
        return "../"+link;
    }
}