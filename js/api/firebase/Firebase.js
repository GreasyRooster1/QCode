const firebaseConfig = {
    apiKey: "AIzaSyC1GB-hiznIqC51ppB23rIgHSIRM0MT9B8",
    authDomain: "qcode-cdfc6.firebaseapp.com",
    databaseURL: "https://qcode-cdfc6-default-rtdb.firebaseio.com",
    projectId: "qcode-cdfc6",
    storageBucket: "qcode-cdfc6.appspot.com",
    messagingSenderId: "880821739173",
    appId: "1:880821739173:web:7f68b987c9a53e49bb374c",
    measurementId: "G-E5DHM57W13"
};

firebase.initializeApp(firebaseConfig);

class Firebase {
    static database = firebase.database;

    //Auth

    static lockPageToAuth(){
        if(getStoredUser()===null){
            window.location.href = "login.html?retUrl="+btoa(window.location.href);
        }else{
            console.log("authorized!");
        }
    }

    static signOutUser(){
        firebase.auth().signOut().then(() => {
            console.log("logged out user");
            clearStoredUser();
        }).catch((error) => {
            console.log(error);
        });
    }

    static getEmailFromUsername(username){
        return username+"@esporterz.com"
    }

    static getUsernameFromEmail(email){
        return email.replace("@esporterz.com","");
    }

    static storeUserData(data){
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUserData",JSON.stringify(data));
    }

    static clearStoredUser(){
        localStorage.setItem("isLoggedIn", "false");
        localStorage.setItem("currentUserData",null);
    }

    static getStoredUserData(){
        let jsonData = localStorage.getItem("currentUserData");
        if(jsonData!==null){
            return JSON.parse(jsonUser);
        }
        return null;
    }

    static get isLoggedIn(){
        return localStorage.getItem("isLoggedIn");
    }

    //DB

}