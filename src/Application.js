import device;

import scene, effects;
import communityart as art;

import ui.TextView;
import scene.ui.ButtonView as ButtonView;
import scene.ui.UIView as UIView;

import .TitleScreen;
import .ArtConfig;
import .Attributes;
import .Strings;
import .Menu;
import .hud;
//import .pausemenu;
//import .Planet;

scene.state.add('splash', function() {
  scene.setScaleOptions(SCREEN_W, SCREEN_H, "LOCK_WIDTH");
  scene.addBackground({ url: "resources/splash/portrait2048.png", width: 720, height: 1280 });
  scene.preload("resources/images", function () {
    scene.background.reset();
    scene.state.remove('splash');
    EnterTitleScreen();
  }, { minDelay: 3000 });
});

exports = scene(function() {
  logger.log('Enter Game Screen');
  scene.addBackground({ url: "resources/images/background.png" });
  var pause_menu;
  /**************************************
  * LOADING PERSISTENT DATA
  ***************************************/
  var current_level = 0;
  var game_data = JSON.parse(localStorage.getItem('game_data'));
  if (game_data == null || game_data.current_level == undefined){
    localStorage.setItem('game_data', JSON.stringify({
      "current_level" : 0,
      "hightest_level" : 0,
      "soundOn" : true
    }));
    game_data = JSON.parse(localStorage.getItem('game_data'));
  } else {
    if (game_data.current_level != undefined){
    current_level = game_data.current_level;
    } else {
      current_level = 0;
    }
  }

  hud.SetSuperView(scene.ui);
  hud.SetLevel(current_level);
  hud.show();
  /***********************************************/

  /************************************************
  * LOADING GAME OBJECTS
  *************************************************/
  var earth = scene.addActor(art(ART_PLANET));
  var collisionGroup = scene.addGroup();
  var rotation_speed = 65;  // default rotation speed
  // Load map
  var level_data = JSON.parse(CACHE[ARR_LEVELS[current_level % (ARR_LEVELS.length)]]);
  logger.log("current level", current_level, ARR_LEVELS.length, current_level % ARR_LEVELS.length, ARR_LEVELS[current_level % ARR_LEVELS.length]);
  rotation_speed = parseInt(level_data.LevelData.Rotate);

  var planet_object_data;
  if (level_data.LevelData.PlanetObjects.ObjectData != undefined){
    planet_object_data = level_data.LevelData.PlanetObjects.ObjectData;
    planet_object_data.forEach(function(obj_data){
      if (obj_data.type == "Building") {
        var obj = collisionGroup.addActor(art(obj_data.name));
        obj.rotation = parseFloat(obj_data.angle) * DEG_TO_RAD;
        logger.log(obj.rotation, obj.uid);
      }
    });
    logger.log("collision", collisionGroup.getTotalCount(), collisionGroup);
  }

  if (Array.isArray(level_data.LevelData.PlayingObjects.ObjectData)){
    var playing_object_data = level_data.LevelData.PlayingObjects.ObjectData;
  } else {
    var playing_object_data = [];
    playing_object_data.push(level_data.LevelData.PlayingObjects.ObjectData);
  }
  logger.log("playing_object_data", playing_object_data.length);
  var dropping_object_data = playing_object_data.shift();
  var dropping_object = scene.addActor(art(dropping_object_data.name));
  dropping_object.x = OBJECT_START_POSITION_X - dropping_object.view.height / 2;
  dropping_object.y = OBJECT_START_POSITION_Y;
  hud.SetOnPauseButton(function(){
    Pause();
  });
  hud.SetTextRemain(playing_object_data.length + 1);
  /*************************************************/

  /****************************************************
  * UPDATE FUNCTION
  ****************************************************/
  var game_state = GS_PLAYING;
  var isCollided = false;
  var timeCount = 0;
  var timeDest = 0;
  scene.onTick(function(dt){
    timeCount += dt;
    if (timeCount > timeDest){
      timeDest += 1000;
    }
    switch(game_state){
      case GS_DROPPING:
        dropping_object.y += DROPPING_SPEED;
        logger.log(collisionGroup.getActiveCount());
        collisionGroup.onAllCollisions(dropping_object, function(obj){
          game_state = GS_COLLIDED;
          scene.playSound(SFX_EXPLODE);
          effects.explode(dropping_object);
          effects.explode(obj);
          dropping_object.destroy();
          obj.destroy();
        }, this);
        if (dropping_object.y >= PLANET_POSITION_Y - PLANET_RADIUS) {
          game_state = GS_PLAYING;
          scene.playSound(SFX_HIT);
          dropping_object.destroy();
          collisionGroup.addActor(art(dropping_object_data.name));
          if (playing_object_data.length > 0){
            dropping_object_data = playing_object_data.shift();
            dropping_object = scene.addActor(art(dropping_object_data.name));
            dropping_object.x = OBJECT_START_POSITION_X - dropping_object.view.height / 2;
            dropping_object.y = OBJECT_START_POSITION_Y;
            hud.SetTextRemain(playing_object_data.length + 1);
          } else {
            game_state = GS_GAMEOVER;
          }
        }
      case GS_PLAYING:
        var speed = rotation_speed * dt * DEG_TO_RAD / 1000;
        rotate(speed);
        break;
      case GS_COLLIDED:
        isCollided = true;
        game_state = GS_GAMEOVER;
        break;
      case GS_GAMEOVER:
        if (!isCollided){
          current_level++;
          game_data.current_level = current_level;
          if (game_data.hightest_level < current_level){
            game_data.hightest_level = current_level;
          }
          localStorage.setItem('game_data', JSON.stringify(game_data));
        }
        setTimeout(function(){
          CreateMenuEndGame();
        }, MENU_END_GAME_TIMEOUT);
        game_state = GS_GOMENU;
        break;
      case GS_GOMENU:
        break;
    }
  });
  
  scene.screen.onDown(function(){
    logger.log('touch ', game_state);
    switch(game_state){
      case GS_PLAYING:
        logger.log('dropping');
        game_state = GS_DROPPING;
        break;
      case GS_GOMENU:
        break;
    }
  });
  /******************************************************/

  var rotate = function(speed){
    earth.rotation += speed;
    collisionGroup.forEachActiveActor(function(rot_obj){
      rot_obj.rotation += speed;
      var rotation_angle = rot_obj.rotation - Math.PI / 2;
      var rotation_radius = PLANET_RADIUS + rot_obj.view.height / 2;
      if (rot_obj != earth){
        rot_obj.x = PLANET_POSITION_X - rot_obj.view.width / 2 + rotation_radius * Math.cos(rotation_angle);
        rot_obj.y = PLANET_POSITION_Y - rot_obj.view.height / 2 + rotation_radius * Math.sin(rotation_angle);
      }
    }, this);
  }

  var CreateMenuEndGame = function(){
    ClearScene();
    hud.hide();
    var menu = new Menu({
      superview: scene.ui,
      width: SCREEN_W,
      height: SCREEN_H,
      title: (!isCollided)?"Level Completed!":"Level Failed!",
    });
    menu.addButton({
      image: (!isCollided) ? STR_IMG_BUTTON_NEXT_LEVEL : STR_IMG_BUTTON_RETRY,
      pressedImage: (!isCollided) ? STR_IMG_BUTTON_NEXT_LEVEL_PRESSED : STR_IMG_BUTTON_RETRY_PRESSED,
      x: SCREEN_CENTER_X + UI_BUTTON_SMALL / 1.5,
      y: SCREEN_CENTER_Y + UI_BUTTON_SMALL / 1.5,
      width: UI_BUTTON_SMALL,
      height: UI_BUTTON_SMALL,
      offsetX: -UI_BUTTON_SMALL/2,
    }, function(){
      scene.reset();
    });
    menu.addButton({
      image: STR_IMG_BUTTON_HOME,
      pressedImage: STR_IMG_BUTTON_HOME_PRESSED,
      x: SCREEN_CENTER_X - UI_BUTTON_SMALL / 1.5,
      y: SCREEN_CENTER_Y + UI_BUTTON_SMALL / 1.5,
      width: UI_BUTTON_SMALL,
      height: UI_BUTTON_SMALL,
      offsetX: -UI_BUTTON_SMALL/2,
    }, function(){
      menu.destroy();
      EnterTitleScreen();
    });
  };

  var ClearScene = function(){
//    scene.groups.forEach(function(obj){
//      obj.destroy();
//    });
//    scene.group.destroy();
  };

  var CreatePauseMenu = function(){
    logger.log('create pause menu', pause_menu);
    pause_menu = new Menu({
      superview: scene.ui,
      title: 'Pause',
      width: SCREEN_W,
      height: SCREEN_H
    });
    pause_menu.addButton({
      image: STR_IMG_BUTTON_PLAY,
      pressedImage: STR_IMG_BUTTON_PLAY_PRESSED,
      x: SCREEN_CENTER_X,
      y: SCREEN_CENTER_Y + UI_BUTTON_SMALL / 2,
      width: UI_BUTTON_SMALL,
      height: UI_BUTTON_SMALL,
      offsetX: -UI_BUTTON_SMALL/2,
    }, function(){
      Resume();
    });
    pause_menu.addButton({
      image: STR_IMG_BUTTON_HOME,
      pressedImage: STR_IMG_BUTTON_HOME_PRESSED,
      x: SCREEN_CENTER_X - UI_BUTTON_SMALL,
      y: SCREEN_CENTER_Y + UI_BUTTON_SMALL / 2,
      width: UI_BUTTON_SMALL * 0.75,
      height: UI_BUTTON_SMALL * 0.75,
      offsetX: -UI_BUTTON_SMALL * 0.75/2,
    }, function(){
      ClearScene();
      pause_menu.hide();
      EnterTitleScreen();
    });
    pause_menu.addButton({
      image: STR_IMG_BUTTON_RETRY,
      pressedImage: STR_IMG_BUTTON_RETRY_PRESSED,
      x: SCREEN_CENTER_X + UI_BUTTON_SMALL,
      y: SCREEN_CENTER_Y + UI_BUTTON_SMALL / 2,
      width: UI_BUTTON_SMALL * 0.75,
      height: UI_BUTTON_SMALL * 0.75,
      offsetX: -UI_BUTTON_SMALL * 0.75/2,
    }, function(){
      scene.reset();
    });
  };

  var Pause = function(){
    if(game_state == GS_PLAYING){
      hud.hide();
      if (pause_menu == undefined){
        CreatePauseMenu();
      } else {
        pause_menu.show();
      }
      game_state = GS_PAUSE;
    }
  };

  var Resume = function(){
    pause_menu.hide();
    hud.show();
    game_state = GS_PLAYING;
  };
  
  device.setBackButtonHandler(function() {
  logger.log('Back button is pressed!');
    if (game_state == GS_PLAYING){
      Pause();
    }
  }, false);
  
  scene.addSound(SFX_EXPLODE, SFX_PATH);
  scene.addSound(SFX_FIREWORK, SFX_PATH);
  scene.addSound(SFX_HIT, SFX_PATH);
});

var EnterTitleScreen = function(){
  scene.state.add('title_screen', function() {
    logger.log('Enter Title Screen');
    scene.addBackground({ url: "resources/images/background.png" });

    var title_screen = new TitleScreen({
      superview: scene.ui,
      width: SCREEN_W,
      height: SCREEN_H
    });
    title_screen.onButtonPlayClick(function(parent){
      title_screen.destroy();
      scene.state.remove('title_screen');
      scene.state.enter('game');
      scene.reset();
    });
  });
  scene.state.enter('title_screen');
}
