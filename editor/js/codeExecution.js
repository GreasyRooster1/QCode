const stopButton = document.querySelector('.stop-button');
const runButton = document.querySelector('.run-button');


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
    consoleOut.innerHTML = "";
    frame.contentWindow.location.reload();
    iWindow = null;
    runningCode = false;
}

function getCodeFromEditor(){
    return window.editor.state.doc.toString();
}

//when we get a message from the frame


window.getCodeFromEditor = getCodeFromEditor;
