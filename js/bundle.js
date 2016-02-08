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
var id = undefined

//                                     <-- States | Actions -->
//  If -->     $btnMenuOff   $footer   FullScreen |  EventSource   EventType/state   EventAction      Handler                Additionaly                                Completed
//          1.    shown       shown        any    |  $btnMenuOff     click/none      hide both        $btnHadler                                                            ok
//          2.    hidden      hidden       off    |  $box            click/none      show both        $boxHandler                                                           ok
//          3.    hidden      hidden       on     |  $box            click/none      show $footer     $boxHandler            show $footer for 5sec                          
//                                                |                                                                          click any footer button
//                                                |                                                                          resets 5sec countdown from beginning           
//          5.    hidden      shown        on     |  $box            click/none      hide $footer     $boxHandler            
//          6.    shown       shown        off    |  $btnMenuOff     click/none      hide both        $btnHadler             
//          7.    hidden      hidden       off    |  FullScreen      event/on        show both        fullScreenHandler      
//          8.    shown       shown        on     |  FullScreen      event/off       hide both        fullScreenHandler      
//          9.    hidden      hidden       on     |  FullScreen      event/off       show both        fullScreenHandler      
//         10.    shown       shown        off    |  FullScreen      event/on        hide both        fullScreenHandler      

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
    } else {
        if(window.viewerState.is$sideMenuBoxHidden) $sideMenuBox.show()
        if(window.viewerState.is$footerHidden) $footer.show()
        if(id){
            transformControlsToFooter()
            clearTimeout(id)
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
        } , 5000)
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
            } , 5000)
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
    //  basing on requestAnimationFrame or setInterval()
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

}
},{"./alignSelector.js":1,"./ask$boxInFullScreen.js":2,"./askAnimationFrameAllowed.js":3,"./askFullScreen.js":4,"./askVideoWorking.js":5,"./ask_iPad_iPhone.js":6,"./ask_iPad_iPhone_FullScreen.js":7,"./channelSelector.js":8,"./fullscreen.js":9,"./hideShowMenu.js":10,"./qualitySelector.js":12,"./setMenuAndFooterMethodsWithFrame.js":13,"./setMenuAndFooterMethodsWithInterval.js":14,"./videoErrorListener":15}],12:[function(require,module,exports){
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
       alert('The video could not be loaded, either because the server or network failed or because the format is not supported.');
       break;
     default:
       alert('An unknown error occurred.');
       break;
   }
 }

},{}]},{},[11])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2EwNS9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hbGlnblNlbGVjdG9yLmpzIiwianMvYXNrJGJveEluRnVsbFNjcmVlbi5qcyIsImpzL2Fza0FuaW1hdGlvbkZyYW1lQWxsb3dlZC5qcyIsImpzL2Fza0Z1bGxTY3JlZW4uanMiLCJqcy9hc2tWaWRlb1dvcmtpbmcuanMiLCJqcy9hc2tfaVBhZF9pUGhvbmUuanMiLCJqcy9hc2tfaVBhZF9pUGhvbmVfRnVsbFNjcmVlbi5qcyIsImpzL2NoYW5uZWxTZWxlY3Rvci5qcyIsImpzL2Z1bGxzY3JlZW4uanMiLCJqcy9oaWRlU2hvd01lbnUuanMiLCJqcy9tYWluLmpzIiwianMvcXVhbGl0eVNlbGVjdG9yLmpzIiwianMvc2V0TWVudUFuZEZvb3Rlck1ldGhvZHNXaXRoRnJhbWUuanMiLCJqcy9zZXRNZW51QW5kRm9vdGVyTWV0aG9kc1dpdGhJbnRlcnZhbC5qcyIsImpzL3ZpZGVvRXJyb3JMaXN0ZW5lci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNaQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNUQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM5R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2REE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCJcclxuXHJcbnZhciAkYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb290ZXJfX3JpZ2h0X19hbGlnblwiKVxyXG52YXIgJHZpZGVvID0gd2luZG93LnZpZXdlclN0YXRlLiR2aWRlbyBcclxuXHJcbmlmKCRidG4uY2xhc3NMaXN0LmNvbnRhaW5zKFwidmVydGljYWxcIikpIHtcclxuICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5hbGlnblZlcnRpY2FsID0gdHJ1ZTtcclxufSBlbHNlIGlmKCRidG4uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaG9yaXNvbnRhbFwiKSkge1xyXG4gICAgd2luZG93LnZpZXdlclN0YXRlLmFsaWduVmVydGljYWwgPSBmYWxzZTtcclxufSBlbHNlIHtcclxuICAgICRidG4uY2xhc3NMaXN0LmFkZChcInZlcnRpY2FsXCIpXHJcbiAgICB3aW5kb3cudmlld2VyU3RhdGUuYWxpZ25WZXJ0aWNhbCA9IHRydWU7XHJcbn1cclxuZml0KClcclxuXHJcbiRidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZUFsaWduKVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlQWxpZ24oZXZlbnQpIHtcclxuICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5hbGlnblZlcnRpY2FsKSB7XHJcbiAgICAgICAgJGJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwidmVydGljYWxcIilcclxuICAgICAgICAkYnRuLmNsYXNzTGlzdC5hZGQoXCJob3Jpc29udGFsXCIpXHJcbiAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmFsaWduVmVydGljYWwgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJGJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaG9yaXNvbnRhbFwiKVxyXG4gICAgICAgICRidG4uY2xhc3NMaXN0LmFkZChcInZlcnRpY2FsXCIpXHJcbiAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmFsaWduVmVydGljYWwgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgZml0KClcclxufVxyXG5cclxuZnVuY3Rpb24gZml0KCkge1xyXG4gICAgaWYoJGJ0bi5jbGFzc0xpc3QuY29udGFpbnMoXCJ2ZXJ0aWNhbFwiKSkge1xyXG4gICAgICAgICR2aWRlby5zdHlsZS53aWR0aCA9ICcxMDAlJ1xyXG4gICAgICAgICR2aWRlby5zdHlsZS5oZWlnaHQgPSAnMTAwJSdcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJHZpZGVvLnN0eWxlLndpZHRoID0gJzEwMCUnXHJcbiAgICAgICAgJHZpZGVvLnN0eWxlLmhlaWdodCA9ICdhdXRvJ1xyXG4gICAgfVxyXG59IiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKGRvY3VtZW50LmZ1bGxzY3JlZW5FbGVtZW50IHx8IFxyXG4gICAgICAgIGRvY3VtZW50LndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50IHx8XHJcbiAgICAgICAgZG9jdW1lbnQubW96RnVsbFNjcmVlbkVsZW1lbnQgfHxcclxuICAgICAgICBkb2N1bWVudC5tc0Z1bGxzY3JlZW5FbGVtZW50IHx8XHJcbiAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmlzX2lQYWRfaVBob25lX2luRnVsbFNjcmVlbiApIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSBlbHNlIHJldHVybiBmYWxzZVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIGFsbG93ZWRcclxuICAgIGlmKHR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgYWxsb3dlZCA9IHRydWVcclxuICAgICAgICBjb25zb2xlLmxvZygncmVxdWVzdEFuaW1hdGlvbkZyYW1lIG9rJylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxsb3dlZCA9IGZhbHNlXHJcbiAgICAgICAgY29uc29sZS5sb2coJ25vIHJlcXVlc3RBbmltYXRpb25GcmFtZScpXHJcbiAgICB9XHJcbiAgICByZXR1cm4gYWxsb3dlZFxyXG59KSgpXHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyICRib3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJGJveFxyXG4gICAgdmFyIGFsbG93ZWQgPSBmYWxzZVxyXG4gICAgaWYgKCRib3gucmVxdWVzdEZ1bGxzY3JlZW4gfHxcclxuICAgICAgICAkYm94Lm1velJlcXVlc3RGdWxsU2NyZWVuIHx8XHJcbiAgICAgICAgJGJveC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbiB8fFxyXG4gICAgICAgICRib3gubXNSZXF1ZXN0RnVsbHNjcmVlblxyXG4gICAgICAgICkge1xyXG4gICAgICAgIGFsbG93ZWQgPSB0cnVlIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdGdWxsU2NyZWVuIG9rJylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgYWxsb3dlZCA9IGZhbHNlIFxyXG4gICAgICAgIGNvbnNvbGUubG9nKCdObyBmdWxsc2NyZWVuJylcclxuICAgIH1cclxuICAgIHJldHVybiBhbGxvd2VkXHJcbn0pKClcclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBpZih0eXBlb2Ygd2luZG93LnZpZXdlclN0YXRlLiR2aWRlby5wbGF5ID09PSAnZnVuY3Rpb24nICkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd2aWRlbyBvayBuZWVkcyB0byBiZSBjb25maXJtZWQnKVxyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdubyB2aWRlbycpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbn0pKClcclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBpZih3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdpUGFkJykgIT09IC0xICYmXHJcbiAgICAgICAgd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignU2FmYXJpJykgIT09IC0xIClcclxuICAgICAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSBpZih3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdpUGhvbmUnKSAhPT0gLTEgJiZcclxuICAgICAgICB3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudC5pbmRleE9mKCdTYWZhcmknKSAhPT0gLTEgKSBcclxuICAgICAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSByZXR1cm4gZmFsc2VcclxufSkoKSIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICBpZih3aW5kb3cudmlld2VyU3RhdGUuaXNfaVBhZF9pUGhvbmUgJiZcclxuICAgICAgICB3aW5kb3cuaW5uZXJIZWlnaHQgPj0gd2luZG93LnNjcmVlbi5hdmFpbEhlaWdodCkgXHJcbiAgICAgICAge1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9IGVsc2UgcmV0dXJuIGZhbHNlXHJcbn0pKClcclxuIiwiXCJ1c2Ugc3RyaWN0XCJcclxuXHJcbnZhciAkdmlkZW8gPSB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvXHJcbnZhciAkc291cmNlID0gd2luZG93LnZpZXdlclN0YXRlLiRzb3VyY2VcclxudmFyICRzbGlkZXIgPSB3aW5kb3cudmlld2VyU3RhdGUuJHNsaWRlclxyXG52YXIgYWN0aXZlJGlucHV0ID0gd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dFxyXG52YXIgJGJ0bk1lbnVPbk9mID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fcmlnaHRfX21lbnUtb2ZmJylcclxudmFyICRidG5BbGlnbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX3JpZ2h0X19hbGlnbicpXHJcbnZhciBsaW5rID0gJydcclxudmFyICRidG5zID0ge1xyXG4gICAgXCJjaF8xZ29yb2Rza295XCI6ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoXzFnb3JvZHNrb3lcIiksXHJcbiAgICBcImNoXzN0c3lmcm92b3lcIjogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfM3RzeWZyb3ZveVwiKSxcclxuICAgIFwiY2hfcmVwb3J0ZXJcIjogICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9yZXBvcnRlclwiKSxcclxuICAgIFwiY2hfYWNhZGVtaWFcIjogICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9hY2FkZW1pYVwiKSxcclxuICAgIFwiY2hfYTFcIjogICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9hMVwiKSxcclxuICAgIFwiY2hfZHVtc2theWFcIjogICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9kdW1za2F5YVwiKSxcclxuICAgIFwiY2hfZ3R2XCI6ICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9ndHZcIiksXHJcbiAgICBcImNoX3N0dlwiOiAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfc3R2XCIpLFxyXG4gICAgXCJjaF91Z25heWF2b2xuYVwiOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX3VnbmF5YXZvbG5hXCIpLFxyXG4gICAgXCJjaF9uZW1vXCI6ICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX25lbW9cIilcclxufVxyXG4kYnRucy5jaF8xZ29yb2Rza295LnNldEF0dHJpYnV0ZSggICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvMXR2b2QvMXR2b2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICApXHJcbiRidG5zLmNoXzN0c3lmcm92b3kuc2V0QXR0cmlidXRlKCAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovL2NkbjUubGl2ZS10di5vZC51YTo4MDgxL3R2LzN0dm9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgIClcclxuJGJ0bnMuY2hfcmVwb3J0ZXIuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vY2RuNC5saXZlLXR2Lm9kLnVhOjgwODEvdHYvMzFjaG9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgKVxyXG4kYnRucy5jaF9hY2FkZW1pYS5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly9jZG40LmxpdmUtdHYub2QudWE6ODA4MS90di8zNmNob2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiApXHJcbiRidG5zLmNoX2ExLnNldEF0dHJpYnV0ZSggICAgICAgICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9hMW9kL2Exb2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICAgIClcclxuJGJ0bnMuY2hfZHVtc2theWEuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzODo4MDgxL2R1bXNrYS9kdW1za2EtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgKVxyXG4kYnRucy5jaF9ndHYuc2V0QXR0cmlidXRlKCAgICAgICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvYTFvZC9ndHZvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiICAgICApXHJcbiRidG5zLmNoX3N0di5zZXRBdHRyaWJ1dGUoICAgICAgICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9zdHZvZC9zdHZvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiICAgIClcclxuJGJ0bnMuY2hfdWduYXlhdm9sbmEuc2V0QXR0cmlidXRlKCAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL3dhdmUvd2F2ZS1hYnItbHEvcGxheWxpc3QubTN1OFwiICAgICAgKVxyXG4kYnRucy5jaF9uZW1vLnNldEF0dHJpYnV0ZSggICAgICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvbmVtby9tb3Itc3ViL3BsYXlsaXN0Lm0zdThcIiAgICAgICAgICApXHJcblxyXG4kYnRucy5jaF8xZ29yb2Rza295LnNldEF0dHJpYnV0ZSggICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvMXR2b2QvMXR2b2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICApXHJcbiRidG5zLmNoXzN0c3lmcm92b3kuc2V0QXR0cmlidXRlKCAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovL2NkbjUubGl2ZS10di5vZC51YTo4MDgxL3R2LzN0dm9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgIClcclxuJGJ0bnMuY2hfcmVwb3J0ZXIuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vY2RuNC5saXZlLXR2Lm9kLnVhOjgwODEvdHYvMzFjaG9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgKVxyXG4kYnRucy5jaF9hY2FkZW1pYS5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly9jZG40LmxpdmUtdHYub2QudWE6ODA4MS90di8zNmNob2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICApXHJcbiRidG5zLmNoX2ExLnNldEF0dHJpYnV0ZSggICAgICAgICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9hMW9kL2Exb2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICAgIClcclxuJGJ0bnMuY2hfZHVtc2theWEuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzODo4MDgxL2R1bXNrYS9kdW1za2EtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgKVxyXG4kYnRucy5jaF9ndHYuc2V0QXR0cmlidXRlKCAgICAgICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvYTFvZC9ndHZvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgICApXHJcbiRidG5zLmNoX3N0di5zZXRBdHRyaWJ1dGUoICAgICAgICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9zdHZvZC9zdHZvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgIClcclxuJGJ0bnMuY2hfdWduYXlhdm9sbmEuc2V0QXR0cmlidXRlKCAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL3dhdmUvd2F2ZS1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgICAgKVxyXG4kYnRucy5jaF9uZW1vLnNldEF0dHJpYnV0ZSggICAgICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvbmVtby9tb3ItYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICAgICApXHJcblxyXG4kc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICBpZihlLnRhcmdldC50YWdOYW1lID09PSAnSU5QVVQnKXtcclxuICAgICAgICBpZihhY3RpdmUkaW5wdXQgPT09IGUudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIGFjdGl2ZSRpbnB1dC5jaGVja2VkID0gZmFsc2VcclxuICAgICAgICAgICAgYWN0aXZlJGlucHV0ID0gbnVsbFxyXG4gICAgICAgICAgICAkdmlkZW8uc3R5bGUuYmFja2dyb3VuZFNpemUgPSBcIlwiXHJcbiAgICAgICAgICAgICR2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsICcnKVxyXG4gICAgICAgICAgICAkc291cmNlLnNldEF0dHJpYnV0ZSgnc3JjJywgJycpXHJcbiAgICAgICAgICAgICRidG5NZW51T25PZi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgICAgICRidG5BbGlnbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWN0aXZlJGlucHV0ID0gZS50YXJnZXRcclxuICAgICAgICAgICAgaWYod2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5KSAgbGluayA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWhxJylcclxuICAgICAgICAgICAgZWxzZSBsaW5rID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmstbHEnKVxyXG4gICAgICAgICAgICAkdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICAgICAgICAkc291cmNlLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgICAgICAgJHZpZGVvLnN0eWxlLmJhY2tncm91bmRTaXplID0gXCIwIDBcIlxyXG4gICAgICAgICAgICBpZigkdmlkZW8ucGxheSkgJHZpZGVvLnBsYXkoKTtcclxuICAgICAgICAgICAgZWxzZSBhbGVydCAoJ3ZpZGVvIGNhbm5vdCBwbGF5JylcclxuICAgICAgICAgICAgJGJ0bk1lbnVPbk9mLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJ1xyXG4gICAgICAgICAgICAkYnRuQWxpZ24uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KVxyXG4iLCIndXNlIHN0cmljdCdcblxudmFyICRidG5GdWxsU2NyID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5GdWxsU2NyXG52YXIgJGJveCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYm94XG5cbmlmICggd2luZG93LnZpZXdlclN0YXRlLmlzRnVsbFNjcmVlbkFsbG93ZWQgKSB7XG4gICRidG5GdWxsU2NyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgICAgaWYod2luZG93LnZpZXdlclN0YXRlLmFzayRib3hJbkZ1bGxTY3JlZW4oKSkgZ2V0T2ZmRnVsbHNjcmVlbigpXG4gICAgICBlbHNlIGdvRnVsbFNjcmVlbigpXG4gIH0pXG59XG5cbmZ1bmN0aW9uIGdvRnVsbFNjcmVlbigpIHtcbiAgICBpZiAoJGJveC5yZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAkYm94LnJlcXVlc3RGdWxsc2NyZWVuKClcbiAgICB9IGVsc2UgaWYgKCRib3gubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgJGJveC5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpXG4gICAgfSBlbHNlIGlmICgkYm94LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICRib3gud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgIH0gZWxzZSBpZiAoJGJveC5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICRib3gubXNSZXF1ZXN0RnVsbHNjcmVlbigpXG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0T2ZmRnVsbHNjcmVlbigpIHtcbiAgaWYoZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4pIHtcbiAgICBkb2N1bWVudC5leGl0RnVsbHNjcmVlbigpO1xuICB9IGVsc2UgaWYoZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgIGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcbiAgfSBlbHNlIGlmKGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKSB7XG4gICAgZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcbiAgfWVsc2UgaWYgKGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4pIHtcblx0ZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbigpO1xuICB9XG59XG4iLCIndXNlIHN0cmljdCdcclxuXHJcbnZhciAkYm94ID0gd2luZG93LnZpZXdlclN0YXRlLiRib3hcclxudmFyICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW9cclxudmFyICRzaWRlTWVudUJveCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc2lkZU1lbnVCb3hcclxudmFyICRmb290ZXIgPSB3aW5kb3cudmlld2VyU3RhdGUuJGZvb3RlclxyXG52YXIgJGZvb3Rlcl9fY2VudGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fY2VudGVyJykgXHJcbnZhciAkYnRuTWVudU9mZiA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuTWVudU9mZlxyXG52YXIgYXNrJGJveEluRnVsbFNjcmVlbiA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5hc2skYm94SW5GdWxsU2NyZWVuXHJcbnZhciBpZCA9IHVuZGVmaW5lZFxyXG5cclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgPC0tIFN0YXRlcyB8IEFjdGlvbnMgLS0+XHJcbi8vICBJZiAtLT4gICAgICRidG5NZW51T2ZmICAgJGZvb3RlciAgIEZ1bGxTY3JlZW4gfCAgRXZlbnRTb3VyY2UgICBFdmVudFR5cGUvc3RhdGUgICBFdmVudEFjdGlvbiAgICAgIEhhbmRsZXIgICAgICAgICAgICAgICAgQWRkaXRpb25hbHkgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIENvbXBsZXRlZFxyXG4vLyAgICAgICAgICAxLiAgICBzaG93biAgICAgICBzaG93biAgICAgICAgYW55ICAgIHwgICRidG5NZW51T2ZmICAgICBjbGljay9ub25lICAgICAgaGlkZSBib3RoICAgICAgICAkYnRuSGFkbGVyICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgb2tcclxuLy8gICAgICAgICAgMi4gICAgaGlkZGVuICAgICAgaGlkZGVuICAgICAgIG9mZiAgICB8ICAkYm94ICAgICAgICAgICAgY2xpY2svbm9uZSAgICAgIHNob3cgYm90aCAgICAgICAgJGJveEhhbmRsZXIgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIG9rXHJcbi8vICAgICAgICAgIDMuICAgIGhpZGRlbiAgICAgIGhpZGRlbiAgICAgICBvbiAgICAgfCAgJGJveCAgICAgICAgICAgIGNsaWNrL25vbmUgICAgICBzaG93ICRmb290ZXIgICAgICRib3hIYW5kbGVyICAgICAgICAgICAgc2hvdyAkZm9vdGVyIGZvciA1c2VjICAgICAgICAgICAgICAgICAgICAgICAgICBcclxuLy8gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB8ICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjbGljayBhbnkgZm9vdGVyIGJ1dHRvblxyXG4vLyAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlc2V0cyA1c2VjIGNvdW50ZG93biBmcm9tIGJlZ2lubmluZyAgICAgICAgICAgXHJcbi8vICAgICAgICAgIDUuICAgIGhpZGRlbiAgICAgIHNob3duICAgICAgICBvbiAgICAgfCAgJGJveCAgICAgICAgICAgIGNsaWNrL25vbmUgICAgICBoaWRlICRmb290ZXIgICAgICRib3hIYW5kbGVyICAgICAgICAgICAgXHJcbi8vICAgICAgICAgIDYuICAgIHNob3duICAgICAgIHNob3duICAgICAgICBvZmYgICAgfCAgJGJ0bk1lbnVPZmYgICAgIGNsaWNrL25vbmUgICAgICBoaWRlIGJvdGggICAgICAgICRidG5IYWRsZXIgICAgICAgICAgICAgXHJcbi8vICAgICAgICAgIDcuICAgIGhpZGRlbiAgICAgIGhpZGRlbiAgICAgICBvZmYgICAgfCAgRnVsbFNjcmVlbiAgICAgIGV2ZW50L29uICAgICAgICBzaG93IGJvdGggICAgICAgIGZ1bGxTY3JlZW5IYW5kbGVyICAgICAgXHJcbi8vICAgICAgICAgIDguICAgIHNob3duICAgICAgIHNob3duICAgICAgICBvbiAgICAgfCAgRnVsbFNjcmVlbiAgICAgIGV2ZW50L29mZiAgICAgICBoaWRlIGJvdGggICAgICAgIGZ1bGxTY3JlZW5IYW5kbGVyICAgICAgXHJcbi8vICAgICAgICAgIDkuICAgIGhpZGRlbiAgICAgIGhpZGRlbiAgICAgICBvbiAgICAgfCAgRnVsbFNjcmVlbiAgICAgIGV2ZW50L29mZiAgICAgICBzaG93IGJvdGggICAgICAgIGZ1bGxTY3JlZW5IYW5kbGVyICAgICAgXHJcbi8vICAgICAgICAgMTAuICAgIHNob3duICAgICAgIHNob3duICAgICAgICBvZmYgICAgfCAgRnVsbFNjcmVlbiAgICAgIGV2ZW50L29uICAgICAgICBoaWRlIGJvdGggICAgICAgIGZ1bGxTY3JlZW5IYW5kbGVyICAgICAgXHJcblxyXG4kYnRuTWVudU9mZi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJ0bkhhbmRsZXIpXHJcbiRmb290ZXIub2JqZWN0LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZm9vdGVySGFuZGxlcilcclxuJGJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJveEhhbmRsZXIpXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Z1bGxzY3JlZW5jaGFuZ2UnLCBmdWxsU2NyZWVuSGFuZGxlcilcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsIGZ1bGxTY3JlZW5IYW5kbGVyKVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3pmdWxsc2NyZWVuY2hhbmdlJywgZnVsbFNjcmVlbkhhbmRsZXIpXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ01TRnVsbHNjcmVlbkNoYW5nZScsIGZ1bGxTY3JlZW5IYW5kbGVyKVxyXG5cclxuZnVuY3Rpb24gYnRuSGFuZGxlcihlKSB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICBpZighd2luZG93LnZpZXdlclN0YXRlLmlzJHNpZGVNZW51Qm94SGlkZGVuICYmICF3aW5kb3cudmlld2VyU3RhdGUuaXMkZm9vdGVySGlkZGVuKSB7XHJcbiAgICAgICAgJHNpZGVNZW51Qm94LmhpZGUoKVxyXG4gICAgICAgICRmb290ZXIuaGlkZSgpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5pcyRzaWRlTWVudUJveEhpZGRlbikgJHNpZGVNZW51Qm94LnNob3coKVxyXG4gICAgICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5pcyRmb290ZXJIaWRkZW4pICRmb290ZXIuc2hvdygpXHJcbiAgICAgICAgaWYoaWQpe1xyXG4gICAgICAgICAgICB0cmFuc2Zvcm1Db250cm9sc1RvRm9vdGVyKClcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGlkKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBmb290ZXJIYW5kbGVyKGUpIHtcclxuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgIGlmKGFzayRib3hJbkZ1bGxTY3JlZW4oKSAmJiBpZCl7XHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KGlkKVxyXG4gICAgICAgIGlkID0gc2V0VGltZW91dCggZnVuY3Rpb24oKXtcclxuICAgICAgICAgICAgaGlkZUNvbnRyb2xzKClcclxuICAgICAgICAgICAgJGJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJveEhhbmRsZXIpXHJcbiAgICAgICAgfSAsIDUwMDApXHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gYm94SGFuZGxlcihlKSB7XHJcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICBpZihhc2skYm94SW5GdWxsU2NyZWVuKCkpIHtcclxuICAgICAgICBpZih0cnVlKSB7XHJcbiAgICAgICAgICAgICRib3gucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBib3hIYW5kbGVyKVxyXG4gICAgICAgICAgICBzaG93Q29udHJvbHMoKVxyXG4gICAgICAgICAgICBpZCA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICBoaWRlQ29udHJvbHMoKVxyXG4gICAgICAgICAgICAgICAgJGJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJveEhhbmRsZXIpXHJcbiAgICAgICAgICAgIH0gLCA1MDAwKVxyXG4gICAgICAgIH1cclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgaWYod2luZG93LnZpZXdlclN0YXRlLmlzJHNpZGVNZW51Qm94SGlkZGVuKSAkc2lkZU1lbnVCb3guc2hvdygpXHJcbiAgICAgICAgaWYod2luZG93LnZpZXdlclN0YXRlLmlzJGZvb3RlckhpZGRlbikgJGZvb3Rlci5zaG93KClcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBmdWxsU2NyZWVuSGFuZGxlcigpIHtcclxuICAgIGlmKGFzayRib3hJbkZ1bGxTY3JlZW4oKSl7XHJcbiAgICAgICAgaWYoIXdpbmRvdy52aWV3ZXJTdGF0ZS5pcyRzaWRlTWVudUJveEhpZGRlbikgJHNpZGVNZW51Qm94LmhpZGUoKVxyXG4gICAgICAgIGlmKCF3aW5kb3cudmlld2VyU3RhdGUuaXMkZm9vdGVySGlkZGVuKSAkZm9vdGVyLmhpZGUoKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBpZih3aW5kb3cudmlld2VyU3RhdGUuaXMkc2lkZU1lbnVCb3hIaWRkZW4pICRzaWRlTWVudUJveC5zaG93KClcclxuICAgICAgICBpZih3aW5kb3cudmlld2VyU3RhdGUuaXMkZm9vdGVySGlkZGVuKSAkZm9vdGVyLnNob3coKVxyXG4gICAgICAgIGlmKGlkKXtcclxuICAgICAgICAgICAgdHJhbnNmb3JtRm9vdGVyKCdiYWNrJylcclxuICAgICAgICAgICAgY2xlYXJUaW1lb3V0KGlkKVxyXG4gICAgICAgICAgICAkYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYm94SGFuZGxlcilcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gc2hvd0NvbnRyb2xzKCkge1xyXG4gICAgdHJhbnNmb3JtRm9vdGVyKCd0b0NvbnRyb2xzJylcclxuICAgICRmb290ZXIuc2hvdygpXHJcbn1cclxuZnVuY3Rpb24gaGlkZUNvbnRyb2xzKCkge1xyXG4gICAgJGZvb3Rlci5oaWRlKClcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24oKXtcclxuICAgICAgICB0cmFuc2Zvcm1Gb290ZXIoJ2JhY2snKVxyXG4gICAgfSwgd2luZG93LnZpZXdlclN0YXRlLmR1cmF0aW9uKVxyXG59XHJcbmZ1bmN0aW9uIHRyYW5zZm9ybUZvb3Rlcih3aGVyZSkge1xyXG4gICAgaWYod2hlcmUgPT09ICd0b0NvbnRyb2xzJyl7XHJcbiAgICAgICAgJGZvb3Rlci5vYmplY3Quc3R5bGUud2lkdGggPSAnMTllbSdcclxuICAgICAgICAkZm9vdGVyLm9iamVjdC5zdHlsZS5sZWZ0ID0gKHdpbmRvdy5pbm5lcldpZHRoIC0gJGZvb3Rlci5vYmplY3Qub2Zmc2V0V2lkdGgpLzIgKyAncHgnXHJcbiAgICAgICAgJGZvb3Rlci5vYmplY3Quc3R5bGUuYm9yZGVyUmFkaXVzID0gJzJlbSdcclxuICAgICAgICAkZm9vdGVyX19jZW50ZXIuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgfSBlbHNlIGlmKHdoZXJlID09PSAnYmFjaycpe1xyXG4gICAgICAgICRmb290ZXIub2JqZWN0LnN0eWxlLndpZHRoID0gJydcclxuICAgICAgICAkZm9vdGVyLm9iamVjdC5zdHlsZS5sZWZ0ID0gJydcclxuICAgICAgICAkZm9vdGVyLm9iamVjdC5zdHlsZS5ib3JkZXJSYWRpdXMgPSAnJ1xyXG4gICAgICAgICRmb290ZXJfX2NlbnRlci5zdHlsZS5kaXNwbGF5ID0gJydcclxuICAgIH1cclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgd2luZG93LnZpZXdlclN0YXRlID0ge1xyXG4gICAgJyRib3gnOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm94JyksXHJcbiAgICAnJHZpZGVvJzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZpZGVvJyksXHJcbiAgICAnJHNvdXJjZSc6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zb3VyY2UnKSxcclxuICAgICckc2lkZU1lbnVCb3gnOiB7XHJcbiAgICAgICAgJ29iamVjdCc6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJyksXHJcbiAgICAgICAgJ2hpZGUnOiBudWxsLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGZ1bmN0aW9uIC0+IHZvaWRcclxuICAgICAgICAnc2hvdyc6IG51bGwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgZnVuY3Rpb24gLT4gdm9pZFxyXG4gICAgfSxcclxuICAgICckc2xpZGVyJzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXJfX3NsaWRlcicpLFxyXG4gICAgJyRmb290ZXInOiB7XHJcbiAgICAgICAgJ29iamVjdCc6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXInKSxcclxuICAgICAgICAnaGlkZSc6IG51bGwsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgZnVuY3Rpb24gLT4gdm9pZFxyXG4gICAgICAgICdzaG93JzogbnVsbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBmdW5jdGlvbiAtPiB2b2lkXHJcbiAgICB9LFxyXG4gICAgJyRidG5IZWxwJzogICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX2xlZnRfX2hlbHAnKSxcclxuICAgICckYnRuUGxheSc6ICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19sZWZ0X19wbGF5JyksXHJcbiAgICAnJGJ0blZvbHVtZSc6ICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fbGVmdF9fdm9sdW1lJyksXHJcbiAgICAnJGJ0blF1YWxpdHknOiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fbGVmdF9fcXVhbGl0eScpLFxyXG4gICAgJyRidG5TY2FsZSc6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX3JpZ2h0X19zY2FsZScpLFxyXG4gICAgJyRidG5BbGlnbic6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX3JpZ2h0X19hbGlnbicpLFxyXG4gICAgJyRidG5NZW51T2ZmJzogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX3JpZ2h0X19tZW51LW9mZicpLFxyXG4gICAgJyRidG5GdWxsU2NyJzogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX3JpZ2h0X19mdWxsc2NyJyksXHJcbiAgICAnYWN0aXZlJGlucHV0JzogbnVsbCxcclxuICAgICdoaWdoUXVhbGl0eSc6IGZhbHNlLFxyXG4gICAgJ2FsaWduVmVydGljYWwnOiBmYWxzZSxcclxuICAgICdpcyRzaWRlTWVudUJveEhpZGRlbic6IGZhbHNlLFxyXG4gICAgJ2lzJGZvb3RlckhpZGRlbic6IGZhbHNlLFxyXG4gICAgJ2R1cmF0aW9uJzogNTAwXHJcbiAgfTtcclxuXHJcbiAgICB3aW5kb3cudmlld2VyU3RhdGUuaXNWaWRlb1dvcmtpbmcgPSByZXF1aXJlKCcuL2Fza1ZpZGVvV29ya2luZy5qcycpICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgYm9vbGVhblxyXG4gICAgd2luZG93LnZpZXdlclN0YXRlLmlzRnVsbFNjcmVlbkFsbG93ZWQgPSByZXF1aXJlKCcuL2Fza0Z1bGxTY3JlZW4uanMnKSAgICAgICAgICAgICAgICAgICAgICAgLy8gIGJvb2xlYW5cclxuICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZSA9IHJlcXVpcmUoJy4vYXNrX2lQYWRfaVBob25lLmpzJykgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBib29sZWFuXHJcbiAgICB3aW5kb3cudmlld2VyU3RhdGUuaXNfaVBhZF9pUGhvbmVfaW5GdWxsU2NyZWVuID0gcmVxdWlyZSgnLi9hc2tfaVBhZF9pUGhvbmVfRnVsbFNjcmVlbi5qcycpICAvLyAgYm9vbGVhblxyXG4gICAgd2luZG93LnZpZXdlclN0YXRlLmFzayRib3hJbkZ1bGxTY3JlZW4gPSByZXF1aXJlKCcuL2FzayRib3hJbkZ1bGxTY3JlZW4uanMnKSAgICAgICAgICAgICAgICAgLy8gIGZ1bmN0aW9uIC0+IGJvb2xlYW5cclxuICBcclxuICAgIC8vICBTZXQgaGlkZSgpIGFuZCBzaG93KCkgbWV0aG9kcyBmb3IgJHNpZGVNZW51Qm94IGFuZCAkZm9vdGVyXHJcbiAgICAvLyAgYmFzaW5nIG9uIHJlcXVlc3RBbmltYXRpb25GcmFtZSBvciBzZXRJbnRlcnZhbCgpXHJcbiAgaWYocmVxdWlyZSgnLi9hc2tBbmltYXRpb25GcmFtZUFsbG93ZWQuanMnKSkge1xyXG4gICAgcmVxdWlyZSgnLi9zZXRNZW51QW5kRm9vdGVyTWV0aG9kc1dpdGhGcmFtZS5qcycpXHJcbiAgfSBlbHNlIHtcclxuICAgIHJlcXVpcmUoJy4vc2V0TWVudUFuZEZvb3Rlck1ldGhvZHNXaXRoSW50ZXJ2YWwuanMnKVxyXG4gIH1cclxuXHJcbiAgcmVxdWlyZSgnLi9jaGFubmVsU2VsZWN0b3IuanMnKVxyXG4gIHJlcXVpcmUoJy4vcXVhbGl0eVNlbGVjdG9yLmpzJylcclxuICByZXF1aXJlKCcuL2FsaWduU2VsZWN0b3IuanMnKVxyXG4gIHJlcXVpcmUoJy4vaGlkZVNob3dNZW51LmpzJylcclxuICByZXF1aXJlKCcuL2Z1bGxzY3JlZW4uanMnKVxyXG4gIHJlcXVpcmUoJy4vdmlkZW9FcnJvckxpc3RlbmVyJylcclxuXHJcbn0iLCIndXNlIHN0cmljdCdcclxuXHJcbnZhciAkYnRuID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5RdWFsaXR5XHJcbnZhciAkc2lnbkhRID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW3RpdGxlID0gaGlnaHRfcXVhbGl0eV0nKVxyXG52YXIgJHNpZ25MUSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1t0aXRsZSA9IGxvd19xdWFsaXR5XScpXHJcblxyXG5pZiAoJHNpZ25MUS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgd2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5ID0gZmFsc2VcclxufSBlbHNlIGlmICgkc2lnbkhRLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICB3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkgPSB0cnVlXHJcbn0gZWxzZSB7XHJcbiAgJHNpZ25MUS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSA9IGZhbHNlXHJcbn1cclxuXHJcbiRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVRdWFsaXR5KVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlUXVhbGl0eSAoZXZlbnQpIHtcclxuICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gIHZhciBsaW5rID0gdW5kZWZpbmVkXHJcbiAgaWYgKHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSkge1xyXG4gICAgJHNpZ25IUS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgJHNpZ25MUS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxyXG4gICAgd2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5ID0gZmFsc2VcclxuICAgIGlmICh3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0KSB7XHJcbiAgICAgIGxpbmsgPSB3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0LmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWxxJylcclxuICAgICAgd2luZG93LnZpZXdlclN0YXRlLiR2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kc291cmNlLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgd2luZG93LnZpZXdlclN0YXRlLiR2aWRlby5wbGF5KClcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgJHNpZ25MUS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgJHNpZ25IUS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxyXG4gICAgd2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5ID0gdHJ1ZVxyXG4gICAgaWYgKHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQpIHtcclxuICAgICAgbGluayA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmstaHEnKVxyXG4gICAgICB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgd2luZG93LnZpZXdlclN0YXRlLiRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvLnBsYXkoKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbnZhciAkc2lkZU1lbnVCb3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJHNpZGVNZW51Qm94XHJcbnZhciAkZm9vdGVyID0gd2luZG93LnZpZXdlclN0YXRlLiRmb290ZXJcclxudmFyIGR1cmF0aW9uID0gd2luZG93LnZpZXdlclN0YXRlLmR1cmF0aW9uXHJcblxyXG53aW5kb3cudmlld2VyU3RhdGUuJHNpZGVNZW51Qm94LmhpZGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGlkZSlcclxuICAgIGZ1bmN0aW9uIGhpZGUodGltZVN0YW1wKSB7XHJcbiAgICAgICAgaWYgKCFzdGFydFRpbWUpIHN0YXJ0VGltZSA9IHRpbWVTdGFtcFxyXG4gICAgICAgIHZhciBwcm9ncmVzcyA9ICh0aW1lU3RhbXAgLSBzdGFydFRpbWUpIC8gZHVyYXRpb25cclxuICAgICAgICBpZiAocHJvZ3Jlc3MgPD0gMSkge1xyXG4gICAgICAgICAgICAkc2lkZU1lbnVCb3gub2JqZWN0LnN0eWxlLm9wYWNpdHkgPSAxIC0gcHJvZ3Jlc3NcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhpZGUpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJHNpZGVNZW51Qm94Lm9iamVjdC5zdHlsZS5vcGFjaXR5ID0gMFxyXG4gICAgICAgICAgICAkc2lkZU1lbnVCb3gub2JqZWN0LnN0eWxlLnJpZ2h0ID0gJy01ZW0nXHJcbiAgICAgICAgICAgIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaXMkc2lkZU1lbnVCb3hIaWRkZW4gPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG53aW5kb3cudmlld2VyU3RhdGUuJHNpZGVNZW51Qm94LnNob3cgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAkc2lkZU1lbnVCb3gub2JqZWN0LnN0eWxlLnJpZ2h0ID0gJydcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShzaG93KVxyXG4gICAgZnVuY3Rpb24gc2hvdyh0aW1lU3RhbXApIHtcclxuICAgICAgICBpZiAoIXN0YXJ0VGltZSkgc3RhcnRUaW1lID0gdGltZVN0YW1wXHJcbiAgICAgICAgdmFyIHByb2dyZXNzID0gKHRpbWVTdGFtcCAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvblxyXG4gICAgICAgIGlmIChwcm9ncmVzcyA8PSAxKSB7XHJcbiAgICAgICAgICAgICRzaWRlTWVudUJveC5vYmplY3Quc3R5bGUub3BhY2l0eSA9IHByb2dyZXNzXHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShzaG93KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRzaWRlTWVudUJveC5vYmplY3Quc3R5bGUub3BhY2l0eSA9IDFcclxuICAgICAgICAgICAgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5pcyRzaWRlTWVudUJveEhpZGRlbiA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG53aW5kb3cudmlld2VyU3RhdGUuJGZvb3Rlci5oaWRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhpZGUpXHJcbiAgICBmdW5jdGlvbiBoaWRlKHRpbWVTdGFtcCkge1xyXG4gICAgICAgIGlmICghc3RhcnRUaW1lKSBzdGFydFRpbWUgPSB0aW1lU3RhbXBcclxuICAgICAgICB2YXIgcHJvZ3Jlc3MgPSAodGltZVN0YW1wIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uXHJcbiAgICAgICAgaWYgKHByb2dyZXNzIDw9IDEpIHtcclxuICAgICAgICAgICAgJGZvb3Rlci5vYmplY3Quc3R5bGUub3BhY2l0eSA9IDEgLSBwcm9ncmVzc1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGlkZSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkZm9vdGVyLm9iamVjdC5zdHlsZS5vcGFjaXR5ID0gMFxyXG4gICAgICAgICAgICAkZm9vdGVyLm9iamVjdC5zdHlsZS5ib3R0b20gPSAnLTEwJSdcclxuICAgICAgICAgICAgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5pcyRmb290ZXJIaWRkZW4gPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG53aW5kb3cudmlld2VyU3RhdGUuJGZvb3Rlci5zaG93ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgJGZvb3Rlci5vYmplY3Quc3R5bGUuYm90dG9tID0gJydcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShzaG93KVxyXG4gICAgZnVuY3Rpb24gc2hvdyh0aW1lU3RhbXApIHtcclxuICAgICAgICBpZiAoIXN0YXJ0VGltZSkgc3RhcnRUaW1lID0gdGltZVN0YW1wXHJcbiAgICAgICAgdmFyIHByb2dyZXNzID0gKHRpbWVTdGFtcCAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvblxyXG4gICAgICAgIGlmIChwcm9ncmVzcyA8PSAxKSB7XHJcbiAgICAgICAgICAgICRmb290ZXIub2JqZWN0LnN0eWxlLm9wYWNpdHkgPSBwcm9ncmVzc1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2hvdylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkZm9vdGVyLm9iamVjdC5zdHlsZS5vcGFjaXR5ID0gMVxyXG4gICAgICAgICAgICBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmlzJGZvb3RlckhpZGRlbiA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyICRzaWRlTWVudUJveCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc2lkZU1lbnVCb3hcclxudmFyICRmb290ZXIgPSB3aW5kb3cudmlld2VyU3RhdGUuJGZvb3RlclxyXG52YXIgZHVyYXRpb24gPSB3aW5kb3cudmlld2VyU3RhdGUuZHVyYXRpb25cclxuXHJcbndpbmRvdy52aWV3ZXJTdGF0ZS4kc2lkZU1lbnVCb3guaGlkZSA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgIHZhciBpZCA9IHNldEludGVydmFsKGhpZGUsIDQwKVxyXG4gICAgZnVuY3Rpb24gaGlkZSgpIHtcclxuICAgICAgICBpZiAoIXN0YXJ0VGltZSkgc3RhcnRUaW1lID0gRGF0ZS5ub3coKVxyXG4gICAgICAgIHZhciBwcm9ncmVzcyA9IChEYXRlLm5vdygpIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uXHJcbiAgICAgICAgaWYgKHByb2dyZXNzIDw9IDEpIHtcclxuICAgICAgICAgICAgJHNpZGVNZW51Qm94Lm9iamVjdC5zdHlsZS5vcGFjaXR5ID0gMSAtIHByb2dyZXNzXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpZClcclxuICAgICAgICAgICAgJHNpZGVNZW51Qm94Lm9iamVjdC5zdHlsZS5vcGFjaXR5ID0gMFxyXG4gICAgICAgICAgICAkc2lkZU1lbnVCb3gub2JqZWN0LnN0eWxlLnJpZ2h0ID0gJy01ZW0nXHJcbiAgICAgICAgICAgIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaXMkc2lkZU1lbnVCb3hIaWRkZW4gPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG53aW5kb3cudmlld2VyU3RhdGUuJHNpZGVNZW51Qm94LnNob3cgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAkc2lkZU1lbnVCb3gub2JqZWN0LnN0eWxlLnJpZ2h0ID0gJydcclxuICAgIHZhciBpZCA9IHNldEludGVydmFsKHNob3csIDQwKVxyXG4gICAgZnVuY3Rpb24gc2hvdygpIHtcclxuICAgICAgICBpZiAoIXN0YXJ0VGltZSkgc3RhcnRUaW1lID0gRGF0ZS5ub3coKVxyXG4gICAgICAgIHZhciBwcm9ncmVzcyA9IChEYXRlLm5vdygpIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uXHJcbiAgICAgICAgaWYgKHByb2dyZXNzIDw9IDEpIHtcclxuICAgICAgICAgICAgJHNpZGVNZW51Qm94Lm9iamVjdC5zdHlsZS5vcGFjaXR5ID0gcHJvZ3Jlc3NcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNob3cpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpZClcclxuICAgICAgICAgICAgJHNpZGVNZW51Qm94Lm9iamVjdC5zdHlsZS5vcGFjaXR5ID0gMVxyXG4gICAgICAgICAgICBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmlzJHNpZGVNZW51Qm94SGlkZGVuID0gZmFsc2VcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuXHJcbndpbmRvdy52aWV3ZXJTdGF0ZS4kZm9vdGVyLmhpZGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICB2YXIgaWQgPSBzZXRJbnRlcnZhbChoaWRlLCA0MClcclxuICAgIGZ1bmN0aW9uIGhpZGUoKSB7XHJcbiAgICAgICAgaWYgKCFzdGFydFRpbWUpIHN0YXJ0VGltZSA9IERhdGUubm93KClcclxuICAgICAgICB2YXIgcHJvZ3Jlc3MgPSAoRGF0ZS5ub3coKSAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvblxyXG4gICAgICAgIGlmIChwcm9ncmVzcyA8PSAxKSB7XHJcbiAgICAgICAgICAgICRmb290ZXIub2JqZWN0LnN0eWxlLm9wYWNpdHkgPSAxIC0gcHJvZ3Jlc3NcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhpZGUpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2xlYXJJbnRlcnZhbChpZClcclxuICAgICAgICAgICAgJGZvb3Rlci5vYmplY3Quc3R5bGUub3BhY2l0eSA9IDBcclxuICAgICAgICAgICAgJGZvb3Rlci5vYmplY3Quc3R5bGUuYm90dG9tID0gJy0xMCUnXHJcbiAgICAgICAgICAgIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaXMkZm9vdGVySGlkZGVuID0gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG5cclxud2luZG93LnZpZXdlclN0YXRlLiRmb290ZXIuc2hvdyA9IGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgICRmb290ZXIub2JqZWN0LnN0eWxlLmJvdHRvbSA9ICcnXHJcbiAgICB2YXIgaWQgPSBzZXRJbnRlcnZhbChzaG93LCA0MClcclxuICAgIGZ1bmN0aW9uIHNob3coKSB7XHJcbiAgICAgICAgaWYgKCFzdGFydFRpbWUpIHN0YXJ0VGltZSA9IERhdGUubm93KClcclxuICAgICAgICB2YXIgcHJvZ3Jlc3MgPSAoRGF0ZS5ub3coKSAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvblxyXG4gICAgICAgIGlmIChwcm9ncmVzcyA8PSAxKSB7XHJcbiAgICAgICAgICAgICRmb290ZXIub2JqZWN0LnN0eWxlLm9wYWNpdHkgPSBwcm9ncmVzc1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2hvdylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjbGVhckludGVydmFsKGlkKVxyXG4gICAgICAgICAgICAkZm9vdGVyLm9iamVjdC5zdHlsZS5vcGFjaXR5ID0gMVxyXG4gICAgICAgICAgICBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmlzJGZvb3RlckhpZGRlbiA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW9cclxuXHJcbiR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZhaWxlZClcclxuXHJcbiBmdW5jdGlvbiBmYWlsZWQoZSkge1xyXG4gICAvLyB2aWRlbyBwbGF5YmFjayBmYWlsZWQgLSBzaG93IGEgbWVzc2FnZSBzYXlpbmcgd2h5ICAgICAtIGZyb20gaHR0cHM6Ly9kZXYudzMub3JnL2h0bWw1L3NwZWMtYXV0aG9yLXZpZXcvdmlkZW8uaHRtbCN2aWRlb1xyXG4gICBzd2l0Y2ggKGUudGFyZ2V0LmVycm9yLmNvZGUpIHtcclxuICAgICBjYXNlIGUudGFyZ2V0LmVycm9yLk1FRElBX0VSUl9BQk9SVEVEOlxyXG4gICAgICAgYWxlcnQoJ1lvdSBhYm9ydGVkIHRoZSB2aWRlbyBwbGF5YmFjay4nKTtcclxuICAgICAgIGJyZWFrO1xyXG4gICAgIGNhc2UgZS50YXJnZXQuZXJyb3IuTUVESUFfRVJSX05FVFdPUks6XHJcbiAgICAgICBhbGVydCgnQSBuZXR3b3JrIGVycm9yIGNhdXNlZCB0aGUgdmlkZW8gZG93bmxvYWQgdG8gZmFpbCBwYXJ0LXdheS4nKTtcclxuICAgICAgIGJyZWFrO1xyXG4gICAgIGNhc2UgZS50YXJnZXQuZXJyb3IuTUVESUFfRVJSX0RFQ09ERTpcclxuICAgICAgIGFsZXJ0KCdUaGUgdmlkZW8gcGxheWJhY2sgd2FzIGFib3J0ZWQgZHVlIHRvIGEgY29ycnVwdGlvbiBwcm9ibGVtIG9yIGJlY2F1c2UgdGhlIHZpZGVvIHVzZWQgZmVhdHVyZXMgeW91ciBicm93c2VyIGRpZCBub3Qgc3VwcG9ydC4nKTtcclxuICAgICAgIGJyZWFrO1xyXG4gICAgIGNhc2UgZS50YXJnZXQuZXJyb3IuTUVESUFfRVJSX1NSQ19OT1RfU1VQUE9SVEVEOlxyXG4gICAgICAgYWxlcnQoJ1RoZSB2aWRlbyBjb3VsZCBub3QgYmUgbG9hZGVkLCBlaXRoZXIgYmVjYXVzZSB0aGUgc2VydmVyIG9yIG5ldHdvcmsgZmFpbGVkIG9yIGJlY2F1c2UgdGhlIGZvcm1hdCBpcyBub3Qgc3VwcG9ydGVkLicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgICAgZGVmYXVsdDpcclxuICAgICAgIGFsZXJ0KCdBbiB1bmtub3duIGVycm9yIG9jY3VycmVkLicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgIH1cclxuIH1cclxuIl19
