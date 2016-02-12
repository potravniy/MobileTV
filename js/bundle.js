(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict'

module.exports = function() {
    if (document.fullscreenElement || 
        document.webkitFullscreenElement ||
        document.mozFullScreenElement ||
        document.msFullscreenElement ||
        window.viewerState.is_iPad_iPhone_inFullScreen ) {
        return true
    } else return false
}

},{}],2:[function(require,module,exports){
'use strict'

module.exports = (function () {
    if(typeof window.viewerState.$video.play === 'function' ) {
        console.log('video ok needs to be confirmed')
        return true
    } else {
        console.log('no video')
        return false
    }
})()

},{}],3:[function(require,module,exports){
'use strict'

module.exports = (function () {
    if(window.navigator.userAgent.indexOf('iPad') !== -1 &&
        window.navigator.userAgent.indexOf('Safari') !== -1 )
        {
        return true
    } else if(window.navigator.userAgent.indexOf('iPhone') !== -1 &&
        window.navigator.userAgent.indexOf('Safari') !== -1 ) 
        {
        return true
    } else return false
})()
},{}],4:[function(require,module,exports){
'use strict'

module.exports = (function() {
    if(window.viewerState.is_iPad_iPhone &&
        window.innerHeight >= window.screen.availHeight) 
        {
        return true
    } else return false
})()

},{}],5:[function(require,module,exports){
'use strict'

var $box = window.viewerState.$box
var $video = window.viewerState.$video
var $sideMenuBox = window.viewerState.$sideMenuBox
var $footer = window.viewerState.$footer
var $footer__center = document.querySelector('.footer__center') 
var $btnMenuOff = window.viewerState.$btnMenuOff
var ask$boxInFullScreen = window.viewerState.ask$boxInFullScreen
var durationFooterAsCtrl = window.viewerState.durationFooterAsCtrl
var id = undefined

//  Hides/showes $sideMenuBox and $footer
//  
//                              <-- State | Action -->
//  If -->   $btnMenuOff   $footer        |  EventSource   EventType/state   EventAction                     Handler                Additionaly
//       1.    shown       shown          |   $btnMenuOff   click/none        hide both, set $footerAsCtrl   btnHadler                         
//       3.    hidden      hidden         |   $box          click/none        show $footerAsCtrl             boxHandler                        
//       2.    hidden      $footerAsCtrl  |   $btnMenuOff   click/none        show both                      btnHadler              
//       4.    hidden      $footerAsCtrl  |   none           in 5 sec         hide $footerAsCtrl             boxHandler             shows $footer for 5sec as VideoCtrlPanel                          
//       5.    hidden      $footerAsCtrl  |   $footer       click/none        prolong 5 sec timer            footerHandler          click resets 5sec countdown (for any footer button except $btnMenuOff and $btnFullScr)

$btnMenuOff.addEventListener('click', btnHandler)

function btnHandler(e) {
    e.stopPropagation()
    if(!window.viewerState.is$sideMenuBoxHidden && !window.viewerState.is$footerHidden) {
        $sideMenuBox.hide()
        $footer.hide()
        $box.addEventListener('click', boxHandler)
    } else {
        $sideMenuBox.show()
        $footer.object.classList.remove('ctrl')
        clearTimeout(id)
        $box.removeEventListener('click', boxHandler)
        $footer.object.removeEventListener('click', footerHandler)
    }
}
function boxHandler(e) {
    e.stopPropagation()
    $box.removeEventListener('click', boxHandler)
    showControls()
    id = setTimeout( function(){
             hideControls()
             $box.addEventListener('click', boxHandler)
         } , durationFooterAsCtrl)
}
function footerHandler(e) {
    e.stopPropagation()
    clearTimeout(id)
    id = setTimeout( function(){
             hideControls()
             $footer.object.removeEventListener('click', footerHandler)
             $box.addEventListener('click', boxHandler)
         } , durationFooterAsCtrl)
}
function showControls() {
    $footer.object.addEventListener('click', footerHandler)
    $footer.object.classList.add('ctrl')
    $footer.show()
}
function hideControls() {
    $footer.object.removeEventListener('click', footerHandler)
    $footer.hide()
    setTimeout(function(){
        $footer.object.classList.remove('ctrl')
    }, window.viewerState.durationShowHideMenu)
}

},{}],6:[function(require,module,exports){
'use strict'

var $help = document.querySelector('.help')
var $video = window.viewerState.$video
var $box = window.viewerState.$box

var $btnHelp = window.viewerState.$btnHelp
$btnHelp.addEventListener('click', function(){
    if($help.classList.contains("active")) {
        $help.classList.remove("active")
    } else {
        $help.classList.add("active")
    }
})
},{}],7:[function(require,module,exports){
'use strict'

var $video = window.viewerState.$video
var $btnPlayPause = window.viewerState.$btnPlay
var $svgPlay = document.querySelector('.play')
var $svgPause = document.querySelector('.pause')
if ($video.paused){
    $svgPlay.classList.add("active")
} else {
    $svgPause.classList.add("active")
} 
$btnPlayPause.addEventListener('click', function(){
    if ($video.paused) $video.play() 
    else $video.pause()
})
$video.addEventListener('play', function(){
        $svgPause.classList.add("active")
        $svgPlay.classList.remove("active")
})
$video.addEventListener('pause', function(){
        $svgPlay.classList.add("active")
        $svgPause.classList.remove("active")
})

},{}],8:[function(require,module,exports){
'use strict'

var $btnQuality = window.viewerState.$btnQuality
var $svgQuality = document.querySelector('.footer__left__quality svg')
var link = ''
if (window.viewerState.highQuality) {
  $svgQuality.classList.remove('off')
} else {
  $svgQuality.classList.add('off')
}
$btnQuality.addEventListener('click', function(){
    if (window.viewerState.highQuality) {
        window.viewerState.highQuality = false
        $svgQuality.classList.add('off')
        if (window.viewerState.active$input) {
            link = window.viewerState.active$input.getAttribute('data-link-lq')
            window.viewerState.$video.setAttribute('src', link)
            window.viewerState.$source.setAttribute('src', link)
            window.viewerState.$video.play()
        }
    } else {
        window.viewerState.highQuality = true
        $svgQuality.classList.remove('off')
        if (window.viewerState.active$input) {
            link = window.viewerState.active$input.getAttribute('data-link-hq')
            window.viewerState.$video.setAttribute('src', link)
            window.viewerState.$source.setAttribute('src', link)
            window.viewerState.$video.play()
        }
    }
})

},{}],9:[function(require,module,exports){
'use strict'

//          Scale
var $box = window.viewerState.$box
var $video = window.viewerState.$video
var $btnScale = window.viewerState.$btnScale
var $svgScale = document.querySelector('.scale_btn_svg')
var $btnScaleSubBtnsBox = document.querySelector('.footer__right__scale_subbtns')
var $subBtnUp = document.querySelector('.subbtn__up svg')
var $subBtnDown = document.querySelector('.subbtn__down svg')
var ratio = undefined
var max$videoHeight = undefined
var min$videoHeight = undefined
var step = undefined
var n = undefined
var nMax = 0
var nMin = 0
var id = undefined
var activeID = undefined

$video.addEventListener('loadeddata', scaleRestart)
$video.addEventListener('error', function () {
    clearTimeout(id)
    stopScaling()
    console.log('video error')
})
document.addEventListener('fullscreenchange', scaleRestart)
document.addEventListener('webkitfullscreenchange', scaleRestart)
document.addEventListener('mozfullscreenchange', scaleRestart)
document.addEventListener('MSFullscreenChange', scaleRestart)

function scaleRestart() {
    console.log('Rescale start: ' + (Date.now() - window.viewerState.timerForErrorPage))      
    stopScaling()
    clearTimeout(id)
    id = setTimeout(startScaling, 1500)
}
function startScaling() {
    ratio = $box.clientWidth / $video.offsetWidth
    if(ratio <= 1) {
        min$videoHeight = 100 * ratio   //  %
        nMin = Math.floor((min$videoHeight - 100) / 14)
        nMax = 0
        step = (min$videoHeight - 100) / nMin
        console.log(nMin + ' steps')
        $subBtnDown.style.fill = ''
        $subBtnUp.style.fill = 'rgba(0, 0, 0, 0.5)'
    } else {
        max$videoHeight = 100 * ratio   //  %
        nMax = Math.ceil((max$videoHeight - 100) / 14)
        nMin = 0
        step = (max$videoHeight - 100) / nMax
        console.log(nMax + ' steps')
        $subBtnDown.style.fill = 'rgba(0, 0, 0, 0.5)'
        $subBtnUp.style.fill = ''
    }
    n = 0
    $btnScale.addEventListener('click', btnScaleHandler) 
    $subBtnUp.addEventListener('click', subBtnUpHandler) 
    $subBtnDown.addEventListener('click', subBtnDownHandler) 
}
function stopScaling() {
    ratio = undefined
    max$videoHeight = undefined
    step = undefined
    n = undefined
    $video.style.height = '100%'
    $btnScale.removeEventListener('click', btnScaleHandler) 
    $subBtnUp.removeEventListener('click', subBtnUpHandler) 
    $subBtnDown.removeEventListener('click', subBtnDownHandler)
}
function btnScaleHandler(e){
    if(e.target === $btnScale || e.target === $svgScale) {
        if($btnScaleSubBtnsBox.classList.contains('active')){
            removeActive()
        } else {
            $btnScaleSubBtnsBox.classList.add('active')
            activeID = setTimeout(removeActive, window.viewerState.durationScaleSubmenu)
        }
    }
}
function subBtnUpHandler(){
    if(n < nMax) {
        $video.style.height = 100 + ++n * step + '%'
        if(n === nMax) $subBtnUp.style.fill = 'rgba(0, 0, 0, 0.5)'
        if(n === (nMin + 1)) $subBtnDown.style.fill = ''
        clearTimeout(activeID)
        activeID = setTimeout(removeActive, window.viewerState.durationScaleSubmenu)
    }
}
function subBtnDownHandler(){
    if(n > nMin) {
        $video.style.height = 100 + --n * step + '%'
        if(n === nMin) $subBtnDown.style.fill = 'rgba(0, 0, 0, 0.5)'
        if(n === (nMax - 1)) $subBtnUp.style.fill = ''
        clearTimeout(activeID)
        activeID = setTimeout(removeActive, window.viewerState.durationScaleSubmenu)
    }
}
function removeActive() {
    $btnScaleSubBtnsBox.classList.remove('active')
}
// $video.addEventListener('loadstart', function(){
//     console.log('The loadstart event occurs when the browser starts looking for the specified audio/video. This is when the loading process starts.' + (Date.now() - window.viewerState.timerForErrorPage))
// })
// $video.addEventListener('durationchange', function(){
//     console.log('The durationchange event occurs when the duration data of the specified audio/video is changed.' + (Date.now() - window.viewerState.timerForErrorPage))
// })
// $video.addEventListener('loadedmetadata', function(){
//     console.log('The loadedmetadata event occurs when meta data for the specified audio/video has been loaded.' + (Date.now() - window.viewerState.timerForErrorPage))
// })

// $video.addEventListener('loadeddata', function(){
//     console.log('The loadeddata event occurs when data for the current frame is loaded, but not enough data to play next frame of the specified audio/video.' + (Date.now() - window.viewerState.timerForErrorPage))
// })
// $video.addEventListener('progress', function(){
//     console.log('The progress event occurs when the browser is downloading the specified audio/video.' + (Date.now() - window.viewerState.timerForErrorPage))
// })
// $video.addEventListener('canplay', function(){
//     console.log('The canplay event occurs when the browser can start playing the specified audio/video (when it has buffered enough to begin).' + (Date.now() - window.viewerState.timerForErrorPage))
// })
// $video.addEventListener('canplaythrough', function(){
//     console.log('The canplaythrough event occurs when the browser estimates it can play through the specified audio/video without having to stop for buffering.' + (Date.now() - window.viewerState.timerForErrorPage))
// })

},{}],10:[function(require,module,exports){
"use strict"

var $video = window.viewerState.$video
var $source = window.viewerState.$source
var $slider = window.viewerState.$slider
var $btnMenuOnOf = document.querySelector('.footer__right__menu-off')
var link = ''
var $btns = {
    "ch_1gorodskoy":  document.querySelector("#ch_1gorodskoy"),
    "ch_3tsyfrovoy":  document.querySelector("#ch_3tsyfrovoy"),
    "ch_reporter":    document.querySelector("#ch_reporter"),
    "ch_academia":    document.querySelector("#ch_academia"),
    "ch_a1":          document.querySelector("#ch_a1"),
    "ch_dumskaya":    document.querySelector("#ch_dumskaya"),
    "ch_gtv":         document.querySelector("#ch_gtv"),
    "ch_stv":         document.querySelector("#ch_stv"),
    "ch_ugnayavolna": document.querySelector("#ch_ugnayavolna"),
    "ch_nemo":        document.querySelector("#ch_nemo")
}
$btns.ch_1gorodskoy.setAttribute(  'data-link-lq', "http://77.88.196.133:8081/1tvod/1tvod-abr-lq/playlist.m3u8"    )
$btns.ch_3tsyfrovoy.setAttribute(  'data-link-lq', "http://cdn5.live-tv.od.ua:8081/tv/3tvod-abr-lq/playlist.m3u8"  )
$btns.ch_reporter.setAttribute(    'data-link-lq', "http://cdn4.live-tv.od.ua:8081/tv/31chod-abr-lq/playlist.m3u8" )
$btns.ch_academia.setAttribute(    'data-link-lq', "http://cdn4.live-tv.od.ua:8081/tv/36chod-abr-lq/playlist.m3u8" )
$btns.ch_a1.setAttribute(          'data-link-lq', "http://77.88.196.133:8081/a1od/a1od-abr-lq/playlist.m3u8"      )
$btns.ch_dumskaya.setAttribute(    'data-link-lq', "http://77.88.196.138:8081/dumska/dumska-abr-lq/playlist.m3u8"  )
$btns.ch_gtv.setAttribute(         'data-link-lq', "http://77.88.196.133:8081/a1od/gtvod-abr-lq/playlist.m3u8"     )
$btns.ch_stv.setAttribute(         'data-link-lq', "http://77.88.196.133:8081/stvod/stvod-abr-lq/playlist.m3u8"    )
$btns.ch_ugnayavolna.setAttribute( 'data-link-lq', "http://77.88.196.133:8081/wave/wave-abr-lq/playlist.m3u8"      )
$btns.ch_nemo.setAttribute(        'data-link-lq', "http://77.88.196.133:8081/nemo/mor-sub/playlist.m3u8"          )

$btns.ch_1gorodskoy.setAttribute(  'data-link-hq', "http://77.88.196.133:8081/1tvod/1tvod-abr/playlist.m3u8"       )
$btns.ch_3tsyfrovoy.setAttribute(  'data-link-hq', "http://cdn5.live-tv.od.ua:8081/tv/3tvod-abr/playlist.m3u8"     )
$btns.ch_reporter.setAttribute(    'data-link-hq', "http://cdn4.live-tv.od.ua:8081/tv/31chod-abr/playlist.m3u8"    )
$btns.ch_academia.setAttribute(    'data-link-hq', "http://cdn4.live-tv.od.ua:8081/tv/36chod-abr/playlist.m3u8"    )
$btns.ch_a1.setAttribute(          'data-link-hq', "http://77.88.196.133:8081/a1od/a1od-abr/playlist.m3u8"         )
$btns.ch_dumskaya.setAttribute(    'data-link-hq', "http://77.88.196.138:8081/dumska/dumska-abr/playlist.m3u8"     )
$btns.ch_gtv.setAttribute(         'data-link-hq', "http://77.88.196.133:8081/a1od/gtvod-abr/playlist.m3u8"        )
$btns.ch_stv.setAttribute(         'data-link-hq', "http://77.88.196.133:8081/stvod/stvod-abr/playlist.m3u8"       )
$btns.ch_ugnayavolna.setAttribute( 'data-link-hq', "http://77.88.196.133:8081/wave/wave-abr/playlist.m3u8"         )
$btns.ch_nemo.setAttribute(        'data-link-hq', "http://77.88.196.133:8081/nemo/mor-abr/playlist.m3u8"          )

$slider.addEventListener('click', function(e){
    e.stopPropagation()
    if(e.target.tagName === 'INPUT'){
        if(window.viewerState.active$input === e.target) {
            window.viewerState.active$input.checked = false
            window.viewerState.active$input = null
            $video.style.backgroundSize = ""
            $video.setAttribute('src', '')
            $source.setAttribute('src', '')
            $btnMenuOnOf.style.display = 'none'
        } else {
            window.viewerState.active$input = e.target
            if(window.viewerState.highQuality)  link = e.target.getAttribute('data-link-hq')
            else link = e.target.getAttribute('data-link-lq')
            $video.setAttribute('src', link)
            $source.setAttribute('src', link)
            $video.style.backgroundSize = "0 0"
            if($video.play) $video.play();
            else alert ('video cannot play')
            $btnMenuOnOf.style.display = 'inline-block'
            window.viewerState.timerForErrorPage = Date.now()
        }
    }
})

},{}],11:[function(require,module,exports){
'use strict'

var $box = window.viewerState.$box
var $btnFullScr = window.viewerState.$btnFullScr
var $svgFullScrOn = document.querySelector('.fullscr_on')
var $svgFullScrOff = document.querySelector('.fullscr_off')
var $btnMenuOff = window.viewerState.$btnMenuOff

if ( window.viewerState.isFullScreenAllowed ) {
  $btnMenuOff.style.display = 'none'
  $btnFullScr.addEventListener('click', function () {
      if(window.viewerState.ask$boxInFullScreen()) {
          getOffFullscreen()
          $svgFullScrOn.classList.add("active")
          $svgFullScrOff.classList.remove("active")
      } else {
          goFullScreen()
          $svgFullScrOff.classList.add("active")
          $svgFullScrOn.classList.remove("active")
      }
  })
  
} else if (window.viewerState.is_iPad_iPhone &&
           !window.viewerState.is_iPad_iPhone_inFullScreen) {
    //  Tell him how to switch fulscreen on
    require('./buttonHideShowMenu.js')
} else if (window.viewerState.is_iPad_iPhone_inFullScreen ||
           !window.viewerState.isFullScreenAllowed) {
    $btnFullScr.style.display = 'none';
    require('./buttonHideShowMenu.js')
}

function goFullScreen() {
    if ($box.requestFullscreen) {
        $box.requestFullscreen()
    } else if ($box.mozRequestFullScreen) {
        $box.mozRequestFullScreen()
    } else if ($box.webkitRequestFullscreen) {
        $box.webkitRequestFullscreen()
    } else if ($box.msRequestFullscreen) {
        $box.msRequestFullscreen()
    }
}
function getOffFullscreen() {
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }else if (document.msExitFullscreen) {
	document.msExitFullscreen();
  }
}
// document.addEventListener('fullscreenchange', fullScreenHandler)
// document.addEventListener('webkitfullscreenchange', fullScreenHandler)
// document.addEventListener('mozfullscreenchange', fullScreenHandler)
// document.addEventListener('MSFullscreenChange', fullScreenHandler)

},{"./buttonHideShowMenu.js":5}],12:[function(require,module,exports){
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
    'durationShowHideMenu': 500,   //  ms
    'durationScaleSubmenu': 4000,
    'durationFooterAsCtrl': 5000,
    'timerForErrorPage': undefined
  };

  window.viewerState.isVideoWorking = require('./askVideoWorking.js')                          //  boolean
  window.viewerState.isFullScreenAllowed = false//require('./askFullScreen.js')                       //  boolean
  window.viewerState.is_iPad_iPhone = require('./ask_iPad_iPhone.js')                          //  boolean
  window.viewerState.is_iPad_iPhone_inFullScreen = require('./ask_iPad_iPhone_FullScreen.js')  //  boolean
  window.viewerState.ask$boxInFullScreen = require('./ask$boxInFullScreen.js')                 //  function -> boolean
  
  require('./screenHeight.js')
  require('./setMenuAndFooterMethods.js')
  require('./fullscreen.js')
  require('./buttonInfo.js')
  require('./buttonPlayPause.js')
  require('./buttonQuality.js')
  require('./buttonScale.js')
  require('./channelSelector.js')
  require('./videoErrorListener')
}
},{"./ask$boxInFullScreen.js":1,"./askVideoWorking.js":2,"./ask_iPad_iPhone.js":3,"./ask_iPad_iPhone_FullScreen.js":4,"./buttonInfo.js":6,"./buttonPlayPause.js":7,"./buttonQuality.js":8,"./buttonScale.js":9,"./channelSelector.js":10,"./fullscreen.js":11,"./screenHeight.js":13,"./setMenuAndFooterMethods.js":14,"./videoErrorListener":15}],13:[function(require,module,exports){
'use strict'

setFontSize()
window.addEventListener('resize', setFontSize)
function setFontSize() {
    var fontSize = document.body.clientHeight / 20
    if(document.body.clientHeight > document.body.clientWidth) {
        document.body.style.fontSize = 0.4 * fontSize + 'px'
    } else {
        document.body.style.fontSize = fontSize + 'px'
    }
}
},{}],14:[function(require,module,exports){
'use strict'

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];
for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                || window[vendors[x]+'CancelRequestAnimationFrame'];
}

