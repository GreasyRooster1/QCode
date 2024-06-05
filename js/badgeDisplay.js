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
    })
}