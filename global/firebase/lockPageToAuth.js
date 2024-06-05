
if(getStoredUser()===null){
    console.log(window.location.href);
    if(window.location.href.includes("index.html")||window.location.href.endsWith("/")){
        window.location.replace("login/login.html?retUrl="+btoa(window.location.href));
    }else {
        window.location.href = "../login/login.html?retUrl="+btoa(window.location.href);
    }
}else{
    console.log("authorized!");
}