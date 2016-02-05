'use strict'

window.onload = function () {
  window.viewerState = {
    '$box': document.querySelector('.box'),
    '$video': document.querySelector('.video'),
    '$source': document.querySelector('.source'),
    '$slider': document.querySelector('.sidebar__slider'),
    '$footer': document.querySelector('.footer'),
    '$btnHelp': document.querySelector('.footer__left__help'),
    '$btnPlay': document.querySelector('.footer__left__play'),
    '$btnVolume': document.querySelector('.footer__left__volume'),
    '$btnQuality': document.querySelector('.footer__left__quality'),
    '$btnScale': document.querySelector('.footer__right__scale'),
    '$btnAlign': document.querySelector('.footer__right__align'),
    '$btnMenuOff': document.querySelector('.footer__right__menu-off'),
    '$btnFullScr': document.querySelector('.footer__right__fullscr'),
    '$btnMenuOn': document.querySelector('.menu_on_off'),
    'active$input': null,
    'highQuality': false,
    'alignVertical': false
  };
  require('./channelSelector.js')
  require('./qualitySelector.js')
  require('./alignSelector.js')
  require('./hideShowMenu.js')
  require('./fullscreen.js')
  require('./videoErrorListener')
//  require('./iPadCheckScreenSize.js')
}
