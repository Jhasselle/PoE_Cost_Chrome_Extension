
var ninjaAccessory = new XMLHttpRequest();
var ninjaArmour = new XMLHttpRequest();
var ninjaFlask = new XMLHttpRequest();
var ninjaJewel = new XMLHttpRequest();
var ninjaWeapon = new XMLHttpRequest();

var poeCharacterInventory= new XMLHttpRequest();
var poeCharacterJewels = new XMLHttpRequest();

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
poeCharacterInventory.open('GET', 'https://www.pathofexile.com/character-window/get-items?accountName=xPazam&character=pazam_xxx');
poeCharacterInventory.responseType = 'json';
poeCharacterInventory.send();

poeCharacterJewels.open('GET', 'https://www.pathofexile.com/character-window/get-passive-skills?accountName=xPazam&character=pazam_xxx&reqData=0');
poeCharacterJewels.responseType = 'json';
poeCharacterJewels.send();



ninjaArmour.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log('poe.ninja armour: ', this.response);
    }
}

poeCharacterInventory.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log('Character inventory items: ', this.response);
    }
}

poeCharacterJewels.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log('Character tree jewels: ', this.response);
    }
}

setTimeout(function() {
    if ((ninjaWeapon.readyState == 4 && ninjaWeapon.status == 200) 
        && (poeCharacterInventory.readyState == 4 && poeCharacterInventory.status == 200)) {
        console.log('We are ready!');

        // totally not lengthy
        var cost = calculateCharacterCost(ninjaAccessory.response, ninjaArmour.response, ninjaFlask.response, ninjaWeapon.response, poeCharacterInventory.response);
        console.log('The cost is: ', cost);
    }
    else {
        console.log('We are not ready!');
    }
}, 2000);


function calculateCharacterCost(accessoryPrice, armourPrice, flaskPrice, weaponPrice, characterItems){
    var totalChaos = 0;

    // First let's collect all of the character items that we can use to search through poe.ninja's item Prices

    // for each item in characterItems array
    // if name is '' then ignore because it is a rare item (stretch goal)
    // 
    var numOfInventoryItems = Object.keys(characterItems['items']).length;
    console.log('This character has', numOfInventoryItems, 'items.');
    
    for (var i = 0; i < numOfInventoryItems; i++) {
    	

		var item = Object.entries(characterItems['items'])[i];
        var itemName = characterItems['items'][i]['name'];
        var itemType = Object.keys(characterItems['items'][i]['category'])[0];

        // This condition will not be necessary once prices of rare items 
        // can be estimated. Until then, we shall skip them.
        if (itemName == ''){
            console.log('Rare Item', itemType)
        }
        else {
            //console.log(item, itemType, item[1]['name'])

            if (itemType == 'accessories'){
                totalChaos += findUniqueItemCost(accessoryPrice, item, itemType);
            }
            else if (itemType == 'armour'){
                totalChaos += findUniqueItemCost(armourPrice, item, itemType);
            }
            else if (itemType == 'flasks'){
                totalChaos += findUniqueItemCost(flaskPrice, item, itemType);
            }
            // else if (itemType == 'jewel'){
            //     totalChaos += findUniqueItemCost(jewelPrice, itemName);
            //}
            else if (itemType == 'weapons'){
                totalChaos += findUniqueItemCost(weaponPrice, item, itemType);
            }
            else {
                console.log('Unknown item type. FeelsBadMan');
            }

        }
    }
    return totalChaos;
}

/**
*   Finds the cost (in chaos orbs) of a given item and a price list JSON from poe.ninja
*
*   @param {The JSON storing prices} itemList
*   @param {The JSON of the item we're price-checking} item
*	@param {String representing the item type} itemType
*/

function findUniqueItemCost(itemList, item, itemType) {

	console.log('___________________________________');
	console.log(item[1]['name']);

	// For itemList
	var chaosValue = 1;
    var numOfItems = Object.keys(itemList['lines']).length;

    // For item
	var numOfSockets = 0;
	var numOfLinks = 0;
	var socketGroup = 0;
	var numOfAbyss = 0;

	try {
		numOfSockets = Object.keys(item[1]['sockets']).length;
		// console.log(item[1]);
		// console.log(item[1]['name']);
		// console.log('Num of sockets =', numOfSockets);
		
		// For checking a backwards 5 link
		// Contiguous links share the same group.
		// If the 2nd socket is of group 2, then it has the potential 
		// to be the start of a 5-link group
		if (numOfSockets >= 5 && item[1]['sockets'][1]['group'] == 1){
			socketGroup = 1;
		}

		for (var i = 0; i < numOfSockets; i++) {
			// console.log(item[1]['sockets'][i]['group']);

			if (item[1]['sockets'][i]['group'] == socketGroup) {
				numOfLinks += 1;
			}

			if (item[1]['sockets'][i]['attr'] == 'A') {
				numOfAbyss += 1;
			}
		}

		console.log('Number of links:', numOfLinks);
		console.log('Number of abyss sockets:', numOfAbyss);
	}
	catch {
		console.log('Item has no sockets.');
	}
	
    for (var i = 0; i < numOfItems; i++){
        if (itemList['lines'][i]['name'] == item[1]['name']) {

        	console.log('Index = ', i);

        	// Check if it has abyss sockets
        	var abyssSockets = parseInt(itemList['lines'][i]['variant'], 10);
        	console.log('Item we\'re searching against has ', abyssSockets, 'sockets.');

        	// Checking Abyssal sockets first. Gloves, boots, and helmets may have up to 2.
        	if (numOfAbyss == abyssSockets) {
        			chaosValue = itemList['lines'][i]['chaosValue'];
        			break;
            		console.log('Chaos value of', item[1]['name'], ' = ', chaosValue);
        		}

        	else if ((itemType == 'armour' || itemType == 'weapons') && numOfLinks >= 5) {

        		if (itemList['lines'][i]['links'] == numOfLinks) {
        			chaosValue = itemList['lines'][i]['chaosValue'];
        			break;
            		console.log('Chaos value of', item[1]['name'], ' = ', chaosValue);
        		}
        	}
        	else {
        		console.log(i, itemList['lines'][i]['id'], itemList['lines'][i]['chaosValue']);
            	chaosValue = itemList['lines'][i]['chaosValue'];
            	console.log('Chaos value of', item[1]['name'], ' = ', chaosValue);

        	}
        }
    }

    console.log('Chaos predicted: ', chaosValue);
    console.log('___________________________________');
    return chaosValue;
}



