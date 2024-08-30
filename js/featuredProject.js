let featuredProjectData = {};
const frame = document.querySelector('#exec-frame');


database.ref("userdata/"+getStoredUser().uid+"/projects").orderByChild('timestamp').limitToLast(1).once("value").then(function(snapshot) {
    featuredProjectData = Object.entries(snapshot.val())[0][1];
})


document.querySelector(".featured-project-thumb .play-icon").addEventListener("click", function() {
    document.querySelector(".featured-project-thumb").classList.toggle("active");
    console.log(featuredProjectData)
    runCode();
});

function runCode(){
    if (frame.contentWindow === null) {
        return;
    }

    frame.contentWindow.postMessage(featuredProjectData.code);
}

window.addEventListener("message", (event) => {
    let log = JSON.parse(event.data);
    console.log("received log from frame: "+log.type+" - "+log.message);

    // let logEl = document.createElement("console-log");
    // logEl.setAttribute("type", log.type);
    // logEl.setAttribute("message", log.message);
    // logEl.setAttribute("head", logHeads[log.type]);
    // consoleOut.insertBefore(logEl,consoleOut.firstChild);
});