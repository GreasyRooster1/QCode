import {handleAuthErrors, storeUser, storeUserPermissions} from "../api/auth";
import {auth, db} from "../api/firebase";
import {get, ref} from "firebase/database";
import {signInWithEmailAndPassword} from "firebase/auth";
import {loadTheme} from "../api/theme";

const loginButton = document.querySelector(".login-button");
const emailInput = document.querySelector(".email-input");
const passwordInput = document.querySelector(".password-input");

const authErrorDisplayWrapper = document.querySelector(".auth-error");
const authErrorContent = document.querySelector(".auth-error-message");

loginButton.addEventListener("click", function(){
    let email = emailInput.value;
    let password = passwordInput.value;

    signInWithEmailAndPassword(auth,email, password)
        .then((userCredential) => {

            let user = userCredential.user;

            get(ref(db,"userpermissions/"+user.uid)).then(function (snap) {
                let data = snap.val();
                console.log(data);

                if(data===null){
                    showAuthError("It appears you aren't an admin!");
                    return;
                }

                if (data.hasAdminConsoleAccess){
                    handleAuthAdminLogin(user,data);
                }else{
                    showAuthError("It appears you aren't an admin!");
                }
            });
        })
        .catch((error) => {
            showAuthError(handleAuthErrors(error));
        });
});

function handleAuthAdminLogin(user,perms){
    storeUserPermissions(perms)
    storeUser(user, ()=>{
        console.log("logged in user");
        window.location.replace("./adminConsole.html");
    });
}

function showAuthError(msg){
    authErrorDisplayWrapper.style.display = "block"
    authErrorContent.innerHTML = msg;
}
loadTheme()