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
    '$btnScale':    document.querySelector('.footer__right__scale'),
    '$btnAlign':    document.querySelector('.footer__right__align'),
    '$btnMenuOff':  document.querySelector('.footer__right__menu-off'),
    '$btnFullScr':  document.querySelector('.footer__right__fullscr'),
    '$btnMenuOn':   document.querySelector('.menu_on_off'),                 //  ?
    'isVideoWorking':                   require('./askVideoWorking.js'),            //  boolean
    'isRequestAnimationFrameAllowed':   require('./askAnimationAllowed.js'),        //  boolean
    'isFullScreenAllowed':              require('./askFullScreen.js'),              //  boolean
    'is_iPad_iPhone':                   require('./ask_iPad_iPhone.js'),            //  boolean
    'is_iPad_iPhone_inFullScreen':      require('./ask_iPad_iPhone_FullScreen.js'), //  boolean
    'ask$boxInFullScreen':              require('./ask$boxInFullScreen.js'),        //  function -> boolean
    'active$input': null,
    'highQuality': false,
    'alignVertical': false,
    'is$sideMenuBoxHidden': false,
    'is$footerHidden': false,
  };
  
    //  Set hide() and show() methods for $sideMenuBox and $footer
  if(window.viewerState.isRequestAnimationFrameAllowed) {
    require('./setMenuAndFooterMethodsWithFrame.js')
  } else {
    require('./setMenuAndFooterMethodsWithInterval.js')
  }

  require('./channelSelector.js')
  require('./qualitySelector.js')
  require('./alignSelector.js')
  require('./hideShowMenu.js')
  require('./fullscreen.js')
  require('./videoErrorListener')

}