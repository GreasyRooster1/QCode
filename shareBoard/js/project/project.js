let projectMetadata;
let projectCode;

let execFrame;
let iWindow = null;

function loadProject() {
    const urlParams = new URLSearchParams(window.location.search);
    const shareBoardID = urlParams.get('shareboardid');
    database.ref("sharedProjects/metadata/"+shareBoardID).once("value").then((snapshot) => {
        projectMetadata = snapshot.val();
    })
    database.ref("sharedProjects/projectData/"+shareBoardID).once("value").then((snapshot) => {
        projectCode = snapshot.val();
        execFrame.contentWindow.location.reload();
    })
}

function setupFrame(){
    execFrame = document.getElementById("exec-frame");
    execFrame.addEventListener("load", () => {
        if(projectCode===null){
            return;
        }
        iWindow = execFrame.contentWindow;
        iWindow.postMessage(projectCode);
    });
}

