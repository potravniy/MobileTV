(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict"

var $btn = document.querySelector(".footer__right__align")
var $video = window.viewerState.$video 

if($btn.classList.contains("vertical")) {
    window.viewerState.alignVertical = true;
} else if($btn.classList.contains("horisontal")) {
    window.viewerState.alignVertical = false;
} else {
    $btn.classList.add("vertical")
    window.viewerState.alignVertical = true;
}
fit()

$btn.addEventListener("click", toggleAlign)

function toggleAlign(event) {
    if(window.viewerState.alignVertical) {
        $btn.classList.remove("vertical")
        $btn.classList.add("horisontal")
        window.viewerState.alignVertical = false;
    } else {
        $btn.classList.remove("horisontal")
        $btn.classList.add("vertical")
        window.viewerState.alignVertical = true;
    }
    fit()
}

function fit() {
    if($btn.classList.contains("vertical")) {
        $video.style.width = '100%'
        $video.style.height = '100%'
    } else {
        $video.style.width = '100%'
        $video.style.height = 'auto'
    }
}
},{}],2:[function(require,module,exports){
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

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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
},{}],6:[function(require,module,exports){
'use strict'

module.exports = (function() {
    if(window.viewerState.is_iPad_iPhone &&
        window.innerHeight >= window.screen.availHeight) 
        {
        return true
    } else return false
})()

},{}],7:[function(require,module,exports){
var $help = document.querySelector('.help')
var $btnHelp = window.viewerState.$btnHelp

$btnHelp.addEventListener('click', function(){
    if($help.classList.contains("active")) {
        $help.classList.remove("active")
    } else {
        $help.classList.add("active")
    }
})
},{}],8:[function(require,module,exports){
"use strict"

var $video = window.viewerState.$video
var $source = window.viewerState.$source
var $slider = window.viewerState.$slider
var active$input = window.viewerState.active$input
var $btnMenuOnOf = document.querySelector('.footer__right__menu-off')
var $btnAlign = document.querySelector('.footer__right__align')
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
        if(active$input === e.target) {
            active$input.checked = false
            active$input = null
            $video.style.backgroundSize = ""
            $video.setAttribute('src', '')
            $source.setAttribute('src', '')
            $btnMenuOnOf.style.display = 'none'
            $btnAlign.style.display = 'none'
        } else {
            active$input = e.target
            if(window.viewerState.highQuality)  link = e.target.getAttribute('data-link-hq')
            else link = e.target.getAttribute('data-link-lq')
            $video.setAttribute('src', link)
            $source.setAttribute('src', link)
            $video.style.backgroundSize = "0 0"
            if($video.play) $video.play();
            else alert ('video cannot play')
            $btnMenuOnOf.style.display = 'inline-block'
            $btnAlign.style.display = 'inline-block'
        }
    }
})

},{}],9:[function(require,module,exports){
'use strict'

var $btnFullScr = window.viewerState.$btnFullScr
var $box = window.viewerState.$box

if ( window.viewerState.isFullScreenAllowed ) {
  $btnFullScr.addEventListener('click', function () {
      if(window.viewerState.ask$boxInFullScreen()) getOffFullscreen()
      else goFullScreen()
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
var durationCtrl = 5000  //  ms
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
        } , durationCtrl)
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
            } , durationCtrl)
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
    }, window.viewerState.duration)
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
    '$btnScale':    document.querySelector('.footer__right__scale'),
    '$btnAlign':    document.querySelector('.footer__right__align'),
    '$btnMenuOff':  document.querySelector('.footer__right__menu-off'),
    '$btnFullScr':  document.querySelector('.footer__right__fullscr'),
    'active$input': null,
    'highQuality': false,
    'alignVertical': false,
    'is$sideMenuBoxHidden': false,
    'is$footerHidden': false,
    'duration': 500
  };

    window.viewerState.isVideoWorking = require('./askVideoWorking.js')                          //  boolean
    window.viewerState.isFullScreenAllowed = require('./askFullScreen.js')                       //  boolean
    window.viewerState.is_iPad_iPhone = require('./ask_iPad_iPhone.js')                          //  boolean
    window.viewerState.is_iPad_iPhone_inFullScreen = require('./ask_iPad_iPhone_FullScreen.js')  //  boolean
    window.viewerState.ask$boxInFullScreen = require('./ask$boxInFullScreen.js')                 //  function -> boolean
  
    //  Set hide() and show() methods for $sideMenuBox and $footer
    //  basing on requestAnimationFrame or setInterval
//   if(require('./askAnimationFrameAllowed.js')) {
     require('./setMenuAndFooterMethodsWithFrame.js')
