//Facebook SDK
ServiceConfiguration.configurations.upsert(
  { service: "facebook" },
  {
    $set:{
      appId: "485852571574726",
      secret: "d52ce297e2f71b55b175d9471eb6e9d4"
    }
  }
);

//Collections
Messages = new Mongo.Collection("messages");

Messages.before.insert(function (userId, doc) {
  doc.createdAt = Date.now();
  doc.updatedAt = Date.now();
});
Messages.before.update(function (userId, doc) {
  doc.updatedAt = Date.now();
});

Meteor.methods({
	//Admin
	seedUsers:function(){
		function randomIntFromInterval(min,max){return Math.floor(Math.random()*(max-min+1)+min);}
		for (var i = 0; i < 50; i++) {
			var heightFeet   	 = randomIntFromInterval(3, 7),
				heightInches 	 = randomIntFromInterval(0, 11),
				bodyType	 	 = randomIntFromInterval(0, 8),
				churchAttendance = randomIntFromInterval(0, 4),
				denomination 	 = randomIntFromInterval(0, 10),
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
				pref_churchAttendance = randomIntFromInterval(0, 4),
				pref_denomination 	  = randomIntFromInterval(0, 10),
				pref_drinks 	 	  = randomIntFromInterval(0, 4),
				pref_smokes 	 	  = randomIntFromInterval(0, 4),
				pref_education 	 	  = randomIntFromInterval(0, 4),
				pref_ethnicity 	 	  = randomIntFromInterval(0, 8),
				pref_eyeColor 	 	  = randomIntFromInterval(0, 7),
				pref_hairColor 	 	  = randomIntFromInterval(0, 9),
				pref_hasKids 	 	  = randomIntFromInterval(0, 1),
				pref_wantsKids 	 	  = randomIntFromInterval(0, 2),
				pref_hasPets 	 	  = randomIntFromInterval(0, 1),
				pref_wantsPets 	 	  = randomIntFromInterval(0, 2),
				pref_petPreference 	  = randomIntFromInterval(0, 2),
				pref_politicalParty   = randomIntFromInterval(0, 6),
				pref_language   = randomIntFromInterval(0, 12);

			Meteor.users.insert({
				"profile": {
					"userFieldsSet":true,
					"dateCreated":Date.now(),
					"lastOnline":Date.now(),
					"gender":1,
					"bio":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
					"favoriteQuote":'"Here is a quote I like alot" - Some Person',
					"mateTraits":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
					"biblePassage":"If I speak with the tongues of men and of angels, but do not have love, I have become a ringing brass gong or a clashing cymbal. And if I have the gift of prophecy and I know all mysteries and all knowledge, and if I have all faith so that I can remove mountains, but do not have love, I am nothing. And if I parcel out all my possessions, and if I hand over my body in order that I will be burned, but do not have love, it benefits me nothing.",
					"city":"Orlando",
					"state":"Florida",
					"latitude":28.5747416,
					"longitude":-81.3949264,
					"name":{
						"first":"First_" + i,
						"last":"Last_" + i
					},
					"height":{
						"feet":heightFeet,
						"inches":heightInches
					},
					"birthdate":{
						"month":0,
						"day":1,
						"year":1915
					},
					"language":language,
					"bodyType":bodyType,
					"churchAttendance":churchAttendance,
					"denomination":denomination,
					"drinks":drinks,
					"smokes":smokes,
					"education":education,
					"ethnicity":ethnicity,
					"eyeColor":eyeColor,
					"hairColor":hairColor,
					"hasKids":hasKids,
					"wantsKids":wantsKids,
					"hasPets":hasPets,
					"petPreference":petPreference,
					"wantsPets":wantsPets,
					"politicalParty":politicalParty,
					"searchable":true,
					"preferences": {
						"gender":[0],
						"searchDistance":100,
						"age": {
							"min":ageMin,
							"max":ageMax
						},
						"education":pref_education,
						"churchAttendance":pref_churchAttendance,
						"denomination":pref_denomination,
						"smokes":pref_smokes,
						"drinks":pref_drinks,
						"ethnicity":pref_ethnicity,
						"hasKids":pref_hasKids,
						"hasPets":pref_hasPets,
						"language":pref_language,
						"petPreference":pref_petPreference,
						"politicalParty":pref_politicalParty,
						"wantsKids":pref_wantsKids,
						"wantsPets":pref_wantsPets
					}
				}
			})
		}
		return Meteor.users.find().fetch();
	},
	seedMessages:function(userId){
		var users = Meteor.users.find().fetch();

		for (var i = 0; i < 10; i++){
			Messages.insert({
				"to":userId,
				"from":users[i]._id,
				"messages":[
				{
					"from":userId,
					"body":"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."
				},
				{
					"from":userId,
					"body":"Here's the first reply message."
				},
				{
					"from":users[i]._id,
					"body":"Here's the second reply message."
				},
				{
					"from":userId,
					"body":"Here's the third reply message."
				},
				{
					"from":userId,
					"body":"Here's the fourth reply message from same user."
				},
				{
					"from":users[i]._id,
					"body":"Here's the fifth reply message from other user."
				}]
			});
		}
	},

	//Login
	setLastOnlineAndAge:function(userId){
		var user = Meteor.users.find(userId).fetch()[0],
			age = Math.floor((Date.now() - Date.parse((user.profile.birthdate.month + 1) + " " + user.profile.birthdate.day + " " + user.profile.birthdate.year))/31557600000);
		
		Meteor.users.update(userId, {
			$set: {
				"profile.lastOnline":Date.now(),
				"profile.age":age
			}
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
					"dateCreated":Date.now(),
					"lastOnline":Date.now(),
					"email":fbData.email,
					"gender":gender,
					"fbId":fbData.id,
					"name":{
						"first":fbData.first_name,
						"last":fbData.last_name
					},
					"userFieldsSet":true,
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
					"wantsKids":0,
					"hasPets":0,
					"petPreference":0,
					"wantsPets":0,
					"politicalParty":0,
					"searchable":false,
					"preferences": {
						"gender":[prefGender],
						"searchDistance":100,
						"age": {
							"min":18,
							"max":99
						},
						"education":0,
						"churchAttendance":0,
						"denomination":0,
						"smokes":2,
						"drinks":2,
						"ethnicity":[0,1,2,3,4,5,6,7,8],
						"hasKids":0,
						"language":0,
						"petPreference":0,
						"hasPets":0,
						"politicalParty":0,
						"wantsKids":0,
						"wantsPets":0
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
		var user = Meteor.users.find(userId).fetch()[0];
		user.profile[fieldName] = fieldValue;
		Meteor.users.update(userId, {
			$set:user
		});
	},
	setAgeMinMax:function(userId, fieldValue, fieldName){
		var user = Meteor.users.find(userId).fetch()[0];
		user.profile.preferences.age[fieldName] = parseInt(fieldValue);
		if (fieldName === "min") {
			if (user.profile.preferences.age.max <= user.profile.preferences.age.min){
				if (user.profile.preferences.age.max < 99)
					user.profile.preferences.age.max = user.profile.preferences.age.min + 1;
			}

		} else if (fieldName === "max") {
			if (user.profile.preferences.age.min >= user.profile.preferences.age.max) {
				if (user.profile.preferences.age.min > 18)
					user.profile.preferences.age.min = user.profile.preferences.age.max - 1;
			}
		}

		Meteor.users.update(userId, {
			$set:user
		});
	},
	accountInfoChange:function(userId, fieldname, option){
		var user = Meteor.users.find(userId).fetch()[0];
		switch(fieldname){
			case "gender":
				Meteor.users.update(userId, {$set:{"profile.gender":parseInt(option)}})
				break;
			default:
				user.profile[fieldname] = parseInt(option);
				Meteor.users.update(userId, {$set:user});
				break;
		}
	},
	accountPrefChange:function(userId, fieldname, option){
		switch(fieldname){
			case "gender":
				Meteor.users.update(userId, {$set:{"profile.preferences.gender":option}})
				break;
			default:
				var user = Meteor.users.find(userId).fetch()[0];
				user.profile.preferences[fieldname] = parseInt(option);
				Meteor.users.update(userId, {$set:user});
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
		var user = Meteor.users.find(userId).fetch()[0];
		user.profile.searchable = !user.profile.searchable;
		Meteor.users.update(userId,{
			$set:user
		});
	}, 
	infoTextAreaSave:function(userId, fieldName, fieldValue){
		var user = Meteor.users.find(userId).fetch()[0];
		user.profile[fieldName] = fieldValue;
		Meteor.users.update(userId, {
			$set: user
		});
	},

	//Preference Search Page
	prefGenderCheckbox:function(userId, optionindex, isChecked){
		if (isChecked) {
			Meteor.users.update(userId, {
				$addToSet: {
					"profile.preferences.gender":parseInt(optionindex)
				}
			});
		} else {
			Meteor.users.update(userId, {
				$pull: {
					"profile.preferences.gender":parseInt(optionindex)
				}
			});
		}
		return Meteor.users.find(userId).fetch()[0];
	},
	prefEthnicityCheckbox:function(userId, optionindex, isChecked){
		if (isChecked) {
			Meteor.users.update(userId, {
				$addToSet: {
					"profile.preferences.ethnicity":parseInt(optionindex)
				}
			});
		} else {
			Meteor.users.update(userId, {
				$pull: {
					"profile.preferences.ethnicity":parseInt(optionindex)
				}
			});
		}
	},
	searchInit:function(userId){
		var user = Meteor.users.find(userId).fetch()[0];
			prefObj = {};

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
		prefObj.petPreference 	 = user.profile.preferences.petPreference;
		prefObj.politicalParty 	 = user.profile.preferences.politicalParty;



		return Meteor.users.find().fetch({
			"profile":{
				"gender":prefObj.gender,
				"searchDistance":{$lt:prefObj.searchDistance},
				"hasKids":prefObj.hasKids
			}
		},{sort:{"last_login":1}});
	},
	getSearchUser:function(userId){
		return Meteor.users.find(userId).fetch()[0];
	},

	//Profile
	newMessage:function(fromUserId, toUserId, message){
		Messages.insert({
			"to":toUserId,
			"from":fromUserId,
			"firstMessage":message,
			"createdAt":Date.now(),
			"updatedAt":Date.now(),
			"messages":[]
		})
	},
	sendWink:function(fromUserId, toUserId){
		Meteor.users.update(fromUserId, {
			$addToSet:{"profile.winks.to":toUserId}
		});
		Meteor.users.update(toUserId, {
			$addToSet:{"profile.winks.from":fromUserId}
		});
	},

	//Messages
	getAllMessages:function(userId){
		return Messages.find({$or:[{"from":{$eq: userId }},{"to":{ $eq: userId}}]},{sort:{"updatedAt":-1}}).fetch();
	},
	getSentMessages:function(userId){
		// return Messages.find({"to":userId, "from":userId}).fetch();
		return Messages.find({"from":userId}, {sort:{"createdAt":-1}}).fetch();
	}
})