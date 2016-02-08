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
    var allowed
    if(typeof requestAnimationFrame  === 'function') {
        allowed = true
        console.log('requestAnimationFrame ok')
    } else {
        allowed = false
        console.log('no requestAnimationFrame')
    }
    return allowed
})()

},{}],4:[function(require,module,exports){
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

},{}],5:[function(require,module,exports){
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

},{}],6:[function(require,module,exports){
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
},{}],7:[function(require,module,exports){
'use strict'

module.exports = (function() {
    if(window.viewerState.is_iPad_iPhone &&
        window.innerHeight >= window.screen.availHeight) 
        {
        return true
    } else return false
})()

},{}],8:[function(require,module,exports){
var $help = document.querySelector('.help')
var $btnHelp = window.viewerState.$btnHelp

$btnHelp.addEventListener('click', function(){
    if($help.classList.contains("active")) {
        $help.classList.remove("active")
    } else {
        $help.classList.add("active")
    }
})
},{}],9:[function(require,module,exports){
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

},{}],10:[function(require,module,exports){
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

},{}],11:[function(require,module,exports){
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
            transformFooter('back')
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
            transformFooter('back')
            clearTimeout(id)
            $box.addEventListener('click', boxHandler)
        }
    }
}
function showControls() {
    transformFooter('toControls')
    $footer.show()
}
function hideControls() {
    $footer.hide()
    setTimeout(function(){
        transformFooter('back')
    }, window.viewerState.duration)
}
function transformFooter(where) {
    if(where === 'toControls'){
        $footer.object.style.width = '19em'
        $footer.object.style.left = (window.innerWidth - $footer.object.offsetWidth)/2 + 'px'
        $footer.object.style.borderRadius = '2em'
        $footer__center.style.display = 'none'
    } else if(where === 'back'){
        $footer.object.style.width = ''
        $footer.object.style.left = ''
        $footer.object.style.borderRadius = ''
        $footer__center.style.display = ''
    }
}

},{}],12:[function(require,module,exports){
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
  if(require('./askAnimationFrameAllowed.js')) {
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
  require('./buttonHelp.js')

}
},{"./alignSelector.js":1,"./ask$boxInFullScreen.js":2,"./askAnimationFrameAllowed.js":3,"./askFullScreen.js":4,"./askVideoWorking.js":5,"./ask_iPad_iPhone.js":6,"./ask_iPad_iPhone_FullScreen.js":7,"./buttonHelp.js":8,"./channelSelector.js":9,"./fullscreen.js":10,"./hideShowMenu.js":11,"./qualitySelector.js":13,"./setMenuAndFooterMethodsWithFrame.js":14,"./setMenuAndFooterMethodsWithInterval.js":15,"./videoErrorListener":16}],13:[function(require,module,exports){
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

},{}],14:[function(require,module,exports){
'use strict'

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

},{}],15:[function(require,module,exports){
'use strict'

var $sideMenuBox = window.viewerState.$sideMenuBox
var $footer = window.viewerState.$footer
var duration = window.viewerState.duration

window.viewerState.$sideMenuBox.hide = function () {
    var startTime = undefined
    var id = setInterval(hide, 40)
    function hide() {
        if (!startTime) startTime = Date.now()
        var progress = (Date.now() - startTime) / duration
        if (progress <= 1) {
            $sideMenuBox.object.style.opacity = 1 - progress
        } else {
            clearInterval(id)
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
    var id = setInterval(show, 40)
    function show() {
        if (!startTime) startTime = Date.now()
        var progress = (Date.now() - startTime) / duration
        if (progress <= 1) {
            $sideMenuBox.object.style.opacity = progress
            requestAnimationFrame(show)
        } else {
            clearInterval(id)
            $sideMenuBox.object.style.opacity = 1
            startTime = undefined
            window.viewerState.is$sideMenuBoxHidden = false
        }
    }
}

window.viewerState.$footer.hide = function () {
    var startTime = undefined
    var id = setInterval(hide, 40)
    function hide() {
        if (!startTime) startTime = Date.now()
        var progress = (Date.now() - startTime) / duration
        if (progress <= 1) {
            $footer.object.style.opacity = 1 - progress
            requestAnimationFrame(hide)
        } else {
            clearInterval(id)
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
    var id = setInterval(show, 40)
    function show() {
        if (!startTime) startTime = Date.now()
        var progress = (Date.now() - startTime) / duration
        if (progress <= 1) {
            $footer.object.style.opacity = progress
            requestAnimationFrame(show)
        } else {
            clearInterval(id)
            $footer.object.style.opacity = 1
            startTime = undefined
            window.viewerState.is$footerHidden = false
        }
    }
}

},{}],16:[function(require,module,exports){
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

},{}]},{},[12])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2EwNS9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hbGlnblNlbGVjdG9yLmpzIiwianMvYXNrJGJveEluRnVsbFNjcmVlbi5qcyIsImpzL2Fza0FuaW1hdGlvbkZyYW1lQWxsb3dlZC5qcyIsImpzL2Fza0Z1bGxTY3JlZW4uanMiLCJqcy9hc2tWaWRlb1dvcmtpbmcuanMiLCJqcy9hc2tfaVBhZF9pUGhvbmUuanMiLCJqcy9hc2tfaVBhZF9pUGhvbmVfRnVsbFNjcmVlbi5qcyIsImpzL2J1dHRvbkhlbHAuanMiLCJqcy9jaGFubmVsU2VsZWN0b3IuanMiLCJqcy9mdWxsc2NyZWVuLmpzIiwianMvaGlkZVNob3dNZW51LmpzIiwianMvbWFpbi5qcyIsImpzL3F1YWxpdHlTZWxlY3Rvci5qcyIsImpzL3NldE1lbnVBbmRGb290ZXJNZXRob2RzV2l0aEZyYW1lLmpzIiwianMvc2V0TWVudUFuZEZvb3Rlck1ldGhvZHNXaXRoSW50ZXJ2YWwuanMiLCJqcy92aWRlb0Vycm9yTGlzdGVuZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2JBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDVEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzdHQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDN0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNoRkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiXHJcblxyXG52YXIgJGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9vdGVyX19yaWdodF9fYWxpZ25cIilcclxudmFyICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8gXHJcblxyXG5pZigkYnRuLmNsYXNzTGlzdC5jb250YWlucyhcInZlcnRpY2FsXCIpKSB7XHJcbiAgICB3aW5kb3cudmlld2VyU3RhdGUuYWxpZ25WZXJ0aWNhbCA9IHRydWU7XHJcbn0gZWxzZSBpZigkYnRuLmNsYXNzTGlzdC5jb250YWlucyhcImhvcmlzb250YWxcIikpIHtcclxuICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5hbGlnblZlcnRpY2FsID0gZmFsc2U7XHJcbn0gZWxzZSB7XHJcbiAgICAkYnRuLmNsYXNzTGlzdC5hZGQoXCJ2ZXJ0aWNhbFwiKVxyXG4gICAgd2luZG93LnZpZXdlclN0YXRlLmFsaWduVmVydGljYWwgPSB0cnVlO1xyXG59XHJcbmZpdCgpXHJcblxyXG4kYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVBbGlnbilcclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZUFsaWduKGV2ZW50KSB7XHJcbiAgICBpZih3aW5kb3cudmlld2VyU3RhdGUuYWxpZ25WZXJ0aWNhbCkge1xyXG4gICAgICAgICRidG4uY2xhc3NMaXN0LnJlbW92ZShcInZlcnRpY2FsXCIpXHJcbiAgICAgICAgJGJ0bi5jbGFzc0xpc3QuYWRkKFwiaG9yaXNvbnRhbFwiKVxyXG4gICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5hbGlnblZlcnRpY2FsID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICRidG4uY2xhc3NMaXN0LnJlbW92ZShcImhvcmlzb250YWxcIilcclxuICAgICAgICAkYnRuLmNsYXNzTGlzdC5hZGQoXCJ2ZXJ0aWNhbFwiKVxyXG4gICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5hbGlnblZlcnRpY2FsID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGZpdCgpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpdCgpIHtcclxuICAgIGlmKCRidG4uY2xhc3NMaXN0LmNvbnRhaW5zKFwidmVydGljYWxcIikpIHtcclxuICAgICAgICAkdmlkZW8uc3R5bGUud2lkdGggPSAnMTAwJSdcclxuICAgICAgICAkdmlkZW8uc3R5bGUuaGVpZ2h0ID0gJzEwMCUnXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICR2aWRlby5zdHlsZS53aWR0aCA9ICcxMDAlJ1xyXG4gICAgICAgICR2aWRlby5zdHlsZS5oZWlnaHQgPSAnYXV0bydcclxuICAgIH1cclxufSIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIGlmIChkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCB8fCBcclxuICAgICAgICBkb2N1bWVudC53ZWJraXRGdWxsc2NyZWVuRWxlbWVudCB8fFxyXG4gICAgICAgIGRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbGVtZW50IHx8XHJcbiAgICAgICAgZG9jdW1lbnQubXNGdWxsc2NyZWVuRWxlbWVudCB8fFxyXG4gICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZV9pbkZ1bGxTY3JlZW4gKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSByZXR1cm4gZmFsc2VcclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBhbGxvd2VkXHJcbiAgICBpZih0eXBlb2YgcmVxdWVzdEFuaW1hdGlvbkZyYW1lICA9PT0gJ2Z1bmN0aW9uJykge1xyXG4gICAgICAgIGFsbG93ZWQgPSB0cnVlXHJcbiAgICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3RBbmltYXRpb25GcmFtZSBvaycpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsbG93ZWQgPSBmYWxzZVxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdubyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUnKVxyXG4gICAgfVxyXG4gICAgcmV0dXJuIGFsbG93ZWRcclxufSkoKVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciAkYm94ID0gd2luZG93LnZpZXdlclN0YXRlLiRib3hcclxuICAgIHZhciBhbGxvd2VkID0gZmFsc2VcclxuICAgIGlmICgkYm94LnJlcXVlc3RGdWxsc2NyZWVuIHx8XHJcbiAgICAgICAgJGJveC5tb3pSZXF1ZXN0RnVsbFNjcmVlbiB8fFxyXG4gICAgICAgICRib3gud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4gfHxcclxuICAgICAgICAkYm94Lm1zUmVxdWVzdEZ1bGxzY3JlZW5cclxuICAgICAgICApIHtcclxuICAgICAgICBhbGxvd2VkID0gdHJ1ZSBcclxuICAgICAgICBjb25zb2xlLmxvZygnRnVsbFNjcmVlbiBvaycpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGFsbG93ZWQgPSBmYWxzZSBcclxuICAgICAgICBjb25zb2xlLmxvZygnTm8gZnVsbHNjcmVlbicpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWxsb3dlZFxyXG59KSgpXHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYodHlwZW9mIHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8ucGxheSA9PT0gJ2Z1bmN0aW9uJyApIHtcclxuICAgICAgICBjb25zb2xlLmxvZygndmlkZW8gb2sgbmVlZHMgdG8gYmUgY29uZmlybWVkJylcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnbm8gdmlkZW8nKVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG59KSgpXHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignaVBhZCcpICE9PSAtMSAmJlxyXG4gICAgICAgIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ1NhZmFyaScpICE9PSAtMSApXHJcbiAgICAgICAge1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9IGVsc2UgaWYod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignaVBob25lJykgIT09IC0xICYmXHJcbiAgICAgICAgd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignU2FmYXJpJykgIT09IC0xICkgXHJcbiAgICAgICAge1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9IGVsc2UgcmV0dXJuIGZhbHNlXHJcbn0pKCkiLCIndXNlIHN0cmljdCdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uKCkge1xyXG4gICAgaWYod2luZG93LnZpZXdlclN0YXRlLmlzX2lQYWRfaVBob25lICYmXHJcbiAgICAgICAgd2luZG93LmlubmVySGVpZ2h0ID49IHdpbmRvdy5zY3JlZW4uYXZhaWxIZWlnaHQpIFxyXG4gICAgICAgIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSBlbHNlIHJldHVybiBmYWxzZVxyXG59KSgpXHJcbiIsInZhciAkaGVscCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5oZWxwJylcclxudmFyICRidG5IZWxwID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5IZWxwXHJcblxyXG4kYnRuSGVscC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICBpZigkaGVscC5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpIHtcclxuICAgICAgICAkaGVscC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICRoZWxwLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIilcclxuICAgIH1cclxufSkiLCJcInVzZSBzdHJpY3RcIlxyXG5cclxudmFyICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW9cclxudmFyICRzb3VyY2UgPSB3aW5kb3cudmlld2VyU3RhdGUuJHNvdXJjZVxyXG52YXIgJHNsaWRlciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc2xpZGVyXHJcbnZhciBhY3RpdmUkaW5wdXQgPSB3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0XHJcbnZhciAkYnRuTWVudU9uT2YgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19yaWdodF9fbWVudS1vZmYnKVxyXG52YXIgJGJ0bkFsaWduID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fcmlnaHRfX2FsaWduJylcclxudmFyIGxpbmsgPSAnJ1xyXG52YXIgJGJ0bnMgPSB7XHJcbiAgICBcImNoXzFnb3JvZHNrb3lcIjogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfMWdvcm9kc2tveVwiKSxcclxuICAgIFwiY2hfM3RzeWZyb3ZveVwiOiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF8zdHN5ZnJvdm95XCIpLFxyXG4gICAgXCJjaF9yZXBvcnRlclwiOiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX3JlcG9ydGVyXCIpLFxyXG4gICAgXCJjaF9hY2FkZW1pYVwiOiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX2FjYWRlbWlhXCIpLFxyXG4gICAgXCJjaF9hMVwiOiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX2ExXCIpLFxyXG4gICAgXCJjaF9kdW1za2F5YVwiOiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX2R1bXNrYXlhXCIpLFxyXG4gICAgXCJjaF9ndHZcIjogICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX2d0dlwiKSxcclxuICAgIFwiY2hfc3R2XCI6ICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9zdHZcIiksXHJcbiAgICBcImNoX3VnbmF5YXZvbG5hXCI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfdWduYXlhdm9sbmFcIiksXHJcbiAgICBcImNoX25lbW9cIjogICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfbmVtb1wiKVxyXG59XHJcbiRidG5zLmNoXzFnb3JvZHNrb3kuc2V0QXR0cmlidXRlKCAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS8xdHZvZC8xdHZvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiICAgIClcclxuJGJ0bnMuY2hfM3RzeWZyb3ZveS5zZXRBdHRyaWJ1dGUoICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vY2RuNS5saXZlLXR2Lm9kLnVhOjgwODEvdHYvM3R2b2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgKVxyXG4kYnRucy5jaF9yZXBvcnRlci5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly9jZG40LmxpdmUtdHYub2QudWE6ODA4MS90di8zMWNob2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiApXHJcbiRidG5zLmNoX2FjYWRlbWlhLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovL2NkbjQubGl2ZS10di5vZC51YTo4MDgxL3R2LzM2Y2hvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiIClcclxuJGJ0bnMuY2hfYTEuc2V0QXR0cmlidXRlKCAgICAgICAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL2Exb2QvYTFvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiICAgICAgKVxyXG4kYnRucy5jaF9kdW1za2F5YS5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTM4OjgwODEvZHVtc2thL2R1bXNrYS1hYnItbHEvcGxheWxpc3QubTN1OFwiICApXHJcbiRidG5zLmNoX2d0di5zZXRBdHRyaWJ1dGUoICAgICAgICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9hMW9kL2d0dm9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgICAgIClcclxuJGJ0bnMuY2hfc3R2LnNldEF0dHJpYnV0ZSggICAgICAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL3N0dm9kL3N0dm9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgICAgKVxyXG4kYnRucy5jaF91Z25heWF2b2xuYS5zZXRBdHRyaWJ1dGUoICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvd2F2ZS93YXZlLWFici1scS9wbGF5bGlzdC5tM3U4XCIgICAgICApXHJcbiRidG5zLmNoX25lbW8uc2V0QXR0cmlidXRlKCAgICAgICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9uZW1vL21vci1zdWIvcGxheWxpc3QubTN1OFwiICAgICAgICAgIClcclxuXHJcbiRidG5zLmNoXzFnb3JvZHNrb3kuc2V0QXR0cmlidXRlKCAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS8xdHZvZC8xdHZvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgIClcclxuJGJ0bnMuY2hfM3RzeWZyb3ZveS5zZXRBdHRyaWJ1dGUoICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vY2RuNS5saXZlLXR2Lm9kLnVhOjgwODEvdHYvM3R2b2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgKVxyXG4kYnRucy5jaF9yZXBvcnRlci5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly9jZG40LmxpdmUtdHYub2QudWE6ODA4MS90di8zMWNob2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICApXHJcbiRidG5zLmNoX2FjYWRlbWlhLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovL2NkbjQubGl2ZS10di5vZC51YTo4MDgxL3R2LzM2Y2hvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgIClcclxuJGJ0bnMuY2hfYTEuc2V0QXR0cmlidXRlKCAgICAgICAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL2Exb2QvYTFvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgICAgKVxyXG4kYnRucy5jaF9kdW1za2F5YS5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTM4OjgwODEvZHVtc2thL2R1bXNrYS1hYnIvcGxheWxpc3QubTN1OFwiICAgICApXHJcbiRidG5zLmNoX2d0di5zZXRBdHRyaWJ1dGUoICAgICAgICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9hMW9kL2d0dm9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgIClcclxuJGJ0bnMuY2hfc3R2LnNldEF0dHJpYnV0ZSggICAgICAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL3N0dm9kL3N0dm9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgKVxyXG4kYnRucy5jaF91Z25heWF2b2xuYS5zZXRBdHRyaWJ1dGUoICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvd2F2ZS93YXZlLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgICApXHJcbiRidG5zLmNoX25lbW8uc2V0QXR0cmlidXRlKCAgICAgICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9uZW1vL21vci1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgICAgIClcclxuXHJcbiRzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgIGlmKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdJTlBVVCcpe1xyXG4gICAgICAgIGlmKGFjdGl2ZSRpbnB1dCA9PT0gZS50YXJnZXQpIHtcclxuICAgICAgICAgICAgYWN0aXZlJGlucHV0LmNoZWNrZWQgPSBmYWxzZVxyXG4gICAgICAgICAgICBhY3RpdmUkaW5wdXQgPSBudWxsXHJcbiAgICAgICAgICAgICR2aWRlby5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9IFwiXCJcclxuICAgICAgICAgICAgJHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgJycpXHJcbiAgICAgICAgICAgICRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCAnJylcclxuICAgICAgICAgICAgJGJ0bk1lbnVPbk9mLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICAgICAgJGJ0bkFsaWduLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhY3RpdmUkaW5wdXQgPSBlLnRhcmdldFxyXG4gICAgICAgICAgICBpZih3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkpICBsaW5rID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmstaHEnKVxyXG4gICAgICAgICAgICBlbHNlIGxpbmsgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1scScpXHJcbiAgICAgICAgICAgICR2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgICAgICAgICRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICAgICAgICAkdmlkZW8uc3R5bGUuYmFja2dyb3VuZFNpemUgPSBcIjAgMFwiXHJcbiAgICAgICAgICAgIGlmKCR2aWRlby5wbGF5KSAkdmlkZW8ucGxheSgpO1xyXG4gICAgICAgICAgICBlbHNlIGFsZXJ0ICgndmlkZW8gY2Fubm90IHBsYXknKVxyXG4gICAgICAgICAgICAkYnRuTWVudU9uT2Yuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snXHJcbiAgICAgICAgICAgICRidG5BbGlnbi5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jaydcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pXHJcbiIsIid1c2Ugc3RyaWN0J1xuXG52YXIgJGJ0bkZ1bGxTY3IgPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0bkZ1bGxTY3JcbnZhciAkYm94ID0gd2luZG93LnZpZXdlclN0YXRlLiRib3hcblxuaWYgKCB3aW5kb3cudmlld2VyU3RhdGUuaXNGdWxsU2NyZWVuQWxsb3dlZCApIHtcbiAgJGJ0bkZ1bGxTY3IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgICBpZih3aW5kb3cudmlld2VyU3RhdGUuYXNrJGJveEluRnVsbFNjcmVlbigpKSBnZXRPZmZGdWxsc2NyZWVuKClcbiAgICAgIGVsc2UgZ29GdWxsU2NyZWVuKClcbiAgfSlcbn1cblxuZnVuY3Rpb24gZ29GdWxsU2NyZWVuKCkge1xuICAgIGlmICgkYm94LnJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICRib3gucmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgIH0gZWxzZSBpZiAoJGJveC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgICAkYm94Lm1velJlcXVlc3RGdWxsU2NyZWVuKClcbiAgICB9IGVsc2UgaWYgKCRib3gud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgJGJveC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpXG4gICAgfSBlbHNlIGlmICgkYm94Lm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgJGJveC5tc1JlcXVlc3RGdWxsc2NyZWVuKClcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRPZmZGdWxsc2NyZWVuKCkge1xuICBpZihkb2N1bWVudC5leGl0RnVsbHNjcmVlbikge1xuICAgIGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKCk7XG4gIH0gZWxzZSBpZihkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XG4gICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xuICB9IGVsc2UgaWYoZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4pIHtcbiAgICBkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuICB9ZWxzZSBpZiAoZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbikge1xuXHRkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKCk7XG4gIH1cbn1cbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyICRib3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJGJveFxyXG52YXIgJHZpZGVvID0gd2luZG93LnZpZXdlclN0YXRlLiR2aWRlb1xyXG52YXIgJHNpZGVNZW51Qm94ID0gd2luZG93LnZpZXdlclN0YXRlLiRzaWRlTWVudUJveFxyXG52YXIgJGZvb3RlciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kZm9vdGVyXHJcbnZhciAkZm9vdGVyX19jZW50ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19jZW50ZXInKSBcclxudmFyICRidG5NZW51T2ZmID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5NZW51T2ZmXHJcbnZhciBhc2skYm94SW5GdWxsU2NyZWVuID0gd2luZG93LnZpZXdlclN0YXRlLmFzayRib3hJbkZ1bGxTY3JlZW5cclxudmFyIGR1cmF0aW9uQ3RybCA9IDUwMDAgIC8vICBtc1xyXG52YXIgaWQgPSB1bmRlZmluZWRcclxuXHJcbi8vICBIaWRlcy9zaG93ZXMgJHNpZGVNZW51Qm94IGFuZCAkZm9vdGVyXHJcbi8vICBcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIDwtLSBTdGF0ZSB8IEFjdGlvbiAtLT5cclxuLy8gIElmIC0tPiAgICAgJGJ0bk1lbnVPZmYgICAkZm9vdGVyICAgRnVsbFNjcmVlbiB8ICBFdmVudFNvdXJjZSAgIEV2ZW50VHlwZS9zdGF0ZSAgIEV2ZW50QWN0aW9uICAgICAgICAgSGFuZGxlciAgICAgICAgICAgICAgICBBZGRpdGlvbmFseVxyXG4vLyAgICAgICAgICAxLiAgICBzaG93biAgICAgICBzaG93biAgICAgICAgYW55ICAgIHwgICAkYnRuTWVudU9mZiAgIGNsaWNrL25vbmUgICAgICAgIGhpZGUgYm90aCAgICAgICAgICAgYnRuSGFkbGVyICAgICAgICAgICAgICAgICAgICAgICAgIFxyXG4vLyAgICAgICAgICAyLiAgICBoaWRkZW4gICAgICBzaG93biAgICAgICAgYW55ICAgIHwgICAkYnRuTWVudU9mZiAgIGNsaWNrL25vbmUgICAgICAgIHNob3cgYm90aCAgICAgICAgICAgYnRuSGFkbGVyICAgICAgICAgICAgICBcclxuLy8gICAgICAgICAgMy4gICAgaGlkZGVuICAgICAgaGlkZGVuICAgICAgIG9mZiAgICB8ICAgJGJveCAgICAgICAgICBjbGljay9ub25lICAgICAgICBzaG93IGJvdGggICAgICAgICAgIGJveEhhbmRsZXIgICAgICAgICAgICAgICAgICAgICAgICBcclxuLy8gICAgICAgICAgNC4gICAgaGlkZGVuICAgICAgaGlkZGVuICAgICAgIG9uICAgICB8ICAgJGJveCAgICAgICAgICBjbGljay9ub25lICAgICAgICBzaG93ICRmb290ZXJBc0N0cmwgIGJveEhhbmRsZXIgICAgICAgICAgICAgc2hvd3MgJGZvb3RlciBmb3IgNXNlYyBhcyBWaWRlb0N0cmxQYW5lbCAgICAgICAgICAgICAgICAgICAgICAgICAgXHJcbi8vICAgICAgICAgIDUuICAgIGhpZGRlbiAgICAgIHNob3duIEN0cmwgICBvbiAgICAgfCAgICRmb290ZXIgICAgICAgY2xpY2svbm9uZSAgICAgICAgcmVzZXQgdGltZXIgICAgICAgICBmb290ZXJIYW5kbGVyICAgICAgICAgIGNsaWNrIHJlc2V0cyA1c2VjIGNvdW50ZG93biAoZm9yIGFueSBmb290ZXIgYnV0dG9uIGV4Y2VwdCAkYnRuTWVudU9mZiBhbmQgJGJ0bkZ1bGxTY3IpXHJcbi8vICAgICAgICAgIDYuICAgIGFueSAgICAgICAgIGFueSAgICAgICAgICBvZmYgICAgfCAgIEZ1bGxTY3JlZW4gICAgZXZlbnQvb24gICAgICAgICAgaGlkZSBib3RoICAgICAgICAgICBmdWxsU2NyZWVuSGFuZGxlciAgICAgICBcclxuLy8gICAgICAgICAgNy4gICAgYW55ICAgICAgICAgYW55ICAgICAgICAgIG9uICAgICB8ICAgRnVsbFNjcmVlbiAgICBldmVudC9vZmYgICAgICAgICBzaG93IGJvdGggICAgICAgICAgIGZ1bGxTY3JlZW5IYW5kbGVyICAgICAgIFxyXG5cclxuJGJ0bk1lbnVPZmYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBidG5IYW5kbGVyKVxyXG4kZm9vdGVyLm9iamVjdC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZvb3RlckhhbmRsZXIpXHJcbiRib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBib3hIYW5kbGVyKVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdmdWxsc2NyZWVuY2hhbmdlJywgZnVsbFNjcmVlbkhhbmRsZXIpXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnLCBmdWxsU2NyZWVuSGFuZGxlcilcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW96ZnVsbHNjcmVlbmNoYW5nZScsIGZ1bGxTY3JlZW5IYW5kbGVyKVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdNU0Z1bGxzY3JlZW5DaGFuZ2UnLCBmdWxsU2NyZWVuSGFuZGxlcilcclxuXHJcbmZ1bmN0aW9uIGJ0bkhhbmRsZXIoZSkge1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgaWYoIXdpbmRvdy52aWV3ZXJTdGF0ZS5pcyRzaWRlTWVudUJveEhpZGRlbiAmJiAhd2luZG93LnZpZXdlclN0YXRlLmlzJGZvb3RlckhpZGRlbikge1xyXG4gICAgICAgICRzaWRlTWVudUJveC5oaWRlKClcclxuICAgICAgICAkZm9vdGVyLmhpZGUoKVxyXG4gICAgfSBlbHNlIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5pcyRzaWRlTWVudUJveEhpZGRlbikge1xyXG4gICAgICAgICRzaWRlTWVudUJveC5zaG93KClcclxuICAgICAgICBpZihpZCl7XHJcbiAgICAgICAgICAgIHRyYW5zZm9ybUZvb3RlcignYmFjaycpXHJcbiAgICAgICAgICAgIGNsZWFyVGltZW91dChpZClcclxuICAgICAgICAgICAgJGJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJveEhhbmRsZXIpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGZvb3RlckhhbmRsZXIoZSkge1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgaWYoYXNrJGJveEluRnVsbFNjcmVlbigpICYmIGlkKXtcclxuICAgICAgICBjbGVhclRpbWVvdXQoaWQpXHJcbiAgICAgICAgaWQgPSBzZXRUaW1lb3V0KCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBoaWRlQ29udHJvbHMoKVxyXG4gICAgICAgICAgICAkYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYm94SGFuZGxlcilcclxuICAgICAgICB9ICwgZHVyYXRpb25DdHJsKVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGJveEhhbmRsZXIoZSkge1xyXG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxyXG4gICAgaWYoYXNrJGJveEluRnVsbFNjcmVlbigpKSB7XHJcbiAgICAgICAgaWYodHJ1ZSkge1xyXG4gICAgICAgICAgICAkYm94LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYm94SGFuZGxlcilcclxuICAgICAgICAgICAgc2hvd0NvbnRyb2xzKClcclxuICAgICAgICAgICAgaWQgPSBzZXRUaW1lb3V0KCBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgaGlkZUNvbnRyb2xzKClcclxuICAgICAgICAgICAgICAgICRib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBib3hIYW5kbGVyKVxyXG4gICAgICAgICAgICB9ICwgZHVyYXRpb25DdHJsKVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYod2luZG93LnZpZXdlclN0YXRlLmlzJHNpZGVNZW51Qm94SGlkZGVuKSAkc2lkZU1lbnVCb3guc2hvdygpXHJcbiAgICAgICAgaWYod2luZG93LnZpZXdlclN0YXRlLmlzJGZvb3RlckhpZGRlbikgJGZvb3Rlci5zaG93KClcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBmdWxsU2NyZWVuSGFuZGxlcigpIHtcclxuICAgIGlmKGFzayRib3hJbkZ1bGxTY3JlZW4oKSl7XHJcbiAgICAgICAgaWYoIXdpbmRvdy52aWV3ZXJTdGF0ZS5pcyRzaWRlTWVudUJveEhpZGRlbikgJHNpZGVNZW51Qm94LmhpZGUoKVxyXG4gICAgICAgIGlmKCF3aW5kb3cudmlld2VyU3RhdGUuaXMkZm9vdGVySGlkZGVuKSAkZm9vdGVyLmhpZGUoKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpZih3aW5kb3cudmlld2VyU3RhdGUuaXMkc2lkZU1lbnVCb3hIaWRkZW4pICRzaWRlTWVudUJveC5zaG93KClcclxuICAgICAgICBpZih3aW5kb3cudmlld2VyU3RhdGUuaXMkZm9vdGVySGlkZGVuKSAkZm9vdGVyLnNob3coKVxyXG4gICAgICAgIGlmKGlkKXtcclxuICAgICAgICAgICAgdHJhbnNmb3JtRm9vdGVyKCdiYWNrJylcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGlkKVxyXG4gICAgICAgICAgICAkYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYm94SGFuZGxlcilcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gc2hvd0NvbnRyb2xzKCkge1xyXG4gICAgdHJhbnNmb3JtRm9vdGVyKCd0b0NvbnRyb2xzJylcclxuICAgICRmb290ZXIuc2hvdygpXHJcbn1cclxuZnVuY3Rpb24gaGlkZUNvbnRyb2xzKCkge1xyXG4gICAgJGZvb3Rlci5oaWRlKClcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICB0cmFuc2Zvcm1Gb290ZXIoJ2JhY2snKVxyXG4gICAgfSwgd2luZG93LnZpZXdlclN0YXRlLmR1cmF0aW9uKVxyXG59XHJcbmZ1bmN0aW9uIHRyYW5zZm9ybUZvb3Rlcih3aGVyZSkge1xyXG4gICAgaWYod2hlcmUgPT09ICd0b0NvbnRyb2xzJyl7XHJcbiAgICAgICAgJGZvb3Rlci5vYmplY3Quc3R5bGUud2lkdGggPSAnMTllbSdcclxuICAgICAgICAkZm9vdGVyLm9iamVjdC5zdHlsZS5sZWZ0ID0gKHdpbmRvdy5pbm5lcldpZHRoIC0gJGZvb3Rlci5vYmplY3Qub2Zmc2V0V2lkdGgpLzIgKyAncHgnXHJcbiAgICAgICAgJGZvb3Rlci5vYmplY3Quc3R5bGUuYm9yZGVyUmFkaXVzID0gJzJlbSdcclxuICAgICAgICAkZm9vdGVyX19jZW50ZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgfSBlbHNlIGlmKHdoZXJlID09PSAnYmFjaycpe1xyXG4gICAgICAgICRmb290ZXIub2JqZWN0LnN0eWxlLndpZHRoID0gJydcclxuICAgICAgICAkZm9vdGVyLm9iamVjdC5zdHlsZS5sZWZ0ID0gJydcclxuICAgICAgICAkZm9vdGVyLm9iamVjdC5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnJ1xyXG4gICAgICAgICRmb290ZXJfX2NlbnRlci5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgIH1cclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgd2luZG93LnZpZXdlclN0YXRlID0ge1xyXG4gICAgJyRib3gnOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm94JyksXHJcbiAgICAnJHZpZGVvJzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZpZGVvJyksXHJcbiAgICAnJHNvdXJjZSc6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zb3VyY2UnKSxcclxuICAgICckc2lkZU1lbnVCb3gnOiB7XHJcbiAgICAgICAgJ29iamVjdCc6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJyksXHJcbiAgICAgICAgJ2hpZGUnOiBudWxsLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGZ1bmN0aW9uIC0+IHZvaWRcclxuICAgICAgICAnc2hvdyc6IG51bGwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgZnVuY3Rpb24gLT4gdm9pZFxyXG4gICAgfSxcclxuICAgICckc2xpZGVyJzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXJfX3NsaWRlcicpLFxyXG4gICAgJyRmb290ZXInOiB7XHJcbiAgICAgICAgJ29iamVjdCc6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXInKSxcclxuICAgICAgICAnaGlkZSc6IG51bGwsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgZnVuY3Rpb24gLT4gdm9pZFxyXG4gICAgICAgICdzaG93JzogbnVsbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBmdW5jdGlvbiAtPiB2b2lkXHJcbiAgICB9LFxyXG4gICAgJyRidG5IZWxwJzogICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX2xlZnRfX2hlbHAnKSxcclxuICAgICckYnRuUGxheSc6ICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19sZWZ0X19wbGF5JyksXHJcbiAgICAnJGJ0blZvbHVtZSc6ICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fbGVmdF9fdm9sdW1lJyksXHJcbiAgICAnJGJ0blF1YWxpdHknOiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fbGVmdF9fcXVhbGl0eScpLFxyXG4gICAgJyRidG5TY2FsZSc6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX3JpZ2h0X19zY2FsZScpLFxyXG4gICAgJyRidG5BbGlnbic6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX3JpZ2h0X19hbGlnbicpLFxyXG4gICAgJyRidG5NZW51T2ZmJzogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX3JpZ2h0X19tZW51LW9mZicpLFxyXG4gICAgJyRidG5GdWxsU2NyJzogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX3JpZ2h0X19mdWxsc2NyJyksXHJcbiAgICAnYWN0aXZlJGlucHV0JzogbnVsbCxcclxuICAgICdoaWdoUXVhbGl0eSc6IGZhbHNlLFxyXG4gICAgJ2FsaWduVmVydGljYWwnOiBmYWxzZSxcclxuICAgICdpcyRzaWRlTWVudUJveEhpZGRlbic6IGZhbHNlLFxyXG4gICAgJ2lzJGZvb3RlckhpZGRlbic6IGZhbHNlLFxyXG4gICAgJ2R1cmF0aW9uJzogNTAwXHJcbiAgfTtcclxuXHJcbiAgICB3aW5kb3cudmlld2VyU3RhdGUuaXNWaWRlb1dvcmtpbmcgPSByZXF1aXJlKCcuL2Fza1ZpZGVvV29ya2luZy5qcycpICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgYm9vbGVhblxyXG4gICAgd2luZG93LnZpZXdlclN0YXRlLmlzRnVsbFNjcmVlbkFsbG93ZWQgPSByZXF1aXJlKCcuL2Fza0Z1bGxTY3JlZW4uanMnKSAgICAgICAgICAgICAgICAgICAgICAgLy8gIGJvb2xlYW5cclxuICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZSA9IHJlcXVpcmUoJy4vYXNrX2lQYWRfaVBob25lLmpzJykgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBib29sZWFuXHJcbiAgICB3aW5kb3cudmlld2VyU3RhdGUuaXNfaVBhZF9pUGhvbmVfaW5GdWxsU2NyZWVuID0gcmVxdWlyZSgnLi9hc2tfaVBhZF9pUGhvbmVfRnVsbFNjcmVlbi5qcycpICAvLyAgYm9vbGVhblxyXG4gICAgd2luZG93LnZpZXdlclN0YXRlLmFzayRib3hJbkZ1bGxTY3JlZW4gPSByZXF1aXJlKCcuL2FzayRib3hJbkZ1bGxTY3JlZW4uanMnKSAgICAgICAgICAgICAgICAgLy8gIGZ1bmN0aW9uIC0+IGJvb2xlYW5cclxuICBcclxuICAgIC8vICBTZXQgaGlkZSgpIGFuZCBzaG93KCkgbWV0aG9kcyBmb3IgJHNpZGVNZW51Qm94IGFuZCAkZm9vdGVyXHJcbiAgICAvLyAgYmFzaW5nIG9uIHJlcXVlc3RBbmltYXRpb25GcmFtZSBvciBzZXRJbnRlcnZhbFxyXG4gIGlmKHJlcXVpcmUoJy4vYXNrQW5pbWF0aW9uRnJhbWVBbGxvd2VkLmpzJykpIHtcclxuICAgIHJlcXVpcmUoJy4vc2V0TWVudUFuZEZvb3Rlck1ldGhvZHNXaXRoRnJhbWUuanMnKVxyXG4gIH0gZWxzZSB7XHJcbiAgICByZXF1aXJlKCcuL3NldE1lbnVBbmRGb290ZXJNZXRob2RzV2l0aEludGVydmFsLmpzJylcclxuICB9XHJcblxyXG4gIHJlcXVpcmUoJy4vY2hhbm5lbFNlbGVjdG9yLmpzJylcclxuICByZXF1aXJlKCcuL3F1YWxpdHlTZWxlY3Rvci5qcycpXHJcbiAgcmVxdWlyZSgnLi9hbGlnblNlbGVjdG9yLmpzJylcclxuICByZXF1aXJlKCcuL2hpZGVTaG93TWVudS5qcycpXHJcbiAgcmVxdWlyZSgnLi9mdWxsc2NyZWVuLmpzJylcclxuICByZXF1aXJlKCcuL3ZpZGVvRXJyb3JMaXN0ZW5lcicpXHJcbiAgcmVxdWlyZSgnLi9idXR0b25IZWxwLmpzJylcclxuXHJcbn0iLCIndXNlIHN0cmljdCdcclxuXHJcbnZhciAkYnRuID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5RdWFsaXR5XHJcbnZhciAkc2lnbkhRID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW3RpdGxlID0gaGlnaHRfcXVhbGl0eV0nKVxyXG52YXIgJHNpZ25MUSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1t0aXRsZSA9IGxvd19xdWFsaXR5XScpXHJcblxyXG5pZiAoJHNpZ25MUS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgd2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5ID0gZmFsc2VcclxufSBlbHNlIGlmICgkc2lnbkhRLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICB3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkgPSB0cnVlXHJcbn0gZWxzZSB7XHJcbiAgJHNpZ25MUS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSA9IGZhbHNlXHJcbn1cclxuXHJcbiRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVRdWFsaXR5KVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlUXVhbGl0eSAoZXZlbnQpIHtcclxuICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gIHZhciBsaW5rID0gdW5kZWZpbmVkXHJcbiAgaWYgKHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSkge1xyXG4gICAgJHNpZ25IUS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgJHNpZ25MUS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxyXG4gICAgd2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5ID0gZmFsc2VcclxuICAgIGlmICh3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0KSB7XHJcbiAgICAgIGxpbmsgPSB3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0LmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWxxJylcclxuICAgICAgd2luZG93LnZpZXdlclN0YXRlLiR2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kc291cmNlLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgd2luZG93LnZpZXdlclN0YXRlLiR2aWRlby5wbGF5KClcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgJHNpZ25MUS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgJHNpZ25IUS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxyXG4gICAgd2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5ID0gdHJ1ZVxyXG4gICAgaWYgKHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQpIHtcclxuICAgICAgbGluayA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmstaHEnKVxyXG4gICAgICB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgd2luZG93LnZpZXdlclN0YXRlLiRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvLnBsYXkoKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbnZhciAkc2lkZU1lbnVCb3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJHNpZGVNZW51Qm94XHJcbnZhciAkZm9vdGVyID0gd2luZG93LnZpZXdlclN0YXRlLiRmb290ZXJcclxudmFyIGR1cmF0aW9uID0gd2luZG93LnZpZXdlclN0YXRlLmR1cmF0aW9uXHJcblxyXG53aW5kb3cudmlld2VyU3RhdGUuJHNpZGVNZW51Qm94LmhpZGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGlkZSlcclxuICAgIGZ1bmN0aW9uIGhpZGUodGltZVN0YW1wKSB7XHJcbiAgICAgICAgaWYgKCFzdGFydFRpbWUpIHN0YXJ0VGltZSA9IHRpbWVTdGFtcFxyXG4gICAgICAgIHZhciBwcm9ncmVzcyA9ICh0aW1lU3RhbXAgLSBzdGFydFRpbWUpIC8gZHVyYXRpb25cclxuICAgICAgICBpZiAocHJvZ3Jlc3MgPD0gMSkge1xyXG4gICAgICAgICAgICAkc2lkZU1lbnVCb3gub2JqZWN0LnN0eWxlLm9wYWNpdHkgPSAxIC0gcHJvZ3Jlc3NcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhpZGUpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJHNpZGVNZW51Qm94Lm9iamVjdC5zdHlsZS5vcGFjaXR5ID0gMFxyXG4gICAgICAgICAgICAkc2lkZU1lbnVCb3gub2JqZWN0LnN0eWxlLnJpZ2h0ID0gJy01ZW0nXHJcbiAgICAgICAgICAgIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaXMkc2lkZU1lbnVCb3hIaWRkZW4gPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG53aW5kb3cudmlld2VyU3RhdGUuJHNpZGVNZW51Qm94LnNob3cgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAkc2lkZU1lbnVCb3gub2JqZWN0LnN0eWxlLnJpZ2h0ID0gJydcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShzaG93KVxyXG4gICAgZnVuY3Rpb24gc2hvdyh0aW1lU3RhbXApIHtcclxuICAgICAgICBpZiAoIXN0YXJ0VGltZSkgc3RhcnRUaW1lID0gdGltZVN0YW1wXHJcbiAgICAgICAgdmFyIHByb2dyZXNzID0gKHRpbWVTdGFtcCAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvblxyXG4gICAgICAgIGlmIChwcm9ncmVzcyA8PSAxKSB7XHJcbiAgICAgICAgICAgICRzaWRlTWVudUJveC5vYmplY3Quc3R5bGUub3BhY2l0eSA9IHByb2dyZXNzXHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShzaG93KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRzaWRlTWVudUJveC5vYmplY3Quc3R5bGUub3BhY2l0eSA9IDFcclxuICAgICAgICAgICAgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5pcyRzaWRlTWVudUJveEhpZGRlbiA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG53aW5kb3cudmlld2VyU3RhdGUuJGZvb3Rlci5oaWRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhpZGUpXHJcbiAgICBmdW5jdGlvbiBoaWRlKHRpbWVTdGFtcCkge1xyXG4gICAgICAgIGlmICghc3RhcnRUaW1lKSBzdGFydFRpbWUgPSB0aW1lU3RhbXBcclxuICAgICAgICB2YXIgcHJvZ3Jlc3MgPSAodGltZVN0YW1wIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uXHJcbiAgICAgICAgaWYgKHByb2dyZXNzIDw9IDEpIHtcclxuICAgICAgICAgICAgJGZvb3Rlci5vYmplY3Quc3R5bGUub3BhY2l0eSA9IDEgLSBwcm9ncmVzc1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGlkZSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkZm9vdGVyLm9iamVjdC5zdHlsZS5vcGFjaXR5ID0gMFxyXG4gICAgICAgICAgICAkZm9vdGVyLm9iamVjdC5zdHlsZS5ib3R0b20gPSAnLTEwJSdcclxuICAgICAgICAgICAgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5pcyRmb290ZXJIaWRkZW4gPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG53aW5kb3cudmlld2VyU3RhdGUuJGZvb3Rlci5zaG93ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgJGZvb3Rlci5vYmplY3Quc3R5bGUuYm90dG9tID0gJydcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShzaG93KVxyXG4gICAgZnVuY3Rpb24gc2hvdyh0aW1lU3RhbXApIHtcclxuICAgICAgICBpZiAoIXN0YXJ0VGltZSkgc3RhcnRUaW1lID0gdGltZVN0YW1wXHJcbiAgICAgICAgdmFyIHByb2dyZXNzID0gKHRpbWVTdGFtcCAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvblxyXG4gICAgICAgIGlmIChwcm9ncmVzcyA8PSAxKSB7XHJcbiAgICAgICAgICAgICRmb290ZXIub2JqZWN0LnN0eWxlLm9wYWNpdHkgPSBwcm9ncmVzc1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2hvdylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkZm9vdGVyLm9iamVjdC5zdHlsZS5vcGFjaXR5ID0gMVxyXG4gICAgICAgICAgICBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmlzJGZvb3RlckhpZGRlbiA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyICRzaWRlTWVudUJveCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc2lkZU1lbnVCb3hcclxudmFyICRmb290ZXIgPSB3aW5kb3cudmlld2VyU3RhdGUuJGZvb3RlclxyXG52YXIgZHVyYXRpb24gPSB3aW5kb3cudmlld2VyU3RhdGUuZHVyYXRpb25cclxuXHJcbndpbmRvdy52aWV3ZXJTdGF0ZS4kc2lkZU1lbnVCb3guaGlkZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgIHZhciBpZCA9IHNldEludGVydmFsKGhpZGUsIDQwKVxyXG4gICAgZnVuY3Rpb24gaGlkZSgpIHtcclxuICAgICAgICBpZiAoIXN0YXJ0VGltZSkgc3RhcnRUaW1lID0gRGF0ZS5ub3coKVxyXG4gICAgICAgIHZhciBwcm9ncmVzcyA9IChEYXRlLm5vdygpIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uXHJcbiAgICAgICAgaWYgKHByb2dyZXNzIDw9IDEpIHtcclxuICAgICAgICAgICAgJHNpZGVNZW51Qm94Lm9iamVjdC5zdHlsZS5vcGFjaXR5ID0gMSAtIHByb2dyZXNzXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpZClcclxuICAgICAgICAgICAgJHNpZGVNZW51Qm94Lm9iamVjdC5zdHlsZS5vcGFjaXR5ID0gMFxyXG4gICAgICAgICAgICAkc2lkZU1lbnVCb3gub2JqZWN0LnN0eWxlLnJpZ2h0ID0gJy01ZW0nXHJcbiAgICAgICAgICAgIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaXMkc2lkZU1lbnVCb3hIaWRkZW4gPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG53aW5kb3cudmlld2VyU3RhdGUuJHNpZGVNZW51Qm94LnNob3cgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAkc2lkZU1lbnVCb3gub2JqZWN0LnN0eWxlLnJpZ2h0ID0gJydcclxuICAgIHZhciBpZCA9IHNldEludGVydmFsKHNob3csIDQwKVxyXG4gICAgZnVuY3Rpb24gc2hvdygpIHtcclxuICAgICAgICBpZiAoIXN0YXJ0VGltZSkgc3RhcnRUaW1lID0gRGF0ZS5ub3coKVxyXG4gICAgICAgIHZhciBwcm9ncmVzcyA9IChEYXRlLm5vdygpIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uXHJcbiAgICAgICAgaWYgKHByb2dyZXNzIDw9IDEpIHtcclxuICAgICAgICAgICAgJHNpZGVNZW51Qm94Lm9iamVjdC5zdHlsZS5vcGFjaXR5ID0gcHJvZ3Jlc3NcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNob3cpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpZClcclxuICAgICAgICAgICAgJHNpZGVNZW51Qm94Lm9iamVjdC5zdHlsZS5vcGFjaXR5ID0gMVxyXG4gICAgICAgICAgICBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmlzJHNpZGVNZW51Qm94SGlkZGVuID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbndpbmRvdy52aWV3ZXJTdGF0ZS4kZm9vdGVyLmhpZGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICB2YXIgaWQgPSBzZXRJbnRlcnZhbChoaWRlLCA0MClcclxuICAgIGZ1bmN0aW9uIGhpZGUoKSB7XHJcbiAgICAgICAgaWYgKCFzdGFydFRpbWUpIHN0YXJ0VGltZSA9IERhdGUubm93KClcclxuICAgICAgICB2YXIgcHJvZ3Jlc3MgPSAoRGF0ZS5ub3coKSAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvblxyXG4gICAgICAgIGlmIChwcm9ncmVzcyA8PSAxKSB7XHJcbiAgICAgICAgICAgICRmb290ZXIub2JqZWN0LnN0eWxlLm9wYWNpdHkgPSAxIC0gcHJvZ3Jlc3NcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhpZGUpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpZClcclxuICAgICAgICAgICAgJGZvb3Rlci5vYmplY3Quc3R5bGUub3BhY2l0eSA9IDBcclxuICAgICAgICAgICAgJGZvb3Rlci5vYmplY3Quc3R5bGUuYm90dG9tID0gJy0xMCUnXHJcbiAgICAgICAgICAgIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaXMkZm9vdGVySGlkZGVuID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxud2luZG93LnZpZXdlclN0YXRlLiRmb290ZXIuc2hvdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgICRmb290ZXIub2JqZWN0LnN0eWxlLmJvdHRvbSA9ICcnXHJcbiAgICB2YXIgaWQgPSBzZXRJbnRlcnZhbChzaG93LCA0MClcclxuICAgIGZ1bmN0aW9uIHNob3coKSB7XHJcbiAgICAgICAgaWYgKCFzdGFydFRpbWUpIHN0YXJ0VGltZSA9IERhdGUubm93KClcclxuICAgICAgICB2YXIgcHJvZ3Jlc3MgPSAoRGF0ZS5ub3coKSAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvblxyXG4gICAgICAgIGlmIChwcm9ncmVzcyA8PSAxKSB7XHJcbiAgICAgICAgICAgICRmb290ZXIub2JqZWN0LnN0eWxlLm9wYWNpdHkgPSBwcm9ncmVzc1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2hvdylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKGlkKVxyXG4gICAgICAgICAgICAkZm9vdGVyLm9iamVjdC5zdHlsZS5vcGFjaXR5ID0gMVxyXG4gICAgICAgICAgICBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmlzJGZvb3RlckhpZGRlbiA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW9cclxuXHJcbiR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZhaWxlZClcclxuXHJcbiBmdW5jdGlvbiBmYWlsZWQoZSkge1xyXG4gICAvLyB2aWRlbyBwbGF5YmFjayBmYWlsZWQgLSBzaG93IGEgbWVzc2FnZSBzYXlpbmcgd2h5ICAgICAtIGZyb20gaHR0cHM6Ly9kZXYudzMub3JnL2h0bWw1L3NwZWMtYXV0aG9yLXZpZXcvdmlkZW8uaHRtbCN2aWRlb1xyXG4gICBzd2l0Y2ggKGUudGFyZ2V0LmVycm9yLmNvZGUpIHtcclxuICAgICBjYXNlIGUudGFyZ2V0LmVycm9yLk1FRElBX0VSUl9BQk9SVEVEOlxyXG4gICAgICAgYWxlcnQoJ1lvdSBhYm9ydGVkIHRoZSB2aWRlbyBwbGF5YmFjay4nKTtcclxuICAgICAgIGJyZWFrO1xyXG4gICAgIGNhc2UgZS50YXJnZXQuZXJyb3IuTUVESUFfRVJSX05FVFdPUks6XHJcbiAgICAgICBhbGVydCgnQSBuZXR3b3JrIGVycm9yIGNhdXNlZCB0aGUgdmlkZW8gZG93bmxvYWQgdG8gZmFpbCBwYXJ0LXdheS4nKTtcclxuICAgICAgIGJyZWFrO1xyXG4gICAgIGNhc2UgZS50YXJnZXQuZXJyb3IuTUVESUFfRVJSX0RFQ09ERTpcclxuICAgICAgIGFsZXJ0KCdUaGUgdmlkZW8gcGxheWJhY2sgd2FzIGFib3J0ZWQgZHVlIHRvIGEgY29ycnVwdGlvbiBwcm9ibGVtIG9yIGJlY2F1c2UgdGhlIHZpZGVvIHVzZWQgZmVhdHVyZXMgeW91ciBicm93c2VyIGRpZCBub3Qgc3VwcG9ydC4nKTtcclxuICAgICAgIGJyZWFrO1xyXG4gICAgIGNhc2UgZS50YXJnZXQuZXJyb3IuTUVESUFfRVJSX1NSQ19OT1RfU1VQUE9SVEVEOlxyXG4gICAgICAgYWxlcnQoJ1RoZSB2aWRlbyBjb3VsZCBub3QgYmUgbG9hZGVkLCBlaXRoZXIgYmVjYXVzZSB0aGUgc2VydmVyIG9yIG5ldHdvcmsgZmFpbGVkIG9yIGJlY2F1c2UgdGhlIGZvcm1hdCBpcyBub3Qgc3VwcG9ydGVkLicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgICAgZGVmYXVsdDpcclxuICAgICAgIGFsZXJ0KCdBbiB1bmtub3duIGVycm9yIG9jY3VycmVkLicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgIH1cclxuIH1cclxuIl19
