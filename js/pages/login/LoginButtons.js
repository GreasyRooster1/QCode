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

class AdminSwitchButtonComponent extends GenericButtonEvents{

    constructor() {
        super();
    }

    onClick(){
        LoginAdmin.isAdminLogin = true;
        LoginAdmin.switchStyleToAdmin();
    }
}

GenericButtonComponent.register(SignInButtonComponent);
GenericButtonComponent.register(AdminSwitchButtonComponent);