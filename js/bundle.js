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
    $video = window.viewerState.$video,
    $source = window.viewerState.$source,
    $btnMenuOn = window.viewerState.$btnMenuOn,
    classList = window.viewerState.classList,
    link = ''

styleQualityButton()

$btnQuality.addEventListener('click', toggleQuality)
document.addEventListener("fullscreenchange", exitFullScreen)
document.addEventListener("webkitfullscreenchange", exitFullScreen)
document.addEventListener("mozfullscreenchange", exitFullScreen)
document.addEventListener("MSFullscreenChange", exitFullScreen)
$btnMenuOn.addEventListener('click', lowerQuality)

function toggleQuality(){
    if (window.viewerState.active$input) {
        if (window.viewerState.highQuality) {
            lowerQuality()
        } else {
            window.viewerState.highQuality = true
            link = window.viewerState.active$input.getAttribute('data-link-hq')
            $video.setAttribute('src', link)
            $source.setAttribute('src', link)
            $video.play()
        }
        styleQualityButton()
    }
}
function exitFullScreen() {
    if(!window.viewerState.ask$boxInFullScreen()){
        lowerQuality()
    }
}
function lowerQuality() {
    window.viewerState.highQuality = false
    link = window.viewerState.active$input.getAttribute('data-link-lq')
    $video.setAttribute('src', link)
    $source.setAttribute('src', link)
    $video.play()
}
function styleQualityButton() {
    if (window.viewerState.highQuality) {
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

disableMainIcon()

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
    enableMainIcon()
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
    disableMainIcon()
}
function btnScaleHandler(e){
    if(e.target === $btnScale || e.target === $svgScale) {
        if(classList.contains($btnScaleSubBtnsBox, 'active')){
            hideSubMenuBox()
        } else {
            classList.add($btnScaleSubBtnsBox, 'active')
            activeID = setTimeout(hideSubMenuBox, window.viewerState.durationScaleSubmenu)
        }
    }
}
function subBtnUpHandler(){
    if(n < nMax) {
        $video.style.height = 100 + ++n * step + '%'
        if(n === nMax) classList.add($subBtnUpIcon, 'disabled')
        if(n === (nMin + 1)) classList.remove($subBtnDownIcon, 'disabled')
        clearTimeout(activeID)
        activeID = setTimeout(hideSubMenuBox, window.viewerState.durationScaleSubmenu)
    }
}
function subBtnDownHandler(){
    if(n > nMin) {
        $video.style.height = 100 + --n * step + '%'
        if(n === nMin) classList.add($subBtnDownIcon, 'disabled')
        if(n === (nMax - 1)) classList.remove($subBtnUpIcon, 'disabled')
        clearTimeout(activeID)
        activeID = setTimeout(hideSubMenuBox, window.viewerState.durationScaleSubmenu)
    }
}
function hideSubMenuBox() {
    classList.remove($btnScaleSubBtnsBox, 'active')
}
function disableMainIcon() {
    classList.add($svgScale, 'disabled')
}
function enableMainIcon() {
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
        if(window.viewerState.active$input === e.target) {
            window.viewerState.active$input.checked = false
            window.viewerState.active$input = null
            $video.setAttribute('src', '')
            $source.setAttribute('src', '')
            $video.style.backgroundSize = ""
            classList.remove($sideMenuBox, 'show_footer')
//            $video.removeEventListener('error', failed)
        } else {
            window.viewerState.active$input = e.target
            window.viewerState.highQuality = false
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2EwNS9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hc2skYm94SW5GdWxsU2NyZWVuLmpzIiwianMvYXNrRnVsbFNjcmVlbi5qcyIsImpzL2Fza1ZpZGVvV29ya2luZy5qcyIsImpzL2Fza19pUGFkX2lQaG9uZV9GdWxsU2NyZWVuLmpzIiwianMvYnV0dG9uUGxheVBhdXNlLmpzIiwianMvYnV0dG9uUXVhbGl0eS5qcyIsImpzL2J1dHRvblNjYWxlLmpzIiwianMvYnV0dG9uVm9sdW1lLmpzIiwianMvY2hhbm5lbFNlbGVjdG9yLmpzIiwianMvY2xhc3NMaXN0LmpzIiwianMvZnVsbHNjcmVlbk9ySGlkZU1lbnUuanMiLCJqcy9tYWluLmpzIiwianMvc2NyZWVuSGVpZ2h0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDdklBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIGlmIChkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCB8fCBcclxuICAgICAgICBkb2N1bWVudC53ZWJraXRGdWxsc2NyZWVuRWxlbWVudCB8fFxyXG4gICAgICAgIGRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbGVtZW50IHx8XHJcbiAgICAgICAgZG9jdW1lbnQubXNGdWxsc2NyZWVuRWxlbWVudCB8fFxyXG4gICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZV9pbkZ1bGxTY3JlZW4gKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSByZXR1cm4gZmFsc2VcclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciAkYm94ID0gd2luZG93LnZpZXdlclN0YXRlLiRib3hcclxuICAgIGlmICgkYm94LnJlcXVlc3RGdWxsc2NyZWVuIHx8XHJcbiAgICAgICAgJGJveC5tb3pSZXF1ZXN0RnVsbFNjcmVlbiB8fFxyXG4gICAgICAgICRib3gud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4gfHxcclxuICAgICAgICAkYm94Lm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZSBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlIFxyXG4gICAgfVxyXG59KSgpXHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYodHlwZW9mIHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8ucGxheSA9PT0gJ2Z1bmN0aW9uJyApIHtcclxuICAgICAgICBjb25zb2xlLmxvZygndmlkZW8gb2sgbmVlZHMgdG8gYmUgY29uZmlybWVkJylcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnbm8gdmlkZW8nKVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG59KSgpXHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICBpZih3aW5kb3cudmlld2VyU3RhdGUuaXNfaVBhZF9pUGhvbmUgJiYgd2luZG93LmlubmVySGVpZ2h0ID49IHdpbmRvdy5zY3JlZW4uYXZhaWxIZWlnaHQpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSBlbHNlIHJldHVybiBmYWxzZVxyXG59KSgpXHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8sXHJcbiAgICAkYnRuUGxheUZvb3RlciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuUGxheUZvb3RlcixcclxuICAgICRidG5QbGF5Q3RybCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuUGxheUN0cmwsXHJcbiAgICAkc3ZnUGxheUZvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXIgLmJ0bl9wbGF5X19pY29uX3BsYXknKSxcclxuICAgICRzdmdQbGF5Q3RybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sIC5idG5fcGxheV9faWNvbl9wbGF5JyksXHJcbiAgICAkc3ZnUGF1c2VGb290ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyIC5idG5fcGxheV9faWNvbl9wYXVzZScpLFxyXG4gICAgJHN2Z1BhdXNlQ3RybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sIC5idG5fcGxheV9faWNvbl9wYXVzZScpLFxyXG4gICAgY2xhc3NMaXN0ID0gd2luZG93LnZpZXdlclN0YXRlLmNsYXNzTGlzdFxyXG5cclxuaWYgKCR2aWRlby5wYXVzZWQpe1xyXG4gICAgc2V0SWNvbnNQbGF5KClcclxufSBlbHNlIHtcclxuICAgIHNldEljb25zUGF1c2UoKVxyXG59IFxyXG4kYnRuUGxheUZvb3Rlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZVBsYXlQYXVzZSlcclxuJGJ0blBsYXlDdHJsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlUGxheVBhdXNlKVxyXG4kdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGxheScsIHNldEljb25zUGF1c2UoKSlcclxuJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BhdXNlJywgc2V0SWNvbnNQbGF5KCkpXHJcbiR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG59KVxyXG5mdW5jdGlvbiB0b2dnbGVQbGF5UGF1c2UoKXtcclxuICAgIGlmICgkdmlkZW8ucGF1c2VkKSAkdmlkZW8ucGxheSgpIFxyXG4gICAgZWxzZSAkdmlkZW8ucGF1c2UoKVxyXG59XHJcbmZ1bmN0aW9uIHNldEljb25zUGxheSgpIHtcclxuICAgIGNsYXNzTGlzdC5hZGQoJHN2Z1BsYXlGb290ZXIsIFwiYWN0aXZlXCIpXHJcbiAgICBjbGFzc0xpc3QuYWRkKCRzdmdQbGF5Q3RybCwgXCJhY3RpdmVcIilcclxuICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z1BhdXNlRm9vdGVyLCBcImFjdGl2ZVwiKVxyXG4gICAgY2xhc3NMaXN0LnJlbW92ZSgkc3ZnUGF1c2VDdHJsLCBcImFjdGl2ZVwiKVxyXG59XHJcbmZ1bmN0aW9uIHNldEljb25zUGF1c2UoKSB7XHJcbiAgICBjbGFzc0xpc3QuYWRkKCRzdmdQYXVzZUZvb3RlciwgXCJhY3RpdmVcIilcclxuICAgIGNsYXNzTGlzdC5hZGQoJHN2Z1BhdXNlQ3RybCwgXCJhY3RpdmVcIilcclxuICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z1BsYXlGb290ZXIsIFwiYWN0aXZlXCIpXHJcbiAgICBjbGFzc0xpc3QucmVtb3ZlKCRzdmdQbGF5Q3RybCwgXCJhY3RpdmVcIilcclxufSIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyICRidG5RdWFsaXR5ID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5RdWFsaXR5LFxyXG4gICAgJHN2Z1F1YWxpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX3F1YWxpdHlfX2ljb24nKSxcclxuICAgICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8sXHJcbiAgICAkc291cmNlID0gd2luZG93LnZpZXdlclN0YXRlLiRzb3VyY2UsXHJcbiAgICAkYnRuTWVudU9uID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5NZW51T24sXHJcbiAgICBjbGFzc0xpc3QgPSB3aW5kb3cudmlld2VyU3RhdGUuY2xhc3NMaXN0LFxyXG4gICAgbGluayA9ICcnXHJcblxyXG5zdHlsZVF1YWxpdHlCdXR0b24oKVxyXG5cclxuJGJ0blF1YWxpdHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVRdWFsaXR5KVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZnVsbHNjcmVlbmNoYW5nZVwiLCBleGl0RnVsbFNjcmVlbilcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2VcIiwgZXhpdEZ1bGxTY3JlZW4pXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3pmdWxsc2NyZWVuY2hhbmdlXCIsIGV4aXRGdWxsU2NyZWVuKVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiTVNGdWxsc2NyZWVuQ2hhbmdlXCIsIGV4aXRGdWxsU2NyZWVuKVxyXG4kYnRuTWVudU9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbG93ZXJRdWFsaXR5KVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlUXVhbGl0eSgpe1xyXG4gICAgaWYgKHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQpIHtcclxuICAgICAgICBpZiAod2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5KSB7XHJcbiAgICAgICAgICAgIGxvd2VyUXVhbGl0eSgpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5ID0gdHJ1ZVxyXG4gICAgICAgICAgICBsaW5rID0gd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1ocScpXHJcbiAgICAgICAgICAgICR2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgICAgICAgICRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICAgICAgICAkdmlkZW8ucGxheSgpXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHN0eWxlUXVhbGl0eUJ1dHRvbigpXHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gZXhpdEZ1bGxTY3JlZW4oKSB7XHJcbiAgICBpZighd2luZG93LnZpZXdlclN0YXRlLmFzayRib3hJbkZ1bGxTY3JlZW4oKSl7XHJcbiAgICAgICAgbG93ZXJRdWFsaXR5KClcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBsb3dlclF1YWxpdHkoKSB7XHJcbiAgICB3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkgPSBmYWxzZVxyXG4gICAgbGluayA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmstbHEnKVxyXG4gICAgJHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgJHZpZGVvLnBsYXkoKVxyXG59XHJcbmZ1bmN0aW9uIHN0eWxlUXVhbGl0eUJ1dHRvbigpIHtcclxuICAgIGlmICh3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkpIHtcclxuICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRzdmdRdWFsaXR5LCAnZGlzYWJsZWQnKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjbGFzc0xpc3QuYWRkKCRzdmdRdWFsaXR5LCAnZGlzYWJsZWQnKVxyXG4gICAgfVxyXG59IiwiJ3VzZSBzdHJpY3QnXHJcblxyXG4vLyAgICAgICAgICBTY2FsZVxyXG52YXIgJGJveCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYm94LFxyXG4gICAgJHZpZGVvID0gd2luZG93LnZpZXdlclN0YXRlLiR2aWRlbyxcclxuICAgICRidG5TY2FsZSA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuU2NhbGUsXHJcbiAgICAkc3ZnU2NhbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NhbGVfYm94X19idG5faWNvbicpLFxyXG4gICAgJGJ0blNjYWxlU3ViQnRuc0JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY2FsZV9ib3hfX3N1YmJ0bnMnKSxcclxuICAgICRzdWJCdG5VcCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc3ViQnRuVXAsXHJcbiAgICAkc3ViQnRuRG93biA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc3ViQnRuRG93bixcclxuICAgICRzdWJCdG5VcEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3ViYnRuX3VwJyksXHJcbiAgICAkc3ViQnRuRG93bkljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3ViYnRuX2Rvd24nKSxcclxuICAgICRidG5NZW51T2ZmID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5NZW51T2ZmLFxyXG4gICAgY2xhc3NMaXN0ID0gd2luZG93LnZpZXdlclN0YXRlLmNsYXNzTGlzdCxcclxuICAgIHJhdGlvID0gdW5kZWZpbmVkLFxyXG4gICAgbWF4JHZpZGVvSGVpZ2h0ID0gdW5kZWZpbmVkLFxyXG4gICAgbWluJHZpZGVvSGVpZ2h0ID0gdW5kZWZpbmVkLFxyXG4gICAgc3RlcCA9IHVuZGVmaW5lZCxcclxuICAgIG4gPSB1bmRlZmluZWQsXHJcbiAgICBuTWF4ID0gMCxcclxuICAgIG5NaW4gPSAwLFxyXG4gICAgaWQgPSB1bmRlZmluZWQsXHJcbiAgICBhY3RpdmVJRCA9IHVuZGVmaW5lZFxyXG5cclxuZGlzYWJsZU1haW5JY29uKClcclxuXHJcbiRidG5NZW51T2ZmLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2NhbGVSZXN0YXJ0KVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdmdWxsc2NyZWVuY2hhbmdlJywgc2NhbGVSZXN0YXJ0KVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJywgc2NhbGVSZXN0YXJ0KVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3pmdWxsc2NyZWVuY2hhbmdlJywgc2NhbGVSZXN0YXJ0KVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdNU0Z1bGxzY3JlZW5DaGFuZ2UnLCBzY2FsZVJlc3RhcnQpXHJcbiR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNsZWFyVGltZW91dChpZClcclxuICAgIHN0b3BTY2FsaW5nKClcclxufSlcclxuXHJcbmZ1bmN0aW9uIHNjYWxlUmVzdGFydCgpIHtcclxuICAgIHN0b3BTY2FsaW5nKClcclxuICAgIGNsZWFyVGltZW91dChpZClcclxuICAgIGlkID0gc2V0VGltZW91dChzdGFydFNjYWxpbmcsIDEwMDApXHJcbn1cclxuZnVuY3Rpb24gc3RhcnRTY2FsaW5nKCkge1xyXG4gICAgcmF0aW8gPSAkYm94LmNsaWVudFdpZHRoIC8gJHZpZGVvLm9mZnNldFdpZHRoXHJcbiAgICBpZihyYXRpbyA8PSAxKSB7XHJcbiAgICAgICAgbWluJHZpZGVvSGVpZ2h0ID0gMTAwICogcmF0aW8gICAvLyAgJVxyXG4gICAgICAgIG5NaW4gPSBNYXRoLmZsb29yKChtaW4kdmlkZW9IZWlnaHQgLSAxMDApIC8gMTQpXHJcbiAgICAgICAgbk1heCA9IDBcclxuICAgICAgICBzdGVwID0gKG1pbiR2aWRlb0hlaWdodCAtIDEwMCkgLyBuTWluXHJcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgkc3ViQnRuVXBJY29uLCAnZGlzYWJsZWQnKVxyXG4gICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN1YkJ0bkRvd25JY29uLCAnZGlzYWJsZWQnKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBtYXgkdmlkZW9IZWlnaHQgPSAxMDAgKiByYXRpbyAgIC8vICAlXHJcbiAgICAgICAgbk1heCA9IE1hdGguY2VpbCgobWF4JHZpZGVvSGVpZ2h0IC0gMTAwKSAvIDE0KVxyXG4gICAgICAgIG5NaW4gPSAwXHJcbiAgICAgICAgc3RlcCA9IChtYXgkdmlkZW9IZWlnaHQgLSAxMDApIC8gbk1heFxyXG4gICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN1YkJ0blVwSWNvbiwgJ2Rpc2FibGVkJylcclxuICAgICAgICBjbGFzc0xpc3QuYWRkKCRzdWJCdG5Eb3duSWNvbiwgJ2Rpc2FibGVkJylcclxuICAgIH1cclxuICAgIG4gPSAwXHJcbiAgICAkYnRuU2NhbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBidG5TY2FsZUhhbmRsZXIpIFxyXG4gICAgJHN1YkJ0blVwLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3ViQnRuVXBIYW5kbGVyKSBcclxuICAgICRzdWJCdG5Eb3duLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3ViQnRuRG93bkhhbmRsZXIpXHJcbiAgICBlbmFibGVNYWluSWNvbigpXHJcbn1cclxuZnVuY3Rpb24gc3RvcFNjYWxpbmcoKSB7XHJcbiAgICByYXRpbyA9IHVuZGVmaW5lZFxyXG4gICAgbWF4JHZpZGVvSGVpZ2h0ID0gdW5kZWZpbmVkXHJcbiAgICBzdGVwID0gdW5kZWZpbmVkXHJcbiAgICBuID0gdW5kZWZpbmVkXHJcbiAgICAkdmlkZW8uc3R5bGUuaGVpZ2h0ID0gJydcclxuICAgICRidG5TY2FsZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGJ0blNjYWxlSGFuZGxlcikgXHJcbiAgICAkc3ViQnRuVXAucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdWJCdG5VcEhhbmRsZXIpIFxyXG4gICAgJHN1YkJ0bkRvd24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdWJCdG5Eb3duSGFuZGxlcilcclxuICAgIGRpc2FibGVNYWluSWNvbigpXHJcbn1cclxuZnVuY3Rpb24gYnRuU2NhbGVIYW5kbGVyKGUpe1xyXG4gICAgaWYoZS50YXJnZXQgPT09ICRidG5TY2FsZSB8fCBlLnRhcmdldCA9PT0gJHN2Z1NjYWxlKSB7XHJcbiAgICAgICAgaWYoY2xhc3NMaXN0LmNvbnRhaW5zKCRidG5TY2FsZVN1YkJ0bnNCb3gsICdhY3RpdmUnKSl7XHJcbiAgICAgICAgICAgIGhpZGVTdWJNZW51Qm94KClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjbGFzc0xpc3QuYWRkKCRidG5TY2FsZVN1YkJ0bnNCb3gsICdhY3RpdmUnKVxyXG4gICAgICAgICAgICBhY3RpdmVJRCA9IHNldFRpbWVvdXQoaGlkZVN1Yk1lbnVCb3gsIHdpbmRvdy52aWV3ZXJTdGF0ZS5kdXJhdGlvblNjYWxlU3VibWVudSlcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gc3ViQnRuVXBIYW5kbGVyKCl7XHJcbiAgICBpZihuIDwgbk1heCkge1xyXG4gICAgICAgICR2aWRlby5zdHlsZS5oZWlnaHQgPSAxMDAgKyArK24gKiBzdGVwICsgJyUnXHJcbiAgICAgICAgaWYobiA9PT0gbk1heCkgY2xhc3NMaXN0LmFkZCgkc3ViQnRuVXBJY29uLCAnZGlzYWJsZWQnKVxyXG4gICAgICAgIGlmKG4gPT09IChuTWluICsgMSkpIGNsYXNzTGlzdC5yZW1vdmUoJHN1YkJ0bkRvd25JY29uLCAnZGlzYWJsZWQnKVxyXG4gICAgICAgIGNsZWFyVGltZW91dChhY3RpdmVJRClcclxuICAgICAgICBhY3RpdmVJRCA9IHNldFRpbWVvdXQoaGlkZVN1Yk1lbnVCb3gsIHdpbmRvdy52aWV3ZXJTdGF0ZS5kdXJhdGlvblNjYWxlU3VibWVudSlcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBzdWJCdG5Eb3duSGFuZGxlcigpe1xyXG4gICAgaWYobiA+IG5NaW4pIHtcclxuICAgICAgICAkdmlkZW8uc3R5bGUuaGVpZ2h0ID0gMTAwICsgLS1uICogc3RlcCArICclJ1xyXG4gICAgICAgIGlmKG4gPT09IG5NaW4pIGNsYXNzTGlzdC5hZGQoJHN1YkJ0bkRvd25JY29uLCAnZGlzYWJsZWQnKVxyXG4gICAgICAgIGlmKG4gPT09IChuTWF4IC0gMSkpIGNsYXNzTGlzdC5yZW1vdmUoJHN1YkJ0blVwSWNvbiwgJ2Rpc2FibGVkJylcclxuICAgICAgICBjbGVhclRpbWVvdXQoYWN0aXZlSUQpXHJcbiAgICAgICAgYWN0aXZlSUQgPSBzZXRUaW1lb3V0KGhpZGVTdWJNZW51Qm94LCB3aW5kb3cudmlld2VyU3RhdGUuZHVyYXRpb25TY2FsZVN1Ym1lbnUpXHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gaGlkZVN1Yk1lbnVCb3goKSB7XHJcbiAgICBjbGFzc0xpc3QucmVtb3ZlKCRidG5TY2FsZVN1YkJ0bnNCb3gsICdhY3RpdmUnKVxyXG59XHJcbmZ1bmN0aW9uIGRpc2FibGVNYWluSWNvbigpIHtcclxuICAgIGNsYXNzTGlzdC5hZGQoJHN2Z1NjYWxlLCAnZGlzYWJsZWQnKVxyXG59XHJcbmZ1bmN0aW9uIGVuYWJsZU1haW5JY29uKCkge1xyXG4gICAgY2xhc3NMaXN0LnJlbW92ZSgkc3ZnU2NhbGUsICdkaXNhYmxlZCcpXHJcbn1cclxuXHJcbi8vICR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdsb2Fkc3RhcnQnLCBmdW5jdGlvbigpe1xyXG4vLyAgICAgY29uc29sZS5sb2coJ1RoZSBsb2Fkc3RhcnQgZXZlbnQgb2NjdXJzIHdoZW4gdGhlIGJyb3dzZXIgc3RhcnRzIGxvb2tpbmcgZm9yIHRoZSBzcGVjaWZpZWQgYXVkaW8vdmlkZW8uIFRoaXMgaXMgd2hlbiB0aGUgbG9hZGluZyBwcm9jZXNzIHN0YXJ0cy4nICsgKERhdGUubm93KCkgLSB3aW5kb3cudmlld2VyU3RhdGUudGltZXJGb3JFcnJvclBhZ2UpKVxyXG4vLyB9KVxyXG4vLyAkdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignZHVyYXRpb25jaGFuZ2UnLCBmdW5jdGlvbigpe1xyXG4vLyAgICAgY29uc29sZS5sb2coJ1RoZSBkdXJhdGlvbmNoYW5nZSBldmVudCBvY2N1cnMgd2hlbiB0aGUgZHVyYXRpb24gZGF0YSBvZiB0aGUgc3BlY2lmaWVkIGF1ZGlvL3ZpZGVvIGlzIGNoYW5nZWQuJyArIChEYXRlLm5vdygpIC0gd2luZG93LnZpZXdlclN0YXRlLnRpbWVyRm9yRXJyb3JQYWdlKSlcclxuLy8gfSlcclxuLy8gJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZG1ldGFkYXRhJywgZnVuY3Rpb24oKXtcclxuLy8gICAgIGNvbnNvbGUubG9nKCdUaGUgbG9hZGVkbWV0YWRhdGEgZXZlbnQgb2NjdXJzIHdoZW4gbWV0YSBkYXRhIGZvciB0aGUgc3BlY2lmaWVkIGF1ZGlvL3ZpZGVvIGhhcyBiZWVuIGxvYWRlZC4nICsgKERhdGUubm93KCkgLSB3aW5kb3cudmlld2VyU3RhdGUudGltZXJGb3JFcnJvclBhZ2UpKVxyXG4vLyB9KVxyXG5cclxuLy8gJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZGRhdGEnLCBmdW5jdGlvbigpe1xyXG4vLyAgICAgY29uc29sZS5sb2coJ1RoZSBsb2FkZWRkYXRhIGV2ZW50IG9jY3VycyB3aGVuIGRhdGEgZm9yIHRoZSBjdXJyZW50IGZyYW1lIGlzIGxvYWRlZCwgYnV0IG5vdCBlbm91Z2ggZGF0YSB0byBwbGF5IG5leHQgZnJhbWUgb2YgdGhlIHNwZWNpZmllZCBhdWRpby92aWRlby4nICsgKERhdGUubm93KCkgLSB3aW5kb3cudmlld2VyU3RhdGUudGltZXJGb3JFcnJvclBhZ2UpKVxyXG4vLyB9KVxyXG4vLyAkdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncHJvZ3Jlc3MnLCBmdW5jdGlvbigpe1xyXG4vLyAgICAgY29uc29sZS5sb2coJ1RoZSBwcm9ncmVzcyBldmVudCBvY2N1cnMgd2hlbiB0aGUgYnJvd3NlciBpcyBkb3dubG9hZGluZyB0aGUgc3BlY2lmaWVkIGF1ZGlvL3ZpZGVvLicgKyAoRGF0ZS5ub3coKSAtIHdpbmRvdy52aWV3ZXJTdGF0ZS50aW1lckZvckVycm9yUGFnZSkpXHJcbi8vIH0pXHJcbi8vICR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5JywgZnVuY3Rpb24oKXtcclxuLy8gICAgIGNvbnNvbGUubG9nKCdUaGUgY2FucGxheSBldmVudCBvY2N1cnMgd2hlbiB0aGUgYnJvd3NlciBjYW4gc3RhcnQgcGxheWluZyB0aGUgc3BlY2lmaWVkIGF1ZGlvL3ZpZGVvICh3aGVuIGl0IGhhcyBidWZmZXJlZCBlbm91Z2ggdG8gYmVnaW4pLicgKyAoRGF0ZS5ub3coKSAtIHdpbmRvdy52aWV3ZXJTdGF0ZS50aW1lckZvckVycm9yUGFnZSkpXHJcbi8vIH0pXHJcbi8vICR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdjYW5wbGF5dGhyb3VnaCcsIGZ1bmN0aW9uKCl7XHJcbi8vICAgICBjb25zb2xlLmxvZygnVGhlIGNhbnBsYXl0aHJvdWdoIGV2ZW50IG9jY3VycyB3aGVuIHRoZSBicm93c2VyIGVzdGltYXRlcyBpdCBjYW4gcGxheSB0aHJvdWdoIHRoZSBzcGVjaWZpZWQgYXVkaW8vdmlkZW8gd2l0aG91dCBoYXZpbmcgdG8gc3RvcCBmb3IgYnVmZmVyaW5nLicgKyAoRGF0ZS5ub3coKSAtIHdpbmRvdy52aWV3ZXJTdGF0ZS50aW1lckZvckVycm9yUGFnZSkpXHJcbi8vIH0pXHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8sXHJcbiAgICAkYnRuVm9sdW1lRm9vdGVyID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5Wb2x1bWVGb290ZXIsXHJcbiAgICAkYnRuVm9sdW1lQ3RybCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuVm9sdW1lQ3RybCxcclxuICAgICRzdmdWb2x1bWVPbkZvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXIgLmJ0bl92b2x1bWVfX2ljb25fb24nKSxcclxuICAgICRzdmdWb2x1bWVPbkN0cmwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbCAuYnRuX3ZvbHVtZV9faWNvbl9vbicpLFxyXG4gICAgJHN2Z1ZvbHVtZU9mZkZvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXIgLmJ0bl92b2x1bWVfX2ljb25fb2ZmJyksXHJcbiAgICAkc3ZnVm9sdW1lT2ZmQ3RybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sIC5idG5fdm9sdW1lX19pY29uX29mZicpLFxyXG4gICAgY2xhc3NMaXN0ID0gd2luZG93LnZpZXdlclN0YXRlLmNsYXNzTGlzdFxyXG5cclxuJGJ0blZvbHVtZUZvb3Rlci5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jaydcclxuJGJ0blZvbHVtZUN0cmwuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snXHJcblxyXG4kYnRuVm9sdW1lRm9vdGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbXV0ZSlcclxuJGJ0blZvbHVtZUN0cmwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBtdXRlKVxyXG5cclxuZnVuY3Rpb24gbXV0ZSgpe1xyXG4gICAgaWYgKCR2aWRlby5tdXRlZCl7XHJcbiAgICAgICAgJHZpZGVvLm11dGVkID0gZmFsc2VcclxuICAgICAgICAkdmlkZW8udm9sdW1lID0gMS4wXHJcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgkc3ZnVm9sdW1lT25Gb290ZXIsIFwiYWN0aXZlXCIpXHJcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgkc3ZnVm9sdW1lT25DdHJsLCBcImFjdGl2ZVwiKVxyXG4gICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z1ZvbHVtZU9mZkZvb3RlciwgXCJhY3RpdmVcIilcclxuICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRzdmdWb2x1bWVPZmZDdHJsLCBcImFjdGl2ZVwiKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkdmlkZW8udm9sdW1lID0gMC4wXHJcbiAgICAgICAgJHZpZGVvLm11dGVkID0gdHJ1ZVxyXG4gICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z1ZvbHVtZU9uRm9vdGVyLCBcImFjdGl2ZVwiKVxyXG4gICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z1ZvbHVtZU9uQ3RybCwgXCJhY3RpdmVcIilcclxuICAgICAgICBjbGFzc0xpc3QuYWRkKCRzdmdWb2x1bWVPZmZGb290ZXIsIFwiYWN0aXZlXCIpXHJcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgkc3ZnVm9sdW1lT2ZmQ3RybCwgXCJhY3RpdmVcIilcclxuICAgIH0gXHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCJcclxuXHJcbnZhciAkdmlkZW8gPSB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvLFxyXG4gICAgJHNvdXJjZSA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc291cmNlLFxyXG4gICAgJHNsaWRlciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc2xpZGVyLFxyXG4gICAgJHNpZGVNZW51Qm94ID0gd2luZG93LnZpZXdlclN0YXRlLiRzaWRlTWVudUJveCxcclxuICAgIGNsYXNzTGlzdCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5jbGFzc0xpc3QsXHJcbiAgICBsaW5rID0gJycsXHJcbiAgICAkYnRucyA9IHtcclxuICAgIFwiY2hfMWdvcm9kc2tveVwiOiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF8xZ29yb2Rza295XCIpLFxyXG4gICAgXCJjaF8zdHN5ZnJvdm95XCI6ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoXzN0c3lmcm92b3lcIiksXHJcbiAgICBcImNoX3JlcG9ydGVyXCI6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfcmVwb3J0ZXJcIiksXHJcbiAgICBcImNoX2FjYWRlbWlhXCI6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfYWNhZGVtaWFcIiksXHJcbiAgICBcImNoX2ExXCI6ICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfYTFcIiksXHJcbiAgICBcImNoX2R1bXNrYXlhXCI6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfZHVtc2theWFcIiksXHJcbiAgICBcImNoX2d0dlwiOiAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfZ3R2XCIpLFxyXG4gICAgXCJjaF9zdHZcIjogICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX3N0dlwiKSxcclxuICAgIFwiY2hfdWduYXlhdm9sbmFcIjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF91Z25heWF2b2xuYVwiKSxcclxuICAgIFwiY2hfbmVtb1wiOiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9uZW1vXCIpXHJcbn1cclxuJGJ0bnMuY2hfMWdvcm9kc2tveS5zZXRBdHRyaWJ1dGUoICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxLzF0dm9kLzF0dm9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgICAgKVxyXG4kYnRucy5jaF8zdHN5ZnJvdm95LnNldEF0dHJpYnV0ZSggICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly9jZG41LmxpdmUtdHYub2QudWE6ODA4MS90di8zdHZvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiICApXHJcbiRidG5zLmNoX3JlcG9ydGVyLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovL2NkbjQubGl2ZS10di5vZC51YTo4MDgxL3R2LzMxY2hvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiIClcclxuJGJ0bnMuY2hfYWNhZGVtaWEuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vY2RuNC5saXZlLXR2Lm9kLnVhOjgwODEvdHYvMzZjaG9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgKVxyXG4kYnRucy5jaF9hMS5zZXRBdHRyaWJ1dGUoICAgICAgICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvYTFvZC9hMW9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgICAgICApXHJcbiRidG5zLmNoX2R1bXNrYXlhLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzg6ODA4MS9kdW1za2EvZHVtc2thLWFici1scS9wbGF5bGlzdC5tM3U4XCIgIClcclxuJGJ0bnMuY2hfZ3R2LnNldEF0dHJpYnV0ZSggICAgICAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL2Exb2QvZ3R2b2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICAgKVxyXG4kYnRucy5jaF9zdHYuc2V0QXR0cmlidXRlKCAgICAgICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvc3R2b2Qvc3R2b2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICApXHJcbiRidG5zLmNoX3VnbmF5YXZvbG5hLnNldEF0dHJpYnV0ZSggJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS93YXZlL3dhdmUtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICAgIClcclxuJGJ0bnMuY2hfbmVtby5zZXRBdHRyaWJ1dGUoICAgICAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL25lbW8vbW9yLXN1Yi9wbGF5bGlzdC5tM3U4XCIgICAgICAgICAgKVxyXG5cclxuJGJ0bnMuY2hfMWdvcm9kc2tveS5zZXRBdHRyaWJ1dGUoICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxLzF0dm9kLzF0dm9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgKVxyXG4kYnRucy5jaF8zdHN5ZnJvdm95LnNldEF0dHJpYnV0ZSggICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly9jZG41LmxpdmUtdHYub2QudWE6ODA4MS90di8zdHZvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgICApXHJcbiRidG5zLmNoX3JlcG9ydGVyLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovL2NkbjQubGl2ZS10di5vZC51YTo4MDgxL3R2LzMxY2hvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgIClcclxuJGJ0bnMuY2hfYWNhZGVtaWEuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vY2RuNC5saXZlLXR2Lm9kLnVhOjgwODEvdHYvMzZjaG9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgKVxyXG4kYnRucy5jaF9hMS5zZXRBdHRyaWJ1dGUoICAgICAgICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvYTFvZC9hMW9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgICApXHJcbiRidG5zLmNoX2R1bXNrYXlhLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzg6ODA4MS9kdW1za2EvZHVtc2thLWFici9wbGF5bGlzdC5tM3U4XCIgICAgIClcclxuJGJ0bnMuY2hfZ3R2LnNldEF0dHJpYnV0ZSggICAgICAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL2Exb2QvZ3R2b2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICAgKVxyXG4kYnRucy5jaF9zdHYuc2V0QXR0cmlidXRlKCAgICAgICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvc3R2b2Qvc3R2b2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICApXHJcbiRidG5zLmNoX3VnbmF5YXZvbG5hLnNldEF0dHJpYnV0ZSggJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS93YXZlL3dhdmUtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICAgIClcclxuJGJ0bnMuY2hfbmVtby5zZXRBdHRyaWJ1dGUoICAgICAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL25lbW8vbW9yLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgICAgKVxyXG5cclxuJHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgaWYoZS50YXJnZXQudGFnTmFtZSA9PT0gJ0lOUFVUJyl7XHJcbiAgICAgICAgaWYod2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dCA9PT0gZS50YXJnZXQpIHtcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dC5jaGVja2VkID0gZmFsc2VcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dCA9IG51bGxcclxuICAgICAgICAgICAgJHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgJycpXHJcbiAgICAgICAgICAgICRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCAnJylcclxuICAgICAgICAgICAgJHZpZGVvLnN0eWxlLmJhY2tncm91bmRTaXplID0gXCJcIlxyXG4gICAgICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRzaWRlTWVudUJveCwgJ3Nob3dfZm9vdGVyJylcclxuLy8gICAgICAgICAgICAkdmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmYWlsZWQpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dCA9IGUudGFyZ2V0XHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSA9IGZhbHNlXHJcbiAgICAgICAgICAgIGxpbmsgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1scScpXHJcbiAgICAgICAgICAgICR2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgICAgICAgICRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICAgICAgICAkdmlkZW8uc3R5bGUuYmFja2dyb3VuZFNpemUgPSBcIjAgMFwiXHJcbiAgICAgICAgICAgIGlmKCR2aWRlby5wbGF5KSAkdmlkZW8ucGxheSgpO1xyXG4gICAgICAgICAgICBlbHNlIGFsZXJ0ICgndmlkZW8gY2Fubm90IHBsYXknKVxyXG4gICAgICAgICAgICBjbGFzc0xpc3QuYWRkKCRzaWRlTWVudUJveCwgJ3Nob3dfZm9vdGVyJylcclxuLy8gICAgICAgICAgICAkdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmYWlsZWQpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KVxyXG4vKlxyXG4gZnVuY3Rpb24gZmFpbGVkKGUpIHtcclxuICAgLy8gdmlkZW8gcGxheWJhY2sgZmFpbGVkIC0gc2hvdyBhIG1lc3NhZ2Ugc2F5aW5nIHdoeSAgICAgLSBmcm9tIGh0dHBzOi8vZGV2LnczLm9yZy9odG1sNS9zcGVjLWF1dGhvci12aWV3L3ZpZGVvLmh0bWwjdmlkZW9cclxuICAgc3dpdGNoIChlLnRhcmdldC5lcnJvci5jb2RlKSB7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfQUJPUlRFRDpcclxuICAgICAgIGFsZXJ0KCfQktC+0YHQv9GA0L7QuNC30LLQtdC00LXQvdC40LUg0LLQuNC00LXQviDQv9GA0LXRgNCy0LDQvdC+LicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfTkVUV09SSzpcclxuICAgICAgIGFsZXJ0KCfQntGI0LjQsdC60LAg0YHQtdGC0Lgg0L/RgNC40LLQtdC70LAg0Log0L3QsNGA0YPRiNC10L3QuNGOINC30LDQs9GA0YPQt9C60Lgg0LLQuNC00LXQvicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfREVDT0RFOlxyXG4gICAgICAgYWxlcnQoJ9CS0L7RgdC/0YDQvtC40LfQstC10LTQtdC90LjQtSDQstC40LTQtdC+INC/0YDQtdC60YDQsNGJ0LXQvdC+INC40Lct0LfQsCDQuNGB0LrQsNC20LXQvdC40Lkg0L/RgNC4INC/0LXRgNC10LTQsNGH0LUg0LjQu9C4INC/0L7RgtC+0LzRgywg0YfRgtC+INCy0LjQtNC10L4g0LjRgdC/0L7Qu9GM0LfRg9C10YIg0L3QtdC00L7RgdGC0YPQv9C90YvQtSDQsiDQktCw0YjQtdC8INCx0YDQsNGD0LfQtdGA0LUg0YTRg9C90LrRhtC40LguJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgICBjYXNlIGUudGFyZ2V0LmVycm9yLk1FRElBX0VSUl9TUkNfTk9UX1NVUFBPUlRFRDpcclxuICAgICAgIGFsZXJ0KCfQktC40LTQtdC+INC90LUg0LzQvtC20LXRgiDQsdGL0YLRjCDQt9Cw0LPRgNGD0LbQtdC90L4g0LjQty3Qt9CwINGB0LHQvtGPINCyINCyINC00L7RgdGC0YPQv9C1INC6INGB0LXRgNCy0LXRgNGDINC40LvQuCDRjdGC0L7RgiDQstC40LTQtdC+0YTQvtGA0LzQsNGCINC90LUg0L/QvtC00LTQtdGA0LbQuNCy0LDQtdGC0YHRjyDQktCw0YjQuNC8INCx0YDQsNGD0LfQtdGA0L7QvC4nKTtcclxuICAgICAgIGJyZWFrO1xyXG4gICAgIGRlZmF1bHQ6XHJcbiAgICAgICBhbGVydCgn0J/RgNC+0LjQt9C+0YjQu9CwINC+0YjQuNCx0LrQsC4g0J/QvtC/0YDQvtCx0YPQudGC0LUg0LXRidC1LicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgIH1cclxuIH1cclxuKi8iLCIndXNlIHN0cmljdCdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgJ2NvbnRhaW5zJzogZnVuY3Rpb24oZWwsIGNscykge1xyXG4gICAgICAgIGlmKGVsLmNsYXNzTGlzdCkgcmV0dXJuIGVsLmNsYXNzTGlzdC5jb250YWlucyhjbHMpXHJcbiAgICAgICAgdmFyIGFyciA9IGVsLmdldEF0dHJpYnV0ZSgnY2xhc3MnKS5zcGxpdCgnICcpXHJcbiAgICAgICAgZm9yKHZhciBpPTA7IGk8YXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoYXJyW2ldID09IGNscykgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9LFxyXG4gICAgJ2FkZCc6IGZ1bmN0aW9uKGVsLCBjbHMpIHtcclxuICAgICAgICBpZihlbC5jbGFzc0xpc3QpIHtcclxuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChjbHMpXHJcbiAgICAgICAgICAgIHJldHVybiBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXdpbmRvdy52aWV3ZXJTdGF0ZS5jbGFzc0xpc3QuY29udGFpbnMoZWwsIGNscykpe1xyXG4gICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgZWwuZ2V0QXR0cmlidXRlKCdjbGFzcycpICsgJyAnICsgY2xzKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAncmVtb3ZlJzogZnVuY3Rpb24oZWwsIGNscykge1xyXG4gICAgICAgIGlmKGVsLmNsYXNzTGlzdCkge1xyXG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNscylcclxuICAgICAgICAgICAgcmV0dXJuIFxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgdmFyIGFyciA9IGVsLmdldEF0dHJpYnV0ZSgnY2xhc3MnKS5zcGxpdCgnICcpXHJcbiAgICAgICAgdmFyIHJlcyA9ICcnXHJcbiAgICAgICAgZm9yKHZhciBpPTA7IGk8YXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoYXJyW2ldICE9IGNscykge1xyXG4gICAgICAgICAgICAgICAgcmVzICs9IGFycltpXSArICcgJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCByZXMpXHJcbiAgICB9XHJcbn0iLCIndXNlIHN0cmljdCdcblxudmFyICRib3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJGJveCxcbiAgICAkYnRuRnVsbFNjck9uID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5GdWxsU2NyT24sXG4gICAgJGJ0bkZ1bGxTY3JPZmYgPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0bkZ1bGxTY3JPZmYsXG4gICAgJGJ0bk1lbnVPZmYgPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0bk1lbnVPZmYsXG4gICAgJGJ0bk1lbnVPbiA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuTWVudU9uLFxuICAgICRzaWRlTWVudUJveCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc2lkZU1lbnVCb3gsXG4gICAgJGNvbnRyb2wgPSB3aW5kb3cudmlld2VyU3RhdGUuJGNvbnRyb2wsXG4gICAgJHN2Z0Z1bGxTY3JPbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fX2Z1bGxzY3Iub24nKSxcbiAgICBkdXJhdGlvbkN0cmxWaXNpYmxlID0gd2luZG93LnZpZXdlclN0YXRlLmR1cmF0aW9uQ3RybFZpc2libGUsXG4gICAgY2xhc3NMaXN0ID0gd2luZG93LnZpZXdlclN0YXRlLmNsYXNzTGlzdCxcbiAgICBpZCA9IHVuZGVmaW5lZFxuXG5pZiAoIHdpbmRvdy52aWV3ZXJTdGF0ZS5pc0Z1bGxTY3JlZW5BbGxvd2VkICkge1xuICAkYnRuTWVudU9mZi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICRidG5NZW51T24uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAkYnRuRnVsbFNjck9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZ29GdWxsU2NyZWVuKVxuICAkYnRuRnVsbFNjck9mZi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGdldE9mZkZ1bGxzY3JlZW4pXG59IGVsc2UgaWYgKHdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZSAmJlxuICAgICAgICAgICAhd2luZG93LnZpZXdlclN0YXRlLmlzX2lQYWRfaVBob25lX2luRnVsbFNjcmVlbikge1xuICAkYnRuRnVsbFNjck9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIGFsZXJ0KCfQp9GC0L7QsdGLINC+0LHRgNC10YHRgtC4INC/0L7Qu9C90L7RjdC60YDQsNC90L3Ri9C5INGA0LXQttC40Lwg0L3QsNC00L4g0YHQtNC10LvQsNGC0Ywg0LLRgdC10LPQviDQvdC10YHQutC+0LvRjNC60L4g0YjQsNCz0L7QsjpcXG4nXG4gICAgICAgICsgJ9Co0LDQsyAxLiDQndCw0LbQvNC40YLQtSDQvdCwINC60L3QvtC/0LrRgyBcItCe0YLQv9GA0LDQstC40YLRjFwiICjQstGL0LPQu9GP0LTQuNGCINC60LDQuiDQutCy0LDQtNGA0LDRgiDRgdC+INGB0YLRgNC10LvQvtGH0LrQvtC5INCy0LLQtdGA0YUpINGB0L/RgNCw0LLQsCDQstCy0LXRgNGF0YMg0Y3QutGA0LDQvdCwINC4INCy0YvQsdC10YDQuNGC0LUg0L/Rg9C90LrRgjog0J3QsCDRjdC60YDQsNC9IMKr0JTQvtC80L7QucK7LlxcbidcbiAgICAgICAgKyAn0KjQsNCzIDIuINCj0LrQsNC20LjRgtC1INC20LXQu9Cw0LXQvNC+0LUg0L3QsNC30LLQsNC90LjQtSDQuCDQvdCw0LbQvNC40YLQtSBcItCU0L7QsdCw0LLQuNGC0YxcIi5cXG4nXG4gICAgICAgICsgJ9Cf0L7RgdC70LUg0L3QsNC20LDRgtC40Y8g0LrQvdC+0L/QutC4IFwi0JTQvtCx0LDQstC40YLRjFwiINCS0LDRgSDQv9C10YDQtdCx0YDQvtGB0LjRgiDQvdCwINGA0LDQsdC+0YfQuNC5INGB0YLQvtC7LCDQs9C00LUg0JLRiyDRgdC80L7QttC10YLQtSDRg9Cy0LjQtNC10YLRjCDRgdCy0LXQttC10YHQvtC30LTQsNC90L3Rg9GOINGB0YHRi9C70LrRgy5cXG4nXG4gICAgICAgICsgJ9CX0LDQudC00Y8g0L3QsCDRgdCw0LnRgiDQvdCw0LbQsNGC0LjQtdC8INC90LAg0Y3RgtGDINGB0YHRi9C70LrRgyDQktGLINCy0YHQtdCz0LTQsCDQsdGD0LTQtdGC0LUg0YHQvNC+0YLRgNC10YLRjCDQotCSINCyINC/0L7Qu9C90L7RjdC60YDQsNC90L3QvtC8INGA0LXQttC40LzQtS5cXG4nXG4gICAgICAgICsgJ9CU0LvRjyDRg9C00LDQu9C10L3QuNGPINGB0YHRi9C70LrQuCDQvdGD0LbQvdC+INC10LUg0L3QsNC20LDRgtGMINC4INC/0L7QtNC10YDQttCw0YLRjCwg0LfQsNGC0LXQvCDQvdCw0LbQsNGC0Ywg0L/QvtGP0LLQuNCy0YjQuNC50YHRjyDQutGA0LXRgdGC0LjQuiDQsiDQu9C10LLQvtC8INCy0LXRgNGF0L3QtdC8INGD0LPQu9GDLicpXG4gICAgfSlcbiAgICBjbGFzc0xpc3QuYWRkKCRzdmdGdWxsU2NyT24sICdkaXNhYmxlZCcpXG4gICAgJGJ0bkZ1bGxTY3JPZmYuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICRidG5NZW51T2ZmLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RhcnRXYXRjaE1vZGUpXG4gICAgJGJ0bk1lbnVPbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxlYXZlV2F0Y2hNb2RlKVxufSBlbHNlIGlmICh3aW5kb3cudmlld2VyU3RhdGUuaXNfaVBhZF9pUGhvbmVfaW5GdWxsU2NyZWVuIHx8XG4gICAgICAgICAgICF3aW5kb3cudmlld2VyU3RhdGUuaXNGdWxsU2NyZWVuQWxsb3dlZCkge1xuICAgICRidG5GdWxsU2NyT24uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICRidG5GdWxsU2NyT2ZmLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAkYnRuTWVudU9mZi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0V2F0Y2hNb2RlKVxuICAgICRidG5NZW51T24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsZWF2ZVdhdGNoTW9kZSlcbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZ1bGxzY3JlZW5jaGFuZ2VcIiwgZnNIYW5kbGVyKVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2VcIiwgZnNIYW5kbGVyKVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vemZ1bGxzY3JlZW5jaGFuZ2VcIiwgZnNIYW5kbGVyKVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIk1TRnVsbHNjcmVlbkNoYW5nZVwiLCBmc0hhbmRsZXIpXG5cbmZ1bmN0aW9uIGZzSGFuZGxlcigpIHtcbiAgICBpZih3aW5kb3cudmlld2VyU3RhdGUuYXNrJGJveEluRnVsbFNjcmVlbigpKXtcbiAgICAgICAgc3RhcnRXYXRjaE1vZGUoKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGxlYXZlV2F0Y2hNb2RlKClcbiAgICB9XG59XG5mdW5jdGlvbiBnb0Z1bGxTY3JlZW4oKSB7XG4gICAgaWYgKCRib3gucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgJGJveC5yZXF1ZXN0RnVsbHNjcmVlbigpXG4gICAgfSBlbHNlIGlmICgkYm94Lm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XG4gICAgICAgICRib3gubW96UmVxdWVzdEZ1bGxTY3JlZW4oKVxuICAgIH0gZWxzZSBpZiAoJGJveC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAkYm94LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKClcbiAgICB9IGVsc2UgaWYgKCRib3gubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAkYm94Lm1zUmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgIH1cbn1cbmZ1bmN0aW9uIGdldE9mZkZ1bGxzY3JlZW4oKSB7XG4gIGlmKGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKSB7XG4gICAgZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKTtcbiAgfSBlbHNlIGlmKGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICBkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKCk7XG4gIH0gZWxzZSBpZihkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbikge1xuICAgIGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XG4gIH1lbHNlIGlmIChkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKSB7XG5cdGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4oKTtcbiAgfVxufVxuZnVuY3Rpb24gc3RhcnRXYXRjaE1vZGUoZSkge1xuICAgIGNsYXNzTGlzdC5hZGQoJHNpZGVNZW51Qm94LCAnaGlkZV9tZW51JylcbiAgICAkYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2NyZWVuQ2xpY2tIYW5kbGVyKVxuICAgICRjb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29udHJvbENsaWNrSGFuZGxlcilcbn1cbmZ1bmN0aW9uIGxlYXZlV2F0Y2hNb2RlKGUpIHtcbiAgICBjbGVhclRpbWVvdXQoaWQpXG4gICAgY2xhc3NMaXN0LnJlbW92ZSgkY29udHJvbCwgJ3Nob3dfY29udHJvbCcpXG4gICAgJGNvbnRyb2wucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjb250cm9sQ2xpY2tIYW5kbGVyKVxuICAgICRib3gucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY3JlZW5DbGlja0hhbmRsZXIpXG4gICAgY2xhc3NMaXN0LnJlbW92ZSgkc2lkZU1lbnVCb3gsICdoaWRlX21lbnUnKVxufVxuZnVuY3Rpb24gc2NyZWVuQ2xpY2tIYW5kbGVyKGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgJGJveC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcmVlbkNsaWNrSGFuZGxlcilcbiAgICBjbGFzc0xpc3QuYWRkKCRjb250cm9sLCAnc2hvd19jb250cm9sJylcbiAgICBpZCA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgkY29udHJvbCwgJ3Nob3dfY29udHJvbCcpXG4gICAgICAgICAgICAgJGJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcmVlbkNsaWNrSGFuZGxlcilcbiAgICAgICAgIH0gLCBkdXJhdGlvbkN0cmxWaXNpYmxlKVxufVxuZnVuY3Rpb24gY29udHJvbENsaWNrSGFuZGxlcihlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgIGNsZWFyVGltZW91dChpZClcbiAgICBpZCA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgkY29udHJvbCwgJ3Nob3dfY29udHJvbCcpXG4gICAgICAgICAgICAgJGJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcmVlbkNsaWNrSGFuZGxlcilcbiAgICAgICAgIH0gLCBkdXJhdGlvbkN0cmxWaXNpYmxlKVxufVxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZSA9IHtcclxuICAgICckYm94JzogICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJveCcpLFxyXG4gICAgJyR2aWRlbyc6ICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW8nKSxcclxuICAgICckc291cmNlJzogICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNvdXJjZScpLFxyXG4gICAgJyRzaWRlTWVudUJveCc6ICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpLFxyXG4gICAgJyRzbGlkZXInOiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcl9fc2xpZGVyJyksXHJcbiAgICAnJGZvb3Rlcic6ICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXInKSxcclxuICAgICckY29udHJvbCc6ICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2wnKSxcclxuICAgICckYnRuUGxheUZvb3Rlcic6ICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3RlciAuYnRuX3BsYXknKSxcclxuICAgICckYnRuUGxheUN0cmwnOiAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2wgLmJ0bl9wbGF5JyksXHJcbiAgICAnJGJ0blZvbHVtZUZvb3Rlcic6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXIgLmJ0bl92b2x1bWUnKSxcclxuICAgICckYnRuVm9sdW1lQ3RybCc6ICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2wgLmJ0bl92b2x1bWUnKSxcclxuICAgICckYnRuUXVhbGl0eSc6ICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9xdWFsaXR5JyksXHJcbiAgICAnJGJ0blNjYWxlJzogICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY2FsZV9ib3hfX2J0bicpLFxyXG4gICAgJyRzdWJCdG5VcCc6ICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NhbGVfYm94X19zdWJidG5fdXAnKSxcclxuICAgICckc3ViQnRuRG93bic6ICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjYWxlX2JveF9fc3ViYnRuX2Rvd24nKSxcclxuICAgICckYnRuTWVudU9mZic6ICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3RlciAuYnRuX19tZW51X3N3aXRjaCcpLFxyXG4gICAgJyRidG5NZW51T24nOiAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbCAuYnRuX19tZW51X3N3aXRjaCcpLFxyXG4gICAgJyRidG5GdWxsU2NyT24nOiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyIC5idG5fX2Z1bGxzY3InKSxcclxuICAgICckYnRuRnVsbFNjck9mZic6ICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2wgLmJ0bl9fZnVsbHNjcicpLFxyXG4gICAgJ2FjdGl2ZSRpbnB1dCc6IG51bGwsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgb2JqZWN0XHJcbiAgICAnaXNWaWRlb1dvcmtpbmcnOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBib29sZWFuXHJcbiAgICAnaXNGdWxsU2NyZWVuQWxsb3dlZCc6IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBib29sZWFuXHJcbiAgICAnaXNfaVBhZF9pUGhvbmUnOiAvKGlQaG9uZXxpUG9kfGlQYWQpLipBcHBsZVdlYktpdC9pLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpLCAgIC8vICBib29sZWFuXHJcbiAgICAnaXNfaVBhZF9pUGhvbmVfaW5GdWxsU2NyZWVuJzogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBib29sZWFuXHJcbiAgICAnYXNrJGJveEluRnVsbFNjcmVlbic6IG51bGwsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBmdW5jdGlvbiAtPiBib29sZWFuXHJcbiAgICAnaGlnaFF1YWxpdHknOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBib29sZWFuXHJcbiAgICAnZHVyYXRpb25TY2FsZVN1Ym1lbnUnOiA0MDAwLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBtc1xyXG4gICAgJ2R1cmF0aW9uQ3RybFZpc2libGUnOiA1MDAwLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgbXNcclxuICAgICdjbGFzc0xpc3QnOiB7XHJcbiAgICAgICAgJ2NvbnRhaW5zJzogbnVsbCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBmdW5jdGlvbiAtPiBib29sZWFuXHJcbiAgICAgICAgJ2FkZCc6IG51bGwsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBmdW5jdGlvbiAtPiB2b2lkXHJcbiAgICAgICAgJ3JlbW92ZSc6IG51bGwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBmdW5jdGlvbiAtPiB2b2lkXHJcbiAgICAgfVxyXG4gIH07XHJcblxyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZS5pc1ZpZGVvV29ya2luZyA9IHJlcXVpcmUoJy4vYXNrVmlkZW9Xb3JraW5nLmpzJylcclxuICB3aW5kb3cudmlld2VyU3RhdGUuaXNGdWxsU2NyZWVuQWxsb3dlZCA9IHJlcXVpcmUoJy4vYXNrRnVsbFNjcmVlbi5qcycpXHJcbiAgd2luZG93LnZpZXdlclN0YXRlLmlzX2lQYWRfaVBob25lX2luRnVsbFNjcmVlbiA9IHJlcXVpcmUoJy4vYXNrX2lQYWRfaVBob25lX0Z1bGxTY3JlZW4uanMnKVxyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZS5hc2skYm94SW5GdWxsU2NyZWVuID0gcmVxdWlyZSgnLi9hc2skYm94SW5GdWxsU2NyZWVuLmpzJylcclxuICB3aW5kb3cudmlld2VyU3RhdGUuY2xhc3NMaXN0ID0gcmVxdWlyZSgnLi9jbGFzc0xpc3QuanMnKVxyXG4gICAgXHJcbiAgcmVxdWlyZSgnLi9zY3JlZW5IZWlnaHQuanMnKVxyXG4gIC8vICAgIEluaXQgY29tcGxldGVkXHJcbiAgcmVxdWlyZSgnLi9jaGFubmVsU2VsZWN0b3IuanMnKVxyXG4gIHJlcXVpcmUoJy4vZnVsbHNjcmVlbk9ySGlkZU1lbnUuanMnKVxyXG4gIHJlcXVpcmUoJy4vYnV0dG9uUXVhbGl0eS5qcycpXHJcbiAgcmVxdWlyZSgnLi9idXR0b25TY2FsZS5qcycpXHJcbiAgcmVxdWlyZSgnLi9idXR0b25QbGF5UGF1c2UuanMnKVxyXG4gIGlmKCF3aW5kb3cudmlld2VyU3RhdGUuaXNfaVBhZF9pUGhvbmUpIHJlcXVpcmUoJy4vYnV0dG9uVm9sdW1lLmpzJylcclxufSIsIid1c2Ugc3RyaWN0J1xyXG5cclxuc2V0Rm9udFNpemUoKVxyXG53aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigncmVzaXplJywgc2V0Rm9udFNpemUpXHJcbmZ1bmN0aW9uIHNldEZvbnRTaXplKCkge1xyXG4gICAgdmFyIGZvbnRTaXplID0gZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQgLyAyMFxyXG4gICAgaWYoZG9jdW1lbnQuYm9keS5jbGllbnRIZWlnaHQgPiBkb2N1bWVudC5ib2R5LmNsaWVudFdpZHRoKSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5mb250U2l6ZSA9IDAuNCAqIGZvbnRTaXplICsgJ3B4J1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmZvbnRTaXplID0gZm9udFNpemUgKyAncHgnXHJcbiAgICB9XHJcbn0iXX0=
