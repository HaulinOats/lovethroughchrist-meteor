Template.header.events({
	'click .facebook-login':function(event){
		Meteor.loginWithFacebook({requestPermissions:['user_friends', 'email', 'public_profile', 'user_photos', 'user_videos']},function(err){
			if (err)
				throw new Meteor.Error("Facebook Login Failed");
			else {
				console.log('here');
				if (!Meteor.user().profile.userFieldsSet) {
					FB.api("/me", function(fbData){
						Meteor.call('addUserFields', Meteor.userId(), fbData);
		            });
				}
			}
		});
	},
	'click .facebook-logout':function(event){
		Meteor.logout(function(err){
			if (err)
				throw new Meteor.Error('Logout Failed');
		})
	},
	'click .navigation-list li':function(event){
		$('#ltc-small-menu').removeClass('in');
	}
});

Template.navigation_links.helpers({
	isAdmin:function(){
		if (Meteor.user() && Meteor.user().profile.email === 'midgitsuu@gmail.com')
			return true;
	}
});