if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 32 - (currTime - lastTime));  //    Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
//  End rFA polyfill

var $sideMenuBox = window.viewerState.$sideMenuBox
var $footer = window.viewerState.$footer
var duration = window.viewerState.durationShowHideMenu

window.viewerState.$sideMenuBox.hide = function () {
    var startTime = undefined
    requestAnimationFrame(hide)
    function hide(timeStamp) {
        if (!startTime) startTime = timeStamp
        var progress = (timeStamp - startTime) / duration
        if (progress <= 1) {
            $sideMenuBox.object.style.opacity = 1 - progress
            requestAnimationFrame(hide)
        } else {
            $sideMenuBox.object.style.opacity = 0
            $sideMenuBox.object.style.right = '-5em'
            startTime = undefined
            window.viewerState.is$sideMenuBoxHidden = true
        }
    }
}

window.viewerState.$sideMenuBox.show = function () {
    var startTime = undefined
    $sideMenuBox.object.style.right = ''
    requestAnimationFrame(show)
    function show(timeStamp) {
        if (!startTime) startTime = timeStamp
        var progress = (timeStamp - startTime) / duration
        if (progress <= 1) {
            $sideMenuBox.object.style.opacity = progress
            requestAnimationFrame(show)
        } else {
            $sideMenuBox.object.style.opacity = 1
            startTime = undefined
            window.viewerState.is$sideMenuBoxHidden = false
        }
    }
}

