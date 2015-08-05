ServiceConfiguration.configurations.upsert(
  { service: "facebook" },
  {
    $set:{
      appId: "485852571574726",
      secret: "d52ce297e2f71b55b175d9471eb6e9d4",
      requestPermissions: ['user_friends', 'emails', 'public_profile']
    }
  }
);



Meteor.methods({
	//Login
	addUserFields:function(userId){
		Meteor.users.update(userId, {
			$set: {
				'profile.userFieldsSet':true,
				'profile.height.feet':5,
				'profile.height.inches':0,
				'profile.birthdate.month':1,
				'profile.birthdate.day':1,
				'profile.birthdate.year':1915,
				'profile.bodyType':0,
				'profile.churchAttendance':0,
				'profile.denomination':0,
				'profile.drinks':0,
				'profile.smokes':0,
				'profile.education':0,
				'profile.ethnicity':0,
				'profile.eyeColor':0,
				'profile.hairColor':0,
				'profile.hasKids':0,
				'profile.wantsKids':0,
				'profile.hasPets':0,
				'profile.petPreference':0,
				'profile.wantsPets':0,
				'profile.politicalParty':0,
				'profile.searchable':false
			}
		})
	},

	//Account Page
	setZipcode:function(userId, zipcode){
		Meteor.users.update(userId, {
			$set:{'profile.zipcode':zipcode}
		});
	},
	setAccountTextField:function(userId, fieldValue, fieldName){
		var user = Meteor.users.find(userId).fetch()[0];
		user.profile[fieldName] = fieldValue;
		Meteor.users.update(userId, {
			$set:user
		});
	},
	accountGenderChange:function(userId, gender){
		Meteor.users.update(userId, {
			$set:{
				"services.facebook.gender":gender
			}
		})
	}
})