Template.header.events({
	'click .facebook-login':function(event){
		Meteor.loginWithFacebook({requestPermissions:['user_friends', 'email', 'public_profile']},function(err){
			if (err)
				throw new Meteor.Error("Facebook Login Failed");
			else {
				if (!Meteor.user().profile.userFieldsSet)
					Meteor.call('addUserFields', Meteor.userId());
			}
		});
	},
	'click .facebook-logout':function(event){
		Meteor.logout(function(err){
			if (err)
				throw new Meteor.Error('Logout Failed');
		})
	}
});