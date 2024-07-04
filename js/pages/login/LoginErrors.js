class LoginErrors{
    static handleError(error){
        showAuthError(error.message);
    }

    static showAuthError(message){
        authErrorDisplayWrapper.style.display = "block"
        authErrorContent.innerHTML = message;
    }
}