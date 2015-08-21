Template.messages_page.helpers({
	getAllMessages:function(){
		return Session.get('allMessages');
	},
	getSentMessages:function(){
		return Session.get('sentMessages');
	},
	getNameById:function(toId, fromId){
		if (toId === Meteor.userId()){
			Meteor.call('getNameById', fromId,function(err, result){
				console.log(result);
			});
		} else {
			Meteor.call('getNameById', toId,function(err, result){
				console.log(result);
			});
		}
	}
})