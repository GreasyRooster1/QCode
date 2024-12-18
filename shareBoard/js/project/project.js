let projectMetadata;
let projectCode;

let shareBoardId;

let execFrame;
let iWindow = null;

function loadProject() {
    const urlParams = new URLSearchParams(window.location.search);
    shareBoardID = urlParams.get('shareboardid');
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
    let dateUpdated = document.querySelector(".info-date-updated");
    let version = document.querySelector(".info-version");

    let authorImg = document.querySelector(".info-author .author-icon img");
    let authorUsername = document.querySelector(".info-author .author-username");

    let originalInfo = document.querySelector(".info-original");
    let originalImg = document.querySelector(".info-original .original-icon img");
    let originalUsername = document.querySelector(".info-original .original-username");
    let originalTitle = document.querySelector(".info-original .original-block .title");

    let desc = document.querySelector(".info-desc");

    title.innerText = projectMetadata.name;
    if(projectMetadata.desc===undefined) {
        desc.innerText = "No Description";
    }else{
        desc.innerText = projectMetadata.desc;
    }
    dateShared.innerText = "Date Shared: "+getDateString(projectMetadata.shareDate);
    dateCreated.innerText = "Date Created: "+getDateString(projectMetadata.createdDate);
    dateUpdated.innerText = "Date Updated: "+getDateString(projectMetadata.updatedDate);

    if(projectMetadata.version===undefined){
        version.innerText = "Version: 1";
    }else{
        version.innerText = "Version: "+ projectMetadata.version;
    }

    database.ref("userdata/"+projectMetadata.author+"/username").once("value").then((snapshot) => {
        authorUsername.innerText = snapshot.val();
    });
    database.ref("userdata/"+projectMetadata.author+"/profileIcon").once("value").then((snapshot) => {
        authorImg.setAttribute("src",snapshot.val());
    });

    if(projectMetadata.original!==undefined){
        insertOriginalInfo(originalInfo,originalImg,originalUsername,originalTitle);
    }

    if(projectMetadata.lessonId!==null&&projectMetadata.lessonId!==undefined){
        document.querySelector(".code-editor").remove()
        document.querySelector(".lesson-button-container").style.display = "flex";
        database.ref("lessons/"+projectMetadata.lessonId+"/name").once("value").then((snapshot) => {
            document.querySelector(".lesson-title").innerHTML = snapshot.val()
        });
        database.ref("lessons/"+projectMetadata.lessonId+"/thumb").once("value").then((snapshot) => {
            document.querySelector(".lesson-thumb").src = snapshot.val()
        });
        document.querySelector(".lesson-button").addEventListener("click",()=>{
            openLesson(projectMetadata.lessonId);
        });
    }
}

function insertOriginalInfo(originalInfo,originalImg,originalUsername,originalTitle){
    originalInfo.style.display="flex";

    database.ref("sharedProjects/metadata/"+projectMetadata.original).once("value").then((snapshot) => {
        let data = snapshot.val();

        loadUserToHTML(originalUsername,originalImg,data.author);
        originalTitle.innerText=data.name;
    })

    originalInfo.lastElementChild.addEventListener("click",()=>{
        window.location.href="project.html?shareboardid="+projectMetadata.original;
    })

}

function loadUserToHTML(usernameEl,imgEl,uid){
    database.ref("userdata/"+uid+"/username").once("value").then((snapshot) => {
        usernameEl.innerText = snapshot.val();
    });
    database.ref("userdata/"+uid+"/profileIcon").once("value").then((snapshot) => {
        imgEl.setAttribute("src",snapshot.val());
    });
}



function getDateString(unixStamp){
    if(unixStamp===0||unixStamp===undefined||unixStamp===null){
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

