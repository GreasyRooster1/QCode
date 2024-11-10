let projectMetadata;
let projectCode;

function loadProject() {
    const urlParams = new URLSearchParams(window.location.search);
    const shareBoardID = urlParams.get('shareboardid');
    database.ref("sharedProjects/metadata/"+shareBoardID).once("value").then((snapshot) => {
        projectMetadata = snapshot.val();
    })
    database.ref("sharedProjects/projectData/"+shareBoardID).once("value").then((snapshot) => {
        projectCode = snapshot.val();
    })
}