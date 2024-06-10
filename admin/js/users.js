const userDisplay = document.querySelector('.users-display');
const userDetailsBadgeDisplay = document.querySelector('.user-details-badges-display');

const userDetailsName = document.querySelector(".user-details .name");
const userDetailsUid = document.querySelector(".user-details .uid");
const userDetailsPoints = document.querySelector(".user-details .points");

let selectedUserUid = null;

const addBadgeButton = document.querySelector(".add-badge-button");

function setupUsers(){
    database.ref('userdata').once('value').then((snapshot) => {
        const data = snapshot.val();
        clearUsers();
        console.log(data);
        for(const [uid, userData] of Object.entries(data)){
            createUserElement(uid,userData);
        }
    });
}

function loadUserBadges(badges){
    userDetailsBadgeDisplay.innerHTML = '';
    for(const badge of badges){
        createBadgeElement(badge.id);
    }
}


function clearUsers(){
    userDisplay.innerHTML = ""
}

function createBadgeElement(id){
    let badgeEl = document.createElement("div");
    let wrapperEl = document.createElement("div");

    wrapperEl.classList.add("listed-data-item-wrapper");
    badgeEl.classList.add("listed-data-item");

    badgeEl.innerHTML = id;

    wrapperEl.appendChild(badgeEl);
    userDetailsBadgeDisplay.appendChild(wrapperEl);
}

function createUserElement(uid,userData){
    let userEl = document.createElement("div");
    let wrapperEl = document.createElement("div");

    wrapperEl.classList.add("listed-data-item-wrapper");

    userEl.classList.add("listed-data-item");
    userEl.setAttribute("data-uid",uid);

    if(userData.username===undefined){
        userEl.innerHTML = "[Username Not Set]";
    }else {
        userEl.innerHTML = userData.username;
    }
    userEl.addEventListener("click",showUserDetails);

    wrapperEl.appendChild(userEl);
    userDisplay.appendChild(wrapperEl);
}

function showUserDetails(e) {
    let uid = e.currentTarget.getAttribute("data-uid");

    userDetailsUid.innerHTML = uid;
    selectedUserUid = uid;

    database.ref("userdata/" + uid).once("value").then((snap) => {
        let data = snap.val();

        userDetailsName.innerHTML = data.username;
        userDetailsPoints.innerHTML = data.points;
        loadUserBadges(data.badges)
    });
}

addBadgeButton.addEventListener("click",function (){
    if(selectedUserUid===null){
        return;
    }

    let newBadgeId = prompt("Please enter the id of the badge to add");

    database.ref("userdata/" + selectedUserUid+"/badges").once("value").then((snapshot) => {
        let badges = snapshot.val();
        badges.push({id:newBadgeId});

        database.ref("userdata/" + selectedUserUid+"/badges").set(badges);
    })
})

setupUsers();