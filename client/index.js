//Collections
Messages = new Mongo.Collection("messages");

Meteor.startup(function(){
	//setup Facebook SDK
	window.fbAsyncInit = function() {
		Meteor.call('getEnvironment', function(err, res){
			if (!err) {
				if (res === "development") {
					FB.init({
					  // Developer
					  appId		 : '485852571574726',
					  xfbml      : true,
					  version    : "v2.5"
					});
				} else {
					// Redirect to 'www' if not 'www'
					if (location.host.indexOf('www') === -1)
						location = 'http://www.lovethroughchrist.com';
					FB.init({
					  // Production
					  appId      : '289256867900965',
					  xfbml      : true,
					  version    : "v2.5"
					});	
				}
			}
		});
	};
});

Meteor.settings.public = {
	"analyticsSettings": {
		"Google Analytics" : {
			"trackingId": "UA-32825440-2"
		}
	}
}

// tooltip object 
var tooltips = {
	"searchable":"Allows your profile to be discovered by other users.  You must first set a zipcode before you can become searchable.",
	"photos":"Click the button below to search through Facebook photos.  Click on a photo and confirm to add to profile.  Once added, click the star icon to make that photo your default.  Click the 'X' icon to remove photo from profile.  Reload page if there is a problem with photos loading.",
	"videos":"Click the button below to search through Facebook videos.  Click a video to add it to your profile.  Once added, click the 'X' icon in the upper right to remove video from profile.  Reload page if there is a problem with videos loading",
	"zipcode":"Enter the 5 digit zipcode of where you would like meet users.  We will automatically get your hometown coordinates and populate the 'city' and 'state' fields.  You may change them to be more accurate, if desired.",
	"testimonial":"This is where you'll find testimonials other users have left about you.  Approving will allow that testimonial to display on your profile."
}
var introSlides = {
	"1": {
		"header":"Account Page",
		"text":"All the information on your profile is saved on the fly.  Simply enter a valid 5-digit zipcode to begin searching.  You may add images and videos from Facebook by clicking on the 'photos' or 'videos' tabs and clicking the 'search' button.",
		"imageUrl":"/intro_page_1.jpg"
	},
	"2": {
		"header":"Search Page",
		"text":"You will see all users within your specified search distance whom match your preferences.  Update the information in the 'Preferences' tab if you have specific traits you are looking for.",
		"imageUrl":"/intro_page_2.jpg"
	},
	"3": {
		"header":"Profile Page",
		"text":"Clicking a user's profile on the Search page or clicking 'My Profile' will take you to the Profile page.  You can wink at, or add users to your favorites list as well as click on their picture to see more images (if they have more).  Both users must have mutually winked at each other before either can send a message.",
		"imageUrl":"/intro_page_3.jpg"
	},
	"4": {
		"header":"Activity Page",
		"text":"This is where you can find all your messages, winks, and saved favorite profiles.  New activity will show a popup in the bottom right corner of the screen as well as change the icon next to the 'Activity' link in the top menu.",
		"imageUrl":"/intro_page_4.jpg"
	},
	"5": {
		"header":"Happy Dating!",
		"text":"Please be courteous and respectful.  Enjoy the site!",
		"imageUrl":"/intro_page_5.jpg"
	}
}

modalHandler = {
	"report": {
		"message":"Report and block user?",
		"confirm":"Confirm",
		"response":"User has been reported and blocked.  They will no longer show up in search nor will they be able to message you.  Thank you!"
	}
}

// Global Modal
Template.global_modal.events({
	'click .global_confirmation_modal_outer':function(event){
		$(event.currentTarget).hide();
	},
	'click .close-global-modal':function(event){
		$('.global_confirmation_modal_outer').hide();
	},
	'click .global_confirmation_modal_inner':function(event){
		event.stopPropagation();
	},
	'click .global_confirmation_modal_confirm':function(event){
		var modalType = $(event.currentTarget).data('modal-type');
		switch(modalType){
			case "report":
				Meteor.call('reportUser', Meteor.userId(), $(event.currentTarget).attr('data-userid'), function(err, result){
					if (!err) {
						$('.global_confirmation_modal_message').text(modalHandler[modalType].response);
						$('.global_confirmation_modal_confirm').html('OK').data('modal-type', 'default');
					}
				})
				break;
			case "default":
				$('.global_confirmation_modal_outer').hide();
				break;
		}
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
	'click .pref-checkbox-el':function(event){
		var fieldname = $(event.currentTarget).attr('data-fieldname');
		switch(fieldname){
			case "gender":
				Meteor.call('prefGenderCheckbox', Meteor.userId(), event.currentTarget.attributes.optionindex.value, $(event.currentTarget).find('input')[0].checked);
				break;
			case "political":
				Meteor.call('prefPoliticalPartyCheckbox', Meteor.userId(), event.currentTarget.attributes.optionindex.value, $(event.currentTarget).find('input')[0].checked);
				break;
			case "ethnicity":
				Meteor.call('prefEthnicityCheckbox', Meteor.userId(), event.currentTarget.attributes.optionindex.value, $(event.currentTarget).find('input')[0].checked);
				break;
			case "denomination":
				Meteor.call('prefDenominationCheckbox', Meteor.userId(), event.currentTarget.attributes.optionindex.value, $(event.currentTarget).find('input')[0].checked);
				break;
			case "language":
				Meteor.call('prefLanguageCheckbox', Meteor.userId(), event.currentTarget.attributes.optionindex.value, $(event.currentTarget).find('input')[0].checked);
				break;
		}
	},
	'click .pref-ethnicity-checkbox':function(event){
		Meteor.call('prefEthnicityCheckbox', Meteor.userId(), event.currentTarget.attributes.optionindex.value, $(event.currentTarget).find('input')[0].checked);
	}
});

Template.intro_page.events({
	'click .ltc_intro_next':function(event){
		var slideIndex = parseInt($(event.currentTarget).attr('data-slide-index'));
		if (slideIndex < 6) {
			$('.intro_page_features_outer').addClass('intro_page_fadeOut');
			setTimeout(function(){
				$('.intro_page_features_outer').css('background-image', 'url('+ introSlides[slideIndex].imageUrl +')');
				$('.intro_page_outer h2').text(introSlides[slideIndex].header);
				$('.intro_pointers_top').text(introSlides[slideIndex].text);
				$(event.currentTarget).attr('data-slide-index', slideIndex + 1)
				$('.intro_page_features_outer').removeClass('intro_page_fadeOut');
				if (slideIndex === 5)
					$(event.currentTarget).html('').append('<a href="/my-account">Go To Profile</a>');
			}, 1000)
		}
	}
});

//Body
Template.body.events({
  "mouseenter .ltc_tooltip, mouseleave .ltc_tooltip": function(e, data, tpl) {
  	switch(e.type){
  		case "mouseenter":
  			$('.ltc_tooltip_popup').show().css({"top":e.clientY,"left":e.clientX + 20}).find('p').text(tooltips[$(e.currentTarget).attr('data-tooltip')]);
  			break;
  		case "mouseleave":
  			$('.ltc_tooltip_popup').hide();
  			break;
  	}
  },
  'click .global_confirmation_modal_outer, click .global_confirmation_modal_confirm':function(events){
  	$('.global_confirmation_modal_outer').removeClass('modal_showing');
  }
});