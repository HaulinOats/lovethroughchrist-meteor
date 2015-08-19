Template.messages_page.helpers({
	getAllMessages:function(){
		console.log(Messages.find().fetch());
		return Messages.find().fetch();
	},
	getSentMessages:function(){
		return Session.get('sentMessages');
	}
})