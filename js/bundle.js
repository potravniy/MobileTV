(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict"

var $video = window.viewerState.$video
var $source = document.querySelector("#source")
var $slider = document.querySelector(".sidebar__slider")
var link = ''
var $btns = {
    "gorodskoy1":  document.querySelector("#ch-1gorodskoy"),
    "tsyfrovoy3":  document.querySelector("#ch-3tsyfrovoy"),
    "reporter":    document.querySelector("#ch-reporter"),
    "academia":    document.querySelector("#ch-academia"),
    "a1":          document.querySelector("#ch-a1"),
    "dumskaya":    document.querySelector("#ch-dumskaya"),
    "gtv":         document.querySelector("#ch-gtv"),
    "stv":         document.querySelector("#ch-stv"),
    "ugnayavolna": document.querySelector("#ch-ugnayavolna"),
    "nemo":        document.querySelector("#ch-nemo")
}
$btns.gorodskoy1.setAttribute(  'data-linkLQ', "http://77.88.196.133:8081/1tvod/1tvod-abr-lq/playlist.m3u8"    )
$btns.tsyfrovoy3.setAttribute(  'data-linkLQ', "http://cdn5.live-tv.od.ua:8081/tv/3tvod-abr-lq/playlist.m3u8"  )
$btns.reporter.setAttribute(    'data-linkLQ', "http://cdn4.live-tv.od.ua:8081/tv/31chod-abr-lq/playlist.m3u8" )
$btns.academia.setAttribute(    'data-linkLQ', "http://cdn4.live-tv.od.ua:8081/tv/36chod-abr-lq/playlist.m3u8" )
$btns.a1.setAttribute(          'data-linkLQ', "http://77.88.196.133:8081/a1od/a1od-abr-lq/playlist.m3u8"      )
$btns.dumskaya.setAttribute(    'data-linkLQ', "http://cdn2.live-tv.od.ua:8081/tv/dumska-abr-lq/playlist.m3u8" )
$btns.gtv.setAttribute(         'data-linkLQ', "http://77.88.196.133:8081/a1od/gtvod-abr-lq/playlist.m3u8"     )
$btns.stv.setAttribute(         'data-linkLQ', "http://77.88.196.133:8081/stvod/stvod-abr-lq/playlist.m3u8"    )
$btns.ugnayavolna.setAttribute( 'data-linkLQ', "http://77.88.196.133:8081/wave/wave-abr-lq/playlist.m3u8"      )
$btns.nemo.setAttribute(        'data-linkLQ', "http://77.88.196.133:8081/nemo/mor-sub/playlist.m3u8"          )

$btns.gorodskoy1.setAttribute(  'data-linkHQ', "http://77.88.196.133:8081/1tvod/1tvod-abr/playlist.m3u8"       )
$btns.tsyfrovoy3.setAttribute(  'data-linkHQ', "http://cdn5.live-tv.od.ua:8081/tv/3tvod-abr/playlist.m3u8"     )
$btns.reporter.setAttribute(    'data-linkHQ', "http://cdn4.live-tv.od.ua:8081/tv/31chod-abr/playlist.m3u8"    )
$btns.academia.setAttribute(    'data-linkHQ', "http://cdn4.live-tv.od.ua:8081/tv/36chod-abr/playlist.m3u8"    )
$btns.a1.setAttribute(          'data-linkHQ', "http://77.88.196.133:8081/a1od/a1od-abr/playlist.m3u8"         )
$btns.dumskaya.setAttribute(    'data-linkHQ', "http://cdn2.live-tv.od.ua:8081/tv/dumska-abr/playlist.m3u8"    )
$btns.gtv.setAttribute(         'data-linkHQ', "http://77.88.196.133:8081/a1od/gtvod-abr/playlist.m3u8"        )
$btns.stv.setAttribute(         'data-linkHQ', "http://77.88.196.133:8081/stvod/stvod-abr/playlist.m3u8"       )
$btns.ugnayavolna.setAttribute( 'data-linkHQ', "http://77.88.196.133:8081/wave/wave-abr/playlist.m3u8"         )
$btns.nemo.setAttribute(        'data-linkHQ', "http://77.88.196.133:8081/nemo/mor-abr/playlist.m3u8"          )

$video.play()

$slider.addEventListener('click', function(event){
    if(event.srcElement.tagName === 'INPUT'){
        if(window.viewerState.highQuality)  link = event.srcElement.getAttribute('data-linkHQ')
        else link = event.srcElement.getAttribute('data-linkLQ')
        $video.setAttribute('src', link)
        $source.setAttribute('src', link)
        $video.play();
    }
})

},{}],2:[function(require,module,exports){
'use strict'

var $btn = document.querySelector('.footer__btns__fullscr')
var $video = window.viewerState.$video
if (
  document.fullscreenEnabled ||
  document.webkitFullscreenEnabled ||
  document.mozFullScreenEnabled ||
  document.msFullscreenEnabled
) {
  $btn.addEventListener('click', function () {
      var a=5
    if ($video.requestFullscreen) {
      $video.requestFullscreen()
    } else if ($video.webkitRequestFullscreen) {
      $video.webkitRequestFullscreen()
    } else if ($video.mozRequestFullScreen) {
      $video.mozRequestFullScreen()
    } else if ($video.msRequestFullscreen) {
      $video.msRequestFullscreen()
    }
  })
}// else $btn.style.display = 'none'

},{}],3:[function(require,module,exports){
'use strict'

window.onload = function () {
  window.viewerState = {
    'highQuality': false,
    'alignVertical': false,
    '$video': document.querySelector('#view')
  };
  require('./channelSelector.js')
  require('./qualitySelector.js')
  require('./fullscreen.js')
//  require('./alignSelector.js')
//  require('./hideShowMenu.js')
}

},{"./channelSelector.js":1,"./fullscreen.js":2,"./qualitySelector.js":4}],4:[function(require,module,exports){
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
  if (window.viewerState.highQuality) {
    $signHQ.classList.remove('active')
    $signLQ.classList.add('active')
    window.viewerState.highQuality = false
  } else {
    $signLQ.classList.remove('active')
    $signHQ.classList.add('active')
    window.viewerState.highQuality = true
  }
}

},{}]},{},[3])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2EwNS9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJjaGFubmVsU2VsZWN0b3IuanMiLCJmdWxsc2NyZWVuLmpzIiwibWFpbi5qcyIsInF1YWxpdHlTZWxlY3Rvci5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25EQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdkJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNkQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiXCJ1c2Ugc3RyaWN0XCJcclxuXHJcbnZhciAkdmlkZW8gPSB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvXHJcbnZhciAkc291cmNlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNzb3VyY2VcIilcclxudmFyICRzbGlkZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLnNpZGViYXJfX3NsaWRlclwiKVxyXG52YXIgbGluayA9ICcnXHJcbnZhciAkYnRucyA9IHtcclxuICAgIFwiZ29yb2Rza295MVwiOiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaC0xZ29yb2Rza295XCIpLFxyXG4gICAgXCJ0c3lmcm92b3kzXCI6ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoLTN0c3lmcm92b3lcIiksXHJcbiAgICBcInJlcG9ydGVyXCI6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2gtcmVwb3J0ZXJcIiksXHJcbiAgICBcImFjYWRlbWlhXCI6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2gtYWNhZGVtaWFcIiksXHJcbiAgICBcImExXCI6ICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2gtYTFcIiksXHJcbiAgICBcImR1bXNrYXlhXCI6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2gtZHVtc2theWFcIiksXHJcbiAgICBcImd0dlwiOiAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2gtZ3R2XCIpLFxyXG4gICAgXCJzdHZcIjogICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoLXN0dlwiKSxcclxuICAgIFwidWduYXlhdm9sbmFcIjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaC11Z25heWF2b2xuYVwiKSxcclxuICAgIFwibmVtb1wiOiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaC1uZW1vXCIpXHJcbn1cclxuJGJ0bnMuZ29yb2Rza295MS5zZXRBdHRyaWJ1dGUoICAnZGF0YS1saW5rTFEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvMXR2b2QvMXR2b2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICApXHJcbiRidG5zLnRzeWZyb3ZveTMuc2V0QXR0cmlidXRlKCAgJ2RhdGEtbGlua0xRJywgXCJodHRwOi8vY2RuNS5saXZlLXR2Lm9kLnVhOjgwODEvdHYvM3R2b2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgKVxyXG4kYnRucy5yZXBvcnRlci5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmtMUScsIFwiaHR0cDovL2NkbjQubGl2ZS10di5vZC51YTo4MDgxL3R2LzMxY2hvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiIClcclxuJGJ0bnMuYWNhZGVtaWEuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rTFEnLCBcImh0dHA6Ly9jZG40LmxpdmUtdHYub2QudWE6ODA4MS90di8zNmNob2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiApXHJcbiRidG5zLmExLnNldEF0dHJpYnV0ZSggICAgICAgICAgJ2RhdGEtbGlua0xRJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL2Exb2QvYTFvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiICAgICAgKVxyXG4kYnRucy5kdW1za2F5YS5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmtMUScsIFwiaHR0cDovL2NkbjIubGl2ZS10di5vZC51YTo4MDgxL3R2L2R1bXNrYS1hYnItbHEvcGxheWxpc3QubTN1OFwiIClcclxuJGJ0bnMuZ3R2LnNldEF0dHJpYnV0ZSggICAgICAgICAnZGF0YS1saW5rTFEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvYTFvZC9ndHZvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiICAgICApXHJcbiRidG5zLnN0di5zZXRBdHRyaWJ1dGUoICAgICAgICAgJ2RhdGEtbGlua0xRJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL3N0dm9kL3N0dm9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgICAgKVxyXG4kYnRucy51Z25heWF2b2xuYS5zZXRBdHRyaWJ1dGUoICdkYXRhLWxpbmtMUScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS93YXZlL3dhdmUtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICAgIClcclxuJGJ0bnMubmVtby5zZXRBdHRyaWJ1dGUoICAgICAgICAnZGF0YS1saW5rTFEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvbmVtby9tb3Itc3ViL3BsYXlsaXN0Lm0zdThcIiAgICAgICAgICApXHJcblxyXG4kYnRucy5nb3JvZHNrb3kxLnNldEF0dHJpYnV0ZSggICdkYXRhLWxpbmtIUScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS8xdHZvZC8xdHZvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgIClcclxuJGJ0bnMudHN5ZnJvdm95My5zZXRBdHRyaWJ1dGUoICAnZGF0YS1saW5rSFEnLCBcImh0dHA6Ly9jZG41LmxpdmUtdHYub2QudWE6ODA4MS90di8zdHZvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgICApXHJcbiRidG5zLnJlcG9ydGVyLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGlua0hRJywgXCJodHRwOi8vY2RuNC5saXZlLXR2Lm9kLnVhOjgwODEvdHYvMzFjaG9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgKVxyXG4kYnRucy5hY2FkZW1pYS5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmtIUScsIFwiaHR0cDovL2NkbjQubGl2ZS10di5vZC51YTo4MDgxL3R2LzM2Y2hvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgIClcclxuJGJ0bnMuYTEuc2V0QXR0cmlidXRlKCAgICAgICAgICAnZGF0YS1saW5rSFEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvYTFvZC9hMW9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgICApXHJcbiRidG5zLmR1bXNrYXlhLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGlua0hRJywgXCJodHRwOi8vY2RuMi5saXZlLXR2Lm9kLnVhOjgwODEvdHYvZHVtc2thLWFici9wbGF5bGlzdC5tM3U4XCIgICAgKVxyXG4kYnRucy5ndHYuc2V0QXR0cmlidXRlKCAgICAgICAgICdkYXRhLWxpbmtIUScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9hMW9kL2d0dm9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgIClcclxuJGJ0bnMuc3R2LnNldEF0dHJpYnV0ZSggICAgICAgICAnZGF0YS1saW5rSFEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvc3R2b2Qvc3R2b2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICApXHJcbiRidG5zLnVnbmF5YXZvbG5hLnNldEF0dHJpYnV0ZSggJ2RhdGEtbGlua0hRJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL3dhdmUvd2F2ZS1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgICAgKVxyXG4kYnRucy5uZW1vLnNldEF0dHJpYnV0ZSggICAgICAgICdkYXRhLWxpbmtIUScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9uZW1vL21vci1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgICAgIClcclxuXHJcbiR2aWRlby5wbGF5KClcclxuXHJcbiRzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihldmVudCl7XHJcbiAgICBpZihldmVudC5zcmNFbGVtZW50LnRhZ05hbWUgPT09ICdJTlBVVCcpe1xyXG4gICAgICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSkgIGxpbmsgPSBldmVudC5zcmNFbGVtZW50LmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rSFEnKVxyXG4gICAgICAgIGVsc2UgbGluayA9IGV2ZW50LnNyY0VsZW1lbnQuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmtMUScpXHJcbiAgICAgICAgJHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgICAkc291cmNlLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgICAkdmlkZW8ucGxheSgpO1xyXG4gICAgfVxyXG59KVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbnZhciAkYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fYnRuc19fZnVsbHNjcicpXHJcbnZhciAkdmlkZW8gPSB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvXHJcbmlmIChcclxuICBkb2N1bWVudC5mdWxsc2NyZWVuRW5hYmxlZCB8fFxyXG4gIGRvY3VtZW50LndlYmtpdEZ1bGxzY3JlZW5FbmFibGVkIHx8XHJcbiAgZG9jdW1lbnQubW96RnVsbFNjcmVlbkVuYWJsZWQgfHxcclxuICBkb2N1bWVudC5tc0Z1bGxzY3JlZW5FbmFibGVkXHJcbikge1xyXG4gICRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XHJcbiAgICAgIHZhciBhPTVcclxuICAgIGlmICgkdmlkZW8ucmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgJHZpZGVvLnJlcXVlc3RGdWxsc2NyZWVuKClcclxuICAgIH0gZWxzZSBpZiAoJHZpZGVvLndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XHJcbiAgICAgICR2aWRlby53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpXHJcbiAgICB9IGVsc2UgaWYgKCR2aWRlby5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xyXG4gICAgICAkdmlkZW8ubW96UmVxdWVzdEZ1bGxTY3JlZW4oKVxyXG4gICAgfSBlbHNlIGlmICgkdmlkZW8ubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xyXG4gICAgICAkdmlkZW8ubXNSZXF1ZXN0RnVsbHNjcmVlbigpXHJcbiAgICB9XHJcbiAgfSlcclxufS8vIGVsc2UgJGJ0bi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICB3aW5kb3cudmlld2VyU3RhdGUgPSB7XHJcbiAgICAnaGlnaFF1YWxpdHknOiBmYWxzZSxcclxuICAgICdhbGlnblZlcnRpY2FsJzogZmFsc2UsXHJcbiAgICAnJHZpZGVvJzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI3ZpZXcnKVxyXG4gIH07XHJcbiAgcmVxdWlyZSgnLi9jaGFubmVsU2VsZWN0b3IuanMnKVxyXG4gIHJlcXVpcmUoJy4vcXVhbGl0eVNlbGVjdG9yLmpzJylcclxuICByZXF1aXJlKCcuL2Z1bGxzY3JlZW4uanMnKVxyXG4vLyAgcmVxdWlyZSgnLi9hbGlnblNlbGVjdG9yLmpzJylcclxuLy8gIHJlcXVpcmUoJy4vaGlkZVNob3dNZW51LmpzJylcclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbnZhciAkYnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fYnRuc19fcXVhbGl0eScpXHJcbnZhciAkc2lnbkhRID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignW3RpdGxlID0gaGlnaHRfcXVhbGl0eV0nKVxyXG52YXIgJHNpZ25MUSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ1t0aXRsZSA9IGxvd19xdWFsaXR5XScpXHJcblxyXG5pZiAoJHNpZ25MUS5jbGFzc0xpc3QuY29udGFpbnMoJ2FjdGl2ZScpKSB7XHJcbiAgd2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5ID0gZmFsc2VcclxufSBlbHNlIGlmICgkc2lnbkhRLmNsYXNzTGlzdC5jb250YWlucygnYWN0aXZlJykpIHtcclxuICB3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkgPSB0cnVlXHJcbn0gZWxzZSB7XHJcbiAgJHNpZ25MUS5jbGFzc0xpc3QuYWRkKCdhY3RpdmUnKVxyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSA9IGZhbHNlXHJcbn1cclxuXHJcbiRidG4uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVRdWFsaXR5KVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlUXVhbGl0eSAoZXZlbnQpIHtcclxuICBldmVudC5zdG9wUHJvcGFnYXRpb24oKVxyXG4gIGlmICh3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkpIHtcclxuICAgICRzaWduSFEuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICAgICRzaWduTFEuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSA9IGZhbHNlXHJcbiAgfSBlbHNlIHtcclxuICAgICRzaWduTFEuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJylcclxuICAgICRzaWduSFEuY2xhc3NMaXN0LmFkZCgnYWN0aXZlJylcclxuICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSA9IHRydWVcclxuICB9XHJcbn1cclxuIl19
