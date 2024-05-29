//https://stackoverflow.com/questions/59935608/solved-get-user-auth-data-from-firebase-add-it-to-firebase-db

let currentUser = null;

function createUserDefault(email,password){
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            console.log("created user");
            currentUser = user;
        })
        .catch((error) => {
            handleAuthErrors(error.code,error.message);
        });
}

function logInUserDefault(email,password){
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            console.log("logged in user");
            currentUser = user;
        })
        .catch((error) => {
            handleAuthErrors(error.code,error.message);
        });

}

function logOutUserDefault(){
    firebase.auth().signOut().then(() => {
        console.log("logged out user");
        currentUser = null;
    }).catch((error) => {
        handleAuthErrors(error.code,error.message);
    });
}

function handleAuthErrors(error){
    let errorCode = error.code;
    let errorMessage = error.message;
    console.error("Auth error: ",errorCode,errorMessage);
    if(errorCode==="auth/internal-error"){
        let errorObj = JSON.parse(errorMessage).error;
        if(errorObj.message==="INVALID_LOGIN_CREDENTIALS"){
           return "invalid credentials";
        }
    }
    if(errorCode==="auth/invalid-email"){
        return "invalid email";
    }
    return "ok";
}