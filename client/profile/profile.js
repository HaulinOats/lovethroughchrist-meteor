Template.user_profile.helpers({
	getSearchUser:function(){
		return Session.get('currentSearchUser');
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
		
	}
})