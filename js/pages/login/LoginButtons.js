class SignInButtonComponent extends GenericButtonEvents{

    constructor() {
        super();
    }

    onClick(){
        let email = LoginDOM.usernameInput.value;
        let password = LoginDOM.passwordInput.value;
        let username = FBAuth.getEmailFromUsername(email);

        FBAuth.signInUser(username, password,(user) => {

        },LoginErrors.handleError);
    }
}

GenericButtonComponent.register(SignInButtonComponent);