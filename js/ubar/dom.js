'use strict';

var
  handlebars = require('handlebars'),
  when = require('when');

  /**
   * View class responsible for rendering the UBAR banners
   * and hiding and showing the banners.
   *
   * @public
   * @constructor
   *
   * @params {Object} config  Config object for ubar
   */
  var UbarDom = function UbarDom (config) {
    this.MAIN_UBAR_CLASS = config.component_class;
    this.UBAR_SHOW_CLASS = config.ubar_show_class;
    this.UBAR_HIDE_CLASS = config.ubar_hide_class;
    this.body = document.querySelectorAll('body')[0];
  };

  /**
   * Renders a template as the first element inside body.
   *
   * @public
   * @method renderBanner
   * @param  {Object} templateSource The template to render
   */
  UbarDom.prototype.renderBanner = function renderBanner (templateSource) {
    var
      dfd = when.defer(),
      self = this,
      ubarDiv = document.createElement('div');

    when(handlebars.compile(templateSource)).then(function(template) {
      when(template({})).then(function(renderedHtml) {

        ubarDiv.innerHTML = renderedHtml;
        self.body.parentElement.insertBefore(ubarDiv, self.body.firstChild);
        self.banner = document.querySelectorAll('.' + self.MAIN_UBAR_CLASS)[0];

        dfd.resolve();
      });
    });

    return dfd.promise;
  };

  /**
   * Removes ubar banners from the DOM.
   *
   * @public
   * @method removeBanner
   */
  UbarDom.prototype.removeBanner = function removeBanner () {
    if (this.banner && this.banner.parentElement) {
      this.banner.parentElement.remove();
      this.banner = undefined;
    }
  };

  /**
   * Hides the currently displayed banner.
   *
   * TODO: classList not supported in IE8 and IE9
   *
   * @public
   * @method hideBanner
   */
  UbarDom.prototype.hideBanner = function hideBanner () {
    this.banner.classList.remove(this.UBAR_SHOW_CLASS);
    this.banner.classList.add(this.UBAR_HIDE_CLASS);
  };

  /**
   * Shows the currently displayed banner.
   *
   * TODO: classList not supported in IE8 and IE9
   *
   * @public
   * @method showBanner
   */
  UbarDom.prototype.showBanner = function showBanner () {
    this.banner.classList.remove(this.UBAR_HIDE_CLASS);
    this.banner.classList.add(this.UBAR_SHOW_CLASS);
  };

  module.exports = UbarDom;

