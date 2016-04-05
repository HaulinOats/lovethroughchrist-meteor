// Global router config
Router.configure({
  loadingTemplate:'loading',
  trackPageView:true
});

Router.route('/', {
  name: 'home',
  template:'home_page',
  onBeforeAction:function(){
    analytics.page('Home');
    this.next();
  }
});
Router.route('/intro', {
  template:'intro_page',
  onBeforeAction:function(){
    if(Meteor.userId())
      Meteor.call('unsetFirstLogin', Meteor.userId());
    this.next();
  }
});
Router.route('/my-account', {
  template:'account_page',
  onBeforeAction:function(){
    analytics.page('Account');
    this.next();
  }
});
Router.route('/my-profile', {
  template:'my_profile_page',
  onBeforeAction:function(){
    analytics.page('Profile');
    this.next();
  }
});
Router.route('/search', {
  template:'search_page',
  onBeforeAction:function(){
    analytics.page('Search');
    if (Meteor.user()){
      Meteor.call('searchInit', Meteor.userId(), 0, function(err, result){
        if (!err){
          Session.set('searchUsers', result);
          Session.set('searchSkip', 20);
          if (result.length < 20) {
            $('.search_load_more').hide();
            $('.search_end').show();
          }
        }
      });
    }
    this.next();
  }
});
Router.route('/search/:_id', {
  template:'user_profile',
  onBeforeAction:function(){
    analytics.page('Search');
    if (Meteor.userId()){
      delete Session.keys['currentSearchUser'];
      Meteor.call('getSearchUser', this.params._id, function(err, result){
        if (!err) {
          Session.set('currentSearchUser', result);
        }
      });
    }
    this.next();
  }
});
Router.route('/activity', {
  template:'activity_page',
  onBeforeAction:function(){
    analytics.page('Activity');
    this.next();
  },
  waitOn:function(){
    return [Meteor.subscribe("allUserMessages")];
  }
});
Router.route('/messages/:_id', {
  template:"message_single_page",
  onBeforeAction:function(){
    analytics.page('Message');
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
Router.route('/thankyou', {
  template:'thankyou',
  onBeforeAction:function(){
    this.next();
  }
});

//Router Pre-Hook
Router.onBeforeAction(function () {
  if (!Meteor.userId()){
    Router.go('/');
  } else {
  	//Check last online
    if (Meteor.user()) {
       //  console.log('Current User:')
      	console.log(Meteor.user());

      //show new activity notification
      if (Meteor.user().profile.newActivity) {
        if (Meteor.user().profile.newActivity.winks > 0 || Meteor.user().profile.newActivity.messages > 0)
          Session.set('isNewActivity', true);
        else
          Session.set('isNewActivity', false);
      }
      //if more than 15 minutes since time 'lastOnline' was set
    	if ((Date.now() - Meteor.user().profile.lastOnline) > 900000)
    		Meteor.call('setLastOnline', Meteor.userId());
  	}
  }
  this.next();
});