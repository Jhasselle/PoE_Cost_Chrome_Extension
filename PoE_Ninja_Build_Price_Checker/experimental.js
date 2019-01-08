// https://poe.ninja/api/data/458db603f91b064de6bc85dc381caa2d/getcharacter?overview=betrayal&account=xPazam&name=PaZam_xxx
// 458db603f91b064de6bc85dc381caa2d
// If this number doesn't change, then we're in the money.

var experimental = new XMLHttpRequest();
experimental.open('GET', 'https://poe.ninja/api/data/458db603f91b064de6bc85dc381caa2d/getcharacter?overview=betrayal&account=xPazam&name=PaZam_xxx');
experimental.responseType = 'json';
experimental.send();

experimental.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        console.log(this.response);
    }
}

// var ninjaAccessory = new XMLHttpRequest();
// var ninjaArmour = new XMLHttpRequest();
// var ninjaFlask = new XMLHttpRequest();
// var ninjaJewel = new XMLHttpRequest();
// var ninjaWeapon = new XMLHttpRequest();

// var poeCharacterInventory= new XMLHttpRequest();
// var poeCharacterJewels = new XMLHttpRequest();

// var currentURL = window.location.href;

// console.log(currentURL);
// var names = getNames(currentURL);
// var accountName = names[0];
// console.log('Account name:', accountName);
// var characterName = names[1];
// console.log('Character name:', characterName);

// // poe.ninja Prices JSON
// ninjaAccessory.open('GET', 'https://poe.ninja/api/Data/GetUniqueAccessoryOverview?league=Betrayal');
// ninjaAccessory.responseType = 'json';
// ninjaAccessory.send();

// ninjaArmour.open('GET', 'https://poe.ninja/api/Data/GetUniqueArmourOverview?league=Betrayal');
// ninjaArmour.responseType = 'json';
// ninjaArmour.send();

// ninjaFlask.open('GET', 'https://poe.ninja/api/Data/GetUniqueFlaskOverview?league=Betrayal');
// ninjaFlask.responseType = 'json';
// ninjaFlask.send();

// ninjaJewel.open('GET', 'https://poe.ninja/api/Data/GetUniqueJewelOverview?league=Betrayal');
// ninjaJewel.responseType = 'json';
// ninjaJewel.send();

// ninjaWeapon.open('GET', 'https://poe.ninja/api/Data/GetUniqueWeaponOverview?league=Betrayal');
// ninjaWeapon.responseType = 'json';
// ninjaWeapon.send();

// // Character Items JSON

// var inventorySearchString = 'https://www.pathofexile.com/character-window/get-items?accountName=' + accountName + '&character=' + characterName;
// poeCharacterInventory.open('GET', inventorySearchString);
// poeCharacterInventory.responseType = 'json';
// poeCharacterInventory.send();

// var jewelSearchString = 'https://www.pathofexile.com/character-window/get-passive-skills?accountName=' + accountName + '&character=' + characterName + '&reqData=0';
// poeCharacterJewels.open('GET', jewelSearchString);
// poeCharacterJewels.responseType = 'json';
// poeCharacterJewels.send();



// ninjaArmour.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         console.log('poe.ninja armour: ', this.response);
//     }
// }

// poeCharacterInventory.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         console.log('Character inventory items: ', this.response);
//     }
// }

// poeCharacterJewels.onreadystatechange = function() {
//     if (this.readyState == 4 && this.status == 200) {
//         console.log('Character tree jewels: ', this.response);
//     }
// }

// setTimeout(function() {
//     if ((ninjaWeapon.readyState == 4 && ninjaWeapon.status == 200) 
//         && (poeCharacterInventory.readyState == 4 && poeCharacterInventory.status == 200)) {
//         console.log('We are ready!');

//      	// ...Totally not a terrible length...
//         var cost = calculateCharacterCost(ninjaAccessory.response, ninjaArmour.response, ninjaFlask.response, ninjaWeapon.response, poeCharacterInventory.response);
//         cost += calculateJewelCost(ninjaJewel.response, poeCharacterJewels.response);
//         console.log('Estimated cost: ', cost, 'chaos');
//     }
//     else {
//         console.log('We are not ready!');
//     }
// }, 2000);


// function getNames(url) {


// 	var accountName = 'Billy'; 
// 	var characterName = 'Bob';

// 	//example:
// 	//https://poe.ninja/challenge/builds/char/xPazam/PaZam_xxx?i=0
// 	var startIndex = url.indexOf('char');
// 	startIndex = url.indexOf('/', startIndex) + 1;
// 	endIndex = url.indexOf('/', startIndex);

// 	console.log(url.substring(startIndex, endIndex));
// 	console.log(startIndex);

// 	accountName = url.substring(startIndex, endIndex);

// 	startIndex = endIndex + 1;

// 	endIndex = url.indexOf('?', startIndex);

// 	if (endIndex == -1) {
// 		characterName = url.substring(startIndex);
// 	}
// 	else {
// 		characterName = url.substring(startIndex, endIndex);
// 	}

	
// 	return [accountName, characterName];
// }

// function calculateJewelCost(jewelPrices, jewels) {

// 	var totalChaos = 0;
// 	var numOfJewels = Object.keys(jewels['items']).length;
// 	var jewelPricesLength = Object.keys(jewelPrices['lines']).length;
// 	// console.log('JEWELS!!!!!');
// 	// console.log(jewels);
// 	// console.log(jewelPrices);
// 	// console.log(jewelPricesLength);

// 	for (var i = 0; i < numOfJewels; i++){
// 		console.log('___________________________________');
// 		var itemName = jewels['items'][i]['name'];

