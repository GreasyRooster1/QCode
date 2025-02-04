import {frame} from "./executionHelper";

const stopButton = document.querySelector('.stop-button');
const runButton = document.querySelector('.run-button');
const consoleOut = document.querySelector('.console-output-pane');

let iWindow = null;
let runningCode = false;

// runButton.addEventListener("click", function() {
//     if(!isLessonCreator){
//         saveCode()
//     }
//     resetAllOutputs()
//     runningCode = true;
//     runCode();
// });
//
// stopButton.addEventListener("click", function() {
//     resetAllOutputs()
// });

function resetAllOutputs(){
    clearConsole();
    frame.contentWindow.location.reload();
    iWindow = null;
    runningCode = false;
}

function clearConsole(){
    let consoleOut = document.querySelector(".console-log-area")
    consoleOut.innerHTML = "";
}


function getCodeFromEditor(){
    return window.editor.state.doc.toString();
}

//when we get a message from the frame


export {resetAllOutputs,getCodeFromEditor,iWindow,stopButton,runButton,clearConsole};
