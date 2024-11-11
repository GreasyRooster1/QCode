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
        window.editor.dispatch({changes: {
            from: 0,
            to: window.editor.state.doc.length,
            insert: projectCode
        }})
    })
}

function insertInfo(){
    let title = document.querySelector(".info-title");
    let dateShared = document.querySelector(".info-date-shared");
    let dateCreated = document.querySelector(".info-date-created");
    let authorImg = document.querySelector(".info-author .author-icon img");
    let authorUsername = document.querySelector(".info-author .author-username");
    let desc = document.querySelector(".info-desc");

    title.innerText = projectMetadata.name;
    if(projectMetadata.desc===undefined) {
        desc.innerText = "No Description";
    }else{
        desc.innerText = projectMetadata.desc;
    }
    dateShared.innerText = "Date Shared: "+getDateString(projectMetadata.shareDate);
    dateCreated.innerText = "Date Created: "+getDateString(projectMetadata.createdDate);

    database.ref("userdata/"+projectMetadata.author+"/username").once("value").then((snapshot) => {
        authorUsername.innerText = snapshot.val();
    });
    database.ref("userdata/"+projectMetadata.author+"/profileIcon").once("value").then((snapshot) => {
        authorImg.setAttribute("src",snapshot.val());
    });


}



function getDateString(unixStamp){
    if(unixStamp==0){
        return "Date not available"
    }
    let date = new Date(unixStamp * 1000);

    let day = date.getDate();
    let month = date.getMonth()+1;
    let year = date.getFullYear();

    return month+"/"+day+"/"+year;
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

