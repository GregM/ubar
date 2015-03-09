(function() {

  var chai = require('chai');
  var moment = require('moment');
  var should = chai.should();
  var Storage = require('../js/ubar/storage');
  var defaultConfig;

  describe("the ubar_storage for UBAR cookie should ", function () {

    beforeEach(function () {
      defaultConfig = {
        ios_app_store_url               : 'https://itunes.apple.com/us/app/appname/id331804452?mt=8',
        ios_app_deep_link               : 'gilt://',
        android_app_store_url           : 'https://www.android.com',
        android_app_deep_link           : 'gilt://',
        windows_app_store_url           : 'https://www.microsoft.com/en-us/mobile/',
        windows_app_deep_link           : 'gilt://',
        sending_template_path           : 'templates/ubar/ubar_sending.handlebars',
        returning_template_path         : 'templates/ubar/ubar_returning',
        enabled_time                    : '1 year',
        disabled_time                   : '2 weeks',
        manage_window_time              : '60 seconds',
        component_class                 : 'component-ubar',
        on_button_class                 : 'ubar-on-button',
        install_class                   : 'ubar-install-app-button',
        off_class                       : 'ubar-off-button',
        open_in_app_class               : 'ubar-open-in-app-button',
        close_button_class              : 'ubar-close-banner-button',
        ubar_show_class                 : 'ubar-show',
        ubar_hide_class                 : 'ubar-hide',
        device_preference_cookie        : 'ubar',
        redirected_cookie               : 'ubar_redirected',
        tracking_sending_banner         : 'sending banner',
        tracking_returning_banner       : 'returning banner',
        tracking_account_location       : 'account',
        tracking_immediate_redirection  : 'user immediately redirected',
        app_store_redirect              : '2 seconds',
        ios_support                     : true,
        min_ios_support                 : 7,
        android_support                 : false,
        min_android_suport              : 4.3,
        windows_mobile_support          : false,
        min_windows_mobile_support      : Infinity
      };

    });

    afterEach(function () {
    });

    it("be false to start", function () {
      var ubar_storage = new Storage(defaultConfig);
      ubar_storage.isEnabled().should.equal(false);
    });
  });

})();