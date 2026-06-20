import { setupEditor } from "../codeEditor";
import { db } from "../../api/firebase";
import { get, ref, set } from "firebase/database";
import { getStoredUser } from "../../api/auth";
import { setupDefaultPanes } from "../panes";
import { showSaveAlert } from "../save";
import { loadLesson } from "../load";
import { runPopupPreviewCode, showPopup } from "../share";
import { logNames } from "../executionHelper";
class ProjectType {
    constructor(allowShare) {
        this.allowShare = allowShare;
        this.chapterNum = 0;
        this.isLessonCreator = false;
        this.checkShareAllowed();
    }
    loadProjectData(projectId) {
        this.projectId = projectId;
        get(ref(db, "userdata/" + getStoredUser().uid + "/projects/" + this.projectId)).then((snapshot) => {
            this.projectData = snapshot.val();
            console.log(this.projectData);
            if (this.projectData["lessonId"] === "none") {
                this.createPanes(false);
                this.hasLesson = false;
            }
            else {
                this.createPanes(true);
                loadLesson(this.projectData["lessonId"]);
                this.hasLesson = true;
            }
        }).then(() => {
            this.onLoad();
        });
    }
    createPanes(hasLesson) {
        setupDefaultPanes(hasLesson);
    }
    setupEventListeners() {
        var _a, _b, _c, _d;
        (_a = document.querySelector(".save-button")) === null || _a === void 0 ? void 0 : _a.addEventListener("click", () => {
            showSaveAlert();
            this.saveCode();
        });
        (_b = document.querySelector(".run-button")) === null || _b === void 0 ? void 0 : _b.addEventListener("click", () => {
            this.saveCode();
            showSaveAlert();
            this.onRun(this.runErrorCallback);
        });
        (_c = document.querySelector(".stop-button")) === null || _c === void 0 ? void 0 : _c.addEventListener("click", () => {
            this.saveCode();
            this.onStop();
        });
        (_d = document.querySelector('.share-button')) === null || _d === void 0 ? void 0 : _d.addEventListener('click', (e) => {
            console.log("sadsd");
            if (!this.allowShare) {
                return;
            }
            this.saveCode();
            showPopup();
            runPopupPreviewCode();
            this.share();
        });
    }
    checkShareAllowed() {
        if (!this.allowShare) {
            document.querySelector(".share-button").classList.add("disabled");
        }
        else {
            document.querySelector(".share-button").classList.remove("disabled");
        }
    }
    setupEditorLanguage() {
        setupEditor(this.getLanguage());
    }
    share() {
    }
    appendLog(content, type) {
        let logEl = document.createElement("console-log");
        let consoleOut = document.querySelector(".console-log-area");
        while (consoleOut.children.length > 100) {
            consoleOut.children[consoleOut.childElementCount - 1].remove();
        }
        logEl.setAttribute("type", type);
        logEl.setAttribute("message", content);
        logEl.setAttribute("head", logNames[type]);
        consoleOut.insertBefore(logEl, consoleOut.firstChild);
    }
    saveMetadata() {
        let user = getStoredUser();
        set(ref(db, "userdata/" + user.uid + "/projects/" + this.projectId + "/dateUpdated"), Date.now() / 1000);
        if (this.hasLesson) {
            console.log(this.highestViewedStep);
            set(ref(db, "userdata/" + user.uid + "/projects/" + this.projectId + "/currentStep"), this.highestViewedStep);
            set(ref(db, "userdata/" + user.uid + "/projects/" + this.projectId + "/currentChapter"), this.chapterNum);
        }
    }
    saveCode() {
        if (this.isLessonCreator) {
            return;
        }
        this.onSave();
        this.saveMetadata();
    }
    static getProjectDBData(projectName, lessonId) {
        throw new TypeError('This method should be overridden by inheriting classes.');
    }
}
export { ProjectType };
