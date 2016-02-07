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

$slider.addEventListener('click', function(event){
    var srcElement = event.srcElement ? event.srcElement : event.target
    if(srcElement.tagName === 'INPUT'){
        if(active$input === srcElement) {
            active$input.checked = false
            active$input = null
            $video.style.backgroundSize = ""
            $video.setAttribute('src', '')
            $source.setAttribute('src', '')
            $btnMenuOnOf.style.display = 'none'
            $btnAlign.style.display = 'none'
        } else {
            active$input = srcElement
            if(window.viewerState.highQuality)  link = srcElement.getAttribute('data-link-hq')
            else link = srcElement.getAttribute('data-link-lq')
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

},{}],3:[function(require,module,exports){
'use strict'

var $btnFullScr = window.viewerState.$btnFullScr
var $box = window.viewerState.$box

if ( window.viewerState.isFullScreenAllowed ) {
  $btnFullScr.addEventListener('click', function () {
      if(is$boxInFullScreen()) getOffFullscreen()
      else goFullScreen()
  })
  document.addEventListener('fullscreenchange', modifyMenuLook)
  document.addEventListener('webkitfullscreenchange', modifyMenuLook)
  document.addEventListener('mozfullscreenchange', modifyMenuLook)
  document.addEventListener('MSFullscreenChange', modifyMenuLook)
} else {
//    $btnFullScr.style.display = 'none'
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
function modifyMenuLook () {
  if ( is$boxInFullScreen() ) {
    console.log('Modify btnFullScr look!!!')
    console.log('Get Menu off!!!')
  } else {
    console.log('Modify btnFullScr look!!!')
    console.log('Get Menu back!!!')
  }
}
function is$boxInFullScreen() {
    if ( document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement ) {
        return true
    } else return false
}

},{}],4:[function(require,module,exports){
'use strict'

var $video = window.viewerState.$video
var $slider = window.viewerState.$slider
var $footer = window.viewerState.$footer
var $btnMenuOff = document.querySelector('.footer__right__menu-off')
var $arrowMenuOnOff = document.querySelector('.menu_on_off')
var $arrowText = document.querySelector('.menu_on_off__text')
var startTime = undefined
var duration = 1000 //  ms
var duration_fast = 500 //  ms

$btnMenuOff.addEventListener('click', function () {
    requestAnimationFrame(hideMenuHor)
})
$arrowMenuOnOff.addEventListener('click', function () {
    $arrowMenuOnOff.style.borderTopColor =  '#48f';
    $arrowText.innerText = ''
    requestAnimationFrame(showMenuVert)
})

function hideMenuHor (timeStamp) {
  if (!startTime) startTime = timeStamp
  var progress = (timeStamp - startTime) / duration
  if (progress <= 1) {
      $arrowMenuOnOff.style.right = 100 - 100 * progress + '%'
      $footer.style.left = 100 * progress + '%'
      requestAnimationFrame(hideMenuHor)
  } else {
      $arrowMenuOnOff.style.right = 0
      $footer.style.left = 100 + '%'
      startTime = undefined
      turnArrowUp()
      requestAnimationFrame(hideMenuVert)
  }
}
function turnArrowUp() {
    $arrowMenuOnOff.style.borderTop = 'none'
    $arrowMenuOnOff.style.borderRight = '2.5em solid transparent'
    $arrowMenuOnOff.style.borderBottom = '2em solid #48f'
    $arrowMenuOnOff.style.borderLeft = '2.5em solid transparent'
}

function hideMenuVert(timeStamp) {
  if (!startTime) startTime = timeStamp
  var progress = (timeStamp - startTime) / duration
  if (progress <= 1) {
      $arrowMenuOnOff.style.bottom = 100 * progress + '%'
      $overViewBox.style.top = -100 * progress + '%'
      requestAnimationFrame(hideMenuVert)
  } else {
      $arrowMenuOnOff.style.bottom = 100 + '%'
      $overViewBox.style.top = -90 + '%'
      startTime = undefined
      turnArrowDonw()
      requestAnimationFrame(dropDown)
  }
}
function turnArrowDonw() {
    $arrowMenuOnOff.style.borderTop = '2em solid #48f'
    $arrowMenuOnOff.style.borderRight = '2.5em solid transparent'
    $arrowMenuOnOff.style.borderBottom = 'none'
    $arrowMenuOnOff.style.borderLeft = '2.5em solid transparent'
}
function dropDown(timeStamp) {
  if (!startTime) startTime = timeStamp
  var progress = (timeStamp - startTime) / duration_fast
  if (progress <= 1) {
      $arrowMenuOnOff.style.bottom = 100 - 10 * progress + '%'
      requestAnimationFrame(dropDown)
  } else {
      $arrowMenuOnOff.style.bottom = 90 + '%'
      startTime = undefined
      setTimeout(function() {
          $arrowText.innerText = 'menu'
          $arrowMenuOnOff.style.borderTopColor =  'rgba(68, 136, 255, 0.3)';
      }, 300);
  }
}



function showMenuVert (timeStamp) {
  if (!startTime) startTime = timeStamp
  var progress = (timeStamp - startTime) / duration
  if (progress <= 1) {
      $arrowMenuOnOff.style.bottom = 90 - 90 * progress + '%'
      $overViewBox.style.top = -90 + 90 * progress + '%'
    requestAnimationFrame(showMenuVert)
  } else {
      $arrowMenuOnOff.style.bottom = 0
      $overViewBox.style.top = 0
      startTime = undefined
      turnArrowLeft()
      requestAnimationFrame(showMenuHor)
  }
}
function turnArrowLeft() {
    $arrowMenuOnOff.style.borderTop = '1em solid transparent'
    $arrowMenuOnOff.style.borderRight = '5em solid #48f'
    $arrowMenuOnOff.style.borderBottom = '1em solid transparent'
    $arrowMenuOnOff.style.borderLeft = 'none'
}
function showMenuHor (timeStamp) {
  if (!startTime) startTime = timeStamp
  var progress = (timeStamp - startTime) / duration
  if (progress <= 1) {
      $arrowMenuOnOff.style.right = 100 * progress + '%'
      $footer.style.left = 100 - 100 * progress + '%'
      requestAnimationFrame(showMenuHor)
  } else {
      $arrowMenuOnOff.style.right = 100 + '%'
      $footer.style.left = 0
      startTime = undefined
      turnArrowToInit()
  }
}
function turnArrowToInit() {
    $arrowMenuOnOff.style.borderTop = ''
    $arrowMenuOnOff.style.borderRight = ''
    $arrowMenuOnOff.style.borderBottom = ''
    $arrowMenuOnOff.style.borderLeft = ''
}

},{}],5:[function(require,module,exports){
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
    'isVideoWorking': false,
    'isAnimationAllowed': false,
    'isFullScreenAllowed': false,
    'exitFullScreen': '',
    'active$input': null,
    'highQuality': false,
    'alignVertical': false
  };
  
  askFullScreen()
  askVideoWorking()
  askAnimationAllowed()
  
  require('./channelSelector.js')
  require('./qualitySelector.js')
  require('./alignSelector.js')
  require('./hideShowMenu.js')
  require('./fullscreen.js')
  require('./videoErrorListener')
//  require('./iPadCheckScreenSize.js')

  function askVideoWorking() {
      if(typeof window.viewerState.$video.play === 'function' ) {
          window.viewerState.isVideoWorking = true
          console.log('video ok')
      } else {
          window.viewerState.isVideoWorking = false
          console.log('no video')
      }
  }
  function askAnimationAllowed () {
      if(typeof requestAnimationFrame  === 'function') {
          window.viewerState.isAnimationAllowed = true
          console.log('requestAnimationFrame ok')
      } else {
          window.viewerState.isAnimationAllowed = false
          console.log('no requestAnimationFrame')
      }
  }
    function askFullScreen() {
        var $box = window.viewerState.$box
        if ($box.requestFullscreen || $box.mozRequestFullScreen || $box.webkitRequestFullscreen || $box.msRequestFullscreen) {
            window.viewerState.isFullScreenAllowed = true 
            console.log('FullScreen ok')
        } else {
            window.viewerState.isFullScreenAllowed = false 
            console.log('No fullscreen')
        }
    }

}

},{"./alignSelector.js":1,"./channelSelector.js":2,"./fullscreen.js":3,"./hideShowMenu.js":4,"./qualitySelector.js":6,"./videoErrorListener":7}],6:[function(require,module,exports){
'use strict'

var $btn = document.querySelector('.footer__left__quality')
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

},{}],7:[function(require,module,exports){
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

},{}]},{},[5])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2EwNS9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hbGlnblNlbGVjdG9yLmpzIiwianMvY2hhbm5lbFNlbGVjdG9yLmpzIiwianMvZnVsbHNjcmVlbi5qcyIsImpzL2hpZGVTaG93TWVudS5qcyIsImpzL21haW4uanMiLCJqcy9xdWFsaXR5U2VsZWN0b3IuanMiLCJqcy92aWRlb0Vycm9yTGlzdGVuZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDMUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIlxyXG5cclxudmFyICRidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvb3Rlcl9fcmlnaHRfX2FsaWduXCIpXHJcbnZhciAkdmlkZW8gPSB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvIFxyXG5cclxuaWYoJGJ0bi5jbGFzc0xpc3QuY29udGFpbnMoXCJ2ZXJ0aWNhbFwiKSkge1xyXG4gICAgd2luZG93LnZpZXdlclN0YXRlLmFsaWduVmVydGljYWwgPSB0cnVlO1xyXG59IGVsc2UgaWYoJGJ0bi5jbGFzc0xpc3QuY29udGFpbnMoXCJob3Jpc29udGFsXCIpKSB7XHJcbiAgICB3aW5kb3cudmlld2VyU3RhdGUuYWxpZ25WZXJ0aWNhbCA9IGZhbHNlO1xyXG59IGVsc2Uge1xyXG4gICAgJGJ0bi5jbGFzc0xpc3QuYWRkKFwidmVydGljYWxcIilcclxuICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5hbGlnblZlcnRpY2FsID0gdHJ1ZTtcclxufVxyXG5maXQoKVxyXG5cclxuJGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlQWxpZ24pXHJcblxyXG5mdW5jdGlvbiB0b2dnbGVBbGlnbihldmVudCkge1xyXG4gICAgaWYod2luZG93LnZpZXdlclN0YXRlLmFsaWduVmVydGljYWwpIHtcclxuICAgICAgICAkYnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJ2ZXJ0aWNhbFwiKVxyXG4gICAgICAgICRidG4uY2xhc3NMaXN0LmFkZChcImhvcmlzb250YWxcIilcclxuICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuYWxpZ25WZXJ0aWNhbCA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkYnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJob3Jpc29udGFsXCIpXHJcbiAgICAgICAgJGJ0bi5jbGFzc0xpc3QuYWRkKFwidmVydGljYWxcIilcclxuICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuYWxpZ25WZXJ0aWNhbCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBmaXQoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBmaXQoKSB7XHJcbiAgICBpZigkYnRuLmNsYXNzTGlzdC5jb250YWlucyhcInZlcnRpY2FsXCIpKSB7XHJcbiAgICAgICAgJHZpZGVvLnN0eWxlLndpZHRoID0gJzEwMCUnXHJcbiAgICAgICAgJHZpZGVvLnN0eWxlLmhlaWdodCA9ICcxMDAlJ1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkdmlkZW8uc3R5bGUud2lkdGggPSAnMTAwJSdcclxuICAgICAgICAkdmlkZW8uc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nXHJcbiAgICB9XHJcbn0iLCJcInVzZSBzdHJpY3RcIlxyXG5cclxudmFyICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW9cclxudmFyICRzb3VyY2UgPSB3aW5kb3cudmlld2VyU3RhdGUuJHNvdXJjZVxyXG52YXIgJHNsaWRlciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc2xpZGVyXHJcbnZhciBhY3RpdmUkaW5wdXQgPSB3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0XHJcbnZhciAkYnRuTWVudU9uT2YgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19yaWdodF9fbWVudS1vZmYnKVxyXG52YXIgJGJ0bkFsaWduID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fcmlnaHRfX2FsaWduJylcclxudmFyIGxpbmsgPSAnJ1xyXG52YXIgJGJ0bnMgPSB7XHJcbiAgICBcImNoXzFnb3JvZHNrb3lcIjogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfMWdvcm9kc2tveVwiKSxcclxuICAgIFwiY2hfM3RzeWZyb3ZveVwiOiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF8zdHN5ZnJvdm95XCIpLFxyXG4gICAgXCJjaF9yZXBvcnRlclwiOiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX3JlcG9ydGVyXCIpLFxyXG4gICAgXCJjaF9hY2FkZW1pYVwiOiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX2FjYWRlbWlhXCIpLFxyXG4gICAgXCJjaF9hMVwiOiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX2ExXCIpLFxyXG4gICAgXCJjaF9kdW1za2F5YVwiOiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX2R1bXNrYXlhXCIpLFxyXG4gICAgXCJjaF9ndHZcIjogICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX2d0dlwiKSxcclxuICAgIFwiY2hfc3R2XCI6ICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9zdHZcIiksXHJcbiAgICBcImNoX3VnbmF5YXZvbG5hXCI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfdWduYXlhdm9sbmFcIiksXHJcbiAgICBcImNoX25lbW9cIjogICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfbmVtb1wiKVxyXG59XHJcbiRidG5zLmNoXzFnb3JvZHNrb3kuc2V0QXR0cmlidXRlKCAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS8xdHZvZC8xdHZvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiICAgIClcclxuJGJ0bnMuY2hfM3RzeWZyb3ZveS5zZXRBdHRyaWJ1dGUoICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vY2RuNS5saXZlLXR2Lm9kLnVhOjgwODEvdHYvM3R2b2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgKVxyXG4kYnRucy5jaF9yZXBvcnRlci5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly9jZG40LmxpdmUtdHYub2QudWE6ODA4MS90di8zMWNob2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiApXHJcbiRidG5zLmNoX2FjYWRlbWlhLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovL2NkbjQubGl2ZS10di5vZC51YTo4MDgxL3R2LzM2Y2hvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiIClcclxuJGJ0bnMuY2hfYTEuc2V0QXR0cmlidXRlKCAgICAgICAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL2Exb2QvYTFvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiICAgICAgKVxyXG4kYnRucy5jaF9kdW1za2F5YS5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTM4OjgwODEvZHVtc2thL2R1bXNrYS1hYnItbHEvcGxheWxpc3QubTN1OFwiICApXHJcbiRidG5zLmNoX2d0di5zZXRBdHRyaWJ1dGUoICAgICAgICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9hMW9kL2d0dm9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgICAgIClcclxuJGJ0bnMuY2hfc3R2LnNldEF0dHJpYnV0ZSggICAgICAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL3N0dm9kL3N0dm9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgICAgKVxyXG4kYnRucy5jaF91Z25heWF2b2xuYS5zZXRBdHRyaWJ1dGUoICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvd2F2ZS93YXZlLWFici1scS9wbGF5bGlzdC5tM3U4XCIgICAgICApXHJcbiRidG5zLmNoX25lbW8uc2V0QXR0cmlidXRlKCAgICAgICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9uZW1vL21vci1zdWIvcGxheWxpc3QubTN1OFwiICAgICAgICAgIClcclxuXHJcbiRidG5zLmNoXzFnb3JvZHNrb3kuc2V0QXR0cmlidXRlKCAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS8xdHZvZC8xdHZvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgIClcclxuJGJ0bnMuY2hfM3RzeWZyb3ZveS5zZXRBdHRyaWJ1dGUoICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vY2RuNS5saXZlLXR2Lm9kLnVhOjgwODEvdHYvM3R2b2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgKVxyXG4kYnRucy5jaF9yZXBvcnRlci5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly9jZG40LmxpdmUtdHYub2QudWE6ODA4MS90di8zMWNob2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICApXHJcbiRidG5zLmNoX2FjYWRlbWlhLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovL2NkbjQubGl2ZS10di5vZC51YTo4MDgxL3R2LzM2Y2hvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgIClcclxuJGJ0bnMuY2hfYTEuc2V0QXR0cmlidXRlKCAgICAgICAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL2Exb2QvYTFvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgICAgKVxyXG4kYnRucy5jaF9kdW1za2F5YS5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTM4OjgwODEvZHVtc2thL2R1bXNrYS1hYnIvcGxheWxpc3QubTN1OFwiICAgICApXHJcbiRidG5zLmNoX2d0di5zZXRBdHRyaWJ1dGUoICAgICAgICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9hMW9kL2d0dm9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgIClcclxuJGJ0bnMuY2hfc3R2LnNldEF0dHJpYnV0ZSggICAgICAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL3N0dm9kL3N0dm9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgKVxyXG4kYnRucy5jaF91Z25heWF2b2xuYS5zZXRBdHRyaWJ1dGUoICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvd2F2ZS93YXZlLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgICApXHJcbiRidG5zLmNoX25lbW8uc2V0QXR0cmlidXRlKCAgICAgICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9uZW1vL21vci1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgICAgIClcclxuXHJcbiRzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICB2YXIgc3JjRWxlbWVudCA9IGV2ZW50LnNyY0VsZW1lbnQgPyBldmVudC5zcmNFbGVtZW50IDogZXZlbnQudGFyZ2V0XHJcbiAgICBpZihzcmNFbGVtZW50LnRhZ05hbWUgPT09ICdJTlBVVCcpe1xyXG4gICAgICAgIGlmKGFjdGl2ZSRpbnB1dCA9PT0gc3JjRWxlbWVudCkge1xyXG4gICAgICAgICAgICBhY3RpdmUkaW5wdXQuY2hlY2tlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgIGFjdGl2ZSRpbnB1dCA9IG51bGxcclxuICAgICAgICAgICAgJHZpZGVvLnN0eWxlLmJhY2tncm91bmRTaXplID0gXCJcIlxyXG4gICAgICAgICAgICAkdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCAnJylcclxuICAgICAgICAgICAgJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsICcnKVxyXG4gICAgICAgICAgICAkYnRuTWVudU9uT2Yuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgICAgICAkYnRuQWxpZ24uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFjdGl2ZSRpbnB1dCA9IHNyY0VsZW1lbnRcclxuICAgICAgICAgICAgaWYod2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5KSAgbGluayA9IHNyY0VsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmstaHEnKVxyXG4gICAgICAgICAgICBlbHNlIGxpbmsgPSBzcmNFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWxxJylcclxuICAgICAgICAgICAgJHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgICAgICAgJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgICAgICAgICR2aWRlby5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9IFwiMCAwXCJcclxuICAgICAgICAgICAgaWYoJHZpZGVvLnBsYXkpICR2aWRlby5wbGF5KCk7XHJcbiAgICAgICAgICAgIGVsc2UgYWxlcnQgKCd2aWRlbyBjYW5ub3QgcGxheScpXHJcbiAgICAgICAgICAgICRidG5NZW51T25PZi5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jaydcclxuICAgICAgICAgICAgJGJ0bkFsaWduLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuIiwiJ3VzZSBzdHJpY3QnXG5cbnZhciAkYnRuRnVsbFNjciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuRnVsbFNjclxudmFyICRib3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJGJveFxuXG5pZiAoIHdpbmRvdy52aWV3ZXJTdGF0ZS5pc0Z1bGxTY3JlZW5BbGxvd2VkICkge1xuICAkYnRuRnVsbFNjci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGlmKGlzJGJveEluRnVsbFNjcmVlbigpKSBnZXRPZmZGdWxsc2NyZWVuKClcbiAgICAgIGVsc2UgZ29GdWxsU2NyZWVuKClcbiAgfSlcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZnVsbHNjcmVlbmNoYW5nZScsIG1vZGlmeU1lbnVMb29rKVxuICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJywgbW9kaWZ5TWVudUxvb2spXG4gIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLCBtb2RpZnlNZW51TG9vaylcbiAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignTVNGdWxsc2NyZWVuQ2hhbmdlJywgbW9kaWZ5TWVudUxvb2spXG59IGVsc2Uge1xuLy8gICAgJGJ0bkZ1bGxTY3Iuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xufVxuXG5mdW5jdGlvbiBnb0Z1bGxTY3JlZW4oKSB7XG4gICAgaWYgKCRib3gucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgJGJveC5yZXF1ZXN0RnVsbHNjcmVlbigpXG4gICAgfSBlbHNlIGlmICgkYm94Lm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XG4gICAgICAgICRib3gubW96UmVxdWVzdEZ1bGxTY3JlZW4oKVxuICAgIH0gZWxzZSBpZiAoJGJveC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAkYm94LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKClcbiAgICB9IGVsc2UgaWYgKCRib3gubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAkYm94Lm1zUmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgIH1cbn1cbmZ1bmN0aW9uIGdldE9mZkZ1bGxzY3JlZW4oKSB7XG4gIGlmKGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKSB7XG4gICAgZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKTtcbiAgfSBlbHNlIGlmKGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICBkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKCk7XG4gIH0gZWxzZSBpZihkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbikge1xuICAgIGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XG4gIH1lbHNlIGlmIChkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKSB7XG5cdGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4oKTtcbiAgfVxufVxuZnVuY3Rpb24gbW9kaWZ5TWVudUxvb2sgKCkge1xuICBpZiAoIGlzJGJveEluRnVsbFNjcmVlbigpICkge1xuICAgIGNvbnNvbGUubG9nKCdNb2RpZnkgYnRuRnVsbFNjciBsb29rISEhJylcbiAgICBjb25zb2xlLmxvZygnR2V0IE1lbnUgb2ZmISEhJylcbiAgfSBlbHNlIHtcbiAgICBjb25zb2xlLmxvZygnTW9kaWZ5IGJ0bkZ1bGxTY3IgbG9vayEhIScpXG4gICAgY29uc29sZS5sb2coJ0dldCBNZW51IGJhY2shISEnKVxuICB9XG59XG5mdW5jdGlvbiBpcyRib3hJbkZ1bGxTY3JlZW4oKSB7XG4gICAgaWYgKCBkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCB8fCBkb2N1bWVudC53ZWJraXRGdWxsc2NyZWVuRWxlbWVudCB8fCBkb2N1bWVudC5tb3pGdWxsU2NyZWVuRWxlbWVudCB8fCBkb2N1bWVudC5tc0Z1bGxzY3JlZW5FbGVtZW50ICkge1xuICAgICAgICByZXR1cm4gdHJ1ZVxuICAgIH0gZWxzZSByZXR1cm4gZmFsc2Vcbn1cbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW9cclxudmFyICRzbGlkZXIgPSB3aW5kb3cudmlld2VyU3RhdGUuJHNsaWRlclxyXG52YXIgJGZvb3RlciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kZm9vdGVyXHJcbnZhciAkYnRuTWVudU9mZiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX3JpZ2h0X19tZW51LW9mZicpXHJcbnZhciAkYXJyb3dNZW51T25PZmYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9vbl9vZmYnKVxyXG52YXIgJGFycm93VGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X29uX29mZl9fdGV4dCcpXHJcbnZhciBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxudmFyIGR1cmF0aW9uID0gMTAwMCAvLyAgbXNcclxudmFyIGR1cmF0aW9uX2Zhc3QgPSA1MDAgLy8gIG1zXHJcblxyXG4kYnRuTWVudU9mZi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShoaWRlTWVudUhvcilcclxufSlcclxuJGFycm93TWVudU9uT2ZmLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlclRvcENvbG9yID0gICcjNDhmJztcclxuICAgICRhcnJvd1RleHQuaW5uZXJUZXh0ID0gJydcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShzaG93TWVudVZlcnQpXHJcbn0pXHJcblxyXG5mdW5jdGlvbiBoaWRlTWVudUhvciAodGltZVN0YW1wKSB7XHJcbiAgaWYgKCFzdGFydFRpbWUpIHN0YXJ0VGltZSA9IHRpbWVTdGFtcFxyXG4gIHZhciBwcm9ncmVzcyA9ICh0aW1lU3RhbXAgLSBzdGFydFRpbWUpIC8gZHVyYXRpb25cclxuICBpZiAocHJvZ3Jlc3MgPD0gMSkge1xyXG4gICAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUucmlnaHQgPSAxMDAgLSAxMDAgKiBwcm9ncmVzcyArICclJ1xyXG4gICAgICAkZm9vdGVyLnN0eWxlLmxlZnQgPSAxMDAgKiBwcm9ncmVzcyArICclJ1xyXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGlkZU1lbnVIb3IpXHJcbiAgfSBlbHNlIHtcclxuICAgICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLnJpZ2h0ID0gMFxyXG4gICAgICAkZm9vdGVyLnN0eWxlLmxlZnQgPSAxMDAgKyAnJSdcclxuICAgICAgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAgIHR1cm5BcnJvd1VwKClcclxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhpZGVNZW51VmVydClcclxuICB9XHJcbn1cclxuZnVuY3Rpb24gdHVybkFycm93VXAoKSB7XHJcbiAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm9yZGVyVG9wID0gJ25vbmUnXHJcbiAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm9yZGVyUmlnaHQgPSAnMi41ZW0gc29saWQgdHJhbnNwYXJlbnQnXHJcbiAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm9yZGVyQm90dG9tID0gJzJlbSBzb2xpZCAjNDhmJ1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlckxlZnQgPSAnMi41ZW0gc29saWQgdHJhbnNwYXJlbnQnXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZGVNZW51VmVydCh0aW1lU3RhbXApIHtcclxuICBpZiAoIXN0YXJ0VGltZSkgc3RhcnRUaW1lID0gdGltZVN0YW1wXHJcbiAgdmFyIHByb2dyZXNzID0gKHRpbWVTdGFtcCAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvblxyXG4gIGlmIChwcm9ncmVzcyA8PSAxKSB7XHJcbiAgICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3R0b20gPSAxMDAgKiBwcm9ncmVzcyArICclJ1xyXG4gICAgICAkb3ZlclZpZXdCb3guc3R5bGUudG9wID0gLTEwMCAqIHByb2dyZXNzICsgJyUnXHJcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShoaWRlTWVudVZlcnQpXHJcbiAgfSBlbHNlIHtcclxuICAgICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvdHRvbSA9IDEwMCArICclJ1xyXG4gICAgICAkb3ZlclZpZXdCb3guc3R5bGUudG9wID0gLTkwICsgJyUnXHJcbiAgICAgIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgICB0dXJuQXJyb3dEb253KClcclxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyb3BEb3duKVxyXG4gIH1cclxufVxyXG5mdW5jdGlvbiB0dXJuQXJyb3dEb253KCkge1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlclRvcCA9ICcyZW0gc29saWQgIzQ4ZidcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJSaWdodCA9ICcyLjVlbSBzb2xpZCB0cmFuc3BhcmVudCdcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJCb3R0b20gPSAnbm9uZSdcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJMZWZ0ID0gJzIuNWVtIHNvbGlkIHRyYW5zcGFyZW50J1xyXG59XHJcbmZ1bmN0aW9uIGRyb3BEb3duKHRpbWVTdGFtcCkge1xyXG4gIGlmICghc3RhcnRUaW1lKSBzdGFydFRpbWUgPSB0aW1lU3RhbXBcclxuICB2YXIgcHJvZ3Jlc3MgPSAodGltZVN0YW1wIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uX2Zhc3RcclxuICBpZiAocHJvZ3Jlc3MgPD0gMSkge1xyXG4gICAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm90dG9tID0gMTAwIC0gMTAgKiBwcm9ncmVzcyArICclJ1xyXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJvcERvd24pXHJcbiAgfSBlbHNlIHtcclxuICAgICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvdHRvbSA9IDkwICsgJyUnXHJcbiAgICAgIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgJGFycm93VGV4dC5pbm5lclRleHQgPSAnbWVudSdcclxuICAgICAgICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJUb3BDb2xvciA9ICAncmdiYSg2OCwgMTM2LCAyNTUsIDAuMyknO1xyXG4gICAgICB9LCAzMDApO1xyXG4gIH1cclxufVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBzaG93TWVudVZlcnQgKHRpbWVTdGFtcCkge1xyXG4gIGlmICghc3RhcnRUaW1lKSBzdGFydFRpbWUgPSB0aW1lU3RhbXBcclxuICB2YXIgcHJvZ3Jlc3MgPSAodGltZVN0YW1wIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uXHJcbiAgaWYgKHByb2dyZXNzIDw9IDEpIHtcclxuICAgICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvdHRvbSA9IDkwIC0gOTAgKiBwcm9ncmVzcyArICclJ1xyXG4gICAgICAkb3ZlclZpZXdCb3guc3R5bGUudG9wID0gLTkwICsgOTAgKiBwcm9ncmVzcyArICclJ1xyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNob3dNZW51VmVydClcclxuICB9IGVsc2Uge1xyXG4gICAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm90dG9tID0gMFxyXG4gICAgICAkb3ZlclZpZXdCb3guc3R5bGUudG9wID0gMFxyXG4gICAgICBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgICAgdHVybkFycm93TGVmdCgpXHJcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShzaG93TWVudUhvcilcclxuICB9XHJcbn1cclxuZnVuY3Rpb24gdHVybkFycm93TGVmdCgpIHtcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJUb3AgPSAnMWVtIHNvbGlkIHRyYW5zcGFyZW50J1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlclJpZ2h0ID0gJzVlbSBzb2xpZCAjNDhmJ1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlckJvdHRvbSA9ICcxZW0gc29saWQgdHJhbnNwYXJlbnQnXHJcbiAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm9yZGVyTGVmdCA9ICdub25lJ1xyXG59XHJcbmZ1bmN0aW9uIHNob3dNZW51SG9yICh0aW1lU3RhbXApIHtcclxuICBpZiAoIXN0YXJ0VGltZSkgc3RhcnRUaW1lID0gdGltZVN0YW1wXHJcbiAgdmFyIHByb2dyZXNzID0gKHRpbWVTdGFtcCAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvblxyXG4gIGlmIChwcm9ncmVzcyA8PSAxKSB7XHJcbiAgICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5yaWdodCA9IDEwMCAqIHByb2dyZXNzICsgJyUnXHJcbiAgICAgICRmb290ZXIuc3R5bGUubGVmdCA9IDEwMCAtIDEwMCAqIHByb2dyZXNzICsgJyUnXHJcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShzaG93TWVudUhvcilcclxuICB9IGVsc2Uge1xyXG4gICAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUucmlnaHQgPSAxMDAgKyAnJSdcclxuICAgICAgJGZvb3Rlci5zdHlsZS5sZWZ0ID0gMFxyXG4gICAgICBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgICAgdHVybkFycm93VG9Jbml0KClcclxuICB9XHJcbn1cclxuZnVuY3Rpb24gdHVybkFycm93VG9Jbml0KCkge1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlclRvcCA9ICcnXHJcbiAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm9yZGVyUmlnaHQgPSAnJ1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlckJvdHRvbSA9ICcnXHJcbiAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm9yZGVyTGVmdCA9ICcnXHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZSA9IHtcclxuICAgICckYm94JzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJveCcpLFxyXG4gICAgJyR2aWRlbyc6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlbycpLFxyXG4gICAgJyRzb3VyY2UnOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc291cmNlJyksXHJcbiAgICAnJHNsaWRlcic6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyX19zbGlkZXInKSxcclxuICAgICckZm9vdGVyJzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3RlcicpLFxyXG4gICAgJyRidG5IZWxwJzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fbGVmdF9faGVscCcpLFxyXG4gICAgJyRidG5QbGF5JzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fbGVmdF9fcGxheScpLFxyXG4gICAgJyRidG5Wb2x1bWUnOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19sZWZ0X192b2x1bWUnKSxcclxuICAgICckYnRuUXVhbGl0eSc6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX2xlZnRfX3F1YWxpdHknKSxcclxuICAgICckYnRuU2NhbGUnOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19yaWdodF9fc2NhbGUnKSxcclxuICAgICckYnRuQWxpZ24nOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19yaWdodF9fYWxpZ24nKSxcclxuICAgICckYnRuTWVudU9mZic6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX3JpZ2h0X19tZW51LW9mZicpLFxyXG4gICAgJyRidG5GdWxsU2NyJzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fcmlnaHRfX2Z1bGxzY3InKSxcclxuICAgICckYnRuTWVudU9uJzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnVfb25fb2ZmJyksXHJcbiAgICAnaXNWaWRlb1dvcmtpbmcnOiBmYWxzZSxcclxuICAgICdpc0FuaW1hdGlvbkFsbG93ZWQnOiBmYWxzZSxcclxuICAgICdpc0Z1bGxTY3JlZW5BbGxvd2VkJzogZmFsc2UsXHJcbiAgICAnZXhpdEZ1bGxTY3JlZW4nOiAnJyxcclxuICAgICdhY3RpdmUkaW5wdXQnOiBudWxsLFxyXG4gICAgJ2hpZ2hRdWFsaXR5JzogZmFsc2UsXHJcbiAgICAnYWxpZ25WZXJ0aWNhbCc6IGZhbHNlXHJcbiAgfTtcclxuICBcclxuICBhc2tGdWxsU2NyZWVuKClcclxuICBhc2tWaWRlb1dvcmtpbmcoKVxyXG4gIGFza0FuaW1hdGlvbkFsbG93ZWQoKVxyXG4gIFxyXG4gIHJlcXVpcmUoJy4vY2hhbm5lbFNlbGVjdG9yLmpzJylcclxuICByZXF1aXJlKCcuL3F1YWxpdHlTZWxlY3Rvci5qcycpXHJcbiAgcmVxdWlyZSgnLi9hbGlnblNlbGVjdG9yLmpzJylcclxuICByZXF1aXJlKCcuL2hpZGVTaG93TWVudS5qcycpXHJcbiAgcmVxdWlyZSgnLi9mdWxsc2NyZWVuLmpzJylcclxuICByZXF1aXJlKCcuL3ZpZGVvRXJyb3JMaXN0ZW5lcicpXHJcbi8vICByZXF1aXJlKCcuL2lQYWRDaGVja1NjcmVlblNpemUuanMnKVxyXG5cclxuICBmdW5jdGlvbiBhc2tWaWRlb1dvcmtpbmcoKSB7XHJcbiAgICAgIGlmKHR5cGVvZiB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvLnBsYXkgPT09ICdmdW5jdGlvbicgKSB7XHJcbiAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaXNWaWRlb1dvcmtpbmcgPSB0cnVlXHJcbiAgICAgICAgICBjb25zb2xlLmxvZygndmlkZW8gb2snKVxyXG4gICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmlzVmlkZW9Xb3JraW5nID0gZmFsc2VcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdubyB2aWRlbycpXHJcbiAgICAgIH1cclxuICB9XHJcbiAgZnVuY3Rpb24gYXNrQW5pbWF0aW9uQWxsb3dlZCAoKSB7XHJcbiAgICAgIGlmKHR5cGVvZiByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgID09PSAnZnVuY3Rpb24nKSB7XHJcbiAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaXNBbmltYXRpb25BbGxvd2VkID0gdHJ1ZVxyXG4gICAgICAgICAgY29uc29sZS5sb2coJ3JlcXVlc3RBbmltYXRpb25GcmFtZSBvaycpXHJcbiAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaXNBbmltYXRpb25BbGxvd2VkID0gZmFsc2VcclxuICAgICAgICAgIGNvbnNvbGUubG9nKCdubyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUnKVxyXG4gICAgICB9XHJcbiAgfVxyXG4gICAgZnVuY3Rpb24gYXNrRnVsbFNjcmVlbigpIHtcclxuICAgICAgICB2YXIgJGJveCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYm94XHJcbiAgICAgICAgaWYgKCRib3gucmVxdWVzdEZ1bGxzY3JlZW4gfHwgJGJveC5tb3pSZXF1ZXN0RnVsbFNjcmVlbiB8fCAkYm94LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuIHx8ICRib3gubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaXNGdWxsU2NyZWVuQWxsb3dlZCA9IHRydWUgXHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdGdWxsU2NyZWVuIG9rJylcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaXNGdWxsU2NyZWVuQWxsb3dlZCA9IGZhbHNlIFxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnTm8gZnVsbHNjcmVlbicpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG5cclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbnZhciAkYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fbGVmdF9fcXVhbGl0eScpXHJcbnZhciAkc2lnbkhRID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW3RpdGxlID0gaGlnaHRfcXVhbGl0eV0nKVxyXG52YXIgJHNpZ25MUSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1t0aXRsZSA9IGxvd19xdWFsaXR5XScpXHJcblxyXG5pZiAoJHNpZ25MUS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgd2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5ID0gZmFsc2VcclxufSBlbHNlIGlmICgkc2lnbkhRLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICB3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkgPSB0cnVlXHJcbn0gZWxzZSB7XHJcbiAgJHNpZ25MUS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSA9IGZhbHNlXHJcbn1cclxuXHJcbiRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVRdWFsaXR5KVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlUXVhbGl0eSAoZXZlbnQpIHtcclxuICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gIHZhciBsaW5rID0gdW5kZWZpbmVkXHJcbiAgaWYgKHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSkge1xyXG4gICAgJHNpZ25IUS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgJHNpZ25MUS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxyXG4gICAgd2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5ID0gZmFsc2VcclxuICAgIGlmICh3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0KSB7XHJcbiAgICAgIGxpbmsgPSB3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0LmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWxxJylcclxuICAgICAgd2luZG93LnZpZXdlclN0YXRlLiR2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kc291cmNlLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgd2luZG93LnZpZXdlclN0YXRlLiR2aWRlby5wbGF5KClcclxuICAgIH1cclxuICB9IGVsc2Uge1xyXG4gICAgJHNpZ25MUS5jbGFzc0xpc3QucmVtb3ZlKCdhY3RpdmUnKVxyXG4gICAgJHNpZ25IUS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxyXG4gICAgd2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5ID0gdHJ1ZVxyXG4gICAgaWYgKHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQpIHtcclxuICAgICAgbGluayA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmstaHEnKVxyXG4gICAgICB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgd2luZG93LnZpZXdlclN0YXRlLiRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvLnBsYXkoKVxyXG4gICAgfVxyXG4gIH1cclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbnZhciAkdmlkZW8gPSB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvXHJcblxyXG4kdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmYWlsZWQpXHJcblxyXG4gZnVuY3Rpb24gZmFpbGVkKGUpIHtcclxuICAgLy8gdmlkZW8gcGxheWJhY2sgZmFpbGVkIC0gc2hvdyBhIG1lc3NhZ2Ugc2F5aW5nIHdoeSAgICAgLSBmcm9tIGh0dHBzOi8vZGV2LnczLm9yZy9odG1sNS9zcGVjLWF1dGhvci12aWV3L3ZpZGVvLmh0bWwjdmlkZW9cclxuICAgc3dpdGNoIChlLnRhcmdldC5lcnJvci5jb2RlKSB7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfQUJPUlRFRDpcclxuICAgICAgIGFsZXJ0KCdZb3UgYWJvcnRlZCB0aGUgdmlkZW8gcGxheWJhY2suJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgICBjYXNlIGUudGFyZ2V0LmVycm9yLk1FRElBX0VSUl9ORVRXT1JLOlxyXG4gICAgICAgYWxlcnQoJ0EgbmV0d29yayBlcnJvciBjYXVzZWQgdGhlIHZpZGVvIGRvd25sb2FkIHRvIGZhaWwgcGFydC13YXkuJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgICBjYXNlIGUudGFyZ2V0LmVycm9yLk1FRElBX0VSUl9ERUNPREU6XHJcbiAgICAgICBhbGVydCgnVGhlIHZpZGVvIHBsYXliYWNrIHdhcyBhYm9ydGVkIGR1ZSB0byBhIGNvcnJ1cHRpb24gcHJvYmxlbSBvciBiZWNhdXNlIHRoZSB2aWRlbyB1c2VkIGZlYXR1cmVzIHlvdXIgYnJvd3NlciBkaWQgbm90IHN1cHBvcnQuJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgICBjYXNlIGUudGFyZ2V0LmVycm9yLk1FRElBX0VSUl9TUkNfTk9UX1NVUFBPUlRFRDpcclxuICAgICAgIGFsZXJ0KCdUaGUgdmlkZW8gY291bGQgbm90IGJlIGxvYWRlZCwgZWl0aGVyIGJlY2F1c2UgdGhlIHNlcnZlciBvciBuZXR3b3JrIGZhaWxlZCBvciBiZWNhdXNlIHRoZSBmb3JtYXQgaXMgbm90IHN1cHBvcnRlZC4nKTtcclxuICAgICAgIGJyZWFrO1xyXG4gICAgIGRlZmF1bHQ6XHJcbiAgICAgICBhbGVydCgnQW4gdW5rbm93biBlcnJvciBvY2N1cnJlZC4nKTtcclxuICAgICAgIGJyZWFrO1xyXG4gICB9XHJcbiB9XHJcbiJdfQ==
