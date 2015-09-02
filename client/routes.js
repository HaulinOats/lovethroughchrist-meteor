// Global router config
Router.configure({
  loadingTemplate: 'loading'
});

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
    console.log('hi');
    delete Session.keys['searchUsers','searchSkip'];
    if (Meteor.userId()){
      Meteor.call('searchInit', Meteor.userId(), 0, function(err, result){
        if (!err){
          Session.set('searchUsers', result);
          Session.set('searchSkip', 20);
        }
      })
    }
    this.next();
  }
});
Router.route('/search/:_id', {
  template:'user_profile',
  onBeforeAction:function(){
    if (Meteor.userId()){
      delete Session.keys['currentSearchUser'];
      Meteor.call('getSearchUser', this.params._id, function(err, result){
        if (!err) {
          Session.set('currentSearchUser', result);
        }
      })
    }
    this.next();
  }
});
Router.route('/activity', {
  template:'activity_page',
  waitOn:function(){
    return [Meteor.subscribe("allUserMessages")];
  }
});
Router.route('/messages/:_id', {
  template:"message_single_page",
  onBeforeAction:function(){
    Session.set('singleMessageId', this.params._id);
    setTimeout(function(){$('.message_single_messages_container')[0].scrollTop = $('.message_single_messages_container')[0].scrollHeight;},1000);
    this.next();
  },
  waitOn:function(){
    return [Meteor.subscribe("singleUserMessage", this.params._id)];
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