class User{

    createdAt = "";
    email = "";
    lastLoginAt = "";
    uid = "";

    username = "";
    permissions = {};

    constructor(firebaseUserObj){
        this.createdAt = firebaseUserObj.createdAt;
        this.email = firebaseUserObj.email;
        this.lastLoginAt = firebaseUserObj.lastLoginAt;
        this.uid = firebaseUserObj.uid;
    }

    static from(userObj) {
        let user = new User(userObj);
        user.permissions = userObj.permissions;
        user.uid = userObj.username;
        return user;
    }

    loadUserPermissions(){
        FBDatabase.querySpecific("userpermissions/"+uid, (data) => {
            for (let [key,value] of Object.entries(data)){
                this.permissions[key] = value;
            }
        })
    }
}