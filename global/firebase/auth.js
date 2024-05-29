//https://stackoverflow.com/questions/59935608/solved-get-user-auth-data-from-firebase-add-it-to-firebase-db

let currentUser = null;

function createUser(email,password){
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            console.log("created user");
            currentUser = user;
        })
        .catch((error) => {
            handleAuthErrors(error.code,error.message)
        });
}

function logInUser(email,password){
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
            let user = userCredential.user;
            console.log("logged in user");
            currentUser = user;
        })
        .catch((error) => {
            handleAuthErrors(error.code,error.message)
        });

}

function logOutUser(){
    firebase.auth().signOut().then(() => {
        console.log("logged out user");
        currentUser = null;
    }).catch((error) => {
        handleAuthErrors(error.code,error.message);
    });
}

function handleAuthErrors(errorCode,errorMessage){
    console.error("Auth error: ",errorCode,errorMessage);
}