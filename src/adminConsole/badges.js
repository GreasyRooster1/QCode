import {db} from "../api/firebase";
import {get, onValue, ref} from "firebase/database";


const badgeDetailsName = document.querySelector(".badge-details .name");
const badgeDetailsId = document.querySelector(".badge-details .id");
const badgeDetailsValue = document.querySelector(".badge-details .value");
const badgeDetailsRarity = document.querySelector(".badge-details .rarity");
const badgeDetailsDesc = document.querySelector(".badge-details .description");
const badgeDetailsImg = document.querySelector(".badge-details .badge-img");

let badgePriorities = [1,2,3]

function setupBadge(){
    let lessonsRef = ref(db,'badges');
    onValue(lessonsRef, (snapshot) => {
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

    document.querySelector(".badges-display-"+badgeData.priority).appendChild(wrapperEl);
}

function showBadgeDetails(e){
    let badgeId = e.currentTarget.getAttribute("data-badgeid");
    get(ref(db,"badges/"+badgeId)).then((snap)=>{
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
    for(let p of badgePriorities) {
        document.querySelector(".badges-display-"+p).innerHTML = "";
    }
}

export {setupBadge}