window.viewerState.$footer.hide = function () {
    var startTime = undefined
    requestAnimationFrame(hide)
    function hide(timeStamp) {
        if (!startTime) startTime = timeStamp
        var progress = (timeStamp - startTime) / duration
        if (progress <= 1) {
            $footer.object.style.opacity = 1 - progress
            requestAnimationFrame(hide)
        } else {
            $footer.object.style.opacity = 0
            $footer.object.style.bottom = '-14%'
            startTime = undefined
            window.viewerState.is$footerHidden = true
        }
    }
}

window.viewerState.$footer.show = function () {
    var startTime = undefined
    $footer.object.style.bottom = ''
    requestAnimationFrame(show)
    function show(timeStamp) {
        if (!startTime) startTime = timeStamp
        var progress = (timeStamp - startTime) / duration
        if (progress <= 1) {
            $footer.object.style.opacity = progress
            requestAnimationFrame(show)
        } else {
            $footer.object.style.opacity = 1
            startTime = undefined
            window.viewerState.is$footerHidden = false
        }
    }
}

},{}],15:[function(require,module,exports){
'use strict'

var $video = window.viewerState.$video

$video.addEventListener('error', failed)

 function failed(e) {
   // video playback failed - show a message saying why     - from https://dev.w3.org/html5/spec-author-view/video.html#video
   switch (e.target.error.code) {
     case e.target.error.MEDIA_ERR_ABORTED:
       alert('You aborted the video playback.');
       break;
     case e.target.error.MEDIA_ERR_NETWORK:
       alert('A network error caused the video download to fail part-way.');
       break;
     case e.target.error.MEDIA_ERR_DECODE:
       alert('The video playback was aborted due to a corruption problem or because the video used features your browser did not support.');
       break;
     case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
       console.log('The video could not be loaded  ' + (Date.now() - window.viewerState.timerForErrorPage));
       alert('The video could not be loaded, either because the server or network failed or because the format is not supported.');
       break;
     default:
       alert('An unknown error occurred.');
       break;
   }
 }

},{}]},{},[12])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2EwNS9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hc2skYm94SW5GdWxsU2NyZWVuLmpzIiwianMvYXNrVmlkZW9Xb3JraW5nLmpzIiwianMvYXNrX2lQYWRfaVBob25lLmpzIiwianMvYXNrX2lQYWRfaVBob25lX0Z1bGxTY3JlZW4uanMiLCJqcy9idXR0b25IaWRlU2hvd01lbnUuanMiLCJqcy9idXR0b25JbmZvLmpzIiwianMvYnV0dG9uUGxheVBhdXNlLmpzIiwianMvYnV0dG9uUXVhbGl0eS5qcyIsImpzL2J1dHRvblNjYWxlLmpzIiwianMvY2hhbm5lbFNlbGVjdG9yLmpzIiwianMvZnVsbHNjcmVlbi5qcyIsImpzL21haW4uanMiLCJqcy9zY3JlZW5IZWlnaHQuanMiLCJqcy9zZXRNZW51QW5kRm9vdGVyTWV0aG9kcy5qcyIsImpzL3ZpZGVvRXJyb3JMaXN0ZW5lci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2QkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMvQkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM1SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIGlmIChkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCB8fCBcclxuICAgICAgICBkb2N1bWVudC53ZWJraXRGdWxsc2NyZWVuRWxlbWVudCB8fFxyXG4gICAgICAgIGRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbGVtZW50IHx8XHJcbiAgICAgICAgZG9jdW1lbnQubXNGdWxsc2NyZWVuRWxlbWVudCB8fFxyXG4gICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZV9pbkZ1bGxTY3JlZW4gKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSByZXR1cm4gZmFsc2VcclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmKHR5cGVvZiB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvLnBsYXkgPT09ICdmdW5jdGlvbicgKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3ZpZGVvIG9rIG5lZWRzIHRvIGJlIGNvbmZpcm1lZCcpXHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ25vIHZpZGVvJylcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxufSkoKVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmKHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ2lQYWQnKSAhPT0gLTEgJiZcclxuICAgICAgICB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdTYWZhcmknKSAhPT0gLTEgKVxyXG4gICAgICAgIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSBlbHNlIGlmKHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ2lQaG9uZScpICE9PSAtMSAmJlxyXG4gICAgICAgIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ1NhZmFyaScpICE9PSAtMSApIFxyXG4gICAgICAgIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSBlbHNlIHJldHVybiBmYWxzZVxyXG59KSgpIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZSAmJlxyXG4gICAgICAgIHdpbmRvdy5pbm5lckhlaWdodCA+PSB3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0KSBcclxuICAgICAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSByZXR1cm4gZmFsc2VcclxufSkoKVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbnZhciAkYm94ID0gd2luZG93LnZpZXdlclN0YXRlLiRib3hcclxudmFyICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW9cclxudmFyICRzaWRlTWVudUJveCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc2lkZU1lbnVCb3hcclxudmFyICRmb290ZXIgPSB3aW5kb3cudmlld2VyU3RhdGUuJGZvb3RlclxyXG52YXIgJGZvb3Rlcl9fY2VudGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fY2VudGVyJykgXHJcbnZhciAkYnRuTWVudU9mZiA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuTWVudU9mZlxyXG52YXIgYXNrJGJveEluRnVsbFNjcmVlbiA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5hc2skYm94SW5GdWxsU2NyZWVuXHJcbnZhciBkdXJhdGlvbkZvb3RlckFzQ3RybCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5kdXJhdGlvbkZvb3RlckFzQ3RybFxyXG52YXIgaWQgPSB1bmRlZmluZWRcclxuXHJcbi8vICBIaWRlcy9zaG93ZXMgJHNpZGVNZW51Qm94IGFuZCAkZm9vdGVyXHJcbi8vICBcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8LS0gU3RhdGUgfCBBY3Rpb24gLS0+XHJcbi8vICBJZiAtLT4gICAkYnRuTWVudU9mZiAgICRmb290ZXIgICAgICAgIHwgIEV2ZW50U291cmNlICAgRXZlbnRUeXBlL3N0YXRlICAgRXZlbnRBY3Rpb24gICAgICAgICAgICAgICAgICAgICBIYW5kbGVyICAgICAgICAgICAgICAgIEFkZGl0aW9uYWx5XHJcbi8vICAgICAgIDEuICAgIHNob3duICAgICAgIHNob3duICAgICAgICAgIHwgICAkYnRuTWVudU9mZiAgIGNsaWNrL25vbmUgICAgICAgIGhpZGUgYm90aCwgc2V0ICRmb290ZXJBc0N0cmwgICBidG5IYWRsZXIgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbi8vICAgICAgIDMuICAgIGhpZGRlbiAgICAgIGhpZGRlbiAgICAgICAgIHwgICAkYm94ICAgICAgICAgIGNsaWNrL25vbmUgICAgICAgIHNob3cgJGZvb3RlckFzQ3RybCAgICAgICAgICAgICBib3hIYW5kbGVyICAgICAgICAgICAgICAgICAgICAgICAgXHJcbi8vICAgICAgIDIuICAgIGhpZGRlbiAgICAgICRmb290ZXJBc0N0cmwgIHwgICAkYnRuTWVudU9mZiAgIGNsaWNrL25vbmUgICAgICAgIHNob3cgYm90aCAgICAgICAgICAgICAgICAgICAgICBidG5IYWRsZXIgICAgICAgICAgICAgIFxyXG4vLyAgICAgICA0LiAgICBoaWRkZW4gICAgICAkZm9vdGVyQXNDdHJsICB8ICAgbm9uZSAgICAgICAgICAgaW4gNSBzZWMgICAgICAgICBoaWRlICRmb290ZXJBc0N0cmwgICAgICAgICAgICAgYm94SGFuZGxlciAgICAgICAgICAgICBzaG93cyAkZm9vdGVyIGZvciA1c2VjIGFzIFZpZGVvQ3RybFBhbmVsICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuLy8gICAgICAgNS4gICAgaGlkZGVuICAgICAgJGZvb3RlckFzQ3RybCAgfCAgICRmb290ZXIgICAgICAgY2xpY2svbm9uZSAgICAgICAgcHJvbG9uZyA1IHNlYyB0aW1lciAgICAgICAgICAgIGZvb3RlckhhbmRsZXIgICAgICAgICAgY2xpY2sgcmVzZXRzIDVzZWMgY291bnRkb3duIChmb3IgYW55IGZvb3RlciBidXR0b24gZXhjZXB0ICRidG5NZW51T2ZmIGFuZCAkYnRuRnVsbFNjcilcclxuXHJcbiRidG5NZW51T2ZmLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYnRuSGFuZGxlcilcclxuXHJcbmZ1bmN0aW9uIGJ0bkhhbmRsZXIoZSkge1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgaWYoIXdpbmRvdy52aWV3ZXJTdGF0ZS5pcyRzaWRlTWVudUJveEhpZGRlbiAmJiAhd2luZG93LnZpZXdlclN0YXRlLmlzJGZvb3RlckhpZGRlbikge1xyXG4gICAgICAgICRzaWRlTWVudUJveC5oaWRlKClcclxuICAgICAgICAkZm9vdGVyLmhpZGUoKVxyXG4gICAgICAgICRib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBib3hIYW5kbGVyKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkc2lkZU1lbnVCb3guc2hvdygpXHJcbiAgICAgICAgJGZvb3Rlci5vYmplY3QuY2xhc3NMaXN0LnJlbW92ZSgnY3RybCcpXHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KGlkKVxyXG4gICAgICAgICRib3gucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBib3hIYW5kbGVyKVxyXG4gICAgICAgICRmb290ZXIub2JqZWN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZm9vdGVySGFuZGxlcilcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBib3hIYW5kbGVyKGUpIHtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgICRib3gucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBib3hIYW5kbGVyKVxyXG4gICAgc2hvd0NvbnRyb2xzKClcclxuICAgIGlkID0gc2V0VGltZW91dCggZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgIGhpZGVDb250cm9scygpXHJcbiAgICAgICAgICAgICAkYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYm94SGFuZGxlcilcclxuICAgICAgICAgfSAsIGR1cmF0aW9uRm9vdGVyQXNDdHJsKVxyXG59XHJcbmZ1bmN0aW9uIGZvb3RlckhhbmRsZXIoZSkge1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgY2xlYXJUaW1lb3V0KGlkKVxyXG4gICAgaWQgPSBzZXRUaW1lb3V0KCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgaGlkZUNvbnRyb2xzKClcclxuICAgICAgICAgICAgICRmb290ZXIub2JqZWN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZm9vdGVySGFuZGxlcilcclxuICAgICAgICAgICAgICRib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBib3hIYW5kbGVyKVxyXG4gICAgICAgICB9ICwgZHVyYXRpb25Gb290ZXJBc0N0cmwpXHJcbn1cclxuZnVuY3Rpb24gc2hvd0NvbnRyb2xzKCkge1xyXG4gICAgJGZvb3Rlci5vYmplY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmb290ZXJIYW5kbGVyKVxyXG4gICAgJGZvb3Rlci5vYmplY3QuY2xhc3NMaXN0LmFkZCgnY3RybCcpXHJcbiAgICAkZm9vdGVyLnNob3coKVxyXG59XHJcbmZ1bmN0aW9uIGhpZGVDb250cm9scygpIHtcclxuICAgICRmb290ZXIub2JqZWN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZm9vdGVySGFuZGxlcilcclxuICAgICRmb290ZXIuaGlkZSgpXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJGZvb3Rlci5vYmplY3QuY2xhc3NMaXN0LnJlbW92ZSgnY3RybCcpXHJcbiAgICB9LCB3aW5kb3cudmlld2VyU3RhdGUuZHVyYXRpb25TaG93SGlkZU1lbnUpXHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgJGhlbHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVscCcpXHJcbnZhciAkdmlkZW8gPSB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvXHJcbnZhciAkYm94ID0gd2luZG93LnZpZXdlclN0YXRlLiRib3hcclxuXHJcbnZhciAkYnRuSGVscCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuSGVscFxyXG4kYnRuSGVscC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICBpZigkaGVscC5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpIHtcclxuICAgICAgICAkaGVscC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICRoZWxwLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIilcclxuICAgIH1cclxufSkiLCIndXNlIHN0cmljdCdcclxuXHJcbnZhciAkdmlkZW8gPSB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvXHJcbnZhciAkYnRuUGxheVBhdXNlID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5QbGF5XHJcbnZhciAkc3ZnUGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5JylcclxudmFyICRzdmdQYXVzZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYXVzZScpXHJcbmlmICgkdmlkZW8ucGF1c2VkKXtcclxuICAgICRzdmdQbGF5LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIilcclxufSBlbHNlIHtcclxuICAgICRzdmdQYXVzZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpXHJcbn0gXHJcbiRidG5QbGF5UGF1c2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgaWYgKCR2aWRlby5wYXVzZWQpICR2aWRlby5wbGF5KCkgXHJcbiAgICBlbHNlICR2aWRlby5wYXVzZSgpXHJcbn0pXHJcbiR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwbGF5JywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkc3ZnUGF1c2UuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKVxyXG4gICAgICAgICRzdmdQbGF5LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcclxufSlcclxuJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BhdXNlJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkc3ZnUGxheS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpXHJcbiAgICAgICAgJHN2Z1BhdXNlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcclxufSlcclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgJGJ0blF1YWxpdHkgPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0blF1YWxpdHlcclxudmFyICRzdmdRdWFsaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fbGVmdF9fcXVhbGl0eSBzdmcnKVxyXG52YXIgbGluayA9ICcnXHJcbmlmICh3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkpIHtcclxuICAkc3ZnUXVhbGl0eS5jbGFzc0xpc3QucmVtb3ZlKCdvZmYnKVxyXG59IGVsc2Uge1xyXG4gICRzdmdRdWFsaXR5LmNsYXNzTGlzdC5hZGQoJ29mZicpXHJcbn1cclxuJGJ0blF1YWxpdHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgaWYgKHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSkge1xyXG4gICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSA9IGZhbHNlXHJcbiAgICAgICAgJHN2Z1F1YWxpdHkuY2xhc3NMaXN0LmFkZCgnb2ZmJylcclxuICAgICAgICBpZiAod2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dCkge1xyXG4gICAgICAgICAgICBsaW5rID0gd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1scScpXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8ucGxheSgpXHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkgPSB0cnVlXHJcbiAgICAgICAgJHN2Z1F1YWxpdHkuY2xhc3NMaXN0LnJlbW92ZSgnb2ZmJylcclxuICAgICAgICBpZiAod2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dCkge1xyXG4gICAgICAgICAgICBsaW5rID0gd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1ocScpXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8ucGxheSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbi8vICAgICAgICAgIFNjYWxlXHJcbnZhciAkYm94ID0gd2luZG93LnZpZXdlclN0YXRlLiRib3hcclxudmFyICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW9cclxudmFyICRidG5TY2FsZSA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuU2NhbGVcclxudmFyICRzdmdTY2FsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY2FsZV9idG5fc3ZnJylcclxudmFyICRidG5TY2FsZVN1YkJ0bnNCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19yaWdodF9fc2NhbGVfc3ViYnRucycpXHJcbnZhciAkc3ViQnRuVXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3ViYnRuX191cCBzdmcnKVxyXG52YXIgJHN1YkJ0bkRvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3ViYnRuX19kb3duIHN2ZycpXHJcbnZhciByYXRpbyA9IHVuZGVmaW5lZFxyXG52YXIgbWF4JHZpZGVvSGVpZ2h0ID0gdW5kZWZpbmVkXHJcbnZhciBtaW4kdmlkZW9IZWlnaHQgPSB1bmRlZmluZWRcclxudmFyIHN0ZXAgPSB1bmRlZmluZWRcclxudmFyIG4gPSB1bmRlZmluZWRcclxudmFyIG5NYXggPSAwXHJcbnZhciBuTWluID0gMFxyXG52YXIgaWQgPSB1bmRlZmluZWRcclxudmFyIGFjdGl2ZUlEID0gdW5kZWZpbmVkXHJcblxyXG4kdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkZGF0YScsIHNjYWxlUmVzdGFydClcclxuJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24gKCkge1xyXG4gICAgY2xlYXJUaW1lb3V0KGlkKVxyXG4gICAgc3RvcFNjYWxpbmcoKVxyXG4gICAgY29uc29sZS5sb2coJ3ZpZGVvIGVycm9yJylcclxufSlcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZnVsbHNjcmVlbmNoYW5nZScsIHNjYWxlUmVzdGFydClcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsIHNjYWxlUmVzdGFydClcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW96ZnVsbHNjcmVlbmNoYW5nZScsIHNjYWxlUmVzdGFydClcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignTVNGdWxsc2NyZWVuQ2hhbmdlJywgc2NhbGVSZXN0YXJ0KVxyXG5cclxuZnVuY3Rpb24gc2NhbGVSZXN0YXJ0KCkge1xyXG4gICAgY29uc29sZS5sb2coJ1Jlc2NhbGUgc3RhcnQ6ICcgKyAoRGF0ZS5ub3coKSAtIHdpbmRvdy52aWV3ZXJTdGF0ZS50aW1lckZvckVycm9yUGFnZSkpICAgICAgXHJcbiAgICBzdG9wU2NhbGluZygpXHJcbiAgICBjbGVhclRpbWVvdXQoaWQpXHJcbiAgICBpZCA9IHNldFRpbWVvdXQoc3RhcnRTY2FsaW5nLCAxNTAwKVxyXG59XHJcbmZ1bmN0aW9uIHN0YXJ0U2NhbGluZygpIHtcclxuICAgIHJhdGlvID0gJGJveC5jbGllbnRXaWR0aCAvICR2aWRlby5vZmZzZXRXaWR0aFxyXG4gICAgaWYocmF0aW8gPD0gMSkge1xyXG4gICAgICAgIG1pbiR2aWRlb0hlaWdodCA9IDEwMCAqIHJhdGlvICAgLy8gICVcclxuICAgICAgICBuTWluID0gTWF0aC5mbG9vcigobWluJHZpZGVvSGVpZ2h0IC0gMTAwKSAvIDE0KVxyXG4gICAgICAgIG5NYXggPSAwXHJcbiAgICAgICAgc3RlcCA9IChtaW4kdmlkZW9IZWlnaHQgLSAxMDApIC8gbk1pblxyXG4gICAgICAgIGNvbnNvbGUubG9nKG5NaW4gKyAnIHN0ZXBzJylcclxuICAgICAgICAkc3ViQnRuRG93bi5zdHlsZS5maWxsID0gJydcclxuICAgICAgICAkc3ViQnRuVXAuc3R5bGUuZmlsbCA9ICdyZ2JhKDAsIDAsIDAsIDAuNSknXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG1heCR2aWRlb0hlaWdodCA9IDEwMCAqIHJhdGlvICAgLy8gICVcclxuICAgICAgICBuTWF4ID0gTWF0aC5jZWlsKChtYXgkdmlkZW9IZWlnaHQgLSAxMDApIC8gMTQpXHJcbiAgICAgICAgbk1pbiA9IDBcclxuICAgICAgICBzdGVwID0gKG1heCR2aWRlb0hlaWdodCAtIDEwMCkgLyBuTWF4XHJcbiAgICAgICAgY29uc29sZS5sb2cobk1heCArICcgc3RlcHMnKVxyXG4gICAgICAgICRzdWJCdG5Eb3duLnN0eWxlLmZpbGwgPSAncmdiYSgwLCAwLCAwLCAwLjUpJ1xyXG4gICAgICAgICRzdWJCdG5VcC5zdHlsZS5maWxsID0gJydcclxuICAgIH1cclxuICAgIG4gPSAwXHJcbiAgICAkYnRuU2NhbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBidG5TY2FsZUhhbmRsZXIpIFxyXG4gICAgJHN1YkJ0blVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3ViQnRuVXBIYW5kbGVyKSBcclxuICAgICRzdWJCdG5Eb3duLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3ViQnRuRG93bkhhbmRsZXIpIFxyXG59XHJcbmZ1bmN0aW9uIHN0b3BTY2FsaW5nKCkge1xyXG4gICAgcmF0aW8gPSB1bmRlZmluZWRcclxuICAgIG1heCR2aWRlb0hlaWdodCA9IHVuZGVmaW5lZFxyXG4gICAgc3RlcCA9IHVuZGVmaW5lZFxyXG4gICAgbiA9IHVuZGVmaW5lZFxyXG4gICAgJHZpZGVvLnN0eWxlLmhlaWdodCA9ICcxMDAlJ1xyXG4gICAgJGJ0blNjYWxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYnRuU2NhbGVIYW5kbGVyKSBcclxuICAgICRzdWJCdG5VcC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHN1YkJ0blVwSGFuZGxlcikgXHJcbiAgICAkc3ViQnRuRG93bi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHN1YkJ0bkRvd25IYW5kbGVyKVxyXG59XHJcbmZ1bmN0aW9uIGJ0blNjYWxlSGFuZGxlcihlKXtcclxuICAgIGlmKGUudGFyZ2V0ID09PSAkYnRuU2NhbGUgfHwgZS50YXJnZXQgPT09ICRzdmdTY2FsZSkge1xyXG4gICAgICAgIGlmKCRidG5TY2FsZVN1YkJ0bnNCb3guY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSl7XHJcbiAgICAgICAgICAgIHJlbW92ZUFjdGl2ZSgpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJGJ0blNjYWxlU3ViQnRuc0JveC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICBhY3RpdmVJRCA9IHNldFRpbWVvdXQocmVtb3ZlQWN0aXZlLCB3aW5kb3cudmlld2VyU3RhdGUuZHVyYXRpb25TY2FsZVN1Ym1lbnUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHN1YkJ0blVwSGFuZGxlcigpe1xyXG4gICAgaWYobiA8IG5NYXgpIHtcclxuICAgICAgICAkdmlkZW8uc3R5bGUuaGVpZ2h0ID0gMTAwICsgKytuICogc3RlcCArICclJ1xyXG4gICAgICAgIGlmKG4gPT09IG5NYXgpICRzdWJCdG5VcC5zdHlsZS5maWxsID0gJ3JnYmEoMCwgMCwgMCwgMC41KSdcclxuICAgICAgICBpZihuID09PSAobk1pbiArIDEpKSAkc3ViQnRuRG93bi5zdHlsZS5maWxsID0gJydcclxuICAgICAgICBjbGVhclRpbWVvdXQoYWN0aXZlSUQpXHJcbiAgICAgICAgYWN0aXZlSUQgPSBzZXRUaW1lb3V0KHJlbW92ZUFjdGl2ZSwgd2luZG93LnZpZXdlclN0YXRlLmR1cmF0aW9uU2NhbGVTdWJtZW51KVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHN1YkJ0bkRvd25IYW5kbGVyKCl7XHJcbiAgICBpZihuID4gbk1pbikge1xyXG4gICAgICAgICR2aWRlby5zdHlsZS5oZWlnaHQgPSAxMDAgKyAtLW4gKiBzdGVwICsgJyUnXHJcbiAgICAgICAgaWYobiA9PT0gbk1pbikgJHN1YkJ0bkRvd24uc3R5bGUuZmlsbCA9ICdyZ2JhKDAsIDAsIDAsIDAuNSknXHJcbiAgICAgICAgaWYobiA9PT0gKG5NYXggLSAxKSkgJHN1YkJ0blVwLnN0eWxlLmZpbGwgPSAnJ1xyXG4gICAgICAgIGNsZWFyVGltZW91dChhY3RpdmVJRClcclxuICAgICAgICBhY3RpdmVJRCA9IHNldFRpbWVvdXQocmVtb3ZlQWN0aXZlLCB3aW5kb3cudmlld2VyU3RhdGUuZHVyYXRpb25TY2FsZVN1Ym1lbnUpXHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gcmVtb3ZlQWN0aXZlKCkge1xyXG4gICAgJGJ0blNjYWxlU3ViQnRuc0JveC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG59XHJcbi8vICR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdsb2Fkc3RhcnQnLCBmdW5jdGlvbigpe1xyXG4vLyAgICAgY29uc29sZS5sb2coJ1RoZSBsb2Fkc3RhcnQgZXZlbnQgb2NjdXJzIHdoZW4gdGhlIGJyb3dzZXIgc3RhcnRzIGxvb2tpbmcgZm9yIHRoZSBzcGVjaWZpZWQgYXVkaW8vdmlkZW8uIFRoaXMgaXMgd2hlbiB0aGUgbG9hZGluZyBwcm9jZXNzIHN0YXJ0cy4nICsgKERhdGUubm93KCkgLSB3aW5kb3cudmlld2VyU3RhdGUudGltZXJGb3JFcnJvclBhZ2UpKVxyXG4vLyB9KVxyXG4vLyAkdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignZHVyYXRpb25jaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG4vLyAgICAgY29uc29sZS5sb2coJ1RoZSBkdXJhdGlvbmNoYW5nZSBldmVudCBvY2N1cnMgd2hlbiB0aGUgZHVyYXRpb24gZGF0YSBvZiB0aGUgc3BlY2lmaWVkIGF1ZGlvL3ZpZGVvIGlzIGNoYW5nZWQuJyArIChEYXRlLm5vdygpIC0gd2luZG93LnZpZXdlclN0YXRlLnRpbWVyRm9yRXJyb3JQYWdlKSlcclxuLy8gfSlcclxuLy8gJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZG1ldGFkYXRhJywgZnVuY3Rpb24oKXtcclxuLy8gICAgIGNvbnNvbGUubG9nKCdUaGUgbG9hZGVkbWV0YWRhdGEgZXZlbnQgb2NjdXJzIHdoZW4gbWV0YSBkYXRhIGZvciB0aGUgc3BlY2lmaWVkIGF1ZGlvL3ZpZGVvIGhhcyBiZWVuIGxvYWRlZC4nICsgKERhdGUubm93KCkgLSB3aW5kb3cudmlld2VyU3RhdGUudGltZXJGb3JFcnJvclBhZ2UpKVxyXG4vLyB9KVxyXG5cclxuLy8gJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZGRhdGEnLCBmdW5jdGlvbigpe1xyXG4vLyAgICAgY29uc29sZS5sb2coJ1RoZSBsb2FkZWRkYXRhIGV2ZW50IG9jY3VycyB3aGVuIGRhdGEgZm9yIHRoZSBjdXJyZW50IGZyYW1lIGlzIGxvYWRlZCwgYnV0IG5vdCBlbm91Z2ggZGF0YSB0byBwbGF5IG5leHQgZnJhbWUgb2YgdGhlIHNwZWNpZmllZCBhdWRpby92aWRlby4nICsgKERhdGUubm93KCkgLSB3aW5kb3cudmlld2VyU3RhdGUudGltZXJGb3JFcnJvclBhZ2UpKVxyXG4vLyB9KVxyXG4vLyAkdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBmdW5jdGlvbigpe1xyXG4vLyAgICAgY29uc29sZS5sb2coJ1RoZSBwcm9ncmVzcyBldmVudCBvY2N1cnMgd2hlbiB0aGUgYnJvd3NlciBpcyBkb3dubG9hZGluZyB0aGUgc3BlY2lmaWVkIGF1ZGlvL3ZpZGVvLicgKyAoRGF0ZS5ub3coKSAtIHdpbmRvdy52aWV3ZXJTdGF0ZS50aW1lckZvckVycm9yUGFnZSkpXHJcbi8vIH0pXHJcbi8vICR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5JywgZnVuY3Rpb24oKXtcclxuLy8gICAgIGNvbnNvbGUubG9nKCdUaGUgY2FucGxheSBldmVudCBvY2N1cnMgd2hlbiB0aGUgYnJvd3NlciBjYW4gc3RhcnQgcGxheWluZyB0aGUgc3BlY2lmaWVkIGF1ZGlvL3ZpZGVvICh3aGVuIGl0IGhhcyBidWZmZXJlZCBlbm91Z2ggdG8gYmVnaW4pLicgKyAoRGF0ZS5ub3coKSAtIHdpbmRvdy52aWV3ZXJTdGF0ZS50aW1lckZvckVycm9yUGFnZSkpXHJcbi8vIH0pXHJcbi8vICR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIGZ1bmN0aW9uKCl7XHJcbi8vICAgICBjb25zb2xlLmxvZygnVGhlIGNhbnBsYXl0aHJvdWdoIGV2ZW50IG9jY3VycyB3aGVuIHRoZSBicm93c2VyIGVzdGltYXRlcyBpdCBjYW4gcGxheSB0aHJvdWdoIHRoZSBzcGVjaWZpZWQgYXVkaW8vdmlkZW8gd2l0aG91dCBoYXZpbmcgdG8gc3RvcCBmb3IgYnVmZmVyaW5nLicgKyAoRGF0ZS5ub3coKSAtIHdpbmRvdy52aWV3ZXJTdGF0ZS50aW1lckZvckVycm9yUGFnZSkpXHJcbi8vIH0pXHJcbiIsIlwidXNlIHN0cmljdFwiXHJcblxyXG52YXIgJHZpZGVvID0gd2luZG93LnZpZXdlclN0YXRlLiR2aWRlb1xyXG52YXIgJHNvdXJjZSA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc291cmNlXHJcbnZhciAkc2xpZGVyID0gd2luZG93LnZpZXdlclN0YXRlLiRzbGlkZXJcclxudmFyICRidG5NZW51T25PZiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX3JpZ2h0X19tZW51LW9mZicpXHJcbnZhciBsaW5rID0gJydcclxudmFyICRidG5zID0ge1xyXG4gICAgXCJjaF8xZ29yb2Rza295XCI6ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoXzFnb3JvZHNrb3lcIiksXHJcbiAgICBcImNoXzN0c3lmcm92b3lcIjogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfM3RzeWZyb3ZveVwiKSxcclxuICAgIFwiY2hfcmVwb3J0ZXJcIjogICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9yZXBvcnRlclwiKSxcclxuICAgIFwiY2hfYWNhZGVtaWFcIjogICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9hY2FkZW1pYVwiKSxcclxuICAgIFwiY2hfYTFcIjogICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9hMVwiKSxcclxuICAgIFwiY2hfZHVtc2theWFcIjogICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9kdW1za2F5YVwiKSxcclxuICAgIFwiY2hfZ3R2XCI6ICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9ndHZcIiksXHJcbiAgICBcImNoX3N0dlwiOiAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfc3R2XCIpLFxyXG4gICAgXCJjaF91Z25heWF2b2xuYVwiOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX3VnbmF5YXZvbG5hXCIpLFxyXG4gICAgXCJjaF9uZW1vXCI6ICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX25lbW9cIilcclxufVxyXG4kYnRucy5jaF8xZ29yb2Rza295LnNldEF0dHJpYnV0ZSggICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvMXR2b2QvMXR2b2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICApXHJcbiRidG5zLmNoXzN0c3lmcm92b3kuc2V0QXR0cmlidXRlKCAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovL2NkbjUubGl2ZS10di5vZC51YTo4MDgxL3R2LzN0dm9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgIClcclxuJGJ0bnMuY2hfcmVwb3J0ZXIuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vY2RuNC5saXZlLXR2Lm9kLnVhOjgwODEvdHYvMzFjaG9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgKVxyXG4kYnRucy5jaF9hY2FkZW1pYS5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly9jZG40LmxpdmUtdHYub2QudWE6ODA4MS90di8zNmNob2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiApXHJcbiRidG5zLmNoX2ExLnNldEF0dHJpYnV0ZSggICAgICAgICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9hMW9kL2Exb2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICAgIClcclxuJGJ0bnMuY2hfZHVtc2theWEuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzODo4MDgxL2R1bXNrYS9kdW1za2EtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgKVxyXG4kYnRucy5jaF9ndHYuc2V0QXR0cmlidXRlKCAgICAgICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvYTFvZC9ndHZvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiICAgICApXHJcbiRidG5zLmNoX3N0di5zZXRBdHRyaWJ1dGUoICAgICAgICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9zdHZvZC9zdHZvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiICAgIClcclxuJGJ0bnMuY2hfdWduYXlhdm9sbmEuc2V0QXR0cmlidXRlKCAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL3dhdmUvd2F2ZS1hYnItbHEvcGxheWxpc3QubTN1OFwiICAgICAgKVxyXG4kYnRucy5jaF9uZW1vLnNldEF0dHJpYnV0ZSggICAgICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvbmVtby9tb3Itc3ViL3BsYXlsaXN0Lm0zdThcIiAgICAgICAgICApXHJcblxyXG4kYnRucy5jaF8xZ29yb2Rza295LnNldEF0dHJpYnV0ZSggICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvMXR2b2QvMXR2b2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICApXHJcbiRidG5zLmNoXzN0c3lmcm92b3kuc2V0QXR0cmlidXRlKCAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovL2NkbjUubGl2ZS10di5vZC51YTo4MDgxL3R2LzN0dm9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgIClcclxuJGJ0bnMuY2hfcmVwb3J0ZXIuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vY2RuNC5saXZlLXR2Lm9kLnVhOjgwODEvdHYvMzFjaG9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgKVxyXG4kYnRucy5jaF9hY2FkZW1pYS5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly9jZG40LmxpdmUtdHYub2QudWE6ODA4MS90di8zNmNob2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICApXHJcbiRidG5zLmNoX2ExLnNldEF0dHJpYnV0ZSggICAgICAgICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9hMW9kL2Exb2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICAgIClcclxuJGJ0bnMuY2hfZHVtc2theWEuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzODo4MDgxL2R1bXNrYS9kdW1za2EtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgKVxyXG4kYnRucy5jaF9ndHYuc2V0QXR0cmlidXRlKCAgICAgICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvYTFvZC9ndHZvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgICApXHJcbiRidG5zLmNoX3N0di5zZXRBdHRyaWJ1dGUoICAgICAgICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9zdHZvZC9zdHZvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgIClcclxuJGJ0bnMuY2hfdWduYXlhdm9sbmEuc2V0QXR0cmlidXRlKCAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL3dhdmUvd2F2ZS1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgICAgKVxyXG4kYnRucy5jaF9uZW1vLnNldEF0dHJpYnV0ZSggICAgICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvbmVtby9tb3ItYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICAgICApXHJcblxyXG4kc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICBpZihlLnRhcmdldC50YWdOYW1lID09PSAnSU5QVVQnKXtcclxuICAgICAgICBpZih3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0ID09PSBlLnRhcmdldCkge1xyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0LmNoZWNrZWQgPSBmYWxzZVxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0ID0gbnVsbFxyXG4gICAgICAgICAgICAkdmlkZW8uc3R5bGUuYmFja2dyb3VuZFNpemUgPSBcIlwiXHJcbiAgICAgICAgICAgICR2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsICcnKVxyXG4gICAgICAgICAgICAkc291cmNlLnNldEF0dHJpYnV0ZSgnc3JjJywgJycpXHJcbiAgICAgICAgICAgICRidG5NZW51T25PZi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dCA9IGUudGFyZ2V0XHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSkgIGxpbmsgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1ocScpXHJcbiAgICAgICAgICAgIGVsc2UgbGluayA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWxxJylcclxuICAgICAgICAgICAgJHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgICAgICAgJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgICAgICAgICR2aWRlby5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9IFwiMCAwXCJcclxuICAgICAgICAgICAgaWYoJHZpZGVvLnBsYXkpICR2aWRlby5wbGF5KCk7XHJcbiAgICAgICAgICAgIGVsc2UgYWxlcnQgKCd2aWRlbyBjYW5ub3QgcGxheScpXHJcbiAgICAgICAgICAgICRidG5NZW51T25PZi5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jaydcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLnRpbWVyRm9yRXJyb3JQYWdlID0gRGF0ZS5ub3coKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciAkYm94ID0gd2luZG93LnZpZXdlclN0YXRlLiRib3hcbnZhciAkYnRuRnVsbFNjciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuRnVsbFNjclxudmFyICRzdmdGdWxsU2NyT24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnVsbHNjcl9vbicpXG52YXIgJHN2Z0Z1bGxTY3JPZmYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnVsbHNjcl9vZmYnKVxudmFyICRidG5NZW51T2ZmID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5NZW51T2ZmXG5cbmlmICggd2luZG93LnZpZXdlclN0YXRlLmlzRnVsbFNjcmVlbkFsbG93ZWQgKSB7XG4gICRidG5NZW51T2ZmLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgJGJ0bkZ1bGxTY3IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZih3aW5kb3cudmlld2VyU3RhdGUuYXNrJGJveEluRnVsbFNjcmVlbigpKSB7XG4gICAgICAgICAgZ2V0T2ZmRnVsbHNjcmVlbigpXG4gICAgICAgICAgJHN2Z0Z1bGxTY3JPbi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpXG4gICAgICAgICAgJHN2Z0Z1bGxTY3JPZmYuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBnb0Z1bGxTY3JlZW4oKVxuICAgICAgICAgICRzdmdGdWxsU2NyT2ZmLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIilcbiAgICAgICAgICAkc3ZnRnVsbFNjck9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgIH1cbiAgfSlcbiAgXG59IGVsc2UgaWYgKHdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZSAmJlxuICAgICAgICAgICAhd2luZG93LnZpZXdlclN0YXRlLmlzX2lQYWRfaVBob25lX2luRnVsbFNjcmVlbikge1xuICAgIC8vICBUZWxsIGhpbSBob3cgdG8gc3dpdGNoIGZ1bHNjcmVlbiBvblxuICAgIHJlcXVpcmUoJy4vYnV0dG9uSGlkZVNob3dNZW51LmpzJylcbn0gZWxzZSBpZiAod2luZG93LnZpZXdlclN0YXRlLmlzX2lQYWRfaVBob25lX2luRnVsbFNjcmVlbiB8fFxuICAgICAgICAgICAhd2luZG93LnZpZXdlclN0YXRlLmlzRnVsbFNjcmVlbkFsbG93ZWQpIHtcbiAgICAkYnRuRnVsbFNjci5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnO1xuICAgIHJlcXVpcmUoJy4vYnV0dG9uSGlkZVNob3dNZW51LmpzJylcbn1cblxuZnVuY3Rpb24gZ29GdWxsU2NyZWVuKCkge1xuICAgIGlmICgkYm94LnJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICRib3gucmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgIH0gZWxzZSBpZiAoJGJveC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgICAkYm94Lm1velJlcXVlc3RGdWxsU2NyZWVuKClcbiAgICB9IGVsc2UgaWYgKCRib3gud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgJGJveC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpXG4gICAgfSBlbHNlIGlmICgkYm94Lm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgJGJveC5tc1JlcXVlc3RGdWxsc2NyZWVuKClcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRPZmZGdWxsc2NyZWVuKCkge1xuICBpZihkb2N1bWVudC5leGl0RnVsbHNjcmVlbikge1xuICAgIGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKCk7XG4gIH0gZWxzZSBpZihkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XG4gICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xuICB9IGVsc2UgaWYoZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4pIHtcbiAgICBkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuICB9ZWxzZSBpZiAoZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbikge1xuXHRkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKCk7XG4gIH1cbn1cbi8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Z1bGxzY3JlZW5jaGFuZ2UnLCBmdWxsU2NyZWVuSGFuZGxlcilcbi8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnLCBmdWxsU2NyZWVuSGFuZGxlcilcbi8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLCBmdWxsU2NyZWVuSGFuZGxlcilcbi8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ01TRnVsbHNjcmVlbkNoYW5nZScsIGZ1bGxTY3JlZW5IYW5kbGVyKVxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZSA9IHtcclxuICAgICckYm94JzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJveCcpLFxyXG4gICAgJyR2aWRlbyc6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlbycpLFxyXG4gICAgJyRzb3VyY2UnOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc291cmNlJyksXHJcbiAgICAnJHNpZGVNZW51Qm94Jzoge1xyXG4gICAgICAgICdvYmplY3QnOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpLFxyXG4gICAgICAgICdoaWRlJzogbnVsbCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBmdW5jdGlvbiAtPiB2b2lkXHJcbiAgICAgICAgJ3Nob3cnOiBudWxsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGZ1bmN0aW9uIC0+IHZvaWRcclxuICAgIH0sXHJcbiAgICAnJHNsaWRlcic6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyX19zbGlkZXInKSxcclxuICAgICckZm9vdGVyJzoge1xyXG4gICAgICAgICdvYmplY3QnOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyJyksXHJcbiAgICAgICAgJ2hpZGUnOiBudWxsLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGZ1bmN0aW9uIC0+IHZvaWRcclxuICAgICAgICAnc2hvdyc6IG51bGwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgZnVuY3Rpb24gLT4gdm9pZFxyXG4gICAgfSxcclxuICAgICckYnRuSGVscCc6ICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19sZWZ0X19oZWxwJyksXHJcbiAgICAnJGJ0blBsYXknOiAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fbGVmdF9fcGxheScpLFxyXG4gICAgJyRidG5Wb2x1bWUnOiAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX2xlZnRfX3ZvbHVtZScpLFxyXG4gICAgJyRidG5RdWFsaXR5JzogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX2xlZnRfX3F1YWxpdHknKSxcclxuICAgICckYnRuU2NhbGUnOiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19yaWdodF9fc2NhbGVfYnRuJyksXHJcbiAgICAnJGJ0bk1lbnVPZmYnOiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fcmlnaHRfX21lbnUtb2ZmJyksXHJcbiAgICAnJGJ0bkZ1bGxTY3InOiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fcmlnaHRfX2Z1bGxzY3InKSxcclxuICAgICdhY3RpdmUkaW5wdXQnOiBudWxsLFxyXG4gICAgJ2hpZ2hRdWFsaXR5JzogZmFsc2UsXHJcbiAgICAnaXMkc2lkZU1lbnVCb3hIaWRkZW4nOiBmYWxzZSxcclxuICAgICdpcyRmb290ZXJIaWRkZW4nOiBmYWxzZSxcclxuICAgICdkdXJhdGlvblNob3dIaWRlTWVudSc6IDUwMCwgICAvLyAgbXNcclxuICAgICdkdXJhdGlvblNjYWxlU3VibWVudSc6IDQwMDAsXHJcbiAgICAnZHVyYXRpb25Gb290ZXJBc0N0cmwnOiA1MDAwLFxyXG4gICAgJ3RpbWVyRm9yRXJyb3JQYWdlJzogdW5kZWZpbmVkXHJcbiAgfTtcclxuXHJcbiAgd2luZG93LnZpZXdlclN0YXRlLmlzVmlkZW9Xb3JraW5nID0gcmVxdWlyZSgnLi9hc2tWaWRlb1dvcmtpbmcuanMnKSAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGJvb2xlYW5cclxuICB3aW5kb3cudmlld2VyU3RhdGUuaXNGdWxsU2NyZWVuQWxsb3dlZCA9IGZhbHNlLy9yZXF1aXJlKCcuL2Fza0Z1bGxTY3JlZW4uanMnKSAgICAgICAgICAgICAgICAgICAgICAgLy8gIGJvb2xlYW5cclxuICB3aW5kb3cudmlld2VyU3RhdGUuaXNfaVBhZF9pUGhvbmUgPSByZXF1aXJlKCcuL2Fza19pUGFkX2lQaG9uZS5qcycpICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgYm9vbGVhblxyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZV9pbkZ1bGxTY3JlZW4gPSByZXF1aXJlKCcuL2Fza19pUGFkX2lQaG9uZV9GdWxsU2NyZWVuLmpzJykgIC8vICBib29sZWFuXHJcbiAgd2luZG93LnZpZXdlclN0YXRlLmFzayRib3hJbkZ1bGxTY3JlZW4gPSByZXF1aXJlKCcuL2FzayRib3hJbkZ1bGxTY3JlZW4uanMnKSAgICAgICAgICAgICAgICAgLy8gIGZ1bmN0aW9uIC0+IGJvb2xlYW5cclxuICBcclxuICByZXF1aXJlKCcuL3NjcmVlbkhlaWdodC5qcycpXHJcbiAgcmVxdWlyZSgnLi9zZXRNZW51QW5kRm9vdGVyTWV0aG9kcy5qcycpXHJcbiAgcmVxdWlyZSgnLi9mdWxsc2NyZWVuLmpzJylcclxuICByZXF1aXJlKCcuL2J1dHRvbkluZm8uanMnKVxyXG4gIHJlcXVpcmUoJy4vYnV0dG9uUGxheVBhdXNlLmpzJylcclxuICByZXF1aXJlKCcuL2J1dHRvblF1YWxpdHkuanMnKVxyXG4gIHJlcXVpcmUoJy4vYnV0dG9uU2NhbGUuanMnKVxyXG4gIHJlcXVpcmUoJy4vY2hhbm5lbFNlbGVjdG9yLmpzJylcclxuICByZXF1aXJlKCcuL3ZpZGVvRXJyb3JMaXN0ZW5lcicpXHJcbn0iLCIndXNlIHN0cmljdCdcclxuXHJcbnNldEZvbnRTaXplKClcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHNldEZvbnRTaXplKVxyXG5mdW5jdGlvbiBzZXRGb250U2l6ZSgpIHtcclxuICAgIHZhciBmb250U2l6ZSA9IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0IC8gMjBcclxuICAgIGlmKGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0ID4gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCkge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuZm9udFNpemUgPSAwLjQgKiBmb250U2l6ZSArICdweCdcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5mb250U2l6ZSA9IGZvbnRTaXplICsgJ3B4J1xyXG4gICAgfVxyXG59IiwiJ3VzZSBzdHJpY3QnXHJcblxyXG4vLyBodHRwOi8vcGF1bGlyaXNoLmNvbS8yMDExL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtYW5pbWF0aW5nL1xyXG4vLyBodHRwOi8vbXkub3BlcmEuY29tL2Vtb2xsZXIvYmxvZy8yMDExLzEyLzIwL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtZXItYW5pbWF0aW5nXHJcblxyXG4vLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgcG9seWZpbGwgYnkgRXJpayBNw7ZsbGVyLiBmaXhlcyBmcm9tIFBhdWwgSXJpc2ggYW5kIFRpbm8gWmlqZGVsXHJcblxyXG4vLyBNSVQgbGljZW5zZVxyXG5cclxudmFyIGxhc3RUaW1lID0gMDtcclxudmFyIHZlbmRvcnMgPSBbJ21zJywgJ21veicsICd3ZWJraXQnLCAnbyddO1xyXG5mb3IodmFyIHggPSAwOyB4IDwgdmVuZG9ycy5sZW5ndGggJiYgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7ICsreCkge1xyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2ZW5kb3JzW3hdKydSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcclxuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2ZW5kb3JzW3hdKydDYW5jZWxBbmltYXRpb25GcmFtZSddIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IHdpbmRvd1t2ZW5kb3JzW3hdKydDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcclxufVxyXG5cclxuaWYgKCF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKVxyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uKGNhbGxiYWNrLCBlbGVtZW50KSB7XHJcbiAgICAgICAgdmFyIGN1cnJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgdmFyIHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCAzMiAtIChjdXJyVGltZSAtIGxhc3RUaW1lKSk7ICAvLyAgICBNYXRoLm1heCgwLCAxNiAtIChjdXJyVGltZSAtIGxhc3RUaW1lKSk7XHJcbiAgICAgICAgdmFyIGlkID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7IH0sIHRpbWVUb0NhbGwpO1xyXG4gICAgICAgIGxhc3RUaW1lID0gY3VyclRpbWUgKyB0aW1lVG9DYWxsO1xyXG4gICAgICAgIHJldHVybiBpZDtcclxuICAgIH07XHJcblxyXG5pZiAoIXdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSlcclxuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KGlkKTtcclxuICAgIH07XHJcbi8vICBFbmQgckZBIHBvbHlmaWxsXHJcblxyXG52YXIgJHNpZGVNZW51Qm94ID0gd2luZG93LnZpZXdlclN0YXRlLiRzaWRlTWVudUJveFxyXG52YXIgJGZvb3RlciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kZm9vdGVyXHJcbnZhciBkdXJhdGlvbiA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5kdXJhdGlvblNob3dIaWRlTWVudVxyXG5cclxud2luZG93LnZpZXdlclN0YXRlLiRzaWRlTWVudUJveC5oaWRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhpZGUpXHJcbiAgICBmdW5jdGlvbiBoaWRlKHRpbWVTdGFtcCkge1xyXG4gICAgICAgIGlmICghc3RhcnRUaW1lKSBzdGFydFRpbWUgPSB0aW1lU3RhbXBcclxuICAgICAgICB2YXIgcHJvZ3Jlc3MgPSAodGltZVN0YW1wIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uXHJcbiAgICAgICAgaWYgKHByb2dyZXNzIDw9IDEpIHtcclxuICAgICAgICAgICAgJHNpZGVNZW51Qm94Lm9iamVjdC5zdHlsZS5vcGFjaXR5ID0gMSAtIHByb2dyZXNzXHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShoaWRlKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRzaWRlTWVudUJveC5vYmplY3Quc3R5bGUub3BhY2l0eSA9IDBcclxuICAgICAgICAgICAgJHNpZGVNZW51Qm94Lm9iamVjdC5zdHlsZS5yaWdodCA9ICctNWVtJ1xyXG4gICAgICAgICAgICBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmlzJHNpZGVNZW51Qm94SGlkZGVuID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxud2luZG93LnZpZXdlclN0YXRlLiRzaWRlTWVudUJveC5zaG93ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgJHNpZGVNZW51Qm94Lm9iamVjdC5zdHlsZS5yaWdodCA9ICcnXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2hvdylcclxuICAgIGZ1bmN0aW9uIHNob3codGltZVN0YW1wKSB7XHJcbiAgICAgICAgaWYgKCFzdGFydFRpbWUpIHN0YXJ0VGltZSA9IHRpbWVTdGFtcFxyXG4gICAgICAgIHZhciBwcm9ncmVzcyA9ICh0aW1lU3RhbXAgLSBzdGFydFRpbWUpIC8gZHVyYXRpb25cclxuICAgICAgICBpZiAocHJvZ3Jlc3MgPD0gMSkge1xyXG4gICAgICAgICAgICAkc2lkZU1lbnVCb3gub2JqZWN0LnN0eWxlLm9wYWNpdHkgPSBwcm9ncmVzc1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2hvdylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkc2lkZU1lbnVCb3gub2JqZWN0LnN0eWxlLm9wYWNpdHkgPSAxXHJcbiAgICAgICAgICAgIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaXMkc2lkZU1lbnVCb3hIaWRkZW4gPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxud2luZG93LnZpZXdlclN0YXRlLiRmb290ZXIuaGlkZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShoaWRlKVxyXG4gICAgZnVuY3Rpb24gaGlkZSh0aW1lU3RhbXApIHtcclxuICAgICAgICBpZiAoIXN0YXJ0VGltZSkgc3RhcnRUaW1lID0gdGltZVN0YW1wXHJcbiAgICAgICAgdmFyIHByb2dyZXNzID0gKHRpbWVTdGFtcCAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvblxyXG4gICAgICAgIGlmIChwcm9ncmVzcyA8PSAxKSB7XHJcbiAgICAgICAgICAgICRmb290ZXIub2JqZWN0LnN0eWxlLm9wYWNpdHkgPSAxIC0gcHJvZ3Jlc3NcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhpZGUpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJGZvb3Rlci5vYmplY3Quc3R5bGUub3BhY2l0eSA9IDBcclxuICAgICAgICAgICAgJGZvb3Rlci5vYmplY3Quc3R5bGUuYm90dG9tID0gJy0xNCUnXHJcbiAgICAgICAgICAgIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaXMkZm9vdGVySGlkZGVuID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxud2luZG93LnZpZXdlclN0YXRlLiRmb290ZXIuc2hvdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgICRmb290ZXIub2JqZWN0LnN0eWxlLmJvdHRvbSA9ICcnXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2hvdylcclxuICAgIGZ1bmN0aW9uIHNob3codGltZVN0YW1wKSB7XHJcbiAgICAgICAgaWYgKCFzdGFydFRpbWUpIHN0YXJ0VGltZSA9IHRpbWVTdGFtcFxyXG4gICAgICAgIHZhciBwcm9ncmVzcyA9ICh0aW1lU3RhbXAgLSBzdGFydFRpbWUpIC8gZHVyYXRpb25cclxuICAgICAgICBpZiAocHJvZ3Jlc3MgPD0gMSkge1xyXG4gICAgICAgICAgICAkZm9vdGVyLm9iamVjdC5zdHlsZS5vcGFjaXR5ID0gcHJvZ3Jlc3NcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNob3cpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJGZvb3Rlci5vYmplY3Quc3R5bGUub3BhY2l0eSA9IDFcclxuICAgICAgICAgICAgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5pcyRmb290ZXJIaWRkZW4gPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbnZhciAkdmlkZW8gPSB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvXHJcblxyXG4kdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmYWlsZWQpXHJcblxyXG4gZnVuY3Rpb24gZmFpbGVkKGUpIHtcclxuICAgLy8gdmlkZW8gcGxheWJhY2sgZmFpbGVkIC0gc2hvdyBhIG1lc3NhZ2Ugc2F5aW5nIHdoeSAgICAgLSBmcm9tIGh0dHBzOi8vZGV2LnczLm9yZy9odG1sNS9zcGVjLWF1dGhvci12aWV3L3ZpZGVvLmh0bWwjdmlkZW9cclxuICAgc3dpdGNoIChlLnRhcmdldC5lcnJvci5jb2RlKSB7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfQUJPUlRFRDpcclxuICAgICAgIGFsZXJ0KCdZb3UgYWJvcnRlZCB0aGUgdmlkZW8gcGxheWJhY2suJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgICBjYXNlIGUudGFyZ2V0LmVycm9yLk1FRElBX0VSUl9ORVRXT1JLOlxyXG4gICAgICAgYWxlcnQoJ0EgbmV0d29yayBlcnJvciBjYXVzZWQgdGhlIHZpZGVvIGRvd25sb2FkIHRvIGZhaWwgcGFydC13YXkuJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgICBjYXNlIGUudGFyZ2V0LmVycm9yLk1FRElBX0VSUl9ERUNPREU6XHJcbiAgICAgICBhbGVydCgnVGhlIHZpZGVvIHBsYXliYWNrIHdhcyBhYm9ydGVkIGR1ZSB0byBhIGNvcnJ1cHRpb24gcHJvYmxlbSBvciBiZWNhdXNlIHRoZSB2aWRlbyB1c2VkIGZlYXR1cmVzIHlvdXIgYnJvd3NlciBkaWQgbm90IHN1cHBvcnQuJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgICBjYXNlIGUudGFyZ2V0LmVycm9yLk1FRElBX0VSUl9TUkNfTk9UX1NVUFBPUlRFRDpcclxuICAgICAgIGNvbnNvbGUubG9nKCdUaGUgdmlkZW8gY291bGQgbm90IGJlIGxvYWRlZCAgJyArIChEYXRlLm5vdygpIC0gd2luZG93LnZpZXdlclN0YXRlLnRpbWVyRm9yRXJyb3JQYWdlKSk7XHJcbiAgICAgICBhbGVydCgnVGhlIHZpZGVvIGNvdWxkIG5vdCBiZSBsb2FkZWQsIGVpdGhlciBiZWNhdXNlIHRoZSBzZXJ2ZXIgb3IgbmV0d29yayBmYWlsZWQgb3IgYmVjYXVzZSB0aGUgZm9ybWF0IGlzIG5vdCBzdXBwb3J0ZWQuJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgICBkZWZhdWx0OlxyXG4gICAgICAgYWxlcnQoJ0FuIHVua25vd24gZXJyb3Igb2NjdXJyZWQuJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgfVxyXG4gfVxyXG4iXX0=
