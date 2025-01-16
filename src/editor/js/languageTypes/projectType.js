import { setupEditor } from "../codeEditor.js";
class ProjectType {
    constructor(allowShare) {
        this.allowShare = allowShare;
        this.checkShareAllowed();
    }
    loadProjectData(projectId) {
        this.projectId = projectId;
        database.ref("userdata/" + getStoredUser().uid + "/projects/" + this.projectId).once("value", (snapshot) => {
            this.projectData = snapshot.val();
            console.log(this.projectData);
            if (this.projectData["lessonId"] === "none") {
                setupPanes(false);
                this.hasLesson = false;
            }
            else {
                setupPanes(true);
                this.hasLesson = true;
            }
        }).then(() => {
            this.onLoad();
        });
    }
    setupEventListeners() {
        document.querySelector(".save-button").addEventListener("click", () => {
            showSaveAlert();
            this.saveCode();
        });
        document.querySelector(".run-button").addEventListener("click", () => {
            this.saveCode();
            showSaveAlert();
            this.run(this.runErrorCallback);
        });
        document.querySelector(".stop-button").addEventListener("click", () => {
            this.stop();
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
}
export { ProjectType };
