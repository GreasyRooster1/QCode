const database = firebase.database();
const userdataFolder = database.ref('userdata');

function setDarkMode(dark){
    userdataFolder.child(getStoredUser().uid).child("darkmode").set(dark);
}