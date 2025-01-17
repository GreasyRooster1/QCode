const userDisplay = document.querySelector('.users-display');
const userDetailsBadgeDisplay = document.querySelector('.user-details-badges-display');

const userDetailsName = document.querySelector(".user-details .name");
const userDetailsUid = document.querySelector(".user-details .uid");
const userDetailsPoints = document.querySelector(".user-details .points");
const userDetailsSpentPoints = document.querySelector(".user-details .spent-points");
const userDetailsProjects = document.querySelector(".user-details .projects");

const usersLoadButton = document.querySelector(".users-load-button");

let selectedUserUid = null;

const addBadgeButton = document.querySelector(".add-badge-button");

let dbUserdata={}

function setupUsers(){
    usersLoadButton.addEventListener("click", ()=>{
        userDetailsName.style.display = "block";
        usersLoadButton.style.display = "none";
        loadUsers();
    })
}

function loadUsers(){
    database.ref('userdata').once('value').then((snapshot) => {
        const data = snapshot.val();
        clearUsers();
        console.log(data);
        dbUserdata = data;
        for(const [uid, userData] of Object.entries(data)){
            createUserElement(uid,userData);
        }
    });
}

function loadUserBadges(badges){
    userDetailsBadgeDisplay.innerHTML = '';
    for(const badge of badges){
        createUserBadgeElement(badge.id);
    }
}


function clearUsers(){
    userDisplay.innerHTML = ""
}

function createUserBadgeElement(id){
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
    let data = dbUserdata[uid];

    userDetailsName.innerHTML = data.username;
    userDetailsPoints.innerHTML = data.points;
    userDetailsSpentPoints.innerHTML = data.spentPoints;
    userDetailsProjects.innerHTML = Object.keys(data.projects).length;
    loadUserBadges(data.badges)
}

addBadgeButton.addEventListener("click",function (){
    if(selectedUserUid===null){
        return;
    }

    let newBadgeId = prompt("Please enter the id of the badge to add");

    let badges = dbUserdata[selectedUserUid].badges;
    badges.push({id:newBadgeId});

    database.ref("userdata/" + selectedUserUid+"/badges").set(badges);
})

setupUsers();