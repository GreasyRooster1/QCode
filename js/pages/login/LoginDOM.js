class LoginDOM{
    static usernameInput;
    static passwordInput;

    static authErrorDisplayWrapper;
    static authErrorContent;

    static getElements(){
        LoginDOM.usernameInput = document.querySelector(".username-input");
        LoginDOM.passwordInput = document.querySelector(".password-input");
        LoginDOM.authErrorDisplayWrapper = document.querySelector(".auth-error");
        LoginDOM.authErrorContent = document.querySelector(".auth-error-message");
    }
}

LoadRegistry.register(LoginDOM.getElements);