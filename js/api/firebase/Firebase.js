class FBAuth {
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

    static storeUser(data){
        localStorage.setItem("isLoggedIn", "true");
        localStorage.setItem("currentUserRawData",JSON.stringify(data));
        this.loadUserFromRemote(data);
    }

    static clearStoredUser(){
        localStorage.setItem("isLoggedIn", "false");
        localStorage.setItem("currentUserRawData",null);
        localStorage.setItem("currentUser",null);
    }

    static getStoredRawUserData(){
        let jsonData = localStorage.getItem("currentUserData");
        if(jsonData!==null){
            return JSON.parse(jsonData);
        }
        return null;
    }

    static getStoredUser(){
        let jsonData = localStorage.getItem("currentUser");
        if(jsonData!==null){
            return User.from(JSON.parse(jsonData));
        }
        return null;
    }

    static loadUserFromRemote(fbData){
        let user = new User(fbData);
        user.loadUserPermissions()
        localStorage.setItem("currentUser",JSON.stringify(user));
    }

    static get isLoggedIn(){
        return localStorage.getItem("isLoggedIn");
    }
}

class FBDatabase{
    static database;

    static querySpecific(path, callback){
        database.ref(path).once("value", (snapshot)=>{
            callback(snapshot.val());
        });
    }

    static addQueryListenerToPath(path,callback){
        database.ref(path).on("value", (snapshot)=>{
            callback(snapshot.val());
        });
    }

    static queryUserValue(relativePath,callback){
        if(relativePath==="projects"){
            throw "Cannot access entire project folder directly!";
        }

        let path = "userData/"+FBAuth.getStoredUser().uid+relativePath
        this.querySpecific(path,callback);
    }
}

LoadRegistry.register(() => {
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
    FBDatabase.database = firebase.database
});