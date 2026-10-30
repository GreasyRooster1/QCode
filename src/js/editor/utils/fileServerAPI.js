import { getStoredUser } from "../../api/auth";
import { auth } from "../../api/firebase";
import { getAuth } from "firebase/auth";
function sendImageToFileServer(data, url) {
    console.log("sending file to server: " + url);
    return new Promise((resolve, reject) => {
        var _a;
        (_a = getAuth().currentUser) === null || _a === void 0 ? void 0 : _a.getIdToken(true).then((idToken) => {
            fetch(url, {
                method: "PUT",
                body: data,
                headers: {
                    "Authorization": "Bearer " + idToken,
                }
            }).then(res => {
                console.log(res + " " + url);
                resolve();
            }).catch(err => {
                console.log(err + " " + url);
                reject(err);
            });
        }).catch((error) => {
            console.error("Error getting ID token:", error);
            reject(error);
        });
    });
}
function getURLForProjectFile(projectid, path) {
    let username = getStoredUser().username;
    return "https://" + username + ".esporterz.com/" + projectid + "/" + path;
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
