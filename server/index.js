//Collections
Messages = new Mongo.Collection("messages");

//Facebook SDK
ServiceConfiguration.configurations.upsert(
  { service: "facebook" },
  {
    $set:{
      // Development
      appId: "485852571574726",
      secret: "d52ce297e2f71b55b175d9471eb6e9d4"
      //Meteor Site
      // appId:"289256867900965",
      // secret:"813b5631116afc377fe572435f7776ad"
    }
  }
);

Meteor.publish('allUserMessages', function publishFunction() {
	return Messages.find({$or:[{"from":this.userId},{"to":this.userId}]},{sort:{"updatedAt":-1}});
});
Meteor.publish('singleUserMessage', function publishFunction(messageId) {
	return Messages.find(messageId);
});

Messages.before.insert(function (userId, doc) {
  doc.createdAt = Date.now();
  doc.updatedAt = Date.now();
});
Messages.before.update(function (userId, doc) {
  doc.updatedAt = Date.now();
});

Meteor.methods({
	//Header
	messagesChecked:function(userId){
		Meteor.users.update(userId, {
			$set:{"profile.newActivity.messsages":0}
		})
	},
	winksChecked:function(userId){
		Meteor.users.update(userId, {
			$set:{"profile.newActivity.winks":0}
		})
	},
	notificationSent:function(userId){
		Meteor.users.update(userId, {
			$set:{"profile.newActivity.newNotification":false}
		})
	},
	//Admin
	seedUsers:function(){
		function randomIntFromInterval(min,max){return Math.floor(Math.random()*(max-min+1)+min);}
		for (var i = 0; i < 50; i++) {
			var heightFeet   	 = randomIntFromInterval(3, 7),
				gender 		     = randomIntFromInterval(0, 1),
				heightInches 	 = randomIntFromInterval(0, 11),
				bodyType	 	 = randomIntFromInterval(0, 8),
				churchAttendance = randomIntFromInterval(0, 4),
				drinks 	 	     = randomIntFromInterval(0, 4),
				smokes 	 	     = randomIntFromInterval(0, 4),
				education 	 	 = randomIntFromInterval(0, 4),
				ethnicity 	 	 = randomIntFromInterval(0, 8),
				eyeColor 	 	 = randomIntFromInterval(0, 7),
				hairColor 	 	 = randomIntFromInterval(0, 9),
				hasKids 	 	 = randomIntFromInterval(0, 1),
				wantsKids 	 	 = randomIntFromInterval(0, 2),
				hasPets 	 	 = randomIntFromInterval(0, 1),
				wantsPets 	 	 = randomIntFromInterval(0, 2),
				petPreference 	 = randomIntFromInterval(0, 2),
				politicalParty 	 = randomIntFromInterval(0, 6),
				language 	     = randomIntFromInterval(0, 12),
				ageMin 	 		 = randomIntFromInterval(18,30),
				ageMax 	 		 = randomIntFromInterval(31,45),
				month 			 = randomIntFromInterval(0, 11),
				day 			 = randomIntFromInterval(1, 30),
				year 			 = randomIntFromInterval(1916, 1996),
				married 		 = randomIntFromInterval(0,1),
				pref_churchAttendance = randomIntFromInterval(0, 4),
				pref_denomination 	  = randomIntFromInterval(0, 10),
				pref_drinks 	 	  = randomIntFromInterval(0, 4),
				pref_smokes 	 	  = randomIntFromInterval(0, 4),
				pref_education 	 	  = randomIntFromInterval(0, 4),
				pref_ethnicity 	 	  = randomIntFromInterval(0, 8),
				pref_eyeColor 	 	  = randomIntFromInterval(0, 7),
				pref_hairColor 	 	  = randomIntFromInterval(0, 9),
				pref_hasKids 	 	  = randomIntFromInterval(0, 1),
				pref_wantsKids 	 	  = randomIntFromInterval(0, 1),
				pref_hasPets 	 	  = randomIntFromInterval(0, 1),
				pref_wantsPets 	 	  = randomIntFromInterval(0, 1),
				pref_petPreference 	  = randomIntFromInterval(0, 2),
				pref_politicalParty   = randomIntFromInterval(0, 6),
				pref_language   = randomIntFromInterval(0, 12);

			Meteor.users.insert({
				"profile": {
					"dateCreated":Date.now(),
					"lastOnline":Date.now(),
					"gender":gender,
					"bio":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
					"favoriteQuote":'"Here is a quote I like alot" - Some Person',
					"mateTraits":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
					"biblePassage":"If I speak with the tongues of men and of angels, but do not have love, I have become a ringing brass gong or a clashing cymbal. And if I have the gift of prophecy and I know all mysteries and all knowledge, and if I have all faith so that I can remove mountains, but do not have love, I am nothing. And if I parcel out all my possessions, and if I hand over my body in order that I will be burned, but do not have love, it benefits me nothing.",
					"city":"Orlando",
					"state":"Florida",
					"latitude":28.6013431,
					"longitude":-81.20092869999999,
					"newActivity":{
						"messages":0,
						"winks":0,
						"newNotification":false
					},
					"images": {
						"all":[],
						"default":null
					},
					"videos":[],
					"name":{
						"first":"First_" + i,
						"last":"Last_" + i
					},
					"height":{
						"feet":heightFeet,
						"inches":heightInches
					},
					"birthdate":{
						"month":month,
						"day":day,
						"year":year
					},
					"language":language,
					"bodyType":bodyType,
					"churchAttendance":churchAttendance,
					"denomination":0,
					"drinks":0,
					"smokes":0,
					"education":education,
					"ethnicity":ethnicity,
					"eyeColor":eyeColor,
					"hairColor":hairColor,
					"hasKids":hasKids,
					"hasPets":hasPets,
					"petPreference":petPreference,
					"politicalParty":politicalParty,
					"beenMarried":married,
					"searchable":true,
					"report":{
						"from":[],
						"to":[]
					},
					"preferences": {
						"gender":[0, 1],
						"searchDistance":100,
						"age": {
							"min":ageMin,
							"max":ageMax
						},
						"education":pref_education,
						"churchAttendance":pref_churchAttendance,
						"denomination":[0,1,2,3,4,5,6,7,8,9,10],
						"smokes":pref_smokes,
						"drinks":pref_drinks,
						"ethnicity":pref_ethnicity,
						"hasKids":pref_hasKids,
						"hasPets":pref_hasPets,
						"language":[0,1,2,3,4,5,6,7,8,9,10,11,12],
						"petPreference":pref_petPreference,
						"politicalParty":[0,1,2,3,4,5,6],
						"wantsKids":pref_wantsKids,
						"wantsPets":pref_wantsPets,
						"beenMarried":1
					}
				}
			})
		}
		return Meteor.users.find().fetch();
	},
	seedMessages:function(userId, userName){
		var users = Meteor.users.find().fetch();
		for (var i = 0; i < 10; i++){
			Messages.insert({
				"to": userId,
				"from":users[i]._id,
				"messages":[
				{
					"fromUserId":users[i]._id,
					"body":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
				},
				{
					"fromUserId":userId,
					"body":"Here's the first reply message."
				},
				{
					"fromUserId":users[i]._id,
					"body":"Here's the second reply message."
				},
				{
					"fromUserId":userId,
					"body":"Here's the third reply message."
				},
				{
					"fromUserId":userId,
					"body":"Here's the fourth reply message from same user."
				},
				{
					"fromUserId":users[i]._id,
					"body":"Here's the fifth reply message from other user."
				}]
			});
		}
	},

	//Login
	setLastOnline:function(userId){
		var user = Meteor.users.find(userId).fetch()[0];
			// age = Math.floor((Date.now() - Date.parse((user.profile.birthdate.month + 1) + " " + user.profile.birthdate.day + " " + user.profile.birthdate.year))/31557600000);
		
		Meteor.users.update(userId, {
			$set: {"profile.lastOnline":Date.now()}
		});
	},
	addUserFields:function(userId, fbData){
		var user = Meteor.users.find(userId).fetch()[0],
			gender = 0,
			prefGender = 1;

		//set preference gender
		if (user.profile.gender === 1)
			prefGender = 0;

		//set user gender
		if (fbData.gender === "female")
			gender = 1;

		Meteor.users.update(userId, {
			$set: { 
				"profile": {
					"bio":"",
					"favoriteQuote":"",
					"biblePassage":"",
					"mateTraits":"",
					"dateCreated":Date.now(),
					"lastOnline":Date.now(),
					"email":fbData.email,
					"gender":gender,
					"fbId":fbData.id,
					"newActivity":{
						"messages":0,
						"winks":0,
						"newNotification":false
					},
					"images": {
						"all":[],
						"default":null
					},
					"videos":[],
					"name":{
						"first":fbData.first_name,
						"last":fbData.last_name
					},
					"height":{
						"feet":5,
						"inches":0
					},
					"birthdate":{
						"month":0,
						"day":1,
						"year":1915
					},
					"language":0,
					"bodyType":0,
					"churchAttendance":0,
					"denomination":0,
					"drinks":0,
					"smokes":0,
					"education":0,
					"ethnicity":0,
					"eyeColor":0,
					"hairColor":0,
					"hasKids":0,
					"hasPets":0,
					"petPreference":0,
					"politicalParty":0,
					"beenMarried":0,
					"searchable":false,
					"report":{
						"from":[],
						"to":[]
					},
					"preferences": {
						"gender":[prefGender],
						"searchDistance":100,
						"age": {
							"min":18,
							"max":99
						},
						"education":0,
						"churchAttendance":0,
						"denomination":[0,1,2,3,4,5,6,7,8,9,10],
						"smokes":2,
						"drinks":2,
						"ethnicity":[0,1,2,3,4,5,6,7,8],
						"hasKids":1,
						"language":[0,1,2,3,4,5,6,7,8,9,10,11,12],
						"petPreference":0,
						"hasPets":1,
						"politicalParty":[0,1,2,3,4,5,6],
						"wantsKids":1,
						"wantsPets":1,
						"beenMarried":1
					}
				}
			}
		})
	},

	//Account Page
	setZipcode:function(userId, zipcode){
		var geo = new GeoCoder();
		var result = geo.geocode(zipcode);
		Meteor.users.update(userId, {
			$set:{
				'profile.zipcode':zipcode,
				'profile.city':result[0].city,
				'profile.state':result[0].state,
				'profile.latitude':result[0].latitude,
				'profile.longitude':result[0].longitude
			}
		});
	},
	setInfoTextField:function(userId, fieldValue, fieldName){
		var user = Meteor.users.find(userId).fetch()[0].profile;
		profile[fieldName] = fieldValue;
		Meteor.users.update(userId, {
			$set:{"profile":profile}
		});
	},
	setAgeMinMax:function(userId, fieldValue, fieldName){
		var profile = Meteor.users.find(userId).fetch()[0].profile;
		profile.preferences.age[fieldName] = parseInt(fieldValue);
		if (fieldName === "min") {
			if (profile.preferences.age.max <= profile.preferences.age.min){
				if (profile.preferences.age.max < 99)
					profile.preferences.age.max = profile.preferences.age.min + 1;
			}

		} else if (fieldName === "max") {
			if (profile.preferences.age.min >= profile.preferences.age.max) {
				if (profile.preferences.age.min > 18)
					profile.preferences.age.min = profile.preferences.age.max - 1;
			}
		}

		Meteor.users.update(userId, {
			$set:{"profile":profile}
		});
	},
	accountInfoChange:function(userId, fieldname, option){
		var user = Meteor.users.find(userId).fetch()[0];
		switch(fieldname){
			case "gender":
				Meteor.users.update(userId, {$set:{"profile.gender":parseInt(option)}})
				break;
			default:
				var profile = user.profile;
				profile[fieldname] = parseInt(option);
				Meteor.users.update(userId, {$set:{"profile":profile}});
				break;
		}
	},
	accountPrefChange:function(userId, fieldname, option){
		switch(fieldname){
			case "gender":
				Meteor.users.update(userId, {$set:{"profile.preferences.gender":option}})
				break;
			default:
				var profile = Meteor.users.find(userId).fetch()[0].profile;
				if (option === "default") {
					delete profile.preferences[fieldname];
					Meteor.users.update(userId, {$set:{"profile":profile}});
				} else {
					profile.preferences[fieldname] = parseInt(option);
					Meteor.users.update(userId, {$set:{"profile":profile}});
				}
				break;
		}
	},
	heightDropdownChange:function(userId, fieldname, option){
		var user = Meteor.users.find(userId).fetch()[0];
		switch(fieldname){
			case "inches":
				Meteor.users.update(userId, {$set:{"profile.height.inches":parseInt(option)}})
				break;
			case "feet":
				Meteor.users.update(userId, {$set:{"profile.height.feet":parseInt(option)}})
				break;
		}
	},
	birthdateDropdownChange:function(userId, fieldname, option){
		var user = Meteor.users.find(userId).fetch()[0];
		switch(fieldname){
			case "year":
				Meteor.users.update(userId, {$set:{"profile.birthdate.year":parseInt(option)}})
				break;
			case "month":
				Meteor.users.update(userId, {$set:{"profile.birthdate.month":parseInt(option)}})
				break;
			case "day":
				Meteor.users.update(userId, {$set:{"profile.birthdate.day":parseInt(option)}})
				break;
		}
	},
	searchableSwitch:function(userId){
		var user = Meteor.users.find(userId).fetch()[0],
			searchable = !user.profile.searchable;

		Meteor.users.update(userId,{
			$set:{"profile.searchable":searchable}
		});
	}, 
	infoTextAreaSave:function(userId, fieldName, fieldValue){
		// console.log(userId, fieldName, fieldValue);
		var profile = Meteor.users.find(userId).fetch()[0].profile;
		profile[fieldName] = fieldValue;
		Meteor.users.update(userId, {
			$set: {"profile":profile}
		});
	},
	addProfileImage:function(userId, imageUrl){
		Meteor.users.update(userId,{
			$addToSet:{ "profile.images.all":imageUrl}
		})
	},
	addVideo:function(userId, videoUrl){
		Meteor.users.update(userId, {
			$addToSet:{"profile.videos":videoUrl}
		})
	},
	removeProfileImage:function(userId, imageUrl){
		Meteor.users.update(userId,{
			$pull:{ "profile.images.all":imageUrl, "profile.images.default":imageUrl}
		})
	},
	removeProfileVideo:function(userId, videoUrl){
		Meteor.users.update(userId,{
			$pull:{ "profile.videos":videoUrl}
		})
	},
	makeDefaultImage:function(userId, imageUrl){
		Meteor.users.update(userId,{
			$set:{ "profile.images.default":imageUrl}
		})
	},

	//Preference Search Page
	prefGenderCheckbox:function(userId, optionindex, isChecked){
		if (isChecked)
			Meteor.users.update(userId, {$addToSet: {"profile.preferences.gender":parseInt(optionindex)}});
		else
			Meteor.users.update(userId, {$pull: {"profile.preferences.gender":parseInt(optionindex)}});
	},
	prefEthnicityCheckbox:function(userId, optionindex, isChecked){
		if (isChecked)
			Meteor.users.update(userId, {$addToSet: {"profile.preferences.ethnicity":parseInt(optionindex)}});
		else
			Meteor.users.update(userId, {$pull: {"profile.preferences.ethnicity":parseInt(optionindex)}});
	},
	prefDenominationCheckbox:function(userId, optionindex, isChecked){
		if (isChecked)
			Meteor.users.update(userId, {$addToSet: {"profile.preferences.denomination":parseInt(optionindex)}});
		else
			Meteor.users.update(userId, {$pull: {"profile.preferences.denomination":parseInt(optionindex)}});
	},
	prefPoliticalPartyCheckbox:function(userId, optionindex, isChecked){
		if (isChecked)
			Meteor.users.update(userId, {$addToSet: {"profile.preferences.politicalParty":parseInt(optionindex)}});
		else
			Meteor.users.update(userId, {$pull: {"profile.preferences.politicalParty":parseInt(optionindex)}});
	},
	prefLanguageCheckbox:function(userId, optionindex, isChecked){
		if (isChecked)
			Meteor.users.update(userId, {$addToSet: {"profile.preferences.language":parseInt(optionindex)}});
		else
			Meteor.users.update(userId, {$pull: {"profile.preferences.language":parseInt(optionindex)}});
	},
	searchInit:function(userId, skip){
		var user = Meteor.users.find(userId).fetch()[0];
			prefObj = {},
			users   = [],
			today   = new Date(),
			year    = today.getFullYear();

		prefObj.ageMin  		 = year - user.profile.preferences.age.min;
		prefObj.ageMax  		 = year - user.profile.preferences.age.max;
		prefObj.gender 		     = user.profile.preferences.gender;
		prefObj.searchDistance   = user.profile.preferences.searchDistance;
		prefObj.education 	     = user.profile.preferences.education;
		prefObj.churchAttendance = user.profile.preferences.churchAttendance;
		prefObj.denomination  	 = user.profile.preferences.denomination;
		prefObj.smokes 			 = user.profile.preferences.smokes;
		prefObj.drinks 			 = user.profile.preferences.drinks;
		prefObj.hasKids 		 = user.profile.preferences.hasKids;
		prefObj.wantsKids 		 = user.profile.preferences.wantsKids;
		prefObj.language 		 = user.profile.preferences.language;
		prefObj.ethnicity 		 = user.profile.preferences.ethnicity;
		prefObj.hasPets 		 = user.profile.preferences.hasPets;
		prefObj.wantsPets 		 = user.profile.preferences.wantsPets;
		prefObj.politicalParty 	 = user.profile.preferences.politicalParty;
		prefObj.beenMarried      = user.profile.preferences.beenMarried;

		//get my latitude and longitude
		if (user.profile.latitude){
			var myLat  = user.profile.latitude,
				myLong = user.profile.longitude,
				foundUsers = Meteor.users.find({
				"_id":{$ne:userId},
				"profile.gender":{$in:prefObj.gender},
				"profile.denomination":{$in:prefObj.denomination},
				"profile.politicalParty":{$in:prefObj.politicalParty},
				"profile.ethnicity":{$in:prefObj.ethnicity},
				"profile.language":{$in:prefObj.language},
				"profile.education":{$gte:prefObj.education},
				"profile.birthdate.year":{$gte:prefObj.ageMax, $lte:prefObj.ageMin},
				"profile.smokes":{$lte:prefObj.smokes},
				"profile.drinks":{$lte:prefObj.drinks},
				"profile.beenMarried":{$lte:prefObj.beenMarried},
				"profile.hasKids":{$lte:prefObj.hasKids},
				"profile.hasPets":{$lte:prefObj.hasPets},
				"profile.preferences.wantsPets":{$lte:prefObj.wantsPets},
				"profile.preferences.wantsKids":{$lte:prefObj.wantsKids},
				"profile.report.from":{$nin:[user._id]}
			},{sort:{"profile.lastOnline":-1}, skip:skip, limit:20}).fetch();

			//loop through found users and return those within specific distance
			for (var i = 0, len = foundUsers.length; i < len; i++) {
				if (foundUsers[i].profile.latitude){
					if (user.profile.preferences.searchDistance >= distance(myLat, myLong, foundUsers[i].profile.latitude, foundUsers[i].profile.longitude))
						users.push(foundUsers[i]);
				}
			}

			return users;
		}

		function distance(lat1, lon1, lat2, lon2) {
		  var p = 0.017453292519943295;    // Math.PI / 180
		  var c = Math.cos;
		  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
		          c(lat1 * p) * c(lat2 * p) * 
		          (1 - c((lon2 - lon1) * p))/2;

		  return (12742 * Math.asin(Math.sqrt(a))) * 0.621371; // 2 * R; R = 6371 km
		}
	},
	getSearchUser:function(userId){
		return Meteor.users.find(userId).fetch()[0];
	},

	//Profile
	newMessage:function(fromUserId, toUserId, message){
		Messages.insert({
			"to":toUserId,
			"from":fromUserId,
			"messages":[{
				"fromUserId":fromUserId,
				"body":message
			}]
		})
		//alert user of new message
		Meteor.users.update(toUserId, {
			$inc:{'profile.newActivity.messages':1}
		});
	},
	sendWink:function(fromUserId, toUserId){
		Meteor.users.update(fromUserId, {
			$addToSet:{"profile.winks.to":toUserId}
		});
		Meteor.users.update(toUserId, {
			$addToSet:{"profile.winks.from":fromUserId}
		});
		//alert user of new wink
		Meteor.users.update(toUserId, {
			$inc:{'profile.newActivity.winks':1}
		});
	},
	reportUser:function(fromUserId, toUserId){
		Meteor.users.update(toUserId, {
			$addToSet:{'profile.report.from':fromUserId}
		})
		Meteor.users.update(fromUserId, {
			$addToSet:{'profile.report.to':toUserId}
		})
	},
	favoriteUser:function(userId, favoriteId){
		Meteor.users.update(userId, {
			$addToSet:{"profile.favorites":favoriteId}
		})
	},

	//Messages
	getNameAndImage:function(idArr){
		var userData = [];
		for (var i = 0; i < idArr.length; i++){
			userImage = null;
			var user = Meteor.users.find(idArr[i]).fetch()[0];
			if (!user.profile.images.default){
				if (user.profile.images.all.length)
					userImage = user.profile.images.all[0];
			} else {
				if (user.profile.images.all.length)
					userImage = user.profile.images.all[0];
			}
			userData.push({
				"_id":user._id,
				"first":user.profile.name.first,
				"last":user.profile.name.last,
				"image":userImage
			});
		}
		return userData;
	},
	getSingleMessage:function(id){
		return Messages.find(id).fetch()[0];
	},
	singleMessageReply:function(messageId, fromUser, messageBody, toUserId){
		Messages.update(messageId, {
			$push: {"messages":{"fromUserId":fromUser, "body":messageBody}}
		})
		Meteor.users.update(toUserId, {
			$inc:{"profile.newActivity.messages":1}
		})
	}
	// getAllMessages:function(userId){
	// 	var messages = Messages.find({$or:[{"from":{$eq: userId }},{"to":{ $eq: userId}}]},{sort:{"updatedAt":-1}}).fetch();
	// 	for (var i = 0; i < messages.length; i++){
	// 		if (messages[i].to !== userId){
	// 			messages[i].toName = Meteor.users.find(messages[i].to).fetch()[0].profile.name.first;
	// 		} else if (messages[i].from !== userId) {
	// 			messages[i].fromName = Meteor.users.find(messages[i].from).fetch()[0].profile.name.first;
	// 		}
	// 	}
	// 	return messages;
	// },
	// getSentMessages:function(userId){
	// 	// return Messages.find({"to":userId, "from":userId}).fetch();
	// 	return Messages.find({"from":userId}, {sort:{"createdAt":-1}}).fetch();
	// }
})