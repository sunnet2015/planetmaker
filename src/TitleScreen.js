import scene.ui.UIView as UIView;
import scene.ui.ButtonView as ButtonView;
import communityart as art;

exports = Class(UIView, function (supr) {

  this.init = function (opts, parentui) {
    opts = merge(opts, {
        parent: parentui,
    });
    supr(this, 'init', [opts]);
    this.build();
  };

  this.button_play;
  this.text_title;
  
  // Build function
  this.build = function() {
    this.text_title = this.addImage(art(ART_UI_TEXT_TITLE));
    this.button_play = new ButtonView({
      superview: this,
      image: STR_IMG_BUTTON_PLAY,
      pressedImage: STR_IMG_BUTTON_PLAY_PRESSED,
      x: SCREEN_CENTER_X,
      y: SCREEN_CENTER_Y,
      width: UI_BUTTON_PLAY_SIZE,
      height: UI_BUTTON_PLAY_SIZE,
      offsetX: -UI_BUTTON_PLAY_SIZE/2,
    });
    this.button_play.registerListener('onClick', this.ClickButtonPlay);
  };
  // End Build function
  
  var buttonPlayClickHandler;
  this.onButtonPlayClick = function (cb){
    buttonPlayClickHandler = cb;
  };
  this.ClickButtonPlay = function(){
    buttonPlayClickHandler();
  };
  
  this.destroy = function(){
    this.removeAllSubviews();
    this.removeFromSuperview();
  };
});