import scene.ui.UIView as UIView;
import scene.ui.ButtonView as ButtonView;
import communityart as art;
import ui.TextView as TextView;
import .Attributes;
import .Menu as Menu;

var PauseMenu = Class(Menu, function(supr){
//  this.buttons = {};
  this.init = function (opts) {
    opts = merge(opts, {
      title: 'Pause',
    });
    supr(this, 'init', [opts]);
    logger.log('create pause menu');
    this.build();
  };
  
  this.build = function(){
    logger.log("text_title", this.text_title);
    this.buttons['resume'] = this.addButton({
      image: STR_IMG_BUTTON_PLAY,
      pressedImage: STR_IMG_BUTTON_PLAY_PRESSED,
      x: SCREEN_CENTER_X,
      y: SCREEN_CENTER_Y + UI_BUTTON_SMALL / 1.5,
      width: UI_BUTTON_SMALL,
      height: UI_BUTTON_SMALL,
      offsetX: -UI_BUTTON_SMALL/2,
    }, function(){
    });
  };
  
});

exports = new PauseMenu();