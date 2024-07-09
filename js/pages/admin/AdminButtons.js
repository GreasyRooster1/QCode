class LessonCreatorButtonEvent extends GenericButtonEvents{
    constructor() {
        super();
    }

    onClick() {
        window.location.href = "editor.html?lessonCreator=d293IGltIGNvZGluZw==";
    }
}

class HomeButtonComponent extends GenericButtonEvents{
    constructor() {
        super();
    }

    onClick() {
        window.location.href = "index.html";
    }
}

class AddUserButtonEvent extends GenericButtonEvents{
    constructor() {
        super();
    }

    onClick() {
        let username = prompt("enter new username:")

        if(username==null){
            return;
        }

        let password = prompt("enter password (please dont rely on this being changed)");

        if(password==null){
            return;
        }

        let email = extractEmailFromUsername(username);

        FBAuth.createNewUser(email,password,(user)=>{
            console.log("created user");
        },(error)=>{
            alert(error.code+" "+error.message);
        })

    }
}

GenericButtonComponent.register(LessonCreatorButtonEvent);
GenericButtonComponent.register(AddUserButtonEvent);