function openProjectInEditor(projectId,uid,chapterNumber){
    window.location.href = getLinkToProject(projectId,uid,chapterNumber)
}

function getLinkToProject(projectId,uid,chapterNumber){
    return "./editor.html?projectId=" + projectId + "&uid=" + uid + "&cNum=" + chapterNumber;
}

export {getLinkToProject,openProjectInEditor}