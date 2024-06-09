const userDisplay = document.querySelector('.users-display');

function setupUsers(){
    database.ref('userdata').once('value').then((snapshot) => {
        const data = snapshot.val();
        clearUsers();
        console.log(data);
        for(const [userUid, userData] of Object.entries(data)){
            createUserElement(userUid,userData);
        }
    });
}

function createUserElement(userUid,userData){
    let userEl = document.createElement("div");

    userEl.setAttribute("data-userid",userUid);
    if(userData.username===undefined){
        userEl.innerHTML = "[Username Not Set]";
    }else {
        userEl.innerHTML = userData.username;
    }

    userDisplay.appendChild(userEl);
}

function clearUsers(){
    userDisplay.innerHTML = ""
}

setupUsers();