class Rarity{
    static rarities = [
        "common",
        "uncommon",
        "rare",
        "legendary",
        "mythic",
    ]

    static getRarityColor(rarity){
        let rarityValue = rarity.toLowerCase();
        return getComputedStyle(document.body).getPropertyValue("--"+rarityValue+"-rarity-color");
    }
}