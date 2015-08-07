Template.admin_page.events({
	'click .seed_users':function(event){
		Meteor.call('seedUsers', function(err, result){
			if (!err)
				console.log(result);
		});
	}
});