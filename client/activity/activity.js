//All Messages Page
Template.activity_page.helpers({
	setMessageData:function(){
		var userIdArr = [],
	        messages = Messages.find().fetch();
	    for (var i = 0; i < messages.length; i ++) {
	      if (messages[i].from === Meteor.userId())
	        userIdArr.push(messages[i].to);
	      else
	        userIdArr.push(messages[i].from);
	    }
	    Meteor.call('getNameAndImage', userIdArr, function(err, result){
	      if (!err){
	        for (var i = 0; i < result.length; i ++)
	          messages[i].name = result[i];
	        Session.set('allMessages', messages);
	      }
	    })
	},
	getAllMessages:function(){
		return Session.get('allMessages');
	},
	getSentMessages:function(){
		return Session.get('sentMessages');
	},
	getLastMessage:function(messages){
		return messages[messages.length - 1].body;
	},
	setWinkData:function(){
		if (Meteor.user().profile.winks){
			if (Meteor.user().profile.winks.to){
				Meteor.call('getNameAndImage', Meteor.user().profile.winks.to, function(err, result){
			      if (!err){
			        Session.set('sentWinkData', result.reverse());
			      }
			    })
			}
			if (Meteor.user().profile.winks.from){
				Meteor.call('getNameAndImage', Meteor.user().profile.winks.from, function(err, result){
			      if (!err){
			        Session.set('fromWinkData', result.reverse());
			      }
			    })
			}
		}
	},
	getSentWinkData:function(){
		return Session.get('sentWinkData');
	},
	getFromWinkData:function(){
		return Session.get('fromWinkData');
	},
	imageExists:function(image){
		if(!image)
			return "./default.png";
	}
});
Template.activity_page.events({
	'click .messages_single_outer_container':function(event){
		Router.go('/messages/' + event.currentTarget.attributes.messageid.value);
	},
	'click .activity_winks_outer':function(event){
		Router.go('/search/'+ $(event.currentTarget).attr('data-user-id'));
	}
});

//Single Message Page
Template.message_single_page.helpers({
	getMessage:function(){
		return Messages.find().fetch()[0];
	},
	setOtherUser:function(messageObj){
		if (messageObj.to === Meteor.userId()){
			Meteor.call('getSearchUser', messageObj.from, function(err, result){
				if (!err)
					Session.set('singleMessageUserData', result);
			});
		} else {
			Meteor.call('getSearchUser', messageObj.to, function(err, result){
				if (!err)
					Session.set('singleMessageUserData', result);
			});
		}
	},
	getOtherUser:function(){
		return Session.get('singleMessageUserData');
	},
	isCurrentUser:function(id){
		if (id === Meteor.userId())
			return true;
	}
});
Template.message_single_page.events({
	'click .single_message_send_reply':function(event){
		if ($('.message_single_reply_container_inner').text().length > 0)
			Meteor.call('singleMessageReply', Session.get('singleMessageId'), Meteor.userId(),$('.message_single_reply_container_inner').html(), function(err, result){
				if (!err){
					$('.message_single_reply_container_inner').html('');
					setTimeout(function(){$('.message_single_messages_container')[0].scrollTop = $('.message_single_messages_container')[0].scrollHeight;}, 250)
				}
			});
	}
});