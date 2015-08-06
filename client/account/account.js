var accountInputTimeout;

Template.account_page.helpers({
	getUser:function(){
		if(Meteor.user())
			console.log(Meteor.user());
	}
});

Template.account_page.events({
	'keyup .account-zipcode':function(event){
		if(event.currentTarget.value.length === 5) {
			Meteor.call('setZipcode', Meteor.userId(), event.currentTarget.value, function(err, result){
				console.log(result);
			});
		}
	},
	'keyup .account-skype, keyup .account-city, keyup .account-state':function(event){
		clearTimeout(accountInputTimeout);
		accountInputTimeout = setTimeout(function(){
			Meteor.call('setInfoTextField', Meteor.userId(), event.currentTarget.value, event.currentTarget.attributes.fieldname.value);
		}, 500)
	},
	'change .pref-age, keyup .pref-age':function(event){
		clearTimeout(accountInputTimeout);
		if (event.currentTarget.attributes.fieldname.value === "min" && parseInt(event.currentTarget.value) > 17 
			|| event.currentTarget.attributes.fieldname.value === "max" && parseInt(event.currentTarget.value) < 99){
			accountInputTimeout = setTimeout(function(){
				Meteor.call('setAgeMinMax', Meteor.userId(), event.currentTarget.value, event.currentTarget.attributes.fieldname.value);
			}, 500);
		}
	},
	'change .account-single-dropdown':function(event){
		Meteor.call('accountInfoChange', Meteor.userId(), event.currentTarget.attributes.fieldname.value, $(event.currentTarget).find(":selected")[0].value);
	},
	'change .pref-single-dropdown':function(event){
		Meteor.call('accountPrefChange', Meteor.userId(), event.currentTarget.attributes.fieldname.value, $(event.currentTarget).find(":selected")[0].value);
	},
	'change .account-height':function(event){
		Meteor.call('heightDropdownChange', Meteor.userId(), event.currentTarget.attributes.heightfield.value, $(event.currentTarget).find(":selected")[0].value);
	},
	'change .account-birthdate':function(event){
		Meteor.call('birthdateDropdownChange', Meteor.userId(), event.currentTarget.attributes.birthdatefield.value, $(event.currentTarget).find(":selected")[0].value);
	},
	'click .account-searchable-container':function(event){
		if (Meteor.user().profile.latitude && Meteor.user().profile.latitude)
			Meteor.call('searchableSwitch', Meteor.userId());
		else
			alert('Must Set Zipcde');
	}
});