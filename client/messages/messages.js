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
		console.log(Session.get('singleMessage'));
		return Session.get('singleMessage');
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
		console.log(id);
		if (id === Meteor.userId())
			return true;
	}
});
Template.message_single_page.events({

});