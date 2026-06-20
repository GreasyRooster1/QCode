import { ProjectType } from "./projectType";
class ScratchType extends ProjectType {
    constructor() {
        super(true);
    }
    onLoad() {
        document.querySelector(".code-pane").remove();
    }
    setupEditor() {
        document.querySelector(".output-pane").remove();
        document.querySelector(".pane-container").classList.add("scratch-style-override");
    }
    createPanes(hasLesson) {
        if (!hasLesson) {
            alert("Scratch projects must have a lesson!");
            window.location.href = "../../../index.html";
        }
    }
    onSave() {
    }
    onRun(errorCallback) {
    }
    onStop() {
    }
    runErrorCallback(content, type) {
        super.appendLog(content, type);
    }
    getLanguage() {
        return "javascript";
    }
    static getProjectDBData(projectName, lessonId) {
        let cleanLessonId = lessonId !== null && lessonId !== void 0 ? lessonId : "none";
        let hasLesson = cleanLessonId != "none";
        return new Promise((resolve, reject) => {
            let data = {
                language: "scratch",
                name: projectName,
                lessonId: lessonId !== null && lessonId !== void 0 ? lessonId : "none",
                currentChapter: 0,
                currentStep: 0,
                timestamp: Date.now() / 1000,
            };
            resolve(data);
        });
    }
}
ScratchType.identifier = "scratch";
export { ScratchType };
