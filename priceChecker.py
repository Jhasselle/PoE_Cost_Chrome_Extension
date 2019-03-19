
# To do:
#	maintain poe.ninja data in memory 
#	5-6 link weapons
#	helm enchants
#	rare items

import requests 
import json
 
keepGoing = True
#keepGoing = False
while(keepGoing):
	
	inputURL = input('Enter poe.ninja character url: ')
	#print('\nEnter poe.ninja character url: ', 'https://poe.ninja/challenge/builds/char/imarunk/IEET?i=30', '\n')
	#inputURL = "https://poe.ninja/challenge/builds/char/imarunk/IEET?i=30"

	accountName, characterName = inputURL.split("char/")
	accountName, characterName = characterName.split("/")
	characterName, _ = characterName.split("?")

	print('Account name: ', accountName)
	print('Character name: ', characterName, '\n')

	#requestURL = "https://www.pathofexile.com/character-window/get-items?accountName=xPazam&character=pazam_xxx"
	requestURL = "https://www.pathofexile.com/character-window/get-items?accountName=" + accountName + "&character=" + characterName
	r = requests.get(requestURL)

	#The JSON is automagically parsed and stored as a dictionary. Very cool Kanye.
	jsonReceived = r.json()

	# items is a List of Dictionaries
	items = jsonReceived['items']

	itemList = []

	# parsing through each dictionary in the item list
	for i in range(len(items)):

		itemName = items[i]['name']
		itemCategory = items[i]['category']
		numOfSockets = 0
		numOfLinkedSockets = 0
	
		# if we received no name, the item is rare
		if itemName == '':
			itemName = 'Rare Item'


		# get item type based on available key value
		categoryString = str(itemCategory.keys())
		trash, itemType = categoryString.split("[\'")
		itemType, trash = itemType.split("\']")


		# Attempt to get socket info
		try: 
			# socketList is a list of dictionaries 
			socketList = items[i]['sockets']
			numOfSockets = len(socketList)
			
			for j in range(numOfSockets):

				# group 0 means that sockets are connected to the top left socket
				if socketList[j]['group'] == 0:
					numOfLinkedSockets += 1
		except:
			pass

		itemDict = {
			"name": itemName,
			"type": itemType,
			"links": numOfLinkedSockets,
			"chaosValue": 0,
			"exaltedValue": 0
		}
		itemList.append(itemDict)

	no = True
	if no:
		urlList = ["https://poe.ninja/api/Data/GetUniqueWeaponOverview?league=Betrayal",
		"https://poe.ninja/api/Data/GetUniqueArmourOverview?league=Betrayal",
		"https://poe.ninja/api/Data/GetUniqueFlaskOverview?league=Betrayal",
		"https://poe.ninja/api/Data/GetUniqueAccessoryOverview?league=Betrayal",
		"https://poe.ninja/api/Data/GetUniqueJewelOverview?league=Betrayal"]

		# Obtain of specific item list
		for i in range(len(urlList)):
			requestURL = urlList[i]
			r2 = requests.get(requestURL)
			jsonReceived = r2.json()
			ninjaItemList = jsonReceived['lines']
			# items is a List of Dictionaries
			numOfNinjaItems = len(ninjaItemList)

			# Iterating through the specific item subset
			for j in range(numOfNinjaItems):

				# Compare each item to the items equiped to the character
				for k in range(len(itemList)):
					if itemList[k]['name'] == ninjaItemList[j]['name']:
						if ninjaItemList[j]['itemType'] == "Body Armour":
							if itemList[k]['links'] == ninjaItemList[j]['links']:
								itemList[k]['chaosValue'] = ninjaItemList[j]['chaosValue']
								itemList[k]['exaltedValue'] = ninjaItemList[j]['exaltedValue']
						else:
							itemList[k]['chaosValue'] = ninjaItemList[j]['chaosValue']
							itemList[k]['exaltedValue'] = ninjaItemList[j]['exaltedValue']

	totalBuildChaosPrice = 0
	totalBuildExaltedPrice = 0

	for k in range(len(itemList)):
		print(itemList[k]['name'])
		print("\tChaos: ", itemList[k]['chaosValue'])
		print("\tExalts: ", itemList[k]['exaltedValue'])
		totalBuildChaosPrice += itemList[k]['chaosValue']
		totalBuildExaltedPrice += itemList[k]['exaltedValue']

	print("Total build cost: ", totalBuildChaosPrice, " chaos")
	print("Total build cost: ", totalBuildExaltedPrice, " exalts")
	#end test
	keepGoing = False
