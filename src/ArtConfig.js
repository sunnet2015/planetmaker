import communityart as art;
import .Strings, .Attributes;

art.registerConfig('planet', {
  type: 'ImageView',
  opts: {
    url: STR_IMG_PLANET,
    zIndex: 10,
    x: PLANET_POSITION_X,
    y: PLANET_POSITION_Y,
    width: PLANET_SIZE,
    height: PLANET_SIZE,
    offsetX: -PLANET_RADIUS,
    offsetY: -PLANET_RADIUS,
  }
});

art.registerConfig('background',{
  opts: {
    type: 'ImageView',
    url: STR_IMG_BACKGROUND,
  }
});

art.registerConfig('menu_bg',{
  opts: {
    type: 'ImageView',
    url: STR_IMG_MENU_BG,
    x: 0,
    y: 0,
    width: DEV_W,
    height: DEV_H,
    zIndex: 99,
  }
});

art.registerConfig('button_play', {
  opts: {
    type: 'ButtonView',
    url: STR_IMG_BUTTON_PLAY,
    x: SCREEN_CENTER_X,
    y: SCREEN_CENTER_Y + 100 * WUNIT720,
    width: UI_BUTTON_PLAY_SIZE,
    height: UI_BUTTON_PLAY_SIZE,
    offsetX: -UI_BUTTON_PLAY_SIZE/2,
    offsetY: 0,
    zIndex: 100,
  }
});

art.registerConfig('button_retry', {
  opts: {
    type: 'Entity',
    url: STR_IMG_BUTTON_RETRY,
    x: SCREEN_CENTER_X,
    y: SCREEN_CENTER_Y + 100 * WUNIT720,
    width: UI_BUTTON_PLAY_SIZE / 2,
    height: UI_BUTTON_PLAY_SIZE / 2,
    offsetX: -UI_BUTTON_PLAY_SIZE/4,
    offsetY: 0,
    zIndex: 100,
  }
});

art.registerConfig('button_next_level', {
  opts: {
    type: 'ImageView',
    url: STR_IMG_BUTTON_NEXT_LEVEL,
    x: SCREEN_CENTER_X,
    y: SCREEN_CENTER_Y + 100 * WUNIT720,
    width: UI_BUTTON_PLAY_SIZE / 2,
    height: UI_BUTTON_PLAY_SIZE / 2,
    offsetX: -UI_BUTTON_PLAY_SIZE/4,
    offsetY: 0,
    zIndex: 100,
  }
});

art.registerConfig('text_title', {
  opts: {
    type: 'ImageView',
    url: STR_IMG_TEXT_TITLE,
    x: SCREEN_CENTER_X,
    y: SCREEN_CENTER_Y - 100 * WUNIT720,
    width: 600 * WUNIT720,
    height: 390 * WUNIT720,
    offsetX: -300 * WUNIT720,
    offsetY: -390 * WUNIT720,
    zIndex: 100,
  }
});

art.registerConfig('text_level_complete',{
  opts: {
    type: 'ImageView',
    urL: STR_IMG_TEXT_LEVEL_COMPLETE,
    x: SCREEN_CENTER_X,
    y: SCREEN_CENTER_Y,
    width: 621 * WUNIT720,
    width: 55.8 * WUNIT720,
    offsetX: -310.5 * WUNIT720,
    offsetY: -55.8 * WUNIT720,
    zIndex: 150,
  }
});

art.registerConfig('text_level_failed',{
  opts: {
    type: 'ImageView',
    urL: STR_IMG_TEXT_LEVEL_FAILED,
    x: SCREEN_CENTER_X,
    y: SCREEN_CENTER_Y - 100 * WUNIT720,
    width: 509.4 * WUNIT720,
    width: 55.8 * WUNIT720,
    offsetX: -254.7 * WUNIT720,
    offsetY: -55.8 * WUNIT720,
    zIndex: 100,
  }
});

art.registerConfig('House_1_0', {
  type: 'Entity',
  opts: {
    url: STR_ARR_HOUSES[0][0],
    width: 79,
    height: 62,
  }
});

