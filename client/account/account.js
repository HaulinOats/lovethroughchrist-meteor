var inputTimeout;

Template.account_page.helpers({
	getUser:function(){
		console.log(Meteor.user());
	}
});

Template.account_page.events({
	'keyup .account-zipcode':function(event){
		if(event.keyCode === 13 && event.currentTarget.value.length === 5) {
			Meteor.call('setZipcode', Meteor.userId(), event.currentTarget.value);
		}
	},
	'keyup .account-skype, keyup .account-city, keyup .account-state':function(event){
		clearTimeout(inputTimeout);
		inputTimeout = setTimeout(function(){
			Meteor.call('setAccountTextField', Meteor.userId(), event.currentTarget.value, event.currentTarget.attributes.fieldname.value);
		}, 500)
	},
	'change .account-gender-select':function(event){
		Meteor.call('accountGenderChange', Meteor.userId(), $(event.currentTarget).find(":selected")[0].value);
	}
});