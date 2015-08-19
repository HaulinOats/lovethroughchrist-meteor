Router.route('/', {
  template:'home_page'
});
Router.route('/my-account', {
  template:'account_page'
});
Router.route('/my-profile', {
  template:'my_profile_page'
});
Router.route('/search', {
  template:'search_page',
  onBeforeAction:function(){
    Meteor.call('searchInit', Meteor.userId(), function(err, result){
      if (!err)
        Session.set('searchUsers', result);
    })
    this.next();
  }
});
Router.route('/search/:_id', {
  template:'user_profile',
  onBeforeAction:function(){
    Meteor.call('getSearchUser', this.params._id, function(err, result){
      if (!err)
        Session.set('currentSearchUser', result);
    })
    this.next();
  }
});
Router.route('/messages', {
  template:'messages_page',
  onBeforeAction:function(){
    // Meteor.call('getAllMessages', Meteor.userId(), function(err, result){
    //   if (!err){
    //     console.log(result);
    //     Session.set('allMessages', result);
    //   }
    // });
    // Meteor.call('getSentMessages', Meteor.userId(), function(err, result){
    //   if (!err)
    //     Session.set('sentMessages', result);
    // })
    this.next();
  },
  waitOn:function(){
    return [Meteor.subscribe("allUserMessages")];
  }
});
Router.route('/admin', {
  template:'admin_page',
  onBeforeAction:function(){
    if (Meteor.user() && Meteor.user().profile.email !== 'midgitsuu@gmail.com')
      Router.go('/');
    this.next();
  }
});

//Router Pre-Hook
Router.onBeforeAction(function () {
  if (!Meteor.userId())
    this.render('home_page');
  else {
  	//Check last online
    if (Meteor.user()) {
      	console.log(Meteor.user());
      	//if more than 15 minutes since time 'lastOnline' was set
    	if ((Date.now() - Meteor.user().profile.lastOnline) > 900000)
    		Meteor.call('setLastOnlineAndAge', Meteor.userId());
  	}
    this.next();
  }
});