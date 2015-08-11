Template.search_page.helpers({
	getSearchUsers:function(){
		console.log(Session.get('searchUsers'));
		return Session.get('searchUsers');
	}
});

Template.search_page.events({
	'click .search_page_single_user_outer':function(event){
		Router.go('/search/' + event.currentTarget.attributes.userid.value);
	}
});