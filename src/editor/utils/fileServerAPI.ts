import {extractUsernameFromEmail, getStoredUser} from "../../api/auth";
import {auth} from "../../api/firebase";

function sendImageToFileServer(data:any,url:string){
    console.log("sending file to server: "+url)
    fetch(url, {
        method: "PUT",
        body: data,
    }).then(res => {
        console.log(res+" "+url)
    }).catch(err => {
        console.log(err+" "+url)
    });
}

function getURLForProjectFile(projectid:any,path:string){
    let username = getStoredUser().email.split("@")[0];
    return username+".esporterz.com/"+projectid+"/"+path;
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