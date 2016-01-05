Template.user_profile.helpers({
	getSearchUser:function(){
		return Session.get('currentSearchUser');
	},
	getDefaultPhoto:function(userObj){
		if (!userObj.profile.images.default){
			if (!userObj.profile.images.all.length)
				return "./../default.png";
			else 
				return userObj.profile.images.all[0];
		} else {
			return userObj.profile.images.default;
		}
	},
	hasSentWink:function(toWinks, fromUserId){
		var userMatch = toWinks.indexOf(fromUserId);
		if (userMatch > -1)
			return true;
	}
})

Template.user_profile.events({
	'click .profile-message':function(event){
		if (!$(event.currentTarget).hasClass('no-message')) {
			$('.testimonial_container').removeClass('show-testimonial')
			if ($('.profile-message-container').hasClass('show-message'))
				$('.profile-message-container').removeClass('show-message')
			else
				$('.profile-message-container').addClass('show-message');
		} else {
			$('.global_confirmation_modal_message').text("Both users must wink in order to message");
			$('.global_confirmation_modal_confirm').html("OK").data('modal-type', 'default');
			$('.global_confirmation_modal_outer').show();
		}
	},
	'click .profile-wink':function(event){
		Meteor.call('sendWink', Meteor.userId(), event.currentTarget.attributes.userid.value, function(err, result){
			if (!err){
				$('.global_confirmation_modal_message').text("Wink sent!");
				$('.global_confirmation_modal_confirm').html("OK").data('modal-type', 'default');
				$('.global_confirmation_modal_outer').show();
			}
		});
	},
	'click .profile-message-container button, keypress .profile-message-container textarea':function(event){
		var message = null;
		if (event.type === "click")
			message = $(event.currentTarget).siblings('textarea').val();
		else {
			if (event.which === 13)
				message = event.currentTarget.value;
		}
		if (message && message.length > 0) {
			Meteor.call("newMessage", Meteor.userId(), $('.profile-message-container').attr('data-user-id'), message, function(err, result){
				if (!err){
					$('.global_confirmation_modal_message').text("Message sent!");
					$('.global_confirmation_modal_confirm').html("OK").data('modal-type', 'default');
					$('.global_confirmation_modal_outer').show();
					$('.profile-message-container').removeClass('show-message');
				}
			});
		}
		
	},
	'click .profile-default-container':function(event){
		var user = Session.get('currentSearchUser');
		if (user.profile.images.default || user.profile.images.all.length){
			$('.profile_photos_modal_outer').addClass('modal_showing');
			$('.profile_photos_modal_inner').css('background-image', 'url('+ user.profile.images.all[0] +')');
			Session.set('profileImageIndex', 0);
		}
	},
	'click .profile_photos_prev, click .profile_photos_next':function(event){
		var currentImageIndex = Session.get('profileImageIndex'),
			user = Session.get('currentSearchUser');
		if ($(event.currentTarget).attr('data-direction') === "next") {
			if (user.profile.images.all[currentImageIndex+1]){
				$('.profile_photos_modal_inner').css('background-image', 'url('+ user.profile.images.all[currentImageIndex+1] +')');
				Session.set('profileImageIndex', currentImageIndex+1);
			} else {
				$('.profile_photos_modal_inner').css('background-image', 'url('+ user.profile.images.all[0] +')');
				Session.set('profileImageIndex', 0);
			}
		} else {
			if (user.profile.images.all[currentImageIndex-1]){
				$('.profile_photos_modal_inner').css('background-image', 'url('+ user.profile.images.all[currentImageIndex-1] +')');
				Session.set('profileImageIndex', currentImageIndex-1);
			} else {
				$('.profile_photos_modal_inner').css('background-image', 'url('+ user.profile.images.all[user.profile.images.all.length-1] +')');
				Session.set('profileImageIndex', user.profile.images.all.length-1);
			}
		}
	},
	'click .profile_photos_close':function(event){
		$('.profile_photos_modal_outer').removeClass('modal_showing');
	},
	'click .report_user':function(event){
		$('.global_confirmation_modal_message').text(modalHandler['report'].message);
		$('.global_confirmation_modal_confirm').html(modalHandler['report'].confirm).data('modal-type', 'report');
		$('.global_confirmation_modal_outer').show();
	},
	'click .profile-favorite':function(event){
		Meteor.call('favoriteUser', Meteor.userId(), $(event.currentTarget).attr('data-userid'), function(err, result){
			if (!err){
				$('.global_confirmation_modal_message').text("User added to Favorites!");
				$('.global_confirmation_modal_confirm').html("OK").data('modal-type', 'default');
				$('.global_confirmation_modal_outer').show();
			}
		})
	},
	'click .testimonial_button':function(event){
		$('.profile-message-container').removeClass('show-message')
		if ($('.testimonial_container').hasClass('show-testimonial'))
			$('.testimonial_container').removeClass('show-testimonial');
		else
			$('.testimonial_container').addClass('show-testimonial');
	},
	'click .testimonial_popup_inner':function(event){
		event.stopPropagation();
	},
	'click .testimonial_popup_outer, click .close_testimonial_popup':function(event){
		$('.testimonial_popup_outer').hide();
	},
	'click .submit_testimonial':function(event){
		if ($('.testimonial_textarea').val() !== "") {
			if (confirm("Submit Testimonial?")) {
				Meteor.call('submitTestimonial', Meteor.userId(), Meteor.user().profile.name, $(event.currentTarget).attr('data-id'), $('.testimonial_textarea').val(), function(err, result){
					if (!err){
						$('.testimonial_container').removeClass('show-testimonial');
						$('.global_confirmation_modal_outer').addClass('modal_showing').find('p').text('Testimonial Sent');
					}
				});
			}
		}
	},
})