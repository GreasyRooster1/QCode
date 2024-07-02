class SignInButtonComponent extends GenericButtonComponent{
    onClick(){
        console.log("working")
    }
}

GenericButtonComponent.register(SignInButtonComponent);