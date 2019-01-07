
var ninjaAccessory = new XMLHttpRequest();
var ninjaArmour = new XMLHttpRequest();
var ninjaFlask = new XMLHttpRequest();
var ninjaJewel = new XMLHttpRequest();
var ninjaWeapon = new XMLHttpRequest();

var poeCharacter = new XMLHttpRequest();

// poe.ninja Prices JSON
ninjaAccessory.open('GET', 'https://poe.ninja/api/Data/GetUniqueAccessoryOverview?league=Betrayal');
ninjaAccessory.responseType = 'json';
ninjaAccessory.send();

ninjaArmour.open('GET', 'https://poe.ninja/api/Data/GetUniqueArmourOverview?league=Betrayal');
ninjaArmour.responseType = 'json';
ninjaArmour.send();

ninjaFlask.open('GET', 'https://poe.ninja/api/Data/GetUniqueFlaskOverview?league=Betrayal');
ninjaFlask.responseType = 'json';
ninjaFlask.send();

ninjaJewel.open('GET', 'https://poe.ninja/api/Data/GetUniqueJewelOverview?league=Betrayal');
ninjaJewel.responseType = 'json';
ninjaJewel.send();

ninjaWeapon.open('GET', 'https://poe.ninja/api/Data/GetUniqueWeaponOverview?league=Betrayal');
ninjaWeapon.responseType = 'json';
ninjaWeapon.send();

// Character Items JSON
poeCharacter.open('GET', 'https://www.pathofexile.com/character-window/get-items?accountName=xPazam&character=pazam_xxx');
poeCharacter.responseType = 'json';
poeCharacter.send();


ninjaWeapon.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log("poe.ninja items", this.response);

    }
}

poeCharacter.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log("The character items: ", this.response);

    }
}

setTimeout(function(){
    if ((ninjaWeapon.readyState == 4 && ninjaWeapon.status == 200) 
        && (poeCharacter.readyState == 4 && poeCharacter.status == 200)) {
        console.log("We are ready!");

        // Weeeeeeeeee!
        var cost = calculateCharacterCost(ninjaAccessory.response, ninjaArmour.response, ninjaFlask.response, ninjaJewel.response, ninjaWeapon.response, poeCharacter.response);
        console.log("The cost is: ", cost);
    }
    else {
        console.log("We are NOT ready!");
    }
}, 2000);


function calculateCharacterCost(accessoryPrice, armourPrice, flaskPrice, jewelPrice, weaponPrice, characterItems){
    var totalChaos = 0;

    // First let's collect all of the character items that we can use to search through poe.ninja's item Prices

    // for each item in characterItems array
    // if name is "" then ignore because it is a rare item (stretch goal)
    // 
    var numOfItems = Object.keys(characterItems['items']).length;
    console.log("This character has", numOfItems, "items.");
    
    for (var i = 0; i < numOfItems; i++) {
        var itemName = characterItems['items'][i]['name'];
        var itemType = Object.keys(characterItems['items'][i]['category'])[0];

        // This condition will not be necessary once prices of rare items 
        // can be estimated. Until then, we shall skip them.
        if (itemName == ''){
            console.log("Rare Item", itemType)
        }
        else {
            console.log(itemName, itemType)

            if (itemType == 'accessories'){
                totalChaos += findUniqueItemCost(accessoryPrice, itemName);
            }
            else if (itemType == 'armour'){
                totalChaos += findUniqueItemCost(armourPrice, itemName);
            }
            else if (itemType == 'flasks'){
                totalChaos += findUniqueItemCost(flaskPrice, itemName);
            }
            else if (itemType == 'jewel'){
                totalChaos += findUniqueItemCost(jewelPrice, itemName);
            }
            else if (itemType == 'weapons'){
                totalChaos += findUniqueItemCost(weaponPrice, itemName);
            }
            else {
                console.log("Unknown item type. FeelsBadMan");
            }

        }
    }
    return totalChaos;
}

/**
*   Finds the cost (in chaos orbs) of a given item and a price list JSON from poe.ninja
*
*   @param {The JSON storing prices} itemList
*   @param {the Unique item name string} itemName
*/

function findUniqueItemCost(itemList, itemName) {
    chaosValue = 1;
    var numOfItems = Object.keys(itemList['lines']).length;
    console.log(numOfItems)


    //var itemType = Object.keys(characterItems['items'][i]['category'])[0];
    for (var i = 0; i < numOfItems; i++){
        if (itemList['lines'][i]['name'] == itemName) {
            chaosValue = itemList['lines'][i]['chaosValue'];
        }
    }

    return chaosValue;
}



