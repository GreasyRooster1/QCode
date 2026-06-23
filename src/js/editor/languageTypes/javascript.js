import { ProjectType } from "./projectType";
import { getCode, setupEvents as setupExecEvents, runCode, frameContent, frame, stopFrame } from "../executionHelper";
import { getStoredUser } from "../../api/auth";
import { get, ref, set } from "firebase/database";
import { db } from "../../api/firebase";
import { writeToEditor } from "../utils/loadUtils";
import { clearConsole } from "../codeExecution";
import { defaultCodeJs } from "../../api/util/code";
class JavascriptType extends ProjectType {
    constructor() {
        super(true);
    }
    setupEditor() {
        setupExecEvents(() => {
            runCode(getCode());
        }, this.runErrorCallback);
    }
    onLoad() {
        writeToEditor(this.projectData["code"]);
    }
    onSave() {
        let code = getCode();
        let user = getStoredUser();
        set(ref(db, "userdata/" + user.uid + "/projects/" + this.projectId + "/code"), code);
    }
    onRun(errorCallback) {
        var _a, _b;
        console.log(frameContent);
        if (frameContent == undefined) {
            (_b = (_a = frame === null || frame === void 0 ? void 0 : frame.contentWindow) === null || _a === void 0 ? void 0 : _a.location) === null || _b === void 0 ? void 0 : _b.reload();
        }
        frameContent === null || frameContent === void 0 ? void 0 : frameContent.location.reload();
        clearConsole();
    }
    onStop() {
        stopFrame();
        clearConsole();
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
        let data = {
            code: defaultCodeJs,
            lessonId: cleanLessonId,
            name: projectName,
            currentChapter: 0,
            currentStep: 0,
            timestamp: Date.now() / 1000,
            language: "javascript",
        };
        return new Promise((resolve, reject) => {
            if (hasLesson) {
                get(ref(db, "lessons/" + lessonId + "/starterCode")).then((snap) => {
                    if (snap.exists()) {
                        data.code = snap.val();
                        console.log("found code");
                        console.log(data);
                        resolve(data);
                        return;
                    }
                    else {
                        console.log("no default code");
                        resolve(data);
                        return;
                    }
                });
            }
            else {
                resolve(data);
            }
        });
    }
}
JavascriptType.identifier = "javascript";
export { JavascriptType };
