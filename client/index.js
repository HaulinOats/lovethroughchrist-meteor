window.fbAsyncInit = function() {
	FB.init({
	  appId      : '485852571574726',
	  status     : true,
	  xfbml      : true,
	  version    : "v2.3"
	});
};

SEO.config({
	title: 'LoveThroughChrist',
	meta: {
	  'description': 'A free Christian dating site'
	},
	og: {
	  'image': 'http://www.lovethroughchrist.com/users/assets/img/ltc-logo-long.svg' 
	}
});

//Preferences
var accountInputTimeout;
Template.preferences.events({
	'change .pref-single-dropdown':function(event){
		console.log(event.currentTarget.attributes.fieldname.value);
		console.log($(event.currentTarget).find(":selected")[0].value);
		Meteor.call('accountPrefChange', Meteor.userId(), event.currentTarget.attributes.fieldname.value, $(event.currentTarget).find(":selected")[0].value);
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
	'click .pref-gender-checkbox':function(event){
		Meteor.call('prefGenderCheckbox', Meteor.userId(), event.currentTarget.attributes.optionindex.value, $(event.currentTarget).find('input')[0].checked, function(err, result){
			console.log(result);
		});
	},
	'click .pref-ethnicity-checkbox':function(event){
		Meteor.call('prefEthnicityCheckbox', Meteor.userId(), event.currentTarget.attributes.optionindex.value, $(event.currentTarget).find('input')[0].checked);
	}
});