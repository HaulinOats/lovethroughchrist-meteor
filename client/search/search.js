Template.search_page.helpers({
	getSearchUsers:function(){
		console.log(Session.get('searchUsers'));
		return Session.get('searchUsers');
	}
});