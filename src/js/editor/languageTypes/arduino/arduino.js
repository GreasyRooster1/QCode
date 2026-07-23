import { getCode } from "../../executionHelper";
import { startSketchServer } from "./arduino-api";
import { defaultCodeArduino } from "../../../api/util/code";
import { CloudAgentType } from "../cloudAgentType";
import { getStoredUser } from "../../../api/auth";
import { get, ref, set } from "firebase/database";
import { db } from "../../../api/firebase";
import { clearConsole } from "../../codeExecution";
class ArduinoType extends CloudAgentType {
    constructor() {
        super();
    }
    onRun(errorCallback) {
        var _a, _b;
        if (this.sketch == null) {
            return;
        }
        clearConsole();
        this.setExecStatus("write");
        (_b = (_a = this.sketch) === null || _a === void 0 ? void 0 : _a.writeCode(getCode())) === null || _b === void 0 ? void 0 : _b.then(() => {
            var _a;
            this.setExecStatus("compile");
            (_a = this.sketch) === null || _a === void 0 ? void 0 : _a.compile().then(() => {
                var _a;
                this.setExecStatus("upload");
                (_a = this.sketch) === null || _a === void 0 ? void 0 : _a.upload().then(() => {
                    this.setExecStatus("ok");
                }).catch(e => {
                    this.appendLog(e.message.replace("\n", "<br>"), "error");
                    this.failExec();
                });
            }).catch(e => {
                this.appendLog(e.message.replace("\n", "<br>"), "error");
                this.failExec();
            });
        }).catch(e => {
            this.appendLog(e.message.replace("\n", "<br>"), "error");
            this.failExec();
        });
    }
    onLoad() {
        var _a, _b;
        super.onLoad();
        this.setupConnection();
        document.querySelector(".console-head").innerHTML = "<div class='serial-monitor-button'>Serial Monitor</div>";
        document.querySelector(".serial-monitor-button").addEventListener("click", () => {
            this.sketch.openSerialMonitor();
        });
        (_a = document.querySelector(".stop-button")) === null || _a === void 0 ? void 0 : _a.remove();
        (_b = document.querySelector(".canvas-output-pane")) === null || _b === void 0 ? void 0 : _b.remove();
    }
    onSave() {
        let code = getCode();
        let user = getStoredUser();
        set(ref(db, "userdata/" + user.uid + "/projects/" + this.projectId + "/code"), code);
    }
    runErrorCallback(content, type) {
        this.appendLog(content, type);
    }
    setupSerialMonitor() {
    }
    getLanguage() {
        return "c++";
    }
    static getProjectDBData(projectName, lessonId) {
        let cleanLessonId = lessonId !== null && lessonId !== void 0 ? lessonId : "none";
        let hasLesson = cleanLessonId != "none";
        let data = {
            code: defaultCodeArduino,
            lessonId: lessonId !== null && lessonId !== void 0 ? lessonId : "none",
            name: projectName,
            currentChapter: 0,
            currentStep: 0,
            timestamp: Date.now() / 1000,
            language: "arduino",
        };
        return new Promise((resolve, reject) => {
            if (hasLesson) {
                get(ref(db, "lessons/" + lessonId + "/starterCode")).then((snap) => {
                    if (snap.exists()) {
                        data.code = snap.val();
                        resolve(data);
                        return;
                    }
                    else {
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
    onStop() {
    }
    setupAgentConnection() {
        startSketchServer(this.projectId).then(sketch => {
            this.sketch = sketch;
        });
    }
}
ArduinoType.identifier = "arduino";
export { ArduinoType };
