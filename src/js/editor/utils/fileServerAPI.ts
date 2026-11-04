import {extractUsernameFromEmail, getStoredUser} from "../../api/auth";
import {auth} from "../../api/firebase";
import {getAuth} from "firebase/auth";

function sendImageToFileServer(data:any,url:string){
    console.log("sending file to server: "+url)
    return new Promise<void>((resolve, reject) => {
    getAuth()!.currentUser?.getIdToken(true)
        .then((idToken: string) => {
            fetch(url, {
                method: "PUT",
                body: data,
                headers: {
                    "Authorization": "Bearer " + idToken,
                }
            }).then(res => {
                console.log(res+" "+url)
                resolve()
            }).catch(err => {
                console.log(err+" "+url)
                reject(err)
            });
        })
        .catch((error: any) => {
            console.error("Error getting ID token:", error);
            reject(error)
        });
    })
}

function getURLForProjectFile(projectid:any,path:string){
    let username = getStoredUser().username;
    return "https://"+username+".esporterz.com/"+projectid+"/"+path;
}

function getAuthSessionToken(){
    auth.onAuthStateChanged((user:any)=> {
        if (user) {
            auth.currentUser!.getIdToken(/* forceRefresh */ true).then((idToken:any) =>{
                //console.log(idToken);
            }).catch((error:any)=> {
               // console.log(error)
            });
        } else {
            // No user is signed in.
        }
    });

}

export{sendImageToFileServer,getURLForProjectFile,getAuthSessionToken};