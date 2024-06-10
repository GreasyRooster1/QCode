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
    let wrapperEl = document.createElement("div");

    wrapperEl.classList.add("listed-data-item-wrapper");

    userEl.classList.add("listed-data-item");
    userEl.setAttribute("data-userid",userUid);

    if(userData.username===undefined){
        userEl.innerHTML = "[Username Not Set]";
    }else {
        userEl.innerHTML = userData.username;
    }

    wrapperEl.appendChild(userEl);
    userDisplay.appendChild(wrapperEl);
}

function clearUsers(){
    userDisplay.innerHTML = ""
}

setupUsers();