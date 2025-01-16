const gitApiLink = "https://api.github.com/repos/GreasyRooster1/QCode/commits?sha=production&per_page=1&page=1"
const versionEl = document.querySelector(".footer-content .version")

function httpGet(theUrl, return_headers) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, false); // false for synchronous request
    xmlHttp.send(null);
    if (return_headers) {
        return xmlHttp
    }
    return xmlHttp.responseText;
}

function displayVersion(){
    database.ref("version").on("value", (snapshot)=>{
        let rawVersionString = snapshot.val();
        let formattedVersion = rawVersionString.replace("{commitNum}",getCommitNum);
        versionEl.innerHTML = formattedVersion;
    })
}


function getCommitNum() {
    const response = httpGet(gitApiLink,true);
    let linkHead =response.getResponseHeader('Link');
    let vars = linkHead.split("&")
    let pages = vars[vars.length-1];
    let commitNum = parseInt(pages.split("=")[1]);

    return commitNum;
}