class SignInButtonEvent extends GenericButtonEvents{

    constructor() {
        super();
    }

    onClick(){
        let email = LoginDOM.usernameInput.value;
        let password = LoginDOM.passwordInput.value;
        let loginName = LoginAdmin.isAdminLogin ? email : FBAuth.getEmailFromUsername(email);

        FBAuth.signInUser(loginName, password,(user) => {
            if(LoginAdmin.isAdminLogin){
                window.location.href = "admin.html"
            }else {
                window.location.href = "index.html"
            }
        },LoginErrors.handleError);
    }
}

class AdminSwitchButtonEvent extends GenericButtonEvents{

    constructor() {
        super();
    }

    onClick(){
        LoginAdmin.isAdminLogin = true;
        LoginAdmin.switchStyleToAdmin();
    }
}

GenericButtonComponent.register(SignInButtonEvent);
GenericButtonComponent.register(AdminSwitchButtonEvent);