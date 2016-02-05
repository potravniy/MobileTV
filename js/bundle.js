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
//test()
function test() {
    if ($box.requestFullscreen) {
      alert('requestFullscreen()')
    } else if ($box.requestFullScreen) {
      alert('requestFullScreen()')
    } else if ($box.webkitRequestFullscreen) {
      alert('webkitRequestFullscreen()')
    } else if ($box.webkitRequestFullScreen) {
      alert('webkitRequestFullScreen()')
    } else if ($box.mozRequestFullScreen) {
      alert('mozRequestFullScreen()')
    } else if ($box.mozRequestFullscreen) {
      alert('mozRequestFullscreen()')
    } else if ($box.msRequestFullscreen) {
      alert('msRequestFullscreen()')
    } else if ($box.webkitSupportsFullscreen) {
      alert('Safari!!! webkitSupportsFullscreen()')
    }
     else alert('No fullscreen')
}


if (
  $box.requestFullscreen ||
  $box.requestFullScreen ||
  $box.webkitRequestFullscreen ||
  $box.webkitRequestFullScreen ||
  $box.mozRequestFullScreen ||
  $box.mozRequestFullscreen ||
  $box.msRequestFullscreen
) {
  $btnFullScr.addEventListener('click', function () {
    if ($box.requestFullscreen) {
      $box.requestFullscreen()
    } else if ($box.requestFullScreen) {
      $box.requestFullScreen()
    } else if ($box.webkitRequestFullscreen) {
      $box.webkitRequestFullscreen()
    } else if ($box.webkitRequestFullScreen) {
      $box.webkitRequestFullScreen()
    } else if ($box.mozRequestFullScreen) {
      $box.mozRequestFullScreen()
    } else if ($box.mozRequestFullscreen) {
      $box.mozRequestFullscreen()
    } else if ($box.msRequestFullscreen) {
      $box.msRequestFullscreen()
    } else console.log('No fullscreen available')
  })
}       //else $btn.style.display = 'none'


document.addEventListener('fullscreenchange', hideShowControls)
document.addEventListener('webkitfullscreenchange', hideShowControls)
document.addEventListener('mozfullscreenchange', hideShowControls)
document.addEventListener('MSFullscreenChange', hideShowControls)

