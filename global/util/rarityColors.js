var rootStyle = getComputedStyle(document.body)

function getRarityColor(rarity){
    let rarityValue = rarity.toLowerCase();
    return rootStyle.getPropertyValue("--"+rarityValue+"-rarity-color");
}