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
    var $box = window.viewerState.$box
    var allowed = false
    if ($box.requestFullscreen ||
        $box.mozRequestFullScreen ||
        $box.webkitRequestFullscreen ||
        $box.msRequestFullscreen
        ) {
        allowed = true 
        console.log('FullScreen ok')
    } else {
        allowed = false 
        console.log('No fullscreen')
    }
    return allowed
})()

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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
},{}],5:[function(require,module,exports){
'use strict'

module.exports = (function() {
    if(window.viewerState.is_iPad_iPhone &&
        window.innerHeight >= window.screen.availHeight) 
        {
        return true
    } else return false
})()

},{}],6:[function(require,module,exports){
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

},{}],7:[function(require,module,exports){
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

},{}],8:[function(require,module,exports){
'use strict'

//          Help
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

//          Play / Pause
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

//          Volume
var $btnVolume = window.viewerState.$btnVolume
var $svgVolumeOn = document.querySelector('.volume_on')
var $svgVolumeOff = document.querySelector('.volume_off')
$btnVolume.addEventListener('click', function(){
    if ($video.muted){
        $video.muted = false 
        $svgVolumeOn.classList.add("active")
        $svgVolumeOff.classList.remove("active")
    } else {
        $video.muted = true
        $svgVolumeOn.classList.remove("active")
        $svgVolumeOff.classList.add("active")
    } 
})

//          Quality
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

var $box = window.viewerState.$box
var $btnFullScr = window.viewerState.$btnFullScr
var $svgFullScrOn = document.querySelector('.fullscr_on')
var $svgFullScrOff = document.querySelector('.fullscr_off')

if ( window.viewerState.isFullScreenAllowed ) {
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

},{}],10:[function(require,module,exports){
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
//                                      <-- State | Action -->
//  If -->     $btnMenuOff   $footer   FullScreen |  EventSource   EventType/state   EventAction         Handler                Additionaly
//          1.    shown       shown        any    |   $btnMenuOff   click/none        hide both           btnHadler                         
//          2.    hidden      shown        any    |   $btnMenuOff   click/none        show both           btnHadler              
//          3.    hidden      hidden       off    |   $box          click/none        show both           boxHandler                        
//          4.    hidden      hidden       on     |   $box          click/none        show $footerAsCtrl  boxHandler             shows $footer for 5sec as VideoCtrlPanel                          
//          5.    hidden      shown Ctrl   on     |   $footer       click/none        reset timer         footerHandler          click resets 5sec countdown (for any footer button except $btnMenuOff and $btnFullScr)
//          6.    any         any          off    |   FullScreen    event/on          hide both           fullScreenHandler       
//          7.    any         any          on     |   FullScreen    event/off         show both           fullScreenHandler       

$btnMenuOff.addEventListener('click', btnHandler)
$footer.object.addEventListener('click', footerHandler)
$box.addEventListener('click', boxHandler)
document.addEventListener('fullscreenchange', fullScreenHandler)
document.addEventListener('webkitfullscreenchange', fullScreenHandler)
document.addEventListener('mozfullscreenchange', fullScreenHandler)
document.addEventListener('MSFullscreenChange', fullScreenHandler)

function btnHandler(e) {
    e.stopPropagation()
    if(!window.viewerState.is$sideMenuBoxHidden && !window.viewerState.is$footerHidden) {
        $sideMenuBox.hide()
        $footer.hide()
    } else if(window.viewerState.is$sideMenuBoxHidden) {
        $sideMenuBox.show()
        if(id){
            $footer.object.classList.remove('ctrl')
            clearTimeout(id)
            $box.addEventListener('click', boxHandler)
        }
    }
}
function footerHandler(e) {
    e.stopPropagation()
    if(ask$boxInFullScreen() && id){
        clearTimeout(id)
        id = setTimeout( function(){
            hideControls()
            $box.addEventListener('click', boxHandler)
        } , durationFooterAsCtrl)
    }
}
function boxHandler(e) {
    e.stopPropagation()
    if(ask$boxInFullScreen()) {
        if(true) {
            $box.removeEventListener('click', boxHandler)
            showControls()
            id = setTimeout( function(){
                hideControls()
                $box.addEventListener('click', boxHandler)
            } , durationFooterAsCtrl)
        }
    } else {
        if(window.viewerState.is$sideMenuBoxHidden) $sideMenuBox.show()
        if(window.viewerState.is$footerHidden) $footer.show()
    }
}
function fullScreenHandler() {
    if(ask$boxInFullScreen()){
        if(!window.viewerState.is$sideMenuBoxHidden) $sideMenuBox.hide()
        if(!window.viewerState.is$footerHidden) $footer.hide()
    } else {
        if(window.viewerState.is$sideMenuBoxHidden) $sideMenuBox.show()
        if(window.viewerState.is$footerHidden) $footer.show()
        if(id){
            $footer.object.classList.remove('ctrl')
            clearTimeout(id)
            $box.addEventListener('click', boxHandler)
        }
    }
}
function showControls() {
    $footer.object.classList.add('ctrl')
    $footer.show()
}
function hideControls() {
    $footer.hide()
    setTimeout(function(){
        $footer.object.classList.remove('ctrl')
    }, window.viewerState.durationShowHideMenu)
}

},{}],11:[function(require,module,exports){
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
  require('./screenHeight.js')

}
},{"./ask$boxInFullScreen.js":1,"./askFullScreen.js":2,"./askVideoWorking.js":3,"./ask_iPad_iPhone.js":4,"./ask_iPad_iPhone_FullScreen.js":5,"./buttonScale.js":6,"./channelSelector.js":7,"./footer_buttons.js":8,"./fullscreen.js":9,"./hideShowMenu.js":10,"./screenHeight.js":12,"./setMenuAndFooterMethods.js":13,"./videoErrorListener":14}],12:[function(require,module,exports){
'use strict'
console.log('screenHeight')
setFontSize()
window.addEventListener('resize', setFontSize)
function setFontSize() {
    var fontSize = document.body.clientHeight / 20
    if(document.body.clientHeight > document.body.clientWidth) {
        document.body.style.fontSize = 0.4 * fontSize + 'px'
    } else {
        document.body.style.fontSize = fontSize + 'px'
    }
    console.log('resize')
}
},{}],13:[function(require,module,exports){
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
var duration = window.viewerState.duration

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

},{}],14:[function(require,module,exports){
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

},{}]},{},[11])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2EwNS9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hc2skYm94SW5GdWxsU2NyZWVuLmpzIiwianMvYXNrRnVsbFNjcmVlbi5qcyIsImpzL2Fza1ZpZGVvV29ya2luZy5qcyIsImpzL2Fza19pUGFkX2lQaG9uZS5qcyIsImpzL2Fza19pUGFkX2lQaG9uZV9GdWxsU2NyZWVuLmpzIiwianMvYnV0dG9uU2NhbGUuanMiLCJqcy9jaGFubmVsU2VsZWN0b3IuanMiLCJqcy9mb290ZXJfYnV0dG9ucy5qcyIsImpzL2Z1bGxzY3JlZW4uanMiLCJqcy9oaWRlU2hvd01lbnUuanMiLCJqcy9tYWluLmpzIiwianMvc2NyZWVuSGVpZ2h0LmpzIiwianMvc2V0TWVudUFuZEZvb3Rlck1ldGhvZHMuanMiLCJqcy92aWRlb0Vycm9yTGlzdGVuZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQgfHwgXHJcbiAgICAgICAgZG9jdW1lbnQud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQgfHxcclxuICAgICAgICBkb2N1bWVudC5tb3pGdWxsU2NyZWVuRWxlbWVudCB8fFxyXG4gICAgICAgIGRvY3VtZW50Lm1zRnVsbHNjcmVlbkVsZW1lbnQgfHxcclxuICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaXNfaVBhZF9pUGhvbmVfaW5GdWxsU2NyZWVuICkge1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9IGVsc2UgcmV0dXJuIGZhbHNlXHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgJGJveCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYm94XHJcbiAgICB2YXIgYWxsb3dlZCA9IGZhbHNlXHJcbiAgICBpZiAoJGJveC5yZXF1ZXN0RnVsbHNjcmVlbiB8fFxyXG4gICAgICAgICRib3gubW96UmVxdWVzdEZ1bGxTY3JlZW4gfHxcclxuICAgICAgICAkYm94LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuIHx8XHJcbiAgICAgICAgJGJveC5tc1JlcXVlc3RGdWxsc2NyZWVuXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgYWxsb3dlZCA9IHRydWUgXHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Z1bGxTY3JlZW4gb2snKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBhbGxvd2VkID0gZmFsc2UgXHJcbiAgICAgICAgY29uc29sZS5sb2coJ05vIGZ1bGxzY3JlZW4nKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFsbG93ZWRcclxufSkoKVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmKHR5cGVvZiB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvLnBsYXkgPT09ICdmdW5jdGlvbicgKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3ZpZGVvIG9rIG5lZWRzIHRvIGJlIGNvbmZpcm1lZCcpXHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ25vIHZpZGVvJylcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxufSkoKVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmKHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ2lQYWQnKSAhPT0gLTEgJiZcclxuICAgICAgICB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdTYWZhcmknKSAhPT0gLTEgKVxyXG4gICAgICAgIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSBlbHNlIGlmKHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ2lQaG9uZScpICE9PSAtMSAmJlxyXG4gICAgICAgIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ1NhZmFyaScpICE9PSAtMSApIFxyXG4gICAgICAgIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSBlbHNlIHJldHVybiBmYWxzZVxyXG59KSgpIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZSAmJlxyXG4gICAgICAgIHdpbmRvdy5pbm5lckhlaWdodCA+PSB3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0KSBcclxuICAgICAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSByZXR1cm4gZmFsc2VcclxufSkoKVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbi8vICAgICAgICAgIFNjYWxlXHJcbnZhciAkYm94ID0gd2luZG93LnZpZXdlclN0YXRlLiRib3hcclxudmFyICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW9cclxudmFyICRidG5TY2FsZSA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuU2NhbGVcclxudmFyICRzdmdTY2FsZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY2FsZV9idG5fc3ZnJylcclxudmFyICRidG5TY2FsZVN1YkJ0bnNCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19yaWdodF9fc2NhbGVfc3ViYnRucycpXHJcbnZhciAkc3ViQnRuVXAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3ViYnRuX191cCBzdmcnKVxyXG52YXIgJHN1YkJ0bkRvd24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3ViYnRuX19kb3duIHN2ZycpXHJcbnZhciByYXRpbyA9IHVuZGVmaW5lZFxyXG52YXIgbWF4JHZpZGVvSGVpZ2h0ID0gdW5kZWZpbmVkXHJcbnZhciBtaW4kdmlkZW9IZWlnaHQgPSB1bmRlZmluZWRcclxudmFyIHN0ZXAgPSB1bmRlZmluZWRcclxudmFyIG4gPSB1bmRlZmluZWRcclxudmFyIG5NYXggPSAwXHJcbnZhciBuTWluID0gMFxyXG52YXIgaWQgPSB1bmRlZmluZWRcclxudmFyIGFjdGl2ZUlEID0gdW5kZWZpbmVkXHJcblxyXG4kdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignbG9hZGVkZGF0YScsIHNjYWxlUmVzdGFydClcclxuJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZnVuY3Rpb24gKCkge1xyXG4gICAgY2xlYXJUaW1lb3V0KGlkKVxyXG4gICAgc3RvcFNjYWxpbmcoKVxyXG4gICAgY29uc29sZS5sb2coJ3ZpZGVvIGVycm9yJylcclxufSlcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZnVsbHNjcmVlbmNoYW5nZScsIHNjYWxlUmVzdGFydClcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsIHNjYWxlUmVzdGFydClcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW96ZnVsbHNjcmVlbmNoYW5nZScsIHNjYWxlUmVzdGFydClcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignTVNGdWxsc2NyZWVuQ2hhbmdlJywgc2NhbGVSZXN0YXJ0KVxyXG5cclxuZnVuY3Rpb24gc2NhbGVSZXN0YXJ0KCkge1xyXG4gICAgY29uc29sZS5sb2coJ1Jlc2NhbGUgc3RhcnQ6ICcgKyAoRGF0ZS5ub3coKSAtIHdpbmRvdy52aWV3ZXJTdGF0ZS50aW1lckZvckVycm9yUGFnZSkpICAgICAgXHJcbiAgICBzdG9wU2NhbGluZygpXHJcbiAgICBjbGVhclRpbWVvdXQoaWQpXHJcbiAgICBpZCA9IHNldFRpbWVvdXQoc3RhcnRTY2FsaW5nLCAxNTAwKVxyXG59XHJcbmZ1bmN0aW9uIHN0YXJ0U2NhbGluZygpIHtcclxuICAgIHJhdGlvID0gJGJveC5jbGllbnRXaWR0aCAvICR2aWRlby5vZmZzZXRXaWR0aFxyXG4gICAgaWYocmF0aW8gPD0gMSkge1xyXG4gICAgICAgIG1pbiR2aWRlb0hlaWdodCA9IDEwMCAqIHJhdGlvICAgLy8gICVcclxuICAgICAgICBuTWluID0gTWF0aC5mbG9vcigobWluJHZpZGVvSGVpZ2h0IC0gMTAwKSAvIDE0KVxyXG4gICAgICAgIG5NYXggPSAwXHJcbiAgICAgICAgc3RlcCA9IChtaW4kdmlkZW9IZWlnaHQgLSAxMDApIC8gbk1pblxyXG4gICAgICAgIGNvbnNvbGUubG9nKG5NaW4gKyAnIHN0ZXBzJylcclxuICAgICAgICAkc3ViQnRuRG93bi5zdHlsZS5maWxsID0gJydcclxuICAgICAgICAkc3ViQnRuVXAuc3R5bGUuZmlsbCA9ICdyZ2JhKDAsIDAsIDAsIDAuNSknXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIG1heCR2aWRlb0hlaWdodCA9IDEwMCAqIHJhdGlvICAgLy8gICVcclxuICAgICAgICBuTWF4ID0gTWF0aC5jZWlsKChtYXgkdmlkZW9IZWlnaHQgLSAxMDApIC8gMTQpXHJcbiAgICAgICAgbk1pbiA9IDBcclxuICAgICAgICBzdGVwID0gKG1heCR2aWRlb0hlaWdodCAtIDEwMCkgLyBuTWF4XHJcbiAgICAgICAgY29uc29sZS5sb2cobk1heCArICcgc3RlcHMnKVxyXG4gICAgICAgICRzdWJCdG5Eb3duLnN0eWxlLmZpbGwgPSAncmdiYSgwLCAwLCAwLCAwLjUpJ1xyXG4gICAgICAgICRzdWJCdG5VcC5zdHlsZS5maWxsID0gJydcclxuICAgIH1cclxuICAgIG4gPSAwXHJcbiAgICAkYnRuU2NhbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBidG5TY2FsZUhhbmRsZXIpIFxyXG4gICAgJHN1YkJ0blVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3ViQnRuVXBIYW5kbGVyKSBcclxuICAgICRzdWJCdG5Eb3duLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3ViQnRuRG93bkhhbmRsZXIpIFxyXG59XHJcbmZ1bmN0aW9uIHN0b3BTY2FsaW5nKCkge1xyXG4gICAgcmF0aW8gPSB1bmRlZmluZWRcclxuICAgIG1heCR2aWRlb0hlaWdodCA9IHVuZGVmaW5lZFxyXG4gICAgc3RlcCA9IHVuZGVmaW5lZFxyXG4gICAgbiA9IHVuZGVmaW5lZFxyXG4gICAgJHZpZGVvLnN0eWxlLmhlaWdodCA9ICcxMDAlJ1xyXG4gICAgJGJ0blNjYWxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYnRuU2NhbGVIYW5kbGVyKSBcclxuICAgICRzdWJCdG5VcC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHN1YkJ0blVwSGFuZGxlcikgXHJcbiAgICAkc3ViQnRuRG93bi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHN1YkJ0bkRvd25IYW5kbGVyKVxyXG59XHJcbmZ1bmN0aW9uIGJ0blNjYWxlSGFuZGxlcihlKXtcclxuICAgIGlmKGUudGFyZ2V0ID09PSAkYnRuU2NhbGUgfHwgZS50YXJnZXQgPT09ICRzdmdTY2FsZSkge1xyXG4gICAgICAgIGlmKCRidG5TY2FsZVN1YkJ0bnNCb3guY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSl7XHJcbiAgICAgICAgICAgIHJlbW92ZUFjdGl2ZSgpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJGJ0blNjYWxlU3ViQnRuc0JveC5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxyXG4gICAgICAgICAgICBhY3RpdmVJRCA9IHNldFRpbWVvdXQocmVtb3ZlQWN0aXZlLCB3aW5kb3cudmlld2VyU3RhdGUuZHVyYXRpb25TY2FsZVN1Ym1lbnUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHN1YkJ0blVwSGFuZGxlcigpe1xyXG4gICAgaWYobiA8IG5NYXgpIHtcclxuICAgICAgICAkdmlkZW8uc3R5bGUuaGVpZ2h0ID0gMTAwICsgKytuICogc3RlcCArICclJ1xyXG4gICAgICAgIGlmKG4gPT09IG5NYXgpICRzdWJCdG5VcC5zdHlsZS5maWxsID0gJ3JnYmEoMCwgMCwgMCwgMC41KSdcclxuICAgICAgICBpZihuID09PSAobk1pbiArIDEpKSAkc3ViQnRuRG93bi5zdHlsZS5maWxsID0gJydcclxuICAgICAgICBjbGVhclRpbWVvdXQoYWN0aXZlSUQpXHJcbiAgICAgICAgYWN0aXZlSUQgPSBzZXRUaW1lb3V0KHJlbW92ZUFjdGl2ZSwgd2luZG93LnZpZXdlclN0YXRlLmR1cmF0aW9uU2NhbGVTdWJtZW51KVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHN1YkJ0bkRvd25IYW5kbGVyKCl7XHJcbiAgICBpZihuID4gbk1pbikge1xyXG4gICAgICAgICR2aWRlby5zdHlsZS5oZWlnaHQgPSAxMDAgKyAtLW4gKiBzdGVwICsgJyUnXHJcbiAgICAgICAgaWYobiA9PT0gbk1pbikgJHN1YkJ0bkRvd24uc3R5bGUuZmlsbCA9ICdyZ2JhKDAsIDAsIDAsIDAuNSknXHJcbiAgICAgICAgaWYobiA9PT0gKG5NYXggLSAxKSkgJHN1YkJ0blVwLnN0eWxlLmZpbGwgPSAnJ1xyXG4gICAgICAgIGNsZWFyVGltZW91dChhY3RpdmVJRClcclxuICAgICAgICBhY3RpdmVJRCA9IHNldFRpbWVvdXQocmVtb3ZlQWN0aXZlLCB3aW5kb3cudmlld2VyU3RhdGUuZHVyYXRpb25TY2FsZVN1Ym1lbnUpXHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gcmVtb3ZlQWN0aXZlKCkge1xyXG4gICAgJGJ0blNjYWxlU3ViQnRuc0JveC5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG59XHJcbi8vICR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdsb2Fkc3RhcnQnLCBmdW5jdGlvbigpe1xyXG4vLyAgICAgY29uc29sZS5sb2coJ1RoZSBsb2Fkc3RhcnQgZXZlbnQgb2NjdXJzIHdoZW4gdGhlIGJyb3dzZXIgc3RhcnRzIGxvb2tpbmcgZm9yIHRoZSBzcGVjaWZpZWQgYXVkaW8vdmlkZW8uIFRoaXMgaXMgd2hlbiB0aGUgbG9hZGluZyBwcm9jZXNzIHN0YXJ0cy4nICsgKERhdGUubm93KCkgLSB3aW5kb3cudmlld2VyU3RhdGUudGltZXJGb3JFcnJvclBhZ2UpKVxyXG4vLyB9KVxyXG4vLyAkdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignZHVyYXRpb25jaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG4vLyAgICAgY29uc29sZS5sb2coJ1RoZSBkdXJhdGlvbmNoYW5nZSBldmVudCBvY2N1cnMgd2hlbiB0aGUgZHVyYXRpb24gZGF0YSBvZiB0aGUgc3BlY2lmaWVkIGF1ZGlvL3ZpZGVvIGlzIGNoYW5nZWQuJyArIChEYXRlLm5vdygpIC0gd2luZG93LnZpZXdlclN0YXRlLnRpbWVyRm9yRXJyb3JQYWdlKSlcclxuLy8gfSlcclxuLy8gJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZG1ldGFkYXRhJywgZnVuY3Rpb24oKXtcclxuLy8gICAgIGNvbnNvbGUubG9nKCdUaGUgbG9hZGVkbWV0YWRhdGEgZXZlbnQgb2NjdXJzIHdoZW4gbWV0YSBkYXRhIGZvciB0aGUgc3BlY2lmaWVkIGF1ZGlvL3ZpZGVvIGhhcyBiZWVuIGxvYWRlZC4nICsgKERhdGUubm93KCkgLSB3aW5kb3cudmlld2VyU3RhdGUudGltZXJGb3JFcnJvclBhZ2UpKVxyXG4vLyB9KVxyXG5cclxuLy8gJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZGRhdGEnLCBmdW5jdGlvbigpe1xyXG4vLyAgICAgY29uc29sZS5sb2coJ1RoZSBsb2FkZWRkYXRhIGV2ZW50IG9jY3VycyB3aGVuIGRhdGEgZm9yIHRoZSBjdXJyZW50IGZyYW1lIGlzIGxvYWRlZCwgYnV0IG5vdCBlbm91Z2ggZGF0YSB0byBwbGF5IG5leHQgZnJhbWUgb2YgdGhlIHNwZWNpZmllZCBhdWRpby92aWRlby4nICsgKERhdGUubm93KCkgLSB3aW5kb3cudmlld2VyU3RhdGUudGltZXJGb3JFcnJvclBhZ2UpKVxyXG4vLyB9KVxyXG4vLyAkdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBmdW5jdGlvbigpe1xyXG4vLyAgICAgY29uc29sZS5sb2coJ1RoZSBwcm9ncmVzcyBldmVudCBvY2N1cnMgd2hlbiB0aGUgYnJvd3NlciBpcyBkb3dubG9hZGluZyB0aGUgc3BlY2lmaWVkIGF1ZGlvL3ZpZGVvLicgKyAoRGF0ZS5ub3coKSAtIHdpbmRvdy52aWV3ZXJTdGF0ZS50aW1lckZvckVycm9yUGFnZSkpXHJcbi8vIH0pXHJcbi8vICR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5JywgZnVuY3Rpb24oKXtcclxuLy8gICAgIGNvbnNvbGUubG9nKCdUaGUgY2FucGxheSBldmVudCBvY2N1cnMgd2hlbiB0aGUgYnJvd3NlciBjYW4gc3RhcnQgcGxheWluZyB0aGUgc3BlY2lmaWVkIGF1ZGlvL3ZpZGVvICh3aGVuIGl0IGhhcyBidWZmZXJlZCBlbm91Z2ggdG8gYmVnaW4pLicgKyAoRGF0ZS5ub3coKSAtIHdpbmRvdy52aWV3ZXJTdGF0ZS50aW1lckZvckVycm9yUGFnZSkpXHJcbi8vIH0pXHJcbi8vICR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIGZ1bmN0aW9uKCl7XHJcbi8vICAgICBjb25zb2xlLmxvZygnVGhlIGNhbnBsYXl0aHJvdWdoIGV2ZW50IG9jY3VycyB3aGVuIHRoZSBicm93c2VyIGVzdGltYXRlcyBpdCBjYW4gcGxheSB0aHJvdWdoIHRoZSBzcGVjaWZpZWQgYXVkaW8vdmlkZW8gd2l0aG91dCBoYXZpbmcgdG8gc3RvcCBmb3IgYnVmZmVyaW5nLicgKyAoRGF0ZS5ub3coKSAtIHdpbmRvdy52aWV3ZXJTdGF0ZS50aW1lckZvckVycm9yUGFnZSkpXHJcbi8vIH0pXHJcbiIsIlwidXNlIHN0cmljdFwiXHJcblxyXG52YXIgJHZpZGVvID0gd2luZG93LnZpZXdlclN0YXRlLiR2aWRlb1xyXG52YXIgJHNvdXJjZSA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc291cmNlXHJcbnZhciAkc2xpZGVyID0gd2luZG93LnZpZXdlclN0YXRlLiRzbGlkZXJcclxudmFyICRidG5NZW51T25PZiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX3JpZ2h0X19tZW51LW9mZicpXHJcbnZhciBsaW5rID0gJydcclxudmFyICRidG5zID0ge1xyXG4gICAgXCJjaF8xZ29yb2Rza295XCI6ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoXzFnb3JvZHNrb3lcIiksXHJcbiAgICBcImNoXzN0c3lmcm92b3lcIjogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfM3RzeWZyb3ZveVwiKSxcclxuICAgIFwiY2hfcmVwb3J0ZXJcIjogICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9yZXBvcnRlclwiKSxcclxuICAgIFwiY2hfYWNhZGVtaWFcIjogICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9hY2FkZW1pYVwiKSxcclxuICAgIFwiY2hfYTFcIjogICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9hMVwiKSxcclxuICAgIFwiY2hfZHVtc2theWFcIjogICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9kdW1za2F5YVwiKSxcclxuICAgIFwiY2hfZ3R2XCI6ICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9ndHZcIiksXHJcbiAgICBcImNoX3N0dlwiOiAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfc3R2XCIpLFxyXG4gICAgXCJjaF91Z25heWF2b2xuYVwiOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX3VnbmF5YXZvbG5hXCIpLFxyXG4gICAgXCJjaF9uZW1vXCI6ICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX25lbW9cIilcclxufVxyXG4kYnRucy5jaF8xZ29yb2Rza295LnNldEF0dHJpYnV0ZSggICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvMXR2b2QvMXR2b2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICApXHJcbiRidG5zLmNoXzN0c3lmcm92b3kuc2V0QXR0cmlidXRlKCAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovL2NkbjUubGl2ZS10di5vZC51YTo4MDgxL3R2LzN0dm9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgIClcclxuJGJ0bnMuY2hfcmVwb3J0ZXIuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vY2RuNC5saXZlLXR2Lm9kLnVhOjgwODEvdHYvMzFjaG9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgKVxyXG4kYnRucy5jaF9hY2FkZW1pYS5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly9jZG40LmxpdmUtdHYub2QudWE6ODA4MS90di8zNmNob2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiApXHJcbiRidG5zLmNoX2ExLnNldEF0dHJpYnV0ZSggICAgICAgICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9hMW9kL2Exb2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICAgIClcclxuJGJ0bnMuY2hfZHVtc2theWEuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzODo4MDgxL2R1bXNrYS9kdW1za2EtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgKVxyXG4kYnRucy5jaF9ndHYuc2V0QXR0cmlidXRlKCAgICAgICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvYTFvZC9ndHZvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiICAgICApXHJcbiRidG5zLmNoX3N0di5zZXRBdHRyaWJ1dGUoICAgICAgICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9zdHZvZC9zdHZvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiICAgIClcclxuJGJ0bnMuY2hfdWduYXlhdm9sbmEuc2V0QXR0cmlidXRlKCAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL3dhdmUvd2F2ZS1hYnItbHEvcGxheWxpc3QubTN1OFwiICAgICAgKVxyXG4kYnRucy5jaF9uZW1vLnNldEF0dHJpYnV0ZSggICAgICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvbmVtby9tb3Itc3ViL3BsYXlsaXN0Lm0zdThcIiAgICAgICAgICApXHJcblxyXG4kYnRucy5jaF8xZ29yb2Rza295LnNldEF0dHJpYnV0ZSggICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvMXR2b2QvMXR2b2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICApXHJcbiRidG5zLmNoXzN0c3lmcm92b3kuc2V0QXR0cmlidXRlKCAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovL2NkbjUubGl2ZS10di5vZC51YTo4MDgxL3R2LzN0dm9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgIClcclxuJGJ0bnMuY2hfcmVwb3J0ZXIuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vY2RuNC5saXZlLXR2Lm9kLnVhOjgwODEvdHYvMzFjaG9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgKVxyXG4kYnRucy5jaF9hY2FkZW1pYS5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly9jZG40LmxpdmUtdHYub2QudWE6ODA4MS90di8zNmNob2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICApXHJcbiRidG5zLmNoX2ExLnNldEF0dHJpYnV0ZSggICAgICAgICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9hMW9kL2Exb2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICAgIClcclxuJGJ0bnMuY2hfZHVtc2theWEuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzODo4MDgxL2R1bXNrYS9kdW1za2EtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgKVxyXG4kYnRucy5jaF9ndHYuc2V0QXR0cmlidXRlKCAgICAgICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvYTFvZC9ndHZvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgICApXHJcbiRidG5zLmNoX3N0di5zZXRBdHRyaWJ1dGUoICAgICAgICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9zdHZvZC9zdHZvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgIClcclxuJGJ0bnMuY2hfdWduYXlhdm9sbmEuc2V0QXR0cmlidXRlKCAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL3dhdmUvd2F2ZS1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgICAgKVxyXG4kYnRucy5jaF9uZW1vLnNldEF0dHJpYnV0ZSggICAgICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvbmVtby9tb3ItYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICAgICApXHJcblxyXG4kc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICBpZihlLnRhcmdldC50YWdOYW1lID09PSAnSU5QVVQnKXtcclxuICAgICAgICBpZih3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0ID09PSBlLnRhcmdldCkge1xyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0LmNoZWNrZWQgPSBmYWxzZVxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0ID0gbnVsbFxyXG4gICAgICAgICAgICAkdmlkZW8uc3R5bGUuYmFja2dyb3VuZFNpemUgPSBcIlwiXHJcbiAgICAgICAgICAgICR2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsICcnKVxyXG4gICAgICAgICAgICAkc291cmNlLnNldEF0dHJpYnV0ZSgnc3JjJywgJycpXHJcbiAgICAgICAgICAgICRidG5NZW51T25PZi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dCA9IGUudGFyZ2V0XHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSkgIGxpbmsgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1ocScpXHJcbiAgICAgICAgICAgIGVsc2UgbGluayA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWxxJylcclxuICAgICAgICAgICAgJHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgICAgICAgJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgICAgICAgICR2aWRlby5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9IFwiMCAwXCJcclxuICAgICAgICAgICAgaWYoJHZpZGVvLnBsYXkpICR2aWRlby5wbGF5KCk7XHJcbiAgICAgICAgICAgIGVsc2UgYWxlcnQgKCd2aWRlbyBjYW5ub3QgcGxheScpXHJcbiAgICAgICAgICAgICRidG5NZW51T25PZi5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jaydcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLnRpbWVyRm9yRXJyb3JQYWdlID0gRGF0ZS5ub3coKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG4vLyAgICAgICAgICBIZWxwXHJcbnZhciAkaGVscCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWxwJylcclxudmFyICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW9cclxudmFyICRib3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJGJveFxyXG5cclxudmFyICRidG5IZWxwID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5IZWxwXHJcbiRidG5IZWxwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIGlmKCRoZWxwLmNsYXNzTGlzdC5jb250YWlucyhcImFjdGl2ZVwiKSkge1xyXG4gICAgICAgICRoZWxwLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJGhlbHAuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKVxyXG4gICAgfVxyXG59KVxyXG5cclxuLy8gICAgICAgICAgUGxheSAvIFBhdXNlXHJcbnZhciAkYnRuUGxheVBhdXNlID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5QbGF5XHJcbnZhciAkc3ZnUGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5JylcclxudmFyICRzdmdQYXVzZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYXVzZScpXHJcbmlmICgkdmlkZW8ucGF1c2VkKXtcclxuICAgICRzdmdQbGF5LmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIilcclxufSBlbHNlIHtcclxuICAgICRzdmdQYXVzZS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpXHJcbn0gXHJcbiRidG5QbGF5UGF1c2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgaWYgKCR2aWRlby5wYXVzZWQpICR2aWRlby5wbGF5KCkgXHJcbiAgICBlbHNlICR2aWRlby5wYXVzZSgpXHJcbn0pXHJcbiR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwbGF5JywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkc3ZnUGF1c2UuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKVxyXG4gICAgICAgICRzdmdQbGF5LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcclxufSlcclxuJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BhdXNlJywgZnVuY3Rpb24oKXtcclxuICAgICAgICAkc3ZnUGxheS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpXHJcbiAgICAgICAgJHN2Z1BhdXNlLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcclxufSlcclxuXHJcbi8vICAgICAgICAgIFZvbHVtZVxyXG52YXIgJGJ0blZvbHVtZSA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuVm9sdW1lXHJcbnZhciAkc3ZnVm9sdW1lT24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudm9sdW1lX29uJylcclxudmFyICRzdmdWb2x1bWVPZmYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudm9sdW1lX29mZicpXHJcbiRidG5Wb2x1bWUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgaWYgKCR2aWRlby5tdXRlZCl7XHJcbiAgICAgICAgJHZpZGVvLm11dGVkID0gZmFsc2UgXHJcbiAgICAgICAgJHN2Z1ZvbHVtZU9uLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIilcclxuICAgICAgICAkc3ZnVm9sdW1lT2ZmLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJHZpZGVvLm11dGVkID0gdHJ1ZVxyXG4gICAgICAgICRzdmdWb2x1bWVPbi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXHJcbiAgICAgICAgJHN2Z1ZvbHVtZU9mZi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpXHJcbiAgICB9IFxyXG59KVxyXG5cclxuLy8gICAgICAgICAgUXVhbGl0eVxyXG52YXIgJGJ0blF1YWxpdHkgPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0blF1YWxpdHlcclxudmFyICRzdmdRdWFsaXR5ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fbGVmdF9fcXVhbGl0eSBzdmcnKVxyXG52YXIgbGluayA9ICcnXHJcbmlmICh3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkpIHtcclxuICAkc3ZnUXVhbGl0eS5jbGFzc0xpc3QucmVtb3ZlKCdvZmYnKVxyXG59IGVsc2Uge1xyXG4gICRzdmdRdWFsaXR5LmNsYXNzTGlzdC5hZGQoJ29mZicpXHJcbn1cclxuJGJ0blF1YWxpdHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgaWYgKHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSkge1xyXG4gICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSA9IGZhbHNlXHJcbiAgICAgICAgJHN2Z1F1YWxpdHkuY2xhc3NMaXN0LmFkZCgnb2ZmJylcclxuICAgICAgICBpZiAod2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dCkge1xyXG4gICAgICAgICAgICBsaW5rID0gd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1scScpXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8ucGxheSgpXHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkgPSB0cnVlXHJcbiAgICAgICAgJHN2Z1F1YWxpdHkuY2xhc3NMaXN0LnJlbW92ZSgnb2ZmJylcclxuICAgICAgICBpZiAod2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dCkge1xyXG4gICAgICAgICAgICBsaW5rID0gd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1ocScpXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8ucGxheSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KVxyXG5cclxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciAkYm94ID0gd2luZG93LnZpZXdlclN0YXRlLiRib3hcbnZhciAkYnRuRnVsbFNjciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuRnVsbFNjclxudmFyICRzdmdGdWxsU2NyT24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnVsbHNjcl9vbicpXG52YXIgJHN2Z0Z1bGxTY3JPZmYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZnVsbHNjcl9vZmYnKVxuXG5pZiAoIHdpbmRvdy52aWV3ZXJTdGF0ZS5pc0Z1bGxTY3JlZW5BbGxvd2VkICkge1xuICAkYnRuRnVsbFNjci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5hc2skYm94SW5GdWxsU2NyZWVuKCkpIHtcbiAgICAgICAgICBnZXRPZmZGdWxsc2NyZWVuKClcbiAgICAgICAgICAkc3ZnRnVsbFNjck9uLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIilcbiAgICAgICAgICAkc3ZnRnVsbFNjck9mZi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXG4gICAgICB9IGVsc2Uge1xuICAgICAgICAgIGdvRnVsbFNjcmVlbigpXG4gICAgICAgICAgJHN2Z0Z1bGxTY3JPZmYuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKVxuICAgICAgICAgICRzdmdGdWxsU2NyT24uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxuICAgICAgfVxuICB9KVxufVxuXG5mdW5jdGlvbiBnb0Z1bGxTY3JlZW4oKSB7XG4gICAgaWYgKCRib3gucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgJGJveC5yZXF1ZXN0RnVsbHNjcmVlbigpXG4gICAgfSBlbHNlIGlmICgkYm94Lm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XG4gICAgICAgICRib3gubW96UmVxdWVzdEZ1bGxTY3JlZW4oKVxuICAgIH0gZWxzZSBpZiAoJGJveC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAkYm94LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKClcbiAgICB9IGVsc2UgaWYgKCRib3gubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAkYm94Lm1zUmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgIH1cbn1cbmZ1bmN0aW9uIGdldE9mZkZ1bGxzY3JlZW4oKSB7XG4gIGlmKGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKSB7XG4gICAgZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKTtcbiAgfSBlbHNlIGlmKGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICBkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKCk7XG4gIH0gZWxzZSBpZihkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbikge1xuICAgIGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XG4gIH1lbHNlIGlmIChkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKSB7XG5cdGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4oKTtcbiAgfVxufVxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgJGJveCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYm94XHJcbnZhciAkdmlkZW8gPSB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvXHJcbnZhciAkc2lkZU1lbnVCb3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJHNpZGVNZW51Qm94XHJcbnZhciAkZm9vdGVyID0gd2luZG93LnZpZXdlclN0YXRlLiRmb290ZXJcclxudmFyICRmb290ZXJfX2NlbnRlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX2NlbnRlcicpIFxyXG52YXIgJGJ0bk1lbnVPZmYgPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0bk1lbnVPZmZcclxudmFyIGFzayRib3hJbkZ1bGxTY3JlZW4gPSB3aW5kb3cudmlld2VyU3RhdGUuYXNrJGJveEluRnVsbFNjcmVlblxyXG52YXIgZHVyYXRpb25Gb290ZXJBc0N0cmwgPSB3aW5kb3cudmlld2VyU3RhdGUuZHVyYXRpb25Gb290ZXJBc0N0cmxcclxudmFyIGlkID0gdW5kZWZpbmVkXHJcblxyXG4vLyAgSGlkZXMvc2hvd2VzICRzaWRlTWVudUJveCBhbmQgJGZvb3RlclxyXG4vLyAgXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8LS0gU3RhdGUgfCBBY3Rpb24gLS0+XHJcbi8vICBJZiAtLT4gICAgICRidG5NZW51T2ZmICAgJGZvb3RlciAgIEZ1bGxTY3JlZW4gfCAgRXZlbnRTb3VyY2UgICBFdmVudFR5cGUvc3RhdGUgICBFdmVudEFjdGlvbiAgICAgICAgIEhhbmRsZXIgICAgICAgICAgICAgICAgQWRkaXRpb25hbHlcclxuLy8gICAgICAgICAgMS4gICAgc2hvd24gICAgICAgc2hvd24gICAgICAgIGFueSAgICB8ICAgJGJ0bk1lbnVPZmYgICBjbGljay9ub25lICAgICAgICBoaWRlIGJvdGggICAgICAgICAgIGJ0bkhhZGxlciAgICAgICAgICAgICAgICAgICAgICAgICBcclxuLy8gICAgICAgICAgMi4gICAgaGlkZGVuICAgICAgc2hvd24gICAgICAgIGFueSAgICB8ICAgJGJ0bk1lbnVPZmYgICBjbGljay9ub25lICAgICAgICBzaG93IGJvdGggICAgICAgICAgIGJ0bkhhZGxlciAgICAgICAgICAgICAgXHJcbi8vICAgICAgICAgIDMuICAgIGhpZGRlbiAgICAgIGhpZGRlbiAgICAgICBvZmYgICAgfCAgICRib3ggICAgICAgICAgY2xpY2svbm9uZSAgICAgICAgc2hvdyBib3RoICAgICAgICAgICBib3hIYW5kbGVyICAgICAgICAgICAgICAgICAgICAgICAgXHJcbi8vICAgICAgICAgIDQuICAgIGhpZGRlbiAgICAgIGhpZGRlbiAgICAgICBvbiAgICAgfCAgICRib3ggICAgICAgICAgY2xpY2svbm9uZSAgICAgICAgc2hvdyAkZm9vdGVyQXNDdHJsICBib3hIYW5kbGVyICAgICAgICAgICAgIHNob3dzICRmb290ZXIgZm9yIDVzZWMgYXMgVmlkZW9DdHJsUGFuZWwgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4vLyAgICAgICAgICA1LiAgICBoaWRkZW4gICAgICBzaG93biBDdHJsICAgb24gICAgIHwgICAkZm9vdGVyICAgICAgIGNsaWNrL25vbmUgICAgICAgIHJlc2V0IHRpbWVyICAgICAgICAgZm9vdGVySGFuZGxlciAgICAgICAgICBjbGljayByZXNldHMgNXNlYyBjb3VudGRvd24gKGZvciBhbnkgZm9vdGVyIGJ1dHRvbiBleGNlcHQgJGJ0bk1lbnVPZmYgYW5kICRidG5GdWxsU2NyKVxyXG4vLyAgICAgICAgICA2LiAgICBhbnkgICAgICAgICBhbnkgICAgICAgICAgb2ZmICAgIHwgICBGdWxsU2NyZWVuICAgIGV2ZW50L29uICAgICAgICAgIGhpZGUgYm90aCAgICAgICAgICAgZnVsbFNjcmVlbkhhbmRsZXIgICAgICAgXHJcbi8vICAgICAgICAgIDcuICAgIGFueSAgICAgICAgIGFueSAgICAgICAgICBvbiAgICAgfCAgIEZ1bGxTY3JlZW4gICAgZXZlbnQvb2ZmICAgICAgICAgc2hvdyBib3RoICAgICAgICAgICBmdWxsU2NyZWVuSGFuZGxlciAgICAgICBcclxuXHJcbiRidG5NZW51T2ZmLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYnRuSGFuZGxlcilcclxuJGZvb3Rlci5vYmplY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmb290ZXJIYW5kbGVyKVxyXG4kYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYm94SGFuZGxlcilcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZnVsbHNjcmVlbmNoYW5nZScsIGZ1bGxTY3JlZW5IYW5kbGVyKVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJywgZnVsbFNjcmVlbkhhbmRsZXIpXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLCBmdWxsU2NyZWVuSGFuZGxlcilcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignTVNGdWxsc2NyZWVuQ2hhbmdlJywgZnVsbFNjcmVlbkhhbmRsZXIpXHJcblxyXG5mdW5jdGlvbiBidG5IYW5kbGVyKGUpIHtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgIGlmKCF3aW5kb3cudmlld2VyU3RhdGUuaXMkc2lkZU1lbnVCb3hIaWRkZW4gJiYgIXdpbmRvdy52aWV3ZXJTdGF0ZS5pcyRmb290ZXJIaWRkZW4pIHtcclxuICAgICAgICAkc2lkZU1lbnVCb3guaGlkZSgpXHJcbiAgICAgICAgJGZvb3Rlci5oaWRlKClcclxuICAgIH0gZWxzZSBpZih3aW5kb3cudmlld2VyU3RhdGUuaXMkc2lkZU1lbnVCb3hIaWRkZW4pIHtcclxuICAgICAgICAkc2lkZU1lbnVCb3guc2hvdygpXHJcbiAgICAgICAgaWYoaWQpe1xyXG4gICAgICAgICAgICAkZm9vdGVyLm9iamVjdC5jbGFzc0xpc3QucmVtb3ZlKCdjdHJsJylcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGlkKVxyXG4gICAgICAgICAgICAkYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYm94SGFuZGxlcilcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZm9vdGVySGFuZGxlcihlKSB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICBpZihhc2skYm94SW5GdWxsU2NyZWVuKCkgJiYgaWQpe1xyXG4gICAgICAgIGNsZWFyVGltZW91dChpZClcclxuICAgICAgICBpZCA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGhpZGVDb250cm9scygpXHJcbiAgICAgICAgICAgICRib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBib3hIYW5kbGVyKVxyXG4gICAgICAgIH0gLCBkdXJhdGlvbkZvb3RlckFzQ3RybClcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBib3hIYW5kbGVyKGUpIHtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgIGlmKGFzayRib3hJbkZ1bGxTY3JlZW4oKSkge1xyXG4gICAgICAgIGlmKHRydWUpIHtcclxuICAgICAgICAgICAgJGJveC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGJveEhhbmRsZXIpXHJcbiAgICAgICAgICAgIHNob3dDb250cm9scygpXHJcbiAgICAgICAgICAgIGlkID0gc2V0VGltZW91dCggZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgICAgIGhpZGVDb250cm9scygpXHJcbiAgICAgICAgICAgICAgICAkYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYm94SGFuZGxlcilcclxuICAgICAgICAgICAgfSAsIGR1cmF0aW9uRm9vdGVyQXNDdHJsKVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYod2luZG93LnZpZXdlclN0YXRlLmlzJHNpZGVNZW51Qm94SGlkZGVuKSAkc2lkZU1lbnVCb3guc2hvdygpXHJcbiAgICAgICAgaWYod2luZG93LnZpZXdlclN0YXRlLmlzJGZvb3RlckhpZGRlbikgJGZvb3Rlci5zaG93KClcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBmdWxsU2NyZWVuSGFuZGxlcigpIHtcclxuICAgIGlmKGFzayRib3hJbkZ1bGxTY3JlZW4oKSl7XHJcbiAgICAgICAgaWYoIXdpbmRvdy52aWV3ZXJTdGF0ZS5pcyRzaWRlTWVudUJveEhpZGRlbikgJHNpZGVNZW51Qm94LmhpZGUoKVxyXG4gICAgICAgIGlmKCF3aW5kb3cudmlld2VyU3RhdGUuaXMkZm9vdGVySGlkZGVuKSAkZm9vdGVyLmhpZGUoKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpZih3aW5kb3cudmlld2VyU3RhdGUuaXMkc2lkZU1lbnVCb3hIaWRkZW4pICRzaWRlTWVudUJveC5zaG93KClcclxuICAgICAgICBpZih3aW5kb3cudmlld2VyU3RhdGUuaXMkZm9vdGVySGlkZGVuKSAkZm9vdGVyLnNob3coKVxyXG4gICAgICAgIGlmKGlkKXtcclxuICAgICAgICAgICAgJGZvb3Rlci5vYmplY3QuY2xhc3NMaXN0LnJlbW92ZSgnY3RybCcpXHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChpZClcclxuICAgICAgICAgICAgJGJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJveEhhbmRsZXIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHNob3dDb250cm9scygpIHtcclxuICAgICRmb290ZXIub2JqZWN0LmNsYXNzTGlzdC5hZGQoJ2N0cmwnKVxyXG4gICAgJGZvb3Rlci5zaG93KClcclxufVxyXG5mdW5jdGlvbiBoaWRlQ29udHJvbHMoKSB7XHJcbiAgICAkZm9vdGVyLmhpZGUoKVxyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xyXG4gICAgICAgICRmb290ZXIub2JqZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2N0cmwnKVxyXG4gICAgfSwgd2luZG93LnZpZXdlclN0YXRlLmR1cmF0aW9uU2hvd0hpZGVNZW51KVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICB3aW5kb3cudmlld2VyU3RhdGUgPSB7XHJcbiAgICAnJGJveCc6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib3gnKSxcclxuICAgICckdmlkZW8nOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW8nKSxcclxuICAgICckc291cmNlJzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNvdXJjZScpLFxyXG4gICAgJyRzaWRlTWVudUJveCc6IHtcclxuICAgICAgICAnb2JqZWN0JzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKSxcclxuICAgICAgICAnaGlkZSc6IG51bGwsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgZnVuY3Rpb24gLT4gdm9pZFxyXG4gICAgICAgICdzaG93JzogbnVsbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBmdW5jdGlvbiAtPiB2b2lkXHJcbiAgICB9LFxyXG4gICAgJyRzbGlkZXInOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcl9fc2xpZGVyJyksXHJcbiAgICAnJGZvb3Rlcic6IHtcclxuICAgICAgICAnb2JqZWN0JzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3RlcicpLFxyXG4gICAgICAgICdoaWRlJzogbnVsbCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBmdW5jdGlvbiAtPiB2b2lkXHJcbiAgICAgICAgJ3Nob3cnOiBudWxsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGZ1bmN0aW9uIC0+IHZvaWRcclxuICAgIH0sXHJcbiAgICAnJGJ0bkhlbHAnOiAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fbGVmdF9faGVscCcpLFxyXG4gICAgJyRidG5QbGF5JzogICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX2xlZnRfX3BsYXknKSxcclxuICAgICckYnRuVm9sdW1lJzogICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19sZWZ0X192b2x1bWUnKSxcclxuICAgICckYnRuUXVhbGl0eSc6ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19sZWZ0X19xdWFsaXR5JyksXHJcbiAgICAnJGJ0blNjYWxlJzogICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fcmlnaHRfX3NjYWxlX2J0bicpLFxyXG4gICAgJyRidG5NZW51T2ZmJzogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX3JpZ2h0X19tZW51LW9mZicpLFxyXG4gICAgJyRidG5GdWxsU2NyJzogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX3JpZ2h0X19mdWxsc2NyJyksXHJcbiAgICAnYWN0aXZlJGlucHV0JzogbnVsbCxcclxuICAgICdoaWdoUXVhbGl0eSc6IGZhbHNlLFxyXG4gICAgJ2lzJHNpZGVNZW51Qm94SGlkZGVuJzogZmFsc2UsXHJcbiAgICAnaXMkZm9vdGVySGlkZGVuJzogZmFsc2UsXHJcbiAgICAnZHVyYXRpb25TaG93SGlkZU1lbnUnOiAxMDAwLCAgIC8vICBtc1xyXG4gICAgJ2R1cmF0aW9uU2NhbGVTdWJtZW51JzogNDAwMCxcclxuICAgICdkdXJhdGlvbkZvb3RlckFzQ3RybCc6IDUwMDAsXHJcbiAgICAndGltZXJGb3JFcnJvclBhZ2UnOiB1bmRlZmluZWRcclxuICB9O1xyXG5cclxuICB3aW5kb3cudmlld2VyU3RhdGUuaXNWaWRlb1dvcmtpbmcgPSByZXF1aXJlKCcuL2Fza1ZpZGVvV29ya2luZy5qcycpICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgYm9vbGVhblxyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZS5pc0Z1bGxTY3JlZW5BbGxvd2VkID0gcmVxdWlyZSgnLi9hc2tGdWxsU2NyZWVuLmpzJykgICAgICAgICAgICAgICAgICAgICAgIC8vICBib29sZWFuXHJcbiAgd2luZG93LnZpZXdlclN0YXRlLmlzX2lQYWRfaVBob25lID0gcmVxdWlyZSgnLi9hc2tfaVBhZF9pUGhvbmUuanMnKSAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGJvb2xlYW5cclxuICB3aW5kb3cudmlld2VyU3RhdGUuaXNfaVBhZF9pUGhvbmVfaW5GdWxsU2NyZWVuID0gcmVxdWlyZSgnLi9hc2tfaVBhZF9pUGhvbmVfRnVsbFNjcmVlbi5qcycpICAvLyAgYm9vbGVhblxyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZS5hc2skYm94SW5GdWxsU2NyZWVuID0gcmVxdWlyZSgnLi9hc2skYm94SW5GdWxsU2NyZWVuLmpzJykgICAgICAgICAgICAgICAgIC8vICBmdW5jdGlvbiAtPiBib29sZWFuXHJcbiAgXHJcbiAgcmVxdWlyZSgnLi9zZXRNZW51QW5kRm9vdGVyTWV0aG9kcy5qcycpXHJcbiAgcmVxdWlyZSgnLi9jaGFubmVsU2VsZWN0b3IuanMnKVxyXG4vLyAgcmVxdWlyZSgnLi9xdWFsaXR5U2VsZWN0b3IuanMnKVxyXG4gIHJlcXVpcmUoJy4vaGlkZVNob3dNZW51LmpzJylcclxuICByZXF1aXJlKCcuL2Z1bGxzY3JlZW4uanMnKVxyXG4gIHJlcXVpcmUoJy4vdmlkZW9FcnJvckxpc3RlbmVyJylcclxuICByZXF1aXJlKCcuL2Zvb3Rlcl9idXR0b25zLmpzJylcclxuICByZXF1aXJlKCcuL2J1dHRvblNjYWxlLmpzJylcclxuICByZXF1aXJlKCcuL3NjcmVlbkhlaWdodC5qcycpXHJcblxyXG59IiwiJ3VzZSBzdHJpY3QnXHJcbmNvbnNvbGUubG9nKCdzY3JlZW5IZWlnaHQnKVxyXG5zZXRGb250U2l6ZSgpXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzZXRGb250U2l6ZSlcclxuZnVuY3Rpb24gc2V0Rm9udFNpemUoKSB7XHJcbiAgICB2YXIgZm9udFNpemUgPSBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCAvIDIwXHJcbiAgICBpZihkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCA+IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgpIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmZvbnRTaXplID0gMC40ICogZm9udFNpemUgKyAncHgnXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuZm9udFNpemUgPSBmb250U2l6ZSArICdweCdcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKCdyZXNpemUnKVxyXG59IiwiJ3VzZSBzdHJpY3QnXHJcblxyXG4vLyBodHRwOi8vcGF1bGlyaXNoLmNvbS8yMDExL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtYW5pbWF0aW5nL1xyXG4vLyBodHRwOi8vbXkub3BlcmEuY29tL2Vtb2xsZXIvYmxvZy8yMDExLzEyLzIwL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtZXItYW5pbWF0aW5nXHJcblxyXG4vLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgcG9seWZpbGwgYnkgRXJpayBNw7ZsbGVyLiBmaXhlcyBmcm9tIFBhdWwgSXJpc2ggYW5kIFRpbm8gWmlqZGVsXHJcblxyXG4vLyBNSVQgbGljZW5zZVxyXG5cclxudmFyIGxhc3RUaW1lID0gMDtcclxudmFyIHZlbmRvcnMgPSBbJ21zJywgJ21veicsICd3ZWJraXQnLCAnbyddO1xyXG5mb3IodmFyIHggPSAwOyB4IDwgdmVuZG9ycy5sZW5ndGggJiYgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7ICsreCkge1xyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2ZW5kb3JzW3hdKydSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcclxuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2ZW5kb3JzW3hdKydDYW5jZWxBbmltYXRpb25GcmFtZSddIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IHdpbmRvd1t2ZW5kb3JzW3hdKydDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcclxufVxyXG5cclxuaWYgKCF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKVxyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uKGNhbGxiYWNrLCBlbGVtZW50KSB7XHJcbiAgICAgICAgdmFyIGN1cnJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgdmFyIHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCAzMiAtIChjdXJyVGltZSAtIGxhc3RUaW1lKSk7ICAvLyAgICBNYXRoLm1heCgwLCAxNiAtIChjdXJyVGltZSAtIGxhc3RUaW1lKSk7XHJcbiAgICAgICAgdmFyIGlkID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7IH0sIHRpbWVUb0NhbGwpO1xyXG4gICAgICAgIGxhc3RUaW1lID0gY3VyclRpbWUgKyB0aW1lVG9DYWxsO1xyXG4gICAgICAgIHJldHVybiBpZDtcclxuICAgIH07XHJcblxyXG5pZiAoIXdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSlcclxuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KGlkKTtcclxuICAgIH07XHJcbi8vICBFbmQgckZBIHBvbHlmaWxsXHJcblxyXG52YXIgJHNpZGVNZW51Qm94ID0gd2luZG93LnZpZXdlclN0YXRlLiRzaWRlTWVudUJveFxyXG52YXIgJGZvb3RlciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kZm9vdGVyXHJcbnZhciBkdXJhdGlvbiA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5kdXJhdGlvblxyXG5cclxud2luZG93LnZpZXdlclN0YXRlLiRzaWRlTWVudUJveC5oaWRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhpZGUpXHJcbiAgICBmdW5jdGlvbiBoaWRlKHRpbWVTdGFtcCkge1xyXG4gICAgICAgIGlmICghc3RhcnRUaW1lKSBzdGFydFRpbWUgPSB0aW1lU3RhbXBcclxuICAgICAgICB2YXIgcHJvZ3Jlc3MgPSAodGltZVN0YW1wIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uXHJcbiAgICAgICAgaWYgKHByb2dyZXNzIDw9IDEpIHtcclxuICAgICAgICAgICAgJHNpZGVNZW51Qm94Lm9iamVjdC5zdHlsZS5vcGFjaXR5ID0gMSAtIHByb2dyZXNzXHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShoaWRlKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRzaWRlTWVudUJveC5vYmplY3Quc3R5bGUub3BhY2l0eSA9IDBcclxuICAgICAgICAgICAgJHNpZGVNZW51Qm94Lm9iamVjdC5zdHlsZS5yaWdodCA9ICctNWVtJ1xyXG4gICAgICAgICAgICBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmlzJHNpZGVNZW51Qm94SGlkZGVuID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxud2luZG93LnZpZXdlclN0YXRlLiRzaWRlTWVudUJveC5zaG93ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgJHNpZGVNZW51Qm94Lm9iamVjdC5zdHlsZS5yaWdodCA9ICcnXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2hvdylcclxuICAgIGZ1bmN0aW9uIHNob3codGltZVN0YW1wKSB7XHJcbiAgICAgICAgaWYgKCFzdGFydFRpbWUpIHN0YXJ0VGltZSA9IHRpbWVTdGFtcFxyXG4gICAgICAgIHZhciBwcm9ncmVzcyA9ICh0aW1lU3RhbXAgLSBzdGFydFRpbWUpIC8gZHVyYXRpb25cclxuICAgICAgICBpZiAocHJvZ3Jlc3MgPD0gMSkge1xyXG4gICAgICAgICAgICAkc2lkZU1lbnVCb3gub2JqZWN0LnN0eWxlLm9wYWNpdHkgPSBwcm9ncmVzc1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2hvdylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkc2lkZU1lbnVCb3gub2JqZWN0LnN0eWxlLm9wYWNpdHkgPSAxXHJcbiAgICAgICAgICAgIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaXMkc2lkZU1lbnVCb3hIaWRkZW4gPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxud2luZG93LnZpZXdlclN0YXRlLiRmb290ZXIuaGlkZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShoaWRlKVxyXG4gICAgZnVuY3Rpb24gaGlkZSh0aW1lU3RhbXApIHtcclxuICAgICAgICBpZiAoIXN0YXJ0VGltZSkgc3RhcnRUaW1lID0gdGltZVN0YW1wXHJcbiAgICAgICAgdmFyIHByb2dyZXNzID0gKHRpbWVTdGFtcCAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvblxyXG4gICAgICAgIGlmIChwcm9ncmVzcyA8PSAxKSB7XHJcbiAgICAgICAgICAgICRmb290ZXIub2JqZWN0LnN0eWxlLm9wYWNpdHkgPSAxIC0gcHJvZ3Jlc3NcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhpZGUpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJGZvb3Rlci5vYmplY3Quc3R5bGUub3BhY2l0eSA9IDBcclxuICAgICAgICAgICAgJGZvb3Rlci5vYmplY3Quc3R5bGUuYm90dG9tID0gJy0xNCUnXHJcbiAgICAgICAgICAgIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaXMkZm9vdGVySGlkZGVuID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxud2luZG93LnZpZXdlclN0YXRlLiRmb290ZXIuc2hvdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgICRmb290ZXIub2JqZWN0LnN0eWxlLmJvdHRvbSA9ICcnXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2hvdylcclxuICAgIGZ1bmN0aW9uIHNob3codGltZVN0YW1wKSB7XHJcbiAgICAgICAgaWYgKCFzdGFydFRpbWUpIHN0YXJ0VGltZSA9IHRpbWVTdGFtcFxyXG4gICAgICAgIHZhciBwcm9ncmVzcyA9ICh0aW1lU3RhbXAgLSBzdGFydFRpbWUpIC8gZHVyYXRpb25cclxuICAgICAgICBpZiAocHJvZ3Jlc3MgPD0gMSkge1xyXG4gICAgICAgICAgICAkZm9vdGVyLm9iamVjdC5zdHlsZS5vcGFjaXR5ID0gcHJvZ3Jlc3NcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNob3cpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJGZvb3Rlci5vYmplY3Quc3R5bGUub3BhY2l0eSA9IDFcclxuICAgICAgICAgICAgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5pcyRmb290ZXJIaWRkZW4gPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbnZhciAkdmlkZW8gPSB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvXHJcblxyXG4kdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmYWlsZWQpXHJcblxyXG4gZnVuY3Rpb24gZmFpbGVkKGUpIHtcclxuICAgLy8gdmlkZW8gcGxheWJhY2sgZmFpbGVkIC0gc2hvdyBhIG1lc3NhZ2Ugc2F5aW5nIHdoeSAgICAgLSBmcm9tIGh0dHBzOi8vZGV2LnczLm9yZy9odG1sNS9zcGVjLWF1dGhvci12aWV3L3ZpZGVvLmh0bWwjdmlkZW9cclxuICAgc3dpdGNoIChlLnRhcmdldC5lcnJvci5jb2RlKSB7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfQUJPUlRFRDpcclxuICAgICAgIGFsZXJ0KCdZb3UgYWJvcnRlZCB0aGUgdmlkZW8gcGxheWJhY2suJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgICBjYXNlIGUudGFyZ2V0LmVycm9yLk1FRElBX0VSUl9ORVRXT1JLOlxyXG4gICAgICAgYWxlcnQoJ0EgbmV0d29yayBlcnJvciBjYXVzZWQgdGhlIHZpZGVvIGRvd25sb2FkIHRvIGZhaWwgcGFydC13YXkuJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgICBjYXNlIGUudGFyZ2V0LmVycm9yLk1FRElBX0VSUl9ERUNPREU6XHJcbiAgICAgICBhbGVydCgnVGhlIHZpZGVvIHBsYXliYWNrIHdhcyBhYm9ydGVkIGR1ZSB0byBhIGNvcnJ1cHRpb24gcHJvYmxlbSBvciBiZWNhdXNlIHRoZSB2aWRlbyB1c2VkIGZlYXR1cmVzIHlvdXIgYnJvd3NlciBkaWQgbm90IHN1cHBvcnQuJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgICBjYXNlIGUudGFyZ2V0LmVycm9yLk1FRElBX0VSUl9TUkNfTk9UX1NVUFBPUlRFRDpcclxuICAgICAgIGNvbnNvbGUubG9nKCdUaGUgdmlkZW8gY291bGQgbm90IGJlIGxvYWRlZCAgJyArIChEYXRlLm5vdygpIC0gd2luZG93LnZpZXdlclN0YXRlLnRpbWVyRm9yRXJyb3JQYWdlKSk7XHJcbiAgICAgICBhbGVydCgnVGhlIHZpZGVvIGNvdWxkIG5vdCBiZSBsb2FkZWQsIGVpdGhlciBiZWNhdXNlIHRoZSBzZXJ2ZXIgb3IgbmV0d29yayBmYWlsZWQgb3IgYmVjYXVzZSB0aGUgZm9ybWF0IGlzIG5vdCBzdXBwb3J0ZWQuJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgICBkZWZhdWx0OlxyXG4gICAgICAgYWxlcnQoJ0FuIHVua25vd24gZXJyb3Igb2NjdXJyZWQuJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgfVxyXG4gfVxyXG4iXX0=