art.registerConfig('House_1_1', {
  type: 'Entity',
  opts: {
    url: STR_ARR_HOUSES[0][1],
    width: 86,
    height: 68,
  }
});

art.registerConfig('House_1_2', {
  type: 'Entity',
  opts: {
    url: STR_ARR_HOUSES[0][2],
    width: 55,
    height: 105,
  }
});

art.registerConfig('House_1_3', {
  type: 'Entity',
  opts: {
    url: STR_ARR_HOUSES[0][3],
    width: 79,
    height: 109,
  }
});

art.registerConfig('House_1_4', {
  type: 'Entity',
  opts: {
    url: STR_ARR_HOUSES[0][4],
    width: 83,
    height: 88,
  }
});

art.registerConfig('House_1_5', {
  type: 'Entity',
  opts: {
    url: STR_ARR_HOUSES[0][5],
    width: 80,
    height: 56,
  }
});

art.registerConfig('House_1_6', {
  type: 'Entity',
  opts: {
    url: STR_ARR_HOUSES[0][6],
    width: 79,
    height: 62,
  }
});

art.registerConfig('House_1_7', {
  type: 'Entity',
  opts: {
    url: STR_ARR_HOUSES[0][7],
    width: 66,
    height: 61,
  }
});

art.registerConfig('House_1_8', {
  type: 'Entity',
  opts: {
    url: STR_ARR_HOUSES[0][8],
    width: 123,
    height: 83,
  }
});

art.registerConfig('House_1_9', {
  type: 'Entity',
  opts: {
    url: STR_ARR_HOUSES[0][9],
    width: 88,
    height: 73,
  }
});

art.registerConfig('Tree_1_1', {
  type: 'Entity',
  opts: {
    url: STR_ARR_TREES[0][0]
  }
});

art.registerConfig('Tree_1_2', {
  type: 'Entity',
  opts: {
    url: STR_ARR_TREES[0][1]
  }
});

art.registerConfig('Tree_1_3', {
  type: 'Entity',
  opts: {
    url: STR_ARR_TREES[0][2]
  }
});

art.registerConfig('Tree_1_4', {
  type: 'Entity',
  opts: {
    url: STR_ARR_TREES[0][3]
  }
});

art.registerConfig('Tree_1_5', {
  type: 'Entity',
  opts: {
    url: STR_ARR_TREES[0][4]
  }
});

art.registerConfig('Tree_1_6', {
  type: 'Entity',
  opts: {
    url: STR_ARR_TREES[0][5]
  }
});

art.registerConfig('Tree_1_7', {
  type: 'Entity',
  opts: {
    url: STR_ARR_TREES[0][6],
  }
});

art.registerConfig('Tree_1_8', {
  type: 'Entity',
  opts: {
    url: STR_ARR_TREES[0][7],
  }
});

art.registerConfig('Tree_1_9', {
  type: 'Entity',
  opts: {
    url: STR_ARR_TREES[0][8],
  }
});

art.registerConfig('Tree_1_10', {
  type: 'Entity',
  opts: {
    url: STR_ARR_TREES[0][9],
  }
});

art.registerConfig('Tree_1_11', {
  type: 'Entity',
  opts: {
    url: STR_ARR_TREES[0][10],
  }
});

art.registerConfig('Tree_1_12', {
  type: 'Entity',
  opts: {
    url: STR_ARR_TREES[0][11],
  }
});

art.registerConfig('Tree_1_13', {
  type: 'Entity',
  opts: {
    url: STR_ARR_TREES[0][12],
  }
});

art.registerConfig('Tree_1_14', {
  type: 'Entity',
  opts: {
    url: STR_ARR_TREES[0][13],
  }
});

art.registerConfig('Tree_1_15', {
  type: 'Entity',
  opts: {
    url: STR_ARR_TREES[0][14],
  }
});

art.registerConfig('Tree_1_0', {
  type: 'Entity',
  opts: {
    url: STR_ARR_TREES[0][15],
  }
});