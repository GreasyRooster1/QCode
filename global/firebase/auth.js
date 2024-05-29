//https://stackoverflow.com/questions/59935608/solved-get-user-auth-data-from-firebase-add-it-to-firebase-db

function createUser(email,password){
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
            // Signed in
            var user = userCredential.user;
            console.log(user);
        })
        .catch((error) => {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log(errorCode,errorMessage);
        });
}