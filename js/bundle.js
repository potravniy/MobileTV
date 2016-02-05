(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict"

var $btn = document.querySelector(".footer__btns__align")
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
var $btnMenuOnOf = document.querySelector('.footer__btns__menu-off')
var $btnAlign = document.querySelector('.footer__btns__align')
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

// var $btn = document.querySelector('.footer__btns__fullscr')
var $video = window.viewerState.$video
test()
function test() {
    if ($video.requestFullscreen) {
      alert('requestFullscreen()')
    } else if ($video.requestFullScreen) {
      alert('requestFullScreen()')
    } else if ($video.webkitRequestFullscreen) {
      alert('webkitRequestFullscreen()')
    } else if ($video.webkitRequestFullScreen) {
      alert('webkitRequestFullScreen()')
    } else if ($video.mozRequestFullScreen) {
      alert('mozRequestFullScreen()')
    } else if ($video.mozRequestFullscreen) {
      alert('mozRequestFullscreen()')
    } else if ($video.msRequestFullscreen) {
      alert('msRequestFullscreen()')
    } else if ($video.webkitSupportsFullscreen) {
      alert('Safari!!! webkitSupportsFullscreen()')
    }
     else alert('No fullscreen')
}


// if (
//   document.fullscreenEnabled ||
//   document.webkitFullscreenEnabled ||
//   document.mozFullScreenEnabled ||
//   document.msFullscreenEnabled
// ) {
//   $btn.addEventListener('click', function () {
//     if ($video.requestFullscreen) {
//       $video.requestFullscreen()
//     } else if ($video.requestFullScreen) {
//       $video.requestFullScreen()
//     } else if ($video.webkitRequestFullscreen) {
//       $video.webkitRequestFullscreen()
//     } else if ($video.webkitRequestFullScreen) {
//       $video.webkitRequestFullScreen()
//     } else if ($video.mozRequestFullScreen) {
//       $video.mozRequestFullScreen()
//     } else if ($video.mozRequestFullscreen) {
//       $video.mozRequestFullscreen()
//     } else if ($video.msRequestFullscreen) {
//       $video.msRequestFullscreen()
//     }
//     console.log('Fullscreen allawed')
//   })
// } console.log('No fullscreen')      //else $btn.style.display = 'none'


// document.addEventListener('fullscreenchange', hideShowControls)
// document.addEventListener('webkitfullscreenchange', hideShowControls)
// document.addEventListener('mozfullscreenchange', hideShowControls)
// document.addEventListener('MSFullscreenChange', hideShowControls)

// function hideShowControls () {
//   if (
//     document.fullscreenElement === $video ||
//     document.webkitFullscreenElement === $video ||
//     document.mozFullScreenElement === $video ||
//     document.msFullscreenElement === $video
//   ) {
//     $video.controls = true
//   } else {
//     $video.controls = false
//   }
// }
},{}],4:[function(require,module,exports){
'use strict'

var $video = window.viewerState.$video
var $slider = window.viewerState.$slider
var $footer = window.viewerState.$footer
var $overViewBox = document.querySelector('.box-over-view')
var $btnMenuOff = document.querySelector('.footer__btns__menu-off')
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
alert(' availHeight: ' + window.screen.availHeight + '\n innerHeight: ' + window.innerHeight
      + "\n window.navigator.userAgent.indexOf('iPhone'): " + window.navigator.userAgent.indexOf('iPhone')
      + "\n window.navigator.userAgent.indexOf('iPad'): " + window.navigator.userAgent.indexOf('iPad')
      + "\n window.navigator.userAgent.indexOf('Safari'): " + window.navigator.userAgent.indexOf('Safari')
      + "\n window.navigator.userAgent: " + window.navigator.userAgent)

},{}],6:[function(require,module,exports){
'use strict'

window.onload = function () {
  window.viewerState = {
    '$slider': document.querySelector(".sidebar__slider"),
    '$footer': document.querySelector(".footer"),
    '$video': document.querySelector('#view'),
    '$source': document.querySelector("#source"),
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
  require('./iPadCheckScreenSize.js')
}

},{"./alignSelector.js":1,"./channelSelector.js":2,"./fullscreen.js":3,"./hideShowMenu.js":4,"./iPadCheckScreenSize.js":5,"./qualitySelector.js":7,"./videoErrorListener":8}],7:[function(require,module,exports){
'use strict'

var $btn = document.querySelector('.footer__btns__quality')
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

},{}],8:[function(require,module,exports){
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

},{}]},{},[6])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2EwNS9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hbGlnblNlbGVjdG9yLmpzIiwianMvY2hhbm5lbFNlbGVjdG9yLmpzIiwianMvZnVsbHNjcmVlbi5qcyIsImpzL2hpZGVTaG93TWVudS5qcyIsImpzL2lQYWRDaGVja1NjcmVlblNpemUuanMiLCJqcy9tYWluLmpzIiwianMvcXVhbGl0eVNlbGVjdG9yLmpzIiwianMvdmlkZW9FcnJvckxpc3RlbmVyLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdEVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUhBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNMQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCJcclxuXHJcbnZhciAkYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5mb290ZXJfX2J0bnNfX2FsaWduXCIpXHJcbnZhciAkdmlkZW8gPSB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvIFxyXG5cclxuaWYoJGJ0bi5jbGFzc0xpc3QuY29udGFpbnMoXCJ2ZXJ0aWNhbFwiKSkge1xyXG4gICAgd2luZG93LnZpZXdlclN0YXRlLmFsaWduVmVydGljYWwgPSB0cnVlO1xyXG59IGVsc2UgaWYoJGJ0bi5jbGFzc0xpc3QuY29udGFpbnMoXCJob3Jpc29udGFsXCIpKSB7XHJcbiAgICB3aW5kb3cudmlld2VyU3RhdGUuYWxpZ25WZXJ0aWNhbCA9IGZhbHNlO1xyXG59IGVsc2Uge1xyXG4gICAgJGJ0bi5jbGFzc0xpc3QuYWRkKFwidmVydGljYWxcIilcclxuICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5hbGlnblZlcnRpY2FsID0gdHJ1ZTtcclxufVxyXG5maXQoKVxyXG5cclxuJGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlQWxpZ24pXHJcblxyXG5mdW5jdGlvbiB0b2dnbGVBbGlnbihldmVudCkge1xyXG4gICAgaWYod2luZG93LnZpZXdlclN0YXRlLmFsaWduVmVydGljYWwpIHtcclxuICAgICAgICAkYnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJ2ZXJ0aWNhbFwiKVxyXG4gICAgICAgICRidG4uY2xhc3NMaXN0LmFkZChcImhvcmlzb250YWxcIilcclxuICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuYWxpZ25WZXJ0aWNhbCA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkYnRuLmNsYXNzTGlzdC5yZW1vdmUoXCJob3Jpc29udGFsXCIpXHJcbiAgICAgICAgJGJ0bi5jbGFzc0xpc3QuYWRkKFwidmVydGljYWxcIilcclxuICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuYWxpZ25WZXJ0aWNhbCA9IHRydWU7XHJcbiAgICB9XHJcbiAgICBmaXQoKVxyXG59XHJcblxyXG5mdW5jdGlvbiBmaXQoKSB7XHJcbiAgICBpZigkYnRuLmNsYXNzTGlzdC5jb250YWlucyhcInZlcnRpY2FsXCIpKSB7XHJcbiAgICAgICAgJHZpZGVvLnN0eWxlLndpZHRoID0gJzEwMCUnXHJcbiAgICAgICAgJHZpZGVvLnN0eWxlLmhlaWdodCA9ICcxMDAlJ1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkdmlkZW8uc3R5bGUud2lkdGggPSAnMTAwJSdcclxuICAgICAgICAkdmlkZW8uc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nXHJcbiAgICB9XHJcbn0iLCJcInVzZSBzdHJpY3RcIlxyXG5cclxudmFyICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW9cclxudmFyICRzb3VyY2UgPSB3aW5kb3cudmlld2VyU3RhdGUuJHNvdXJjZVxyXG52YXIgJHNsaWRlciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc2xpZGVyXHJcbnZhciBhY3RpdmUkaW5wdXQgPSB3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0XHJcbnZhciAkYnRuTWVudU9uT2YgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19idG5zX19tZW51LW9mZicpXHJcbnZhciAkYnRuQWxpZ24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19idG5zX19hbGlnbicpXHJcbnZhciBsaW5rID0gJydcclxudmFyICRidG5zID0ge1xyXG4gICAgXCJjaF8xZ29yb2Rza295XCI6ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoXzFnb3JvZHNrb3lcIiksXHJcbiAgICBcImNoXzN0c3lmcm92b3lcIjogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfM3RzeWZyb3ZveVwiKSxcclxuICAgIFwiY2hfcmVwb3J0ZXJcIjogICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9yZXBvcnRlclwiKSxcclxuICAgIFwiY2hfYWNhZGVtaWFcIjogICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9hY2FkZW1pYVwiKSxcclxuICAgIFwiY2hfYTFcIjogICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9hMVwiKSxcclxuICAgIFwiY2hfZHVtc2theWFcIjogICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9kdW1za2F5YVwiKSxcclxuICAgIFwiY2hfZ3R2XCI6ICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9ndHZcIiksXHJcbiAgICBcImNoX3N0dlwiOiAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfc3R2XCIpLFxyXG4gICAgXCJjaF91Z25heWF2b2xuYVwiOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX3VnbmF5YXZvbG5hXCIpLFxyXG4gICAgXCJjaF9uZW1vXCI6ICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX25lbW9cIilcclxufVxyXG4kYnRucy5jaF8xZ29yb2Rza295LnNldEF0dHJpYnV0ZSggICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvMXR2b2QvMXR2b2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICApXHJcbiRidG5zLmNoXzN0c3lmcm92b3kuc2V0QXR0cmlidXRlKCAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovL2NkbjUubGl2ZS10di5vZC51YTo4MDgxL3R2LzN0dm9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgIClcclxuJGJ0bnMuY2hfcmVwb3J0ZXIuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vY2RuNC5saXZlLXR2Lm9kLnVhOjgwODEvdHYvMzFjaG9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgKVxyXG4kYnRucy5jaF9hY2FkZW1pYS5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly9jZG40LmxpdmUtdHYub2QudWE6ODA4MS90di8zNmNob2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiApXHJcbiRidG5zLmNoX2ExLnNldEF0dHJpYnV0ZSggICAgICAgICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9hMW9kL2Exb2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICAgIClcclxuJGJ0bnMuY2hfZHVtc2theWEuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzODo4MDgxL2R1bXNrYS9kdW1za2EtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgKVxyXG4kYnRucy5jaF9ndHYuc2V0QXR0cmlidXRlKCAgICAgICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvYTFvZC9ndHZvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiICAgICApXHJcbiRidG5zLmNoX3N0di5zZXRBdHRyaWJ1dGUoICAgICAgICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9zdHZvZC9zdHZvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiICAgIClcclxuJGJ0bnMuY2hfdWduYXlhdm9sbmEuc2V0QXR0cmlidXRlKCAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL3dhdmUvd2F2ZS1hYnItbHEvcGxheWxpc3QubTN1OFwiICAgICAgKVxyXG4kYnRucy5jaF9uZW1vLnNldEF0dHJpYnV0ZSggICAgICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvbmVtby9tb3Itc3ViL3BsYXlsaXN0Lm0zdThcIiAgICAgICAgICApXHJcblxyXG4kYnRucy5jaF8xZ29yb2Rza295LnNldEF0dHJpYnV0ZSggICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvMXR2b2QvMXR2b2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICApXHJcbiRidG5zLmNoXzN0c3lmcm92b3kuc2V0QXR0cmlidXRlKCAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovL2NkbjUubGl2ZS10di5vZC51YTo4MDgxL3R2LzN0dm9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgIClcclxuJGJ0bnMuY2hfcmVwb3J0ZXIuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vY2RuNC5saXZlLXR2Lm9kLnVhOjgwODEvdHYvMzFjaG9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgKVxyXG4kYnRucy5jaF9hY2FkZW1pYS5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly9jZG40LmxpdmUtdHYub2QudWE6ODA4MS90di8zNmNob2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICApXHJcbiRidG5zLmNoX2ExLnNldEF0dHJpYnV0ZSggICAgICAgICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9hMW9kL2Exb2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICAgIClcclxuJGJ0bnMuY2hfZHVtc2theWEuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzODo4MDgxL2R1bXNrYS9kdW1za2EtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgKVxyXG4kYnRucy5jaF9ndHYuc2V0QXR0cmlidXRlKCAgICAgICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvYTFvZC9ndHZvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgICApXHJcbiRidG5zLmNoX3N0di5zZXRBdHRyaWJ1dGUoICAgICAgICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9zdHZvZC9zdHZvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgIClcclxuJGJ0bnMuY2hfdWduYXlhdm9sbmEuc2V0QXR0cmlidXRlKCAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL3dhdmUvd2F2ZS1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgICAgKVxyXG4kYnRucy5jaF9uZW1vLnNldEF0dHJpYnV0ZSggICAgICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvbmVtby9tb3ItYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICAgICApXHJcblxyXG4kc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZXZlbnQpe1xyXG4gICAgdmFyIHNyY0VsZW1lbnQgPSBldmVudC5zcmNFbGVtZW50ID8gZXZlbnQuc3JjRWxlbWVudCA6IGV2ZW50LnRhcmdldFxyXG4gICAgaWYoc3JjRWxlbWVudC50YWdOYW1lID09PSAnSU5QVVQnKXtcclxuICAgICAgICBpZihhY3RpdmUkaW5wdXQgPT09IHNyY0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgYWN0aXZlJGlucHV0LmNoZWNrZWQgPSBmYWxzZVxyXG4gICAgICAgICAgICBhY3RpdmUkaW5wdXQgPSBudWxsXHJcbiAgICAgICAgICAgICR2aWRlby5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9IFwiXCJcclxuICAgICAgICAgICAgJHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgJycpXHJcbiAgICAgICAgICAgICRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCAnJylcclxuICAgICAgICAgICAgJGJ0bk1lbnVPbk9mLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICAgICAgJGJ0bkFsaWduLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBhY3RpdmUkaW5wdXQgPSBzcmNFbGVtZW50XHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSkgIGxpbmsgPSBzcmNFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWhxJylcclxuICAgICAgICAgICAgZWxzZSBsaW5rID0gc3JjRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1scScpXHJcbiAgICAgICAgICAgICR2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgICAgICAgICRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICAgICAgICAkdmlkZW8uc3R5bGUuYmFja2dyb3VuZFNpemUgPSBcIjAgMFwiXHJcbiAgICAgICAgICAgIGlmKCR2aWRlby5wbGF5KSAkdmlkZW8ucGxheSgpO1xyXG4gICAgICAgICAgICBlbHNlIGFsZXJ0ICgndmlkZW8gY2Fubm90IHBsYXknKVxyXG4gICAgICAgICAgICAkYnRuTWVudU9uT2Yuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snXHJcbiAgICAgICAgICAgICRidG5BbGlnbi5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jaydcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pXHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxuLy8gdmFyICRidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19idG5zX19mdWxsc2NyJylcclxudmFyICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW9cclxudGVzdCgpXHJcbmZ1bmN0aW9uIHRlc3QoKSB7XHJcbiAgICBpZiAoJHZpZGVvLnJlcXVlc3RGdWxsc2NyZWVuKSB7XHJcbiAgICAgIGFsZXJ0KCdyZXF1ZXN0RnVsbHNjcmVlbigpJylcclxuICAgIH0gZWxzZSBpZiAoJHZpZGVvLnJlcXVlc3RGdWxsU2NyZWVuKSB7XHJcbiAgICAgIGFsZXJ0KCdyZXF1ZXN0RnVsbFNjcmVlbigpJylcclxuICAgIH0gZWxzZSBpZiAoJHZpZGVvLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XHJcbiAgICAgIGFsZXJ0KCd3ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpJylcclxuICAgIH0gZWxzZSBpZiAoJHZpZGVvLndlYmtpdFJlcXVlc3RGdWxsU2NyZWVuKSB7XHJcbiAgICAgIGFsZXJ0KCd3ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbigpJylcclxuICAgIH0gZWxzZSBpZiAoJHZpZGVvLm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XHJcbiAgICAgIGFsZXJ0KCdtb3pSZXF1ZXN0RnVsbFNjcmVlbigpJylcclxuICAgIH0gZWxzZSBpZiAoJHZpZGVvLm1velJlcXVlc3RGdWxsc2NyZWVuKSB7XHJcbiAgICAgIGFsZXJ0KCdtb3pSZXF1ZXN0RnVsbHNjcmVlbigpJylcclxuICAgIH0gZWxzZSBpZiAoJHZpZGVvLm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgYWxlcnQoJ21zUmVxdWVzdEZ1bGxzY3JlZW4oKScpXHJcbiAgICB9IGVsc2UgaWYgKCR2aWRlby53ZWJraXRTdXBwb3J0c0Z1bGxzY3JlZW4pIHtcclxuICAgICAgYWxlcnQoJ1NhZmFyaSEhISB3ZWJraXRTdXBwb3J0c0Z1bGxzY3JlZW4oKScpXHJcbiAgICB9XHJcbiAgICAgZWxzZSBhbGVydCgnTm8gZnVsbHNjcmVlbicpXHJcbn1cclxuXHJcblxyXG4vLyBpZiAoXHJcbi8vICAgZG9jdW1lbnQuZnVsbHNjcmVlbkVuYWJsZWQgfHxcclxuLy8gICBkb2N1bWVudC53ZWJraXRGdWxsc2NyZWVuRW5hYmxlZCB8fFxyXG4vLyAgIGRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbmFibGVkIHx8XHJcbi8vICAgZG9jdW1lbnQubXNGdWxsc2NyZWVuRW5hYmxlZFxyXG4vLyApIHtcclxuLy8gICAkYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4vLyAgICAgaWYgKCR2aWRlby5yZXF1ZXN0RnVsbHNjcmVlbikge1xyXG4vLyAgICAgICAkdmlkZW8ucmVxdWVzdEZ1bGxzY3JlZW4oKVxyXG4vLyAgICAgfSBlbHNlIGlmICgkdmlkZW8ucmVxdWVzdEZ1bGxTY3JlZW4pIHtcclxuLy8gICAgICAgJHZpZGVvLnJlcXVlc3RGdWxsU2NyZWVuKClcclxuLy8gICAgIH0gZWxzZSBpZiAoJHZpZGVvLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XHJcbi8vICAgICAgICR2aWRlby53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpXHJcbi8vICAgICB9IGVsc2UgaWYgKCR2aWRlby53ZWJraXRSZXF1ZXN0RnVsbFNjcmVlbikge1xyXG4vLyAgICAgICAkdmlkZW8ud2Via2l0UmVxdWVzdEZ1bGxTY3JlZW4oKVxyXG4vLyAgICAgfSBlbHNlIGlmICgkdmlkZW8ubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcclxuLy8gICAgICAgJHZpZGVvLm1velJlcXVlc3RGdWxsU2NyZWVuKClcclxuLy8gICAgIH0gZWxzZSBpZiAoJHZpZGVvLm1velJlcXVlc3RGdWxsc2NyZWVuKSB7XHJcbi8vICAgICAgICR2aWRlby5tb3pSZXF1ZXN0RnVsbHNjcmVlbigpXHJcbi8vICAgICB9IGVsc2UgaWYgKCR2aWRlby5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XHJcbi8vICAgICAgICR2aWRlby5tc1JlcXVlc3RGdWxsc2NyZWVuKClcclxuLy8gICAgIH1cclxuLy8gICAgIGNvbnNvbGUubG9nKCdGdWxsc2NyZWVuIGFsbGF3ZWQnKVxyXG4vLyAgIH0pXHJcbi8vIH0gY29uc29sZS5sb2coJ05vIGZ1bGxzY3JlZW4nKSAgICAgIC8vZWxzZSAkYnRuLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcclxuXHJcblxyXG4vLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdmdWxsc2NyZWVuY2hhbmdlJywgaGlkZVNob3dDb250cm9scylcclxuLy8gZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsIGhpZGVTaG93Q29udHJvbHMpXHJcbi8vIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLCBoaWRlU2hvd0NvbnRyb2xzKVxyXG4vLyBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdNU0Z1bGxzY3JlZW5DaGFuZ2UnLCBoaWRlU2hvd0NvbnRyb2xzKVxyXG5cclxuLy8gZnVuY3Rpb24gaGlkZVNob3dDb250cm9scyAoKSB7XHJcbi8vICAgaWYgKFxyXG4vLyAgICAgZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQgPT09ICR2aWRlbyB8fFxyXG4vLyAgICAgZG9jdW1lbnQud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQgPT09ICR2aWRlbyB8fFxyXG4vLyAgICAgZG9jdW1lbnQubW96RnVsbFNjcmVlbkVsZW1lbnQgPT09ICR2aWRlbyB8fFxyXG4vLyAgICAgZG9jdW1lbnQubXNGdWxsc2NyZWVuRWxlbWVudCA9PT0gJHZpZGVvXHJcbi8vICAgKSB7XHJcbi8vICAgICAkdmlkZW8uY29udHJvbHMgPSB0cnVlXHJcbi8vICAgfSBlbHNlIHtcclxuLy8gICAgICR2aWRlby5jb250cm9scyA9IGZhbHNlXHJcbi8vICAgfVxyXG4vLyB9IiwiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgJHZpZGVvID0gd2luZG93LnZpZXdlclN0YXRlLiR2aWRlb1xyXG52YXIgJHNsaWRlciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc2xpZGVyXHJcbnZhciAkZm9vdGVyID0gd2luZG93LnZpZXdlclN0YXRlLiRmb290ZXJcclxudmFyICRvdmVyVmlld0JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib3gtb3Zlci12aWV3JylcclxudmFyICRidG5NZW51T2ZmID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fYnRuc19fbWVudS1vZmYnKVxyXG52YXIgJGFycm93TWVudU9uT2ZmID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnVfb25fb2ZmJylcclxudmFyICRhcnJvd1RleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9vbl9vZmZfX3RleHQnKVxyXG52YXIgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbnZhciBkdXJhdGlvbiA9IDEwMDAgLy8gIG1zXHJcbnZhciBkdXJhdGlvbl9mYXN0ID0gNTAwIC8vICBtc1xyXG5cclxuJGJ0bk1lbnVPZmYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGlkZU1lbnVIb3IpXHJcbn0pXHJcbiRhcnJvd01lbnVPbk9mZi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJUb3BDb2xvciA9ICAnIzQ4Zic7XHJcbiAgICAkYXJyb3dUZXh0LmlubmVyVGV4dCA9ICcnXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2hvd01lbnVWZXJ0KVxyXG59KVxyXG5cclxuZnVuY3Rpb24gaGlkZU1lbnVIb3IgKHRpbWVTdGFtcCkge1xyXG4gIGlmICghc3RhcnRUaW1lKSBzdGFydFRpbWUgPSB0aW1lU3RhbXBcclxuICB2YXIgcHJvZ3Jlc3MgPSAodGltZVN0YW1wIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uXHJcbiAgaWYgKHByb2dyZXNzIDw9IDEpIHtcclxuICAgICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLnJpZ2h0ID0gMTAwIC0gMTAwICogcHJvZ3Jlc3MgKyAnJSdcclxuICAgICAgJGZvb3Rlci5zdHlsZS5sZWZ0ID0gMTAwICogcHJvZ3Jlc3MgKyAnJSdcclxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhpZGVNZW51SG9yKVxyXG4gIH0gZWxzZSB7XHJcbiAgICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5yaWdodCA9IDBcclxuICAgICAgJGZvb3Rlci5zdHlsZS5sZWZ0ID0gMTAwICsgJyUnXHJcbiAgICAgIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgICB0dXJuQXJyb3dVcCgpXHJcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShoaWRlTWVudVZlcnQpXHJcbiAgfVxyXG59XHJcbmZ1bmN0aW9uIHR1cm5BcnJvd1VwKCkge1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlclRvcCA9ICdub25lJ1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlclJpZ2h0ID0gJzIuNWVtIHNvbGlkIHRyYW5zcGFyZW50J1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlckJvdHRvbSA9ICcyZW0gc29saWQgIzQ4ZidcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJMZWZ0ID0gJzIuNWVtIHNvbGlkIHRyYW5zcGFyZW50J1xyXG59XHJcblxyXG5mdW5jdGlvbiBoaWRlTWVudVZlcnQodGltZVN0YW1wKSB7XHJcbiAgaWYgKCFzdGFydFRpbWUpIHN0YXJ0VGltZSA9IHRpbWVTdGFtcFxyXG4gIHZhciBwcm9ncmVzcyA9ICh0aW1lU3RhbXAgLSBzdGFydFRpbWUpIC8gZHVyYXRpb25cclxuICBpZiAocHJvZ3Jlc3MgPD0gMSkge1xyXG4gICAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm90dG9tID0gMTAwICogcHJvZ3Jlc3MgKyAnJSdcclxuICAgICAgJG92ZXJWaWV3Qm94LnN0eWxlLnRvcCA9IC0xMDAgKiBwcm9ncmVzcyArICclJ1xyXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGlkZU1lbnVWZXJ0KVxyXG4gIH0gZWxzZSB7XHJcbiAgICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3R0b20gPSAxMDAgKyAnJSdcclxuICAgICAgJG92ZXJWaWV3Qm94LnN0eWxlLnRvcCA9IC05MCArICclJ1xyXG4gICAgICBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgICAgdHVybkFycm93RG9udygpXHJcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShkcm9wRG93bilcclxuICB9XHJcbn1cclxuZnVuY3Rpb24gdHVybkFycm93RG9udygpIHtcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJUb3AgPSAnMmVtIHNvbGlkICM0OGYnXHJcbiAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm9yZGVyUmlnaHQgPSAnMi41ZW0gc29saWQgdHJhbnNwYXJlbnQnXHJcbiAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm9yZGVyQm90dG9tID0gJ25vbmUnXHJcbiAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm9yZGVyTGVmdCA9ICcyLjVlbSBzb2xpZCB0cmFuc3BhcmVudCdcclxufVxyXG5mdW5jdGlvbiBkcm9wRG93bih0aW1lU3RhbXApIHtcclxuICBpZiAoIXN0YXJ0VGltZSkgc3RhcnRUaW1lID0gdGltZVN0YW1wXHJcbiAgdmFyIHByb2dyZXNzID0gKHRpbWVTdGFtcCAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvbl9mYXN0XHJcbiAgaWYgKHByb2dyZXNzIDw9IDEpIHtcclxuICAgICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvdHRvbSA9IDEwMCAtIDEwICogcHJvZ3Jlc3MgKyAnJSdcclxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyb3BEb3duKVxyXG4gIH0gZWxzZSB7XHJcbiAgICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3R0b20gPSA5MCArICclJ1xyXG4gICAgICBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICRhcnJvd1RleHQuaW5uZXJUZXh0ID0gJ21lbnUnXHJcbiAgICAgICAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm9yZGVyVG9wQ29sb3IgPSAgJ3JnYmEoNjgsIDEzNiwgMjU1LCAwLjMpJztcclxuICAgICAgfSwgMzAwKTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gc2hvd01lbnVWZXJ0ICh0aW1lU3RhbXApIHtcclxuICBpZiAoIXN0YXJ0VGltZSkgc3RhcnRUaW1lID0gdGltZVN0YW1wXHJcbiAgdmFyIHByb2dyZXNzID0gKHRpbWVTdGFtcCAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvblxyXG4gIGlmIChwcm9ncmVzcyA8PSAxKSB7XHJcbiAgICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3R0b20gPSA5MCAtIDkwICogcHJvZ3Jlc3MgKyAnJSdcclxuICAgICAgJG92ZXJWaWV3Qm94LnN0eWxlLnRvcCA9IC05MCArIDkwICogcHJvZ3Jlc3MgKyAnJSdcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShzaG93TWVudVZlcnQpXHJcbiAgfSBlbHNlIHtcclxuICAgICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvdHRvbSA9IDBcclxuICAgICAgJG92ZXJWaWV3Qm94LnN0eWxlLnRvcCA9IDBcclxuICAgICAgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAgIHR1cm5BcnJvd0xlZnQoKVxyXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2hvd01lbnVIb3IpXHJcbiAgfVxyXG59XHJcbmZ1bmN0aW9uIHR1cm5BcnJvd0xlZnQoKSB7XHJcbiAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm9yZGVyVG9wID0gJzFlbSBzb2xpZCB0cmFuc3BhcmVudCdcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJSaWdodCA9ICc1ZW0gc29saWQgIzQ4ZidcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJCb3R0b20gPSAnMWVtIHNvbGlkIHRyYW5zcGFyZW50J1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlckxlZnQgPSAnbm9uZSdcclxufVxyXG5mdW5jdGlvbiBzaG93TWVudUhvciAodGltZVN0YW1wKSB7XHJcbiAgaWYgKCFzdGFydFRpbWUpIHN0YXJ0VGltZSA9IHRpbWVTdGFtcFxyXG4gIHZhciBwcm9ncmVzcyA9ICh0aW1lU3RhbXAgLSBzdGFydFRpbWUpIC8gZHVyYXRpb25cclxuICBpZiAocHJvZ3Jlc3MgPD0gMSkge1xyXG4gICAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUucmlnaHQgPSAxMDAgKiBwcm9ncmVzcyArICclJ1xyXG4gICAgICAkZm9vdGVyLnN0eWxlLmxlZnQgPSAxMDAgLSAxMDAgKiBwcm9ncmVzcyArICclJ1xyXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2hvd01lbnVIb3IpXHJcbiAgfSBlbHNlIHtcclxuICAgICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLnJpZ2h0ID0gMTAwICsgJyUnXHJcbiAgICAgICRmb290ZXIuc3R5bGUubGVmdCA9IDBcclxuICAgICAgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAgIHR1cm5BcnJvd1RvSW5pdCgpXHJcbiAgfVxyXG59XHJcbmZ1bmN0aW9uIHR1cm5BcnJvd1RvSW5pdCgpIHtcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJUb3AgPSAnJ1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlclJpZ2h0ID0gJydcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJCb3R0b20gPSAnJ1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlckxlZnQgPSAnJ1xyXG59XHJcbiIsImFsZXJ0KCcgYXZhaWxIZWlnaHQ6ICcgKyB3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0ICsgJ1xcbiBpbm5lckhlaWdodDogJyArIHdpbmRvdy5pbm5lckhlaWdodFxyXG4gICAgICArIFwiXFxuIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ2lQaG9uZScpOiBcIiArIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ2lQaG9uZScpXHJcbiAgICAgICsgXCJcXG4gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQuaW5kZXhPZignaVBhZCcpOiBcIiArIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ2lQYWQnKVxyXG4gICAgICArIFwiXFxuIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ1NhZmFyaScpOiBcIiArIHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50LmluZGV4T2YoJ1NhZmFyaScpXHJcbiAgICAgICsgXCJcXG4gd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQ6IFwiICsgd2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpXHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICB3aW5kb3cudmlld2VyU3RhdGUgPSB7XHJcbiAgICAnJHNsaWRlcic6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhcl9fc2xpZGVyXCIpLFxyXG4gICAgJyRmb290ZXInOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvb3RlclwiKSxcclxuICAgICckdmlkZW8nOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdmlldycpLFxyXG4gICAgJyRzb3VyY2UnOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NvdXJjZVwiKSxcclxuICAgICdhY3RpdmUkaW5wdXQnOiBudWxsLFxyXG4gICAgJ2hpZ2hRdWFsaXR5JzogZmFsc2UsXHJcbiAgICAnYWxpZ25WZXJ0aWNhbCc6IGZhbHNlXHJcbiAgfTtcclxuICByZXF1aXJlKCcuL2NoYW5uZWxTZWxlY3Rvci5qcycpXHJcbiAgcmVxdWlyZSgnLi9xdWFsaXR5U2VsZWN0b3IuanMnKVxyXG4gIHJlcXVpcmUoJy4vYWxpZ25TZWxlY3Rvci5qcycpXHJcbiAgcmVxdWlyZSgnLi9oaWRlU2hvd01lbnUuanMnKVxyXG4gIHJlcXVpcmUoJy4vZnVsbHNjcmVlbi5qcycpXHJcbiAgcmVxdWlyZSgnLi92aWRlb0Vycm9yTGlzdGVuZXInKVxyXG4gIHJlcXVpcmUoJy4vaVBhZENoZWNrU2NyZWVuU2l6ZS5qcycpXHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgJGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX2J0bnNfX3F1YWxpdHknKVxyXG52YXIgJHNpZ25IUSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1t0aXRsZSA9IGhpZ2h0X3F1YWxpdHldJylcclxudmFyICRzaWduTFEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbdGl0bGUgPSBsb3dfcXVhbGl0eV0nKVxyXG5cclxuaWYgKCRzaWduTFEuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSA9IGZhbHNlXHJcbn0gZWxzZSBpZiAoJHNpZ25IUS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgd2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5ID0gdHJ1ZVxyXG59IGVsc2Uge1xyXG4gICRzaWduTFEuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICB3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkgPSBmYWxzZVxyXG59XHJcblxyXG4kYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlUXVhbGl0eSlcclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZVF1YWxpdHkgKGV2ZW50KSB7XHJcbiAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICB2YXIgbGluayA9IHVuZGVmaW5lZFxyXG4gIGlmICh3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkpIHtcclxuICAgICRzaWduSFEuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICAgICRzaWduTFEuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSA9IGZhbHNlXHJcbiAgICBpZiAod2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dCkge1xyXG4gICAgICBsaW5rID0gd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1scScpXHJcbiAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICB3aW5kb3cudmlld2VyU3RhdGUuJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8ucGxheSgpXHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgICRzaWduTFEuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICAgICRzaWduSFEuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSA9IHRydWVcclxuICAgIGlmICh3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0KSB7XHJcbiAgICAgIGxpbmsgPSB3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0LmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWhxJylcclxuICAgICAgd2luZG93LnZpZXdlclN0YXRlLiR2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kc291cmNlLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgd2luZG93LnZpZXdlclN0YXRlLiR2aWRlby5wbGF5KClcclxuICAgIH1cclxuICB9XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgJHZpZGVvID0gd2luZG93LnZpZXdlclN0YXRlLiR2aWRlb1xyXG5cclxuJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZmFpbGVkKVxyXG5cclxuIGZ1bmN0aW9uIGZhaWxlZChlKSB7XHJcbiAgIC8vIHZpZGVvIHBsYXliYWNrIGZhaWxlZCAtIHNob3cgYSBtZXNzYWdlIHNheWluZyB3aHkgICAgIC0gZnJvbSBodHRwczovL2Rldi53My5vcmcvaHRtbDUvc3BlYy1hdXRob3Itdmlldy92aWRlby5odG1sI3ZpZGVvXHJcbiAgIHN3aXRjaCAoZS50YXJnZXQuZXJyb3IuY29kZSkge1xyXG4gICAgIGNhc2UgZS50YXJnZXQuZXJyb3IuTUVESUFfRVJSX0FCT1JURUQ6XHJcbiAgICAgICBhbGVydCgnWW91IGFib3J0ZWQgdGhlIHZpZGVvIHBsYXliYWNrLicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfTkVUV09SSzpcclxuICAgICAgIGFsZXJ0KCdBIG5ldHdvcmsgZXJyb3IgY2F1c2VkIHRoZSB2aWRlbyBkb3dubG9hZCB0byBmYWlsIHBhcnQtd2F5LicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfREVDT0RFOlxyXG4gICAgICAgYWxlcnQoJ1RoZSB2aWRlbyBwbGF5YmFjayB3YXMgYWJvcnRlZCBkdWUgdG8gYSBjb3JydXB0aW9uIHByb2JsZW0gb3IgYmVjYXVzZSB0aGUgdmlkZW8gdXNlZCBmZWF0dXJlcyB5b3VyIGJyb3dzZXIgZGlkIG5vdCBzdXBwb3J0LicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfU1JDX05PVF9TVVBQT1JURUQ6XHJcbiAgICAgICBhbGVydCgnVGhlIHZpZGVvIGNvdWxkIG5vdCBiZSBsb2FkZWQsIGVpdGhlciBiZWNhdXNlIHRoZSBzZXJ2ZXIgb3IgbmV0d29yayBmYWlsZWQgb3IgYmVjYXVzZSB0aGUgZm9ybWF0IGlzIG5vdCBzdXBwb3J0ZWQuJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgICBkZWZhdWx0OlxyXG4gICAgICAgYWxlcnQoJ0FuIHVua25vd24gZXJyb3Igb2NjdXJyZWQuJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgfVxyXG4gfVxyXG4iXX0=
