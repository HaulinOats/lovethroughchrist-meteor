Router.route('/', function () {
  this.render('home_page');
});
Router.route('/my-account', function () {
  this.render('account_page');
});
Router.route('/my-profile', function () {
  this.render('my_profile_page');
});
Router.route('/search', function () {
  this.render('search_page');
});
Router.route('/messages', function () {
  this.render('messages_page');
});