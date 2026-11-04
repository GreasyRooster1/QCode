import { JavascriptType } from "./languageTypes/javascript.ts";
import { WebType } from "./languageTypes/web/web.ts";
import { ArduinoType } from "./languageTypes/arduino/arduino.ts";
import { ScratchType } from "./languageTypes/scratch.ts";
import { PythonType } from "./languageTypes/python/python.ts";
const languageTypes = {
    "javascript": JavascriptType,
    "web": WebType,
    "arduino": ArduinoType,
    "scratch": ScratchType,
    "python": PythonType,
};
export { languageTypes };
