Template.messages_page.helpers({
	getAllMessages:function(){
		return Session.get('allMessages');
	},
	getSentMessages:function(){
		return Session.get('sentMessages');
	}
})