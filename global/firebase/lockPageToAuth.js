
if(getStoredUser()===null){
    if(window.location.href.includes("index.html")||window.location.href.endsWith("/")){
        window.location.replace("login/login.html");
    }else {
        window.location.href = "../login/login.html";
    }
}else{
    console.log("authorized!");
}