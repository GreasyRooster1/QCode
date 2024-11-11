let projectMetadata;
let projectCode;

let execFrame;
let iWindow = null;

function loadProject() {
    const urlParams = new URLSearchParams(window.location.search);
    const shareBoardID = urlParams.get('shareboardid');
    database.ref("sharedProjects/metadata/"+shareBoardID).once("value").then((snapshot) => {
        projectMetadata = snapshot.val();
        insertInfo()
    })
    database.ref("sharedProjects/projectData/"+shareBoardID).once("value").then((snapshot) => {
        projectCode = snapshot.val();
        execFrame.contentWindow.location.reload();
    })
}

function insertInfo(){
    let title = document.querySelector(".info-title");
    let date = document.querySelector(".info-date");
    let authorImg = document.querySelector(".info-author.author-icon img");
    let authorUsername = document.querySelector(".info-author.author-username");
    let desc = document.querySelector(".info-desc");

    title.innerText = projectMetadata.name;
    desc.innerText = projectMetadata.desc;
    date.innerText = projectMetadata.timestamp;
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

