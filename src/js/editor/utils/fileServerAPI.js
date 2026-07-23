import { getStoredUser } from "../../api/auth";
import { auth } from "../../api/firebase";
function sendImageToFileServer(data, url) {
    console.log("sending file to server: " + url);
    fetch(url, {
        method: "PUT",
        body: data,
    }).then(res => {
        console.log(res + " " + url);
    }).catch(err => {
        console.log(err + " " + url);
    });
}
function getURLForProjectFile(projectid, path) {
    let username = getStoredUser().email.split("@")[0];
    return "http://" + username + ".esporterz.com/" + projectid + "/" + path;
}
function getAuthSessionToken() {
    auth.onAuthStateChanged((user) => {
        if (user) {
            auth.currentUser.getIdToken(/* forceRefresh */ true).then((idToken) => {
                //console.log(idToken);
            }).catch((error) => {
                // console.log(error)
            });
        }
        else {
            // No user is signed in.
        }
    });
}
export { sendImageToFileServer, getURLForProjectFile, getAuthSessionToken };
