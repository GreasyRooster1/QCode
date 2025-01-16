const badgesDisplay = document.querySelector(".badges-display");

const badgeDetailsName = document.querySelector(".badge-details .name");
const badgeDetailsId = document.querySelector(".badge-details .id");
const badgeDetailsValue = document.querySelector(".badge-details .value");
const badgeDetailsRarity = document.querySelector(".badge-details .rarity");
const badgeDetailsDesc = document.querySelector(".badge-details .description");
const badgeDetailsImg = document.querySelector(".badge-details .badge-img");

function setupBadge(){
    let lessonsRef = database.ref('badges');
    lessonsRef.on('value', (snapshot) => {
        const data = snapshot.val();
        clearBadges();
        console.log(data);
        for(const [badgeId, badgeData] of Object.entries(data)){
            createBadgeElement(badgeId,badgeData);
        }
    });
}

function createBadgeElement(badgeId,badgeData){
    let badgeEl = document.createElement("div");
    let wrapperEl = document.createElement("div");

    wrapperEl.classList.add("listed-data-item-wrapper");

    badgeEl.classList.add("listed-data-item");
    badgeEl.setAttribute("data-badgeid",badgeId);

    badgeEl.innerHTML = badgeData.name;

    badgeEl.addEventListener("click",showBadgeDetails);

    wrapperEl.appendChild(badgeEl);
    badgesDisplay.appendChild(wrapperEl);
}

function showBadgeDetails(e){
    let badgeId = e.currentTarget.getAttribute("data-badgeid");
    database.ref("badges/"+badgeId).once("value").then((snap)=>{
        let data = snap.val();
        badgeDetailsName.innerHTML = data.name;
        badgeDetailsId.innerHTML = badgeId;
        badgeDetailsValue.innerHTML = data.value;
        badgeDetailsRarity.innerHTML = data.rarity;
        badgeDetailsDesc.innerHTML = data.description;
        badgeDetailsImg.setAttribute("src",data.image);
    });
}

function clearBadges(){
    badgesDisplay.innerHTML = "";
}



setupBadge();