function hideShowControls () {
  if (
    document.fullscreenElement === $box ||
    document.webkitFullscreenElement === $box ||
    document.mozFullScreenElement === $box ||
    document.msFullscreenElement === $box
  ) {
    alert('Fullscreen on')
  } else {
    alert('Fullscreen off')
  }
}
},{}],4:[function(require,module,exports){
'use strict'

var $video = window.viewerState.$video
var $slider = window.viewerState.$slider
var $footer = window.viewerState.$footer
var $overViewBox = document.querySelector('.box-over-video')
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
    'active$input': null,
    'highQuality': false,
    'alignVertical': false
  };
  require('./channelSelector.js')
  require('./qualitySelector.js')
  require('./alignSelector.js')
  require('./hideShowMenu.js')
  require('./fullscreen.js')
  require('./videoErrorListener')
//  require('./iPadCheckScreenSize.js')
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2EwNS9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hbGlnblNlbGVjdG9yLmpzIiwianMvY2hhbm5lbFNlbGVjdG9yLmpzIiwianMvZnVsbHNjcmVlbi5qcyIsImpzL2hpZGVTaG93TWVudS5qcyIsImpzL21haW4uanMiLCJqcy9xdWFsaXR5U2VsZWN0b3IuanMiLCJqcy92aWRlb0Vycm9yTGlzdGVuZXIuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzlCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiXHJcblxyXG52YXIgJGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9vdGVyX19yaWdodF9fYWxpZ25cIilcclxudmFyICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8gXHJcblxyXG5pZigkYnRuLmNsYXNzTGlzdC5jb250YWlucyhcInZlcnRpY2FsXCIpKSB7XHJcbiAgICB3aW5kb3cudmlld2VyU3RhdGUuYWxpZ25WZXJ0aWNhbCA9IHRydWU7XHJcbn0gZWxzZSBpZigkYnRuLmNsYXNzTGlzdC5jb250YWlucyhcImhvcmlzb250YWxcIikpIHtcclxuICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5hbGlnblZlcnRpY2FsID0gZmFsc2U7XHJcbn0gZWxzZSB7XHJcbiAgICAkYnRuLmNsYXNzTGlzdC5hZGQoXCJ2ZXJ0aWNhbFwiKVxyXG4gICAgd2luZG93LnZpZXdlclN0YXRlLmFsaWduVmVydGljYWwgPSB0cnVlO1xyXG59XHJcbmZpdCgpXHJcblxyXG4kYnRuLmFkZEV2ZW50TGlzdGVuZXIoXCJjbGlja1wiLCB0b2dnbGVBbGlnbilcclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZUFsaWduKGV2ZW50KSB7XHJcbiAgICBpZih3aW5kb3cudmlld2VyU3RhdGUuYWxpZ25WZXJ0aWNhbCkge1xyXG4gICAgICAgICRidG4uY2xhc3NMaXN0LnJlbW92ZShcInZlcnRpY2FsXCIpXHJcbiAgICAgICAgJGJ0bi5jbGFzc0xpc3QuYWRkKFwiaG9yaXNvbnRhbFwiKVxyXG4gICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5hbGlnblZlcnRpY2FsID0gZmFsc2U7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICRidG4uY2xhc3NMaXN0LnJlbW92ZShcImhvcmlzb250YWxcIilcclxuICAgICAgICAkYnRuLmNsYXNzTGlzdC5hZGQoXCJ2ZXJ0aWNhbFwiKVxyXG4gICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5hbGlnblZlcnRpY2FsID0gdHJ1ZTtcclxuICAgIH1cclxuICAgIGZpdCgpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZpdCgpIHtcclxuICAgIGlmKCRidG4uY2xhc3NMaXN0LmNvbnRhaW5zKFwidmVydGljYWxcIikpIHtcclxuICAgICAgICAkdmlkZW8uc3R5bGUud2lkdGggPSAnMTAwJSdcclxuICAgICAgICAkdmlkZW8uc3R5bGUuaGVpZ2h0ID0gJzEwMCUnXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICR2aWRlby5zdHlsZS53aWR0aCA9ICcxMDAlJ1xyXG4gICAgICAgICR2aWRlby5zdHlsZS5oZWlnaHQgPSAnYXV0bydcclxuICAgIH1cclxufSIsIlwidXNlIHN0cmljdFwiXHJcblxyXG52YXIgJHZpZGVvID0gd2luZG93LnZpZXdlclN0YXRlLiR2aWRlb1xyXG52YXIgJHNvdXJjZSA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc291cmNlXHJcbnZhciAkc2xpZGVyID0gd2luZG93LnZpZXdlclN0YXRlLiRzbGlkZXJcclxudmFyIGFjdGl2ZSRpbnB1dCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXRcclxudmFyICRidG5NZW51T25PZiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX3JpZ2h0X19tZW51LW9mZicpXHJcbnZhciAkYnRuQWxpZ24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19yaWdodF9fYWxpZ24nKVxyXG52YXIgbGluayA9ICcnXHJcbnZhciAkYnRucyA9IHtcclxuICAgIFwiY2hfMWdvcm9kc2tveVwiOiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF8xZ29yb2Rza295XCIpLFxyXG4gICAgXCJjaF8zdHN5ZnJvdm95XCI6ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoXzN0c3lmcm92b3lcIiksXHJcbiAgICBcImNoX3JlcG9ydGVyXCI6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfcmVwb3J0ZXJcIiksXHJcbiAgICBcImNoX2FjYWRlbWlhXCI6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfYWNhZGVtaWFcIiksXHJcbiAgICBcImNoX2ExXCI6ICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfYTFcIiksXHJcbiAgICBcImNoX2R1bXNrYXlhXCI6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfZHVtc2theWFcIiksXHJcbiAgICBcImNoX2d0dlwiOiAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfZ3R2XCIpLFxyXG4gICAgXCJjaF9zdHZcIjogICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX3N0dlwiKSxcclxuICAgIFwiY2hfdWduYXlhdm9sbmFcIjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF91Z25heWF2b2xuYVwiKSxcclxuICAgIFwiY2hfbmVtb1wiOiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9uZW1vXCIpXHJcbn1cclxuJGJ0bnMuY2hfMWdvcm9kc2tveS5zZXRBdHRyaWJ1dGUoICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxLzF0dm9kLzF0dm9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgICAgKVxyXG4kYnRucy5jaF8zdHN5ZnJvdm95LnNldEF0dHJpYnV0ZSggICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly9jZG41LmxpdmUtdHYub2QudWE6ODA4MS90di8zdHZvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiICApXHJcbiRidG5zLmNoX3JlcG9ydGVyLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovL2NkbjQubGl2ZS10di5vZC51YTo4MDgxL3R2LzMxY2hvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiIClcclxuJGJ0bnMuY2hfYWNhZGVtaWEuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vY2RuNC5saXZlLXR2Lm9kLnVhOjgwODEvdHYvMzZjaG9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgKVxyXG4kYnRucy5jaF9hMS5zZXRBdHRyaWJ1dGUoICAgICAgICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvYTFvZC9hMW9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgICAgICApXHJcbiRidG5zLmNoX2R1bXNrYXlhLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzg6ODA4MS9kdW1za2EvZHVtc2thLWFici1scS9wbGF5bGlzdC5tM3U4XCIgIClcclxuJGJ0bnMuY2hfZ3R2LnNldEF0dHJpYnV0ZSggICAgICAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL2Exb2QvZ3R2b2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICAgKVxyXG4kYnRucy5jaF9zdHYuc2V0QXR0cmlidXRlKCAgICAgICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvc3R2b2Qvc3R2b2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICApXHJcbiRidG5zLmNoX3VnbmF5YXZvbG5hLnNldEF0dHJpYnV0ZSggJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS93YXZlL3dhdmUtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICAgIClcclxuJGJ0bnMuY2hfbmVtby5zZXRBdHRyaWJ1dGUoICAgICAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL25lbW8vbW9yLXN1Yi9wbGF5bGlzdC5tM3U4XCIgICAgICAgICAgKVxyXG5cclxuJGJ0bnMuY2hfMWdvcm9kc2tveS5zZXRBdHRyaWJ1dGUoICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxLzF0dm9kLzF0dm9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgKVxyXG4kYnRucy5jaF8zdHN5ZnJvdm95LnNldEF0dHJpYnV0ZSggICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly9jZG41LmxpdmUtdHYub2QudWE6ODA4MS90di8zdHZvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgICApXHJcbiRidG5zLmNoX3JlcG9ydGVyLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovL2NkbjQubGl2ZS10di5vZC51YTo4MDgxL3R2LzMxY2hvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgIClcclxuJGJ0bnMuY2hfYWNhZGVtaWEuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vY2RuNC5saXZlLXR2Lm9kLnVhOjgwODEvdHYvMzZjaG9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgKVxyXG4kYnRucy5jaF9hMS5zZXRBdHRyaWJ1dGUoICAgICAgICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvYTFvZC9hMW9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgICApXHJcbiRidG5zLmNoX2R1bXNrYXlhLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzg6ODA4MS9kdW1za2EvZHVtc2thLWFici9wbGF5bGlzdC5tM3U4XCIgICAgIClcclxuJGJ0bnMuY2hfZ3R2LnNldEF0dHJpYnV0ZSggICAgICAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL2Exb2QvZ3R2b2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICAgKVxyXG4kYnRucy5jaF9zdHYuc2V0QXR0cmlidXRlKCAgICAgICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvc3R2b2Qvc3R2b2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICApXHJcbiRidG5zLmNoX3VnbmF5YXZvbG5hLnNldEF0dHJpYnV0ZSggJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS93YXZlL3dhdmUtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICAgIClcclxuJGJ0bnMuY2hfbmVtby5zZXRBdHRyaWJ1dGUoICAgICAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL25lbW8vbW9yLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgICAgKVxyXG5cclxuJHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgIHZhciBzcmNFbGVtZW50ID0gZXZlbnQuc3JjRWxlbWVudCA/IGV2ZW50LnNyY0VsZW1lbnQgOiBldmVudC50YXJnZXRcclxuICAgIGlmKHNyY0VsZW1lbnQudGFnTmFtZSA9PT0gJ0lOUFVUJyl7XHJcbiAgICAgICAgaWYoYWN0aXZlJGlucHV0ID09PSBzcmNFbGVtZW50KSB7XHJcbiAgICAgICAgICAgIGFjdGl2ZSRpbnB1dC5jaGVja2VkID0gZmFsc2VcclxuICAgICAgICAgICAgYWN0aXZlJGlucHV0ID0gbnVsbFxyXG4gICAgICAgICAgICAkdmlkZW8uc3R5bGUuYmFja2dyb3VuZFNpemUgPSBcIlwiXHJcbiAgICAgICAgICAgICR2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsICcnKVxyXG4gICAgICAgICAgICAkc291cmNlLnNldEF0dHJpYnV0ZSgnc3JjJywgJycpXHJcbiAgICAgICAgICAgICRidG5NZW51T25PZi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgICAgICRidG5BbGlnbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgYWN0aXZlJGlucHV0ID0gc3JjRWxlbWVudFxyXG4gICAgICAgICAgICBpZih3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkpICBsaW5rID0gc3JjRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1ocScpXHJcbiAgICAgICAgICAgIGVsc2UgbGluayA9IHNyY0VsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmstbHEnKVxyXG4gICAgICAgICAgICAkdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICAgICAgICAkc291cmNlLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgICAgICAgJHZpZGVvLnN0eWxlLmJhY2tncm91bmRTaXplID0gXCIwIDBcIlxyXG4gICAgICAgICAgICBpZigkdmlkZW8ucGxheSkgJHZpZGVvLnBsYXkoKTtcclxuICAgICAgICAgICAgZWxzZSBhbGVydCAoJ3ZpZGVvIGNhbm5vdCBwbGF5JylcclxuICAgICAgICAgICAgJGJ0bk1lbnVPbk9mLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJ1xyXG4gICAgICAgICAgICAkYnRuQWxpZ24uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbnZhciAkYnRuRnVsbFNjciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuRnVsbFNjclxyXG52YXIgJGJveCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYm94XHJcbi8vdGVzdCgpXHJcbmZ1bmN0aW9uIHRlc3QoKSB7XHJcbiAgICBpZiAoJGJveC5yZXF1ZXN0RnVsbHNjcmVlbikge1xyXG4gICAgICBhbGVydCgncmVxdWVzdEZ1bGxzY3JlZW4oKScpXHJcbiAgICB9IGVsc2UgaWYgKCRib3gucmVxdWVzdEZ1bGxTY3JlZW4pIHtcclxuICAgICAgYWxlcnQoJ3JlcXVlc3RGdWxsU2NyZWVuKCknKVxyXG4gICAgfSBlbHNlIGlmICgkYm94LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XHJcbiAgICAgIGFsZXJ0KCd3ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpJylcclxuICAgIH0gZWxzZSBpZiAoJGJveC53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbikge1xyXG4gICAgICBhbGVydCgnd2Via2l0UmVxdWVzdEZ1bGxTY3JlZW4oKScpXHJcbiAgICB9IGVsc2UgaWYgKCRib3gubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcclxuICAgICAgYWxlcnQoJ21velJlcXVlc3RGdWxsU2NyZWVuKCknKVxyXG4gICAgfSBlbHNlIGlmICgkYm94Lm1velJlcXVlc3RGdWxsc2NyZWVuKSB7XHJcbiAgICAgIGFsZXJ0KCdtb3pSZXF1ZXN0RnVsbHNjcmVlbigpJylcclxuICAgIH0gZWxzZSBpZiAoJGJveC5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XHJcbiAgICAgIGFsZXJ0KCdtc1JlcXVlc3RGdWxsc2NyZWVuKCknKVxyXG4gICAgfSBlbHNlIGlmICgkYm94LndlYmtpdFN1cHBvcnRzRnVsbHNjcmVlbikge1xyXG4gICAgICBhbGVydCgnU2FmYXJpISEhIHdlYmtpdFN1cHBvcnRzRnVsbHNjcmVlbigpJylcclxuICAgIH1cclxuICAgICBlbHNlIGFsZXJ0KCdObyBmdWxsc2NyZWVuJylcclxufVxyXG5cclxuXHJcbmlmIChcclxuICAkYm94LnJlcXVlc3RGdWxsc2NyZWVuIHx8XHJcbiAgJGJveC5yZXF1ZXN0RnVsbFNjcmVlbiB8fFxyXG4gICRib3gud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4gfHxcclxuICAkYm94LndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuIHx8XHJcbiAgJGJveC5tb3pSZXF1ZXN0RnVsbFNjcmVlbiB8fFxyXG4gICRib3gubW96UmVxdWVzdEZ1bGxzY3JlZW4gfHxcclxuICAkYm94Lm1zUmVxdWVzdEZ1bGxzY3JlZW5cclxuKSB7XHJcbiAgJGJ0bkZ1bGxTY3IuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICBpZiAoJGJveC5yZXF1ZXN0RnVsbHNjcmVlbikge1xyXG4gICAgICAkYm94LnJlcXVlc3RGdWxsc2NyZWVuKClcclxuICAgIH0gZWxzZSBpZiAoJGJveC5yZXF1ZXN0RnVsbFNjcmVlbikge1xyXG4gICAgICAkYm94LnJlcXVlc3RGdWxsU2NyZWVuKClcclxuICAgIH0gZWxzZSBpZiAoJGJveC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xyXG4gICAgICAkYm94LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKClcclxuICAgIH0gZWxzZSBpZiAoJGJveC53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbikge1xyXG4gICAgICAkYm94LndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuKClcclxuICAgIH0gZWxzZSBpZiAoJGJveC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xyXG4gICAgICAkYm94Lm1velJlcXVlc3RGdWxsU2NyZWVuKClcclxuICAgIH0gZWxzZSBpZiAoJGJveC5tb3pSZXF1ZXN0RnVsbHNjcmVlbikge1xyXG4gICAgICAkYm94Lm1velJlcXVlc3RGdWxsc2NyZWVuKClcclxuICAgIH0gZWxzZSBpZiAoJGJveC5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XHJcbiAgICAgICRib3gubXNSZXF1ZXN0RnVsbHNjcmVlbigpXHJcbiAgICB9IGVsc2UgY29uc29sZS5sb2coJ05vIGZ1bGxzY3JlZW4gYXZhaWxhYmxlJylcclxuICB9KVxyXG59ICAgICAgIC8vZWxzZSAkYnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuXHJcblxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdmdWxsc2NyZWVuY2hhbmdlJywgaGlkZVNob3dDb250cm9scylcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsIGhpZGVTaG93Q29udHJvbHMpXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLCBoaWRlU2hvd0NvbnRyb2xzKVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdNU0Z1bGxzY3JlZW5DaGFuZ2UnLCBoaWRlU2hvd0NvbnRyb2xzKVxyXG5cclxuZnVuY3Rpb24gaGlkZVNob3dDb250cm9scyAoKSB7XHJcbiAgaWYgKFxyXG4gICAgZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQgPT09ICRib3ggfHxcclxuICAgIGRvY3VtZW50LndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50ID09PSAkYm94IHx8XHJcbiAgICBkb2N1bWVudC5tb3pGdWxsU2NyZWVuRWxlbWVudCA9PT0gJGJveCB8fFxyXG4gICAgZG9jdW1lbnQubXNGdWxsc2NyZWVuRWxlbWVudCA9PT0gJGJveFxyXG4gICkge1xyXG4gICAgYWxlcnQoJ0Z1bGxzY3JlZW4gb24nKVxyXG4gIH0gZWxzZSB7XHJcbiAgICBhbGVydCgnRnVsbHNjcmVlbiBvZmYnKVxyXG4gIH1cclxufSIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW9cclxudmFyICRzbGlkZXIgPSB3aW5kb3cudmlld2VyU3RhdGUuJHNsaWRlclxyXG52YXIgJGZvb3RlciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kZm9vdGVyXHJcbnZhciAkb3ZlclZpZXdCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm94LW92ZXItdmlkZW8nKVxyXG52YXIgJGJ0bk1lbnVPZmYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19yaWdodF9fbWVudS1vZmYnKVxyXG52YXIgJGFycm93TWVudU9uT2ZmID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnVfb25fb2ZmJylcclxudmFyICRhcnJvd1RleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9vbl9vZmZfX3RleHQnKVxyXG52YXIgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbnZhciBkdXJhdGlvbiA9IDEwMDAgLy8gIG1zXHJcbnZhciBkdXJhdGlvbl9mYXN0ID0gNTAwIC8vICBtc1xyXG5cclxuJGJ0bk1lbnVPZmYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGlkZU1lbnVIb3IpXHJcbn0pXHJcbiRhcnJvd01lbnVPbk9mZi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJUb3BDb2xvciA9ICAnIzQ4Zic7XHJcbiAgICAkYXJyb3dUZXh0LmlubmVyVGV4dCA9ICcnXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2hvd01lbnVWZXJ0KVxyXG59KVxyXG5cclxuZnVuY3Rpb24gaGlkZU1lbnVIb3IgKHRpbWVTdGFtcCkge1xyXG4gIGlmICghc3RhcnRUaW1lKSBzdGFydFRpbWUgPSB0aW1lU3RhbXBcclxuICB2YXIgcHJvZ3Jlc3MgPSAodGltZVN0YW1wIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uXHJcbiAgaWYgKHByb2dyZXNzIDw9IDEpIHtcclxuICAgICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLnJpZ2h0ID0gMTAwIC0gMTAwICogcHJvZ3Jlc3MgKyAnJSdcclxuICAgICAgJGZvb3Rlci5zdHlsZS5sZWZ0ID0gMTAwICogcHJvZ3Jlc3MgKyAnJSdcclxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhpZGVNZW51SG9yKVxyXG4gIH0gZWxzZSB7XHJcbiAgICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5yaWdodCA9IDBcclxuICAgICAgJGZvb3Rlci5zdHlsZS5sZWZ0ID0gMTAwICsgJyUnXHJcbiAgICAgIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgICB0dXJuQXJyb3dVcCgpXHJcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShoaWRlTWVudVZlcnQpXHJcbiAgfVxyXG59XHJcbmZ1bmN0aW9uIHR1cm5BcnJvd1VwKCkge1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlclRvcCA9ICdub25lJ1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlclJpZ2h0ID0gJzIuNWVtIHNvbGlkIHRyYW5zcGFyZW50J1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlckJvdHRvbSA9ICcyZW0gc29saWQgIzQ4ZidcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJMZWZ0ID0gJzIuNWVtIHNvbGlkIHRyYW5zcGFyZW50J1xyXG59XHJcblxyXG5mdW5jdGlvbiBoaWRlTWVudVZlcnQodGltZVN0YW1wKSB7XHJcbiAgaWYgKCFzdGFydFRpbWUpIHN0YXJ0VGltZSA9IHRpbWVTdGFtcFxyXG4gIHZhciBwcm9ncmVzcyA9ICh0aW1lU3RhbXAgLSBzdGFydFRpbWUpIC8gZHVyYXRpb25cclxuICBpZiAocHJvZ3Jlc3MgPD0gMSkge1xyXG4gICAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm90dG9tID0gMTAwICogcHJvZ3Jlc3MgKyAnJSdcclxuICAgICAgJG92ZXJWaWV3Qm94LnN0eWxlLnRvcCA9IC0xMDAgKiBwcm9ncmVzcyArICclJ1xyXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGlkZU1lbnVWZXJ0KVxyXG4gIH0gZWxzZSB7XHJcbiAgICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3R0b20gPSAxMDAgKyAnJSdcclxuICAgICAgJG92ZXJWaWV3Qm94LnN0eWxlLnRvcCA9IC05MCArICclJ1xyXG4gICAgICBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgICAgdHVybkFycm93RG9udygpXHJcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShkcm9wRG93bilcclxuICB9XHJcbn1cclxuZnVuY3Rpb24gdHVybkFycm93RG9udygpIHtcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJUb3AgPSAnMmVtIHNvbGlkICM0OGYnXHJcbiAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm9yZGVyUmlnaHQgPSAnMi41ZW0gc29saWQgdHJhbnNwYXJlbnQnXHJcbiAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm9yZGVyQm90dG9tID0gJ25vbmUnXHJcbiAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm9yZGVyTGVmdCA9ICcyLjVlbSBzb2xpZCB0cmFuc3BhcmVudCdcclxufVxyXG5mdW5jdGlvbiBkcm9wRG93bih0aW1lU3RhbXApIHtcclxuICBpZiAoIXN0YXJ0VGltZSkgc3RhcnRUaW1lID0gdGltZVN0YW1wXHJcbiAgdmFyIHByb2dyZXNzID0gKHRpbWVTdGFtcCAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvbl9mYXN0XHJcbiAgaWYgKHByb2dyZXNzIDw9IDEpIHtcclxuICAgICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvdHRvbSA9IDEwMCAtIDEwICogcHJvZ3Jlc3MgKyAnJSdcclxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyb3BEb3duKVxyXG4gIH0gZWxzZSB7XHJcbiAgICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3R0b20gPSA5MCArICclJ1xyXG4gICAgICBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICRhcnJvd1RleHQuaW5uZXJUZXh0ID0gJ21lbnUnXHJcbiAgICAgICAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm9yZGVyVG9wQ29sb3IgPSAgJ3JnYmEoNjgsIDEzNiwgMjU1LCAwLjMpJztcclxuICAgICAgfSwgMzAwKTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gc2hvd01lbnVWZXJ0ICh0aW1lU3RhbXApIHtcclxuICBpZiAoIXN0YXJ0VGltZSkgc3RhcnRUaW1lID0gdGltZVN0YW1wXHJcbiAgdmFyIHByb2dyZXNzID0gKHRpbWVTdGFtcCAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvblxyXG4gIGlmIChwcm9ncmVzcyA8PSAxKSB7XHJcbiAgICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3R0b20gPSA5MCAtIDkwICogcHJvZ3Jlc3MgKyAnJSdcclxuICAgICAgJG92ZXJWaWV3Qm94LnN0eWxlLnRvcCA9IC05MCArIDkwICogcHJvZ3Jlc3MgKyAnJSdcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShzaG93TWVudVZlcnQpXHJcbiAgfSBlbHNlIHtcclxuICAgICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvdHRvbSA9IDBcclxuICAgICAgJG92ZXJWaWV3Qm94LnN0eWxlLnRvcCA9IDBcclxuICAgICAgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAgIHR1cm5BcnJvd0xlZnQoKVxyXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2hvd01lbnVIb3IpXHJcbiAgfVxyXG59XHJcbmZ1bmN0aW9uIHR1cm5BcnJvd0xlZnQoKSB7XHJcbiAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm9yZGVyVG9wID0gJzFlbSBzb2xpZCB0cmFuc3BhcmVudCdcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJSaWdodCA9ICc1ZW0gc29saWQgIzQ4ZidcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJCb3R0b20gPSAnMWVtIHNvbGlkIHRyYW5zcGFyZW50J1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlckxlZnQgPSAnbm9uZSdcclxufVxyXG5mdW5jdGlvbiBzaG93TWVudUhvciAodGltZVN0YW1wKSB7XHJcbiAgaWYgKCFzdGFydFRpbWUpIHN0YXJ0VGltZSA9IHRpbWVTdGFtcFxyXG4gIHZhciBwcm9ncmVzcyA9ICh0aW1lU3RhbXAgLSBzdGFydFRpbWUpIC8gZHVyYXRpb25cclxuICBpZiAocHJvZ3Jlc3MgPD0gMSkge1xyXG4gICAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUucmlnaHQgPSAxMDAgKiBwcm9ncmVzcyArICclJ1xyXG4gICAgICAkZm9vdGVyLnN0eWxlLmxlZnQgPSAxMDAgLSAxMDAgKiBwcm9ncmVzcyArICclJ1xyXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2hvd01lbnVIb3IpXHJcbiAgfSBlbHNlIHtcclxuICAgICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLnJpZ2h0ID0gMTAwICsgJyUnXHJcbiAgICAgICRmb290ZXIuc3R5bGUubGVmdCA9IDBcclxuICAgICAgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAgIHR1cm5BcnJvd1RvSW5pdCgpXHJcbiAgfVxyXG59XHJcbmZ1bmN0aW9uIHR1cm5BcnJvd1RvSW5pdCgpIHtcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJUb3AgPSAnJ1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlclJpZ2h0ID0gJydcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJCb3R0b20gPSAnJ1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlckxlZnQgPSAnJ1xyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICB3aW5kb3cudmlld2VyU3RhdGUgPSB7XHJcbiAgICAnJGJveCc6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib3gnKSxcclxuICAgICckdmlkZW8nOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW8nKSxcclxuICAgICckc291cmNlJzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNvdXJjZScpLFxyXG4gICAgJyRzbGlkZXInOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcl9fc2xpZGVyJyksXHJcbiAgICAnJGZvb3Rlcic6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXInKSxcclxuICAgICckYnRuSGVscCc6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX2xlZnRfX2hlbHAnKSxcclxuICAgICckYnRuUGxheSc6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX2xlZnRfX3BsYXknKSxcclxuICAgICckYnRuVm9sdW1lJzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fbGVmdF9fdm9sdW1lJyksXHJcbiAgICAnJGJ0blF1YWxpdHknOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19sZWZ0X19xdWFsaXR5JyksXHJcbiAgICAnJGJ0blNjYWxlJzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fcmlnaHRfX3NjYWxlJyksXHJcbiAgICAnJGJ0bkFsaWduJzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fcmlnaHRfX2FsaWduJyksXHJcbiAgICAnJGJ0bk1lbnVPZmYnOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19yaWdodF9fbWVudS1vZmYnKSxcclxuICAgICckYnRuRnVsbFNjcic6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX3JpZ2h0X19mdWxsc2NyJyksXHJcbiAgICAnJGJ0bk1lbnVPbic6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X29uX29mZicpLFxyXG4gICAgJ2FjdGl2ZSRpbnB1dCc6IG51bGwsXHJcbiAgICAnaGlnaFF1YWxpdHknOiBmYWxzZSxcclxuICAgICdhbGlnblZlcnRpY2FsJzogZmFsc2VcclxuICB9O1xyXG4gIHJlcXVpcmUoJy4vY2hhbm5lbFNlbGVjdG9yLmpzJylcclxuICByZXF1aXJlKCcuL3F1YWxpdHlTZWxlY3Rvci5qcycpXHJcbiAgcmVxdWlyZSgnLi9hbGlnblNlbGVjdG9yLmpzJylcclxuICByZXF1aXJlKCcuL2hpZGVTaG93TWVudS5qcycpXHJcbiAgcmVxdWlyZSgnLi9mdWxsc2NyZWVuLmpzJylcclxuICByZXF1aXJlKCcuL3ZpZGVvRXJyb3JMaXN0ZW5lcicpXHJcbi8vICByZXF1aXJlKCcuL2lQYWRDaGVja1NjcmVlblNpemUuanMnKVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyICRidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19sZWZ0X19xdWFsaXR5JylcclxudmFyICRzaWduSFEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbdGl0bGUgPSBoaWdodF9xdWFsaXR5XScpXHJcbnZhciAkc2lnbkxRID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW3RpdGxlID0gbG93X3F1YWxpdHldJylcclxuXHJcbmlmICgkc2lnbkxRLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICB3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkgPSBmYWxzZVxyXG59IGVsc2UgaWYgKCRzaWduSFEuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSA9IHRydWVcclxufSBlbHNlIHtcclxuICAkc2lnbkxRLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgd2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5ID0gZmFsc2VcclxufVxyXG5cclxuJGJ0bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZVF1YWxpdHkpXHJcblxyXG5mdW5jdGlvbiB0b2dnbGVRdWFsaXR5IChldmVudCkge1xyXG4gIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgdmFyIGxpbmsgPSB1bmRlZmluZWRcclxuICBpZiAod2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5KSB7XHJcbiAgICAkc2lnbkhRLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcbiAgICAkc2lnbkxRLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgICB3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkgPSBmYWxzZVxyXG4gICAgaWYgKHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQpIHtcclxuICAgICAgbGluayA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmstbHEnKVxyXG4gICAgICB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgd2luZG93LnZpZXdlclN0YXRlLiRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvLnBsYXkoKVxyXG4gICAgfVxyXG4gIH0gZWxzZSB7XHJcbiAgICAkc2lnbkxRLmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpXHJcbiAgICAkc2lnbkhRLmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpXHJcbiAgICB3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkgPSB0cnVlXHJcbiAgICBpZiAod2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dCkge1xyXG4gICAgICBsaW5rID0gd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1ocScpXHJcbiAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICB3aW5kb3cudmlld2VyU3RhdGUuJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8ucGxheSgpXHJcbiAgICB9XHJcbiAgfVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW9cclxuXHJcbiR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZhaWxlZClcclxuXHJcbiBmdW5jdGlvbiBmYWlsZWQoZSkge1xyXG4gICAvLyB2aWRlbyBwbGF5YmFjayBmYWlsZWQgLSBzaG93IGEgbWVzc2FnZSBzYXlpbmcgd2h5ICAgICAtIGZyb20gaHR0cHM6Ly9kZXYudzMub3JnL2h0bWw1L3NwZWMtYXV0aG9yLXZpZXcvdmlkZW8uaHRtbCN2aWRlb1xyXG4gICBzd2l0Y2ggKGUudGFyZ2V0LmVycm9yLmNvZGUpIHtcclxuICAgICBjYXNlIGUudGFyZ2V0LmVycm9yLk1FRElBX0VSUl9BQk9SVEVEOlxyXG4gICAgICAgYWxlcnQoJ1lvdSBhYm9ydGVkIHRoZSB2aWRlbyBwbGF5YmFjay4nKTtcclxuICAgICAgIGJyZWFrO1xyXG4gICAgIGNhc2UgZS50YXJnZXQuZXJyb3IuTUVESUFfRVJSX05FVFdPUks6XHJcbiAgICAgICBhbGVydCgnQSBuZXR3b3JrIGVycm9yIGNhdXNlZCB0aGUgdmlkZW8gZG93bmxvYWQgdG8gZmFpbCBwYXJ0LXdheS4nKTtcclxuICAgICAgIGJyZWFrO1xyXG4gICAgIGNhc2UgZS50YXJnZXQuZXJyb3IuTUVESUFfRVJSX0RFQ09ERTpcclxuICAgICAgIGFsZXJ0KCdUaGUgdmlkZW8gcGxheWJhY2sgd2FzIGFib3J0ZWQgZHVlIHRvIGEgY29ycnVwdGlvbiBwcm9ibGVtIG9yIGJlY2F1c2UgdGhlIHZpZGVvIHVzZWQgZmVhdHVyZXMgeW91ciBicm93c2VyIGRpZCBub3Qgc3VwcG9ydC4nKTtcclxuICAgICAgIGJyZWFrO1xyXG4gICAgIGNhc2UgZS50YXJnZXQuZXJyb3IuTUVESUFfRVJSX1NSQ19OT1RfU1VQUE9SVEVEOlxyXG4gICAgICAgYWxlcnQoJ1RoZSB2aWRlbyBjb3VsZCBub3QgYmUgbG9hZGVkLCBlaXRoZXIgYmVjYXVzZSB0aGUgc2VydmVyIG9yIG5ldHdvcmsgZmFpbGVkIG9yIGJlY2F1c2UgdGhlIGZvcm1hdCBpcyBub3Qgc3VwcG9ydGVkLicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgICAgZGVmYXVsdDpcclxuICAgICAgIGFsZXJ0KCdBbiB1bmtub3duIGVycm9yIG9jY3VycmVkLicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgIH1cclxuIH1cclxuIl19
