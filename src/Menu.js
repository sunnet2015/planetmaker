import scene.ui.UIView as UIView;
import scene.ui.ButtonView as ButtonView;
import communityart as art;
import ui.TextView as TextView;
import .Attributes;

exports = Class(UIView, function (supr) {

  this.init = function (opts) {
    opts = merge(opts, {
    });
    supr(this, 'init', [opts]);
    this.build(opts.title);
  };

  this.buttons = [];
  this.buttonHandlers = [];
  this.text_title;
  this.background;
  
  // Build function
  this.build = function(title) {
//    this.background = this.addImage(ART_UI_MENU_BG);
    new TextView({
      superview: this,
      backgroundColor: 'rgba(0,0,0,0.5)',
      width: SCREEN_W,
      height: SCREEN_H
    });
    this.text_title = new TextView({
      superview: this,
      text: title,
      color: '#ffffff',
      fontFamily: 'UTM Cookies',
      x: 0,
      y: SCREEN_CENTER_Y - 200,
      width: SCREEN_W,
      height: 200,
//      backgroundColor: 'rgba(0,0,0,0.5)',
      size: 75,
      zIndex: 200
    });
  };
  // End Build function
  
//  this.addBackground = function(){
//    this.background
//  }
  this.addButton = function(opts, cb){
    opts = merge(opts, {
      parent: this,
      zIndex: 201,
      onUp: cb,
    });
    var button = new ButtonView(opts);
//    button.registerListener('onClick', cb);
//    button.registerListener('onClick', cb);
    this.buttons.push(button);
  };
  
  this.OnButton = function(button, evt){
    if (this.buttons.hasOwnProperty(button)){
      this.buttons.registerListener('onClick', evt);
    };
  };
//  
//  this.show = function(){
//    logger.log('show menu', this.text_title);
////    this.text_title.show();
//  };
////  
//  this.hide = function(){
//    logger.log('hide menu');
//    this.reset();
//  };
  
  this.destroy = function(){
    this.removeAllSubviews ();
    this.removeFromSuperview();
  }
});