// 		if (jewels['items'][i]['frameType'] == 3) {
// 			for (var j = 0; j < jewelPricesLength; j++) {
// 				if (itemName == jewelPrices['lines'][j]['name']){
// 					console.log(itemName, 'found.');
// 					console.log('poe.ninja prices: ', jewelPrices['lines'][j]['chaosValue']);
// 					totalChaos += jewelPrices['lines'][j]['chaosValue'];
// 				}
// 			}
// 		}
// 		else {
// 			console.log(itemName, 'is a rare jewel.');
// 			console.log('A later version will support price estimation for rare jewels.');
// 		}
// 	}

// 	return totalChaos;
// }

// function calculateCharacterCost(accessoryPrice, armourPrice, flaskPrice, weaponPrice, inventory) {
    
//     var totalChaos = 0;
//     var numOfInventoryItems = Object.keys(inventory['items']).length;
//     console.log('This character has', numOfInventoryItems, 'inventory items.');

//     for (var i = 0; i < numOfInventoryItems; i++) {
// 		var item = Object.entries(inventory['items'])[i];
//         var itemName = inventory['items'][i]['name'];
//         var itemType = Object.keys(inventory['items'][i]['category'])[0];

//         // This condition will not be necessary once prices of rare items 
//         // can be estimated. Until then, we shall skip them.
//         if (itemName == ''){
//             console.log('Rare Item', itemType)
//         }
//         else {
//             //console.log(item, itemType, item[1]['name'])

//             if (itemType == 'accessories'){
//                 totalChaos += findInventoryItemCost(accessoryPrice, item, itemType);
//             }
//             else if (itemType == 'armour'){
//                 totalChaos += findInventoryItemCost(armourPrice, item, itemType);
//             }
//             else if (itemType == 'flasks'){
//                 totalChaos += findInventoryItemCost(flaskPrice, item, itemType);
//             }
//             else if (itemType == 'weapons'){
//                 totalChaos += findInventoryItemCost(weaponPrice, item, itemType);
//             }
//             else {
//                 console.log('Unknown item type. FeelsBadMan');
//             }

//         }
//     }
//     return totalChaos;
// }

// /**
// *   Finds the cost (in chaos orbs) of a given item and a price list JSON from poe.ninja
// *
// *   @param {The JSON storing prices} itemList
// *   @param {The JSON of the item we're price-checking} item
// *	@param {String representing the item type} itemType
// */

// function findInventoryItemCost(itemList, item, itemType) {

// 	console.log('___________________________________');
// 	console.log(item[1]['name']);

// 	// For itemList
// 	var chaosValue = 1;
//     var numOfItems = Object.keys(itemList['lines']).length;

//     // For item
// 	var numOfSockets = 0;
// 	var numOfLinks = 0;
// 	var socketGroup = 0;
// 	var numOfAbyss = 0;

// 	try {
// 		numOfSockets = Object.keys(item[1]['sockets']).length;
// 		// console.log(item[1]);
// 		// console.log(item[1]['name']);
// 		// console.log('Num of sockets =', numOfSockets);
		
// 		// For checking a backwards 5 link
// 		// Contiguous links share the same group.
// 		// If the 2nd socket is of group 2, then it has the potential 
// 		// to be the start of a 5-link group
// 		if (numOfSockets >= 5 && item[1]['sockets'][1]['group'] == 1){
// 			socketGroup = 1;
// 		}

// 		for (var i = 0; i < numOfSockets; i++) {
// 			// console.log(item[1]['sockets'][i]['group']);

// 			if (item[1]['sockets'][i]['group'] == socketGroup) {
// 				numOfLinks += 1;
// 			}

// 			if (item[1]['sockets'][i]['attr'] == 'A') {
// 				numOfAbyss += 1;
// 			}
// 		}

// 		console.log('Number of links:', numOfLinks);
// 		console.log('Number of abyss sockets:', numOfAbyss);
// 	}
// 	catch {
// 		console.log('Item has no sockets.');
// 	}
	
//     for (var i = 0; i < numOfItems; i++){
//         if (itemList['lines'][i]['name'] == item[1]['name']) {

//         	console.log('Index = ', i);

//         	// Check if it has abyss sockets
//         	var abyssSockets = parseInt(itemList['lines'][i]['variant'], 10);
//         	console.log('Item we\'re searching against has ', abyssSockets, 'sockets.');

//         	// Checking Abyssal sockets first. Gloves, boots, and helmets may have up to 2.
//         	if (numOfAbyss == abyssSockets) {
//         			chaosValue = itemList['lines'][i]['chaosValue'];
//         			break;
//             		console.log('Chaos value of', item[1]['name'], ' = ', chaosValue);
//         		}

//         	else if ((itemType == 'armour' || itemType == 'weapons') && numOfLinks >= 5) {

//         		if (itemList['lines'][i]['links'] == numOfLinks) {
//         			chaosValue = itemList['lines'][i]['chaosValue'];
//         			break;
//             		console.log('Chaos value of', item[1]['name'], ' = ', chaosValue);
//         		}
//         	}
//         	else {
//         		console.log(i, itemList['lines'][i]['id'], itemList['lines'][i]['chaosValue']);
//             	chaosValue = itemList['lines'][i]['chaosValue'];
//             	console.log('Chaos value of', item[1]['name'], ' = ', chaosValue);

//         	}
//         }
//     }

//     console.log('Chaos predicted: ', chaosValue);
//     console.log('___________________________________');
//     return chaosValue;
// }



