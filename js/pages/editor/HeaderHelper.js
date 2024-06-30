class HeaderHelper {

    static createChapterHeader(name, chapterNames, useLinks) {
        let lines = EditorHelper.getChapterHeaderContentLines(chapterNames);

        let content = ""
        for (let line of lines) {
            if (useLinks) {
                content += applyChapterLink(line) + "\n";
            } else {
                content += line + "\n";
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
}