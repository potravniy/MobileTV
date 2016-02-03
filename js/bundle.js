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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2EwNS9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hbGlnblNlbGVjdG9yLmpzIiwianMvY2hhbm5lbFNlbGVjdG9yLmpzIiwianMvaGlkZVNob3dNZW51LmpzIiwianMvbWFpbi5qcyIsImpzL3F1YWxpdHlTZWxlY3Rvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN0Q0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2pFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzVIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIlwidXNlIHN0cmljdFwiXHJcblxyXG52YXIgJGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9vdGVyX19idG5zX19hbGlnblwiKVxyXG52YXIgJHZpZGVvID0gd2luZG93LnZpZXdlclN0YXRlLiR2aWRlbyBcclxuXHJcbmlmKCRidG4uY2xhc3NMaXN0LmNvbnRhaW5zKFwidmVydGljYWxcIikpIHtcclxuICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5hbGlnblZlcnRpY2FsID0gdHJ1ZTtcclxufSBlbHNlIGlmKCRidG4uY2xhc3NMaXN0LmNvbnRhaW5zKFwiaG9yaXNvbnRhbFwiKSkge1xyXG4gICAgd2luZG93LnZpZXdlclN0YXRlLmFsaWduVmVydGljYWwgPSBmYWxzZTtcclxufSBlbHNlIHtcclxuICAgICRidG4uY2xhc3NMaXN0LmFkZChcInZlcnRpY2FsXCIpXHJcbiAgICB3aW5kb3cudmlld2VyU3RhdGUuYWxpZ25WZXJ0aWNhbCA9IHRydWU7XHJcbn1cclxuZml0KClcclxuXHJcbiRidG4uYWRkRXZlbnRMaXN0ZW5lcihcImNsaWNrXCIsIHRvZ2dsZUFsaWduKVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlQWxpZ24oZXZlbnQpIHtcclxuICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5hbGlnblZlcnRpY2FsKSB7XHJcbiAgICAgICAgJGJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwidmVydGljYWxcIilcclxuICAgICAgICAkYnRuLmNsYXNzTGlzdC5hZGQoXCJob3Jpc29udGFsXCIpXHJcbiAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmFsaWduVmVydGljYWwgPSBmYWxzZTtcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJGJ0bi5jbGFzc0xpc3QucmVtb3ZlKFwiaG9yaXNvbnRhbFwiKVxyXG4gICAgICAgICRidG4uY2xhc3NMaXN0LmFkZChcInZlcnRpY2FsXCIpXHJcbiAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmFsaWduVmVydGljYWwgPSB0cnVlO1xyXG4gICAgfVxyXG4gICAgZml0KClcclxufVxyXG5cclxuZnVuY3Rpb24gZml0KCkge1xyXG4gICAgaWYoJGJ0bi5jbGFzc0xpc3QuY29udGFpbnMoXCJ2ZXJ0aWNhbFwiKSkge1xyXG4gICAgICAgICR2aWRlby5zdHlsZS53aWR0aCA9ICcxMDAlJ1xyXG4gICAgICAgICR2aWRlby5zdHlsZS5oZWlnaHQgPSAnMTAwJSdcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJHZpZGVvLnN0eWxlLndpZHRoID0gJzEwMCUnXHJcbiAgICAgICAgJHZpZGVvLnN0eWxlLmhlaWdodCA9ICdhdXRvJ1xyXG4gICAgfVxyXG59IiwiXCJ1c2Ugc3RyaWN0XCJcclxuXHJcbnZhciAkdmlkZW8gPSB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvXHJcbnZhciAkc291cmNlID0gd2luZG93LnZpZXdlclN0YXRlLiRzb3VyY2VcclxudmFyICRzbGlkZXIgPSB3aW5kb3cudmlld2VyU3RhdGUuJHNsaWRlclxyXG52YXIgJGJ0bk1lbnVPbk9mID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fYnRuc19fbWVudS1vZmYnKVxyXG52YXIgJGJ0bkFsaWduID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fYnRuc19fYWxpZ24nKVxyXG52YXIgbGluayA9ICcnXHJcbnZhciAkYnRucyA9IHtcclxuICAgIFwiY2hfMWdvcm9kc2tveVwiOiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF8xZ29yb2Rza295XCIpLFxyXG4gICAgXCJjaF8zdHN5ZnJvdm95XCI6ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoXzN0c3lmcm92b3lcIiksXHJcbiAgICBcImNoX3JlcG9ydGVyXCI6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfcmVwb3J0ZXJcIiksXHJcbiAgICBcImNoX2FjYWRlbWlhXCI6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfYWNhZGVtaWFcIiksXHJcbiAgICBcImNoX2ExXCI6ICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfYTFcIiksXHJcbiAgICBcImNoX2R1bXNrYXlhXCI6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfZHVtc2theWFcIiksXHJcbiAgICBcImNoX2d0dlwiOiAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfZ3R2XCIpLFxyXG4gICAgXCJjaF9zdHZcIjogICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX3N0dlwiKSxcclxuICAgIFwiY2hfdWduYXlhdm9sbmFcIjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF91Z25heWF2b2xuYVwiKSxcclxuICAgIFwiY2hfbmVtb1wiOiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9uZW1vXCIpXHJcbn1cclxuJGJ0bnMuY2hfMWdvcm9kc2tveS5zZXRBdHRyaWJ1dGUoICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxLzF0dm9kLzF0dm9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgICAgKVxyXG4kYnRucy5jaF8zdHN5ZnJvdm95LnNldEF0dHJpYnV0ZSggICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly9jZG41LmxpdmUtdHYub2QudWE6ODA4MS90di8zdHZvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiICApXHJcbiRidG5zLmNoX3JlcG9ydGVyLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovL2NkbjQubGl2ZS10di5vZC51YTo4MDgxL3R2LzMxY2hvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiIClcclxuJGJ0bnMuY2hfYWNhZGVtaWEuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vY2RuNC5saXZlLXR2Lm9kLnVhOjgwODEvdHYvMzZjaG9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgKVxyXG4kYnRucy5jaF9hMS5zZXRBdHRyaWJ1dGUoICAgICAgICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvYTFvZC9hMW9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgICAgICApXHJcbiRidG5zLmNoX2R1bXNrYXlhLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovL2NkbjIubGl2ZS10di5vZC51YTo4MDgxL3R2L2R1bXNrYS1hYnItbHEvcGxheWxpc3QubTN1OFwiIClcclxuJGJ0bnMuY2hfZ3R2LnNldEF0dHJpYnV0ZSggICAgICAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL2Exb2QvZ3R2b2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICAgKVxyXG4kYnRucy5jaF9zdHYuc2V0QXR0cmlidXRlKCAgICAgICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvc3R2b2Qvc3R2b2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICApXHJcbiRidG5zLmNoX3VnbmF5YXZvbG5hLnNldEF0dHJpYnV0ZSggJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS93YXZlL3dhdmUtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICAgIClcclxuJGJ0bnMuY2hfbmVtby5zZXRBdHRyaWJ1dGUoICAgICAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL25lbW8vbW9yLXN1Yi9wbGF5bGlzdC5tM3U4XCIgICAgICAgICAgKVxyXG5cclxuJGJ0bnMuY2hfMWdvcm9kc2tveS5zZXRBdHRyaWJ1dGUoICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxLzF0dm9kLzF0dm9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgKVxyXG4kYnRucy5jaF8zdHN5ZnJvdm95LnNldEF0dHJpYnV0ZSggICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly9jZG41LmxpdmUtdHYub2QudWE6ODA4MS90di8zdHZvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgICApXHJcbiRidG5zLmNoX3JlcG9ydGVyLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovL2NkbjQubGl2ZS10di5vZC51YTo4MDgxL3R2LzMxY2hvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgIClcclxuJGJ0bnMuY2hfYWNhZGVtaWEuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vY2RuNC5saXZlLXR2Lm9kLnVhOjgwODEvdHYvMzZjaG9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgKVxyXG4kYnRucy5jaF9hMS5zZXRBdHRyaWJ1dGUoICAgICAgICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvYTFvZC9hMW9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgICApXHJcbiRidG5zLmNoX2R1bXNrYXlhLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovL2NkbjIubGl2ZS10di5vZC51YTo4MDgxL3R2L2R1bXNrYS1hYnIvcGxheWxpc3QubTN1OFwiICAgIClcclxuJGJ0bnMuY2hfZ3R2LnNldEF0dHJpYnV0ZSggICAgICAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL2Exb2QvZ3R2b2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICAgKVxyXG4kYnRucy5jaF9zdHYuc2V0QXR0cmlidXRlKCAgICAgICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvc3R2b2Qvc3R2b2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICApXHJcbiRidG5zLmNoX3VnbmF5YXZvbG5hLnNldEF0dHJpYnV0ZSggJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS93YXZlL3dhdmUtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICAgIClcclxuJGJ0bnMuY2hfbmVtby5zZXRBdHRyaWJ1dGUoICAgICAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL25lbW8vbW9yLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgICAgKVxyXG5cclxuJHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGV2ZW50KXtcclxuICAgIGlmKGV2ZW50LnNyY0VsZW1lbnQudGFnTmFtZSA9PT0gJ0lOUFVUJyl7XHJcbiAgICAgICAgaWYod2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dCA9PT0gZXZlbnQuc3JjRWxlbWVudCkge1xyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0LmNoZWNrZWQgPSBmYWxzZVxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0ID0gbnVsbFxyXG4gICAgICAgICAgICAkdmlkZW8uc3R5bGUuYmFja2dyb3VuZFNpemUgPSBcIlwiXHJcbiAgICAgICAgICAgICR2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsICcnKVxyXG4gICAgICAgICAgICAkc291cmNlLnNldEF0dHJpYnV0ZSgnc3JjJywgJycpXHJcbiAgICAgICAgICAgICRidG5NZW51T25PZi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgICAgICRidG5BbGlnbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dCA9IGV2ZW50LnNyY0VsZW1lbnRcclxuICAgICAgICAgICAgaWYod2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5KSAgbGluayA9IGV2ZW50LnNyY0VsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmstaHEnKVxyXG4gICAgICAgICAgICBlbHNlIGxpbmsgPSBldmVudC5zcmNFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWxxJylcclxuICAgICAgICAgICAgJHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgICAgICAgJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgICAgICAgICR2aWRlby5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9IFwiMCAwXCJcclxuICAgICAgICAgICAgJHZpZGVvLnBsYXkoKTtcclxuICAgICAgICAgICAgJGJ0bk1lbnVPbk9mLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJ1xyXG4gICAgICAgICAgICAkYnRuQWxpZ24uc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbnZhciAkdmlkZW8gPSB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvXHJcbnZhciAkc2xpZGVyID0gd2luZG93LnZpZXdlclN0YXRlLiRzbGlkZXJcclxudmFyICRmb290ZXIgPSB3aW5kb3cudmlld2VyU3RhdGUuJGZvb3RlclxyXG52YXIgJG92ZXJWaWV3Qm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJveC1vdmVyLXZpZXcnKVxyXG52YXIgJGJ0bk1lbnVPZmYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19idG5zX19tZW51LW9mZicpXHJcbnZhciAkYXJyb3dNZW51T25PZmYgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubWVudV9vbl9vZmYnKVxyXG52YXIgJGFycm93VGV4dCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5tZW51X29uX29mZl9fdGV4dCcpXHJcbnZhciBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxudmFyIGR1cmF0aW9uID0gMTAwMCAvLyAgbXNcclxudmFyIGR1cmF0aW9uX2Zhc3QgPSA1MDAgLy8gIG1zXHJcblxyXG4kYnRuTWVudU9mZi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShoaWRlTWVudUhvcilcclxufSlcclxuJGFycm93TWVudU9uT2ZmLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlclRvcENvbG9yID0gICcjNDhmJztcclxuICAgICRhcnJvd1RleHQuaW5uZXJUZXh0ID0gJydcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShzaG93TWVudVZlcnQpXHJcbn0pXHJcblxyXG5mdW5jdGlvbiBoaWRlTWVudUhvciAodGltZVN0YW1wKSB7XHJcbiAgaWYgKCFzdGFydFRpbWUpIHN0YXJ0VGltZSA9IHRpbWVTdGFtcFxyXG4gIHZhciBwcm9ncmVzcyA9ICh0aW1lU3RhbXAgLSBzdGFydFRpbWUpIC8gZHVyYXRpb25cclxuICBpZiAocHJvZ3Jlc3MgPD0gMSkge1xyXG4gICAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUucmlnaHQgPSAxMDAgLSAxMDAgKiBwcm9ncmVzcyArICclJ1xyXG4gICAgICAkZm9vdGVyLnN0eWxlLmxlZnQgPSAxMDAgKiBwcm9ncmVzcyArICclJ1xyXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGlkZU1lbnVIb3IpXHJcbiAgfSBlbHNlIHtcclxuICAgICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLnJpZ2h0ID0gMFxyXG4gICAgICAkZm9vdGVyLnN0eWxlLmxlZnQgPSAxMDAgKyAnJSdcclxuICAgICAgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAgIHR1cm5BcnJvd1VwKClcclxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhpZGVNZW51VmVydClcclxuICB9XHJcbn1cclxuZnVuY3Rpb24gdHVybkFycm93VXAoKSB7XHJcbiAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm9yZGVyVG9wID0gJ25vbmUnXHJcbiAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm9yZGVyUmlnaHQgPSAnMi41ZW0gc29saWQgdHJhbnNwYXJlbnQnXHJcbiAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm9yZGVyQm90dG9tID0gJzJlbSBzb2xpZCAjNDhmJ1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlckxlZnQgPSAnMi41ZW0gc29saWQgdHJhbnNwYXJlbnQnXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGhpZGVNZW51VmVydCh0aW1lU3RhbXApIHtcclxuICBpZiAoIXN0YXJ0VGltZSkgc3RhcnRUaW1lID0gdGltZVN0YW1wXHJcbiAgdmFyIHByb2dyZXNzID0gKHRpbWVTdGFtcCAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvblxyXG4gIGlmIChwcm9ncmVzcyA8PSAxKSB7XHJcbiAgICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3R0b20gPSAxMDAgKiBwcm9ncmVzcyArICclJ1xyXG4gICAgICAkb3ZlclZpZXdCb3guc3R5bGUudG9wID0gLTEwMCAqIHByb2dyZXNzICsgJyUnXHJcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShoaWRlTWVudVZlcnQpXHJcbiAgfSBlbHNlIHtcclxuICAgICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvdHRvbSA9IDEwMCArICclJ1xyXG4gICAgICAkb3ZlclZpZXdCb3guc3R5bGUudG9wID0gLTkwICsgJyUnXHJcbiAgICAgIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgICB0dXJuQXJyb3dEb253KClcclxuICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGRyb3BEb3duKVxyXG4gIH1cclxufVxyXG5mdW5jdGlvbiB0dXJuQXJyb3dEb253KCkge1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlclRvcCA9ICcyZW0gc29saWQgIzQ4ZidcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJSaWdodCA9ICcyLjVlbSBzb2xpZCB0cmFuc3BhcmVudCdcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJCb3R0b20gPSAnbm9uZSdcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJMZWZ0ID0gJzIuNWVtIHNvbGlkIHRyYW5zcGFyZW50J1xyXG59XHJcbmZ1bmN0aW9uIGRyb3BEb3duKHRpbWVTdGFtcCkge1xyXG4gIGlmICghc3RhcnRUaW1lKSBzdGFydFRpbWUgPSB0aW1lU3RhbXBcclxuICB2YXIgcHJvZ3Jlc3MgPSAodGltZVN0YW1wIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uX2Zhc3RcclxuICBpZiAocHJvZ3Jlc3MgPD0gMSkge1xyXG4gICAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm90dG9tID0gMTAwIC0gMTAgKiBwcm9ncmVzcyArICclJ1xyXG4gICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoZHJvcERvd24pXHJcbiAgfSBlbHNlIHtcclxuICAgICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvdHRvbSA9IDkwICsgJyUnXHJcbiAgICAgIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgJGFycm93VGV4dC5pbm5lclRleHQgPSAnbWVudSdcclxuICAgICAgICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJUb3BDb2xvciA9ICAncmdiYSg2OCwgMTM2LCAyNTUsIDAuMyknO1xyXG4gICAgICB9LCAzMDApO1xyXG4gIH1cclxufVxyXG5cclxuXHJcblxyXG5mdW5jdGlvbiBzaG93TWVudVZlcnQgKHRpbWVTdGFtcCkge1xyXG4gIGlmICghc3RhcnRUaW1lKSBzdGFydFRpbWUgPSB0aW1lU3RhbXBcclxuICB2YXIgcHJvZ3Jlc3MgPSAodGltZVN0YW1wIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uXHJcbiAgaWYgKHByb2dyZXNzIDw9IDEpIHtcclxuICAgICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvdHRvbSA9IDkwIC0gOTAgKiBwcm9ncmVzcyArICclJ1xyXG4gICAgICAkb3ZlclZpZXdCb3guc3R5bGUudG9wID0gLTkwICsgOTAgKiBwcm9ncmVzcyArICclJ1xyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNob3dNZW51VmVydClcclxuICB9IGVsc2Uge1xyXG4gICAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm90dG9tID0gMFxyXG4gICAgICAkb3ZlclZpZXdCb3guc3R5bGUudG9wID0gMFxyXG4gICAgICBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgICAgdHVybkFycm93TGVmdCgpXHJcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShzaG93TWVudUhvcilcclxuICB9XHJcbn1cclxuZnVuY3Rpb24gdHVybkFycm93TGVmdCgpIHtcclxuICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5ib3JkZXJUb3AgPSAnMWVtIHNvbGlkIHRyYW5zcGFyZW50J1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlclJpZ2h0ID0gJzVlbSBzb2xpZCAjNDhmJ1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlckJvdHRvbSA9ICcxZW0gc29saWQgdHJhbnNwYXJlbnQnXHJcbiAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm9yZGVyTGVmdCA9ICdub25lJ1xyXG59XHJcbmZ1bmN0aW9uIHNob3dNZW51SG9yICh0aW1lU3RhbXApIHtcclxuICBpZiAoIXN0YXJ0VGltZSkgc3RhcnRUaW1lID0gdGltZVN0YW1wXHJcbiAgdmFyIHByb2dyZXNzID0gKHRpbWVTdGFtcCAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvblxyXG4gIGlmIChwcm9ncmVzcyA8PSAxKSB7XHJcbiAgICAgICRhcnJvd01lbnVPbk9mZi5zdHlsZS5yaWdodCA9IDEwMCAqIHByb2dyZXNzICsgJyUnXHJcbiAgICAgICRmb290ZXIuc3R5bGUubGVmdCA9IDEwMCAtIDEwMCAqIHByb2dyZXNzICsgJyUnXHJcbiAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShzaG93TWVudUhvcilcclxuICB9IGVsc2Uge1xyXG4gICAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUucmlnaHQgPSAxMDAgKyAnJSdcclxuICAgICAgJGZvb3Rlci5zdHlsZS5sZWZ0ID0gMFxyXG4gICAgICBzdGFydFRpbWUgPSB1bmRlZmluZWRcclxuICAgICAgdHVybkFycm93VG9Jbml0KClcclxuICB9XHJcbn1cclxuZnVuY3Rpb24gdHVybkFycm93VG9Jbml0KCkge1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlclRvcCA9ICcnXHJcbiAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm9yZGVyUmlnaHQgPSAnJ1xyXG4gICAgJGFycm93TWVudU9uT2ZmLnN0eWxlLmJvcmRlckJvdHRvbSA9ICcnXHJcbiAgICAkYXJyb3dNZW51T25PZmYuc3R5bGUuYm9yZGVyTGVmdCA9ICcnXHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZSA9IHtcclxuICAgICckc2xpZGVyJzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5zaWRlYmFyX19zbGlkZXJcIiksXHJcbiAgICAnJGZvb3Rlcic6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuZm9vdGVyXCIpLFxyXG4gICAgJyR2aWRlbyc6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyN2aWV3JyksXHJcbiAgICAnJHNvdXJjZSc6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjc291cmNlXCIpLFxyXG4gICAgJ2FjdGl2ZSRpbnB1dCc6IG51bGwsXHJcbiAgICAnaGlnaFF1YWxpdHknOiBmYWxzZSxcclxuICAgICdhbGlnblZlcnRpY2FsJzogZmFsc2VcclxuICB9O1xyXG4gIHJlcXVpcmUoJy4vY2hhbm5lbFNlbGVjdG9yLmpzJylcclxuICByZXF1aXJlKCcuL3F1YWxpdHlTZWxlY3Rvci5qcycpXHJcbiAgcmVxdWlyZSgnLi9hbGlnblNlbGVjdG9yLmpzJylcclxuICByZXF1aXJlKCcuL2hpZGVTaG93TWVudS5qcycpXHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgJGJ0biA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX2J0bnNfX3F1YWxpdHknKVxyXG52YXIgJHNpZ25IUSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1t0aXRsZSA9IGhpZ2h0X3F1YWxpdHldJylcclxudmFyICRzaWduTFEgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdbdGl0bGUgPSBsb3dfcXVhbGl0eV0nKVxyXG5cclxuaWYgKCRzaWduTFEuY2xhc3NMaXN0LmNvbnRhaW5zKCdhY3RpdmUnKSkge1xyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSA9IGZhbHNlXHJcbn0gZWxzZSBpZiAoJHNpZ25IUS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgd2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5ID0gdHJ1ZVxyXG59IGVsc2Uge1xyXG4gICRzaWduTFEuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICB3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkgPSBmYWxzZVxyXG59XHJcblxyXG4kYnRuLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlUXVhbGl0eSlcclxuXHJcbmZ1bmN0aW9uIHRvZ2dsZVF1YWxpdHkgKGV2ZW50KSB7XHJcbiAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcclxuICB2YXIgbGluayA9IHVuZGVmaW5lZFxyXG4gIGlmICh3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkpIHtcclxuICAgICRzaWduSFEuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICAgICRzaWduTFEuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSA9IGZhbHNlXHJcbiAgICBpZiAod2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dCkge1xyXG4gICAgICBsaW5rID0gd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1scScpXHJcbiAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICB3aW5kb3cudmlld2VyU3RhdGUuJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8ucGxheSgpXHJcbiAgICB9XHJcbiAgfSBlbHNlIHtcclxuICAgICRzaWduTFEuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICAgICRzaWduSFEuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSA9IHRydWVcclxuICAgIGlmICh3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0KSB7XHJcbiAgICAgIGxpbmsgPSB3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0LmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWhxJylcclxuICAgICAgd2luZG93LnZpZXdlclN0YXRlLiR2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kc291cmNlLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgd2luZG93LnZpZXdlclN0YXRlLiR2aWRlby5wbGF5KClcclxuICAgIH1cclxuICB9XHJcbn1cclxuIl19
