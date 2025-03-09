//arduino.work
import {RunErrCallback} from "../projectType";
import {Language} from "../../codeEditor";
import {defaultCodeArduino} from "../../../api/util/code";
import {CloudAgentType} from "../cloudAgentType";

class PythonType extends CloudAgentType {
    //project: Sketch | undefined;

    constructor() {
        super();
    }

    onRun(errorCallback:RunErrCallback) {
        //todo
    }

    runErrorCallback(content: string, type: string): void {
        this.appendLog(content,type);
    }

    getLanguage():Language {
        return "python";
    }

    static getProjectDBData(projectName: string, lessonId: string):Object {
        return {
            code:defaultCodeArduino,
            lessonId:lessonId??"none",
            name:projectName,
            currentChapter:0,
            currentStep:0,
            timestamp:Date.now()/1000,
            language:"arduino",
        }
    }

    onStop(): void {
    }

    setupAgentConnection(): void {
        //todo
    }
}

export {PythonType};
