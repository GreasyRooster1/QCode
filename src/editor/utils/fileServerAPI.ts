import {extractUsernameFromEmail, getStoredUser} from "../../api/auth";

function sendImageToFileServer(data:any){
    //todo
}

function getURLForProjectFile(projectid:any,path:string){
    let username = extractUsernameFromEmail(getStoredUser().email);
    return username+"."+projectid+"/"+path;
}

export{sendImageToFileServer,getURLForProjectFile};