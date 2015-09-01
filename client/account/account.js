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
	}
});

Template.account_page.events({
	'keyup .account-zipcode':function(event){
		if(event.currentTarget.value.length === 5) {
			Meteor.call('setZipcode', Meteor.userId(), event.currentTarget.value, function(err, result){
				console.log(result);
			});
		}
	},
	'keyup .account-skype, keyup .account-city, keyup .account-state':function(event){
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
		if (Meteor.user().profile.latitude && Meteor.user().profile.latitude)
			Meteor.call('searchableSwitch', Meteor.userId());
		else
			alert('Must Set Zipcde');
	},
	'click .textarea-outer-container button':function(event){
		var $textArea = $(event.currentTarget).siblings('textarea'),
			textAreaVal = $textArea.val(),
			fieldName   = $textArea.attr('fieldname');
		Meteor.call('infoTextAreaSave', Meteor.userId(), fieldName, textAreaVal);
	},
	'click .account_page_search_photos':function(event){
		//set all photos
		FB.api("/me/photos", function(photoData){
		  $('.account_page_photos_select').show();
		  $('.account_page_search_photos').hide();
		  $('.account_page_photos_current').css('min-height', "250px");
		  $('.account_load_more').attr('data-next-url-all', photoData.paging.next);
          for (var i = 0; i < photoData.data.length; i++)
          	$(".account_load_more").before('<img class="account_page_search_thumbnail" src="'+ photoData.data[i].picture +'" data-image-url="'+ photoData.data[i].source +'" />');
        });
        //set profile photos
        FB.api("/me/albums", function(photoData){
        	for (var i = 0; i < photoData.data.length; i++){
        		if (photoData.data[i].name === "Profile Pictures") {
        			FB.api("/"+ photoData.data[i].id + "/photos", function(photoData2){
        				$('.account_load_more').attr('data-next-url-profile', photoData2.paging.next);
        				for (var i = 0; i < photoData2.data.length;i++)
        					$(".account_load_more").before('<img class="account_page_search_thumbnail" src="'+ photoData2.data[i].picture +'" data-image-url="'+ photoData2.data[i].source +'" />');
        			});
        			break;
        		} 
        	}
        });
	},
	'click .account_load_more':function(event){
		//get all photos
		$.ajax({
		  url: $('.account_load_more').attr('data-next-url-all'),
		  method:"GET"
		}).done(function(json) {
		  $('.account_load_more').attr('data-next-url-all', json.paging.next);
		  for (var i = 0; i < json.data.length; i++)
		  	$(".account_load_more").before('<img class="account_page_search_thumbnail" src="'+ json.data[i].picture +'" data-image-url="'+ json.data[i].source +'" />')
		});
		//get profile photos
		$.ajax({
		  url: $('.account_load_more').attr('data-next-url-profile'),
		  method:"GET"
		}).done(function(json) {
		  $('.account_load_more').attr('data-next-url-profile', json.paging.next);
		  for (var i = 0; i < json.data.length; i++)
		  	$(".account_load_more").before('<img class="account_page_search_thumbnail" src="'+ json.data[i].picture +'" data-image-url="'+ json.data[i].source +'" />')
		});
	},
	'mouseover .account_page_search_thumbnail, mouseout .account_page_search_thumbnail':function(event){
		if (event.type === "mouseover")
			$('.account_page_thumbnail_popup').append('<img src="'+ $(event.currentTarget).attr('data-image-url') +'" />').show();
		else if (event.type === "mouseout")
			$('.account_page_thumbnail_popup').html('').hide();

	},
	'click .account_page_search_thumbnail':function(event){
		if (Meteor.user().profile.images.all.length < 11){
			if (confirm("Add To Profile Pictures?")) {
				Meteor.call('addProfileImage', Meteor.userId(), $(event.currentTarget).attr('data-image-url'));
			}
		} else
		alert("12 Photo Maximum!");
	},
	'click .account_page_photos_current_single_remove':function(event){
		if (confirm("Remove Profile Image?")){
			Meteor.call('removeProfileImage', Meteor.userId(),$(event.currentTarget).attr('data-image-url'));
		}
	},
	'click .account_page_photos_current_single_make_default':function(event){
		if (confirm("Make Default Photo?"))
			Meteor.call('makeDefaultImage', Meteor.userId(),$(event.currentTarget).attr('data-image-url'));
	}
});