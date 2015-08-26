//All Messages Page
Template.messages_page.helpers({
	getAllMessages:function(){
		return Session.get('allMessages');
	},
	getSentMessages:function(){
		return Session.get('sentMessages');
	},
	getLastMessage:function(messages){
		return messages[messages.length - 1].body;
	}
});
Template.messages_page.events({
	'click .messages_single_outer_container':function(event){
		Router.go('/messages/' + event.currentTarget.attributes.messageid.value);
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