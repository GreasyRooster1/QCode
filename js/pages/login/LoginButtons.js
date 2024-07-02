class SignInButtonComponent extends GenericButtonEvents{

    constructor() {
        super();
    }

    onClick(){
        let username = LoginDOM.usernameInput.value;
        let password = LoginDOM.passwordInput.value;

        FBAuth.signInUser(username, password,(user) => {

        });
    }
}

GenericButtonComponent.register(SignInButtonComponent);