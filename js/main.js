'use strict'

window.onload = function () {
  window.viewerState = {
    '$box': document.querySelector('.box'),
    '$video': document.querySelector('.video'),
    '$source': document.querySelector('.source'),
    '$sideMenuBox': {
        'object': document.querySelector('.sidebar'),
        'hide': null,                                                   //  function -> void
        'show': null                                                    //  function -> void
    },
    '$slider': document.querySelector('.sidebar__slider'),
    '$footer': {
        'object': document.querySelector('.footer'),
        'hide': null,                                                   //  function -> void
        'show': null,                                                   //  function -> void
        'moveOn': null,                                                 //  function -> void
        'moveOut': null,                                                //  function -> void
        'isMovedOn': false                                              //  boolean
    },
    '$btnHelp':     document.querySelector('.footer__left__help'),
    '$btnPlay':     document.querySelector('.footer__left__play'),
    '$btnVolume':   document.querySelector('.footer__left__volume'),
    '$btnQuality':  document.querySelector('.footer__left__quality'),
    '$btnScale':    document.querySelector('.footer__right__scale_btn'),
    '$btnMenuOff':  document.querySelector('.footer__right__menu-off'),
    '$btnFullScr':  document.querySelector('.footer__right__fullscr'),
    'active$input': null,                                               //  object
    'highQuality': false,                                               //  boolean
    'is$sideMenuBoxHidden': false,                                      //  boolean
    'is$footerHidden': false,                                           //  boolean
    'isVideoWorking': false,                                            //  boolean
    'isFullScreenAllowed': false,                                       //  boolean
    'is_iPad_iPhone': /(iPhone|iPod|iPad).*AppleWebKit/i.test(window.navigator.userAgent),   //  boolean
    'is_iPad_iPhone_inFullScreen': false,                               //  boolean
    'ask$boxInFullScreen': null,                                        //  function -> boolean
    'durationShowHideMenu': 500,                                        //  ms
    'durationScaleSubmenu': 4000,
    'durationFooterAsCtrl': 5000,
    'timerForErrorPage': undefined,
    'classList': {
        'contains': null,
        'add': null,
        'remove': null
     }
  };

  window.viewerState.isVideoWorking = require('./askVideoWorking.js')
  window.viewerState.isFullScreenAllowed = require('./askFullScreen.js')
  window.viewerState.is_iPad_iPhone_inFullScreen = require('./ask_iPad_iPhone_FullScreen.js')
  window.viewerState.ask$boxInFullScreen = require('./ask$boxInFullScreen.js')
  window.viewerState.classList = require('./classList.js')
    
  require('./screenHeight.js')
  require('./setMenuAndFooterMethods.js')
  if(!window.viewerState.is_iPad_iPhone) require('./buttonVolume.js')
  //    Init completed
  require('./channelSelector.js')
  require('./fullscreen.js')
  require('./buttonQuality.js')
  require('./buttonScale.js')
  require('./buttonPlayPause.js')
 //            alert("I am here")
 }