//arduino.work
import {RunErrCallback} from "../projectType";
import {Language} from "../../codeEditor";
import {defaultCodeArduino} from "../../../api/util/code";
import {CloudAgentType} from "../cloudAgentType";
import {FileSystemInterface, updateFilesystemBar} from "../fileSystemInterface";
import {Filesystem} from "../web/filesystem";

class PythonType extends CloudAgentType implements FileSystemInterface{
    //project: Sketch | undefined;
    currentFileId: number;
    filesystem: Filesystem;

    constructor() {
        super();
        this.filesystem = new Filesystem();
        this.filesystem.onFileSystemUpdate = updateFilesystemBar;
        this.currentFileId = this.filesystem.defaultFile.id
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
