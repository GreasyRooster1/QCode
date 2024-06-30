class HeaderHelper {

    static createChapterHeader(name, chapterNames, useLinks) {
        let lines = HeaderHelper.getChapterHeaderContentLines(chapterNames);

        let content = ""
        for (let i=0;i<lines.length;i++) {
            let line = lines[i];
            if (useLinks) {
                content += HeaderHelper.applyChapterLinkToLine(line,i) + "<br>";
            } else {
                content += line + "<br>";
            }
        }

        EditorHelper.createStepEl(name)
    }

    static getChapterHeaderContentLines(chapterNames) {
        let out = [];
        for (let i = 0; i < chapterNames.length; i++) {
            out.push("Chapter " + i + " - " + chapterNames[i] + "\n");
        }
        return out;
    }

    static applyChapterLinkToLine(line,num){
        let linkEl = document.createElement("a");
        linkEl.innerHTML = line;
        linkEl.setAttribute("href",getLinkToProject(projectId,FBAuth.getStoredUser().uid,num));
        linkEl.classList.add("chapter-link")
        return linkEl.outerHTML;
    }
}