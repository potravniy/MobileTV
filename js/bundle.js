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
    $btnMenuOff = window.viewerState.$btnMenuOff,
    classList = window.viewerState.classList,
    link = ''

$btnQuality.addEventListener('click', toggleQuality)
document.addEventListener("fullscreenchange", styleQualityButton)
document.addEventListener("webkitfullscreenchange", styleQualityButton)
document.addEventListener("mozfullscreenchange", styleQualityButton)
document.addEventListener("MSFullscreenChange", styleQualityButton)
$btnMenuOff.addEventListener('click', styleQualityButton)

function toggleQuality(){
    if (window.viewerState.active$input) {
        if (window.viewerState.highQuality) {
            window.viewerState.highQuality = false
            link = window.viewerState.active$input.getAttribute('data-link-lq')
            $video.setAttribute('src', link)
            $source.setAttribute('src', link)
            $video.play()
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
function styleQualityButton() {
    if (window.viewerState.highQuality) {
        classList.remove($svgQuality, 'disabled')
    } else {
        classList.add($svgQuality, 'disabled')
    }
}
},{}],7:[function(require,module,exports){
'use strict'

var $box = window.viewerState.$box,
    $video = window.viewerState.$video,
    $boxScale = document.querySelector('scale_box'),
    $btnScale = window.viewerState.$btnScale,
    $svgScale = document.querySelector('.scale_box__btn_icon'),
    $btnScaleSubBtnsBox = document.querySelector('.scale_box__subbtns'),
    $subBtnUp = window.viewerState.$subBtnUp,
    $subBtnDown = window.viewerState.$subBtnDown,
    $subBtnUpIcon = document.querySelector('.subbtn_up'),
    $subBtnDownIcon = document.querySelector('.subbtn_down'),
    $btnMenuOff = window.viewerState.$btnMenuOff,
    $btnMenuOn = window.viewerState.$btnMenuOn,
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
$btnMenuOn.addEventListener('click', stopScaling)
document.addEventListener('fullscreenchange', fullScreenChange)
document.addEventListener('webkitfullscreenchange', fullScreenChange)
document.addEventListener('mozfullscreenchange', fullScreenChange)
document.addEventListener('MSFullscreenChange', fullScreenChange)
$video.addEventListener('error', function () {
    clearTimeout(id)
    stopScaling()
})
function fullScreenChange() {
    if(window.viewerState.ask$boxInFullScreen()){
        scaleRestart()
    } else {
        stopScaling()
    }
}
function scaleRestart() {
    stopScaling()
    clearTimeout(id)
    id = setTimeout(startScaling, 2000)
}
function startScaling() {
    ratio = $box.clientWidth / $video.offsetWidth
    if (ratio < 1) {
        min$videoHeight = 100 * ratio   //  %
        nMin = Math.floor((min$videoHeight - 100) / 14)
        nMax = 0
        n = 0
        step = (min$videoHeight - 100) / nMin
        classList.add($subBtnUpIcon, 'disabled')
        classList.remove($subBtnDownIcon, 'disabled')
        setListeners()
    } else if (ratio > 1) {
        max$videoHeight = 100 * ratio   //  %
        nMax = Math.ceil((max$videoHeight - 100) / 14)
        nMin = 0
        n = 0
        step = (max$videoHeight - 100) / nMax
        classList.remove($subBtnUpIcon, 'disabled')
        classList.add($subBtnDownIcon, 'disabled')
        setListeners()
    } else if (ratio === 1) {
        nMax = 0
        nMin = 0
        n = 0
    }
    console.log('startScaling: '
    + '\n nMin: ' + nMin
    + '\n nMax: ' + nMax
    + '\n n:    ' + n)
}
function setListeners() {
    $btnScale.addEventListener('click', btnScaleHandler) 
    $subBtnUp.addEventListener('click', subBtnUpHandler) 
    $subBtnDown.addEventListener('click', subBtnDownHandler)
    enableMainIcon()
}
function stopScaling() {
    hideSubMenuBox()
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
        console.log('subBtnUpHandler: '
        + '\n nMin: ' + nMin
        + '\n nMax: ' + nMax
        + '\n n:    ' + n)
    }
}
function subBtnDownHandler(){
    if(n > nMin) {
        $video.style.height = 100 + --n * step + '%'
        if(n === nMin) classList.add($subBtnDownIcon, 'disabled')
        if(n === (nMax - 1)) classList.remove($subBtnUpIcon, 'disabled')
        clearTimeout(activeID)
        activeID = setTimeout(hideSubMenuBox, window.viewerState.durationScaleSubmenu)
        console.log('subBtnDownHandler: '
        + '\n nMin: ' + nMin
        + '\n nMax: ' + nMax
        + '\n n:    ' + n)
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
            $video.removeEventListener('error', failed)
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
            $video.addEventListener('error', failed)
        }
    }
})

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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2EwNS9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hc2skYm94SW5GdWxsU2NyZWVuLmpzIiwianMvYXNrRnVsbFNjcmVlbi5qcyIsImpzL2Fza1ZpZGVvV29ya2luZy5qcyIsImpzL2Fza19pUGFkX2lQaG9uZV9GdWxsU2NyZWVuLmpzIiwianMvYnV0dG9uUGxheVBhdXNlLmpzIiwianMvYnV0dG9uUXVhbGl0eS5qcyIsImpzL2J1dHRvblNjYWxlLmpzIiwianMvYnV0dG9uVm9sdW1lLmpzIiwianMvY2hhbm5lbFNlbGVjdG9yLmpzIiwianMvY2xhc3NMaXN0LmpzIiwianMvZnVsbHNjcmVlbk9ySGlkZU1lbnUuanMiLCJqcy9tYWluLmpzIiwianMvc2NyZWVuSGVpZ2h0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDekNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDOUlBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZGQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDeEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNyREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIGlmIChkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCB8fCBcclxuICAgICAgICBkb2N1bWVudC53ZWJraXRGdWxsc2NyZWVuRWxlbWVudCB8fFxyXG4gICAgICAgIGRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbGVtZW50IHx8XHJcbiAgICAgICAgZG9jdW1lbnQubXNGdWxsc2NyZWVuRWxlbWVudCB8fFxyXG4gICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZV9pbkZ1bGxTY3JlZW4gKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSByZXR1cm4gZmFsc2VcclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciAkYm94ID0gd2luZG93LnZpZXdlclN0YXRlLiRib3hcclxuICAgIGlmICgkYm94LnJlcXVlc3RGdWxsc2NyZWVuIHx8XHJcbiAgICAgICAgJGJveC5tb3pSZXF1ZXN0RnVsbFNjcmVlbiB8fFxyXG4gICAgICAgICRib3gud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4gfHxcclxuICAgICAgICAkYm94Lm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZSBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlIFxyXG4gICAgfVxyXG59KSgpXHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgaWYodHlwZW9mIHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8ucGxheSA9PT0gJ2Z1bmN0aW9uJyApIHtcclxuICAgICAgICBjb25zb2xlLmxvZygndmlkZW8gb2sgbmVlZHMgdG8gYmUgY29uZmlybWVkJylcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjb25zb2xlLmxvZygnbm8gdmlkZW8nKVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfVxyXG59KSgpXHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICBpZih3aW5kb3cudmlld2VyU3RhdGUuaXNfaVBhZF9pUGhvbmUgJiYgd2luZG93LmlubmVySGVpZ2h0ID49IHdpbmRvdy5zY3JlZW4uYXZhaWxIZWlnaHQpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSBlbHNlIHJldHVybiBmYWxzZVxyXG59KSgpXHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8sXHJcbiAgICAkYnRuUGxheUZvb3RlciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuUGxheUZvb3RlcixcclxuICAgICRidG5QbGF5Q3RybCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuUGxheUN0cmwsXHJcbiAgICAkc3ZnUGxheUZvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXIgLmJ0bl9wbGF5X19pY29uX3BsYXknKSxcclxuICAgICRzdmdQbGF5Q3RybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sIC5idG5fcGxheV9faWNvbl9wbGF5JyksXHJcbiAgICAkc3ZnUGF1c2VGb290ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyIC5idG5fcGxheV9faWNvbl9wYXVzZScpLFxyXG4gICAgJHN2Z1BhdXNlQ3RybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sIC5idG5fcGxheV9faWNvbl9wYXVzZScpLFxyXG4gICAgY2xhc3NMaXN0ID0gd2luZG93LnZpZXdlclN0YXRlLmNsYXNzTGlzdFxyXG5cclxuaWYgKCR2aWRlby5wYXVzZWQpe1xyXG4gICAgc2V0SWNvbnNQbGF5KClcclxufSBlbHNlIHtcclxuICAgIHNldEljb25zUGF1c2UoKVxyXG59IFxyXG4kYnRuUGxheUZvb3Rlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZVBsYXlQYXVzZSlcclxuJGJ0blBsYXlDdHJsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlUGxheVBhdXNlKVxyXG4kdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGxheScsIHNldEljb25zUGF1c2UoKSlcclxuJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BhdXNlJywgc2V0SWNvbnNQbGF5KCkpXHJcbiR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG59KVxyXG5mdW5jdGlvbiB0b2dnbGVQbGF5UGF1c2UoKXtcclxuICAgIGlmICgkdmlkZW8ucGF1c2VkKSAkdmlkZW8ucGxheSgpIFxyXG4gICAgZWxzZSAkdmlkZW8ucGF1c2UoKVxyXG59XHJcbmZ1bmN0aW9uIHNldEljb25zUGxheSgpIHtcclxuICAgIGNsYXNzTGlzdC5hZGQoJHN2Z1BsYXlGb290ZXIsIFwiYWN0aXZlXCIpXHJcbiAgICBjbGFzc0xpc3QuYWRkKCRzdmdQbGF5Q3RybCwgXCJhY3RpdmVcIilcclxuICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z1BhdXNlRm9vdGVyLCBcImFjdGl2ZVwiKVxyXG4gICAgY2xhc3NMaXN0LnJlbW92ZSgkc3ZnUGF1c2VDdHJsLCBcImFjdGl2ZVwiKVxyXG59XHJcbmZ1bmN0aW9uIHNldEljb25zUGF1c2UoKSB7XHJcbiAgICBjbGFzc0xpc3QuYWRkKCRzdmdQYXVzZUZvb3RlciwgXCJhY3RpdmVcIilcclxuICAgIGNsYXNzTGlzdC5hZGQoJHN2Z1BhdXNlQ3RybCwgXCJhY3RpdmVcIilcclxuICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z1BsYXlGb290ZXIsIFwiYWN0aXZlXCIpXHJcbiAgICBjbGFzc0xpc3QucmVtb3ZlKCRzdmdQbGF5Q3RybCwgXCJhY3RpdmVcIilcclxufSIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyICRidG5RdWFsaXR5ID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5RdWFsaXR5LFxyXG4gICAgJHN2Z1F1YWxpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX3F1YWxpdHlfX2ljb24nKSxcclxuICAgICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8sXHJcbiAgICAkc291cmNlID0gd2luZG93LnZpZXdlclN0YXRlLiRzb3VyY2UsXHJcbiAgICAkYnRuTWVudU9mZiA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuTWVudU9mZixcclxuICAgIGNsYXNzTGlzdCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5jbGFzc0xpc3QsXHJcbiAgICBsaW5rID0gJydcclxuXHJcbiRidG5RdWFsaXR5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlUXVhbGl0eSlcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZ1bGxzY3JlZW5jaGFuZ2VcIiwgc3R5bGVRdWFsaXR5QnV0dG9uKVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwid2Via2l0ZnVsbHNjcmVlbmNoYW5nZVwiLCBzdHlsZVF1YWxpdHlCdXR0b24pXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3pmdWxsc2NyZWVuY2hhbmdlXCIsIHN0eWxlUXVhbGl0eUJ1dHRvbilcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIk1TRnVsbHNjcmVlbkNoYW5nZVwiLCBzdHlsZVF1YWxpdHlCdXR0b24pXHJcbiRidG5NZW51T2ZmLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3R5bGVRdWFsaXR5QnV0dG9uKVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlUXVhbGl0eSgpe1xyXG4gICAgaWYgKHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQpIHtcclxuICAgICAgICBpZiAod2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSA9IGZhbHNlXHJcbiAgICAgICAgICAgIGxpbmsgPSB3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0LmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWxxJylcclxuICAgICAgICAgICAgJHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgICAgICAgJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgICAgICAgICR2aWRlby5wbGF5KClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkgPSB0cnVlXHJcbiAgICAgICAgICAgIGxpbmsgPSB3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0LmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWhxJylcclxuICAgICAgICAgICAgJHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgICAgICAgJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgICAgICAgICR2aWRlby5wbGF5KClcclxuICAgICAgICB9XHJcbiAgICAgICAgc3R5bGVRdWFsaXR5QnV0dG9uKClcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBzdHlsZVF1YWxpdHlCdXR0b24oKSB7XHJcbiAgICBpZiAod2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5KSB7XHJcbiAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgkc3ZnUXVhbGl0eSwgJ2Rpc2FibGVkJylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgkc3ZnUXVhbGl0eSwgJ2Rpc2FibGVkJylcclxuICAgIH1cclxufSIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyICRib3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJGJveCxcclxuICAgICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8sXHJcbiAgICAkYm94U2NhbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdzY2FsZV9ib3gnKSxcclxuICAgICRidG5TY2FsZSA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuU2NhbGUsXHJcbiAgICAkc3ZnU2NhbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NhbGVfYm94X19idG5faWNvbicpLFxyXG4gICAgJGJ0blNjYWxlU3ViQnRuc0JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY2FsZV9ib3hfX3N1YmJ0bnMnKSxcclxuICAgICRzdWJCdG5VcCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc3ViQnRuVXAsXHJcbiAgICAkc3ViQnRuRG93biA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc3ViQnRuRG93bixcclxuICAgICRzdWJCdG5VcEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3ViYnRuX3VwJyksXHJcbiAgICAkc3ViQnRuRG93bkljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3ViYnRuX2Rvd24nKSxcclxuICAgICRidG5NZW51T2ZmID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5NZW51T2ZmLFxyXG4gICAgJGJ0bk1lbnVPbiA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuTWVudU9uLFxyXG4gICAgY2xhc3NMaXN0ID0gd2luZG93LnZpZXdlclN0YXRlLmNsYXNzTGlzdCxcclxuICAgIHJhdGlvID0gdW5kZWZpbmVkLFxyXG4gICAgbWF4JHZpZGVvSGVpZ2h0ID0gdW5kZWZpbmVkLFxyXG4gICAgbWluJHZpZGVvSGVpZ2h0ID0gdW5kZWZpbmVkLFxyXG4gICAgc3RlcCA9IHVuZGVmaW5lZCxcclxuICAgIG4gPSB1bmRlZmluZWQsXHJcbiAgICBuTWF4ID0gMCxcclxuICAgIG5NaW4gPSAwLFxyXG4gICAgaWQgPSB1bmRlZmluZWQsXHJcbiAgICBhY3RpdmVJRCA9IHVuZGVmaW5lZFxyXG5cclxuZGlzYWJsZU1haW5JY29uKClcclxuXHJcbiRidG5NZW51T2ZmLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2NhbGVSZXN0YXJ0KVxyXG4kYnRuTWVudU9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RvcFNjYWxpbmcpXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Z1bGxzY3JlZW5jaGFuZ2UnLCBmdWxsU2NyZWVuQ2hhbmdlKVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJywgZnVsbFNjcmVlbkNoYW5nZSlcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW96ZnVsbHNjcmVlbmNoYW5nZScsIGZ1bGxTY3JlZW5DaGFuZ2UpXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ01TRnVsbHNjcmVlbkNoYW5nZScsIGZ1bGxTY3JlZW5DaGFuZ2UpXHJcbiR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNsZWFyVGltZW91dChpZClcclxuICAgIHN0b3BTY2FsaW5nKClcclxufSlcclxuZnVuY3Rpb24gZnVsbFNjcmVlbkNoYW5nZSgpIHtcclxuICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5hc2skYm94SW5GdWxsU2NyZWVuKCkpe1xyXG4gICAgICAgIHNjYWxlUmVzdGFydCgpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHN0b3BTY2FsaW5nKClcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBzY2FsZVJlc3RhcnQoKSB7XHJcbiAgICBzdG9wU2NhbGluZygpXHJcbiAgICBjbGVhclRpbWVvdXQoaWQpXHJcbiAgICBpZCA9IHNldFRpbWVvdXQoc3RhcnRTY2FsaW5nLCAyMDAwKVxyXG59XHJcbmZ1bmN0aW9uIHN0YXJ0U2NhbGluZygpIHtcclxuICAgIHJhdGlvID0gJGJveC5jbGllbnRXaWR0aCAvICR2aWRlby5vZmZzZXRXaWR0aFxyXG4gICAgaWYgKHJhdGlvIDwgMSkge1xyXG4gICAgICAgIG1pbiR2aWRlb0hlaWdodCA9IDEwMCAqIHJhdGlvICAgLy8gICVcclxuICAgICAgICBuTWluID0gTWF0aC5mbG9vcigobWluJHZpZGVvSGVpZ2h0IC0gMTAwKSAvIDE0KVxyXG4gICAgICAgIG5NYXggPSAwXHJcbiAgICAgICAgbiA9IDBcclxuICAgICAgICBzdGVwID0gKG1pbiR2aWRlb0hlaWdodCAtIDEwMCkgLyBuTWluXHJcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgkc3ViQnRuVXBJY29uLCAnZGlzYWJsZWQnKVxyXG4gICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN1YkJ0bkRvd25JY29uLCAnZGlzYWJsZWQnKVxyXG4gICAgICAgIHNldExpc3RlbmVycygpXHJcbiAgICB9IGVsc2UgaWYgKHJhdGlvID4gMSkge1xyXG4gICAgICAgIG1heCR2aWRlb0hlaWdodCA9IDEwMCAqIHJhdGlvICAgLy8gICVcclxuICAgICAgICBuTWF4ID0gTWF0aC5jZWlsKChtYXgkdmlkZW9IZWlnaHQgLSAxMDApIC8gMTQpXHJcbiAgICAgICAgbk1pbiA9IDBcclxuICAgICAgICBuID0gMFxyXG4gICAgICAgIHN0ZXAgPSAobWF4JHZpZGVvSGVpZ2h0IC0gMTAwKSAvIG5NYXhcclxuICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRzdWJCdG5VcEljb24sICdkaXNhYmxlZCcpXHJcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgkc3ViQnRuRG93bkljb24sICdkaXNhYmxlZCcpXHJcbiAgICAgICAgc2V0TGlzdGVuZXJzKClcclxuICAgIH0gZWxzZSBpZiAocmF0aW8gPT09IDEpIHtcclxuICAgICAgICBuTWF4ID0gMFxyXG4gICAgICAgIG5NaW4gPSAwXHJcbiAgICAgICAgbiA9IDBcclxuICAgIH1cclxuICAgIGNvbnNvbGUubG9nKCdzdGFydFNjYWxpbmc6ICdcclxuICAgICsgJ1xcbiBuTWluOiAnICsgbk1pblxyXG4gICAgKyAnXFxuIG5NYXg6ICcgKyBuTWF4XHJcbiAgICArICdcXG4gbjogICAgJyArIG4pXHJcbn1cclxuZnVuY3Rpb24gc2V0TGlzdGVuZXJzKCkge1xyXG4gICAgJGJ0blNjYWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYnRuU2NhbGVIYW5kbGVyKSBcclxuICAgICRzdWJCdG5VcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN1YkJ0blVwSGFuZGxlcikgXHJcbiAgICAkc3ViQnRuRG93bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN1YkJ0bkRvd25IYW5kbGVyKVxyXG4gICAgZW5hYmxlTWFpbkljb24oKVxyXG59XHJcbmZ1bmN0aW9uIHN0b3BTY2FsaW5nKCkge1xyXG4gICAgaGlkZVN1Yk1lbnVCb3goKVxyXG4gICAgcmF0aW8gPSB1bmRlZmluZWRcclxuICAgIG1heCR2aWRlb0hlaWdodCA9IHVuZGVmaW5lZFxyXG4gICAgc3RlcCA9IHVuZGVmaW5lZFxyXG4gICAgbiA9IHVuZGVmaW5lZFxyXG4gICAgJHZpZGVvLnN0eWxlLmhlaWdodCA9ICcnXHJcbiAgICAkYnRuU2NhbGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBidG5TY2FsZUhhbmRsZXIpIFxyXG4gICAgJHN1YkJ0blVwLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3ViQnRuVXBIYW5kbGVyKSBcclxuICAgICRzdWJCdG5Eb3duLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3ViQnRuRG93bkhhbmRsZXIpXHJcbiAgICBkaXNhYmxlTWFpbkljb24oKVxyXG59XHJcbmZ1bmN0aW9uIGJ0blNjYWxlSGFuZGxlcihlKXtcclxuICAgIGlmKGUudGFyZ2V0ID09PSAkYnRuU2NhbGUgfHwgZS50YXJnZXQgPT09ICRzdmdTY2FsZSkge1xyXG4gICAgICAgIGlmKGNsYXNzTGlzdC5jb250YWlucygkYnRuU2NhbGVTdWJCdG5zQm94LCAnYWN0aXZlJykpe1xyXG4gICAgICAgICAgICBoaWRlU3ViTWVudUJveCgpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2xhc3NMaXN0LmFkZCgkYnRuU2NhbGVTdWJCdG5zQm94LCAnYWN0aXZlJylcclxuICAgICAgICAgICAgYWN0aXZlSUQgPSBzZXRUaW1lb3V0KGhpZGVTdWJNZW51Qm94LCB3aW5kb3cudmlld2VyU3RhdGUuZHVyYXRpb25TY2FsZVN1Ym1lbnUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHN1YkJ0blVwSGFuZGxlcigpe1xyXG4gICAgaWYobiA8IG5NYXgpIHtcclxuICAgICAgICAkdmlkZW8uc3R5bGUuaGVpZ2h0ID0gMTAwICsgKytuICogc3RlcCArICclJ1xyXG4gICAgICAgIGlmKG4gPT09IG5NYXgpIGNsYXNzTGlzdC5hZGQoJHN1YkJ0blVwSWNvbiwgJ2Rpc2FibGVkJylcclxuICAgICAgICBpZihuID09PSAobk1pbiArIDEpKSBjbGFzc0xpc3QucmVtb3ZlKCRzdWJCdG5Eb3duSWNvbiwgJ2Rpc2FibGVkJylcclxuICAgICAgICBjbGVhclRpbWVvdXQoYWN0aXZlSUQpXHJcbiAgICAgICAgYWN0aXZlSUQgPSBzZXRUaW1lb3V0KGhpZGVTdWJNZW51Qm94LCB3aW5kb3cudmlld2VyU3RhdGUuZHVyYXRpb25TY2FsZVN1Ym1lbnUpXHJcbiAgICAgICAgY29uc29sZS5sb2coJ3N1YkJ0blVwSGFuZGxlcjogJ1xyXG4gICAgICAgICsgJ1xcbiBuTWluOiAnICsgbk1pblxyXG4gICAgICAgICsgJ1xcbiBuTWF4OiAnICsgbk1heFxyXG4gICAgICAgICsgJ1xcbiBuOiAgICAnICsgbilcclxuICAgIH1cclxufVxyXG5mdW5jdGlvbiBzdWJCdG5Eb3duSGFuZGxlcigpe1xyXG4gICAgaWYobiA+IG5NaW4pIHtcclxuICAgICAgICAkdmlkZW8uc3R5bGUuaGVpZ2h0ID0gMTAwICsgLS1uICogc3RlcCArICclJ1xyXG4gICAgICAgIGlmKG4gPT09IG5NaW4pIGNsYXNzTGlzdC5hZGQoJHN1YkJ0bkRvd25JY29uLCAnZGlzYWJsZWQnKVxyXG4gICAgICAgIGlmKG4gPT09IChuTWF4IC0gMSkpIGNsYXNzTGlzdC5yZW1vdmUoJHN1YkJ0blVwSWNvbiwgJ2Rpc2FibGVkJylcclxuICAgICAgICBjbGVhclRpbWVvdXQoYWN0aXZlSUQpXHJcbiAgICAgICAgYWN0aXZlSUQgPSBzZXRUaW1lb3V0KGhpZGVTdWJNZW51Qm94LCB3aW5kb3cudmlld2VyU3RhdGUuZHVyYXRpb25TY2FsZVN1Ym1lbnUpXHJcbiAgICAgICAgY29uc29sZS5sb2coJ3N1YkJ0bkRvd25IYW5kbGVyOiAnXHJcbiAgICAgICAgKyAnXFxuIG5NaW46ICcgKyBuTWluXHJcbiAgICAgICAgKyAnXFxuIG5NYXg6ICcgKyBuTWF4XHJcbiAgICAgICAgKyAnXFxuIG46ICAgICcgKyBuKVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIGhpZGVTdWJNZW51Qm94KCkge1xyXG4gICAgY2xhc3NMaXN0LnJlbW92ZSgkYnRuU2NhbGVTdWJCdG5zQm94LCAnYWN0aXZlJylcclxufVxyXG5mdW5jdGlvbiBkaXNhYmxlTWFpbkljb24oKSB7XHJcbiAgICBjbGFzc0xpc3QuYWRkKCRzdmdTY2FsZSwgJ2Rpc2FibGVkJylcclxufVxyXG5mdW5jdGlvbiBlbmFibGVNYWluSWNvbigpIHtcclxuICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z1NjYWxlLCAnZGlzYWJsZWQnKVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8sXHJcbiAgICAkYnRuVm9sdW1lRm9vdGVyID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5Wb2x1bWVGb290ZXIsXHJcbiAgICAkYnRuVm9sdW1lQ3RybCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuVm9sdW1lQ3RybCxcclxuICAgICRzdmdWb2x1bWVPbkZvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXIgLmJ0bl92b2x1bWVfX2ljb25fb24nKSxcclxuICAgICRzdmdWb2x1bWVPbkN0cmwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbCAuYnRuX3ZvbHVtZV9faWNvbl9vbicpLFxyXG4gICAgJHN2Z1ZvbHVtZU9mZkZvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXIgLmJ0bl92b2x1bWVfX2ljb25fb2ZmJyksXHJcbiAgICAkc3ZnVm9sdW1lT2ZmQ3RybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sIC5idG5fdm9sdW1lX19pY29uX29mZicpLFxyXG4gICAgY2xhc3NMaXN0ID0gd2luZG93LnZpZXdlclN0YXRlLmNsYXNzTGlzdFxyXG5cclxuJGJ0blZvbHVtZUZvb3Rlci5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jaydcclxuJGJ0blZvbHVtZUN0cmwuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snXHJcblxyXG4kYnRuVm9sdW1lRm9vdGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbXV0ZSlcclxuJGJ0blZvbHVtZUN0cmwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBtdXRlKVxyXG5cclxuZnVuY3Rpb24gbXV0ZSgpe1xyXG4gICAgaWYgKCR2aWRlby5tdXRlZCl7XHJcbiAgICAgICAgJHZpZGVvLm11dGVkID0gZmFsc2VcclxuICAgICAgICAkdmlkZW8udm9sdW1lID0gMS4wXHJcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgkc3ZnVm9sdW1lT25Gb290ZXIsIFwiYWN0aXZlXCIpXHJcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgkc3ZnVm9sdW1lT25DdHJsLCBcImFjdGl2ZVwiKVxyXG4gICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z1ZvbHVtZU9mZkZvb3RlciwgXCJhY3RpdmVcIilcclxuICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRzdmdWb2x1bWVPZmZDdHJsLCBcImFjdGl2ZVwiKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkdmlkZW8udm9sdW1lID0gMC4wXHJcbiAgICAgICAgJHZpZGVvLm11dGVkID0gdHJ1ZVxyXG4gICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z1ZvbHVtZU9uRm9vdGVyLCBcImFjdGl2ZVwiKVxyXG4gICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z1ZvbHVtZU9uQ3RybCwgXCJhY3RpdmVcIilcclxuICAgICAgICBjbGFzc0xpc3QuYWRkKCRzdmdWb2x1bWVPZmZGb290ZXIsIFwiYWN0aXZlXCIpXHJcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgkc3ZnVm9sdW1lT2ZmQ3RybCwgXCJhY3RpdmVcIilcclxuICAgIH0gXHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCJcclxuXHJcbnZhciAkdmlkZW8gPSB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvLFxyXG4gICAgJHNvdXJjZSA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc291cmNlLFxyXG4gICAgJHNsaWRlciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc2xpZGVyLFxyXG4gICAgJHNpZGVNZW51Qm94ID0gd2luZG93LnZpZXdlclN0YXRlLiRzaWRlTWVudUJveCxcclxuICAgIGNsYXNzTGlzdCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5jbGFzc0xpc3QsXHJcbiAgICBsaW5rID0gJycsXHJcbiAgICAkYnRucyA9IHtcclxuICAgIFwiY2hfMWdvcm9kc2tveVwiOiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF8xZ29yb2Rza295XCIpLFxyXG4gICAgXCJjaF8zdHN5ZnJvdm95XCI6ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoXzN0c3lmcm92b3lcIiksXHJcbiAgICBcImNoX3JlcG9ydGVyXCI6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfcmVwb3J0ZXJcIiksXHJcbiAgICBcImNoX2FjYWRlbWlhXCI6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfYWNhZGVtaWFcIiksXHJcbiAgICBcImNoX2ExXCI6ICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfYTFcIiksXHJcbiAgICBcImNoX2R1bXNrYXlhXCI6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfZHVtc2theWFcIiksXHJcbiAgICBcImNoX2d0dlwiOiAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfZ3R2XCIpLFxyXG4gICAgXCJjaF9zdHZcIjogICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX3N0dlwiKSxcclxuICAgIFwiY2hfdWduYXlhdm9sbmFcIjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF91Z25heWF2b2xuYVwiKSxcclxuICAgIFwiY2hfbmVtb1wiOiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9uZW1vXCIpXHJcbn1cclxuJGJ0bnMuY2hfMWdvcm9kc2tveS5zZXRBdHRyaWJ1dGUoICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxLzF0dm9kLzF0dm9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgICAgKVxyXG4kYnRucy5jaF8zdHN5ZnJvdm95LnNldEF0dHJpYnV0ZSggICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly9jZG41LmxpdmUtdHYub2QudWE6ODA4MS90di8zdHZvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiICApXHJcbiRidG5zLmNoX3JlcG9ydGVyLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovL2NkbjQubGl2ZS10di5vZC51YTo4MDgxL3R2LzMxY2hvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiIClcclxuJGJ0bnMuY2hfYWNhZGVtaWEuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vY2RuNC5saXZlLXR2Lm9kLnVhOjgwODEvdHYvMzZjaG9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgKVxyXG4kYnRucy5jaF9hMS5zZXRBdHRyaWJ1dGUoICAgICAgICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvYTFvZC9hMW9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgICAgICApXHJcbiRidG5zLmNoX2R1bXNrYXlhLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzg6ODA4MS9kdW1za2EvZHVtc2thLWFici1scS9wbGF5bGlzdC5tM3U4XCIgIClcclxuJGJ0bnMuY2hfZ3R2LnNldEF0dHJpYnV0ZSggICAgICAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL2Exb2QvZ3R2b2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICAgKVxyXG4kYnRucy5jaF9zdHYuc2V0QXR0cmlidXRlKCAgICAgICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvc3R2b2Qvc3R2b2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICApXHJcbiRidG5zLmNoX3VnbmF5YXZvbG5hLnNldEF0dHJpYnV0ZSggJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS93YXZlL3dhdmUtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICAgIClcclxuJGJ0bnMuY2hfbmVtby5zZXRBdHRyaWJ1dGUoICAgICAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL25lbW8vbW9yLXN1Yi9wbGF5bGlzdC5tM3U4XCIgICAgICAgICAgKVxyXG5cclxuJGJ0bnMuY2hfMWdvcm9kc2tveS5zZXRBdHRyaWJ1dGUoICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxLzF0dm9kLzF0dm9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgKVxyXG4kYnRucy5jaF8zdHN5ZnJvdm95LnNldEF0dHJpYnV0ZSggICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly9jZG41LmxpdmUtdHYub2QudWE6ODA4MS90di8zdHZvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgICApXHJcbiRidG5zLmNoX3JlcG9ydGVyLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovL2NkbjQubGl2ZS10di5vZC51YTo4MDgxL3R2LzMxY2hvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgIClcclxuJGJ0bnMuY2hfYWNhZGVtaWEuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vY2RuNC5saXZlLXR2Lm9kLnVhOjgwODEvdHYvMzZjaG9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgKVxyXG4kYnRucy5jaF9hMS5zZXRBdHRyaWJ1dGUoICAgICAgICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvYTFvZC9hMW9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgICApXHJcbiRidG5zLmNoX2R1bXNrYXlhLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzg6ODA4MS9kdW1za2EvZHVtc2thLWFici9wbGF5bGlzdC5tM3U4XCIgICAgIClcclxuJGJ0bnMuY2hfZ3R2LnNldEF0dHJpYnV0ZSggICAgICAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL2Exb2QvZ3R2b2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICAgKVxyXG4kYnRucy5jaF9zdHYuc2V0QXR0cmlidXRlKCAgICAgICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvc3R2b2Qvc3R2b2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICApXHJcbiRidG5zLmNoX3VnbmF5YXZvbG5hLnNldEF0dHJpYnV0ZSggJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS93YXZlL3dhdmUtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICAgIClcclxuJGJ0bnMuY2hfbmVtby5zZXRBdHRyaWJ1dGUoICAgICAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL25lbW8vbW9yLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgICAgKVxyXG5cclxuJHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgaWYoZS50YXJnZXQudGFnTmFtZSA9PT0gJ0lOUFVUJyl7XHJcbiAgICAgICAgaWYod2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dCA9PT0gZS50YXJnZXQpIHtcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dC5jaGVja2VkID0gZmFsc2VcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dCA9IG51bGxcclxuICAgICAgICAgICAgJHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgJycpXHJcbiAgICAgICAgICAgICRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCAnJylcclxuICAgICAgICAgICAgJHZpZGVvLnN0eWxlLmJhY2tncm91bmRTaXplID0gXCJcIlxyXG4gICAgICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRzaWRlTWVudUJveCwgJ3Nob3dfZm9vdGVyJylcclxuICAgICAgICAgICAgJHZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZmFpbGVkKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQgPSBlLnRhcmdldFxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkgPSBmYWxzZVxyXG4gICAgICAgICAgICBsaW5rID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdkYXRhLWxpbmstbHEnKVxyXG4gICAgICAgICAgICAkdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICAgICAgICAkc291cmNlLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgICAgICAgJHZpZGVvLnN0eWxlLmJhY2tncm91bmRTaXplID0gXCIwIDBcIlxyXG4gICAgICAgICAgICBpZigkdmlkZW8ucGxheSkgJHZpZGVvLnBsYXkoKTtcclxuICAgICAgICAgICAgZWxzZSBhbGVydCAoJ3ZpZGVvIGNhbm5vdCBwbGF5JylcclxuICAgICAgICAgICAgY2xhc3NMaXN0LmFkZCgkc2lkZU1lbnVCb3gsICdzaG93X2Zvb3RlcicpXHJcbiAgICAgICAgICAgICR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZhaWxlZClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pXHJcblxyXG4gZnVuY3Rpb24gZmFpbGVkKGUpIHtcclxuICAgLy8gdmlkZW8gcGxheWJhY2sgZmFpbGVkIC0gc2hvdyBhIG1lc3NhZ2Ugc2F5aW5nIHdoeSAgICAgLSBmcm9tIGh0dHBzOi8vZGV2LnczLm9yZy9odG1sNS9zcGVjLWF1dGhvci12aWV3L3ZpZGVvLmh0bWwjdmlkZW9cclxuICAgc3dpdGNoIChlLnRhcmdldC5lcnJvci5jb2RlKSB7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfQUJPUlRFRDpcclxuICAgICAgIGFsZXJ0KCfQktC+0YHQv9GA0L7QuNC30LLQtdC00LXQvdC40LUg0LLQuNC00LXQviDQv9GA0LXRgNCy0LDQvdC+LicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfTkVUV09SSzpcclxuICAgICAgIGFsZXJ0KCfQntGI0LjQsdC60LAg0YHQtdGC0Lgg0L/RgNC40LLQtdC70LAg0Log0L3QsNGA0YPRiNC10L3QuNGOINC30LDQs9GA0YPQt9C60Lgg0LLQuNC00LXQvicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfREVDT0RFOlxyXG4gICAgICAgYWxlcnQoJ9CS0L7RgdC/0YDQvtC40LfQstC10LTQtdC90LjQtSDQstC40LTQtdC+INC/0YDQtdC60YDQsNGJ0LXQvdC+INC40Lct0LfQsCDQuNGB0LrQsNC20LXQvdC40Lkg0L/RgNC4INC/0LXRgNC10LTQsNGH0LUg0LjQu9C4INC/0L7RgtC+0LzRgywg0YfRgtC+INCy0LjQtNC10L4g0LjRgdC/0L7Qu9GM0LfRg9C10YIg0L3QtdC00L7RgdGC0YPQv9C90YvQtSDQsiDQktCw0YjQtdC8INCx0YDQsNGD0LfQtdGA0LUg0YTRg9C90LrRhtC40LguJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgICBjYXNlIGUudGFyZ2V0LmVycm9yLk1FRElBX0VSUl9TUkNfTk9UX1NVUFBPUlRFRDpcclxuICAgICAgIGFsZXJ0KCfQktC40LTQtdC+INC90LUg0LzQvtC20LXRgiDQsdGL0YLRjCDQt9Cw0LPRgNGD0LbQtdC90L4g0LjQty3Qt9CwINGB0LHQvtGPINCyINCyINC00L7RgdGC0YPQv9C1INC6INGB0LXRgNCy0LXRgNGDINC40LvQuCDRjdGC0L7RgiDQstC40LTQtdC+0YTQvtGA0LzQsNGCINC90LUg0L/QvtC00LTQtdGA0LbQuNCy0LDQtdGC0YHRjyDQktCw0YjQuNC8INCx0YDQsNGD0LfQtdGA0L7QvC4nKTtcclxuICAgICAgIGJyZWFrO1xyXG4gICAgIGRlZmF1bHQ6XHJcbiAgICAgICBhbGVydCgn0J/RgNC+0LjQt9C+0YjQu9CwINC+0YjQuNCx0LrQsC4g0J/QvtC/0YDQvtCx0YPQudGC0LUg0LXRidC1LicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgIH1cclxuIH1cclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IHtcclxuICAgICdjb250YWlucyc6IGZ1bmN0aW9uKGVsLCBjbHMpIHtcclxuICAgICAgICBpZihlbC5jbGFzc0xpc3QpIHJldHVybiBlbC5jbGFzc0xpc3QuY29udGFpbnMoY2xzKVxyXG4gICAgICAgIHZhciBhcnIgPSBlbC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykuc3BsaXQoJyAnKVxyXG4gICAgICAgIGZvcih2YXIgaT0wOyBpPGFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKGFycltpXSA9PSBjbHMpIHJldHVybiB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgICAgIHJldHVybiBmYWxzZVxyXG4gICAgfSxcclxuICAgICdhZGQnOiBmdW5jdGlvbihlbCwgY2xzKSB7XHJcbiAgICAgICAgaWYoZWwuY2xhc3NMaXN0KSB7XHJcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoY2xzKVxyXG4gICAgICAgICAgICByZXR1cm4gXHJcbiAgICAgICAgfVxyXG4gICAgICAgIGlmKCF3aW5kb3cudmlld2VyU3RhdGUuY2xhc3NMaXN0LmNvbnRhaW5zKGVsLCBjbHMpKXtcclxuICAgICAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdjbGFzcycsIGVsLmdldEF0dHJpYnV0ZSgnY2xhc3MnKSArICcgJyArIGNscylcclxuICAgICAgICB9XHJcbiAgICB9LFxyXG4gICAgJ3JlbW92ZSc6IGZ1bmN0aW9uKGVsLCBjbHMpIHtcclxuICAgICAgICBpZihlbC5jbGFzc0xpc3QpIHtcclxuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZShjbHMpXHJcbiAgICAgICAgICAgIHJldHVybiBcclxuICAgICAgICB9IFxyXG4gICAgICAgIHZhciBhcnIgPSBlbC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykuc3BsaXQoJyAnKVxyXG4gICAgICAgIHZhciByZXMgPSAnJ1xyXG4gICAgICAgIGZvcih2YXIgaT0wOyBpPGFyci5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgIGlmKGFycltpXSAhPSBjbHMpIHtcclxuICAgICAgICAgICAgICAgIHJlcyArPSBhcnJbaV0gKyAnICdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgcmVzKVxyXG4gICAgfVxyXG59IiwiJ3VzZSBzdHJpY3QnXG5cbnZhciAkYm94ID0gd2luZG93LnZpZXdlclN0YXRlLiRib3gsXG4gICAgJGJ0bkZ1bGxTY3JPbiA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuRnVsbFNjck9uLFxuICAgICRidG5GdWxsU2NyT2ZmID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5GdWxsU2NyT2ZmLFxuICAgICRidG5NZW51T2ZmID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5NZW51T2ZmLFxuICAgICRidG5NZW51T24gPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0bk1lbnVPbixcbiAgICAkc2lkZU1lbnVCb3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJHNpZGVNZW51Qm94LFxuICAgICRjb250cm9sID0gd2luZG93LnZpZXdlclN0YXRlLiRjb250cm9sLFxuICAgICRzdmdGdWxsU2NyT24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX19mdWxsc2NyLm9uJyksXG4gICAgZHVyYXRpb25DdHJsVmlzaWJsZSA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5kdXJhdGlvbkN0cmxWaXNpYmxlLFxuICAgIGNsYXNzTGlzdCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5jbGFzc0xpc3QsXG4gICAgaWQgPSB1bmRlZmluZWRcblxuaWYgKCB3aW5kb3cudmlld2VyU3RhdGUuaXNGdWxsU2NyZWVuQWxsb3dlZCApIHtcbiAgJGJ0bk1lbnVPZmYuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAkYnRuTWVudU9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgJGJ0bkZ1bGxTY3JPbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGdvRnVsbFNjcmVlbilcbiAgJGJ0bkZ1bGxTY3JPZmYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBnZXRPZmZGdWxsc2NyZWVuKVxufSBlbHNlIGlmICh3aW5kb3cudmlld2VyU3RhdGUuaXNfaVBhZF9pUGhvbmUgJiZcbiAgICAgICAgICAgIXdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZV9pbkZ1bGxTY3JlZW4pIHtcbiAgJGJ0bkZ1bGxTY3JPbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICBhbGVydCgn0KfRgtC+0LHRiyDQvtCx0YDQtdGB0YLQuCDQv9C+0LvQvdC+0Y3QutGA0LDQvdC90YvQuSDRgNC10LbQuNC8INC90LDQtNC+INGB0LTQtdC70LDRgtGMINCy0YHQtdCz0L4g0L3QtdGB0LrQvtC70YzQutC+INGI0LDQs9C+0LI6XFxuJ1xuICAgICAgICArICfQqNCw0LMgMS4g0J3QsNC20LzQuNGC0LUg0L3QsCDQutC90L7Qv9C60YMgXCLQntGC0L/RgNCw0LLQuNGC0YxcIiAo0LLRi9Cz0LvRj9C00LjRgiDQutCw0Log0LrQstCw0LTRgNCw0YIg0YHQviDRgdGC0YDQtdC70L7Rh9C60L7QuSDQstCy0LXRgNGFKSDRgdC/0YDQsNCy0LAg0LLQstC10YDRhdGDINGN0LrRgNCw0L3QsCDQuCDQstGL0LHQtdGA0LjRgtC1INC/0YPQvdC60YI6INCd0LAg0Y3QutGA0LDQvSDCq9CU0L7QvNC+0LnCuy5cXG4nXG4gICAgICAgICsgJ9Co0LDQsyAyLiDQo9C60LDQttC40YLQtSDQttC10LvQsNC10LzQvtC1INC90LDQt9Cy0LDQvdC40LUg0Lgg0L3QsNC20LzQuNGC0LUgXCLQlNC+0LHQsNCy0LjRgtGMXCIuXFxuJ1xuICAgICAgICArICfQn9C+0YHQu9C1INC90LDQttCw0YLQuNGPINC60L3QvtC/0LrQuCBcItCU0L7QsdCw0LLQuNGC0YxcIiDQktCw0YEg0L/QtdGA0LXQsdGA0L7RgdC40YIg0L3QsCDRgNCw0LHQvtGH0LjQuSDRgdGC0L7Quywg0LPQtNC1INCS0Ysg0YHQvNC+0LbQtdGC0LUg0YPQstC40LTQtdGC0Ywg0YHQstC10LbQtdGB0L7Qt9C00LDQvdC90YPRjiDRgdGB0YvQu9C60YMuXFxuJ1xuICAgICAgICArICfQl9Cw0LnQtNGPINC90LAg0YHQsNC50YIg0L3QsNC20LDRgtC40LXQvCDQvdCwINGN0YLRgyDRgdGB0YvQu9C60YMg0JLRiyDQstGB0LXQs9C00LAg0LHRg9C00LXRgtC1INGB0LzQvtGC0YDQtdGC0Ywg0KLQkiDQsiDQv9C+0LvQvdC+0Y3QutGA0LDQvdC90L7QvCDRgNC10LbQuNC80LUuXFxuJ1xuICAgICAgICArICfQlNC70Y8g0YPQtNCw0LvQtdC90LjRjyDRgdGB0YvQu9C60Lgg0L3Rg9C20L3QviDQtdC1INC90LDQttCw0YLRjCDQuCDQv9C+0LTQtdGA0LbQsNGC0YwsINC30LDRgtC10Lwg0L3QsNC20LDRgtGMINC/0L7Rj9Cy0LjQstGI0LjQudGB0Y8g0LrRgNC10YHRgtC40Log0LIg0LvQtdCy0L7QvCDQstC10YDRhdC90LXQvCDRg9Cz0LvRgy4nKVxuICAgIH0pXG4gICAgY2xhc3NMaXN0LmFkZCgkc3ZnRnVsbFNjck9uLCAnZGlzYWJsZWQnKVxuICAgICRidG5GdWxsU2NyT2ZmLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAkYnRuTWVudU9mZi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0V2F0Y2hNb2RlKVxuICAgICRidG5NZW51T24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsZWF2ZVdhdGNoTW9kZSlcbn0gZWxzZSBpZiAod2luZG93LnZpZXdlclN0YXRlLmlzX2lQYWRfaVBob25lX2luRnVsbFNjcmVlbiB8fFxuICAgICAgICAgICAhd2luZG93LnZpZXdlclN0YXRlLmlzRnVsbFNjcmVlbkFsbG93ZWQpIHtcbiAgICAkYnRuRnVsbFNjck9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAkYnRuRnVsbFNjck9mZi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgJGJ0bk1lbnVPZmYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydFdhdGNoTW9kZSlcbiAgICAkYnRuTWVudU9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbGVhdmVXYXRjaE1vZGUpXG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmdWxsc2NyZWVuY2hhbmdlXCIsIGZzSGFuZGxlcilcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ3ZWJraXRmdWxsc2NyZWVuY2hhbmdlXCIsIGZzSGFuZGxlcilcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3pmdWxsc2NyZWVuY2hhbmdlXCIsIGZzSGFuZGxlcilcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJNU0Z1bGxzY3JlZW5DaGFuZ2VcIiwgZnNIYW5kbGVyKVxuXG5mdW5jdGlvbiBmc0hhbmRsZXIoKSB7XG4gICAgaWYod2luZG93LnZpZXdlclN0YXRlLmFzayRib3hJbkZ1bGxTY3JlZW4oKSl7XG4gICAgICAgIHN0YXJ0V2F0Y2hNb2RlKClcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZWF2ZVdhdGNoTW9kZSgpXG4gICAgfVxufVxuZnVuY3Rpb24gZ29GdWxsU2NyZWVuKCkge1xuICAgIGlmICgkYm94LnJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICRib3gucmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgIH0gZWxzZSBpZiAoJGJveC5tb3pSZXF1ZXN0RnVsbFNjcmVlbikge1xuICAgICAgICAkYm94Lm1velJlcXVlc3RGdWxsU2NyZWVuKClcbiAgICB9IGVsc2UgaWYgKCRib3gud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgJGJveC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpXG4gICAgfSBlbHNlIGlmICgkYm94Lm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgJGJveC5tc1JlcXVlc3RGdWxsc2NyZWVuKClcbiAgICB9XG59XG5mdW5jdGlvbiBnZXRPZmZGdWxsc2NyZWVuKCkge1xuICBpZihkb2N1bWVudC5leGl0RnVsbHNjcmVlbikge1xuICAgIGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKCk7XG4gIH0gZWxzZSBpZihkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XG4gICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xuICB9IGVsc2UgaWYoZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4pIHtcbiAgICBkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuICB9ZWxzZSBpZiAoZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbikge1xuXHRkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKCk7XG4gIH1cbn1cbmZ1bmN0aW9uIHN0YXJ0V2F0Y2hNb2RlKGUpIHtcbiAgICBjbGFzc0xpc3QuYWRkKCRzaWRlTWVudUJveCwgJ2hpZGVfbWVudScpXG4gICAgJGJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcmVlbkNsaWNrSGFuZGxlcilcbiAgICAkY29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNvbnRyb2xDbGlja0hhbmRsZXIpXG59XG5mdW5jdGlvbiBsZWF2ZVdhdGNoTW9kZShlKSB7XG4gICAgY2xlYXJUaW1lb3V0KGlkKVxuICAgIGNsYXNzTGlzdC5yZW1vdmUoJGNvbnRyb2wsICdzaG93X2NvbnRyb2wnKVxuICAgICRjb250cm9sLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29udHJvbENsaWNrSGFuZGxlcilcbiAgICAkYm94LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2NyZWVuQ2xpY2tIYW5kbGVyKVxuICAgIGNsYXNzTGlzdC5yZW1vdmUoJHNpZGVNZW51Qm94LCAnaGlkZV9tZW51Jylcbn1cbmZ1bmN0aW9uIHNjcmVlbkNsaWNrSGFuZGxlcihlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgICRib3gucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY3JlZW5DbGlja0hhbmRsZXIpXG4gICAgY2xhc3NMaXN0LmFkZCgkY29udHJvbCwgJ3Nob3dfY29udHJvbCcpXG4gICAgaWQgPSBzZXRUaW1lb3V0KCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJGNvbnRyb2wsICdzaG93X2NvbnRyb2wnKVxuICAgICAgICAgICAgICRib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY3JlZW5DbGlja0hhbmRsZXIpXG4gICAgICAgICB9ICwgZHVyYXRpb25DdHJsVmlzaWJsZSlcbn1cbmZ1bmN0aW9uIGNvbnRyb2xDbGlja0hhbmRsZXIoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICBjbGVhclRpbWVvdXQoaWQpXG4gICAgaWQgPSBzZXRUaW1lb3V0KCBmdW5jdGlvbigpe1xuICAgICAgICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJGNvbnRyb2wsICdzaG93X2NvbnRyb2wnKVxuICAgICAgICAgICAgICRib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY3JlZW5DbGlja0hhbmRsZXIpXG4gICAgICAgICB9ICwgZHVyYXRpb25DdHJsVmlzaWJsZSlcbn1cbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxud2luZG93Lm9ubG9hZCA9IGZ1bmN0aW9uICgpIHtcclxuICB3aW5kb3cudmlld2VyU3RhdGUgPSB7XHJcbiAgICAnJGJveCc6ICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5ib3gnKSxcclxuICAgICckdmlkZW8nOiAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnZpZGVvJyksXHJcbiAgICAnJHNvdXJjZSc6ICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zb3VyY2UnKSxcclxuICAgICckc2lkZU1lbnVCb3gnOiAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXInKSxcclxuICAgICckc2xpZGVyJzogICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXJfX3NsaWRlcicpLFxyXG4gICAgJyRmb290ZXInOiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyJyksXHJcbiAgICAnJGNvbnRyb2wnOiAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sJyksXHJcbiAgICAnJGJ0blBsYXlGb290ZXInOiAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXIgLmJ0bl9wbGF5JyksXHJcbiAgICAnJGJ0blBsYXlDdHJsJzogICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sIC5idG5fcGxheScpLFxyXG4gICAgJyRidG5Wb2x1bWVGb290ZXInOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyIC5idG5fdm9sdW1lJyksXHJcbiAgICAnJGJ0blZvbHVtZUN0cmwnOiAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sIC5idG5fdm9sdW1lJyksXHJcbiAgICAnJGJ0blF1YWxpdHknOiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fcXVhbGl0eScpLFxyXG4gICAgJyRidG5TY2FsZSc6ICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NhbGVfYm94X19idG4nKSxcclxuICAgICckc3ViQnRuVXAnOiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjYWxlX2JveF9fc3ViYnRuX3VwJyksXHJcbiAgICAnJHN1YkJ0bkRvd24nOiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY2FsZV9ib3hfX3N1YmJ0bl9kb3duJyksXHJcbiAgICAnJGJ0bk1lbnVPZmYnOiAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXIgLmJ0bl9fbWVudV9zd2l0Y2gnKSxcclxuICAgICckYnRuTWVudU9uJzogICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2wgLmJ0bl9fbWVudV9zd2l0Y2gnKSxcclxuICAgICckYnRuRnVsbFNjck9uJzogICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3RlciAuYnRuX19mdWxsc2NyJyksXHJcbiAgICAnJGJ0bkZ1bGxTY3JPZmYnOiAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sIC5idG5fX2Z1bGxzY3InKSxcclxuICAgICdhY3RpdmUkaW5wdXQnOiBudWxsLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIG9iamVjdFxyXG4gICAgJ2lzVmlkZW9Xb3JraW5nJzogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgYm9vbGVhblxyXG4gICAgJ2lzRnVsbFNjcmVlbkFsbG93ZWQnOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgYm9vbGVhblxyXG4gICAgJ2lzX2lQYWRfaVBob25lJzogLyhpUGhvbmV8aVBvZHxpUGFkKS4qQXBwbGVXZWJLaXQvaS50ZXN0KHdpbmRvdy5uYXZpZ2F0b3IudXNlckFnZW50KSwgICAvLyAgYm9vbGVhblxyXG4gICAgJ2lzX2lQYWRfaVBob25lX2luRnVsbFNjcmVlbic6IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgYm9vbGVhblxyXG4gICAgJ2FzayRib3hJbkZ1bGxTY3JlZW4nOiBudWxsLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgZnVuY3Rpb24gLT4gYm9vbGVhblxyXG4gICAgJ2hpZ2hRdWFsaXR5JzogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgYm9vbGVhblxyXG4gICAgJ2R1cmF0aW9uU2NhbGVTdWJtZW51JzogNDAwMCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgbXNcclxuICAgICdkdXJhdGlvbkN0cmxWaXNpYmxlJzogNTAwMCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIG1zXHJcbiAgICAnY2xhc3NMaXN0Jzoge1xyXG4gICAgICAgICdjb250YWlucyc6IG51bGwsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgZnVuY3Rpb24gLT4gYm9vbGVhblxyXG4gICAgICAgICdhZGQnOiBudWxsLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgZnVuY3Rpb24gLT4gdm9pZFxyXG4gICAgICAgICdyZW1vdmUnOiBudWxsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgZnVuY3Rpb24gLT4gdm9pZFxyXG4gICAgIH1cclxuICB9O1xyXG5cclxuICB3aW5kb3cudmlld2VyU3RhdGUuaXNWaWRlb1dvcmtpbmcgPSByZXF1aXJlKCcuL2Fza1ZpZGVvV29ya2luZy5qcycpXHJcbiAgd2luZG93LnZpZXdlclN0YXRlLmlzRnVsbFNjcmVlbkFsbG93ZWQgPSByZXF1aXJlKCcuL2Fza0Z1bGxTY3JlZW4uanMnKVxyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZV9pbkZ1bGxTY3JlZW4gPSByZXF1aXJlKCcuL2Fza19pUGFkX2lQaG9uZV9GdWxsU2NyZWVuLmpzJylcclxuICB3aW5kb3cudmlld2VyU3RhdGUuYXNrJGJveEluRnVsbFNjcmVlbiA9IHJlcXVpcmUoJy4vYXNrJGJveEluRnVsbFNjcmVlbi5qcycpXHJcbiAgd2luZG93LnZpZXdlclN0YXRlLmNsYXNzTGlzdCA9IHJlcXVpcmUoJy4vY2xhc3NMaXN0LmpzJylcclxuICAgIFxyXG4gIHJlcXVpcmUoJy4vc2NyZWVuSGVpZ2h0LmpzJylcclxuICAvLyAgICBJbml0IGNvbXBsZXRlZFxyXG4gIHJlcXVpcmUoJy4vY2hhbm5lbFNlbGVjdG9yLmpzJylcclxuICByZXF1aXJlKCcuL2Z1bGxzY3JlZW5PckhpZGVNZW51LmpzJylcclxuICByZXF1aXJlKCcuL2J1dHRvblF1YWxpdHkuanMnKVxyXG4gIHJlcXVpcmUoJy4vYnV0dG9uU2NhbGUuanMnKVxyXG4gIHJlcXVpcmUoJy4vYnV0dG9uUGxheVBhdXNlLmpzJylcclxuICBpZighd2luZG93LnZpZXdlclN0YXRlLmlzX2lQYWRfaVBob25lKSByZXF1aXJlKCcuL2J1dHRvblZvbHVtZS5qcycpXHJcbn0iLCIndXNlIHN0cmljdCdcclxuXHJcbnNldEZvbnRTaXplKClcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHNldEZvbnRTaXplKVxyXG5mdW5jdGlvbiBzZXRGb250U2l6ZSgpIHtcclxuICAgIHZhciBmb250U2l6ZSA9IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0IC8gMjBcclxuICAgIGlmKGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0ID4gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCkge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuZm9udFNpemUgPSAwLjQgKiBmb250U2l6ZSArICdweCdcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5mb250U2l6ZSA9IGZvbnRTaXplICsgJ3B4J1xyXG4gICAgfVxyXG59Il19
