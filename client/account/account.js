var accountInputTimeout;

Template.account_page.helpers({
	getUser:function(){
		if(Meteor.user())
			console.log(Meteor.user());
	}
});

Template.account_page.events({
	'keyup .account-zipcode':function(event){
		if(event.keyCode === 13 && event.currentTarget.value.length === 5) {
			Meteor.call('setZipcode', Meteor.userId(), event.currentTarget.value, function(err, result){
				console.log(result);
			});
		}
	},
	'keyup .account-skype, keyup .account-city, keyup .account-state':function(event){
		clearTimeout(accountInputTimeout);
		accountInputTimeout = setTimeout(function(){
			Meteor.call('setAccountTextField', Meteor.userId(), event.currentTarget.value, event.currentTarget.attributes.fieldname.value);
		}, 500)
	},
	'change .account-single-dropdown':function(event){
		Meteor.call('accountDropdownChange', Meteor.userId(), event.currentTarget.attributes.fieldname.value, $(event.currentTarget).find(":selected")[0].value);
	},
	'change .account-height':function(event){
		Meteor.call('heightDropdownChange', Meteor.userId(), event.currentTarget.attributes.heightfield.value, $(event.currentTarget).find(":selected")[0].value);
	},
	'change .account-birthdate':function(event){
		Meteor.call('birthdateDropdownChange', Meteor.userId(), event.currentTarget.attributes.birthdatefield.value, $(event.currentTarget).find(":selected")[0].value);
	},
	'click .account-searchable-container':function(event){
		Meteor.call('searchableSwitch', Meteor.userId());
	}
});