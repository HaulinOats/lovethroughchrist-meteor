Template.navigation_links.helpers({
	isAdmin:function(){
		if (Meteor.user() && Meteor.user().profile.email === 'midgitsuu@gmail.com')
			return true;
	},
	activityCount:function(){
		return Meteor.user().profile.newActivity.messages + Meteor.user().profile.newActivity.winks;
	},
	newActivity:function(){
		if ((Meteor.user().profile.newActivity.messages + Meteor.user().profile.newActivity.winks) > 0)
			return true;
	}
});

Template.header.events({
	'click .facebook-login':function(event){
		Meteor.loginWithFacebook({requestPermissions:['user_photos', 'user_videos']},function(err){
			if (err)
				throw new Meteor.Error("Facebook Login Failed");
			else {
				if (!Meteor.user().profile.email) {
					FB.api("/me", function(fbData){
						console.log(fbData);
						Meteor.call('addUserFields', Meteor.userId(), fbData, function(err, result){
							if (!err)
								console.log('facebook info saved');
							else
								console.log('server error saving facebook info');
						});
		            });
				}
			}
		});
	},
	'click .facebook-logout':function(event){
		Meteor.logout(function(err){
			if (err)
				throw new Meteor.Error('Logout Failed');
			else
				Router.go('/');
		})
	},
	'click .navigation-list li':function(event){
		$('#ltc-small-menu').removeClass('in');
	}
});