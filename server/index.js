//Facebook SDK
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
	setAccountTextField:function(userId, fieldValue, fieldName){
		var user = Meteor.users.find(userId).fetch()[0];
		user.profile[fieldName] = fieldValue;
		Meteor.users.update(userId, {
			$set:user
		});
	},
	accountDropdownChange:function(userId, fieldname, option){
		var user = Meteor.users.find(userId).fetch()[0];
		switch(fieldname){
			case "gender":
				Meteor.users.update(userId, {$set:{"services.facebook.gender":option}})
				break;
			default:
				user.profile[fieldname] = parseInt(option);
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
				Meteor.users.update(userId, {$set:{"profile.birthdate.month":option}})
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
	}
})