//All Messages Page
Template.activity_page.helpers({
	setMessageData:function(){
		var responseIdArr  = [],
			responseMsgArr = [],
			sentIdArr 	   = [],
			sentMsgArr     = [],
	        messages = Messages.find().fetch();
	    for (var i = 0; i < messages.length; i ++) {
        	var otherUserId = null;
        	for (var j = 0; j < messages[i].messages.length; j++){
        		if (messages[i].messages[j].fromUserId !== Meteor.userId())
        			otherUserId = messages[i].messages[j].fromUserId;
        	}
        	if (otherUserId) {
        		responseIdArr.push(otherUserId);
        		responseMsgArr.push(messages[i]);
        	} else{
        		sentIdArr.push(messages[i].to);
        		sentMsgArr.push(messages[i]);
        	}
	    }
	    Meteor.call('getNameAndImage', responseIdArr, function(err, result){
	    	if (!err){
	    		for (var i = 0; i < result.length; i ++)
	    			responseMsgArr[i].userInfo = result[i];
	    		Session.set('inboxMessages', responseMsgArr);
	    	}
	    });
	    Meteor.call('getNameAndImage', sentIdArr, function(err, result){
	    	if (!err){
	    		for (var i = 0; i < result.length; i ++)
	    			sentMsgArr[i].userInfo = result[i];
	    		Session.set('sentMessages', sentMsgArr);
	    	}
	    });
	},
	getInboxMessages:function(){
		return Session.get('inboxMessages');
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
		if(!image) {
			return "./default.png";
		} else {
			return image;
		}
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
	'click .single_message_send_reply, keypress .message_single_reply_container_inner':function(event){
		console.log(event);
		if (event.which === 13 || event.type === "click") {
			if ($('.message_single_reply_container_inner').text().length > 0) {
				var otherUser = Session.get('singleMessageUserData');
				Meteor.call('singleMessageReply', Session.get('singleMessageId'), Meteor.userId(),strip($('.message_single_reply_container_inner').html()), otherUser._id, function(err, result){
					if (!err){
						$('.message_single_reply_container_inner').html('');
						setTimeout(function(){$('.message_single_messages_container')[0].scrollTop = $('.message_single_messages_container')[0].scrollHeight;}, 250)
					}
				});
			}
			function strip(html){
			   var tmp = document.createElement("DIV");
			   tmp.innerHTML = html;
			   return tmp.textContent||tmp.innerText;
			}
		}
	}
});