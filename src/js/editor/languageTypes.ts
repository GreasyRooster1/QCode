import {JavascriptType} from "./languageTypes/javascript";
import {WebType} from "./languageTypes/web/web";
import {ArduinoType} from "./languageTypes/arduino/arduino";
import {ScratchType} from "./languageTypes/scratch";
import {PythonType} from "./languageTypes/python/python";

const languageTypes = {
    "javascript": JavascriptType,
    "web": WebType,
    "arduino": ArduinoType,
    "scratch": ScratchType,
    "python": PythonType,
}

export {languageTypes};