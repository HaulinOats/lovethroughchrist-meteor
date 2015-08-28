Template.user_profile.helpers({
	getSearchUser:function(){
		return Session.get('currentSearchUser');
	},
	getDefaultPhoto:function(userObj){
		if (!userObj.profile.images.default){
			if (!userObj.profile.images.all.length)
				console.log('no default and no images');
			else 
				console.log('no default but at least 1 image');
		} else {
			return userObj.profile.images.default;
		}
	}
})

Template.user_profile.events({
	'click .profile-message':function(event){
		if ($('.profile-message-container').hasClass('show-message'))
			$('.profile-message-container').removeClass('show-message')
		else
			$('.profile-message-container').addClass('show-message');
	},
	'click .profile-wink':function(event){
		Meteor.call('sendWink', Meteor.userId(), event.currentTarget.attributes.userid.value, function(err, result){
			if (!err)
				alert('Wink Sent!');
		});
	},
	'click .profile-message-container button':function(event){
		var message = $(event.currentTarget).siblings('textarea').val();
		if (message.length < 1 || message !== "") {
			Meteor.call("newMessage", Meteor.userId(), event.currentTarget.attributes.userid.value, message, function(err, result){
				if (!err){
					alert('Message Sent!')
					$('.profile-message-container').removeClass('show-message');
				}
			});
		}
		
	},
	'click .profile-default-container':function(event){
		$('.profile_photos_modal_outer').addClass('modal_showing');
		$('.profile_photos_modal_inner').css('background-image', 'url('+ Meteor.user().profile.images.all[0] +')');
		Session.set('profileImageIndex', 0);
	},
	'click .profile_photos_prev, click .profile_photos_next':function(event){
		var currentImageIndex = Session.get('profileImageIndex');
		if ($(event.currentTarget).attr('data-direction') === "next") {
			if (Meteor.user().profile.images.all[currentImageIndex+1]){
				$('.profile_photos_modal_inner').css('background-image', 'url('+ Meteor.user().profile.images.all[currentImageIndex+1] +')');
				Session.set('profileImageIndex', currentImageIndex+1);
			} else {
				$('.profile_photos_modal_inner').css('background-image', 'url('+ Meteor.user().profile.images.all[0] +')');
				Session.set('profileImageIndex', 0);
			}
		} else {
			if (Meteor.user().profile.images.all[currentImageIndex-1]){
				$('.profile_photos_modal_inner').css('background-image', 'url('+ Meteor.user().profile.images.all[currentImageIndex-1] +')');
				Session.set('profileImageIndex', currentImageIndex-1);
			} else {
				$('.profile_photos_modal_inner').css('background-image', 'url('+ Meteor.user().profile.images.all[Meteor.user().profile.images.all.length-1] +')');
				Session.set('profileImageIndex', Meteor.user().profile.images.all.length-1);
			}
		}
	},
	'click .profile_photos_close':function(event){
		$('.profile_photos_modal_outer').removeClass('modal_showing');
	}
})