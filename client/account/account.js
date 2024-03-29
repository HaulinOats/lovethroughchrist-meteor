var accountInputTimeout;

Template.account_page.helpers({
	getUser:function(){
		// if(Meteor.user())
		// 	console.log(Meteor.user());
	},
	isDefaultImage:function(imageUrl, defaultUrl){
		if (Meteor.user().profile.images.default === imageUrl)
			return true;
	},
	getUserInfo:function(){
	    Meteor.call('getUserNameAndDefault', userIdArr, function(err, result){
	      if (!err){
	        for (var i = 0; i < result.length; i ++)
	          messages[i].name = result[i];
	        Session.set('allMessages', messages);
	      }
	    })
	},
	getTestimonialUser:function(){
		return Session.get('testimonialUser');
	}
});

Template.account_page.events({
	'keyup .account-zipcode':function(event){
		if(event.currentTarget.value.length === 5) {
			Meteor.call('setZipcode', Meteor.userId(), event.currentTarget.value, function(err, result){
				if (err) {
					console.log("error setting zipcode");
					console.log(err);
				}
			});
		}
	},
	'keyup .account-city, keyup .account-state':function(event){
		clearTimeout(accountInputTimeout);
		accountInputTimeout = setTimeout(function(){
			Meteor.call('setInfoTextField', Meteor.userId(), event.currentTarget.value, event.currentTarget.attributes.fieldname.value);
		}, 500)
	},
	'change .account-single-dropdown':function(event){
		Meteor.call('accountInfoChange', Meteor.userId(), event.currentTarget.attributes.fieldname.value, $(event.currentTarget).find(":selected")[0].value);
	},
	'change .account-height':function(event){
		Meteor.call('heightDropdownChange', Meteor.userId(), event.currentTarget.attributes.heightfield.value, $(event.currentTarget).find(":selected")[0].value);
	},
	'change .account-birthdate':function(event){
		Meteor.call('birthdateDropdownChange', Meteor.userId(), event.currentTarget.attributes.birthdatefield.value, $(event.currentTarget).find(":selected")[0].value);
	},
	'click .account-searchable-container':function(event){
		if (Meteor.user().profile.latitude && Meteor.user().profile.longitude)
			Meteor.call('searchableSwitch', Meteor.userId());
		else
			$('.global_confirmation_modal_outer').addClass('modal_showing').find('p').text('Must set a zipcode');
	},
	'blur .textarea-outer-container textarea':function(event){
		var textAreaVal = $(event.currentTarget).val(),
			fieldName   = $(event.currentTarget).attr('data-fieldname');
		Meteor.call('infoTextAreaSave', Meteor.userId(), fieldName, textAreaVal);
	},
	'click .account_page_search_photos':function(event){
        FB.getLoginStatus(function(response){
        	//get access token on each call to load images
        	Session.set('accessToken', response.authResponse.accessToken);
			
			// show photos box
			$('.account_page_photos_select').show();
			$('.account_page_search_photos').hide();
			$('.account_page_photos_current').css('min-height', "250px");

			//set all photos
			// FB.api("/me/photos", {access_token: Session.get('accessToken')}, function(photoData){
			//   $('.account_load_more').attr('data-next-url-all', photoData.paging.next);
	  //         for (var i = 0; i < photoData.data.length; i++) {
	  //         	FB.api("/" + photoData.data[i].id, {fields: "images"}, function(photo){
	  //         		$(".account_load_more_photos").before('<img class="account_page_photo_search_thumbnail" src="'+ photo.images[0].source +'" data-image-url="'+ photo.images[0].source +'" />');
	  //         	});
	  //         }
	  //       });
	        	
	        //set profile photos
	        console.log('authToken:' + Session.get('accessToken'));
	        FB.api("/me/albums", {access_token: Session.get('accessToken')}, function(photoData){
	        	for (var i = 0; i < photoData.data.length; i++){
	        		if (photoData.data[i].name === "Profile Pictures") {
	        			FB.api("/"+ photoData.data[i].id + "/photos",{access_token: Session.get('accessToken')}, function(photoData2){
	        				$('.account_load_more_photos').attr('data-next-url-profile', photoData2.paging.next);
	        				for (var i = 0; i < photoData2.data.length;i++) {
	        					FB.api("/" + photoData2.data[i].id, {fields: "images"}, function(photo){
	        						$(".account_load_more_photos").before('<img class="account_page_photo_search_thumbnail" src="'+ photo.images[0].source +'" data-image-url="'+ photo.images[0].source +'" />');
	        					});
	        				}
	        			});
	        			break;
	        		} 
	        	}
	        });
        });
	},
	'click .account_page_search_videos':function(event){
		FB.getLoginStatus(function(response){
			//get access token on each call to load images
			Session.set('accessToken', response.authResponse.accessToken);
			
			//set all videos
			$('.account_load_more_photos').show();
			FB.api("/me/videos", {access_token: Session.get('accessToken')}, function(videoData){
				console.log(videoData);
			  $('.account_page_videos_select').show();
			  $('.account_page_search_videos').hide();
			  $('.account_page_videos_current').css('min-height', "250px");
			  $('.account_load_more_videos').attr('data-next-url-all', videoData.paging.next);
	          for (var i = 0; i < videoData.data.length; i++) {
	          	FB.api("/" + videoData.data[i].id, {fields: "source, picture"}, function(video){
	          		$(".account_load_more_videos").before('<img class="account_page_video_search_thumbnail" src="'+ video.picture +'" data-video-url="'+ video.source +'" />');
	          	});
	          }
	        });
		});
	},
	'click .account_load_more_photos':function(event){
		//get all photos
		// $.ajax({
		//   url: $('.account_load_more_photos').attr('data-next-url-all'),
		//   dataType:"json",
		//   method:"GET"
		// }).done(function(json) {
		//   console.log('load more tagged photos:');
		//   console.log(json.paging.next);
		//   $('.account_load_more_photos').attr('data-next-url-all', json.paging.next);
		//   for (var i = 0; i < json.data.length; i++)
		//   	$(".account_load_more_photos").before('<img class="account_page_photo_search_thumbnail" src="'+ json.data[i].picture +'" data-image-url="'+ json.data[i].source +'" />')
		// });

		//get profile photos
		$.ajax({
		  url: $('.account_load_more_photos').attr('data-next-url-profile'),
		  dataType:"json",
		  method:"GET"
		}).done(function(response) {
		  $('.account_load_more_photos').attr('data-next-url-profile', response.paging.next);
		  for (var i = 0; i < response.data.length; i++) {
		  	FB.api("/" + response.data[i].id, {fields: "images"}, function(photo){
		  		$(".account_load_more_photos").before('<img class="account_page_photo_search_thumbnail" src="'+ photo.images[0].source +'" data-image-url="'+ photo.images[0].source +'" />')
		  	});
		  }
		});
	},
	'click .account_load_more_videos':function(event){
		//get all videos
		$.ajax({
		  url: $('.account_load_more_videos').attr('data-next-url-all'),
		  method:"GET"
		}).done(function(response) {
			if (response.paging.next)
		  		$('.account_load_more_videos').attr('data-next-url-all', response.paging.next);
		  	else
		  		$('.account_load_more_videos').hide();
			for (var i = 0; i < response.data.length; i++) {
				FB.api("/" + response.data[i].id, {fields: "source, picture"}, function(video){
		  			$(".account_load_more_videos").before('<img class="account_page_video_search_thumbnail" src="'+ video.picture +'" data-video-url="'+ video.source +'" />')
				});
			}
		});
	},
	'mouseover .account_page_photo_search_thumbnail, mouseout .account_page_photo_search_thumbnail':function(event){
		if (event.type === "mouseover")
			$('.account_page_thumbnail_popup').append('<img src="'+ $(event.currentTarget).attr('data-image-url') +'" />').show();
		else if (event.type === "mouseout")
			$('.account_page_thumbnail_popup').html('').hide();

	},
	'click .account_page_photo_search_thumbnail':function(event){
		if (Meteor.user().profile.images.all.length < 11){
			if (confirm("Add To Profile Pictures?")) {
				Meteor.call('addProfileImage', Meteor.userId(), $(event.currentTarget).attr('data-image-url'));
			}
		} else
		$('.global_confirmation_modal_outer').addClass('modal_showing').find('p').text('12 photo maximum');
	},
	'click .account_page_video_search_thumbnail':function(event){
		if (Meteor.user().profile.videos.length < 11){
			// if (confirm("Add To Profile Pictures?")) {
				Meteor.call('addVideo', Meteor.userId(), $(event.currentTarget).attr('data-video-url'));
			// }

		} else
			$('.global_confirmation_modal_outer').addClass('modal_showing').find('p').text('12 video maximum');
	},
	'click .account_page_photos_current_single_remove':function(event){
		if (confirm("Remove Profile Image?")){
			Meteor.call('removeProfileImage', Meteor.userId(),$(event.currentTarget).attr('data-image-url'));
		}
	},
	'click .account_page_videos_current_single_remove':function(event){
		if (confirm("Remove Profile Video?")){
			Meteor.call('removeProfileVideo', Meteor.userId(),$(event.currentTarget).attr('data-video-url'));
		}
	},
	'click .account_page_photos_current_single_make_default':function(event){
		if (confirm("Make Default Photo?"))
			Meteor.call('makeDefaultImage', Meteor.userId(),$(event.currentTarget).attr('data-image-url'));
	},
	// 'click .account_friends_tab':function(event){
	// 	$('.testimonial_container_outer').html('');
	// 	var friends = [];
	// 	FB.api("/me/friends", function(friendData){
	// 		for (var i = 0; i < friendData.data.length;i++)
	// 			$('.testimonial_container_outer').append("<a class='testimonial_friend_link' data-fbid='"+ friendData.data[i].id +"'>"+ friendData.data[i].name +"</a>")
	// 		if (friendData.data.length > 19)
	// 			$('.testimonial_container_outer').append('<button class="ltc_button testimonial_load_more_friends" data-paging="'+ friendData.paging.next +'">Load More</button>')
	// 		else
	// 			$('.testimonial_load_more_friends').hide();
	// 	})
	// },
	'click .testimonial_load_more_friends':function(event){
		$.ajax({
		  url: $('.testimonial_container_outer').attr('data-paging'),
		  method:"GET"
		}).done(function(json) {
			if (json.paging.next)
		  		$('.testimonial_load_more_friends').attr('data-paging', json.paging.next);
		  	else
		  		$('.testimonial_load_more_friends').hide();
			for (var i = 0; i < json.data.length; i++)
		  		$('.testimonial_load_more_friends').before("<a data-fbid='"+ json.data[i].id +"'>"+ json.data[i].name +"</a>")
		});
	},
	'click .testimonial_approve, click .testimonial_delete':function(event){
		Meteor.call('testimonialApproval', Meteor.userId(), $(event.currentTarget).attr('data-choice'), $(event.currentTarget).attr('data-testIdx'));
	}
});