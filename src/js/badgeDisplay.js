const badgeDetailName = document.querySelector(".badge-name");
const badgeDetailDesc = document.querySelector(".badge-info-desc");
const badgeDetailImage = document.querySelector(".badge-info-image");
const badgeDetailRarity = document.querySelector(".badge-rarity");

function badgeClickEvent(badgeEl){
    let badgeId = badgeEl.getAttribute("data-badgeid");
    database.ref("badges/"+badgeId).once("value").then(function (snapshot) {
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

    badgeElement.appendChild(img);
    badgeElement.appendChild(hoverText);

    badgeElement.addEventListener("click",function (e) {
        badgeClickEvent(e.currentTarget);
    })

    badgeDisplay.appendChild(badgeElement)
}

function loadBadges(){
    let badgesRef = database.ref('userdata/'+user.uid+"/badges");
    badgesRef.on('value', (snapshot) => {
        const data = snapshot.val();
        clearBadges();

        badgeDisplay.innerHTML = "";
        let badges = data.values().toArray().filter(b => b!==undefined);
        for(let badge of badges){
            let badgeConnect = firebase.database().ref().child("badges").child(badge.id).get();
            badgeConnect.then((snap)=>{
                createBadgeElementFromSnap(snap,badge.id)
            });
        }
    });
}

function clearBadges(){
    badgeDisplay.innerHTML = "";
}