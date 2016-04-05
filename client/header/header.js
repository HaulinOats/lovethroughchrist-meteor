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
		Meteor.loginWithFacebook({requestPermissions:["email", "user_photos", "user_videos"], loginStyle:"popup"}, function(err){
			if (err)
				console.log(err);
			else {
				console.log('loginWithFacebook() method successful!');
				FB.getLoginStatus(function(response){
					if (response.status === "connected") {
						FB.api('/me', {fields: "first_name, last_name, id, gender, email"}, function(fbData){
							if (!Meteor.user().profile.fbId) {
							 	Meteor.call('addUserFields', Meteor.userId(), fbData, function(err, res){
							 		if (!err)
							 			console.log('facebook data saving successful!');
							 		else {
							 			console.log('error while saving facebook data:');
							 			console.log(err);
							 		}
							 	});
							}
						})
					} else {
						console.log('facebook logging in...');
						FB.login(function(){}, {scope:"user_videos, user_photos"});
					}
				});
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