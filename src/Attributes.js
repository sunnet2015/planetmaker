import scene, device;

DEV_H = device.height;
DEV_W = device.width;

SCREEN_H = 1280;
SCREEN_W = 720;

SCREEN_CENTER_X = SCREEN_W / 2;
SCREEN_CENTER_Y = SCREEN_H / 2;

WUNIT720 = SCREEN_W / 720;

PLANET_SIZE = 400 * WUNIT720;
PLANET_RADIUS = PLANET_SIZE /2;
PLANET_POSITION_X = SCREEN_CENTER_X;
PLANET_POSITION_Y = SCREEN_H - PLANET_SIZE * 0.75;
var PLANET_ROTATE_SPEED = 25;

OBJECT_START_POSITION_X = SCREEN_CENTER_X;
OBJECT_START_POSITION_Y = 50;
DROPPING_SPEED = 150 * WUNIT720;

MENU_END_GAME_TIMEOUT = 1000;

GS_PLAYING = 'Game_State_Playing';
GS_PAUSE = 'Game_State_Pause';
GS_GAMEOVER = 'Game_State_GameOver';
GS_MAINMENU = 'Game_State_MainMenu';
GS_INIT = 'Game_State_Init';
GS_READY = 'Game_State_Ready';
GS_DROPPING = 'Game_State_Dropping';
GS_COLLIDED = 'Game_State_Collided';
GS_WAITING = 'Game_State_Waiting';
GS_GOMENU = 'Game_State_Game_Over_Menu';
GS_START = 'Game_State_Start';
DEG2RAD = 0.017453292519943295;

UI_BUTTON_PLAY_SIZE = 400;
UI_BUTTON_SMALL = 200;

SETTING_HUD_TEXT_LEVEL = {
  x: 0,
  y: PLANET_POSITION_Y - PLANET_RADIUS - 50,
  width: SCREEN_W,
  height: PLANET_SIZE,
  size: 200,
  fontFamily: 'UTM Cookies',
  verticalAlign: 'middle',
  horizontalAlign: 'center',
  color: '#ffffff',
};

SETTING_HUD_TEXT_REMAIN = {
  x: 25,
  y: 0,
  width: 100,
  height: 100,
  size: 100,
  fontFamily: 'UTM Cookies',
  verticalAlign: 'left',
  horizontalAlign: 'bottom',
  color: '#ffffff',
};

SETTING_HUD_BUTTON_PAUSE = {
  x: SCREEN_W - 125,
  y: 25,
  width: 100,
  height: 75,
  image: STR_IMG_BUTTON_HUD_PAUSE,
  pressedImage: STR_IMG_BUTTON_HUD_PAUSE_PRESSED,
  zIndex: 200,
};

SETTING_BUTTON_RESUME = {
  image: STR_IMG_BUTTON_PLAY,
  pressedImage: STR_IMG_BUTTON_PLAY_PRESSED,
  x: SCREEN_CENTER_X,
  y: SCREEN_CENTER_Y + UI_BUTTON_SMALL / 2,
  width: UI_BUTTON_SMALL * 1.5,
  height: UI_BUTTON_SMALL * 1.5,
  offsetX: -UI_BUTTON_SMALL*1.5/2,
}

TEXT_LEVEL_COMPLETE = {
  y: SCREEN_CENTER_Y - 150 * WUNIT720,
  size: 200 * WUNIT720,
  fontFamily: 'UTM Cookies',
}

MENU_BACKGROUND = {
  width: SCREEN_W,
  height: SCREEN_H
}

SETTING_OFFSCREEN_OBJECT = {
  y: -1000,
  zIndex: 100,
}