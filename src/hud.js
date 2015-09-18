import scene.ui.UIView as UIView;
import scene.ui.ButtonView as ButtonView;
import communityart as art;
import ui.TextView as TextView;
import .Attributes;

var HUD = Class(UIView, function (supr) {

  this.init = function (opts) {
    opts = merge(opts, {
      superview: scene.ui,
      x: 0,
      y: 0,
      width: SCREEN_W,
      height: SCREEN_H
    });
    supr(this, 'init', [opts]);
    logger.log('create hud');
    this.build();
  };

  this.buttons = {};
  this.texts = {};
  var level = 0;
  
  // Build function
  this.build = function() {
    this.texts['level'] = new TextView(merge(SETTING_HUD_TEXT_LEVEL,{
      superview: this,
      text: level,
    }));
    this.texts['remain'] = new TextView(merge(SETTING_HUD_TEXT_REMAIN, {
      superview: this,
      text: '1'
    }));
//    this.buttons['pause'] = new ButtonView(merge(SETTING_HUD_BUTTON_PAUSE, {
//      superview: this,
//      onClick: this.OnPauseButton,
//    }));
  };
  // End Build function
  var onPauseButtonClickHandler = [];
  
  this.OnPauseButton = function(){
    onPauseButtonClickHandler.forEach(function(evt){ evt(); });
  };
  
  this.SetOnPauseButton = function(cb){
    onPauseButtonClickHandler.push(cb);
  };
  
  this.SetLevel = function(lv){
    logger.log('set level to', lv);
    level = lv;
    this.texts['level'].setText(lv);
  };
  
  this.SetTextRemain = function(rm){
    this.texts['remain'].setText(rm);
  };
  
  this.SetSuperView = function(parent){
    this.updateOpts({ superview: parent });
  };
  
  this.show = function(){
    for(var i in this.buttons){
      this.buttons[i].show();
    }
    for(var i in this.texts){
      this.texts[i].show();
    }
  }
  
  this.hide = function(){
    for(var i in this.buttons){
      this.buttons[i].hide();
    }
    for(var i in this.texts){
      this.texts[i].hide();
    }
  }
  
  this.destroy = function(){
    this.removeAllSubviews ();
    this.removeFromSuperview();
  };
});

exports = new HUD();