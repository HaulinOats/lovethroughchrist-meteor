Template.admin_page.events({
	'click .seed_users':function(event){
		Meteor.call('seedUsers', function(err, result){
			if (!err)
				alert('users seeded');
		});
	},
	'click .seed_messages':function(event){
		Meteor.call('seedMessages', function(err, result){
			if (!err)
				alert('messages seeded');
		});
	}
});