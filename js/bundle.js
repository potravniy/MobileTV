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
    if ($box.requestFullscreen ||
        $box.mozRequestFullScreen ||
        $box.webkitRequestFullscreen ||
        $box.msRequestFullscreen) {
        return true 
    } else {
        return false 
    }
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

module.exports = (function() {
    if(window.viewerState.is_iPad_iPhone && window.innerHeight >= window.screen.availHeight) {
        return true
    } else return false
})()

},{}],5:[function(require,module,exports){
'use strict'

var $video = window.viewerState.$video,
    $btnPlayFooter = window.viewerState.$btnPlayFooter,
    $btnPlayCtrl = window.viewerState.$btnPlayCtrl,
    $svgPlayFooter = document.querySelector('.footer .btn_play__icon_play'),
    $svgPlayCtrl = document.querySelector('.control .btn_play__icon_play'),
    $svgPauseFooter = document.querySelector('.footer .btn_play__icon_pause'),
    $svgPauseCtrl = document.querySelector('.control .btn_play__icon_pause'),
    classList = window.viewerState.classList

if ($video.paused){
    setIconsPlay()
} else {
    setIconsPause()
} 
$btnPlayFooter.addEventListener('click', togglePlayPause)
$btnPlayCtrl.addEventListener('click', togglePlayPause)
$video.addEventListener('play', setIconsPause())
$video.addEventListener('pause', setIconsPlay())
$video.addEventListener('click', function(e){
        e.preventDefault()
})
function togglePlayPause(){
    if ($video.paused) $video.play() 
    else $video.pause()
}
function setIconsPlay() {
    classList.add($svgPlayFooter, "active")
    classList.add($svgPlayCtrl, "active")
    classList.remove($svgPauseFooter, "active")
    classList.remove($svgPauseCtrl, "active")
}
function setIconsPause() {
    classList.add($svgPauseFooter, "active")
    classList.add($svgPauseCtrl, "active")
    classList.remove($svgPlayFooter, "active")
    classList.remove($svgPlayCtrl, "active")
}
},{}],6:[function(require,module,exports){
'use strict'

var $btnQuality = window.viewerState.$btnQuality,
    $svgQuality = document.querySelector('.btn_quality__icon'),
    highQuality = window.viewerState.highQuality,
    active$input = window.viewerState.active$input,
    $video = window.viewerState.$video,
    $source = window.viewerState.$source,
    classList = window.viewerState.classList,
    link = ''

styleQualityButton()

$btnQuality.addEventListener('click', function(){
    if (active$input) {
        if (highQuality) {
            highQuality = false
            link = active$input.getAttribute('data-link-lq')
            $video.setAttribute('src', link)
            $source.setAttribute('src', link)
            $video.play()
        } else {
            highQuality = true
            link = active$input.getAttribute('data-link-hq')
            $video.setAttribute('src', link)
            $source.setAttribute('src', link)
            $video.play()
        }
        styleQualityButton()
    }
})

function styleQualityButton() {
    if (highQuality) {
        classList.remove($svgQuality, 'disabled')
    } else {
        classList.add($svgQuality, 'disabled')
    }
}
},{}],7:[function(require,module,exports){
'use strict'

//          Scale
var $box = window.viewerState.$box,
    $video = window.viewerState.$video,
    $btnScale = window.viewerState.$btnScale,
    $svgScale = document.querySelector('.scale_box__btn_icon'),
    $btnScaleSubBtnsBox = document.querySelector('.scale_box__subbtns'),
    $subBtnUp = window.viewerState.$subBtnUp,
    $subBtnDown = window.viewerState.$subBtnDown,
    $subBtnUpIcon = document.querySelector('.subbtn_up'),
    $subBtnDownIcon = document.querySelector('.subbtn_down'),
    $btnMenuOff = window.viewerState.$btnMenuOff,
    classList = window.viewerState.classList,
    ratio = undefined,
    max$videoHeight = undefined,
    min$videoHeight = undefined,
    step = undefined,
    n = undefined,
    nMax = 0,
    nMin = 0,
    id = undefined,
    activeID = undefined

disableIcon()

$btnMenuOff.addEventListener('click', scaleRestart)
document.addEventListener('fullscreenchange', scaleRestart)
document.addEventListener('webkitfullscreenchange', scaleRestart)
document.addEventListener('mozfullscreenchange', scaleRestart)
document.addEventListener('MSFullscreenChange', scaleRestart)
$video.addEventListener('error', function () {
    clearTimeout(id)
    stopScaling()
})

function scaleRestart() {
    stopScaling()
    clearTimeout(id)
    id = setTimeout(startScaling, 1000)
}
function startScaling() {
    ratio = $box.clientWidth / $video.offsetWidth
    if(ratio <= 1) {
        min$videoHeight = 100 * ratio   //  %
        nMin = Math.floor((min$videoHeight - 100) / 14)
        nMax = 0
        step = (min$videoHeight - 100) / nMin
        classList.add($subBtnUpIcon, 'disabled')
        classList.remove($subBtnDownIcon, 'disabled')
    } else {
        max$videoHeight = 100 * ratio   //  %
        nMax = Math.ceil((max$videoHeight - 100) / 14)
        nMin = 0
        step = (max$videoHeight - 100) / nMax
        classList.remove($subBtnUpIcon, 'disabled')
        classList.add($subBtnDownIcon, 'disabled')
    }
    n = 0
    $btnScale.addEventListener('click', btnScaleHandler) 
    $subBtnUp.addEventListener('click', subBtnUpHandler) 
    $subBtnDown.addEventListener('click', subBtnDownHandler)
    enableIcon()
}
function stopScaling() {
    ratio = undefined
    max$videoHeight = undefined
    step = undefined
    n = undefined
    $video.style.height = ''
    $btnScale.removeEventListener('click', btnScaleHandler) 
    $subBtnUp.removeEventListener('click', subBtnUpHandler) 
    $subBtnDown.removeEventListener('click', subBtnDownHandler)
    disableIcon()
}
function btnScaleHandler(e){
    if(e.target === $btnScale || e.target === $svgScale) {
        if(classList.contains($btnScaleSubBtnsBox, 'active')){
            removeActive()
        } else {
            classList.add($btnScaleSubBtnsBox, 'active')
            activeID = setTimeout(removeActive, window.viewerState.durationScaleSubmenu)
        }
    }
}
function subBtnUpHandler(){
    if(n < nMax) {
        $video.style.height = 100 + ++n * step + '%'
        if(n === nMax) classList.add($subBtnUp, 'diabled') // $subBtnUp.style.fill = 'rgba(0, 0, 0, 0.5)'
        if(n === (nMin + 1)) classList.remove($subBtnDown, 'diabled') //  $subBtnDown.style.fill = ''
        clearTimeout(activeID)
        activeID = setTimeout(removeActive, window.viewerState.durationScaleSubmenu)
    }
}
function subBtnDownHandler(){
    if(n > nMin) {
        $video.style.height = 100 + --n * step + '%'
        if(n === nMin) classList.add($subBtnDown, 'disabled')  // $subBtnDown.style.fill = 'rgba(0, 0, 0, 0.5)'
        if(n === (nMax - 1)) classList.remove($subBtnUp, 'disabled')  // $subBtnUp.style.fill = ''
        clearTimeout(activeID)
        activeID = setTimeout(removeActive, window.viewerState.durationScaleSubmenu)
    }
}
function removeActive() {
    classList.remove($btnScaleSubBtnsBox, 'active')
}
function disableIcon() {
    classList.add($svgScale, 'disabled')
}
function enableIcon() {
    classList.remove($svgScale, 'disabled')
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

},{}],8:[function(require,module,exports){
'use strict'

var $video = window.viewerState.$video,
    $btnVolumeFooter = window.viewerState.$btnVolumeFooter,
    $btnVolumeCtrl = window.viewerState.$btnVolumeCtrl,
    $svgVolumeOnFooter = document.querySelector('.footer .btn_volume__icon_on'),
    $svgVolumeOnCtrl = document.querySelector('.control .btn_volume__icon_on'),
    $svgVolumeOffFooter = document.querySelector('.footer .btn_volume__icon_off'),
    $svgVolumeOffCtrl = document.querySelector('.control .btn_volume__icon_off'),
    classList = window.viewerState.classList

$btnVolumeFooter.style.display = 'inline-block'
$btnVolumeCtrl.style.display = 'inline-block'

$btnVolumeFooter.addEventListener('click', mute)
$btnVolumeCtrl.addEventListener('click', mute)

function mute(){
    if ($video.muted){
        $video.muted = false
        $video.volume = 1.0
        classList.add($svgVolumeOnFooter, "active")
        classList.add($svgVolumeOnCtrl, "active")
        classList.remove($svgVolumeOffFooter, "active")
        classList.remove($svgVolumeOffCtrl, "active")
    } else {
        $video.volume = 0.0
        $video.muted = true
        classList.remove($svgVolumeOnFooter, "active")
        classList.remove($svgVolumeOnCtrl, "active")
        classList.add($svgVolumeOffFooter, "active")
        classList.add($svgVolumeOffCtrl, "active")
    } 
}

},{}],9:[function(require,module,exports){
"use strict"

var $video = window.viewerState.$video,
    $source = window.viewerState.$source,
    $slider = window.viewerState.$slider,
    highQuality = window.viewerState.highQuality,
    active$input = window.viewerState.active$input,
    $sideMenuBox = window.viewerState.$sideMenuBox,
    classList = window.viewerState.classList,
    link = '',
    $btns = {
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
    if(e.target.tagName === 'INPUT'){
        if(active$input === e.target) {
            active$input.checked = false
            active$input = null
            $video.setAttribute('src', '')
            $source.setAttribute('src', '')
            $video.style.backgroundSize = ""
            classList.remove($sideMenuBox, 'show_footer')
//            $video.removeEventListener('error', failed)
        } else {
            active$input = e.target
            highQuality = false
            link = e.target.getAttribute('data-link-lq')
            $video.setAttribute('src', link)
            $source.setAttribute('src', link)
            $video.style.backgroundSize = "0 0"
            if($video.play) $video.play();
            else alert ('video cannot play')
            classList.add($sideMenuBox, 'show_footer')
//            $video.addEventListener('error', failed)
        }
    }
})
/*
 function failed(e) {
   // video playback failed - show a message saying why     - from https://dev.w3.org/html5/spec-author-view/video.html#video
   switch (e.target.error.code) {
     case e.target.error.MEDIA_ERR_ABORTED:
       alert('Воспроизведение видео прервано.');
       break;
     case e.target.error.MEDIA_ERR_NETWORK:
       alert('Ошибка сети привела к нарушению загрузки видео');
       break;
     case e.target.error.MEDIA_ERR_DECODE:
       alert('Воспроизведение видео прекращено из-за искажений при передаче или потому, что видео использует недоступные в Вашем браузере функции.');
       break;
     case e.target.error.MEDIA_ERR_SRC_NOT_SUPPORTED:
       alert('Видео не может быть загружено из-за сбоя в в доступе к серверу или этот видеоформат не поддерживается Вашим браузером.');
       break;
     default:
       alert('Произошла ошибка. Попробуйте еще.');
       break;
   }
 }
*/
},{}],10:[function(require,module,exports){
'use strict'

module.exports = {
    'contains': function(el, cls) {
        if(el.classList) return el.classList.contains(cls)
        var arr = el.getAttribute('class').split(' ')
        for(var i=0; i<arr.length; i++){
            if(arr[i] == cls) return true
        }
        return false
    },
    'add': function(el, cls) {
        if(el.classList) {
            el.classList.add(cls)
            return 
        }
        if(!window.viewerState.classList.contains(el, cls)){
            el.setAttribute('class', el.getAttribute('class') + ' ' + cls)
        }
    },
    'remove': function(el, cls) {
        if(el.classList) {
            el.classList.remove(cls)
            return 
        } 
        var arr = el.getAttribute('class').split(' ')
        var res = ''
        for(var i=0; i<arr.length; i++){
            if(arr[i] != cls) {
                res += arr[i] + ' '
            }
        }
        el.setAttribute('class', res)
    }
}
},{}],11:[function(require,module,exports){
'use strict'

var $box = window.viewerState.$box,
    $btnFullScrOn = window.viewerState.$btnFullScrOn,
    $btnFullScrOff = window.viewerState.$btnFullScrOff,
    $btnMenuOff = window.viewerState.$btnMenuOff,
    $btnMenuOn = window.viewerState.$btnMenuOn,
    $sideMenuBox = window.viewerState.$sideMenuBox,
    $control = window.viewerState.$control,
    $svgFullScrOn = document.querySelector('.btn__fullscr.on'),
    durationCtrlVisible = window.viewerState.durationCtrlVisible,
    classList = window.viewerState.classList,
    id = undefined

if ( window.viewerState.isFullScreenAllowed ) {
  $btnMenuOff.style.display = 'none'
  $btnMenuOn.style.display = 'none'
  $btnFullScrOn.addEventListener('click', goFullScreen)
  $btnFullScrOff.addEventListener('click', getOffFullscreen)
} else if (window.viewerState.is_iPad_iPhone &&
           !window.viewerState.is_iPad_iPhone_inFullScreen) {
  $btnFullScrOn.addEventListener('click', function () {
    alert('Чтобы обрести полноэкранный режим надо сделать всего несколько шагов:\n'
        + 'Шаг 1. Нажмите на кнопку "Отправить" (выглядит как квадрат со стрелочкой вверх) справа вверху экрана и выберите пункт: На экран «Домой».\n'
        + 'Шаг 2. Укажите желаемое название и нажмите "Добавить".\n'
        + 'После нажатия кнопки "Добавить" Вас перебросит на рабочий стол, где Вы сможете увидеть свежесозданную ссылку.\n'
        + 'Зайдя на сайт нажатием на эту ссылку Вы всегда будете смотреть ТВ в полноэкранном режиме.\n'
        + 'Для удаления ссылки нужно ее нажать и подержать, затем нажать появившийся крестик в левом верхнем углу.')
    })
    classList.add($svgFullScrOn, 'disabled')
    $btnFullScrOff.style.display = 'none'
    $btnMenuOff.addEventListener('click', startWatchMode)
    $btnMenuOn.addEventListener('click', leaveWatchMode)
} else if (window.viewerState.is_iPad_iPhone_inFullScreen ||
           !window.viewerState.isFullScreenAllowed) {
    $btnFullScrOn.style.display = 'none'
    $btnFullScrOff.style.display = 'none'
    $btnMenuOff.addEventListener('click', startWatchMode)
    $btnMenuOn.addEventListener('click', leaveWatchMode)
}

document.addEventListener("fullscreenchange", fsHandler)
document.addEventListener("webkitfullscreenchange", fsHandler)
document.addEventListener("mozfullscreenchange", fsHandler)
document.addEventListener("MSFullscreenChange", fsHandler)

function fsHandler() {
    if(window.viewerState.ask$boxInFullScreen()){
        startWatchMode()
    } else {
        leaveWatchMode()
    }
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
function startWatchMode(e) {
    classList.add($sideMenuBox, 'hide_menu')
    $box.addEventListener('click', screenClickHandler)
    $control.addEventListener('click', controlClickHandler)
}
function leaveWatchMode(e) {
    clearTimeout(id)
    classList.remove($control, 'show_control')
    $control.removeEventListener('click', controlClickHandler)
    $box.removeEventListener('click', screenClickHandler)
    classList.remove($sideMenuBox, 'hide_menu')
}
function screenClickHandler(e) {
    e.stopPropagation()
    $box.removeEventListener('click', screenClickHandler)
    classList.add($control, 'show_control')
    id = setTimeout( function(){
             classList.remove($control, 'show_control')
             $box.addEventListener('click', screenClickHandler)
         } , durationCtrlVisible)
}
function controlClickHandler(e) {
    e.stopPropagation()
    clearTimeout(id)
    id = setTimeout( function(){
             classList.remove($control, 'show_control')
             $box.addEventListener('click', screenClickHandler)
         } , durationCtrlVisible)
}

},{}],12:[function(require,module,exports){
'use strict'

window.onload = function () {
  window.viewerState = {
    '$box':             document.querySelector('.box'),
    '$video':           document.querySelector('.video'),
    '$source':          document.querySelector('.source'),
    '$sideMenuBox':     document.querySelector('.sidebar'),
    '$slider':          document.querySelector('.sidebar__slider'),
    '$footer':          document.querySelector('.footer'),
    '$control':         document.querySelector('.control'),
    '$btnPlayFooter':   document.querySelector('.footer .btn_play'),
    '$btnPlayCtrl':     document.querySelector('.control .btn_play'),
    '$btnVolumeFooter': document.querySelector('.footer .btn_volume'),
    '$btnVolumeCtrl':   document.querySelector('.control .btn_volume'),
    '$btnQuality':      document.querySelector('.btn_quality'),
    '$btnScale':        document.querySelector('.scale_box__btn'),
    '$subBtnUp':        document.querySelector('.scale_box__subbtn_up'),
    '$subBtnDown':      document.querySelector('.scale_box__subbtn_down'),
    '$btnMenuOff':      document.querySelector('.footer .btn__menu_switch'),
    '$btnMenuOn':       document.querySelector('.control .btn__menu_switch'),
    '$btnFullScrOn':    document.querySelector('.footer .btn__fullscr'),
    '$btnFullScrOff':   document.querySelector('.control .btn__fullscr'),
    'active$input': null,                                               //  object
    'isVideoWorking': false,                                            //  boolean
    'isFullScreenAllowed': false,                                       //  boolean
    'is_iPad_iPhone': /(iPhone|iPod|iPad).*AppleWebKit/i.test(window.navigator.userAgent),   //  boolean
    'is_iPad_iPhone_inFullScreen': false,                               //  boolean
    'ask$boxInFullScreen': null,                                        //  function -> boolean
    'highQuality': false,                                               //  boolean
    'durationScaleSubmenu': 4000,                                       //  ms
    'durationCtrlVisible': 5000,                                        //  ms
    'classList': {
        'contains': null,                                               //  function -> boolean
        'add': null,                                                    //  function -> void
        'remove': null                                                  //  function -> void
     }
  };

  window.viewerState.isVideoWorking = require('./askVideoWorking.js')
  window.viewerState.isFullScreenAllowed = require('./askFullScreen.js')
  window.viewerState.is_iPad_iPhone_inFullScreen = require('./ask_iPad_iPhone_FullScreen.js')
  window.viewerState.ask$boxInFullScreen = require('./ask$boxInFullScreen.js')
  window.viewerState.classList = require('./classList.js')
    
  require('./screenHeight.js')
  //    Init completed
  require('./channelSelector.js')
  require('./fullscreenOrHideMenu.js')
  require('./buttonQuality.js')
  require('./buttonScale.js')
  require('./buttonPlayPause.js')
  if(!window.viewerState.is_iPad_iPhone) require('./buttonVolume.js')
}
},{"./ask$boxInFullScreen.js":1,"./askFullScreen.js":2,"./askVideoWorking.js":3,"./ask_iPad_iPhone_FullScreen.js":4,"./buttonPlayPause.js":5,"./buttonQuality.js":6,"./buttonScale.js":7,"./buttonVolume.js":8,"./channelSelector.js":9,"./classList.js":10,"./fullscreenOrHideMenu.js":11,"./screenHeight.js":13}],13:[function(require,module,exports){
'use strict'

setFontSize()
window.addEventListener('resize', setFontSize)
function setFontSize() {
    var fontSize = document.body.clientHeight / 20
    if(document.body.clientHeight > document.body.clientWidth) {
        document.body.style.fontSize = 0.4 * fontSize + 'px'
    } else {
        document.body.style.fontSize = fontSize + 'px'
    }
}
},{}]},{},[12])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2EwNS9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hc2skYm94SW5GdWxsU2NyZWVuLmpzIiwianMvYXNrRnVsbFNjcmVlbi5qcyIsImpzL2Fza1ZpZGVvV29ya2luZy5qcyIsImpzL2Fza19pUGFkX2lQaG9uZV9GdWxsU2NyZWVuLmpzIiwianMvYnV0dG9uUGxheVBhdXNlLmpzIiwianMvYnV0dG9uUXVhbGl0eS5qcyIsImpzL2J1dHRvblNjYWxlLmpzIiwianMvYnV0dG9uVm9sdW1lLmpzIiwianMvY2hhbm5lbFNlbGVjdG9yLmpzIiwianMvY2xhc3NMaXN0LmpzIiwianMvZnVsbHNjcmVlbk9ySGlkZU1lbnUuanMiLCJqcy9tYWluLmpzIiwianMvc2NyZWVuSGVpZ2h0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZJQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekZBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKGRvY3VtZW50LmZ1bGxzY3JlZW5FbGVtZW50IHx8IFxyXG4gICAgICAgIGRvY3VtZW50LndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50IHx8XHJcbiAgICAgICAgZG9jdW1lbnQubW96RnVsbFNjcmVlbkVsZW1lbnQgfHxcclxuICAgICAgICBkb2N1bWVudC5tc0Z1bGxzY3JlZW5FbGVtZW50IHx8XHJcbiAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmlzX2lQYWRfaVBob25lX2luRnVsbFNjcmVlbiApIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSBlbHNlIHJldHVybiBmYWxzZVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyICRib3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJGJveFxyXG4gICAgaWYgKCRib3gucmVxdWVzdEZ1bGxzY3JlZW4gfHxcclxuICAgICAgICAkYm94Lm1velJlcXVlc3RGdWxsU2NyZWVuIHx8XHJcbiAgICAgICAgJGJveC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbiB8fFxyXG4gICAgICAgICRib3gubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xyXG4gICAgICAgIHJldHVybiB0cnVlIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2UgXHJcbiAgICB9XHJcbn0pKClcclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBpZih0eXBlb2Ygd2luZG93LnZpZXdlclN0YXRlLiR2aWRlby5wbGF5ID09PSAnZnVuY3Rpb24nICkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd2aWRlbyBvayBuZWVkcyB0byBiZSBjb25maXJtZWQnKVxyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdubyB2aWRlbycpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbn0pKClcclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZSAmJiB3aW5kb3cuaW5uZXJIZWlnaHQgPj0gd2luZG93LnNjcmVlbi5hdmFpbEhlaWdodCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9IGVsc2UgcmV0dXJuIGZhbHNlXHJcbn0pKClcclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgJHZpZGVvID0gd2luZG93LnZpZXdlclN0YXRlLiR2aWRlbyxcclxuICAgICRidG5QbGF5Rm9vdGVyID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5QbGF5Rm9vdGVyLFxyXG4gICAgJGJ0blBsYXlDdHJsID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5QbGF5Q3RybCxcclxuICAgICRzdmdQbGF5Rm9vdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3RlciAuYnRuX3BsYXlfX2ljb25fcGxheScpLFxyXG4gICAgJHN2Z1BsYXlDdHJsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2wgLmJ0bl9wbGF5X19pY29uX3BsYXknKSxcclxuICAgICRzdmdQYXVzZUZvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXIgLmJ0bl9wbGF5X19pY29uX3BhdXNlJyksXHJcbiAgICAkc3ZnUGF1c2VDdHJsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2wgLmJ0bl9wbGF5X19pY29uX3BhdXNlJyksXHJcbiAgICBjbGFzc0xpc3QgPSB3aW5kb3cudmlld2VyU3RhdGUuY2xhc3NMaXN0XHJcblxyXG5pZiAoJHZpZGVvLnBhdXNlZCl7XHJcbiAgICBzZXRJY29uc1BsYXkoKVxyXG59IGVsc2Uge1xyXG4gICAgc2V0SWNvbnNQYXVzZSgpXHJcbn0gXHJcbiRidG5QbGF5Rm9vdGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlUGxheVBhdXNlKVxyXG4kYnRuUGxheUN0cmwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVQbGF5UGF1c2UpXHJcbiR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwbGF5Jywgc2V0SWNvbnNQYXVzZSgpKVxyXG4kdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGF1c2UnLCBzZXRJY29uc1BsYXkoKSlcclxuJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbn0pXHJcbmZ1bmN0aW9uIHRvZ2dsZVBsYXlQYXVzZSgpe1xyXG4gICAgaWYgKCR2aWRlby5wYXVzZWQpICR2aWRlby5wbGF5KCkgXHJcbiAgICBlbHNlICR2aWRlby5wYXVzZSgpXHJcbn1cclxuZnVuY3Rpb24gc2V0SWNvbnNQbGF5KCkge1xyXG4gICAgY2xhc3NMaXN0LmFkZCgkc3ZnUGxheUZvb3RlciwgXCJhY3RpdmVcIilcclxuICAgIGNsYXNzTGlzdC5hZGQoJHN2Z1BsYXlDdHJsLCBcImFjdGl2ZVwiKVxyXG4gICAgY2xhc3NMaXN0LnJlbW92ZSgkc3ZnUGF1c2VGb290ZXIsIFwiYWN0aXZlXCIpXHJcbiAgICBjbGFzc0xpc3QucmVtb3ZlKCRzdmdQYXVzZUN0cmwsIFwiYWN0aXZlXCIpXHJcbn1cclxuZnVuY3Rpb24gc2V0SWNvbnNQYXVzZSgpIHtcclxuICAgIGNsYXNzTGlzdC5hZGQoJHN2Z1BhdXNlRm9vdGVyLCBcImFjdGl2ZVwiKVxyXG4gICAgY2xhc3NMaXN0LmFkZCgkc3ZnUGF1c2VDdHJsLCBcImFjdGl2ZVwiKVxyXG4gICAgY2xhc3NMaXN0LnJlbW92ZSgkc3ZnUGxheUZvb3RlciwgXCJhY3RpdmVcIilcclxuICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z1BsYXlDdHJsLCBcImFjdGl2ZVwiKVxyXG59IiwiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgJGJ0blF1YWxpdHkgPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0blF1YWxpdHksXHJcbiAgICAkc3ZnUXVhbGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fcXVhbGl0eV9faWNvbicpLFxyXG4gICAgaGlnaFF1YWxpdHkgPSB3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHksXHJcbiAgICBhY3RpdmUkaW5wdXQgPSB3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0LFxyXG4gICAgJHZpZGVvID0gd2luZG93LnZpZXdlclN0YXRlLiR2aWRlbyxcclxuICAgICRzb3VyY2UgPSB3aW5kb3cudmlld2VyU3RhdGUuJHNvdXJjZSxcclxuICAgIGNsYXNzTGlzdCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5jbGFzc0xpc3QsXHJcbiAgICBsaW5rID0gJydcclxuXHJcbnN0eWxlUXVhbGl0eUJ1dHRvbigpXHJcblxyXG4kYnRuUXVhbGl0eS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKCl7XHJcbiAgICBpZiAoYWN0aXZlJGlucHV0KSB7XHJcbiAgICAgICAgaWYgKGhpZ2hRdWFsaXR5KSB7XHJcbiAgICAgICAgICAgIGhpZ2hRdWFsaXR5ID0gZmFsc2VcclxuICAgICAgICAgICAgbGluayA9IGFjdGl2ZSRpbnB1dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1scScpXHJcbiAgICAgICAgICAgICR2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgICAgICAgICRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICAgICAgICAkdmlkZW8ucGxheSgpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgaGlnaFF1YWxpdHkgPSB0cnVlXHJcbiAgICAgICAgICAgIGxpbmsgPSBhY3RpdmUkaW5wdXQuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmstaHEnKVxyXG4gICAgICAgICAgICAkdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICAgICAgICAkc291cmNlLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgICAgICAgJHZpZGVvLnBsYXkoKVxyXG4gICAgICAgIH1cclxuICAgICAgICBzdHlsZVF1YWxpdHlCdXR0b24oKVxyXG4gICAgfVxyXG59KVxyXG5cclxuZnVuY3Rpb24gc3R5bGVRdWFsaXR5QnV0dG9uKCkge1xyXG4gICAgaWYgKGhpZ2hRdWFsaXR5KSB7XHJcbiAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgkc3ZnUXVhbGl0eSwgJ2Rpc2FibGVkJylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgkc3ZnUXVhbGl0eSwgJ2Rpc2FibGVkJylcclxuICAgIH1cclxufSIsIid1c2Ugc3RyaWN0J1xyXG5cclxuLy8gICAgICAgICAgU2NhbGVcclxudmFyICRib3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJGJveCxcclxuICAgICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8sXHJcbiAgICAkYnRuU2NhbGUgPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0blNjYWxlLFxyXG4gICAgJHN2Z1NjYWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjYWxlX2JveF9fYnRuX2ljb24nKSxcclxuICAgICRidG5TY2FsZVN1YkJ0bnNCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NhbGVfYm94X19zdWJidG5zJyksXHJcbiAgICAkc3ViQnRuVXAgPSB3aW5kb3cudmlld2VyU3RhdGUuJHN1YkJ0blVwLFxyXG4gICAgJHN1YkJ0bkRvd24gPSB3aW5kb3cudmlld2VyU3RhdGUuJHN1YkJ0bkRvd24sXHJcbiAgICAkc3ViQnRuVXBJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1YmJ0bl91cCcpLFxyXG4gICAgJHN1YkJ0bkRvd25JY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1YmJ0bl9kb3duJyksXHJcbiAgICAkYnRuTWVudU9mZiA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuTWVudU9mZixcclxuICAgIGNsYXNzTGlzdCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5jbGFzc0xpc3QsXHJcbiAgICByYXRpbyA9IHVuZGVmaW5lZCxcclxuICAgIG1heCR2aWRlb0hlaWdodCA9IHVuZGVmaW5lZCxcclxuICAgIG1pbiR2aWRlb0hlaWdodCA9IHVuZGVmaW5lZCxcclxuICAgIHN0ZXAgPSB1bmRlZmluZWQsXHJcbiAgICBuID0gdW5kZWZpbmVkLFxyXG4gICAgbk1heCA9IDAsXHJcbiAgICBuTWluID0gMCxcclxuICAgIGlkID0gdW5kZWZpbmVkLFxyXG4gICAgYWN0aXZlSUQgPSB1bmRlZmluZWRcclxuXHJcbmRpc2FibGVJY29uKClcclxuXHJcbiRidG5NZW51T2ZmLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2NhbGVSZXN0YXJ0KVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdmdWxsc2NyZWVuY2hhbmdlJywgc2NhbGVSZXN0YXJ0KVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJywgc2NhbGVSZXN0YXJ0KVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3pmdWxsc2NyZWVuY2hhbmdlJywgc2NhbGVSZXN0YXJ0KVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdNU0Z1bGxzY3JlZW5DaGFuZ2UnLCBzY2FsZVJlc3RhcnQpXHJcbiR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNsZWFyVGltZW91dChpZClcclxuICAgIHN0b3BTY2FsaW5nKClcclxufSlcclxuXHJcbmZ1bmN0aW9uIHNjYWxlUmVzdGFydCgpIHtcclxuICAgIHN0b3BTY2FsaW5nKClcclxuICAgIGNsZWFyVGltZW91dChpZClcclxuICAgIGlkID0gc2V0VGltZW91dChzdGFydFNjYWxpbmcsIDEwMDApXHJcbn1cclxuZnVuY3Rpb24gc3RhcnRTY2FsaW5nKCkge1xyXG4gICAgcmF0aW8gPSAkYm94LmNsaWVudFdpZHRoIC8gJHZpZGVvLm9mZnNldFdpZHRoXHJcbiAgICBpZihyYXRpbyA8PSAxKSB7XHJcbiAgICAgICAgbWluJHZpZGVvSGVpZ2h0ID0gMTAwICogcmF0aW8gICAvLyAgJVxyXG4gICAgICAgIG5NaW4gPSBNYXRoLmZsb29yKChtaW4kdmlkZW9IZWlnaHQgLSAxMDApIC8gMTQpXHJcbiAgICAgICAgbk1heCA9IDBcclxuICAgICAgICBzdGVwID0gKG1pbiR2aWRlb0hlaWdodCAtIDEwMCkgLyBuTWluXHJcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgkc3ViQnRuVXBJY29uLCAnZGlzYWJsZWQnKVxyXG4gICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN1YkJ0bkRvd25JY29uLCAnZGlzYWJsZWQnKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBtYXgkdmlkZW9IZWlnaHQgPSAxMDAgKiByYXRpbyAgIC8vICAlXHJcbiAgICAgICAgbk1heCA9IE1hdGguY2VpbCgobWF4JHZpZGVvSGVpZ2h0IC0gMTAwKSAvIDE0KVxyXG4gICAgICAgIG5NaW4gPSAwXHJcbiAgICAgICAgc3RlcCA9IChtYXgkdmlkZW9IZWlnaHQgLSAxMDApIC8gbk1heFxyXG4gICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN1YkJ0blVwSWNvbiwgJ2Rpc2FibGVkJylcclxuICAgICAgICBjbGFzc0xpc3QuYWRkKCRzdWJCdG5Eb3duSWNvbiwgJ2Rpc2FibGVkJylcclxuICAgIH1cclxuICAgIG4gPSAwXHJcbiAgICAkYnRuU2NhbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBidG5TY2FsZUhhbmRsZXIpIFxyXG4gICAgJHN1YkJ0blVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3ViQnRuVXBIYW5kbGVyKSBcclxuICAgICRzdWJCdG5Eb3duLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3ViQnRuRG93bkhhbmRsZXIpXHJcbiAgICBlbmFibGVJY29uKClcclxufVxyXG5mdW5jdGlvbiBzdG9wU2NhbGluZygpIHtcclxuICAgIHJhdGlvID0gdW5kZWZpbmVkXHJcbiAgICBtYXgkdmlkZW9IZWlnaHQgPSB1bmRlZmluZWRcclxuICAgIHN0ZXAgPSB1bmRlZmluZWRcclxuICAgIG4gPSB1bmRlZmluZWRcclxuICAgICR2aWRlby5zdHlsZS5oZWlnaHQgPSAnJ1xyXG4gICAgJGJ0blNjYWxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYnRuU2NhbGVIYW5kbGVyKSBcclxuICAgICRzdWJCdG5VcC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHN1YkJ0blVwSGFuZGxlcikgXHJcbiAgICAkc3ViQnRuRG93bi5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHN1YkJ0bkRvd25IYW5kbGVyKVxyXG4gICAgZGlzYWJsZUljb24oKVxyXG59XHJcbmZ1bmN0aW9uIGJ0blNjYWxlSGFuZGxlcihlKXtcclxuICAgIGlmKGUudGFyZ2V0ID09PSAkYnRuU2NhbGUgfHwgZS50YXJnZXQgPT09ICRzdmdTY2FsZSkge1xyXG4gICAgICAgIGlmKGNsYXNzTGlzdC5jb250YWlucygkYnRuU2NhbGVTdWJCdG5zQm94LCAnYWN0aXZlJykpe1xyXG4gICAgICAgICAgICByZW1vdmVBY3RpdmUoKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGNsYXNzTGlzdC5hZGQoJGJ0blNjYWxlU3ViQnRuc0JveCwgJ2FjdGl2ZScpXHJcbiAgICAgICAgICAgIGFjdGl2ZUlEID0gc2V0VGltZW91dChyZW1vdmVBY3RpdmUsIHdpbmRvdy52aWV3ZXJTdGF0ZS5kdXJhdGlvblNjYWxlU3VibWVudSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gc3ViQnRuVXBIYW5kbGVyKCl7XHJcbiAgICBpZihuIDwgbk1heCkge1xyXG4gICAgICAgICR2aWRlby5zdHlsZS5oZWlnaHQgPSAxMDAgKyArK24gKiBzdGVwICsgJyUnXHJcbiAgICAgICAgaWYobiA9PT0gbk1heCkgY2xhc3NMaXN0LmFkZCgkc3ViQnRuVXAsICdkaWFibGVkJykgLy8gJHN1YkJ0blVwLnN0eWxlLmZpbGwgPSAncmdiYSgwLCAwLCAwLCAwLjUpJ1xyXG4gICAgICAgIGlmKG4gPT09IChuTWluICsgMSkpIGNsYXNzTGlzdC5yZW1vdmUoJHN1YkJ0bkRvd24sICdkaWFibGVkJykgLy8gICRzdWJCdG5Eb3duLnN0eWxlLmZpbGwgPSAnJ1xyXG4gICAgICAgIGNsZWFyVGltZW91dChhY3RpdmVJRClcclxuICAgICAgICBhY3RpdmVJRCA9IHNldFRpbWVvdXQocmVtb3ZlQWN0aXZlLCB3aW5kb3cudmlld2VyU3RhdGUuZHVyYXRpb25TY2FsZVN1Ym1lbnUpXHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gc3ViQnRuRG93bkhhbmRsZXIoKXtcclxuICAgIGlmKG4gPiBuTWluKSB7XHJcbiAgICAgICAgJHZpZGVvLnN0eWxlLmhlaWdodCA9IDEwMCArIC0tbiAqIHN0ZXAgKyAnJSdcclxuICAgICAgICBpZihuID09PSBuTWluKSBjbGFzc0xpc3QuYWRkKCRzdWJCdG5Eb3duLCAnZGlzYWJsZWQnKSAgLy8gJHN1YkJ0bkRvd24uc3R5bGUuZmlsbCA9ICdyZ2JhKDAsIDAsIDAsIDAuNSknXHJcbiAgICAgICAgaWYobiA9PT0gKG5NYXggLSAxKSkgY2xhc3NMaXN0LnJlbW92ZSgkc3ViQnRuVXAsICdkaXNhYmxlZCcpICAvLyAkc3ViQnRuVXAuc3R5bGUuZmlsbCA9ICcnXHJcbiAgICAgICAgY2xlYXJUaW1lb3V0KGFjdGl2ZUlEKVxyXG4gICAgICAgIGFjdGl2ZUlEID0gc2V0VGltZW91dChyZW1vdmVBY3RpdmUsIHdpbmRvdy52aWV3ZXJTdGF0ZS5kdXJhdGlvblNjYWxlU3VibWVudSlcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiByZW1vdmVBY3RpdmUoKSB7XHJcbiAgICBjbGFzc0xpc3QucmVtb3ZlKCRidG5TY2FsZVN1YkJ0bnNCb3gsICdhY3RpdmUnKVxyXG59XHJcbmZ1bmN0aW9uIGRpc2FibGVJY29uKCkge1xyXG4gICAgY2xhc3NMaXN0LmFkZCgkc3ZnU2NhbGUsICdkaXNhYmxlZCcpXHJcbn1cclxuZnVuY3Rpb24gZW5hYmxlSWNvbigpIHtcclxuICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z1NjYWxlLCAnZGlzYWJsZWQnKVxyXG59XHJcblxyXG4vLyAkdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignbG9hZHN0YXJ0JywgZnVuY3Rpb24oKXtcclxuLy8gICAgIGNvbnNvbGUubG9nKCdUaGUgbG9hZHN0YXJ0IGV2ZW50IG9jY3VycyB3aGVuIHRoZSBicm93c2VyIHN0YXJ0cyBsb29raW5nIGZvciB0aGUgc3BlY2lmaWVkIGF1ZGlvL3ZpZGVvLiBUaGlzIGlzIHdoZW4gdGhlIGxvYWRpbmcgcHJvY2VzcyBzdGFydHMuJyArIChEYXRlLm5vdygpIC0gd2luZG93LnZpZXdlclN0YXRlLnRpbWVyRm9yRXJyb3JQYWdlKSlcclxuLy8gfSlcclxuLy8gJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2R1cmF0aW9uY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuLy8gICAgIGNvbnNvbGUubG9nKCdUaGUgZHVyYXRpb25jaGFuZ2UgZXZlbnQgb2NjdXJzIHdoZW4gdGhlIGR1cmF0aW9uIGRhdGEgb2YgdGhlIHNwZWNpZmllZCBhdWRpby92aWRlbyBpcyBjaGFuZ2VkLicgKyAoRGF0ZS5ub3coKSAtIHdpbmRvdy52aWV3ZXJTdGF0ZS50aW1lckZvckVycm9yUGFnZSkpXHJcbi8vIH0pXHJcbi8vICR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRtZXRhZGF0YScsIGZ1bmN0aW9uKCl7XHJcbi8vICAgICBjb25zb2xlLmxvZygnVGhlIGxvYWRlZG1ldGFkYXRhIGV2ZW50IG9jY3VycyB3aGVuIG1ldGEgZGF0YSBmb3IgdGhlIHNwZWNpZmllZCBhdWRpby92aWRlbyBoYXMgYmVlbiBsb2FkZWQuJyArIChEYXRlLm5vdygpIC0gd2luZG93LnZpZXdlclN0YXRlLnRpbWVyRm9yRXJyb3JQYWdlKSlcclxuLy8gfSlcclxuXHJcbi8vICR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRkYXRhJywgZnVuY3Rpb24oKXtcclxuLy8gICAgIGNvbnNvbGUubG9nKCdUaGUgbG9hZGVkZGF0YSBldmVudCBvY2N1cnMgd2hlbiBkYXRhIGZvciB0aGUgY3VycmVudCBmcmFtZSBpcyBsb2FkZWQsIGJ1dCBub3QgZW5vdWdoIGRhdGEgdG8gcGxheSBuZXh0IGZyYW1lIG9mIHRoZSBzcGVjaWZpZWQgYXVkaW8vdmlkZW8uJyArIChEYXRlLm5vdygpIC0gd2luZG93LnZpZXdlclN0YXRlLnRpbWVyRm9yRXJyb3JQYWdlKSlcclxuLy8gfSlcclxuLy8gJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgZnVuY3Rpb24oKXtcclxuLy8gICAgIGNvbnNvbGUubG9nKCdUaGUgcHJvZ3Jlc3MgZXZlbnQgb2NjdXJzIHdoZW4gdGhlIGJyb3dzZXIgaXMgZG93bmxvYWRpbmcgdGhlIHNwZWNpZmllZCBhdWRpby92aWRlby4nICsgKERhdGUubm93KCkgLSB3aW5kb3cudmlld2VyU3RhdGUudGltZXJGb3JFcnJvclBhZ2UpKVxyXG4vLyB9KVxyXG4vLyAkdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheScsIGZ1bmN0aW9uKCl7XHJcbi8vICAgICBjb25zb2xlLmxvZygnVGhlIGNhbnBsYXkgZXZlbnQgb2NjdXJzIHdoZW4gdGhlIGJyb3dzZXIgY2FuIHN0YXJ0IHBsYXlpbmcgdGhlIHNwZWNpZmllZCBhdWRpby92aWRlbyAod2hlbiBpdCBoYXMgYnVmZmVyZWQgZW5vdWdoIHRvIGJlZ2luKS4nICsgKERhdGUubm93KCkgLSB3aW5kb3cudmlld2VyU3RhdGUudGltZXJGb3JFcnJvclBhZ2UpKVxyXG4vLyB9KVxyXG4vLyAkdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCBmdW5jdGlvbigpe1xyXG4vLyAgICAgY29uc29sZS5sb2coJ1RoZSBjYW5wbGF5dGhyb3VnaCBldmVudCBvY2N1cnMgd2hlbiB0aGUgYnJvd3NlciBlc3RpbWF0ZXMgaXQgY2FuIHBsYXkgdGhyb3VnaCB0aGUgc3BlY2lmaWVkIGF1ZGlvL3ZpZGVvIHdpdGhvdXQgaGF2aW5nIHRvIHN0b3AgZm9yIGJ1ZmZlcmluZy4nICsgKERhdGUubm93KCkgLSB3aW5kb3cudmlld2VyU3RhdGUudGltZXJGb3JFcnJvclBhZ2UpKVxyXG4vLyB9KVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbnZhciAkdmlkZW8gPSB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvLFxyXG4gICAgJGJ0blZvbHVtZUZvb3RlciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuVm9sdW1lRm9vdGVyLFxyXG4gICAgJGJ0blZvbHVtZUN0cmwgPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0blZvbHVtZUN0cmwsXHJcbiAgICAkc3ZnVm9sdW1lT25Gb290ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyIC5idG5fdm9sdW1lX19pY29uX29uJyksXHJcbiAgICAkc3ZnVm9sdW1lT25DdHJsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2wgLmJ0bl92b2x1bWVfX2ljb25fb24nKSxcclxuICAgICRzdmdWb2x1bWVPZmZGb290ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyIC5idG5fdm9sdW1lX19pY29uX29mZicpLFxyXG4gICAgJHN2Z1ZvbHVtZU9mZkN0cmwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbCAuYnRuX3ZvbHVtZV9faWNvbl9vZmYnKSxcclxuICAgIGNsYXNzTGlzdCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5jbGFzc0xpc3RcclxuXHJcbiRidG5Wb2x1bWVGb290ZXIuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snXHJcbiRidG5Wb2x1bWVDdHJsLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJ1xyXG5cclxuJGJ0blZvbHVtZUZvb3Rlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG11dGUpXHJcbiRidG5Wb2x1bWVDdHJsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbXV0ZSlcclxuXHJcbmZ1bmN0aW9uIG11dGUoKXtcclxuICAgIGlmICgkdmlkZW8ubXV0ZWQpe1xyXG4gICAgICAgICR2aWRlby5tdXRlZCA9IGZhbHNlXHJcbiAgICAgICAgJHZpZGVvLnZvbHVtZSA9IDEuMFxyXG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJHN2Z1ZvbHVtZU9uRm9vdGVyLCBcImFjdGl2ZVwiKVxyXG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJHN2Z1ZvbHVtZU9uQ3RybCwgXCJhY3RpdmVcIilcclxuICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRzdmdWb2x1bWVPZmZGb290ZXIsIFwiYWN0aXZlXCIpXHJcbiAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgkc3ZnVm9sdW1lT2ZmQ3RybCwgXCJhY3RpdmVcIilcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJHZpZGVvLnZvbHVtZSA9IDAuMFxyXG4gICAgICAgICR2aWRlby5tdXRlZCA9IHRydWVcclxuICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRzdmdWb2x1bWVPbkZvb3RlciwgXCJhY3RpdmVcIilcclxuICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRzdmdWb2x1bWVPbkN0cmwsIFwiYWN0aXZlXCIpXHJcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgkc3ZnVm9sdW1lT2ZmRm9vdGVyLCBcImFjdGl2ZVwiKVxyXG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJHN2Z1ZvbHVtZU9mZkN0cmwsIFwiYWN0aXZlXCIpXHJcbiAgICB9IFxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiXHJcblxyXG52YXIgJHZpZGVvID0gd2luZG93LnZpZXdlclN0YXRlLiR2aWRlbyxcclxuICAgICRzb3VyY2UgPSB3aW5kb3cudmlld2VyU3RhdGUuJHNvdXJjZSxcclxuICAgICRzbGlkZXIgPSB3aW5kb3cudmlld2VyU3RhdGUuJHNsaWRlcixcclxuICAgIGhpZ2hRdWFsaXR5ID0gd2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5LFxyXG4gICAgYWN0aXZlJGlucHV0ID0gd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dCxcclxuICAgICRzaWRlTWVudUJveCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc2lkZU1lbnVCb3gsXHJcbiAgICBjbGFzc0xpc3QgPSB3aW5kb3cudmlld2VyU3RhdGUuY2xhc3NMaXN0LFxyXG4gICAgbGluayA9ICcnLFxyXG4gICAgJGJ0bnMgPSB7XHJcbiAgICBcImNoXzFnb3JvZHNrb3lcIjogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfMWdvcm9kc2tveVwiKSxcclxuICAgIFwiY2hfM3RzeWZyb3ZveVwiOiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF8zdHN5ZnJvdm95XCIpLFxyXG4gICAgXCJjaF9yZXBvcnRlclwiOiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX3JlcG9ydGVyXCIpLFxyXG4gICAgXCJjaF9hY2FkZW1pYVwiOiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX2FjYWRlbWlhXCIpLFxyXG4gICAgXCJjaF9hMVwiOiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX2ExXCIpLFxyXG4gICAgXCJjaF9kdW1za2F5YVwiOiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX2R1bXNrYXlhXCIpLFxyXG4gICAgXCJjaF9ndHZcIjogICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX2d0dlwiKSxcclxuICAgIFwiY2hfc3R2XCI6ICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9zdHZcIiksXHJcbiAgICBcImNoX3VnbmF5YXZvbG5hXCI6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfdWduYXlhdm9sbmFcIiksXHJcbiAgICBcImNoX25lbW9cIjogICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfbmVtb1wiKVxyXG59XHJcbiRidG5zLmNoXzFnb3JvZHNrb3kuc2V0QXR0cmlidXRlKCAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS8xdHZvZC8xdHZvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiICAgIClcclxuJGJ0bnMuY2hfM3RzeWZyb3ZveS5zZXRBdHRyaWJ1dGUoICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vY2RuNS5saXZlLXR2Lm9kLnVhOjgwODEvdHYvM3R2b2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgKVxyXG4kYnRucy5jaF9yZXBvcnRlci5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly9jZG40LmxpdmUtdHYub2QudWE6ODA4MS90di8zMWNob2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiApXHJcbiRidG5zLmNoX2FjYWRlbWlhLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovL2NkbjQubGl2ZS10di5vZC51YTo4MDgxL3R2LzM2Y2hvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiIClcclxuJGJ0bnMuY2hfYTEuc2V0QXR0cmlidXRlKCAgICAgICAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL2Exb2QvYTFvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiICAgICAgKVxyXG4kYnRucy5jaF9kdW1za2F5YS5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTM4OjgwODEvZHVtc2thL2R1bXNrYS1hYnItbHEvcGxheWxpc3QubTN1OFwiICApXHJcbiRidG5zLmNoX2d0di5zZXRBdHRyaWJ1dGUoICAgICAgICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9hMW9kL2d0dm9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgICAgIClcclxuJGJ0bnMuY2hfc3R2LnNldEF0dHJpYnV0ZSggICAgICAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL3N0dm9kL3N0dm9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgICAgKVxyXG4kYnRucy5jaF91Z25heWF2b2xuYS5zZXRBdHRyaWJ1dGUoICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvd2F2ZS93YXZlLWFici1scS9wbGF5bGlzdC5tM3U4XCIgICAgICApXHJcbiRidG5zLmNoX25lbW8uc2V0QXR0cmlidXRlKCAgICAgICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9uZW1vL21vci1zdWIvcGxheWxpc3QubTN1OFwiICAgICAgICAgIClcclxuXHJcbiRidG5zLmNoXzFnb3JvZHNrb3kuc2V0QXR0cmlidXRlKCAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS8xdHZvZC8xdHZvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgIClcclxuJGJ0bnMuY2hfM3RzeWZyb3ZveS5zZXRBdHRyaWJ1dGUoICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vY2RuNS5saXZlLXR2Lm9kLnVhOjgwODEvdHYvM3R2b2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgKVxyXG4kYnRucy5jaF9yZXBvcnRlci5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly9jZG40LmxpdmUtdHYub2QudWE6ODA4MS90di8zMWNob2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICApXHJcbiRidG5zLmNoX2FjYWRlbWlhLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovL2NkbjQubGl2ZS10di5vZC51YTo4MDgxL3R2LzM2Y2hvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgIClcclxuJGJ0bnMuY2hfYTEuc2V0QXR0cmlidXRlKCAgICAgICAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL2Exb2QvYTFvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgICAgKVxyXG4kYnRucy5jaF9kdW1za2F5YS5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTM4OjgwODEvZHVtc2thL2R1bXNrYS1hYnIvcGxheWxpc3QubTN1OFwiICAgICApXHJcbiRidG5zLmNoX2d0di5zZXRBdHRyaWJ1dGUoICAgICAgICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9hMW9kL2d0dm9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgIClcclxuJGJ0bnMuY2hfc3R2LnNldEF0dHJpYnV0ZSggICAgICAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL3N0dm9kL3N0dm9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgKVxyXG4kYnRucy5jaF91Z25heWF2b2xuYS5zZXRBdHRyaWJ1dGUoICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvd2F2ZS93YXZlLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgICApXHJcbiRidG5zLmNoX25lbW8uc2V0QXR0cmlidXRlKCAgICAgICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9uZW1vL21vci1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgICAgIClcclxuXHJcbiRzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgIGlmKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdJTlBVVCcpe1xyXG4gICAgICAgIGlmKGFjdGl2ZSRpbnB1dCA9PT0gZS50YXJnZXQpIHtcclxuICAgICAgICAgICAgYWN0aXZlJGlucHV0LmNoZWNrZWQgPSBmYWxzZVxyXG4gICAgICAgICAgICBhY3RpdmUkaW5wdXQgPSBudWxsXHJcbiAgICAgICAgICAgICR2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsICcnKVxyXG4gICAgICAgICAgICAkc291cmNlLnNldEF0dHJpYnV0ZSgnc3JjJywgJycpXHJcbiAgICAgICAgICAgICR2aWRlby5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9IFwiXCJcclxuICAgICAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgkc2lkZU1lbnVCb3gsICdzaG93X2Zvb3RlcicpXHJcbi8vICAgICAgICAgICAgJHZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZmFpbGVkKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIGFjdGl2ZSRpbnB1dCA9IGUudGFyZ2V0XHJcbiAgICAgICAgICAgIGhpZ2hRdWFsaXR5ID0gZmFsc2VcclxuICAgICAgICAgICAgbGluayA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWxxJylcclxuICAgICAgICAgICAgJHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgICAgICAgJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgICAgICAgICR2aWRlby5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9IFwiMCAwXCJcclxuICAgICAgICAgICAgaWYoJHZpZGVvLnBsYXkpICR2aWRlby5wbGF5KCk7XHJcbiAgICAgICAgICAgIGVsc2UgYWxlcnQgKCd2aWRlbyBjYW5ub3QgcGxheScpXHJcbiAgICAgICAgICAgIGNsYXNzTGlzdC5hZGQoJHNpZGVNZW51Qm94LCAnc2hvd19mb290ZXInKVxyXG4vLyAgICAgICAgICAgICR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZhaWxlZClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pXHJcbi8qXHJcbiBmdW5jdGlvbiBmYWlsZWQoZSkge1xyXG4gICAvLyB2aWRlbyBwbGF5YmFjayBmYWlsZWQgLSBzaG93IGEgbWVzc2FnZSBzYXlpbmcgd2h5ICAgICAtIGZyb20gaHR0cHM6Ly9kZXYudzMub3JnL2h0bWw1L3NwZWMtYXV0aG9yLXZpZXcvdmlkZW8uaHRtbCN2aWRlb1xyXG4gICBzd2l0Y2ggKGUudGFyZ2V0LmVycm9yLmNvZGUpIHtcclxuICAgICBjYXNlIGUudGFyZ2V0LmVycm9yLk1FRElBX0VSUl9BQk9SVEVEOlxyXG4gICAgICAgYWxlcnQoJ9CS0L7RgdC/0YDQvtC40LfQstC10LTQtdC90LjQtSDQstC40LTQtdC+INC/0YDQtdGA0LLQsNC90L4uJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgICBjYXNlIGUudGFyZ2V0LmVycm9yLk1FRElBX0VSUl9ORVRXT1JLOlxyXG4gICAgICAgYWxlcnQoJ9Ce0YjQuNCx0LrQsCDRgdC10YLQuCDQv9GA0LjQstC10LvQsCDQuiDQvdCw0YDRg9GI0LXQvdC40Y4g0LfQsNCz0YDRg9C30LrQuCDQstC40LTQtdC+Jyk7XHJcbiAgICAgICBicmVhaztcclxuICAgICBjYXNlIGUudGFyZ2V0LmVycm9yLk1FRElBX0VSUl9ERUNPREU6XHJcbiAgICAgICBhbGVydCgn0JLQvtGB0L/RgNC+0LjQt9Cy0LXQtNC10L3QuNC1INCy0LjQtNC10L4g0L/RgNC10LrRgNCw0YnQtdC90L4g0LjQty3Qt9CwINC40YHQutCw0LbQtdC90LjQuSDQv9GA0Lgg0L/QtdGA0LXQtNCw0YfQtSDQuNC70Lgg0L/QvtGC0L7QvNGDLCDRh9GC0L4g0LLQuNC00LXQviDQuNGB0L/QvtC70YzQt9GD0LXRgiDQvdC10LTQvtGB0YLRg9C/0L3Ri9C1INCyINCS0LDRiNC10Lwg0LHRgNCw0YPQt9C10YDQtSDRhNGD0L3QutGG0LjQuC4nKTtcclxuICAgICAgIGJyZWFrO1xyXG4gICAgIGNhc2UgZS50YXJnZXQuZXJyb3IuTUVESUFfRVJSX1NSQ19OT1RfU1VQUE9SVEVEOlxyXG4gICAgICAgYWxlcnQoJ9CS0LjQtNC10L4g0L3QtSDQvNC+0LbQtdGCINCx0YvRgtGMINC30LDQs9GA0YPQttC10L3QviDQuNC3LdC30LAg0YHQsdC+0Y8g0LIg0LIg0LTQvtGB0YLRg9C/0LUg0Log0YHQtdGA0LLQtdGA0YMg0LjQu9C4INGN0YLQvtGCINCy0LjQtNC10L7RhNC+0YDQvNCw0YIg0L3QtSDQv9C+0LTQtNC10YDQttC40LLQsNC10YLRgdGPINCS0LDRiNC40Lwg0LHRgNCw0YPQt9C10YDQvtC8LicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgICAgZGVmYXVsdDpcclxuICAgICAgIGFsZXJ0KCfQn9GA0L7QuNC30L7RiNC70LAg0L7RiNC40LHQutCwLiDQn9C+0L/RgNC+0LHRg9C50YLQtSDQtdGJ0LUuJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgfVxyXG4gfVxyXG4qLyIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICAnY29udGFpbnMnOiBmdW5jdGlvbihlbCwgY2xzKSB7XHJcbiAgICAgICAgaWYoZWwuY2xhc3NMaXN0KSByZXR1cm4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNscylcclxuICAgICAgICB2YXIgYXJyID0gZWwuZ2V0QXR0cmlidXRlKCdjbGFzcycpLnNwbGl0KCcgJylcclxuICAgICAgICBmb3IodmFyIGk9MDsgaTxhcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZihhcnJbaV0gPT0gY2xzKSByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH0sXHJcbiAgICAnYWRkJzogZnVuY3Rpb24oZWwsIGNscykge1xyXG4gICAgICAgIGlmKGVsLmNsYXNzTGlzdCkge1xyXG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKGNscylcclxuICAgICAgICAgICAgcmV0dXJuIFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZighd2luZG93LnZpZXdlclN0YXRlLmNsYXNzTGlzdC5jb250YWlucyhlbCwgY2xzKSl7XHJcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBlbC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgKyAnICcgKyBjbHMpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgICdyZW1vdmUnOiBmdW5jdGlvbihlbCwgY2xzKSB7XHJcbiAgICAgICAgaWYoZWwuY2xhc3NMaXN0KSB7XHJcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xzKVxyXG4gICAgICAgICAgICByZXR1cm4gXHJcbiAgICAgICAgfSBcclxuICAgICAgICB2YXIgYXJyID0gZWwuZ2V0QXR0cmlidXRlKCdjbGFzcycpLnNwbGl0KCcgJylcclxuICAgICAgICB2YXIgcmVzID0gJydcclxuICAgICAgICBmb3IodmFyIGk9MDsgaTxhcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZihhcnJbaV0gIT0gY2xzKSB7XHJcbiAgICAgICAgICAgICAgICByZXMgKz0gYXJyW2ldICsgJyAnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdjbGFzcycsIHJlcylcclxuICAgIH1cclxufSIsIid1c2Ugc3RyaWN0J1xuXG52YXIgJGJveCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYm94LFxuICAgICRidG5GdWxsU2NyT24gPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0bkZ1bGxTY3JPbixcbiAgICAkYnRuRnVsbFNjck9mZiA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuRnVsbFNjck9mZixcbiAgICAkYnRuTWVudU9mZiA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuTWVudU9mZixcbiAgICAkYnRuTWVudU9uID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5NZW51T24sXG4gICAgJHNpZGVNZW51Qm94ID0gd2luZG93LnZpZXdlclN0YXRlLiRzaWRlTWVudUJveCxcbiAgICAkY29udHJvbCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kY29udHJvbCxcbiAgICAkc3ZnRnVsbFNjck9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9fZnVsbHNjci5vbicpLFxuICAgIGR1cmF0aW9uQ3RybFZpc2libGUgPSB3aW5kb3cudmlld2VyU3RhdGUuZHVyYXRpb25DdHJsVmlzaWJsZSxcbiAgICBjbGFzc0xpc3QgPSB3aW5kb3cudmlld2VyU3RhdGUuY2xhc3NMaXN0LFxuICAgIGlkID0gdW5kZWZpbmVkXG5cbmlmICggd2luZG93LnZpZXdlclN0YXRlLmlzRnVsbFNjcmVlbkFsbG93ZWQgKSB7XG4gICRidG5NZW51T2ZmLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgJGJ0bk1lbnVPbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICRidG5GdWxsU2NyT24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBnb0Z1bGxTY3JlZW4pXG4gICRidG5GdWxsU2NyT2ZmLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZ2V0T2ZmRnVsbHNjcmVlbilcbn0gZWxzZSBpZiAod2luZG93LnZpZXdlclN0YXRlLmlzX2lQYWRfaVBob25lICYmXG4gICAgICAgICAgICF3aW5kb3cudmlld2VyU3RhdGUuaXNfaVBhZF9pUGhvbmVfaW5GdWxsU2NyZWVuKSB7XG4gICRidG5GdWxsU2NyT24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgYWxlcnQoJ9Cn0YLQvtCx0Ysg0L7QsdGA0LXRgdGC0Lgg0L/QvtC70L3QvtGN0LrRgNCw0L3QvdGL0Lkg0YDQtdC20LjQvCDQvdCw0LTQviDRgdC00LXQu9Cw0YLRjCDQstGB0LXQs9C+INC90LXRgdC60L7Qu9GM0LrQviDRiNCw0LPQvtCyOlxcbidcbiAgICAgICAgKyAn0KjQsNCzIDEuINCd0LDQttC80LjRgtC1INC90LAg0LrQvdC+0L/QutGDIFwi0J7RgtC/0YDQsNCy0LjRgtGMXCIgKNCy0YvQs9C70Y/QtNC40YIg0LrQsNC6INC60LLQsNC00YDQsNGCINGB0L4g0YHRgtGA0LXQu9C+0YfQutC+0Lkg0LLQstC10YDRhSkg0YHQv9GA0LDQstCwINCy0LLQtdGA0YXRgyDRjdC60YDQsNC90LAg0Lgg0LLRi9Cx0LXRgNC40YLQtSDQv9GD0L3QutGCOiDQndCwINGN0LrRgNCw0L0gwqvQlNC+0LzQvtC5wrsuXFxuJ1xuICAgICAgICArICfQqNCw0LMgMi4g0KPQutCw0LbQuNGC0LUg0LbQtdC70LDQtdC80L7QtSDQvdCw0LfQstCw0L3QuNC1INC4INC90LDQttC80LjRgtC1IFwi0JTQvtCx0LDQstC40YLRjFwiLlxcbidcbiAgICAgICAgKyAn0J/QvtGB0LvQtSDQvdCw0LbQsNGC0LjRjyDQutC90L7Qv9C60LggXCLQlNC+0LHQsNCy0LjRgtGMXCIg0JLQsNGBINC/0LXRgNC10LHRgNC+0YHQuNGCINC90LAg0YDQsNCx0L7Rh9C40Lkg0YHRgtC+0LssINCz0LTQtSDQktGLINGB0LzQvtC20LXRgtC1INGD0LLQuNC00LXRgtGMINGB0LLQtdC20LXRgdC+0LfQtNCw0L3QvdGD0Y4g0YHRgdGL0LvQutGDLlxcbidcbiAgICAgICAgKyAn0JfQsNC50LTRjyDQvdCwINGB0LDQudGCINC90LDQttCw0YLQuNC10Lwg0L3QsCDRjdGC0YMg0YHRgdGL0LvQutGDINCS0Ysg0LLRgdC10LPQtNCwINCx0YPQtNC10YLQtSDRgdC80L7RgtGA0LXRgtGMINCi0JIg0LIg0L/QvtC70L3QvtGN0LrRgNCw0L3QvdC+0Lwg0YDQtdC20LjQvNC1LlxcbidcbiAgICAgICAgKyAn0JTQu9GPINGD0LTQsNC70LXQvdC40Y8g0YHRgdGL0LvQutC4INC90YPQttC90L4g0LXQtSDQvdCw0LbQsNGC0Ywg0Lgg0L/QvtC00LXRgNC20LDRgtGMLCDQt9Cw0YLQtdC8INC90LDQttCw0YLRjCDQv9C+0Y/QstC40LLRiNC40LnRgdGPINC60YDQtdGB0YLQuNC6INCyINC70LXQstC+0Lwg0LLQtdGA0YXQvdC10Lwg0YPQs9C70YMuJylcbiAgICB9KVxuICAgIGNsYXNzTGlzdC5hZGQoJHN2Z0Z1bGxTY3JPbiwgJ2Rpc2FibGVkJylcbiAgICAkYnRuRnVsbFNjck9mZi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgJGJ0bk1lbnVPZmYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydFdhdGNoTW9kZSlcbiAgICAkYnRuTWVudU9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbGVhdmVXYXRjaE1vZGUpXG59IGVsc2UgaWYgKHdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZV9pbkZ1bGxTY3JlZW4gfHxcbiAgICAgICAgICAgIXdpbmRvdy52aWV3ZXJTdGF0ZS5pc0Z1bGxTY3JlZW5BbGxvd2VkKSB7XG4gICAgJGJ0bkZ1bGxTY3JPbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgJGJ0bkZ1bGxTY3JPZmYuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICRidG5NZW51T2ZmLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RhcnRXYXRjaE1vZGUpXG4gICAgJGJ0bk1lbnVPbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxlYXZlV2F0Y2hNb2RlKVxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZnVsbHNjcmVlbmNoYW5nZVwiLCBmc0hhbmRsZXIpXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwid2Via2l0ZnVsbHNjcmVlbmNoYW5nZVwiLCBmc0hhbmRsZXIpXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW96ZnVsbHNjcmVlbmNoYW5nZVwiLCBmc0hhbmRsZXIpXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiTVNGdWxsc2NyZWVuQ2hhbmdlXCIsIGZzSGFuZGxlcilcblxuZnVuY3Rpb24gZnNIYW5kbGVyKCkge1xuICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5hc2skYm94SW5GdWxsU2NyZWVuKCkpe1xuICAgICAgICBzdGFydFdhdGNoTW9kZSgpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGVhdmVXYXRjaE1vZGUoKVxuICAgIH1cbn1cbmZ1bmN0aW9uIGdvRnVsbFNjcmVlbigpIHtcbiAgICBpZiAoJGJveC5yZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAkYm94LnJlcXVlc3RGdWxsc2NyZWVuKClcbiAgICB9IGVsc2UgaWYgKCRib3gubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgJGJveC5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpXG4gICAgfSBlbHNlIGlmICgkYm94LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICRib3gud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgIH0gZWxzZSBpZiAoJGJveC5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICRib3gubXNSZXF1ZXN0RnVsbHNjcmVlbigpXG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0T2ZmRnVsbHNjcmVlbigpIHtcbiAgaWYoZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4pIHtcbiAgICBkb2N1bWVudC5leGl0RnVsbHNjcmVlbigpO1xuICB9IGVsc2UgaWYoZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgIGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcbiAgfSBlbHNlIGlmKGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKSB7XG4gICAgZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcbiAgfWVsc2UgaWYgKGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4pIHtcblx0ZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbigpO1xuICB9XG59XG5mdW5jdGlvbiBzdGFydFdhdGNoTW9kZShlKSB7XG4gICAgY2xhc3NMaXN0LmFkZCgkc2lkZU1lbnVCb3gsICdoaWRlX21lbnUnKVxuICAgICRib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY3JlZW5DbGlja0hhbmRsZXIpXG4gICAgJGNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjb250cm9sQ2xpY2tIYW5kbGVyKVxufVxuZnVuY3Rpb24gbGVhdmVXYXRjaE1vZGUoZSkge1xuICAgIGNsZWFyVGltZW91dChpZClcbiAgICBjbGFzc0xpc3QucmVtb3ZlKCRjb250cm9sLCAnc2hvd19jb250cm9sJylcbiAgICAkY29udHJvbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNvbnRyb2xDbGlja0hhbmRsZXIpXG4gICAgJGJveC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcmVlbkNsaWNrSGFuZGxlcilcbiAgICBjbGFzc0xpc3QucmVtb3ZlKCRzaWRlTWVudUJveCwgJ2hpZGVfbWVudScpXG59XG5mdW5jdGlvbiBzY3JlZW5DbGlja0hhbmRsZXIoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAkYm94LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2NyZWVuQ2xpY2tIYW5kbGVyKVxuICAgIGNsYXNzTGlzdC5hZGQoJGNvbnRyb2wsICdzaG93X2NvbnRyb2wnKVxuICAgIGlkID0gc2V0VGltZW91dCggZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRjb250cm9sLCAnc2hvd19jb250cm9sJylcbiAgICAgICAgICAgICAkYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2NyZWVuQ2xpY2tIYW5kbGVyKVxuICAgICAgICAgfSAsIGR1cmF0aW9uQ3RybFZpc2libGUpXG59XG5mdW5jdGlvbiBjb250cm9sQ2xpY2tIYW5kbGVyKGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgY2xlYXJUaW1lb3V0KGlkKVxuICAgIGlkID0gc2V0VGltZW91dCggZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRjb250cm9sLCAnc2hvd19jb250cm9sJylcbiAgICAgICAgICAgICAkYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2NyZWVuQ2xpY2tIYW5kbGVyKVxuICAgICAgICAgfSAsIGR1cmF0aW9uQ3RybFZpc2libGUpXG59XG4iLCIndXNlIHN0cmljdCdcclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgd2luZG93LnZpZXdlclN0YXRlID0ge1xyXG4gICAgJyRib3gnOiAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm94JyksXHJcbiAgICAnJHZpZGVvJzogICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlbycpLFxyXG4gICAgJyRzb3VyY2UnOiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc291cmNlJyksXHJcbiAgICAnJHNpZGVNZW51Qm94JzogICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJyksXHJcbiAgICAnJHNsaWRlcic6ICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyX19zbGlkZXInKSxcclxuICAgICckZm9vdGVyJzogICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3RlcicpLFxyXG4gICAgJyRjb250cm9sJzogICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbCcpLFxyXG4gICAgJyRidG5QbGF5Rm9vdGVyJzogICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyIC5idG5fcGxheScpLFxyXG4gICAgJyRidG5QbGF5Q3RybCc6ICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbCAuYnRuX3BsYXknKSxcclxuICAgICckYnRuVm9sdW1lRm9vdGVyJzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3RlciAuYnRuX3ZvbHVtZScpLFxyXG4gICAgJyRidG5Wb2x1bWVDdHJsJzogICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbCAuYnRuX3ZvbHVtZScpLFxyXG4gICAgJyRidG5RdWFsaXR5JzogICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX3F1YWxpdHknKSxcclxuICAgICckYnRuU2NhbGUnOiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjYWxlX2JveF9fYnRuJyksXHJcbiAgICAnJHN1YkJ0blVwJzogICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY2FsZV9ib3hfX3N1YmJ0bl91cCcpLFxyXG4gICAgJyRzdWJCdG5Eb3duJzogICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NhbGVfYm94X19zdWJidG5fZG93bicpLFxyXG4gICAgJyRidG5NZW51T2ZmJzogICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyIC5idG5fX21lbnVfc3dpdGNoJyksXHJcbiAgICAnJGJ0bk1lbnVPbic6ICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sIC5idG5fX21lbnVfc3dpdGNoJyksXHJcbiAgICAnJGJ0bkZ1bGxTY3JPbic6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXIgLmJ0bl9fZnVsbHNjcicpLFxyXG4gICAgJyRidG5GdWxsU2NyT2ZmJzogICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbCAuYnRuX19mdWxsc2NyJyksXHJcbiAgICAnYWN0aXZlJGlucHV0JzogbnVsbCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBvYmplY3RcclxuICAgICdpc1ZpZGVvV29ya2luZyc6IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGJvb2xlYW5cclxuICAgICdpc0Z1bGxTY3JlZW5BbGxvd2VkJzogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGJvb2xlYW5cclxuICAgICdpc19pUGFkX2lQaG9uZSc6IC8oaVBob25lfGlQb2R8aVBhZCkuKkFwcGxlV2ViS2l0L2kudGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCksICAgLy8gIGJvb2xlYW5cclxuICAgICdpc19pUGFkX2lQaG9uZV9pbkZ1bGxTY3JlZW4nOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGJvb2xlYW5cclxuICAgICdhc2skYm94SW5GdWxsU2NyZWVuJzogbnVsbCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGZ1bmN0aW9uIC0+IGJvb2xlYW5cclxuICAgICdoaWdoUXVhbGl0eSc6IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGJvb2xlYW5cclxuICAgICdkdXJhdGlvblNjYWxlU3VibWVudSc6IDQwMDAsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIG1zXHJcbiAgICAnZHVyYXRpb25DdHJsVmlzaWJsZSc6IDUwMDAsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBtc1xyXG4gICAgJ2NsYXNzTGlzdCc6IHtcclxuICAgICAgICAnY29udGFpbnMnOiBudWxsLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGZ1bmN0aW9uIC0+IGJvb2xlYW5cclxuICAgICAgICAnYWRkJzogbnVsbCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGZ1bmN0aW9uIC0+IHZvaWRcclxuICAgICAgICAncmVtb3ZlJzogbnVsbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGZ1bmN0aW9uIC0+IHZvaWRcclxuICAgICB9XHJcbiAgfTtcclxuXHJcbiAgd2luZG93LnZpZXdlclN0YXRlLmlzVmlkZW9Xb3JraW5nID0gcmVxdWlyZSgnLi9hc2tWaWRlb1dvcmtpbmcuanMnKVxyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZS5pc0Z1bGxTY3JlZW5BbGxvd2VkID0gcmVxdWlyZSgnLi9hc2tGdWxsU2NyZWVuLmpzJylcclxuICB3aW5kb3cudmlld2VyU3RhdGUuaXNfaVBhZF9pUGhvbmVfaW5GdWxsU2NyZWVuID0gcmVxdWlyZSgnLi9hc2tfaVBhZF9pUGhvbmVfRnVsbFNjcmVlbi5qcycpXHJcbiAgd2luZG93LnZpZXdlclN0YXRlLmFzayRib3hJbkZ1bGxTY3JlZW4gPSByZXF1aXJlKCcuL2FzayRib3hJbkZ1bGxTY3JlZW4uanMnKVxyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZS5jbGFzc0xpc3QgPSByZXF1aXJlKCcuL2NsYXNzTGlzdC5qcycpXHJcbiAgICBcclxuICByZXF1aXJlKCcuL3NjcmVlbkhlaWdodC5qcycpXHJcbiAgLy8gICAgSW5pdCBjb21wbGV0ZWRcclxuICByZXF1aXJlKCcuL2NoYW5uZWxTZWxlY3Rvci5qcycpXHJcbiAgcmVxdWlyZSgnLi9mdWxsc2NyZWVuT3JIaWRlTWVudS5qcycpXHJcbiAgcmVxdWlyZSgnLi9idXR0b25RdWFsaXR5LmpzJylcclxuICByZXF1aXJlKCcuL2J1dHRvblNjYWxlLmpzJylcclxuICByZXF1aXJlKCcuL2J1dHRvblBsYXlQYXVzZS5qcycpXHJcbiAgaWYoIXdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZSkgcmVxdWlyZSgnLi9idXR0b25Wb2x1bWUuanMnKVxyXG59IiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5zZXRGb250U2l6ZSgpXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzZXRGb250U2l6ZSlcclxuZnVuY3Rpb24gc2V0Rm9udFNpemUoKSB7XHJcbiAgICB2YXIgZm9udFNpemUgPSBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCAvIDIwXHJcbiAgICBpZihkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCA+IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgpIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmZvbnRTaXplID0gMC40ICogZm9udFNpemUgKyAncHgnXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuZm9udFNpemUgPSBmb250U2l6ZSArICdweCdcclxuICAgIH1cclxufSJdfQ==
