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

}
},{"./ask$boxInFullScreen.js":1,"./askFullScreen.js":2,"./askVideoWorking.js":3,"./ask_iPad_iPhone.js":4,"./ask_iPad_iPhone_FullScreen.js":5,"./buttonScale.js":6,"./channelSelector.js":7,"./footer_buttons.js":8,"./fullscreen.js":9,"./hideShowMenu.js":10,"./setMenuAndFooterMethods.js":12,"./videoErrorListener":13}],12:[function(require,module,exports){
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

},{}],13:[function(require,module,exports){
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2EwNS9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hc2skYm94SW5GdWxsU2NyZWVuLmpzIiwianMvYXNrRnVsbFNjcmVlbi5qcyIsImpzL2Fza1ZpZGVvV29ya2luZy5qcyIsImpzL2Fza19pUGFkX2lQaG9uZS5qcyIsImpzL2Fza19pUGFkX2lQaG9uZV9GdWxsU2NyZWVuLmpzIiwianMvYnV0dG9uU2NhbGUuanMiLCJqcy9jaGFubmVsU2VsZWN0b3IuanMiLCJqcy9mb290ZXJfYnV0dG9ucy5qcyIsImpzL2Z1bGxzY3JlZW4uanMiLCJqcy9oaWRlU2hvd01lbnUuanMiLCJqcy9tYWluLmpzIiwianMvc2V0TWVudUFuZEZvb3Rlck1ldGhvZHMuanMiLCJqcy92aWRlb0Vycm9yTGlzdGVuZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0NBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMzR0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKGRvY3VtZW50LmZ1bGxzY3JlZW5FbGVtZW50IHx8IFxyXG4gICAgICAgIGRvY3VtZW50LndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50IHx8XHJcbiAgICAgICAgZG9jdW1lbnQubW96RnVsbFNjcmVlbkVsZW1lbnQgfHxcclxuICAgICAgICBkb2N1bWVudC5tc0Z1bGxzY3JlZW5FbGVtZW50IHx8XHJcbiAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmlzX2lQYWRfaVBob25lX2luRnVsbFNjcmVlbiApIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSBlbHNlIHJldHVybiBmYWxzZVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyICRib3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJGJveFxyXG4gICAgdmFyIGFsbG93ZWQgPSBmYWxzZVxyXG4gICAgaWYgKCRib3gucmVxdWVzdEZ1bGxzY3JlZW4gfHxcclxuICAgICAgICAkYm94Lm1velJlcXVlc3RGdWxsU2NyZWVuIHx8XHJcbiAgICAgICAgJGJveC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbiB8fFxyXG4gICAgICAgICRib3gubXNSZXF1ZXN0RnVsbHNjcmVlblxyXG4gICAgICAgICkge1xyXG4gICAgICAgIGFsbG93ZWQgPSB0cnVlIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdGdWxsU2NyZWVuIG9rJylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxsb3dlZCA9IGZhbHNlIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdObyBmdWxsc2NyZWVuJylcclxuICAgIH1cclxuICAgIHJldHVybiBhbGxvd2VkXHJcbn0pKClcclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBpZih0eXBlb2Ygd2luZG93LnZpZXdlclN0YXRlLiR2aWRlby5wbGF5ID09PSAnZnVuY3Rpb24nICkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd2aWRlbyBvayBuZWVkcyB0byBiZSBjb25maXJtZWQnKVxyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdubyB2aWRlbycpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbn0pKClcclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBpZih3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdpUGFkJykgIT09IC0xICYmXHJcbiAgICAgICAgd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignU2FmYXJpJykgIT09IC0xIClcclxuICAgICAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSBpZih3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdpUGhvbmUnKSAhPT0gLTEgJiZcclxuICAgICAgICB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdTYWZhcmknKSAhPT0gLTEgKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSByZXR1cm4gZmFsc2VcclxufSkoKSIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICBpZih3aW5kb3cudmlld2VyU3RhdGUuaXNfaVBhZF9pUGhvbmUgJiZcclxuICAgICAgICB3aW5kb3cuaW5uZXJIZWlnaHQgPj0gd2luZG93LnNjcmVlbi5hdmFpbEhlaWdodCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9IGVsc2UgcmV0dXJuIGZhbHNlXHJcbn0pKClcclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG4vLyAgICAgICAgICBTY2FsZVxyXG52YXIgJGJveCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYm94XHJcbnZhciAkdmlkZW8gPSB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvXHJcbnZhciAkYnRuU2NhbGUgPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0blNjYWxlXHJcbnZhciAkc3ZnU2NhbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NhbGVfYnRuX3N2ZycpXHJcbnZhciAkYnRuU2NhbGVTdWJCdG5zQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fcmlnaHRfX3NjYWxlX3N1YmJ0bnMnKVxyXG52YXIgJHN1YkJ0blVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1YmJ0bl9fdXAgc3ZnJylcclxudmFyICRzdWJCdG5Eb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1YmJ0bl9fZG93biBzdmcnKVxyXG52YXIgcmF0aW8gPSB1bmRlZmluZWRcclxudmFyIG1heCR2aWRlb0hlaWdodCA9IHVuZGVmaW5lZFxyXG52YXIgbWluJHZpZGVvSGVpZ2h0ID0gdW5kZWZpbmVkXHJcbnZhciBzdGVwID0gdW5kZWZpbmVkXHJcbnZhciBuID0gdW5kZWZpbmVkXHJcbnZhciBuTWF4ID0gMFxyXG52YXIgbk1pbiA9IDBcclxudmFyIGlkID0gdW5kZWZpbmVkXHJcbnZhciBhY3RpdmVJRCA9IHVuZGVmaW5lZFxyXG5cclxuJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZGRhdGEnLCBzY2FsZVJlc3RhcnQpXHJcbiR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNsZWFyVGltZW91dChpZClcclxuICAgIHN0b3BTY2FsaW5nKClcclxuICAgIGNvbnNvbGUubG9nKCd2aWRlbyBlcnJvcicpXHJcbn0pXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Z1bGxzY3JlZW5jaGFuZ2UnLCBzY2FsZVJlc3RhcnQpXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnLCBzY2FsZVJlc3RhcnQpXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLCBzY2FsZVJlc3RhcnQpXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ01TRnVsbHNjcmVlbkNoYW5nZScsIHNjYWxlUmVzdGFydClcclxuXHJcbmZ1bmN0aW9uIHNjYWxlUmVzdGFydCgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdSZXNjYWxlIHN0YXJ0OiAnICsgKERhdGUubm93KCkgLSB3aW5kb3cudmlld2VyU3RhdGUudGltZXJGb3JFcnJvclBhZ2UpKSAgICAgIFxyXG4gICAgc3RvcFNjYWxpbmcoKVxyXG4gICAgY2xlYXJUaW1lb3V0KGlkKVxyXG4gICAgaWQgPSBzZXRUaW1lb3V0KHN0YXJ0U2NhbGluZywgMTUwMClcclxufVxyXG5mdW5jdGlvbiBzdGFydFNjYWxpbmcoKSB7XHJcbiAgICByYXRpbyA9ICRib3guY2xpZW50V2lkdGggLyAkdmlkZW8ub2Zmc2V0V2lkdGhcclxuICAgIGlmKHJhdGlvIDw9IDEpIHtcclxuICAgICAgICBtaW4kdmlkZW9IZWlnaHQgPSAxMDAgKiByYXRpbyAgIC8vICAlXHJcbiAgICAgICAgbk1pbiA9IE1hdGguZmxvb3IoKG1pbiR2aWRlb0hlaWdodCAtIDEwMCkgLyAxNClcclxuICAgICAgICBuTWF4ID0gMFxyXG4gICAgICAgIHN0ZXAgPSAobWluJHZpZGVvSGVpZ2h0IC0gMTAwKSAvIG5NaW5cclxuICAgICAgICBjb25zb2xlLmxvZyhuTWluICsgJyBzdGVwcycpXHJcbiAgICAgICAgJHN1YkJ0bkRvd24uc3R5bGUuZmlsbCA9ICcnXHJcbiAgICAgICAgJHN1YkJ0blVwLnN0eWxlLmZpbGwgPSAncmdiYSgwLCAwLCAwLCAwLjUpJ1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBtYXgkdmlkZW9IZWlnaHQgPSAxMDAgKiByYXRpbyAgIC8vICAlXHJcbiAgICAgICAgbk1heCA9IE1hdGguY2VpbCgobWF4JHZpZGVvSGVpZ2h0IC0gMTAwKSAvIDE0KVxyXG4gICAgICAgIG5NaW4gPSAwXHJcbiAgICAgICAgc3RlcCA9IChtYXgkdmlkZW9IZWlnaHQgLSAxMDApIC8gbk1heFxyXG4gICAgICAgIGNvbnNvbGUubG9nKG5NYXggKyAnIHN0ZXBzJylcclxuICAgICAgICAkc3ViQnRuRG93bi5zdHlsZS5maWxsID0gJ3JnYmEoMCwgMCwgMCwgMC41KSdcclxuICAgICAgICAkc3ViQnRuVXAuc3R5bGUuZmlsbCA9ICcnXHJcbiAgICB9XHJcbiAgICBuID0gMFxyXG4gICAgJGJ0blNjYWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYnRuU2NhbGVIYW5kbGVyKSBcclxuICAgICRzdWJCdG5VcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN1YkJ0blVwSGFuZGxlcikgXHJcbiAgICAkc3ViQnRuRG93bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN1YkJ0bkRvd25IYW5kbGVyKSBcclxufVxyXG5mdW5jdGlvbiBzdG9wU2NhbGluZygpIHtcclxuICAgIHJhdGlvID0gdW5kZWZpbmVkXHJcbiAgICBtYXgkdmlkZW9IZWlnaHQgPSB1bmRlZmluZWRcclxuICAgIHN0ZXAgPSB1bmRlZmluZWRcclxuICAgIG4gPSB1bmRlZmluZWRcclxuICAgICR2aWRlby5zdHlsZS5oZWlnaHQgPSAnMTAwJSdcclxuICAgICRidG5TY2FsZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGJ0blNjYWxlSGFuZGxlcikgXHJcbiAgICAkc3ViQnRuVXAucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdWJCdG5VcEhhbmRsZXIpIFxyXG4gICAgJHN1YkJ0bkRvd24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdWJCdG5Eb3duSGFuZGxlcilcclxufVxyXG5mdW5jdGlvbiBidG5TY2FsZUhhbmRsZXIoZSl7XHJcbiAgICBpZihlLnRhcmdldCA9PT0gJGJ0blNjYWxlIHx8IGUudGFyZ2V0ID09PSAkc3ZnU2NhbGUpIHtcclxuICAgICAgICBpZigkYnRuU2NhbGVTdWJCdG5zQm94LmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpe1xyXG4gICAgICAgICAgICByZW1vdmVBY3RpdmUoKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRidG5TY2FsZVN1YkJ0bnNCb3guY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgICAgICAgICAgYWN0aXZlSUQgPSBzZXRUaW1lb3V0KHJlbW92ZUFjdGl2ZSwgd2luZG93LnZpZXdlclN0YXRlLmR1cmF0aW9uU2NhbGVTdWJtZW51KVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBzdWJCdG5VcEhhbmRsZXIoKXtcclxuICAgIGlmKG4gPCBuTWF4KSB7XHJcbiAgICAgICAgJHZpZGVvLnN0eWxlLmhlaWdodCA9IDEwMCArICsrbiAqIHN0ZXAgKyAnJSdcclxuICAgICAgICBpZihuID09PSBuTWF4KSAkc3ViQnRuVXAuc3R5bGUuZmlsbCA9ICdyZ2JhKDAsIDAsIDAsIDAuNSknXHJcbiAgICAgICAgaWYobiA9PT0gKG5NaW4gKyAxKSkgJHN1YkJ0bkRvd24uc3R5bGUuZmlsbCA9ICcnXHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KGFjdGl2ZUlEKVxyXG4gICAgICAgIGFjdGl2ZUlEID0gc2V0VGltZW91dChyZW1vdmVBY3RpdmUsIHdpbmRvdy52aWV3ZXJTdGF0ZS5kdXJhdGlvblNjYWxlU3VibWVudSlcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBzdWJCdG5Eb3duSGFuZGxlcigpe1xyXG4gICAgaWYobiA+IG5NaW4pIHtcclxuICAgICAgICAkdmlkZW8uc3R5bGUuaGVpZ2h0ID0gMTAwICsgLS1uICogc3RlcCArICclJ1xyXG4gICAgICAgIGlmKG4gPT09IG5NaW4pICRzdWJCdG5Eb3duLnN0eWxlLmZpbGwgPSAncmdiYSgwLCAwLCAwLCAwLjUpJ1xyXG4gICAgICAgIGlmKG4gPT09IChuTWF4IC0gMSkpICRzdWJCdG5VcC5zdHlsZS5maWxsID0gJydcclxuICAgICAgICBjbGVhclRpbWVvdXQoYWN0aXZlSUQpXHJcbiAgICAgICAgYWN0aXZlSUQgPSBzZXRUaW1lb3V0KHJlbW92ZUFjdGl2ZSwgd2luZG93LnZpZXdlclN0YXRlLmR1cmF0aW9uU2NhbGVTdWJtZW51KVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHJlbW92ZUFjdGl2ZSgpIHtcclxuICAgICRidG5TY2FsZVN1YkJ0bnNCb3guY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxufVxyXG4vLyAkdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignbG9hZHN0YXJ0JywgZnVuY3Rpb24oKXtcclxuLy8gICAgIGNvbnNvbGUubG9nKCdUaGUgbG9hZHN0YXJ0IGV2ZW50IG9jY3VycyB3aGVuIHRoZSBicm93c2VyIHN0YXJ0cyBsb29raW5nIGZvciB0aGUgc3BlY2lmaWVkIGF1ZGlvL3ZpZGVvLiBUaGlzIGlzIHdoZW4gdGhlIGxvYWRpbmcgcHJvY2VzcyBzdGFydHMuJyArIChEYXRlLm5vdygpIC0gd2luZG93LnZpZXdlclN0YXRlLnRpbWVyRm9yRXJyb3JQYWdlKSlcclxuLy8gfSlcclxuLy8gJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2R1cmF0aW9uY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuLy8gICAgIGNvbnNvbGUubG9nKCdUaGUgZHVyYXRpb25jaGFuZ2UgZXZlbnQgb2NjdXJzIHdoZW4gdGhlIGR1cmF0aW9uIGRhdGEgb2YgdGhlIHNwZWNpZmllZCBhdWRpby92aWRlbyBpcyBjaGFuZ2VkLicgKyAoRGF0ZS5ub3coKSAtIHdpbmRvdy52aWV3ZXJTdGF0ZS50aW1lckZvckVycm9yUGFnZSkpXHJcbi8vIH0pXHJcbi8vICR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRtZXRhZGF0YScsIGZ1bmN0aW9uKCl7XHJcbi8vICAgICBjb25zb2xlLmxvZygnVGhlIGxvYWRlZG1ldGFkYXRhIGV2ZW50IG9jY3VycyB3aGVuIG1ldGEgZGF0YSBmb3IgdGhlIHNwZWNpZmllZCBhdWRpby92aWRlbyBoYXMgYmVlbiBsb2FkZWQuJyArIChEYXRlLm5vdygpIC0gd2luZG93LnZpZXdlclN0YXRlLnRpbWVyRm9yRXJyb3JQYWdlKSlcclxuLy8gfSlcclxuXHJcbi8vICR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRkYXRhJywgZnVuY3Rpb24oKXtcclxuLy8gICAgIGNvbnNvbGUubG9nKCdUaGUgbG9hZGVkZGF0YSBldmVudCBvY2N1cnMgd2hlbiBkYXRhIGZvciB0aGUgY3VycmVudCBmcmFtZSBpcyBsb2FkZWQsIGJ1dCBub3QgZW5vdWdoIGRhdGEgdG8gcGxheSBuZXh0IGZyYW1lIG9mIHRoZSBzcGVjaWZpZWQgYXVkaW8vdmlkZW8uJyArIChEYXRlLm5vdygpIC0gd2luZG93LnZpZXdlclN0YXRlLnRpbWVyRm9yRXJyb3JQYWdlKSlcclxuLy8gfSlcclxuLy8gJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgZnVuY3Rpb24oKXtcclxuLy8gICAgIGNvbnNvbGUubG9nKCdUaGUgcHJvZ3Jlc3MgZXZlbnQgb2NjdXJzIHdoZW4gdGhlIGJyb3dzZXIgaXMgZG93bmxvYWRpbmcgdGhlIHNwZWNpZmllZCBhdWRpby92aWRlby4nICsgKERhdGUubm93KCkgLSB3aW5kb3cudmlld2VyU3RhdGUudGltZXJGb3JFcnJvclBhZ2UpKVxyXG4vLyB9KVxyXG4vLyAkdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheScsIGZ1bmN0aW9uKCl7XHJcbi8vICAgICBjb25zb2xlLmxvZygnVGhlIGNhbnBsYXkgZXZlbnQgb2NjdXJzIHdoZW4gdGhlIGJyb3dzZXIgY2FuIHN0YXJ0IHBsYXlpbmcgdGhlIHNwZWNpZmllZCBhdWRpby92aWRlbyAod2hlbiBpdCBoYXMgYnVmZmVyZWQgZW5vdWdoIHRvIGJlZ2luKS4nICsgKERhdGUubm93KCkgLSB3aW5kb3cudmlld2VyU3RhdGUudGltZXJGb3JFcnJvclBhZ2UpKVxyXG4vLyB9KVxyXG4vLyAkdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCBmdW5jdGlvbigpe1xyXG4vLyAgICAgY29uc29sZS5sb2coJ1RoZSBjYW5wbGF5dGhyb3VnaCBldmVudCBvY2N1cnMgd2hlbiB0aGUgYnJvd3NlciBlc3RpbWF0ZXMgaXQgY2FuIHBsYXkgdGhyb3VnaCB0aGUgc3BlY2lmaWVkIGF1ZGlvL3ZpZGVvIHdpdGhvdXQgaGF2aW5nIHRvIHN0b3AgZm9yIGJ1ZmZlcmluZy4nICsgKERhdGUubm93KCkgLSB3aW5kb3cudmlld2VyU3RhdGUudGltZXJGb3JFcnJvclBhZ2UpKVxyXG4vLyB9KVxyXG4iLCJcInVzZSBzdHJpY3RcIlxyXG5cclxudmFyICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW9cclxudmFyICRzb3VyY2UgPSB3aW5kb3cudmlld2VyU3RhdGUuJHNvdXJjZVxyXG52YXIgJHNsaWRlciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc2xpZGVyXHJcbnZhciAkYnRuTWVudU9uT2YgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19yaWdodF9fbWVudS1vZmYnKVxyXG52YXIgbGluayA9ICcnXHJcbnZhciAkYnRucyA9IHtcclxuICAgIFwiY2hfMWdvcm9kc2tveVwiOiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF8xZ29yb2Rza295XCIpLFxyXG4gICAgXCJjaF8zdHN5ZnJvdm95XCI6ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoXzN0c3lmcm92b3lcIiksXHJcbiAgICBcImNoX3JlcG9ydGVyXCI6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfcmVwb3J0ZXJcIiksXHJcbiAgICBcImNoX2FjYWRlbWlhXCI6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfYWNhZGVtaWFcIiksXHJcbiAgICBcImNoX2ExXCI6ICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfYTFcIiksXHJcbiAgICBcImNoX2R1bXNrYXlhXCI6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfZHVtc2theWFcIiksXHJcbiAgICBcImNoX2d0dlwiOiAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfZ3R2XCIpLFxyXG4gICAgXCJjaF9zdHZcIjogICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX3N0dlwiKSxcclxuICAgIFwiY2hfdWduYXlhdm9sbmFcIjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF91Z25heWF2b2xuYVwiKSxcclxuICAgIFwiY2hfbmVtb1wiOiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9uZW1vXCIpXHJcbn1cclxuJGJ0bnMuY2hfMWdvcm9kc2tveS5zZXRBdHRyaWJ1dGUoICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxLzF0dm9kLzF0dm9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgICAgKVxyXG4kYnRucy5jaF8zdHN5ZnJvdm95LnNldEF0dHJpYnV0ZSggICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly9jZG41LmxpdmUtdHYub2QudWE6ODA4MS90di8zdHZvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiICApXHJcbiRidG5zLmNoX3JlcG9ydGVyLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovL2NkbjQubGl2ZS10di5vZC51YTo4MDgxL3R2LzMxY2hvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiIClcclxuJGJ0bnMuY2hfYWNhZGVtaWEuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vY2RuNC5saXZlLXR2Lm9kLnVhOjgwODEvdHYvMzZjaG9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgKVxyXG4kYnRucy5jaF9hMS5zZXRBdHRyaWJ1dGUoICAgICAgICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvYTFvZC9hMW9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgICAgICApXHJcbiRidG5zLmNoX2R1bXNrYXlhLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzg6ODA4MS9kdW1za2EvZHVtc2thLWFici1scS9wbGF5bGlzdC5tM3U4XCIgIClcclxuJGJ0bnMuY2hfZ3R2LnNldEF0dHJpYnV0ZSggICAgICAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL2Exb2QvZ3R2b2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICAgKVxyXG4kYnRucy5jaF9zdHYuc2V0QXR0cmlidXRlKCAgICAgICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvc3R2b2Qvc3R2b2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICApXHJcbiRidG5zLmNoX3VnbmF5YXZvbG5hLnNldEF0dHJpYnV0ZSggJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS93YXZlL3dhdmUtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICAgIClcclxuJGJ0bnMuY2hfbmVtby5zZXRBdHRyaWJ1dGUoICAgICAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL25lbW8vbW9yLXN1Yi9wbGF5bGlzdC5tM3U4XCIgICAgICAgICAgKVxyXG5cclxuJGJ0bnMuY2hfMWdvcm9kc2tveS5zZXRBdHRyaWJ1dGUoICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxLzF0dm9kLzF0dm9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgKVxyXG4kYnRucy5jaF8zdHN5ZnJvdm95LnNldEF0dHJpYnV0ZSggICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly9jZG41LmxpdmUtdHYub2QudWE6ODA4MS90di8zdHZvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgICApXHJcbiRidG5zLmNoX3JlcG9ydGVyLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovL2NkbjQubGl2ZS10di5vZC51YTo4MDgxL3R2LzMxY2hvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgIClcclxuJGJ0bnMuY2hfYWNhZGVtaWEuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vY2RuNC5saXZlLXR2Lm9kLnVhOjgwODEvdHYvMzZjaG9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgKVxyXG4kYnRucy5jaF9hMS5zZXRBdHRyaWJ1dGUoICAgICAgICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvYTFvZC9hMW9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgICApXHJcbiRidG5zLmNoX2R1bXNrYXlhLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzg6ODA4MS9kdW1za2EvZHVtc2thLWFici9wbGF5bGlzdC5tM3U4XCIgICAgIClcclxuJGJ0bnMuY2hfZ3R2LnNldEF0dHJpYnV0ZSggICAgICAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL2Exb2QvZ3R2b2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICAgKVxyXG4kYnRucy5jaF9zdHYuc2V0QXR0cmlidXRlKCAgICAgICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvc3R2b2Qvc3R2b2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICApXHJcbiRidG5zLmNoX3VnbmF5YXZvbG5hLnNldEF0dHJpYnV0ZSggJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS93YXZlL3dhdmUtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICAgIClcclxuJGJ0bnMuY2hfbmVtby5zZXRBdHRyaWJ1dGUoICAgICAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL25lbW8vbW9yLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgICAgKVxyXG5cclxuJHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgaWYoZS50YXJnZXQudGFnTmFtZSA9PT0gJ0lOUFVUJyl7XHJcbiAgICAgICAgaWYod2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dCA9PT0gZS50YXJnZXQpIHtcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dC5jaGVja2VkID0gZmFsc2VcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dCA9IG51bGxcclxuICAgICAgICAgICAgJHZpZGVvLnN0eWxlLmJhY2tncm91bmRTaXplID0gXCJcIlxyXG4gICAgICAgICAgICAkdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCAnJylcclxuICAgICAgICAgICAgJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsICcnKVxyXG4gICAgICAgICAgICAkYnRuTWVudU9uT2Yuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQgPSBlLnRhcmdldFxyXG4gICAgICAgICAgICBpZih3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkpICBsaW5rID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmstaHEnKVxyXG4gICAgICAgICAgICBlbHNlIGxpbmsgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1scScpXHJcbiAgICAgICAgICAgICR2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgICAgICAgICRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICAgICAgICAkdmlkZW8uc3R5bGUuYmFja2dyb3VuZFNpemUgPSBcIjAgMFwiXHJcbiAgICAgICAgICAgIGlmKCR2aWRlby5wbGF5KSAkdmlkZW8ucGxheSgpO1xyXG4gICAgICAgICAgICBlbHNlIGFsZXJ0ICgndmlkZW8gY2Fubm90IHBsYXknKVxyXG4gICAgICAgICAgICAkYnRuTWVudU9uT2Yuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS50aW1lckZvckVycm9yUGFnZSA9IERhdGUubm93KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pXHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxuLy8gICAgICAgICAgSGVscFxyXG52YXIgJGhlbHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVscCcpXHJcbnZhciAkdmlkZW8gPSB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvXHJcbnZhciAkYm94ID0gd2luZG93LnZpZXdlclN0YXRlLiRib3hcclxuXHJcbnZhciAkYnRuSGVscCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuSGVscFxyXG4kYnRuSGVscC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICBpZigkaGVscC5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpIHtcclxuICAgICAgICAkaGVscC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICRoZWxwLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIilcclxuICAgIH1cclxufSlcclxuXHJcbi8vICAgICAgICAgIFBsYXkgLyBQYXVzZVxyXG52YXIgJGJ0blBsYXlQYXVzZSA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuUGxheVxyXG52YXIgJHN2Z1BsYXkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGxheScpXHJcbnZhciAkc3ZnUGF1c2UgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcucGF1c2UnKVxyXG5pZiAoJHZpZGVvLnBhdXNlZCl7XHJcbiAgICAkc3ZnUGxheS5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpXHJcbn0gZWxzZSB7XHJcbiAgICAkc3ZnUGF1c2UuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKVxyXG59IFxyXG4kYnRuUGxheVBhdXNlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIGlmICgkdmlkZW8ucGF1c2VkKSAkdmlkZW8ucGxheSgpIFxyXG4gICAgZWxzZSAkdmlkZW8ucGF1c2UoKVxyXG59KVxyXG4kdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGxheScsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJHN2Z1BhdXNlLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIilcclxuICAgICAgICAkc3ZnUGxheS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXHJcbn0pXHJcbiR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwYXVzZScsIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJHN2Z1BsYXkuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKVxyXG4gICAgICAgICRzdmdQYXVzZS5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXHJcbn0pXHJcblxyXG4vLyAgICAgICAgICBWb2x1bWVcclxudmFyICRidG5Wb2x1bWUgPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0blZvbHVtZVxyXG52YXIgJHN2Z1ZvbHVtZU9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZvbHVtZV9vbicpXHJcbnZhciAkc3ZnVm9sdW1lT2ZmID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZvbHVtZV9vZmYnKVxyXG4kYnRuVm9sdW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIGlmICgkdmlkZW8ubXV0ZWQpe1xyXG4gICAgICAgICR2aWRlby5tdXRlZCA9IGZhbHNlIFxyXG4gICAgICAgICRzdmdWb2x1bWVPbi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpXHJcbiAgICAgICAgJHN2Z1ZvbHVtZU9mZi5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICR2aWRlby5tdXRlZCA9IHRydWVcclxuICAgICAgICAkc3ZnVm9sdW1lT24uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxyXG4gICAgICAgICRzdmdWb2x1bWVPZmYuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKVxyXG4gICAgfSBcclxufSlcclxuXHJcbi8vICAgICAgICAgIFF1YWxpdHlcclxudmFyICRidG5RdWFsaXR5ID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5RdWFsaXR5XHJcbnZhciAkc3ZnUXVhbGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX2xlZnRfX3F1YWxpdHkgc3ZnJylcclxudmFyIGxpbmsgPSAnJ1xyXG5pZiAod2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5KSB7XHJcbiAgJHN2Z1F1YWxpdHkuY2xhc3NMaXN0LnJlbW92ZSgnb2ZmJylcclxufSBlbHNlIHtcclxuICAkc3ZnUXVhbGl0eS5jbGFzc0xpc3QuYWRkKCdvZmYnKVxyXG59XHJcbiRidG5RdWFsaXR5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIGlmICh3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkpIHtcclxuICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkgPSBmYWxzZVxyXG4gICAgICAgICRzdmdRdWFsaXR5LmNsYXNzTGlzdC5hZGQoJ29mZicpXHJcbiAgICAgICAgaWYgKHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQpIHtcclxuICAgICAgICAgICAgbGluayA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmstbHEnKVxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLiRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvLnBsYXkoKVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5ID0gdHJ1ZVxyXG4gICAgICAgICRzdmdRdWFsaXR5LmNsYXNzTGlzdC5yZW1vdmUoJ29mZicpXHJcbiAgICAgICAgaWYgKHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQpIHtcclxuICAgICAgICAgICAgbGluayA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmstaHEnKVxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLiRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvLnBsYXkoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuXHJcbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgJGJveCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYm94XG52YXIgJGJ0bkZ1bGxTY3IgPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0bkZ1bGxTY3JcbnZhciAkc3ZnRnVsbFNjck9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZ1bGxzY3Jfb24nKVxudmFyICRzdmdGdWxsU2NyT2ZmID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZ1bGxzY3Jfb2ZmJylcblxuaWYgKCB3aW5kb3cudmlld2VyU3RhdGUuaXNGdWxsU2NyZWVuQWxsb3dlZCApIHtcbiAgJGJ0bkZ1bGxTY3IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZih3aW5kb3cudmlld2VyU3RhdGUuYXNrJGJveEluRnVsbFNjcmVlbigpKSB7XG4gICAgICAgICAgZ2V0T2ZmRnVsbHNjcmVlbigpXG4gICAgICAgICAgJHN2Z0Z1bGxTY3JPbi5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpXG4gICAgICAgICAgJHN2Z0Z1bGxTY3JPZmYuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBnb0Z1bGxTY3JlZW4oKVxuICAgICAgICAgICRzdmdGdWxsU2NyT2ZmLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIilcbiAgICAgICAgICAkc3ZnRnVsbFNjck9uLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIilcbiAgICAgIH1cbiAgfSlcbn1cblxuZnVuY3Rpb24gZ29GdWxsU2NyZWVuKCkge1xuICAgIGlmICgkYm94LnJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICRib3gucmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgIH0gZWxzZSBpZiAoJGJveC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgICAkYm94Lm1velJlcXVlc3RGdWxsU2NyZWVuKClcbiAgICB9IGVsc2UgaWYgKCRib3gud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgJGJveC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpXG4gICAgfSBlbHNlIGlmICgkYm94Lm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgJGJveC5tc1JlcXVlc3RGdWxsc2NyZWVuKClcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRPZmZGdWxsc2NyZWVuKCkge1xuICBpZihkb2N1bWVudC5leGl0RnVsbHNjcmVlbikge1xuICAgIGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKCk7XG4gIH0gZWxzZSBpZihkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XG4gICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xuICB9IGVsc2UgaWYoZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4pIHtcbiAgICBkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuICB9ZWxzZSBpZiAoZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbikge1xuXHRkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKCk7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyICRib3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJGJveFxyXG52YXIgJHZpZGVvID0gd2luZG93LnZpZXdlclN0YXRlLiR2aWRlb1xyXG52YXIgJHNpZGVNZW51Qm94ID0gd2luZG93LnZpZXdlclN0YXRlLiRzaWRlTWVudUJveFxyXG52YXIgJGZvb3RlciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kZm9vdGVyXHJcbnZhciAkZm9vdGVyX19jZW50ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19jZW50ZXInKSBcclxudmFyICRidG5NZW51T2ZmID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5NZW51T2ZmXHJcbnZhciBhc2skYm94SW5GdWxsU2NyZWVuID0gd2luZG93LnZpZXdlclN0YXRlLmFzayRib3hJbkZ1bGxTY3JlZW5cclxudmFyIGR1cmF0aW9uRm9vdGVyQXNDdHJsID0gd2luZG93LnZpZXdlclN0YXRlLmR1cmF0aW9uRm9vdGVyQXNDdHJsXHJcbnZhciBpZCA9IHVuZGVmaW5lZFxyXG5cclxuLy8gIEhpZGVzL3Nob3dlcyAkc2lkZU1lbnVCb3ggYW5kICRmb290ZXJcclxuLy8gIFxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC0tIFN0YXRlIHwgQWN0aW9uIC0tPlxyXG4vLyAgSWYgLS0+ICAgICAkYnRuTWVudU9mZiAgICRmb290ZXIgICBGdWxsU2NyZWVuIHwgIEV2ZW50U291cmNlICAgRXZlbnRUeXBlL3N0YXRlICAgRXZlbnRBY3Rpb24gICAgICAgICBIYW5kbGVyICAgICAgICAgICAgICAgIEFkZGl0aW9uYWx5XHJcbi8vICAgICAgICAgIDEuICAgIHNob3duICAgICAgIHNob3duICAgICAgICBhbnkgICAgfCAgICRidG5NZW51T2ZmICAgY2xpY2svbm9uZSAgICAgICAgaGlkZSBib3RoICAgICAgICAgICBidG5IYWRsZXIgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbi8vICAgICAgICAgIDIuICAgIGhpZGRlbiAgICAgIHNob3duICAgICAgICBhbnkgICAgfCAgICRidG5NZW51T2ZmICAgY2xpY2svbm9uZSAgICAgICAgc2hvdyBib3RoICAgICAgICAgICBidG5IYWRsZXIgICAgICAgICAgICAgIFxyXG4vLyAgICAgICAgICAzLiAgICBoaWRkZW4gICAgICBoaWRkZW4gICAgICAgb2ZmICAgIHwgICAkYm94ICAgICAgICAgIGNsaWNrL25vbmUgICAgICAgIHNob3cgYm90aCAgICAgICAgICAgYm94SGFuZGxlciAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4vLyAgICAgICAgICA0LiAgICBoaWRkZW4gICAgICBoaWRkZW4gICAgICAgb24gICAgIHwgICAkYm94ICAgICAgICAgIGNsaWNrL25vbmUgICAgICAgIHNob3cgJGZvb3RlckFzQ3RybCAgYm94SGFuZGxlciAgICAgICAgICAgICBzaG93cyAkZm9vdGVyIGZvciA1c2VjIGFzIFZpZGVvQ3RybFBhbmVsICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuLy8gICAgICAgICAgNS4gICAgaGlkZGVuICAgICAgc2hvd24gQ3RybCAgIG9uICAgICB8ICAgJGZvb3RlciAgICAgICBjbGljay9ub25lICAgICAgICByZXNldCB0aW1lciAgICAgICAgIGZvb3RlckhhbmRsZXIgICAgICAgICAgY2xpY2sgcmVzZXRzIDVzZWMgY291bnRkb3duIChmb3IgYW55IGZvb3RlciBidXR0b24gZXhjZXB0ICRidG5NZW51T2ZmIGFuZCAkYnRuRnVsbFNjcilcclxuLy8gICAgICAgICAgNi4gICAgYW55ICAgICAgICAgYW55ICAgICAgICAgIG9mZiAgICB8ICAgRnVsbFNjcmVlbiAgICBldmVudC9vbiAgICAgICAgICBoaWRlIGJvdGggICAgICAgICAgIGZ1bGxTY3JlZW5IYW5kbGVyICAgICAgIFxyXG4vLyAgICAgICAgICA3LiAgICBhbnkgICAgICAgICBhbnkgICAgICAgICAgb24gICAgIHwgICBGdWxsU2NyZWVuICAgIGV2ZW50L29mZiAgICAgICAgIHNob3cgYm90aCAgICAgICAgICAgZnVsbFNjcmVlbkhhbmRsZXIgICAgICAgXHJcblxyXG4kYnRuTWVudU9mZi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJ0bkhhbmRsZXIpXHJcbiRmb290ZXIub2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZm9vdGVySGFuZGxlcilcclxuJGJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJveEhhbmRsZXIpXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Z1bGxzY3JlZW5jaGFuZ2UnLCBmdWxsU2NyZWVuSGFuZGxlcilcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsIGZ1bGxTY3JlZW5IYW5kbGVyKVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3pmdWxsc2NyZWVuY2hhbmdlJywgZnVsbFNjcmVlbkhhbmRsZXIpXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ01TRnVsbHNjcmVlbkNoYW5nZScsIGZ1bGxTY3JlZW5IYW5kbGVyKVxyXG5cclxuZnVuY3Rpb24gYnRuSGFuZGxlcihlKSB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICBpZighd2luZG93LnZpZXdlclN0YXRlLmlzJHNpZGVNZW51Qm94SGlkZGVuICYmICF3aW5kb3cudmlld2VyU3RhdGUuaXMkZm9vdGVySGlkZGVuKSB7XHJcbiAgICAgICAgJHNpZGVNZW51Qm94LmhpZGUoKVxyXG4gICAgICAgICRmb290ZXIuaGlkZSgpXHJcbiAgICB9IGVsc2UgaWYod2luZG93LnZpZXdlclN0YXRlLmlzJHNpZGVNZW51Qm94SGlkZGVuKSB7XHJcbiAgICAgICAgJHNpZGVNZW51Qm94LnNob3coKVxyXG4gICAgICAgIGlmKGlkKXtcclxuICAgICAgICAgICAgJGZvb3Rlci5vYmplY3QuY2xhc3NMaXN0LnJlbW92ZSgnY3RybCcpXHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChpZClcclxuICAgICAgICAgICAgJGJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJveEhhbmRsZXIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGZvb3RlckhhbmRsZXIoZSkge1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgaWYoYXNrJGJveEluRnVsbFNjcmVlbigpICYmIGlkKXtcclxuICAgICAgICBjbGVhclRpbWVvdXQoaWQpXHJcbiAgICAgICAgaWQgPSBzZXRUaW1lb3V0KCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBoaWRlQ29udHJvbHMoKVxyXG4gICAgICAgICAgICAkYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYm94SGFuZGxlcilcclxuICAgICAgICB9ICwgZHVyYXRpb25Gb290ZXJBc0N0cmwpXHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gYm94SGFuZGxlcihlKSB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICBpZihhc2skYm94SW5GdWxsU2NyZWVuKCkpIHtcclxuICAgICAgICBpZih0cnVlKSB7XHJcbiAgICAgICAgICAgICRib3gucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBib3hIYW5kbGVyKVxyXG4gICAgICAgICAgICBzaG93Q29udHJvbHMoKVxyXG4gICAgICAgICAgICBpZCA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBoaWRlQ29udHJvbHMoKVxyXG4gICAgICAgICAgICAgICAgJGJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJveEhhbmRsZXIpXHJcbiAgICAgICAgICAgIH0gLCBkdXJhdGlvbkZvb3RlckFzQ3RybClcclxuICAgICAgICB9XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5pcyRzaWRlTWVudUJveEhpZGRlbikgJHNpZGVNZW51Qm94LnNob3coKVxyXG4gICAgICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5pcyRmb290ZXJIaWRkZW4pICRmb290ZXIuc2hvdygpXHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZnVsbFNjcmVlbkhhbmRsZXIoKSB7XHJcbiAgICBpZihhc2skYm94SW5GdWxsU2NyZWVuKCkpe1xyXG4gICAgICAgIGlmKCF3aW5kb3cudmlld2VyU3RhdGUuaXMkc2lkZU1lbnVCb3hIaWRkZW4pICRzaWRlTWVudUJveC5oaWRlKClcclxuICAgICAgICBpZighd2luZG93LnZpZXdlclN0YXRlLmlzJGZvb3RlckhpZGRlbikgJGZvb3Rlci5oaWRlKClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYod2luZG93LnZpZXdlclN0YXRlLmlzJHNpZGVNZW51Qm94SGlkZGVuKSAkc2lkZU1lbnVCb3guc2hvdygpXHJcbiAgICAgICAgaWYod2luZG93LnZpZXdlclN0YXRlLmlzJGZvb3RlckhpZGRlbikgJGZvb3Rlci5zaG93KClcclxuICAgICAgICBpZihpZCl7XHJcbiAgICAgICAgICAgICRmb290ZXIub2JqZWN0LmNsYXNzTGlzdC5yZW1vdmUoJ2N0cmwnKVxyXG4gICAgICAgICAgICBjbGVhclRpbWVvdXQoaWQpXHJcbiAgICAgICAgICAgICRib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBib3hIYW5kbGVyKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBzaG93Q29udHJvbHMoKSB7XHJcbiAgICAkZm9vdGVyLm9iamVjdC5jbGFzc0xpc3QuYWRkKCdjdHJsJylcclxuICAgICRmb290ZXIuc2hvdygpXHJcbn1cclxuZnVuY3Rpb24gaGlkZUNvbnRyb2xzKCkge1xyXG4gICAgJGZvb3Rlci5oaWRlKClcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICAkZm9vdGVyLm9iamVjdC5jbGFzc0xpc3QucmVtb3ZlKCdjdHJsJylcclxuICAgIH0sIHdpbmRvdy52aWV3ZXJTdGF0ZS5kdXJhdGlvblNob3dIaWRlTWVudSlcclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgd2luZG93LnZpZXdlclN0YXRlID0ge1xyXG4gICAgJyRib3gnOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm94JyksXHJcbiAgICAnJHZpZGVvJzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZpZGVvJyksXHJcbiAgICAnJHNvdXJjZSc6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zb3VyY2UnKSxcclxuICAgICckc2lkZU1lbnVCb3gnOiB7XHJcbiAgICAgICAgJ29iamVjdCc6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJyksXHJcbiAgICAgICAgJ2hpZGUnOiBudWxsLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGZ1bmN0aW9uIC0+IHZvaWRcclxuICAgICAgICAnc2hvdyc6IG51bGwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgZnVuY3Rpb24gLT4gdm9pZFxyXG4gICAgfSxcclxuICAgICckc2xpZGVyJzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXJfX3NsaWRlcicpLFxyXG4gICAgJyRmb290ZXInOiB7XHJcbiAgICAgICAgJ29iamVjdCc6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXInKSxcclxuICAgICAgICAnaGlkZSc6IG51bGwsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgZnVuY3Rpb24gLT4gdm9pZFxyXG4gICAgICAgICdzaG93JzogbnVsbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBmdW5jdGlvbiAtPiB2b2lkXHJcbiAgICB9LFxyXG4gICAgJyRidG5IZWxwJzogICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX2xlZnRfX2hlbHAnKSxcclxuICAgICckYnRuUGxheSc6ICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19sZWZ0X19wbGF5JyksXHJcbiAgICAnJGJ0blZvbHVtZSc6ICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fbGVmdF9fdm9sdW1lJyksXHJcbiAgICAnJGJ0blF1YWxpdHknOiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fbGVmdF9fcXVhbGl0eScpLFxyXG4gICAgJyRidG5TY2FsZSc6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX3JpZ2h0X19zY2FsZV9idG4nKSxcclxuICAgICckYnRuTWVudU9mZic6ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19yaWdodF9fbWVudS1vZmYnKSxcclxuICAgICckYnRuRnVsbFNjcic6ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19yaWdodF9fZnVsbHNjcicpLFxyXG4gICAgJ2FjdGl2ZSRpbnB1dCc6IG51bGwsXHJcbiAgICAnaGlnaFF1YWxpdHknOiBmYWxzZSxcclxuICAgICdpcyRzaWRlTWVudUJveEhpZGRlbic6IGZhbHNlLFxyXG4gICAgJ2lzJGZvb3RlckhpZGRlbic6IGZhbHNlLFxyXG4gICAgJ2R1cmF0aW9uU2hvd0hpZGVNZW51JzogMTAwMCwgICAvLyAgbXNcclxuICAgICdkdXJhdGlvblNjYWxlU3VibWVudSc6IDQwMDAsXHJcbiAgICAnZHVyYXRpb25Gb290ZXJBc0N0cmwnOiA1MDAwLFxyXG4gICAgJ3RpbWVyRm9yRXJyb3JQYWdlJzogdW5kZWZpbmVkXHJcbiAgfTtcclxuXHJcbiAgd2luZG93LnZpZXdlclN0YXRlLmlzVmlkZW9Xb3JraW5nID0gcmVxdWlyZSgnLi9hc2tWaWRlb1dvcmtpbmcuanMnKSAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGJvb2xlYW5cclxuICB3aW5kb3cudmlld2VyU3RhdGUuaXNGdWxsU2NyZWVuQWxsb3dlZCA9IHJlcXVpcmUoJy4vYXNrRnVsbFNjcmVlbi5qcycpICAgICAgICAgICAgICAgICAgICAgICAvLyAgYm9vbGVhblxyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZSA9IHJlcXVpcmUoJy4vYXNrX2lQYWRfaVBob25lLmpzJykgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBib29sZWFuXHJcbiAgd2luZG93LnZpZXdlclN0YXRlLmlzX2lQYWRfaVBob25lX2luRnVsbFNjcmVlbiA9IHJlcXVpcmUoJy4vYXNrX2lQYWRfaVBob25lX0Z1bGxTY3JlZW4uanMnKSAgLy8gIGJvb2xlYW5cclxuICB3aW5kb3cudmlld2VyU3RhdGUuYXNrJGJveEluRnVsbFNjcmVlbiA9IHJlcXVpcmUoJy4vYXNrJGJveEluRnVsbFNjcmVlbi5qcycpICAgICAgICAgICAgICAgICAvLyAgZnVuY3Rpb24gLT4gYm9vbGVhblxyXG4gIFxyXG4gIHJlcXVpcmUoJy4vc2V0TWVudUFuZEZvb3Rlck1ldGhvZHMuanMnKVxyXG4gIHJlcXVpcmUoJy4vY2hhbm5lbFNlbGVjdG9yLmpzJylcclxuLy8gIHJlcXVpcmUoJy4vcXVhbGl0eVNlbGVjdG9yLmpzJylcclxuICByZXF1aXJlKCcuL2hpZGVTaG93TWVudS5qcycpXHJcbiAgcmVxdWlyZSgnLi9mdWxsc2NyZWVuLmpzJylcclxuICByZXF1aXJlKCcuL3ZpZGVvRXJyb3JMaXN0ZW5lcicpXHJcbiAgcmVxdWlyZSgnLi9mb290ZXJfYnV0dG9ucy5qcycpXHJcbiAgcmVxdWlyZSgnLi9idXR0b25TY2FsZS5qcycpXHJcblxyXG59IiwiJ3VzZSBzdHJpY3QnXHJcblxyXG4vLyBodHRwOi8vcGF1bGlyaXNoLmNvbS8yMDExL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtYW5pbWF0aW5nL1xyXG4vLyBodHRwOi8vbXkub3BlcmEuY29tL2Vtb2xsZXIvYmxvZy8yMDExLzEyLzIwL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtZXItYW5pbWF0aW5nXHJcblxyXG4vLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgcG9seWZpbGwgYnkgRXJpayBNw7ZsbGVyLiBmaXhlcyBmcm9tIFBhdWwgSXJpc2ggYW5kIFRpbm8gWmlqZGVsXHJcblxyXG4vLyBNSVQgbGljZW5zZVxyXG5cclxudmFyIGxhc3RUaW1lID0gMDtcclxudmFyIHZlbmRvcnMgPSBbJ21zJywgJ21veicsICd3ZWJraXQnLCAnbyddO1xyXG5mb3IodmFyIHggPSAwOyB4IDwgdmVuZG9ycy5sZW5ndGggJiYgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7ICsreCkge1xyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2ZW5kb3JzW3hdKydSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcclxuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2ZW5kb3JzW3hdKydDYW5jZWxBbmltYXRpb25GcmFtZSddIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IHdpbmRvd1t2ZW5kb3JzW3hdKydDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcclxufVxyXG5cclxuaWYgKCF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKVxyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uKGNhbGxiYWNrLCBlbGVtZW50KSB7XHJcbiAgICAgICAgdmFyIGN1cnJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgdmFyIHRpbWVUb0NhbGwgPSBNYXRoLm1heCgwLCAzMiAtIChjdXJyVGltZSAtIGxhc3RUaW1lKSk7ICAvLyAgICBNYXRoLm1heCgwLCAxNiAtIChjdXJyVGltZSAtIGxhc3RUaW1lKSk7XHJcbiAgICAgICAgdmFyIGlkID0gd2luZG93LnNldFRpbWVvdXQoZnVuY3Rpb24oKSB7IGNhbGxiYWNrKGN1cnJUaW1lICsgdGltZVRvQ2FsbCk7IH0sIHRpbWVUb0NhbGwpO1xyXG4gICAgICAgIGxhc3RUaW1lID0gY3VyclRpbWUgKyB0aW1lVG9DYWxsO1xyXG4gICAgICAgIHJldHVybiBpZDtcclxuICAgIH07XHJcblxyXG5pZiAoIXdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSlcclxuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uKGlkKSB7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KGlkKTtcclxuICAgIH07XHJcbi8vICBFbmQgckZBIHBvbHlmaWxsXHJcblxyXG52YXIgJHNpZGVNZW51Qm94ID0gd2luZG93LnZpZXdlclN0YXRlLiRzaWRlTWVudUJveFxyXG52YXIgJGZvb3RlciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kZm9vdGVyXHJcbnZhciBkdXJhdGlvbiA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5kdXJhdGlvblxyXG5cclxud2luZG93LnZpZXdlclN0YXRlLiRzaWRlTWVudUJveC5oaWRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhpZGUpXHJcbiAgICBmdW5jdGlvbiBoaWRlKHRpbWVTdGFtcCkge1xyXG4gICAgICAgIGlmICghc3RhcnRUaW1lKSBzdGFydFRpbWUgPSB0aW1lU3RhbXBcclxuICAgICAgICB2YXIgcHJvZ3Jlc3MgPSAodGltZVN0YW1wIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uXHJcbiAgICAgICAgaWYgKHByb2dyZXNzIDw9IDEpIHtcclxuICAgICAgICAgICAgJHNpZGVNZW51Qm94Lm9iamVjdC5zdHlsZS5vcGFjaXR5ID0gMSAtIHByb2dyZXNzXHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShoaWRlKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRzaWRlTWVudUJveC5vYmplY3Quc3R5bGUub3BhY2l0eSA9IDBcclxuICAgICAgICAgICAgJHNpZGVNZW51Qm94Lm9iamVjdC5zdHlsZS5yaWdodCA9ICctNWVtJ1xyXG4gICAgICAgICAgICBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmlzJHNpZGVNZW51Qm94SGlkZGVuID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxud2luZG93LnZpZXdlclN0YXRlLiRzaWRlTWVudUJveC5zaG93ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgJHNpZGVNZW51Qm94Lm9iamVjdC5zdHlsZS5yaWdodCA9ICcnXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2hvdylcclxuICAgIGZ1bmN0aW9uIHNob3codGltZVN0YW1wKSB7XHJcbiAgICAgICAgaWYgKCFzdGFydFRpbWUpIHN0YXJ0VGltZSA9IHRpbWVTdGFtcFxyXG4gICAgICAgIHZhciBwcm9ncmVzcyA9ICh0aW1lU3RhbXAgLSBzdGFydFRpbWUpIC8gZHVyYXRpb25cclxuICAgICAgICBpZiAocHJvZ3Jlc3MgPD0gMSkge1xyXG4gICAgICAgICAgICAkc2lkZU1lbnVCb3gub2JqZWN0LnN0eWxlLm9wYWNpdHkgPSBwcm9ncmVzc1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2hvdylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkc2lkZU1lbnVCb3gub2JqZWN0LnN0eWxlLm9wYWNpdHkgPSAxXHJcbiAgICAgICAgICAgIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaXMkc2lkZU1lbnVCb3hIaWRkZW4gPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxud2luZG93LnZpZXdlclN0YXRlLiRmb290ZXIuaGlkZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShoaWRlKVxyXG4gICAgZnVuY3Rpb24gaGlkZSh0aW1lU3RhbXApIHtcclxuICAgICAgICBpZiAoIXN0YXJ0VGltZSkgc3RhcnRUaW1lID0gdGltZVN0YW1wXHJcbiAgICAgICAgdmFyIHByb2dyZXNzID0gKHRpbWVTdGFtcCAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvblxyXG4gICAgICAgIGlmIChwcm9ncmVzcyA8PSAxKSB7XHJcbiAgICAgICAgICAgICRmb290ZXIub2JqZWN0LnN0eWxlLm9wYWNpdHkgPSAxIC0gcHJvZ3Jlc3NcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhpZGUpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJGZvb3Rlci5vYmplY3Quc3R5bGUub3BhY2l0eSA9IDBcclxuICAgICAgICAgICAgJGZvb3Rlci5vYmplY3Quc3R5bGUuYm90dG9tID0gJy0xNCUnXHJcbiAgICAgICAgICAgIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaXMkZm9vdGVySGlkZGVuID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxud2luZG93LnZpZXdlclN0YXRlLiRmb290ZXIuc2hvdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgICRmb290ZXIub2JqZWN0LnN0eWxlLmJvdHRvbSA9ICcnXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2hvdylcclxuICAgIGZ1bmN0aW9uIHNob3codGltZVN0YW1wKSB7XHJcbiAgICAgICAgaWYgKCFzdGFydFRpbWUpIHN0YXJ0VGltZSA9IHRpbWVTdGFtcFxyXG4gICAgICAgIHZhciBwcm9ncmVzcyA9ICh0aW1lU3RhbXAgLSBzdGFydFRpbWUpIC8gZHVyYXRpb25cclxuICAgICAgICBpZiAocHJvZ3Jlc3MgPD0gMSkge1xyXG4gICAgICAgICAgICAkZm9vdGVyLm9iamVjdC5zdHlsZS5vcGFjaXR5ID0gcHJvZ3Jlc3NcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNob3cpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJGZvb3Rlci5vYmplY3Quc3R5bGUub3BhY2l0eSA9IDFcclxuICAgICAgICAgICAgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5pcyRmb290ZXJIaWRkZW4gPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbnZhciAkdmlkZW8gPSB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvXHJcblxyXG4kdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmYWlsZWQpXHJcblxyXG4gZnVuY3Rpb24gZmFpbGVkKGUpIHtcclxuICAgLy8gdmlkZW8gcGxheWJhY2sgZmFpbGVkIC0gc2hvdyBhIG1lc3NhZ2Ugc2F5aW5nIHdoeSAgICAgLSBmcm9tIGh0dHBzOi8vZGV2LnczLm9yZy9odG1sNS9zcGVjLWF1dGhvci12aWV3L3ZpZGVvLmh0bWwjdmlkZW9cclxuICAgc3dpdGNoIChlLnRhcmdldC5lcnJvci5jb2RlKSB7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfQUJPUlRFRDpcclxuICAgICAgIGFsZXJ0KCdZb3UgYWJvcnRlZCB0aGUgdmlkZW8gcGxheWJhY2suJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgICBjYXNlIGUudGFyZ2V0LmVycm9yLk1FRElBX0VSUl9ORVRXT1JLOlxyXG4gICAgICAgYWxlcnQoJ0EgbmV0d29yayBlcnJvciBjYXVzZWQgdGhlIHZpZGVvIGRvd25sb2FkIHRvIGZhaWwgcGFydC13YXkuJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgICBjYXNlIGUudGFyZ2V0LmVycm9yLk1FRElBX0VSUl9ERUNPREU6XHJcbiAgICAgICBhbGVydCgnVGhlIHZpZGVvIHBsYXliYWNrIHdhcyBhYm9ydGVkIGR1ZSB0byBhIGNvcnJ1cHRpb24gcHJvYmxlbSBvciBiZWNhdXNlIHRoZSB2aWRlbyB1c2VkIGZlYXR1cmVzIHlvdXIgYnJvd3NlciBkaWQgbm90IHN1cHBvcnQuJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgICBjYXNlIGUudGFyZ2V0LmVycm9yLk1FRElBX0VSUl9TUkNfTk9UX1NVUFBPUlRFRDpcclxuICAgICAgIGNvbnNvbGUubG9nKCdUaGUgdmlkZW8gY291bGQgbm90IGJlIGxvYWRlZCAgJyArIChEYXRlLm5vdygpIC0gd2luZG93LnZpZXdlclN0YXRlLnRpbWVyRm9yRXJyb3JQYWdlKSk7XHJcbiAgICAgICBhbGVydCgnVGhlIHZpZGVvIGNvdWxkIG5vdCBiZSBsb2FkZWQsIGVpdGhlciBiZWNhdXNlIHRoZSBzZXJ2ZXIgb3IgbmV0d29yayBmYWlsZWQgb3IgYmVjYXVzZSB0aGUgZm9ybWF0IGlzIG5vdCBzdXBwb3J0ZWQuJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgICBkZWZhdWx0OlxyXG4gICAgICAgYWxlcnQoJ0FuIHVua25vd24gZXJyb3Igb2NjdXJyZWQuJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgfVxyXG4gfVxyXG4iXX0=
