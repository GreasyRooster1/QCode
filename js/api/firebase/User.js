class User{

    createdAt = "";
    username = "";
    email = "";
    lastLoginAt = "";
    uid = "";
    permissions = {};

    constructor(firebaseUserObj){
        this.createdAt = firebaseUserObj.createdAt;
        this.email = firebaseUserObj.email;
        this.lastLoginAt = firebaseUserObj.lastLoginAt;
        this.uid = firebaseUserObj.uid;
    }

    loadUserPermissions(data){
        for (let [key,value] of Object.entries(data)){
            this.permissions[key] = value;
        }
    }
}