import {extractUsernameFromEmail, getStoredUser} from "../../api/auth";

function sendImageToFileServer(data:any,url:string){
    console.log("sending file to server: "+url)
    //todo
}

function getURLForProjectFile(projectid:any,path:string){
    let username = getStoredUser().email.split("@")[0];
    return username+"."+projectid+"/"+path;
}

export{sendImageToFileServer,getURLForProjectFile};