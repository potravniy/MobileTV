'use strict'

window.onload = function () {
  window.viewerState = {
    '$box': document.querySelector('.box'),
    '$video': document.querySelector('.video'),
    '$source': document.querySelector('.source'),
    '$sideMenuBox': {
        'object': document.querySelector('.sidebar'),
        'hide': null,                                   //  function -> void
        'show': null                                    //  function -> void
    },
    '$slider': document.querySelector('.sidebar__slider'),
    '$footer': {
        'object': document.querySelector('.footer'),
        'hide': null,                                   //  function -> void
        'show': null                                    //  function -> void
    },
    '$btnHelp':     document.querySelector('.footer__left__help'),
    '$btnPlay':     document.querySelector('.footer__left__play'),
    '$btnVolume':   document.querySelector('.footer__left__volume'),
    '$btnQuality':  document.querySelector('.footer__left__quality'),
    '$btnScale':    document.querySelector('.footer__right__scale_btn'),
    '$btnMenuOff':  document.querySelector('.footer__right__menu-off'),
    '$btnFullScr':  document.querySelector('.footer__right__fullscr'),
    'active$input': null,
    'highQuality': false,
    'is$sideMenuBoxHidden': false,
    'is$footerHidden': false,
    'durationShowHideMenu': 1000,   //  ms
    'durationScaleSubmenu': 4000,
    'durationFooterAsCtrl': 5000,
    'timerForErrorPage': undefined
  };

  window.viewerState.isVideoWorking = require('./askVideoWorking.js')                          //  boolean
  window.viewerState.isFullScreenAllowed = require('./askFullScreen.js')                       //  boolean
  window.viewerState.is_iPad_iPhone = require('./ask_iPad_iPhone.js')                          //  boolean
  window.viewerState.is_iPad_iPhone_inFullScreen = require('./ask_iPad_iPhone_FullScreen.js')  //  boolean
  window.viewerState.ask$boxInFullScreen = require('./ask$boxInFullScreen.js')                 //  function -> boolean
  
  require('./setMenuAndFooterMethods.js')
  require('./channelSelector.js')
//  require('./qualitySelector.js')
  require('./hideShowMenu.js')
  require('./fullscreen.js')
  require('./videoErrorListener')
  require('./footer_buttons.js')
  require('./buttonScale.js')

}