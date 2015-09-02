Template.search_page.helpers({
	getSearchUsers:function(){
		return Session.get('searchUsers');
	}
});

Template.search_page.events({
	'click .search_page_single_user_outer':function(event){
		window.open('/search/' + event.currentTarget.attributes.userid.value);
	},
	'click .search_tab':function(){
	  delete Session.keys['searchUsers','searchSkip'];
	  $('.search_load_more').show();
	  $('.search_end').hide();
      Meteor.call('searchInit', Meteor.userId(), 0, function(err, result){
        if (!err){
          Session.set('searchUsers', result);
          Session.set('searchSkip', 20);
        }
      })
	},
	'click .search_load_more':function(event){
		Meteor.call('searchInit', Meteor.userId(), Session.get('searchSkip'),function(err, result){
			if (!err){
				var searchUsers = Session.get('searchUsers');
				for (var i = 0, len = result.length; i < len; i++)
					searchUsers.push(result[i]);
				Session.set('searchUsers', searchUsers);
				if (result.length < 20) {
					$('.search_load_more').hide();
					$('.search_end').show();
				} else
					Session.set('searchSkip', Session.get('searchSkip') + 20);
			}
		})
	}
});