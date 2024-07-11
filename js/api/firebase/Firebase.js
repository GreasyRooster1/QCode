class FBAuth {
    static auth = null;
    
    static lockPageToAuth(){
        if(this.getStoredUser()===null){
            window.location.href = "login.html?retUrl="+btoa(window.location.href);
        }else{
            console.log("authorized!");
        }
    }

    static lockPageToAdminAuth(){
        FBAuth.lockPageToAuth()
        FBDatabase.querySpecific("userpermissions/"+this.getStoredUser().uid+"/hasAdminConsoleAccess",(val)=>{
            if(!val){
                window.location.href = "login.html?retUrl="+btoa(window.location.href);
            }
        })
    }

    static signOutUser(){
        this.auth.signOut().then(() => {
            console.log("logged out user");
            this.clearStoredUser();
        }).catch((error) => {
            console.log(error);
        });
    }

    static signInUser(email,password,then,cat){
        this.auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
            this.storeUserFromRaw(userCredential.user);
            then(userCredential.user)
        }).catch((error)=>{
            if(error.code==="auth/internal-error"){
                error.message = "Username or password is incorrect.";
            }
            cat(error);
        })
    }

    static createNewUser(email,password,callback,cat){
        this.auth.createUserWithEmailAndPassword(email, password).then((userCredential)=>{
            this.storeUserFromRaw(userCredential.user);
            then(userCredential.user)
        }).catch((error)=>{
            if(error.code==="auth/internal-error"){
                error.message = "Username or password is incorrect.";
            }
            cat(error)
        })
    }

    static getEmailFromUsername(username){
        return username+"@esporterz.com"
    }

    static getUsernameFromEmail(email){
        return email.replace("@esporterz.com","");
    }

    static storeUserFromRaw(data){
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
        user.loadUserPermissions((userWithPermissions)=>{
            localStorage.setItem("currentUser",JSON.stringify(userWithPermissions));
        });
    }

    static get isLoggedIn(){
        return localStorage.getItem("isLoggedIn");
    }
}

class FBDatabase{
    static database;

    static querySpecific(path, callback){
        this.database.ref(path).once("value", (snapshot)=>{
            callback(snapshot.val());
        });
    }

    static addQueryListenerToPath(path,callback){
        this.database.ref(path).on("value", (snapshot)=>{
            callback(snapshot.val());
        });
    }

    static queryUserValue(relativePath,callback){
        if(relativePath==="projects"){
            throw "Cannot access entire project folder directly!";
        }

        if(!relativePath.startsWith("/")){
            relativePath = "/"+relativePath
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

    FBDatabase.database = firebase.database()
    FBAuth.auth = firebase.auth();
});