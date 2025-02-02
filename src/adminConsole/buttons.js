import {extractEmailFromUsername, handleAuthErrors, storeUser} from "../api/auth";
import {createUserWithEmailAndPassword } from "firebase/auth";
import {auth} from "../api/firebase";

const lessonCreatorButton = document.querySelector(".lesson-creator-button");
const homeButton = document.querySelector(".home-button");
const addUserButton = document.querySelector(".create-user-button");

function setupButtonEvents() {
    lessonCreatorButton.addEventListener("click", (e) => {
        window.location.href = "./editor.html?projectId=$$lesson$$creator$$"
    })

    homeButton.addEventListener("click", (e) => {
        window.location.href = "./index.html";
    })

    addUserButton.addEventListener("click", (e) => {
        let username = prompt("enter new username:")

        if (username == null) {
            return;
        }

        let password = prompt("enter password");
        let email = extractEmailFromUsername(username);

        createUserWithEmailAndPassword(auth,email, password)
            .then((userCredential) => {
                console.log(userCredential.user);
                storeUser(userCredential.user);
            })
            .catch((error) => {
                handleAuthErrors(error.code, error.message);
            });
    })
}
export {setupButtonEvents}