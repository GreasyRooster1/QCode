class SignInButtonComponent extends GenericButtonEvents{

    constructor() {
        super();
    }

    onClick(){
        console.log("working")
    }
}

GenericButtonComponent.register(SignInButtonComponent);