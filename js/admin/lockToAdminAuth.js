
if(getStoredUser()===null){
    redirect()
}else{
    database.ref("userpermissions/"+getStoredUser().uid).once("value").then((snapshot) => {
       let data = snapshot.val();
       if(data===null){
           redirect();
       }
       if(data.hasAdminConsoleAccess){
           console.log("authorized");
       }else{
           redirect();
       }
    });
}

function redirect(){
    if(window.location.href.includes("index.html")||window.location.href.endsWith("/")){
        window.location.replace("login/login.html?retUrl="+btoa(window.location.href));
    }else {
        window.location.href = "../login/login.html?retUrl="+btoa(window.location.href);
    }
}