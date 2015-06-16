Template.header.events({
	'click .facebook-login':function(event){
		console.log(event);
		Meteor.loginWithFacebook({}, function(err){
			if (err)
				throw new Meteor.Error("Facebook Login Failed");
		});
	},
	'click .facebook-logout':function(event){
		Meteor.logout(function(err){
			if (err)
				throw new Meteor.Error('Logout Failed');
		})
	}
});