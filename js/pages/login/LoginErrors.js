class LoginErrors{
    static handleError(error){
        if(error.code==="auth/internal-error"){
            showAuthError("Username or password is incorrect!");
        }else {
            showAuthError(error.message);
        }
    }

    static showAuthError(message){
        authErrorDisplayWrapper.style.display = "block"
        authErrorContent.innerHTML = message;
    }
}