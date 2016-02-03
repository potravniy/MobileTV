(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict"

var $btn = document.querySelector(".footer__btns__align")
var $signVertical = document.querySelector("[title = fit_vertical]")
var $signHorisontal = document.querySelector("[title = fit_horisontal]")

if($signVertical.classList.contains("active")) {
    window.viewerState.alignVertical = true;
} else if($signHorisontal.classList.contains("active")) {
    window.viewerState.alignVertical = false;
} else {
    $signHorisontal.classList.add("active")
    window.viewerState.alignVertical = false;
}

$btn.addEventListener("click", toggleAlign)

function toggleAlign(event) {
    event.stopPropagation()
    if(window.viewerState.alignVertical) {
        $signVertical.classList.remove("active")
        $signHorisontal.classList.add("active")
        window.viewerState.alignVertical = false;
    } else {
        $signHorisontal.classList.remove("active")
        $signVertical.classList.add("active")
        window.viewerState.alignVertical = true;
    }
}
},{}],2:[function(require,module,exports){
"use strict"

var $video = window.viewerState.$video
var $source = window.viewerState.$source
var $slider = window.viewerState.$slider
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
$btns.ch_dumskaya.setAttribute(    'data-link-lq', "http://cdn2.live-tv.od.ua:8081/tv/dumska-abr-lq/playlist.m3u8" )
$btns.ch_gtv.setAttribute(         'data-link-lq', "http://77.88.196.133:8081/a1od/gtvod-abr-lq/playlist.m3u8"     )
$btns.ch_stv.setAttribute(         'data-link-lq', "http://77.88.196.133:8081/stvod/stvod-abr-lq/playlist.m3u8"    )
$btns.ch_ugnayavolna.setAttribute( 'data-link-lq', "http://77.88.196.133:8081/wave/wave-abr-lq/playlist.m3u8"      )
$btns.ch_nemo.setAttribute(        'data-link-lq', "http://77.88.196.133:8081/nemo/mor-sub/playlist.m3u8"          )

$btns.ch_1gorodskoy.setAttribute(  'data-link-hq', "http://77.88.196.133:8081/1tvod/1tvod-abr/playlist.m3u8"       )
$btns.ch_3tsyfrovoy.setAttribute(  'data-link-hq', "http://cdn5.live-tv.od.ua:8081/tv/3tvod-abr/playlist.m3u8"     )
$btns.ch_reporter.setAttribute(    'data-link-hq', "http://cdn4.live-tv.od.ua:8081/tv/31chod-abr/playlist.m3u8"    )
$btns.ch_academia.setAttribute(    'data-link-hq', "http://cdn4.live-tv.od.ua:8081/tv/36chod-abr/playlist.m3u8"    )
$btns.ch_a1.setAttribute(          'data-link-hq', "http://77.88.196.133:8081/a1od/a1od-abr/playlist.m3u8"         )
$btns.ch_dumskaya.setAttribute(    'data-link-hq', "http://cdn2.live-tv.od.ua:8081/tv/dumska-abr/playlist.m3u8"    )
$btns.ch_gtv.setAttribute(         'data-link-hq', "http://77.88.196.133:8081/a1od/gtvod-abr/playlist.m3u8"        )
$btns.ch_stv.setAttribute(         'data-link-hq', "http://77.88.196.133:8081/stvod/stvod-abr/playlist.m3u8"       )
$btns.ch_ugnayavolna.setAttribute( 'data-link-hq', "http://77.88.196.133:8081/wave/wave-abr/playlist.m3u8"         )
$btns.ch_nemo.setAttribute(        'data-link-hq', "http://77.88.196.133:8081/nemo/mor-abr/playlist.m3u8"          )

$slider.addEventListener('click', function(event){
    if(event.srcElement.tagName === 'INPUT'){
        if(window.viewerState.active$input === event.srcElement) {
            window.viewerState.active$input.checked = false
            window.viewerState.active$input = null
            $video.style.backgroundSize = ""
            $video.setAttribute('src', '')
            $source.setAttribute('src', '')
            $btnMenuOnOf.style.display = 'none'
            $btnAlign.style.display = 'none'
        } else {
            window.viewerState.active$input = event.srcElement
            if(window.viewerState.highQuality)  link = event.srcElement.getAttribute('data-link-hq')
            else link = event.srcElement.getAttribute('data-link-lq')
            $video.setAttribute('src', link)
            $source.setAttribute('src', link)
            $video.style.backgroundSize = "0 0"
            $video.play();
            $btnMenuOnOf.style.display = 'inline-block'
            $btnAlign.style.display = 'inline-block'
        }
    }
})

},{}],3:[function(require,module,exports){
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
  var progress = (timeStamp - startTime) / duration
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

},{}],4:[function(require,module,exports){
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
//   require('./fullscreen.js')
}

},{"./alignSelector.js":1,"./channelSelector.js":2,"./hideShowMenu.js":3,"./qualitySelector.js":5}],5:[function(require,module,exports){
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

},{}]},{},[4])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2EwNS9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hbGlnblNlbGVjdG9yLmpzIiwianMvY2hhbm5lbFNlbGVjdG9yLmpzIiwianMvaGlkZVNob3dNZW51LmpzIiwianMvbWFpbi5qcyIsImpzL3F1YWxpdHlTZWxlY3Rvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNqRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCJcInVzZSBzdHJpY3RcIlxyXG5cclxudmFyICRidG4gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvb3Rlcl9fYnRuc19fYWxpZ25cIilcclxudmFyICRzaWduVmVydGljYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiW3RpdGxlID0gZml0X3ZlcnRpY2FsXVwiKVxyXG52YXIgJHNpZ25Ib3Jpc29udGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIlt0aXRsZSA9IGZpdF9ob3Jpc29udGFsXVwiKVxyXG5cclxuaWYoJHNpZ25WZXJ0aWNhbC5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpIHtcclxuICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5hbGlnblZlcnRpY2FsID0gdHJ1ZTtcclxufSBlbHNlIGlmKCRzaWduSG9yaXNvbnRhbC5jbGFzc0xpc3QuY29udGFpbnMoXCJhY3RpdmVcIikpIHtcclxuICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5hbGlnblZlcnRpY2FsID0gZmFsc2U7XHJcbn0gZWxzZSB7XHJcbiAgICAkc2lnbkhvcmlzb250YWwuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKVxyXG4gICAgd2luZG93LnZpZXdlclN0YXRlLmFsaWduVmVydGljYWwgPSBmYWxzZTtcclxufVxyXG5cclxuJGJ0bi5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgdG9nZ2xlQWxpZ24pXHJcblxyXG5mdW5jdGlvbiB0b2dnbGVBbGlnbihldmVudCkge1xyXG4gICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5hbGlnblZlcnRpY2FsKSB7XHJcbiAgICAgICAgJHNpZ25WZXJ0aWNhbC5jbGFzc0xpc3QucmVtb3ZlKFwiYWN0aXZlXCIpXHJcbiAgICAgICAgJHNpZ25Ib3Jpc29udGFsLmNsYXNzTGlzdC5hZGQoXCJhY3RpdmVcIilcclxuICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuYWxpZ25WZXJ0aWNhbCA9IGZhbHNlO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkc2lnbkhvcmlzb250YWwuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKVxyXG4gICAgICAgICRzaWduVmVydGljYWwuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKVxyXG4gICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5hbGlnblZlcnRpY2FsID0gdHJ1ZTtcclxuICAgIH1cclxufSIsIlwidXNlIHN0cmljdFwiXHJcblxyXG52YXIgJHZpZGVvID0gd2luZG93LnZpZXdlclN0YXRlLiR2aWRlb1xyXG52YXIgJHNvdXJjZSA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc291cmNlXHJcbnZhciAkc2xpZGVyID0gd2luZG93LnZpZXdlclN0YXRlLiRzbGlkZXJcclxudmFyICRidG5NZW51T25PZiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX2J0bnNfX21lbnUtb2ZmJylcclxudmFyICRidG5BbGlnbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX2J0bnNfX2FsaWduJylcclxudmFyIGxpbmsgPSAnJ1xyXG52YXIgJGJ0bnMgPSB7XHJcbiAgICBcImNoXzFnb3JvZHNrb3lcIjogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfMWdvcm9kc2tveVwiKSxcclxuICAgIFwiY2hfM3RzeWZyb3ZveVwiOiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF8zdHN5ZnJvdm95XCIpLFxyXG4gICAgXCJjaF9yZXBvcnRlclwiOiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX3JlcG9ydGVyXCIpLFxyXG4gICAgXCJjaF9hY2FkZW1pYVwiOiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX2FjYWRlbWlhXCIpLFxyXG4gICAgXCJjaF9hMVwiOiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX2ExXCIpLFxyXG4gICAgXCJjaF9kdW1za2F5YVwiOiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX2R1bXNrYXlhXCIpLFxyXG4gICAgXCJjaF9ndHZcIjogICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX2d0dlwiKSxcclxuICAgIFwiY2hfc3R2XCI6ICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9zdHZcIiksXHJcbiAgICBcImNoX3VnbmF5YXZvbG5hXCI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfdWduYXlhdm9sbmFcIiksXHJcbiAgICBcImNoX25lbW9cIjogICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfbmVtb1wiKVxyXG59XHJcbiRidG5zLmNoXzFnb3JvZHNrb3kuc2V0QXR0cmlidXRlKCAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS8xdHZvZC8xdHZvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiICAgIClcclxuJGJ0bnMuY2hfM3RzeWZyb3ZveS5zZXRBdHRyaWJ1dGUoICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vY2RuNS5saXZlLXR2Lm9kLnVhOjgwODEvdHYvM3R2b2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgKVxyXG4kYnRucy5jaF9yZXBvcnRlci5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly9jZG40LmxpdmUtdHYub2QudWE6ODA4MS90di8zMWNob2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiApXHJcbiRidG5zLmNoX2FjYWRlbWlhLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovL2NkbjQubGl2ZS10di5vZC51YTo4MDgxL3R2LzM2Y2hvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiIClcclxuJGJ0bnMuY2hfYTEuc2V0QXR0cmlidXRlKCAgICAgICAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL2Exb2QvYTFvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiICAgICAgKVxyXG4kYnRucy5jaF9kdW1za2F5YS5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly9jZG4yLmxpdmUtdHYub2QudWE6ODA4MS90di9kdW1za2EtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiApXHJcbiRidG5zLmNoX2d0di5zZXRBdHRyaWJ1dGUoICAgICAgICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9hMW9kL2d0dm9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgICAgIClcclxuJGJ0bnMuY2hfc3R2LnNldEF0dHJpYnV0ZSggICAgICAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL3N0dm9kL3N0dm9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgICAgKVxyXG4kYnRucy5jaF91Z25heWF2b2xuYS5zZXRBdHRyaWJ1dGUoICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvd2F2ZS93YXZlLWFici1scS9wbGF5bGlzdC5tM3U4XCIgICAgICApXHJcbiRidG5zLmNoX25lbW8uc2V0QXR0cmlidXRlKCAgICAgICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9uZW1vL21vci1zdWIvcGxheWxpc3QubTN1OFwiICAgICAgICAgIClcclxuXHJcbiRidG5zLmNoXzFnb3JvZHNrb3kuc2V0QXR0cmlidXRlKCAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS8xdHZvZC8xdHZvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgIClcclxuJGJ0bnMuY2hfM3RzeWZyb3ZveS5zZXRBdHRyaWJ1dGUoICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vY2RuNS5saXZlLXR2Lm9kLnVhOjgwODEvdHYvM3R2b2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgKVxyXG4kYnRucy5jaF9yZXBvcnRlci5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly9jZG40LmxpdmUtdHYub2QudWE6ODA4MS90di8zMWNob2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICApXHJcbiRidG5zLmNoX2FjYWRlbWlhLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovL2NkbjQubGl2ZS10di5vZC51YTo4MDgxL3R2LzM2Y2hvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgIClcclxuJGJ0bnMuY2hfYTEuc2V0QXR0cmlidXRlKCAgICAgICAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL2Exb2QvYTFvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgICAgKVxyXG4kYnRucy5jaF9kdW1za2F5YS5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly9jZG4yLmxpdmUtdHYub2QudWE6ODA4MS90di9kdW1za2EtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICApXHJcbiRidG5zLmNoX2d0di5zZXRBdHRyaWJ1dGUoICAgICAgICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9hMW9kL2d0dm9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgIClcclxuJGJ0bnMuY2hfc3R2LnNldEF0dHJpYnV0ZSggICAgICAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL3N0dm9kL3N0dm9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgKVxyXG4kYnRucy5jaF91Z25heWF2b2xuYS5zZXRBdHRyaWJ1dGUoICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvd2F2ZS93YXZlLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgICApXHJcbiRidG5zLmNoX25lbW8uc2V0QXR0cmlidXRlKCAgICAgICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9uZW1vL21vci1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgICAgIClcclxuXHJcbiRzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICBpZihldmVudC5zcmNFbGVtZW50LnRhZ05hbWUgPT09ICdJTlBVVCcpe1xyXG4gICAgICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQgPT09IGV2ZW50LnNyY0VsZW1lbnQpIHtcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dC5jaGVja2VkID0gZmFsc2VcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dCA9IG51bGxcclxuICAgICAgICAgICAgJHZpZGVvLnN0eWxlLmJhY2tncm91bmRTaXplID0gXCJcIlxyXG4gICAgICAgICAgICAkdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCAnJylcclxuICAgICAgICAgICAgJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsICcnKVxyXG4gICAgICAgICAgICAkYnRuTWVudU9uT2Yuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgICAgICAkYnRuQWxpZ24uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQgPSBldmVudC5zcmNFbGVtZW50XHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSkgIGxpbmsgPSBldmVudC5zcmNFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWhxJylcclxuICAgICAgICAgICAgZWxzZSBsaW5rID0gZXZlbnQuc3JjRWxlbWVudC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1scScpXHJcbiAgICAgICAgICAgICR2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgICAgICAgICRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICAgICAgICAkdmlkZW8uc3R5bGUuYmFja2dyb3VuZFNpemUgPSBcIjAgMFwiXHJcbiAgICAgICAgICAgICR2aWRlby5wbGF5KCk7XHJcbiAgICAgICAgICAgICRidG5NZW51T25PZi5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jaydcclxuICAgICAgICAgICAgJGJ0bkFsaWduLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgJHZpZGVvID0gd2luZG93LnZpZXdlclN0YXRlLiR2aWRlb1xyXG52YXIgJHNsaWRlciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc2xpZGVyXHJcbnZhciAkZm9vdGVyID0gd2luZG93LnZpZXdlclN0YXRlLiRmb290ZXJcclxudmFyICRvdmVyVmlld0JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib3gtb3Zlci12aWV3JylcclxudmFyICRidG5NZW51T2ZmID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fYnRuc19fbWVudS1vZmYnKVxyXG52YXIgJGFycm93TWVudU9uT2ZmID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1lbnVfb25fb2ZmJylcclxudmFyICRhcnJvd1RleHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9vbl9vZmZfX3RleHQnKVxyXG52YXIgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbnZhciBkdXJhdGlvbiA9IDEwMDAgLy8gIG1zXHJcblxyXG4kYnRuTWVudU9mZi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShoaWRlTWVudUhvcilcclxufSlcclxuJGFycm93TWVudU9uT2ZmLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlclRvcENvbG9yID0gICcjNDhmJztcclxuICAgICRhcnJvd1RleHQuaW5uZXJUZXh0ID0gJydcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShzaG93TWVudVZlcnQpXHJcbn0pXHJcblxyXG5mdW5jdGlvbiBoaWRlTWVudUhvciAodGltZVN0YW1wKSB7XHJcbiAgaWYgKCFzdGFydFRpbWUpIHN0YXJ0VGltZSA9IHRpbWVTdGFtcFxyXG4gIHZhciBwcm9ncmVzcyA9ICh0aW1lU3RhbXAgLSBzdGFydFRpbWUpIC8gZHVyYXRpb25cclxuICBpZiAocHJvZ3Jlc3MgPD0gMSkge1xyXG4gICAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUucmlnaHQgPSAxMDAgLSAxMDAgKiBwcm9ncmVzcyArICclJ1xyXG4gICAgICAkZm9vdGVyLnN0eWxlLmxlZnQgPSAxMDAgKiBwcm9ncmVzcyArICclJ1xyXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGlkZU1lbnVIb3IpXHJcbiAgfSBlbHNlIHtcclxuICAgICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLnJpZ2h0ID0gMFxyXG4gICAgICAkZm9vdGVyLnN0eWxlLmxlZnQgPSAxMDAgKyAnJSdcclxuICAgICAgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAgIHR1cm5BcnJvd1VwKClcclxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhpZGVNZW51VmVydClcclxuICB9XHJcbn1cclxuZnVuY3Rpb24gdHVybkFycm93VXAoKSB7XHJcbiAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm9yZGVyVG9wID0gJ25vbmUnXHJcbiAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm9yZGVyUmlnaHQgPSAnMi41ZW0gc29saWQgdHJhbnNwYXJlbnQnXHJcbiAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm9yZGVyQm90dG9tID0gJzJlbSBzb2xpZCAjNDhmJ1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlckxlZnQgPSAnMi41ZW0gc29saWQgdHJhbnNwYXJlbnQnXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZGVNZW51VmVydCh0aW1lU3RhbXApIHtcclxuICBpZiAoIXN0YXJ0VGltZSkgc3RhcnRUaW1lID0gdGltZVN0YW1wXHJcbiAgdmFyIHByb2dyZXNzID0gKHRpbWVTdGFtcCAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvblxyXG4gIGlmIChwcm9ncmVzcyA8PSAxKSB7XHJcbiAgICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3R0b20gPSAxMDAgKiBwcm9ncmVzcyArICclJ1xyXG4gICAgICAkb3ZlclZpZXdCb3guc3R5bGUudG9wID0gLTEwMCAqIHByb2dyZXNzICsgJyUnXHJcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShoaWRlTWVudVZlcnQpXHJcbiAgfSBlbHNlIHtcclxuICAgICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvdHRvbSA9IDEwMCArICclJ1xyXG4gICAgICAkb3ZlclZpZXdCb3guc3R5bGUudG9wID0gLTkwICsgJyUnXHJcbiAgICAgIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgICB0dXJuQXJyb3dEb253KClcclxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyb3BEb3duKVxyXG4gIH1cclxufVxyXG5mdW5jdGlvbiB0dXJuQXJyb3dEb253KCkge1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlclRvcCA9ICcyZW0gc29saWQgIzQ4ZidcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJSaWdodCA9ICcyLjVlbSBzb2xpZCB0cmFuc3BhcmVudCdcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJCb3R0b20gPSAnbm9uZSdcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJMZWZ0ID0gJzIuNWVtIHNvbGlkIHRyYW5zcGFyZW50J1xyXG59XHJcbmZ1bmN0aW9uIGRyb3BEb3duKHRpbWVTdGFtcCkge1xyXG4gIGlmICghc3RhcnRUaW1lKSBzdGFydFRpbWUgPSB0aW1lU3RhbXBcclxuICB2YXIgcHJvZ3Jlc3MgPSAodGltZVN0YW1wIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uXHJcbiAgaWYgKHByb2dyZXNzIDw9IDEpIHtcclxuICAgICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvdHRvbSA9IDEwMCAtIDEwICogcHJvZ3Jlc3MgKyAnJSdcclxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyb3BEb3duKVxyXG4gIH0gZWxzZSB7XHJcbiAgICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3R0b20gPSA5MCArICclJ1xyXG4gICAgICBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgICAgc2V0VGltZW91dChmdW5jdGlvbigpIHtcclxuICAgICAgICAgICRhcnJvd1RleHQuaW5uZXJUZXh0ID0gJ21lbnUnXHJcbiAgICAgICAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm9yZGVyVG9wQ29sb3IgPSAgJ3JnYmEoNjgsIDEzNiwgMjU1LCAwLjMpJztcclxuICAgICAgfSwgMzAwKTtcclxuICB9XHJcbn1cclxuXHJcblxyXG5cclxuZnVuY3Rpb24gc2hvd01lbnVWZXJ0ICh0aW1lU3RhbXApIHtcclxuICBpZiAoIXN0YXJ0VGltZSkgc3RhcnRUaW1lID0gdGltZVN0YW1wXHJcbiAgdmFyIHByb2dyZXNzID0gKHRpbWVTdGFtcCAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvblxyXG4gIGlmIChwcm9ncmVzcyA8PSAxKSB7XHJcbiAgICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3R0b20gPSA5MCAtIDkwICogcHJvZ3Jlc3MgKyAnJSdcclxuICAgICAgJG92ZXJWaWV3Qm94LnN0eWxlLnRvcCA9IC05MCArIDkwICogcHJvZ3Jlc3MgKyAnJSdcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShzaG93TWVudVZlcnQpXHJcbiAgfSBlbHNlIHtcclxuICAgICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvdHRvbSA9IDBcclxuICAgICAgJG92ZXJWaWV3Qm94LnN0eWxlLnRvcCA9IDBcclxuICAgICAgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAgIHR1cm5BcnJvd0xlZnQoKVxyXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2hvd01lbnVIb3IpXHJcbiAgfVxyXG59XHJcbmZ1bmN0aW9uIHR1cm5BcnJvd0xlZnQoKSB7XHJcbiAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm9yZGVyVG9wID0gJzFlbSBzb2xpZCB0cmFuc3BhcmVudCdcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJSaWdodCA9ICc1ZW0gc29saWQgIzQ4ZidcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJCb3R0b20gPSAnMWVtIHNvbGlkIHRyYW5zcGFyZW50J1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlckxlZnQgPSAnbm9uZSdcclxufVxyXG5mdW5jdGlvbiBzaG93TWVudUhvciAodGltZVN0YW1wKSB7XHJcbiAgaWYgKCFzdGFydFRpbWUpIHN0YXJ0VGltZSA9IHRpbWVTdGFtcFxyXG4gIHZhciBwcm9ncmVzcyA9ICh0aW1lU3RhbXAgLSBzdGFydFRpbWUpIC8gZHVyYXRpb25cclxuICBpZiAocHJvZ3Jlc3MgPD0gMSkge1xyXG4gICAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUucmlnaHQgPSAxMDAgKiBwcm9ncmVzcyArICclJ1xyXG4gICAgICAkZm9vdGVyLnN0eWxlLmxlZnQgPSAxMDAgLSAxMDAgKiBwcm9ncmVzcyArICclJ1xyXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2hvd01lbnVIb3IpXHJcbiAgfSBlbHNlIHtcclxuICAgICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLnJpZ2h0ID0gMTAwICsgJyUnXHJcbiAgICAgICRmb290ZXIuc3R5bGUubGVmdCA9IDBcclxuICAgICAgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAgIHR1cm5BcnJvd1RvSW5pdCgpXHJcbiAgfVxyXG59XHJcbmZ1bmN0aW9uIHR1cm5BcnJvd1RvSW5pdCgpIHtcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJUb3AgPSAnJ1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlclJpZ2h0ID0gJydcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJCb3R0b20gPSAnJ1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlckxlZnQgPSAnJ1xyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICB3aW5kb3cudmlld2VyU3RhdGUgPSB7XHJcbiAgICAnJHNsaWRlcic6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuc2lkZWJhcl9fc2xpZGVyXCIpLFxyXG4gICAgJyRmb290ZXInOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmZvb3RlclwiKSxcclxuICAgICckdmlkZW8nOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjdmlldycpLFxyXG4gICAgJyRzb3VyY2UnOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI3NvdXJjZVwiKSxcclxuICAgICdhY3RpdmUkaW5wdXQnOiBudWxsLFxyXG4gICAgJ2hpZ2hRdWFsaXR5JzogZmFsc2UsXHJcbiAgICAnYWxpZ25WZXJ0aWNhbCc6IGZhbHNlXHJcbiAgfTtcclxuICByZXF1aXJlKCcuL2NoYW5uZWxTZWxlY3Rvci5qcycpXHJcbiAgcmVxdWlyZSgnLi9xdWFsaXR5U2VsZWN0b3IuanMnKVxyXG4gIHJlcXVpcmUoJy4vYWxpZ25TZWxlY3Rvci5qcycpXHJcbiAgcmVxdWlyZSgnLi9oaWRlU2hvd01lbnUuanMnKVxyXG4vLyAgIHJlcXVpcmUoJy4vZnVsbHNjcmVlbi5qcycpXHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgJGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX2J0bnNfX3F1YWxpdHknKVxyXG52YXIgJHNpZ25IUSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1t0aXRsZSA9IGhpZ2h0X3F1YWxpdHldJylcclxudmFyICRzaWduTFEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbdGl0bGUgPSBsb3dfcXVhbGl0eV0nKVxyXG5cclxuaWYgKCRzaWduTFEuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSA9IGZhbHNlXHJcbn0gZWxzZSBpZiAoJHNpZ25IUS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgd2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5ID0gdHJ1ZVxyXG59IGVsc2Uge1xyXG4gICRzaWduTFEuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICB3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkgPSBmYWxzZVxyXG59XHJcblxyXG4kYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlUXVhbGl0eSlcclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZVF1YWxpdHkgKGV2ZW50KSB7XHJcbiAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICB2YXIgbGluayA9IHVuZGVmaW5lZFxyXG4gIGlmICh3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkpIHtcclxuICAgICRzaWduSFEuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICAgICRzaWduTFEuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSA9IGZhbHNlXHJcbiAgICBpZiAod2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dCkge1xyXG4gICAgICBsaW5rID0gd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1scScpXHJcbiAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICB3aW5kb3cudmlld2VyU3RhdGUuJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8ucGxheSgpXHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgICRzaWduTFEuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICAgICRzaWduSFEuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSA9IHRydWVcclxuICAgIGlmICh3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0KSB7XHJcbiAgICAgIGxpbmsgPSB3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0LmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWhxJylcclxuICAgICAgd2luZG93LnZpZXdlclN0YXRlLiR2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kc291cmNlLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgd2luZG93LnZpZXdlclN0YXRlLiR2aWRlby5wbGF5KClcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19