//   } else {
//     require('./setMenuAndFooterMethodsWithInterval.js')
//   }

  require('./channelSelector.js')
  require('./qualitySelector.js')
  require('./alignSelector.js')
  require('./hideShowMenu.js')
  require('./fullscreen.js')
  require('./videoErrorListener')
  require('./buttonHelp.js')

}
},{"./alignSelector.js":1,"./ask$boxInFullScreen.js":2,"./askFullScreen.js":3,"./askVideoWorking.js":4,"./ask_iPad_iPhone.js":5,"./ask_iPad_iPhone_FullScreen.js":6,"./buttonHelp.js":7,"./channelSelector.js":8,"./fullscreen.js":9,"./hideShowMenu.js":10,"./qualitySelector.js":12,"./setMenuAndFooterMethodsWithFrame.js":13,"./videoErrorListener":14}],12:[function(require,module,exports){
'use strict'

var $btn = window.viewerState.$btnQuality
var $signHQ = document.querySelector('[title = hight_quality]')
var $signLQ = document.querySelector('[title = low_quality]')

if ($signLQ.classList.contains('active')) {
  window.viewerState.highQuality = false
} else if ($signHQ.classList.contains('active')) {
  window.viewerState.highQuality = true
} else {
  $signLQ.classList.add('active')
  window.viewerState.highQuality = false
}

$btn.addEventListener('click', toggleQuality)

function toggleQuality (event) {
  event.stopPropagation()
  var link = undefined
  if (window.viewerState.highQuality) {
    $signHQ.classList.remove('active')
    $signLQ.classList.add('active')
    window.viewerState.highQuality = false
    if (window.viewerState.active$input) {
      link = window.viewerState.active$input.getAttribute('data-link-lq')
      window.viewerState.$video.setAttribute('src', link)
      window.viewerState.$source.setAttribute('src', link)
      window.viewerState.$video.play()
    }
  } else {
    $signLQ.classList.remove('active')
    $signHQ.classList.add('active')
    window.viewerState.highQuality = true
    if (window.viewerState.active$input) {
      link = window.viewerState.active$input.getAttribute('data-link-hq')
      window.viewerState.$video.setAttribute('src', link)
      window.viewerState.$source.setAttribute('src', link)
      window.viewerState.$video.play()
    }
  }
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
            $footer.object.style.bottom = '-10%'
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
       alert('The video could not be loaded, either because the server or network failed or because the format is not supported.');
       break;
     default:
       alert('An unknown error occurred.');
       break;
   }
 }

},{}]},{},[11])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2EwNS9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hbGlnblNlbGVjdG9yLmpzIiwianMvYXNrJGJveEluRnVsbFNjcmVlbi5qcyIsImpzL2Fza0Z1bGxTY3JlZW4uanMiLCJqcy9hc2tWaWRlb1dvcmtpbmcuanMiLCJqcy9hc2tfaVBhZF9pUGhvbmUuanMiLCJqcy9hc2tfaVBhZF9pUGhvbmVfRnVsbFNjcmVlbi5qcyIsImpzL2J1dHRvbkhlbHAuanMiLCJqcy9jaGFubmVsU2VsZWN0b3IuanMiLCJqcy9mdWxsc2NyZWVuLmpzIiwianMvaGlkZVNob3dNZW51LmpzIiwianMvbWFpbi5qcyIsImpzL3F1YWxpdHlTZWxlY3Rvci5qcyIsImpzL3NldE1lbnVBbmRGb290ZXJNZXRob2RzV2l0aEZyYW1lLmpzIiwianMvdmlkZW9FcnJvckxpc3RlbmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0dBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIlxyXG5cclxudmFyICRidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvb3Rlcl9fcmlnaHRfX2FsaWduXCIpXHJcbnZhciAkdmlkZW8gPSB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvIFxyXG5cclxuaWYoJGJ0bi5jbGFzc0xpc3QuY29udGFpbnMoXCJ2ZXJ0aWNhbFwiKSkge1xyXG4gICAgd2luZG93LnZpZXdlclN0YXRlLmFsaWduVmVydGljYWwgPSB0cnVlO1xyXG59IGVsc2UgaWYoJGJ0bi5jbGFzc0xpc3QuY29udGFpbnMoXCJob3Jpc29udGFsXCIpKSB7XHJcbiAgICB3aW5kb3cudmlld2VyU3RhdGUuYWxpZ25WZXJ0aWNhbCA9IGZhbHNlO1xyXG59IGVsc2Uge1xyXG4gICAgJGJ0bi5jbGFzc0xpc3QuYWRkKFwidmVydGljYWxcIilcclxuICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5hbGlnblZlcnRpY2FsID0gdHJ1ZTtcclxufVxyXG5maXQoKVxyXG5cclxuJGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlQWxpZ24pXHJcblxyXG5mdW5jdGlvbiB0b2dnbGVBbGlnbihldmVudCkge1xyXG4gICAgaWYod2luZG93LnZpZXdlclN0YXRlLmFsaWduVmVydGljYWwpIHtcclxuICAgICAgICAkYnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJ2ZXJ0aWNhbFwiKVxyXG4gICAgICAgICRidG4uY2xhc3NMaXN0LmFkZChcImhvcmlzb250YWxcIilcclxuICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuYWxpZ25WZXJ0aWNhbCA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkYnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJob3Jpc29udGFsXCIpXHJcbiAgICAgICAgJGJ0bi5jbGFzc0xpc3QuYWRkKFwidmVydGljYWxcIilcclxuICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuYWxpZ25WZXJ0aWNhbCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBmaXQoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBmaXQoKSB7XHJcbiAgICBpZigkYnRuLmNsYXNzTGlzdC5jb250YWlucyhcInZlcnRpY2FsXCIpKSB7XHJcbiAgICAgICAgJHZpZGVvLnN0eWxlLndpZHRoID0gJzEwMCUnXHJcbiAgICAgICAgJHZpZGVvLnN0eWxlLmhlaWdodCA9ICcxMDAlJ1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkdmlkZW8uc3R5bGUud2lkdGggPSAnMTAwJSdcclxuICAgICAgICAkdmlkZW8uc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nXHJcbiAgICB9XHJcbn0iLCIndXNlIHN0cmljdCdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQgfHwgXHJcbiAgICAgICAgZG9jdW1lbnQud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQgfHxcclxuICAgICAgICBkb2N1bWVudC5tb3pGdWxsU2NyZWVuRWxlbWVudCB8fFxyXG4gICAgICAgIGRvY3VtZW50Lm1zRnVsbHNjcmVlbkVsZW1lbnQgfHxcclxuICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaXNfaVBhZF9pUGhvbmVfaW5GdWxsU2NyZWVuICkge1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9IGVsc2UgcmV0dXJuIGZhbHNlXHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgJGJveCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYm94XHJcbiAgICB2YXIgYWxsb3dlZCA9IGZhbHNlXHJcbiAgICBpZiAoJGJveC5yZXF1ZXN0RnVsbHNjcmVlbiB8fFxyXG4gICAgICAgICRib3gubW96UmVxdWVzdEZ1bGxTY3JlZW4gfHxcclxuICAgICAgICAkYm94LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuIHx8XHJcbiAgICAgICAgJGJveC5tc1JlcXVlc3RGdWxsc2NyZWVuXHJcbiAgICAgICAgKSB7XHJcbiAgICAgICAgYWxsb3dlZCA9IHRydWUgXHJcbiAgICAgICAgY29uc29sZS5sb2coJ0Z1bGxTY3JlZW4gb2snKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBhbGxvd2VkID0gZmFsc2UgXHJcbiAgICAgICAgY29uc29sZS5sb2coJ05vIGZ1bGxzY3JlZW4nKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFsbG93ZWRcclxufSkoKVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmKHR5cGVvZiB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvLnBsYXkgPT09ICdmdW5jdGlvbicgKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ3ZpZGVvIG9rIG5lZWRzIHRvIGJlIGNvbmZpcm1lZCcpXHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coJ25vIHZpZGVvJylcclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH1cclxufSkoKVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIGlmKHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ2lQYWQnKSAhPT0gLTEgJiZcclxuICAgICAgICB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdTYWZhcmknKSAhPT0gLTEgKVxyXG4gICAgICAgIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSBlbHNlIGlmKHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ2lQaG9uZScpICE9PSAtMSAmJlxyXG4gICAgICAgIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ1NhZmFyaScpICE9PSAtMSApIFxyXG4gICAgICAgIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSBlbHNlIHJldHVybiBmYWxzZVxyXG59KSgpIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZSAmJlxyXG4gICAgICAgIHdpbmRvdy5pbm5lckhlaWdodCA+PSB3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0KSBcclxuICAgICAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSByZXR1cm4gZmFsc2VcclxufSkoKVxyXG4iLCJ2YXIgJGhlbHAgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaGVscCcpXHJcbnZhciAkYnRuSGVscCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuSGVscFxyXG5cclxuJGJ0bkhlbHAuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgaWYoJGhlbHAuY2xhc3NMaXN0LmNvbnRhaW5zKFwiYWN0aXZlXCIpKSB7XHJcbiAgICAgICAgJGhlbHAuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkaGVscC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpXHJcbiAgICB9XHJcbn0pIiwiXCJ1c2Ugc3RyaWN0XCJcclxuXHJcbnZhciAkdmlkZW8gPSB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvXHJcbnZhciAkc291cmNlID0gd2luZG93LnZpZXdlclN0YXRlLiRzb3VyY2VcclxudmFyICRzbGlkZXIgPSB3aW5kb3cudmlld2VyU3RhdGUuJHNsaWRlclxyXG52YXIgYWN0aXZlJGlucHV0ID0gd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dFxyXG52YXIgJGJ0bk1lbnVPbk9mID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fcmlnaHRfX21lbnUtb2ZmJylcclxudmFyICRidG5BbGlnbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX3JpZ2h0X19hbGlnbicpXHJcbnZhciBsaW5rID0gJydcclxudmFyICRidG5zID0ge1xyXG4gICAgXCJjaF8xZ29yb2Rza295XCI6ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoXzFnb3JvZHNrb3lcIiksXHJcbiAgICBcImNoXzN0c3lmcm92b3lcIjogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfM3RzeWZyb3ZveVwiKSxcclxuICAgIFwiY2hfcmVwb3J0ZXJcIjogICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9yZXBvcnRlclwiKSxcclxuICAgIFwiY2hfYWNhZGVtaWFcIjogICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9hY2FkZW1pYVwiKSxcclxuICAgIFwiY2hfYTFcIjogICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9hMVwiKSxcclxuICAgIFwiY2hfZHVtc2theWFcIjogICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9kdW1za2F5YVwiKSxcclxuICAgIFwiY2hfZ3R2XCI6ICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9ndHZcIiksXHJcbiAgICBcImNoX3N0dlwiOiAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfc3R2XCIpLFxyXG4gICAgXCJjaF91Z25heWF2b2xuYVwiOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX3VnbmF5YXZvbG5hXCIpLFxyXG4gICAgXCJjaF9uZW1vXCI6ICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX25lbW9cIilcclxufVxyXG4kYnRucy5jaF8xZ29yb2Rza295LnNldEF0dHJpYnV0ZSggICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvMXR2b2QvMXR2b2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICApXHJcbiRidG5zLmNoXzN0c3lmcm92b3kuc2V0QXR0cmlidXRlKCAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovL2NkbjUubGl2ZS10di5vZC51YTo4MDgxL3R2LzN0dm9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgIClcclxuJGJ0bnMuY2hfcmVwb3J0ZXIuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vY2RuNC5saXZlLXR2Lm9kLnVhOjgwODEvdHYvMzFjaG9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgKVxyXG4kYnRucy5jaF9hY2FkZW1pYS5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly9jZG40LmxpdmUtdHYub2QudWE6ODA4MS90di8zNmNob2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiApXHJcbiRidG5zLmNoX2ExLnNldEF0dHJpYnV0ZSggICAgICAgICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9hMW9kL2Exb2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICAgIClcclxuJGJ0bnMuY2hfZHVtc2theWEuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzODo4MDgxL2R1bXNrYS9kdW1za2EtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgKVxyXG4kYnRucy5jaF9ndHYuc2V0QXR0cmlidXRlKCAgICAgICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvYTFvZC9ndHZvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiICAgICApXHJcbiRidG5zLmNoX3N0di5zZXRBdHRyaWJ1dGUoICAgICAgICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9zdHZvZC9zdHZvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiICAgIClcclxuJGJ0bnMuY2hfdWduYXlhdm9sbmEuc2V0QXR0cmlidXRlKCAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL3dhdmUvd2F2ZS1hYnItbHEvcGxheWxpc3QubTN1OFwiICAgICAgKVxyXG4kYnRucy5jaF9uZW1vLnNldEF0dHJpYnV0ZSggICAgICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvbmVtby9tb3Itc3ViL3BsYXlsaXN0Lm0zdThcIiAgICAgICAgICApXHJcblxyXG4kYnRucy5jaF8xZ29yb2Rza295LnNldEF0dHJpYnV0ZSggICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvMXR2b2QvMXR2b2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICApXHJcbiRidG5zLmNoXzN0c3lmcm92b3kuc2V0QXR0cmlidXRlKCAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovL2NkbjUubGl2ZS10di5vZC51YTo4MDgxL3R2LzN0dm9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgIClcclxuJGJ0bnMuY2hfcmVwb3J0ZXIuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vY2RuNC5saXZlLXR2Lm9kLnVhOjgwODEvdHYvMzFjaG9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgKVxyXG4kYnRucy5jaF9hY2FkZW1pYS5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly9jZG40LmxpdmUtdHYub2QudWE6ODA4MS90di8zNmNob2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICApXHJcbiRidG5zLmNoX2ExLnNldEF0dHJpYnV0ZSggICAgICAgICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9hMW9kL2Exb2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICAgIClcclxuJGJ0bnMuY2hfZHVtc2theWEuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzODo4MDgxL2R1bXNrYS9kdW1za2EtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgKVxyXG4kYnRucy5jaF9ndHYuc2V0QXR0cmlidXRlKCAgICAgICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvYTFvZC9ndHZvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgICApXHJcbiRidG5zLmNoX3N0di5zZXRBdHRyaWJ1dGUoICAgICAgICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9zdHZvZC9zdHZvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgIClcclxuJGJ0bnMuY2hfdWduYXlhdm9sbmEuc2V0QXR0cmlidXRlKCAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL3dhdmUvd2F2ZS1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgICAgKVxyXG4kYnRucy5jaF9uZW1vLnNldEF0dHJpYnV0ZSggICAgICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvbmVtby9tb3ItYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICAgICApXHJcblxyXG4kc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICBpZihlLnRhcmdldC50YWdOYW1lID09PSAnSU5QVVQnKXtcclxuICAgICAgICBpZihhY3RpdmUkaW5wdXQgPT09IGUudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGFjdGl2ZSRpbnB1dC5jaGVja2VkID0gZmFsc2VcclxuICAgICAgICAgICAgYWN0aXZlJGlucHV0ID0gbnVsbFxyXG4gICAgICAgICAgICAkdmlkZW8uc3R5bGUuYmFja2dyb3VuZFNpemUgPSBcIlwiXHJcbiAgICAgICAgICAgICR2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsICcnKVxyXG4gICAgICAgICAgICAkc291cmNlLnNldEF0dHJpYnV0ZSgnc3JjJywgJycpXHJcbiAgICAgICAgICAgICRidG5NZW51T25PZi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgICAgICRidG5BbGlnbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWN0aXZlJGlucHV0ID0gZS50YXJnZXRcclxuICAgICAgICAgICAgaWYod2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5KSAgbGluayA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWhxJylcclxuICAgICAgICAgICAgZWxzZSBsaW5rID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmstbHEnKVxyXG4gICAgICAgICAgICAkdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICAgICAgICAkc291cmNlLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgICAgICAgJHZpZGVvLnN0eWxlLmJhY2tncm91bmRTaXplID0gXCIwIDBcIlxyXG4gICAgICAgICAgICBpZigkdmlkZW8ucGxheSkgJHZpZGVvLnBsYXkoKTtcclxuICAgICAgICAgICAgZWxzZSBhbGVydCAoJ3ZpZGVvIGNhbm5vdCBwbGF5JylcclxuICAgICAgICAgICAgJGJ0bk1lbnVPbk9mLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJ1xyXG4gICAgICAgICAgICAkYnRuQWxpZ24uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KVxyXG4iLCIndXNlIHN0cmljdCdcblxudmFyICRidG5GdWxsU2NyID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5GdWxsU2NyXG52YXIgJGJveCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYm94XG5cbmlmICggd2luZG93LnZpZXdlclN0YXRlLmlzRnVsbFNjcmVlbkFsbG93ZWQgKSB7XG4gICRidG5GdWxsU2NyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgaWYod2luZG93LnZpZXdlclN0YXRlLmFzayRib3hJbkZ1bGxTY3JlZW4oKSkgZ2V0T2ZmRnVsbHNjcmVlbigpXG4gICAgICBlbHNlIGdvRnVsbFNjcmVlbigpXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGdvRnVsbFNjcmVlbigpIHtcbiAgICBpZiAoJGJveC5yZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAkYm94LnJlcXVlc3RGdWxsc2NyZWVuKClcbiAgICB9IGVsc2UgaWYgKCRib3gubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgJGJveC5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpXG4gICAgfSBlbHNlIGlmICgkYm94LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICRib3gud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgIH0gZWxzZSBpZiAoJGJveC5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICRib3gubXNSZXF1ZXN0RnVsbHNjcmVlbigpXG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0T2ZmRnVsbHNjcmVlbigpIHtcbiAgaWYoZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4pIHtcbiAgICBkb2N1bWVudC5leGl0RnVsbHNjcmVlbigpO1xuICB9IGVsc2UgaWYoZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgIGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcbiAgfSBlbHNlIGlmKGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKSB7XG4gICAgZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcbiAgfWVsc2UgaWYgKGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4pIHtcblx0ZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbigpO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCdcclxuXHJcbnZhciAkYm94ID0gd2luZG93LnZpZXdlclN0YXRlLiRib3hcclxudmFyICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW9cclxudmFyICRzaWRlTWVudUJveCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc2lkZU1lbnVCb3hcclxudmFyICRmb290ZXIgPSB3aW5kb3cudmlld2VyU3RhdGUuJGZvb3RlclxyXG52YXIgJGZvb3Rlcl9fY2VudGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fY2VudGVyJykgXHJcbnZhciAkYnRuTWVudU9mZiA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuTWVudU9mZlxyXG52YXIgYXNrJGJveEluRnVsbFNjcmVlbiA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5hc2skYm94SW5GdWxsU2NyZWVuXHJcbnZhciBkdXJhdGlvbkN0cmwgPSA1MDAwICAvLyAgbXNcclxudmFyIGlkID0gdW5kZWZpbmVkXHJcblxyXG4vLyAgSGlkZXMvc2hvd2VzICRzaWRlTWVudUJveCBhbmQgJGZvb3RlclxyXG4vLyAgXHJcbi8vICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICA8LS0gU3RhdGUgfCBBY3Rpb24gLS0+XHJcbi8vICBJZiAtLT4gICAgICRidG5NZW51T2ZmICAgJGZvb3RlciAgIEZ1bGxTY3JlZW4gfCAgRXZlbnRTb3VyY2UgICBFdmVudFR5cGUvc3RhdGUgICBFdmVudEFjdGlvbiAgICAgICAgIEhhbmRsZXIgICAgICAgICAgICAgICAgQWRkaXRpb25hbHlcclxuLy8gICAgICAgICAgMS4gICAgc2hvd24gICAgICAgc2hvd24gICAgICAgIGFueSAgICB8ICAgJGJ0bk1lbnVPZmYgICBjbGljay9ub25lICAgICAgICBoaWRlIGJvdGggICAgICAgICAgIGJ0bkhhZGxlciAgICAgICAgICAgICAgICAgICAgICAgICBcclxuLy8gICAgICAgICAgMi4gICAgaGlkZGVuICAgICAgc2hvd24gICAgICAgIGFueSAgICB8ICAgJGJ0bk1lbnVPZmYgICBjbGljay9ub25lICAgICAgICBzaG93IGJvdGggICAgICAgICAgIGJ0bkhhZGxlciAgICAgICAgICAgICAgXHJcbi8vICAgICAgICAgIDMuICAgIGhpZGRlbiAgICAgIGhpZGRlbiAgICAgICBvZmYgICAgfCAgICRib3ggICAgICAgICAgY2xpY2svbm9uZSAgICAgICAgc2hvdyBib3RoICAgICAgICAgICBib3hIYW5kbGVyICAgICAgICAgICAgICAgICAgICAgICAgXHJcbi8vICAgICAgICAgIDQuICAgIGhpZGRlbiAgICAgIGhpZGRlbiAgICAgICBvbiAgICAgfCAgICRib3ggICAgICAgICAgY2xpY2svbm9uZSAgICAgICAgc2hvdyAkZm9vdGVyQXNDdHJsICBib3hIYW5kbGVyICAgICAgICAgICAgIHNob3dzICRmb290ZXIgZm9yIDVzZWMgYXMgVmlkZW9DdHJsUGFuZWwgICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4vLyAgICAgICAgICA1LiAgICBoaWRkZW4gICAgICBzaG93biBDdHJsICAgb24gICAgIHwgICAkZm9vdGVyICAgICAgIGNsaWNrL25vbmUgICAgICAgIHJlc2V0IHRpbWVyICAgICAgICAgZm9vdGVySGFuZGxlciAgICAgICAgICBjbGljayByZXNldHMgNXNlYyBjb3VudGRvd24gKGZvciBhbnkgZm9vdGVyIGJ1dHRvbiBleGNlcHQgJGJ0bk1lbnVPZmYgYW5kICRidG5GdWxsU2NyKVxyXG4vLyAgICAgICAgICA2LiAgICBhbnkgICAgICAgICBhbnkgICAgICAgICAgb2ZmICAgIHwgICBGdWxsU2NyZWVuICAgIGV2ZW50L29uICAgICAgICAgIGhpZGUgYm90aCAgICAgICAgICAgZnVsbFNjcmVlbkhhbmRsZXIgICAgICAgXHJcbi8vICAgICAgICAgIDcuICAgIGFueSAgICAgICAgIGFueSAgICAgICAgICBvbiAgICAgfCAgIEZ1bGxTY3JlZW4gICAgZXZlbnQvb2ZmICAgICAgICAgc2hvdyBib3RoICAgICAgICAgICBmdWxsU2NyZWVuSGFuZGxlciAgICAgICBcclxuXHJcbiRidG5NZW51T2ZmLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYnRuSGFuZGxlcilcclxuJGZvb3Rlci5vYmplY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmb290ZXJIYW5kbGVyKVxyXG4kYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYm94SGFuZGxlcilcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZnVsbHNjcmVlbmNoYW5nZScsIGZ1bGxTY3JlZW5IYW5kbGVyKVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJywgZnVsbFNjcmVlbkhhbmRsZXIpXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLCBmdWxsU2NyZWVuSGFuZGxlcilcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignTVNGdWxsc2NyZWVuQ2hhbmdlJywgZnVsbFNjcmVlbkhhbmRsZXIpXHJcblxyXG5mdW5jdGlvbiBidG5IYW5kbGVyKGUpIHtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgIGlmKCF3aW5kb3cudmlld2VyU3RhdGUuaXMkc2lkZU1lbnVCb3hIaWRkZW4gJiYgIXdpbmRvdy52aWV3ZXJTdGF0ZS5pcyRmb290ZXJIaWRkZW4pIHtcclxuICAgICAgICAkc2lkZU1lbnVCb3guaGlkZSgpXHJcbiAgICAgICAgJGZvb3Rlci5oaWRlKClcclxuICAgIH0gZWxzZSBpZih3aW5kb3cudmlld2VyU3RhdGUuaXMkc2lkZU1lbnVCb3hIaWRkZW4pIHtcclxuICAgICAgICAkc2lkZU1lbnVCb3guc2hvdygpXHJcbiAgICAgICAgaWYoaWQpe1xyXG4gICAgICAgICAgICAkZm9vdGVyLm9iamVjdC5jbGFzc0xpc3QucmVtb3ZlKCdjdHJsJylcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGlkKVxyXG4gICAgICAgICAgICAkYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYm94SGFuZGxlcilcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZm9vdGVySGFuZGxlcihlKSB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICBpZihhc2skYm94SW5GdWxsU2NyZWVuKCkgJiYgaWQpe1xyXG4gICAgICAgIGNsZWFyVGltZW91dChpZClcclxuICAgICAgICBpZCA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGhpZGVDb250cm9scygpXHJcbiAgICAgICAgICAgICRib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBib3hIYW5kbGVyKVxyXG4gICAgICAgIH0gLCBkdXJhdGlvbkN0cmwpXHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gYm94SGFuZGxlcihlKSB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICBpZihhc2skYm94SW5GdWxsU2NyZWVuKCkpIHtcclxuICAgICAgICBpZih0cnVlKSB7XHJcbiAgICAgICAgICAgICRib3gucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBib3hIYW5kbGVyKVxyXG4gICAgICAgICAgICBzaG93Q29udHJvbHMoKVxyXG4gICAgICAgICAgICBpZCA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBoaWRlQ29udHJvbHMoKVxyXG4gICAgICAgICAgICAgICAgJGJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJveEhhbmRsZXIpXHJcbiAgICAgICAgICAgIH0gLCBkdXJhdGlvbkN0cmwpXHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpZih3aW5kb3cudmlld2VyU3RhdGUuaXMkc2lkZU1lbnVCb3hIaWRkZW4pICRzaWRlTWVudUJveC5zaG93KClcclxuICAgICAgICBpZih3aW5kb3cudmlld2VyU3RhdGUuaXMkZm9vdGVySGlkZGVuKSAkZm9vdGVyLnNob3coKVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGZ1bGxTY3JlZW5IYW5kbGVyKCkge1xyXG4gICAgaWYoYXNrJGJveEluRnVsbFNjcmVlbigpKXtcclxuICAgICAgICBpZighd2luZG93LnZpZXdlclN0YXRlLmlzJHNpZGVNZW51Qm94SGlkZGVuKSAkc2lkZU1lbnVCb3guaGlkZSgpXHJcbiAgICAgICAgaWYoIXdpbmRvdy52aWV3ZXJTdGF0ZS5pcyRmb290ZXJIaWRkZW4pICRmb290ZXIuaGlkZSgpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5pcyRzaWRlTWVudUJveEhpZGRlbikgJHNpZGVNZW51Qm94LnNob3coKVxyXG4gICAgICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5pcyRmb290ZXJIaWRkZW4pICRmb290ZXIuc2hvdygpXHJcbiAgICAgICAgaWYoaWQpe1xyXG4gICAgICAgICAgICAkZm9vdGVyLm9iamVjdC5jbGFzc0xpc3QucmVtb3ZlKCdjdHJsJylcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGlkKVxyXG4gICAgICAgICAgICAkYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYm94SGFuZGxlcilcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gc2hvd0NvbnRyb2xzKCkge1xyXG4gICAgJGZvb3Rlci5vYmplY3QuY2xhc3NMaXN0LmFkZCgnY3RybCcpXHJcbiAgICAkZm9vdGVyLnNob3coKVxyXG59XHJcbmZ1bmN0aW9uIGhpZGVDb250cm9scygpIHtcclxuICAgICRmb290ZXIuaGlkZSgpXHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgJGZvb3Rlci5vYmplY3QuY2xhc3NMaXN0LnJlbW92ZSgnY3RybCcpXHJcbiAgICB9LCB3aW5kb3cudmlld2VyU3RhdGUuZHVyYXRpb24pXHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZSA9IHtcclxuICAgICckYm94JzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJveCcpLFxyXG4gICAgJyR2aWRlbyc6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlbycpLFxyXG4gICAgJyRzb3VyY2UnOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc291cmNlJyksXHJcbiAgICAnJHNpZGVNZW51Qm94Jzoge1xyXG4gICAgICAgICdvYmplY3QnOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpLFxyXG4gICAgICAgICdoaWRlJzogbnVsbCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBmdW5jdGlvbiAtPiB2b2lkXHJcbiAgICAgICAgJ3Nob3cnOiBudWxsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGZ1bmN0aW9uIC0+IHZvaWRcclxuICAgIH0sXHJcbiAgICAnJHNsaWRlcic6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyX19zbGlkZXInKSxcclxuICAgICckZm9vdGVyJzoge1xyXG4gICAgICAgICdvYmplY3QnOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyJyksXHJcbiAgICAgICAgJ2hpZGUnOiBudWxsLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGZ1bmN0aW9uIC0+IHZvaWRcclxuICAgICAgICAnc2hvdyc6IG51bGwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgZnVuY3Rpb24gLT4gdm9pZFxyXG4gICAgfSxcclxuICAgICckYnRuSGVscCc6ICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19sZWZ0X19oZWxwJyksXHJcbiAgICAnJGJ0blBsYXknOiAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fbGVmdF9fcGxheScpLFxyXG4gICAgJyRidG5Wb2x1bWUnOiAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX2xlZnRfX3ZvbHVtZScpLFxyXG4gICAgJyRidG5RdWFsaXR5JzogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX2xlZnRfX3F1YWxpdHknKSxcclxuICAgICckYnRuU2NhbGUnOiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19yaWdodF9fc2NhbGUnKSxcclxuICAgICckYnRuQWxpZ24nOiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19yaWdodF9fYWxpZ24nKSxcclxuICAgICckYnRuTWVudU9mZic6ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19yaWdodF9fbWVudS1vZmYnKSxcclxuICAgICckYnRuRnVsbFNjcic6ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19yaWdodF9fZnVsbHNjcicpLFxyXG4gICAgJ2FjdGl2ZSRpbnB1dCc6IG51bGwsXHJcbiAgICAnaGlnaFF1YWxpdHknOiBmYWxzZSxcclxuICAgICdhbGlnblZlcnRpY2FsJzogZmFsc2UsXHJcbiAgICAnaXMkc2lkZU1lbnVCb3hIaWRkZW4nOiBmYWxzZSxcclxuICAgICdpcyRmb290ZXJIaWRkZW4nOiBmYWxzZSxcclxuICAgICdkdXJhdGlvbic6IDUwMFxyXG4gIH07XHJcblxyXG4gICAgd2luZG93LnZpZXdlclN0YXRlLmlzVmlkZW9Xb3JraW5nID0gcmVxdWlyZSgnLi9hc2tWaWRlb1dvcmtpbmcuanMnKSAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGJvb2xlYW5cclxuICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5pc0Z1bGxTY3JlZW5BbGxvd2VkID0gcmVxdWlyZSgnLi9hc2tGdWxsU2NyZWVuLmpzJykgICAgICAgICAgICAgICAgICAgICAgIC8vICBib29sZWFuXHJcbiAgICB3aW5kb3cudmlld2VyU3RhdGUuaXNfaVBhZF9pUGhvbmUgPSByZXF1aXJlKCcuL2Fza19pUGFkX2lQaG9uZS5qcycpICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgYm9vbGVhblxyXG4gICAgd2luZG93LnZpZXdlclN0YXRlLmlzX2lQYWRfaVBob25lX2luRnVsbFNjcmVlbiA9IHJlcXVpcmUoJy4vYXNrX2lQYWRfaVBob25lX0Z1bGxTY3JlZW4uanMnKSAgLy8gIGJvb2xlYW5cclxuICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5hc2skYm94SW5GdWxsU2NyZWVuID0gcmVxdWlyZSgnLi9hc2skYm94SW5GdWxsU2NyZWVuLmpzJykgICAgICAgICAgICAgICAgIC8vICBmdW5jdGlvbiAtPiBib29sZWFuXHJcbiAgXHJcbiAgICAvLyAgU2V0IGhpZGUoKSBhbmQgc2hvdygpIG1ldGhvZHMgZm9yICRzaWRlTWVudUJveCBhbmQgJGZvb3RlclxyXG4gICAgLy8gIGJhc2luZyBvbiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgb3Igc2V0SW50ZXJ2YWxcclxuLy8gICBpZihyZXF1aXJlKCcuL2Fza0FuaW1hdGlvbkZyYW1lQWxsb3dlZC5qcycpKSB7XHJcbiAgICAgcmVxdWlyZSgnLi9zZXRNZW51QW5kRm9vdGVyTWV0aG9kc1dpdGhGcmFtZS5qcycpXHJcbi8vICAgfSBlbHNlIHtcclxuLy8gICAgIHJlcXVpcmUoJy4vc2V0TWVudUFuZEZvb3Rlck1ldGhvZHNXaXRoSW50ZXJ2YWwuanMnKVxyXG4vLyAgIH1cclxuXHJcbiAgcmVxdWlyZSgnLi9jaGFubmVsU2VsZWN0b3IuanMnKVxyXG4gIHJlcXVpcmUoJy4vcXVhbGl0eVNlbGVjdG9yLmpzJylcclxuICByZXF1aXJlKCcuL2FsaWduU2VsZWN0b3IuanMnKVxyXG4gIHJlcXVpcmUoJy4vaGlkZVNob3dNZW51LmpzJylcclxuICByZXF1aXJlKCcuL2Z1bGxzY3JlZW4uanMnKVxyXG4gIHJlcXVpcmUoJy4vdmlkZW9FcnJvckxpc3RlbmVyJylcclxuICByZXF1aXJlKCcuL2J1dHRvbkhlbHAuanMnKVxyXG5cclxufSIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyICRidG4gPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0blF1YWxpdHlcclxudmFyICRzaWduSFEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbdGl0bGUgPSBoaWdodF9xdWFsaXR5XScpXHJcbnZhciAkc2lnbkxRID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW3RpdGxlID0gbG93X3F1YWxpdHldJylcclxuXHJcbmlmICgkc2lnbkxRLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICB3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkgPSBmYWxzZVxyXG59IGVsc2UgaWYgKCRzaWduSFEuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSA9IHRydWVcclxufSBlbHNlIHtcclxuICAkc2lnbkxRLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgd2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5ID0gZmFsc2VcclxufVxyXG5cclxuJGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZVF1YWxpdHkpXHJcblxyXG5mdW5jdGlvbiB0b2dnbGVRdWFsaXR5IChldmVudCkge1xyXG4gIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgdmFyIGxpbmsgPSB1bmRlZmluZWRcclxuICBpZiAod2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5KSB7XHJcbiAgICAkc2lnbkhRLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcbiAgICAkc2lnbkxRLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgICB3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkgPSBmYWxzZVxyXG4gICAgaWYgKHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQpIHtcclxuICAgICAgbGluayA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmstbHEnKVxyXG4gICAgICB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgd2luZG93LnZpZXdlclN0YXRlLiRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvLnBsYXkoKVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICAkc2lnbkxRLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcbiAgICAkc2lnbkhRLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgICB3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkgPSB0cnVlXHJcbiAgICBpZiAod2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dCkge1xyXG4gICAgICBsaW5rID0gd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1ocScpXHJcbiAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICB3aW5kb3cudmlld2VyU3RhdGUuJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8ucGxheSgpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxuLy8gaHR0cDovL3BhdWxpcmlzaC5jb20vMjAxMS9yZXF1ZXN0YW5pbWF0aW9uZnJhbWUtZm9yLXNtYXJ0LWFuaW1hdGluZy9cclxuLy8gaHR0cDovL215Lm9wZXJhLmNvbS9lbW9sbGVyL2Jsb2cvMjAxMS8xMi8yMC9yZXF1ZXN0YW5pbWF0aW9uZnJhbWUtZm9yLXNtYXJ0LWVyLWFuaW1hdGluZ1xyXG5cclxuLy8gcmVxdWVzdEFuaW1hdGlvbkZyYW1lIHBvbHlmaWxsIGJ5IEVyaWsgTcO2bGxlci4gZml4ZXMgZnJvbSBQYXVsIElyaXNoIGFuZCBUaW5vIFppamRlbFxyXG5cclxuLy8gTUlUIGxpY2Vuc2VcclxuXHJcbnZhciBsYXN0VGltZSA9IDA7XHJcbnZhciB2ZW5kb3JzID0gWydtcycsICdtb3onLCAnd2Via2l0JywgJ28nXTtcclxuZm9yKHZhciB4ID0gMDsgeCA8IHZlbmRvcnMubGVuZ3RoICYmICF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lOyArK3gpIHtcclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdmVuZG9yc1t4XSsnUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XHJcbiAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSB3aW5kb3dbdmVuZG9yc1t4XSsnQ2FuY2VsQW5pbWF0aW9uRnJhbWUnXSBcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8fCB3aW5kb3dbdmVuZG9yc1t4XSsnQ2FuY2VsUmVxdWVzdEFuaW1hdGlvbkZyYW1lJ107XHJcbn1cclxuXHJcbmlmICghd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSlcclxuICAgIHdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbihjYWxsYmFjaywgZWxlbWVudCkge1xyXG4gICAgICAgIHZhciBjdXJyVGltZSA9IG5ldyBEYXRlKCkuZ2V0VGltZSgpO1xyXG4gICAgICAgIHZhciB0aW1lVG9DYWxsID0gTWF0aC5tYXgoMCwgMzIgLSAoY3VyclRpbWUgLSBsYXN0VGltZSkpOyAgLy8gICAgTWF0aC5tYXgoMCwgMTYgLSAoY3VyclRpbWUgLSBsYXN0VGltZSkpO1xyXG4gICAgICAgIHZhciBpZCA9IHdpbmRvdy5zZXRUaW1lb3V0KGZ1bmN0aW9uKCkgeyBjYWxsYmFjayhjdXJyVGltZSArIHRpbWVUb0NhbGwpOyB9LCB0aW1lVG9DYWxsKTtcclxuICAgICAgICBsYXN0VGltZSA9IGN1cnJUaW1lICsgdGltZVRvQ2FsbDtcclxuICAgICAgICByZXR1cm4gaWQ7XHJcbiAgICB9O1xyXG5cclxuaWYgKCF3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUpXHJcbiAgICB3aW5kb3cuY2FuY2VsQW5pbWF0aW9uRnJhbWUgPSBmdW5jdGlvbihpZCkge1xyXG4gICAgICAgIGNsZWFyVGltZW91dChpZCk7XHJcbiAgICB9O1xyXG4vLyAgRW5kIHJGQSBwb2x5ZmlsbFxyXG5cclxudmFyICRzaWRlTWVudUJveCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc2lkZU1lbnVCb3hcclxudmFyICRmb290ZXIgPSB3aW5kb3cudmlld2VyU3RhdGUuJGZvb3RlclxyXG52YXIgZHVyYXRpb24gPSB3aW5kb3cudmlld2VyU3RhdGUuZHVyYXRpb25cclxuXHJcbndpbmRvdy52aWV3ZXJTdGF0ZS4kc2lkZU1lbnVCb3guaGlkZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShoaWRlKVxyXG4gICAgZnVuY3Rpb24gaGlkZSh0aW1lU3RhbXApIHtcclxuICAgICAgICBpZiAoIXN0YXJ0VGltZSkgc3RhcnRUaW1lID0gdGltZVN0YW1wXHJcbiAgICAgICAgdmFyIHByb2dyZXNzID0gKHRpbWVTdGFtcCAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvblxyXG4gICAgICAgIGlmIChwcm9ncmVzcyA8PSAxKSB7XHJcbiAgICAgICAgICAgICRzaWRlTWVudUJveC5vYmplY3Quc3R5bGUub3BhY2l0eSA9IDEgLSBwcm9ncmVzc1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGlkZSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkc2lkZU1lbnVCb3gub2JqZWN0LnN0eWxlLm9wYWNpdHkgPSAwXHJcbiAgICAgICAgICAgICRzaWRlTWVudUJveC5vYmplY3Quc3R5bGUucmlnaHQgPSAnLTVlbSdcclxuICAgICAgICAgICAgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5pcyRzaWRlTWVudUJveEhpZGRlbiA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbndpbmRvdy52aWV3ZXJTdGF0ZS4kc2lkZU1lbnVCb3guc2hvdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgICRzaWRlTWVudUJveC5vYmplY3Quc3R5bGUucmlnaHQgPSAnJ1xyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNob3cpXHJcbiAgICBmdW5jdGlvbiBzaG93KHRpbWVTdGFtcCkge1xyXG4gICAgICAgIGlmICghc3RhcnRUaW1lKSBzdGFydFRpbWUgPSB0aW1lU3RhbXBcclxuICAgICAgICB2YXIgcHJvZ3Jlc3MgPSAodGltZVN0YW1wIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uXHJcbiAgICAgICAgaWYgKHByb2dyZXNzIDw9IDEpIHtcclxuICAgICAgICAgICAgJHNpZGVNZW51Qm94Lm9iamVjdC5zdHlsZS5vcGFjaXR5ID0gcHJvZ3Jlc3NcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNob3cpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJHNpZGVNZW51Qm94Lm9iamVjdC5zdHlsZS5vcGFjaXR5ID0gMVxyXG4gICAgICAgICAgICBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmlzJHNpZGVNZW51Qm94SGlkZGVuID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbndpbmRvdy52aWV3ZXJTdGF0ZS4kZm9vdGVyLmhpZGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGlkZSlcclxuICAgIGZ1bmN0aW9uIGhpZGUodGltZVN0YW1wKSB7XHJcbiAgICAgICAgaWYgKCFzdGFydFRpbWUpIHN0YXJ0VGltZSA9IHRpbWVTdGFtcFxyXG4gICAgICAgIHZhciBwcm9ncmVzcyA9ICh0aW1lU3RhbXAgLSBzdGFydFRpbWUpIC8gZHVyYXRpb25cclxuICAgICAgICBpZiAocHJvZ3Jlc3MgPD0gMSkge1xyXG4gICAgICAgICAgICAkZm9vdGVyLm9iamVjdC5zdHlsZS5vcGFjaXR5ID0gMSAtIHByb2dyZXNzXHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShoaWRlKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRmb290ZXIub2JqZWN0LnN0eWxlLm9wYWNpdHkgPSAwXHJcbiAgICAgICAgICAgICRmb290ZXIub2JqZWN0LnN0eWxlLmJvdHRvbSA9ICctMTAlJ1xyXG4gICAgICAgICAgICBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmlzJGZvb3RlckhpZGRlbiA9IHRydWVcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbndpbmRvdy52aWV3ZXJTdGF0ZS4kZm9vdGVyLnNob3cgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAkZm9vdGVyLm9iamVjdC5zdHlsZS5ib3R0b20gPSAnJ1xyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNob3cpXHJcbiAgICBmdW5jdGlvbiBzaG93KHRpbWVTdGFtcCkge1xyXG4gICAgICAgIGlmICghc3RhcnRUaW1lKSBzdGFydFRpbWUgPSB0aW1lU3RhbXBcclxuICAgICAgICB2YXIgcHJvZ3Jlc3MgPSAodGltZVN0YW1wIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uXHJcbiAgICAgICAgaWYgKHByb2dyZXNzIDw9IDEpIHtcclxuICAgICAgICAgICAgJGZvb3Rlci5vYmplY3Quc3R5bGUub3BhY2l0eSA9IHByb2dyZXNzXHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShzaG93KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRmb290ZXIub2JqZWN0LnN0eWxlLm9wYWNpdHkgPSAxXHJcbiAgICAgICAgICAgIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaXMkZm9vdGVySGlkZGVuID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgJHZpZGVvID0gd2luZG93LnZpZXdlclN0YXRlLiR2aWRlb1xyXG5cclxuJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZmFpbGVkKVxyXG5cclxuIGZ1bmN0aW9uIGZhaWxlZChlKSB7XHJcbiAgIC8vIHZpZGVvIHBsYXliYWNrIGZhaWxlZCAtIHNob3cgYSBtZXNzYWdlIHNheWluZyB3aHkgICAgIC0gZnJvbSBodHRwczovL2Rldi53My5vcmcvaHRtbDUvc3BlYy1hdXRob3Itdmlldy92aWRlby5odG1sI3ZpZGVvXHJcbiAgIHN3aXRjaCAoZS50YXJnZXQuZXJyb3IuY29kZSkge1xyXG4gICAgIGNhc2UgZS50YXJnZXQuZXJyb3IuTUVESUFfRVJSX0FCT1JURUQ6XHJcbiAgICAgICBhbGVydCgnWW91IGFib3J0ZWQgdGhlIHZpZGVvIHBsYXliYWNrLicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfTkVUV09SSzpcclxuICAgICAgIGFsZXJ0KCdBIG5ldHdvcmsgZXJyb3IgY2F1c2VkIHRoZSB2aWRlbyBkb3dubG9hZCB0byBmYWlsIHBhcnQtd2F5LicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfREVDT0RFOlxyXG4gICAgICAgYWxlcnQoJ1RoZSB2aWRlbyBwbGF5YmFjayB3YXMgYWJvcnRlZCBkdWUgdG8gYSBjb3JydXB0aW9uIHByb2JsZW0gb3IgYmVjYXVzZSB0aGUgdmlkZW8gdXNlZCBmZWF0dXJlcyB5b3VyIGJyb3dzZXIgZGlkIG5vdCBzdXBwb3J0LicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfU1JDX05PVF9TVVBQT1JURUQ6XHJcbiAgICAgICBhbGVydCgnVGhlIHZpZGVvIGNvdWxkIG5vdCBiZSBsb2FkZWQsIGVpdGhlciBiZWNhdXNlIHRoZSBzZXJ2ZXIgb3IgbmV0d29yayBmYWlsZWQgb3IgYmVjYXVzZSB0aGUgZm9ybWF0IGlzIG5vdCBzdXBwb3J0ZWQuJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgICBkZWZhdWx0OlxyXG4gICAgICAgYWxlcnQoJ0FuIHVua25vd24gZXJyb3Igb2NjdXJyZWQuJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgfVxyXG4gfVxyXG4iXX0=
