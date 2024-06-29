const rootStyle = getComputedStyle(document.body)
const rarities = [
    "common",
    "uncommon",
    "rare",
    "legendary",
    "mythic",
]


function getRarityColor(rarity){
    let rarityValue = rarity.toLowerCase();
    return rootStyle.getPropertyValue("--"+rarityValue+"-rarity-color");
}