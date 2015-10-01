Template.navigation_links.helpers({
	isAdmin:function(){
		if (Meteor.user() && Meteor.user().profile.email === 'midgitsuu@gmail.com')
			return true;
	},
	activityCount:function(){
		return Meteor.user().profile.newActivity.messages + Meteor.user().profile.newActivity.winks;
	}
});

Template.header.events({
	'click .facebook-login':function(event){
		Meteor.loginWithFacebook({requestPermissions:['user_photos', 'user_videos']},function(err){
			if (err)
				throw new Meteor.Error("Facebook Login Failed");
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