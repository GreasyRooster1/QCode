import {db} from "../api/firebase";
import {badgeDisplay} from "./index";
import {ref, get, onValue} from "firebase/database";
import {getStoredUser} from "../api/auth";

const badgeDetailName = document.querySelector(".badge-name");
const badgeDetailDesc = document.querySelector(".badge-info-desc");
const badgeDetailImage = document.querySelector(".badge-info-image");
const badgeDetailRarity = document.querySelector(".badge-rarity");

function badgeClickEvent(badgeEl){
    let badgeId = badgeEl.getAttribute("data-badgeid");
    get(ref(db,"badges/"+badgeId)).then(function (snapshot) {
        const data = snapshot.val();
        badgeDetailName.innerHTML = data.name;
        badgeDetailDesc.innerHTML = data.description;
        badgeDetailImage.setAttribute("src",data.image)
        badgeDetailImage.style.display="block"

        let capRarity = data.rarity.charAt(0).toUpperCase() + data.rarity.slice(1);
        badgeDetailRarity.innerHTML = capRarity;
        badgeDetailRarity.className = "";
        badgeDetailRarity.classList.add("badge-rarity");
        badgeDetailRarity.classList.add(data.rarity);
    })
}

function createBadgeElementFromSnap(snap,id){
    let badgeProperties = snap.val();

    let badgeElement = document.createElement("div");
    badgeElement.classList.add("badge");

    let img = document.createElement("img");
    img.setAttribute("src",badgeProperties.image);
    img.setAttribute("alt",badgeProperties.name+" badge");
    img.setAttribute("title",badgeProperties.name);

    let hoverText = document.createElement("div");
    hoverText.classList.add("badge-desc");

    let hoverTextContent = document.createElement("div");
    hoverTextContent.classList.add("badge-desc-text");
    hoverTextContent.innerHTML = badgeProperties.value+"pts";

    hoverText.appendChild(hoverTextContent);

    badgeElement.setAttribute("data-badgeid",id)
    badgeElement.classList.add(badgeProperties.rarity);

    badgeElement.appendChild(img);
    badgeElement.appendChild(hoverText);

    badgeElement.addEventListener("click",function (e) {
        badgeClickEvent(e.currentTarget);
    })

    badgeDisplay.appendChild(badgeElement)
}

function loadBadges(){
    let badgesRef = ref(db,'userdata/'+getStoredUser().uid+"/badges");
    onValue(badgesRef,(snapshot) => {
        const data = snapshot.val();
        clearBadges();

        badgeDisplay.innerHTML = "";
        let badges = data.values().toArray().filter(b => b!==undefined);
        for(let badge of badges){
            let badgeConnect = get(ref(db,"badges/"+badge.id))
            badgeConnect.then((snap)=>{
                createBadgeElementFromSnap(snap,badge.id)
            });
        }
    });
}

function clearBadges(){
    badgeDisplay.innerHTML = "";
}


export {loadBadges};