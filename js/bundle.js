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
        $box.msRequestFullscreen
        ) {
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
    if(window.viewerState.is_iPad_iPhone &&
        window.innerHeight >= window.screen.availHeight) 
        {
        return true
    } else return false
})()

},{}],5:[function(require,module,exports){
'use strict'

var $video = window.viewerState.$video
var $btnPlayPause = window.viewerState.$btnPlay
var $svgPlay = document.querySelector('.play')
var $svgPause = document.querySelector('.pause')
var classList = window.viewerState.classList

if ($video.paused){
    classList.add($svgPlay, "active")
} else {
    classList.add($svgPause, "active")
} 
$btnPlayPause.addEventListener('click', function(){
    if ($video.paused) $video.play() 
    else $video.pause()
})
$video.addEventListener('play', function(){
        classList.add($svgPause, "active")
        classList.remove($svgPlay, "active")
})
$video.addEventListener('pause', function(){
        classList.add($svgPlay, "active")
        classList.remove($svgPause, "active")
})
$video.addEventListener('click', function(e){
        e.preventDefault()
})

},{}],6:[function(require,module,exports){
'use strict'

var $btnQuality = window.viewerState.$btnQuality
var $svgQuality = document.querySelector('.footer__left__quality svg')
var classList = window.viewerState.classList
var link = ''

styleButton()

$btnQuality.addEventListener('click', function(){
    if (window.viewerState.highQuality) {
        window.viewerState.highQuality = false
        styleButton()
        if (window.viewerState.active$input) {
            link = window.viewerState.active$input.getAttribute('data-link-lq')
            window.viewerState.$video.setAttribute('src', link)
            window.viewerState.$source.setAttribute('src', link)
            window.viewerState.$video.play()
        }
    } else {
        window.viewerState.highQuality = true
        styleButton()
        if (window.viewerState.active$input) {
            link = window.viewerState.active$input.getAttribute('data-link-hq')
            window.viewerState.$video.setAttribute('src', link)
            window.viewerState.$source.setAttribute('src', link)
            window.viewerState.$video.play()
        }
    }
})
window.viewerState.$slider.addEventListener('click', function(e){
    if(e.target.tagName === 'INPUT'){
        window.viewerState.highQuality = false
        styleButton()
        if (window.viewerState.active$input) {
            link = window.viewerState.active$input.getAttribute('data-link-lq')
            window.viewerState.$video.setAttribute('src', link)
            window.viewerState.$source.setAttribute('src', link)
            window.viewerState.$video.play()
        }
    }
})

function styleButton() {
    if (window.viewerState.highQuality) {
        classList.remove($svgQuality, 'off')
    } else {
        classList.add($svgQuality, 'off')
    }
}
},{}],7:[function(require,module,exports){
'use strict'

//          Scale
var $box = window.viewerState.$box
var $video = window.viewerState.$video
var $btnScale = window.viewerState.$btnScale
var $svgScale = document.querySelector('.scale_btn_svg')
var $btnScaleSubBtnsBox = document.querySelector('.footer__right__scale_subbtns')
var $subBtnUp = document.querySelector('.subbtn__up svg')
var $subBtnDown = document.querySelector('.subbtn__down svg')
var classList = window.viewerState.classList
var ratio = undefined
var max$videoHeight = undefined
var min$videoHeight = undefined
var step = undefined
var n = undefined
var nMax = 0
var nMin = 0
var id = undefined
var activeID = undefined

$video.addEventListener('loadeddata', scaleRestart)
$video.addEventListener('error', function () {
    clearTimeout(id)
    stopScaling()
    console.log('video error')
})
document.addEventListener('fullscreenchange', scaleRestart)
document.addEventListener('webkitfullscreenchange', scaleRestart)
document.addEventListener('mozfullscreenchange', scaleRestart)
document.addEventListener('MSFullscreenChange', scaleRestart)

function scaleRestart() {
    console.log('Rescale start: ' + (Date.now() - window.viewerState.timerForErrorPage))      
    stopScaling()
    clearTimeout(id)
    id = setTimeout(startScaling, 1500)
}
function startScaling() {
    ratio = $box.clientWidth / $video.offsetWidth
    if(ratio <= 1) {
        min$videoHeight = 100 * ratio   //  %
        nMin = Math.floor((min$videoHeight - 100) / 14)
        nMax = 0
        step = (min$videoHeight - 100) / nMin
        console.log(nMin + ' steps')
        $subBtnDown.style.fill = ''
        $subBtnUp.style.fill = 'rgba(0, 0, 0, 0.5)'
    } else {
        max$videoHeight = 100 * ratio   //  %
        nMax = Math.ceil((max$videoHeight - 100) / 14)
        nMin = 0
        step = (max$videoHeight - 100) / nMax
        console.log(nMax + ' steps')
        $subBtnDown.style.fill = 'rgba(0, 0, 0, 0.5)'
        $subBtnUp.style.fill = ''
    }
    n = 0
    $btnScale.addEventListener('click', btnScaleHandler) 
    $subBtnUp.addEventListener('click', subBtnUpHandler) 
    $subBtnDown.addEventListener('click', subBtnDownHandler) 
}
function stopScaling() {
    ratio = undefined
    max$videoHeight = undefined
    step = undefined
    n = undefined
    $video.style.height = '100%'
    $btnScale.removeEventListener('click', btnScaleHandler) 
    $subBtnUp.removeEventListener('click', subBtnUpHandler) 
    $subBtnDown.removeEventListener('click', subBtnDownHandler)
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
        if(n === nMax) $subBtnUp.style.fill = 'rgba(0, 0, 0, 0.5)'
        if(n === (nMin + 1)) $subBtnDown.style.fill = ''
        clearTimeout(activeID)
        activeID = setTimeout(removeActive, window.viewerState.durationScaleSubmenu)
    }
}
function subBtnDownHandler(){
    if(n > nMin) {
        $video.style.height = 100 + --n * step + '%'
        if(n === nMin) $subBtnDown.style.fill = 'rgba(0, 0, 0, 0.5)'
        if(n === (nMax - 1)) $subBtnUp.style.fill = ''
        clearTimeout(activeID)
        activeID = setTimeout(removeActive, window.viewerState.durationScaleSubmenu)
    }
}
function removeActive() {
    classList.remove($btnScaleSubBtnsBox, 'active')
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

var $video = window.viewerState.$video
var $btnVolume = window.viewerState.$btnVolume
var $svgVolumeOn = document.querySelector('.volume_on')
var $svgVolumeOff = document.querySelector('.volume_off')
var classList = window.viewerState.classList

$btnVolume.style.display = 'inline-block'

$btnVolume.addEventListener('click', function(){
    if ($video.muted){
        $video.muted = false
        $video.volume = 1.0
        classList.add($svgVolumeOn, "active")
        classList.remove($svgVolumeOff, "active")
    } else {
        $video.volume = 0.0
        $video.muted = true
        classList.remove($svgVolumeOn, "active")
        classList.add($svgVolumeOff, "active")
    } 
})

},{}],9:[function(require,module,exports){
"use strict"

var $video = window.viewerState.$video
var $source = window.viewerState.$source
var $slider = window.viewerState.$slider
var $btnMenuOnOf = document.querySelector('.footer__right__menu-off')
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
    //e.stopPropagation()
    if(e.target.tagName === 'INPUT'){
        if(window.viewerState.active$input === e.target) {
            $video.removeEventListener('error', failed)
            window.viewerState.active$input.checked = false
            window.viewerState.active$input = null
            $video.style.backgroundSize = ""
            $video.setAttribute('src', '')
            $source.setAttribute('src', '')
            window.viewerState.$footer.moveOut()
        } else {
            window.viewerState.active$input = e.target
            if(window.viewerState.highQuality)  link = e.target.getAttribute('data-link-hq')
            else link = e.target.getAttribute('data-link-lq')
            $video.setAttribute('src', link)
            $source.setAttribute('src', link)
            $video.style.backgroundSize = "0 0"
            if($video.play) $video.play();
            else alert ('video cannot play')
            if(!window.viewerState.$footer.isMovedOn) window.viewerState.$footer.moveOn()
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
        var removed = ''
        for(var i=0; i<arr.length; i++){
            if(arr[i] != cls) {
                removed += arr[i] + ' '
            }
        }
        el.setAttribute('class', removed)
    }
}
},{}],11:[function(require,module,exports){
'use strict'

var $box = window.viewerState.$box
var $btnFullScr = window.viewerState.$btnFullScr
var $svgFullScrOn = document.querySelector('.fullscr_on')
var $svgFullScrOff = document.querySelector('.fullscr_off')
var $btnMenuOff = window.viewerState.$btnMenuOff
var $sideMenuBox = window.viewerState.$sideMenuBox
var $footer = window.viewerState.$footer
var $footer__center = document.querySelector('.footer__center') 
var durationFooterAsCtrl = window.viewerState.durationFooterAsCtrl
var classList = window.viewerState.classList
var id = undefined

if ( window.viewerState.isFullScreenAllowed ) {
  $btnMenuOff.style.display = 'none'
  $btnFullScr.addEventListener('click', function (e) {
      btnHandler(e)
      if(window.viewerState.ask$boxInFullScreen()) {
          getOffFullscreen()
      } else {
          goFullScreen()
      }
  })
} else if (window.viewerState.is_iPad_iPhone &&
           !window.viewerState.is_iPad_iPhone_inFullScreen) {
  $btnFullScr.addEventListener('click', function () {
    alert('Чтобы обрести полноэкранный режим надо сделать всего несколько шагов:\n'
        + 'Шаг 1. Нажмите на кнопку "Отправить" (выглядит как квадрат со стрелочкой вверх) справа вверху экрана и выберите пункт: На экран «Домой».\n'
        + 'Шаг 2. Укажите желаемое название и нажмите "Добавить".\n'
        + 'После нажатия кнопки "Добавить" Вас перебросит на рабочий стол, где Вы сможете увидеть свежесозданную ссылку.\n'
        + 'Зайдя на сайт нажатием на эту ссылку Вы всегда будете смотреть ТВ в полноэкранном режиме.\n'
        + 'Для удаления ссылки нужно ее нажать и подержать, затем нажать крестик в левом верхнем углу.')
    })
    classList.add($svgFullScrOn, 'off')
    $btnMenuOff.addEventListener('click', btnHandler)
} else if (window.viewerState.is_iPad_iPhone_inFullScreen ||
           !window.viewerState.isFullScreenAllowed) {
    $btnFullScr.style.display = 'none'
    $btnMenuOff.addEventListener('click', btnHandler)
}

function goFullScreen() {
    classList.add($svgFullScrOff, 'active')
    classList.remove($svgFullScrOn, 'active')
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
  classList.add($svgFullScrOn, 'active')
  classList.remove($svgFullScrOff, 'active')
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
function btnHandler(e) {
    e.stopPropagation()
    if(!window.viewerState.is$sideMenuBoxHidden && !window.viewerState.is$footerHidden) {
        $sideMenuBox.hide()
        $footer.hide()
        $box.addEventListener('click', boxHandler)
    } else {
        $sideMenuBox.show()
        classList.remove($footer.object, 'ctrl')
        clearTimeout(id)
        $box.removeEventListener('click', boxHandler)
        $footer.object.removeEventListener('click', footerHandler)
    }
}
function boxHandler(e) {
    e.stopPropagation()
    $box.removeEventListener('click', boxHandler)
    showCtrl()
    id = setTimeout( function(){
             hideCtrl()
             $box.addEventListener('click', boxHandler)
         } , durationFooterAsCtrl)
}
function footerHandler(e) {
    e.stopPropagation()
    clearTimeout(id)
    id = setTimeout( function(){
             hideCtrl()
             $footer.object.removeEventListener('click', footerHandler)
             $box.addEventListener('click', boxHandler)
         } , durationFooterAsCtrl)
}
function showCtrl() {
    $footer.object.addEventListener('click', footerHandler)
    classList.add($footer.object, 'ctrl')
    $footer.show()
}
function hideCtrl() {
    $footer.object.removeEventListener('click', footerHandler)
    $footer.hide()
    setTimeout(function(){
        classList.remove($footer.object, 'ctrl')
    }, window.viewerState.durationShowHideMenu)
}

},{}],12:[function(require,module,exports){
'use strict'

window.onload = function () {
  window.viewerState = {
    '$box': document.querySelector('.box'),
    '$video': document.querySelector('.video'),
    '$source': document.querySelector('.source'),
    '$sideMenuBox': {
        'object': document.querySelector('.sidebar'),
        'hide': null,                                                   //  function -> void
        'show': null                                                    //  function -> void
    },
    '$slider': document.querySelector('.sidebar__slider'),
    '$footer': {
        'object': document.querySelector('.footer'),
        'hide': null,                                                   //  function -> void
        'show': null,                                                   //  function -> void
        'moveOn': null,                                                 //  function -> void
        'moveOut': null,                                                //  function -> void
        'isMovedOn': false                                              //  boolean
    },
    '$btnHelp':     document.querySelector('.footer__left__help'),
    '$btnPlay':     document.querySelector('.footer__left__play'),
    '$btnVolume':   document.querySelector('.footer__left__volume'),
    '$btnQuality':  document.querySelector('.footer__left__quality'),
    '$btnScale':    document.querySelector('.footer__right__scale_btn'),
    '$btnMenuOff':  document.querySelector('.footer__right__menu-off'),
    '$btnFullScr':  document.querySelector('.footer__right__fullscr'),
    'active$input': null,                                               //  object
    'highQuality': false,                                               //  boolean
    'is$sideMenuBoxHidden': false,                                      //  boolean
    'is$footerHidden': false,                                           //  boolean
    'isVideoWorking': false,                                            //  boolean
    'isFullScreenAllowed': false,                                       //  boolean
    'is_iPad_iPhone': /(iPhone|iPod|iPad).*AppleWebKit/i.test(window.navigator.userAgent),   //  boolean
    'is_iPad_iPhone_inFullScreen': false,                               //  boolean
    'ask$boxInFullScreen': null,                                        //  function -> boolean
    'durationShowHideMenu': 500,                                        //  ms
    'durationScaleSubmenu': 4000,
    'durationFooterAsCtrl': 5000,
    'timerForErrorPage': undefined,
    'classList': {
        'contains': null,
        'add': null,
        'remove': null
     }
  };

  window.viewerState.isVideoWorking = require('./askVideoWorking.js')
  window.viewerState.isFullScreenAllowed = require('./askFullScreen.js')
  window.viewerState.is_iPad_iPhone_inFullScreen = require('./ask_iPad_iPhone_FullScreen.js')
  window.viewerState.ask$boxInFullScreen = require('./ask$boxInFullScreen.js')
  window.viewerState.classList = require('./classList.js')
    
  require('./screenHeight.js')
  require('./setMenuAndFooterMethods.js')
  if(!window.viewerState.is_iPad_iPhone) require('./buttonVolume.js')
  //    Init completed
  require('./channelSelector.js')
  require('./fullscreen.js')
  require('./buttonQuality.js')
  require('./buttonScale.js')
  require('./buttonPlayPause.js')
 //            alert("I am here")
 }
},{"./ask$boxInFullScreen.js":1,"./askFullScreen.js":2,"./askVideoWorking.js":3,"./ask_iPad_iPhone_FullScreen.js":4,"./buttonPlayPause.js":5,"./buttonQuality.js":6,"./buttonScale.js":7,"./buttonVolume.js":8,"./channelSelector.js":9,"./classList.js":10,"./fullscreen.js":11,"./screenHeight.js":13,"./setMenuAndFooterMethods.js":14}],13:[function(require,module,exports){
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
},{}],14:[function(require,module,exports){
'use strict'

// http://paulirish.com/2011/requestanimationframe-for-smart-animating/
// http://my.opera.com/emoller/blog/2011/12/20/requestanimationframe-for-smart-er-animating

// requestAnimationFrame polyfill by Erik Möller. fixes from Paul Irish and Tino Zijdel

// MIT license

var lastTime = 0;
var vendors = ['ms', 'moz', 'webkit', 'o'];
for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
    window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
    window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                || window[vendors[x]+'CancelRequestAnimationFrame'];
}

if (!window.requestAnimationFrame)
    window.requestAnimationFrame = function(callback, element) {
        var currTime = new Date().getTime();
        var timeToCall = 32;  //    Math.max(0, 16 - (currTime - lastTime));
        var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
        lastTime = currTime + timeToCall;
        return id;
    };

if (!window.cancelAnimationFrame)
    window.cancelAnimationFrame = function(id) {
        clearTimeout(id);
    };
//  End rFA polyfill

var $sideMenuBox = window.viewerState.$sideMenuBox
var $footer = window.viewerState.$footer
var duration = window.viewerState.durationShowHideMenu

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
            $footer.object.style.bottom = '-14%'
            startTime = undefined
            window.viewerState.is$footerHidden = true
        }
    }
}

window.viewerState.$footer.show = function () {
    var startTime = undefined
    $footer.object.style.bottom = '0'
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
window.viewerState.$footer.moveOn = function () {
    var startTime = undefined
    $footer.object.style.bottom = '-14%'
    $sideMenuBox.object.style.height = '100%'
    requestAnimationFrame(moveOn)
    function moveOn(timeStamp) {
        if (!startTime) startTime = timeStamp
        var progress = (timeStamp - startTime) / duration
        if (progress <= 1) {
            $footer.object.style.bottom = -14 + 14 * progress + '%'
            $sideMenuBox.object.style.height = 100 - 14 * progress + '%'
            requestAnimationFrame(moveOn)
        } else {
            $footer.object.style.bottom = '0'
            $sideMenuBox.object.style.height = '86%'
            window.viewerState.$footer.isMovedOn = true
            startTime = undefined
        }
    }
}
window.viewerState.$footer.moveOut = function () {
    var startTime = undefined
    $footer.object.style.bottom = '0'
    $sideMenuBox.object.style.height = '86%'
    requestAnimationFrame(moveOn)
    function moveOn(timeStamp) {
        if (!startTime) startTime = timeStamp
        var progress = (timeStamp - startTime) / duration
        if (progress <= 1) {
            $footer.object.style.bottom = -14 * progress + '%'
            $sideMenuBox.object.style.height = 86 + 14 * progress + '%'
            requestAnimationFrame(moveOn)
        } else {
            $footer.object.style.bottom = '-14%'
            $sideMenuBox.object.style.height = '100%'
            window.viewerState.$footer.isMovedOn = false
            startTime = undefined
        }
    }
}

},{}]},{},[12])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2EwNS9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hc2skYm94SW5GdWxsU2NyZWVuLmpzIiwianMvYXNrRnVsbFNjcmVlbi5qcyIsImpzL2Fza1ZpZGVvV29ya2luZy5qcyIsImpzL2Fza19pUGFkX2lQaG9uZV9GdWxsU2NyZWVuLmpzIiwianMvYnV0dG9uUGxheVBhdXNlLmpzIiwianMvYnV0dG9uUXVhbGl0eS5qcyIsImpzL2J1dHRvblNjYWxlLmpzIiwianMvYnV0dG9uVm9sdW1lLmpzIiwianMvY2hhbm5lbFNlbGVjdG9yLmpzIiwianMvY2xhc3NMaXN0LmpzIiwianMvZnVsbHNjcmVlbi5qcyIsImpzL21haW4uanMiLCJqcy9zY3JlZW5IZWlnaHQuanMiLCJqcy9zZXRNZW51QW5kRm9vdGVyTWV0aG9kcy5qcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtBQ0FBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNYQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDZEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1RBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDNUJBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDakRBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3SEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3ZCQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN2RkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25DQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2hFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKGRvY3VtZW50LmZ1bGxzY3JlZW5FbGVtZW50IHx8IFxyXG4gICAgICAgIGRvY3VtZW50LndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50IHx8XHJcbiAgICAgICAgZG9jdW1lbnQubW96RnVsbFNjcmVlbkVsZW1lbnQgfHxcclxuICAgICAgICBkb2N1bWVudC5tc0Z1bGxzY3JlZW5FbGVtZW50IHx8XHJcbiAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmlzX2lQYWRfaVBob25lX2luRnVsbFNjcmVlbiApIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSBlbHNlIHJldHVybiBmYWxzZVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyICRib3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJGJveFxyXG4gICAgaWYgKCRib3gucmVxdWVzdEZ1bGxzY3JlZW4gfHxcclxuICAgICAgICAkYm94Lm1velJlcXVlc3RGdWxsU2NyZWVuIHx8XHJcbiAgICAgICAgJGJveC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbiB8fFxyXG4gICAgICAgICRib3gubXNSZXF1ZXN0RnVsbHNjcmVlblxyXG4gICAgICAgICkge1xyXG4gICAgICAgIHJldHVybiB0cnVlIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2UgXHJcbiAgICB9XHJcbn0pKClcclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBpZih0eXBlb2Ygd2luZG93LnZpZXdlclN0YXRlLiR2aWRlby5wbGF5ID09PSAnZnVuY3Rpb24nICkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd2aWRlbyBvayBuZWVkcyB0byBiZSBjb25maXJtZWQnKVxyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdubyB2aWRlbycpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbn0pKClcclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZSAmJlxyXG4gICAgICAgIHdpbmRvdy5pbm5lckhlaWdodCA+PSB3aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0KSBcclxuICAgICAgICB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSByZXR1cm4gZmFsc2VcclxufSkoKVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbnZhciAkdmlkZW8gPSB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvXHJcbnZhciAkYnRuUGxheVBhdXNlID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5QbGF5XHJcbnZhciAkc3ZnUGxheSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wbGF5JylcclxudmFyICRzdmdQYXVzZSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5wYXVzZScpXHJcbnZhciBjbGFzc0xpc3QgPSB3aW5kb3cudmlld2VyU3RhdGUuY2xhc3NMaXN0XHJcblxyXG5pZiAoJHZpZGVvLnBhdXNlZCl7XHJcbiAgICBjbGFzc0xpc3QuYWRkKCRzdmdQbGF5LCBcImFjdGl2ZVwiKVxyXG59IGVsc2Uge1xyXG4gICAgY2xhc3NMaXN0LmFkZCgkc3ZnUGF1c2UsIFwiYWN0aXZlXCIpXHJcbn0gXHJcbiRidG5QbGF5UGF1c2UuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbigpe1xyXG4gICAgaWYgKCR2aWRlby5wYXVzZWQpICR2aWRlby5wbGF5KCkgXHJcbiAgICBlbHNlICR2aWRlby5wYXVzZSgpXHJcbn0pXHJcbiR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwbGF5JywgZnVuY3Rpb24oKXtcclxuICAgICAgICBjbGFzc0xpc3QuYWRkKCRzdmdQYXVzZSwgXCJhY3RpdmVcIilcclxuICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRzdmdQbGF5LCBcImFjdGl2ZVwiKVxyXG59KVxyXG4kdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGF1c2UnLCBmdW5jdGlvbigpe1xyXG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJHN2Z1BsYXksIFwiYWN0aXZlXCIpXHJcbiAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgkc3ZnUGF1c2UsIFwiYWN0aXZlXCIpXHJcbn0pXHJcbiR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgICAgIGUucHJldmVudERlZmF1bHQoKVxyXG59KVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbnZhciAkYnRuUXVhbGl0eSA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuUXVhbGl0eVxyXG52YXIgJHN2Z1F1YWxpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19sZWZ0X19xdWFsaXR5IHN2ZycpXHJcbnZhciBjbGFzc0xpc3QgPSB3aW5kb3cudmlld2VyU3RhdGUuY2xhc3NMaXN0XHJcbnZhciBsaW5rID0gJydcclxuXHJcbnN0eWxlQnV0dG9uKClcclxuXHJcbiRidG5RdWFsaXR5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIGlmICh3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkpIHtcclxuICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkgPSBmYWxzZVxyXG4gICAgICAgIHN0eWxlQnV0dG9uKClcclxuICAgICAgICBpZiAod2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dCkge1xyXG4gICAgICAgICAgICBsaW5rID0gd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1scScpXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8ucGxheSgpXHJcbiAgICAgICAgfVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkgPSB0cnVlXHJcbiAgICAgICAgc3R5bGVCdXR0b24oKVxyXG4gICAgICAgIGlmICh3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0KSB7XHJcbiAgICAgICAgICAgIGxpbmsgPSB3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0LmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWhxJylcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLiR2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kc291cmNlLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLiR2aWRlby5wbGF5KClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pXHJcbndpbmRvdy52aWV3ZXJTdGF0ZS4kc2xpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICBpZihlLnRhcmdldC50YWdOYW1lID09PSAnSU5QVVQnKXtcclxuICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkgPSBmYWxzZVxyXG4gICAgICAgIHN0eWxlQnV0dG9uKClcclxuICAgICAgICBpZiAod2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dCkge1xyXG4gICAgICAgICAgICBsaW5rID0gd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1scScpXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8ucGxheSgpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KVxyXG5cclxuZnVuY3Rpb24gc3R5bGVCdXR0b24oKSB7XHJcbiAgICBpZiAod2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5KSB7XHJcbiAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgkc3ZnUXVhbGl0eSwgJ29mZicpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJHN2Z1F1YWxpdHksICdvZmYnKVxyXG4gICAgfVxyXG59IiwiJ3VzZSBzdHJpY3QnXHJcblxyXG4vLyAgICAgICAgICBTY2FsZVxyXG52YXIgJGJveCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYm94XHJcbnZhciAkdmlkZW8gPSB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvXHJcbnZhciAkYnRuU2NhbGUgPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0blNjYWxlXHJcbnZhciAkc3ZnU2NhbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NhbGVfYnRuX3N2ZycpXHJcbnZhciAkYnRuU2NhbGVTdWJCdG5zQm94ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fcmlnaHRfX3NjYWxlX3N1YmJ0bnMnKVxyXG52YXIgJHN1YkJ0blVwID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1YmJ0bl9fdXAgc3ZnJylcclxudmFyICRzdWJCdG5Eb3duID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1YmJ0bl9fZG93biBzdmcnKVxyXG52YXIgY2xhc3NMaXN0ID0gd2luZG93LnZpZXdlclN0YXRlLmNsYXNzTGlzdFxyXG52YXIgcmF0aW8gPSB1bmRlZmluZWRcclxudmFyIG1heCR2aWRlb0hlaWdodCA9IHVuZGVmaW5lZFxyXG52YXIgbWluJHZpZGVvSGVpZ2h0ID0gdW5kZWZpbmVkXHJcbnZhciBzdGVwID0gdW5kZWZpbmVkXHJcbnZhciBuID0gdW5kZWZpbmVkXHJcbnZhciBuTWF4ID0gMFxyXG52YXIgbk1pbiA9IDBcclxudmFyIGlkID0gdW5kZWZpbmVkXHJcbnZhciBhY3RpdmVJRCA9IHVuZGVmaW5lZFxyXG5cclxuJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2xvYWRlZGRhdGEnLCBzY2FsZVJlc3RhcnQpXHJcbiR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZ1bmN0aW9uICgpIHtcclxuICAgIGNsZWFyVGltZW91dChpZClcclxuICAgIHN0b3BTY2FsaW5nKClcclxuICAgIGNvbnNvbGUubG9nKCd2aWRlbyBlcnJvcicpXHJcbn0pXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Z1bGxzY3JlZW5jaGFuZ2UnLCBzY2FsZVJlc3RhcnQpXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnLCBzY2FsZVJlc3RhcnQpXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLCBzY2FsZVJlc3RhcnQpXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ01TRnVsbHNjcmVlbkNoYW5nZScsIHNjYWxlUmVzdGFydClcclxuXHJcbmZ1bmN0aW9uIHNjYWxlUmVzdGFydCgpIHtcclxuICAgIGNvbnNvbGUubG9nKCdSZXNjYWxlIHN0YXJ0OiAnICsgKERhdGUubm93KCkgLSB3aW5kb3cudmlld2VyU3RhdGUudGltZXJGb3JFcnJvclBhZ2UpKSAgICAgIFxyXG4gICAgc3RvcFNjYWxpbmcoKVxyXG4gICAgY2xlYXJUaW1lb3V0KGlkKVxyXG4gICAgaWQgPSBzZXRUaW1lb3V0KHN0YXJ0U2NhbGluZywgMTUwMClcclxufVxyXG5mdW5jdGlvbiBzdGFydFNjYWxpbmcoKSB7XHJcbiAgICByYXRpbyA9ICRib3guY2xpZW50V2lkdGggLyAkdmlkZW8ub2Zmc2V0V2lkdGhcclxuICAgIGlmKHJhdGlvIDw9IDEpIHtcclxuICAgICAgICBtaW4kdmlkZW9IZWlnaHQgPSAxMDAgKiByYXRpbyAgIC8vICAlXHJcbiAgICAgICAgbk1pbiA9IE1hdGguZmxvb3IoKG1pbiR2aWRlb0hlaWdodCAtIDEwMCkgLyAxNClcclxuICAgICAgICBuTWF4ID0gMFxyXG4gICAgICAgIHN0ZXAgPSAobWluJHZpZGVvSGVpZ2h0IC0gMTAwKSAvIG5NaW5cclxuICAgICAgICBjb25zb2xlLmxvZyhuTWluICsgJyBzdGVwcycpXHJcbiAgICAgICAgJHN1YkJ0bkRvd24uc3R5bGUuZmlsbCA9ICcnXHJcbiAgICAgICAgJHN1YkJ0blVwLnN0eWxlLmZpbGwgPSAncmdiYSgwLCAwLCAwLCAwLjUpJ1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBtYXgkdmlkZW9IZWlnaHQgPSAxMDAgKiByYXRpbyAgIC8vICAlXHJcbiAgICAgICAgbk1heCA9IE1hdGguY2VpbCgobWF4JHZpZGVvSGVpZ2h0IC0gMTAwKSAvIDE0KVxyXG4gICAgICAgIG5NaW4gPSAwXHJcbiAgICAgICAgc3RlcCA9IChtYXgkdmlkZW9IZWlnaHQgLSAxMDApIC8gbk1heFxyXG4gICAgICAgIGNvbnNvbGUubG9nKG5NYXggKyAnIHN0ZXBzJylcclxuICAgICAgICAkc3ViQnRuRG93bi5zdHlsZS5maWxsID0gJ3JnYmEoMCwgMCwgMCwgMC41KSdcclxuICAgICAgICAkc3ViQnRuVXAuc3R5bGUuZmlsbCA9ICcnXHJcbiAgICB9XHJcbiAgICBuID0gMFxyXG4gICAgJGJ0blNjYWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYnRuU2NhbGVIYW5kbGVyKSBcclxuICAgICRzdWJCdG5VcC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN1YkJ0blVwSGFuZGxlcikgXHJcbiAgICAkc3ViQnRuRG93bi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN1YkJ0bkRvd25IYW5kbGVyKSBcclxufVxyXG5mdW5jdGlvbiBzdG9wU2NhbGluZygpIHtcclxuICAgIHJhdGlvID0gdW5kZWZpbmVkXHJcbiAgICBtYXgkdmlkZW9IZWlnaHQgPSB1bmRlZmluZWRcclxuICAgIHN0ZXAgPSB1bmRlZmluZWRcclxuICAgIG4gPSB1bmRlZmluZWRcclxuICAgICR2aWRlby5zdHlsZS5oZWlnaHQgPSAnMTAwJSdcclxuICAgICRidG5TY2FsZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGJ0blNjYWxlSGFuZGxlcikgXHJcbiAgICAkc3ViQnRuVXAucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdWJCdG5VcEhhbmRsZXIpIFxyXG4gICAgJHN1YkJ0bkRvd24ucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdWJCdG5Eb3duSGFuZGxlcilcclxufVxyXG5mdW5jdGlvbiBidG5TY2FsZUhhbmRsZXIoZSl7XHJcbiAgICBpZihlLnRhcmdldCA9PT0gJGJ0blNjYWxlIHx8IGUudGFyZ2V0ID09PSAkc3ZnU2NhbGUpIHtcclxuICAgICAgICBpZihjbGFzc0xpc3QuY29udGFpbnMoJGJ0blNjYWxlU3ViQnRuc0JveCwgJ2FjdGl2ZScpKXtcclxuICAgICAgICAgICAgcmVtb3ZlQWN0aXZlKClcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjbGFzc0xpc3QuYWRkKCRidG5TY2FsZVN1YkJ0bnNCb3gsICdhY3RpdmUnKVxyXG4gICAgICAgICAgICBhY3RpdmVJRCA9IHNldFRpbWVvdXQocmVtb3ZlQWN0aXZlLCB3aW5kb3cudmlld2VyU3RhdGUuZHVyYXRpb25TY2FsZVN1Ym1lbnUpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHN1YkJ0blVwSGFuZGxlcigpe1xyXG4gICAgaWYobiA8IG5NYXgpIHtcclxuICAgICAgICAkdmlkZW8uc3R5bGUuaGVpZ2h0ID0gMTAwICsgKytuICogc3RlcCArICclJ1xyXG4gICAgICAgIGlmKG4gPT09IG5NYXgpICRzdWJCdG5VcC5zdHlsZS5maWxsID0gJ3JnYmEoMCwgMCwgMCwgMC41KSdcclxuICAgICAgICBpZihuID09PSAobk1pbiArIDEpKSAkc3ViQnRuRG93bi5zdHlsZS5maWxsID0gJydcclxuICAgICAgICBjbGVhclRpbWVvdXQoYWN0aXZlSUQpXHJcbiAgICAgICAgYWN0aXZlSUQgPSBzZXRUaW1lb3V0KHJlbW92ZUFjdGl2ZSwgd2luZG93LnZpZXdlclN0YXRlLmR1cmF0aW9uU2NhbGVTdWJtZW51KVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHN1YkJ0bkRvd25IYW5kbGVyKCl7XHJcbiAgICBpZihuID4gbk1pbikge1xyXG4gICAgICAgICR2aWRlby5zdHlsZS5oZWlnaHQgPSAxMDAgKyAtLW4gKiBzdGVwICsgJyUnXHJcbiAgICAgICAgaWYobiA9PT0gbk1pbikgJHN1YkJ0bkRvd24uc3R5bGUuZmlsbCA9ICdyZ2JhKDAsIDAsIDAsIDAuNSknXHJcbiAgICAgICAgaWYobiA9PT0gKG5NYXggLSAxKSkgJHN1YkJ0blVwLnN0eWxlLmZpbGwgPSAnJ1xyXG4gICAgICAgIGNsZWFyVGltZW91dChhY3RpdmVJRClcclxuICAgICAgICBhY3RpdmVJRCA9IHNldFRpbWVvdXQocmVtb3ZlQWN0aXZlLCB3aW5kb3cudmlld2VyU3RhdGUuZHVyYXRpb25TY2FsZVN1Ym1lbnUpXHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gcmVtb3ZlQWN0aXZlKCkge1xyXG4gICAgY2xhc3NMaXN0LnJlbW92ZSgkYnRuU2NhbGVTdWJCdG5zQm94LCAnYWN0aXZlJylcclxufVxyXG4vLyAkdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignbG9hZHN0YXJ0JywgZnVuY3Rpb24oKXtcclxuLy8gICAgIGNvbnNvbGUubG9nKCdUaGUgbG9hZHN0YXJ0IGV2ZW50IG9jY3VycyB3aGVuIHRoZSBicm93c2VyIHN0YXJ0cyBsb29raW5nIGZvciB0aGUgc3BlY2lmaWVkIGF1ZGlvL3ZpZGVvLiBUaGlzIGlzIHdoZW4gdGhlIGxvYWRpbmcgcHJvY2VzcyBzdGFydHMuJyArIChEYXRlLm5vdygpIC0gd2luZG93LnZpZXdlclN0YXRlLnRpbWVyRm9yRXJyb3JQYWdlKSlcclxuLy8gfSlcclxuLy8gJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2R1cmF0aW9uY2hhbmdlJywgZnVuY3Rpb24oKXtcclxuLy8gICAgIGNvbnNvbGUubG9nKCdUaGUgZHVyYXRpb25jaGFuZ2UgZXZlbnQgb2NjdXJzIHdoZW4gdGhlIGR1cmF0aW9uIGRhdGEgb2YgdGhlIHNwZWNpZmllZCBhdWRpby92aWRlbyBpcyBjaGFuZ2VkLicgKyAoRGF0ZS5ub3coKSAtIHdpbmRvdy52aWV3ZXJTdGF0ZS50aW1lckZvckVycm9yUGFnZSkpXHJcbi8vIH0pXHJcbi8vICR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRtZXRhZGF0YScsIGZ1bmN0aW9uKCl7XHJcbi8vICAgICBjb25zb2xlLmxvZygnVGhlIGxvYWRlZG1ldGFkYXRhIGV2ZW50IG9jY3VycyB3aGVuIG1ldGEgZGF0YSBmb3IgdGhlIHNwZWNpZmllZCBhdWRpby92aWRlbyBoYXMgYmVlbiBsb2FkZWQuJyArIChEYXRlLm5vdygpIC0gd2luZG93LnZpZXdlclN0YXRlLnRpbWVyRm9yRXJyb3JQYWdlKSlcclxuLy8gfSlcclxuXHJcbi8vICR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdsb2FkZWRkYXRhJywgZnVuY3Rpb24oKXtcclxuLy8gICAgIGNvbnNvbGUubG9nKCdUaGUgbG9hZGVkZGF0YSBldmVudCBvY2N1cnMgd2hlbiBkYXRhIGZvciB0aGUgY3VycmVudCBmcmFtZSBpcyBsb2FkZWQsIGJ1dCBub3QgZW5vdWdoIGRhdGEgdG8gcGxheSBuZXh0IGZyYW1lIG9mIHRoZSBzcGVjaWZpZWQgYXVkaW8vdmlkZW8uJyArIChEYXRlLm5vdygpIC0gd2luZG93LnZpZXdlclN0YXRlLnRpbWVyRm9yRXJyb3JQYWdlKSlcclxuLy8gfSlcclxuLy8gJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3Byb2dyZXNzJywgZnVuY3Rpb24oKXtcclxuLy8gICAgIGNvbnNvbGUubG9nKCdUaGUgcHJvZ3Jlc3MgZXZlbnQgb2NjdXJzIHdoZW4gdGhlIGJyb3dzZXIgaXMgZG93bmxvYWRpbmcgdGhlIHNwZWNpZmllZCBhdWRpby92aWRlby4nICsgKERhdGUubm93KCkgLSB3aW5kb3cudmlld2VyU3RhdGUudGltZXJGb3JFcnJvclBhZ2UpKVxyXG4vLyB9KVxyXG4vLyAkdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheScsIGZ1bmN0aW9uKCl7XHJcbi8vICAgICBjb25zb2xlLmxvZygnVGhlIGNhbnBsYXkgZXZlbnQgb2NjdXJzIHdoZW4gdGhlIGJyb3dzZXIgY2FuIHN0YXJ0IHBsYXlpbmcgdGhlIHNwZWNpZmllZCBhdWRpby92aWRlbyAod2hlbiBpdCBoYXMgYnVmZmVyZWQgZW5vdWdoIHRvIGJlZ2luKS4nICsgKERhdGUubm93KCkgLSB3aW5kb3cudmlld2VyU3RhdGUudGltZXJGb3JFcnJvclBhZ2UpKVxyXG4vLyB9KVxyXG4vLyAkdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignY2FucGxheXRocm91Z2gnLCBmdW5jdGlvbigpe1xyXG4vLyAgICAgY29uc29sZS5sb2coJ1RoZSBjYW5wbGF5dGhyb3VnaCBldmVudCBvY2N1cnMgd2hlbiB0aGUgYnJvd3NlciBlc3RpbWF0ZXMgaXQgY2FuIHBsYXkgdGhyb3VnaCB0aGUgc3BlY2lmaWVkIGF1ZGlvL3ZpZGVvIHdpdGhvdXQgaGF2aW5nIHRvIHN0b3AgZm9yIGJ1ZmZlcmluZy4nICsgKERhdGUubm93KCkgLSB3aW5kb3cudmlld2VyU3RhdGUudGltZXJGb3JFcnJvclBhZ2UpKVxyXG4vLyB9KVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbnZhciAkdmlkZW8gPSB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvXHJcbnZhciAkYnRuVm9sdW1lID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5Wb2x1bWVcclxudmFyICRzdmdWb2x1bWVPbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52b2x1bWVfb24nKVxyXG52YXIgJHN2Z1ZvbHVtZU9mZiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52b2x1bWVfb2ZmJylcclxudmFyIGNsYXNzTGlzdCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5jbGFzc0xpc3RcclxuXHJcbiRidG5Wb2x1bWUuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snXHJcblxyXG4kYnRuVm9sdW1lLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oKXtcclxuICAgIGlmICgkdmlkZW8ubXV0ZWQpe1xyXG4gICAgICAgICR2aWRlby5tdXRlZCA9IGZhbHNlXHJcbiAgICAgICAgJHZpZGVvLnZvbHVtZSA9IDEuMFxyXG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJHN2Z1ZvbHVtZU9uLCBcImFjdGl2ZVwiKVxyXG4gICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z1ZvbHVtZU9mZiwgXCJhY3RpdmVcIilcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJHZpZGVvLnZvbHVtZSA9IDAuMFxyXG4gICAgICAgICR2aWRlby5tdXRlZCA9IHRydWVcclxuICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRzdmdWb2x1bWVPbiwgXCJhY3RpdmVcIilcclxuICAgICAgICBjbGFzc0xpc3QuYWRkKCRzdmdWb2x1bWVPZmYsIFwiYWN0aXZlXCIpXHJcbiAgICB9IFxyXG59KVxyXG4iLCJcInVzZSBzdHJpY3RcIlxyXG5cclxudmFyICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW9cclxudmFyICRzb3VyY2UgPSB3aW5kb3cudmlld2VyU3RhdGUuJHNvdXJjZVxyXG52YXIgJHNsaWRlciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc2xpZGVyXHJcbnZhciAkYnRuTWVudU9uT2YgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19yaWdodF9fbWVudS1vZmYnKVxyXG52YXIgbGluayA9ICcnXHJcbnZhciAkYnRucyA9IHtcclxuICAgIFwiY2hfMWdvcm9kc2tveVwiOiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF8xZ29yb2Rza295XCIpLFxyXG4gICAgXCJjaF8zdHN5ZnJvdm95XCI6ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoXzN0c3lmcm92b3lcIiksXHJcbiAgICBcImNoX3JlcG9ydGVyXCI6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfcmVwb3J0ZXJcIiksXHJcbiAgICBcImNoX2FjYWRlbWlhXCI6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfYWNhZGVtaWFcIiksXHJcbiAgICBcImNoX2ExXCI6ICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfYTFcIiksXHJcbiAgICBcImNoX2R1bXNrYXlhXCI6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfZHVtc2theWFcIiksXHJcbiAgICBcImNoX2d0dlwiOiAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfZ3R2XCIpLFxyXG4gICAgXCJjaF9zdHZcIjogICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX3N0dlwiKSxcclxuICAgIFwiY2hfdWduYXlhdm9sbmFcIjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF91Z25heWF2b2xuYVwiKSxcclxuICAgIFwiY2hfbmVtb1wiOiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9uZW1vXCIpXHJcbn1cclxuJGJ0bnMuY2hfMWdvcm9kc2tveS5zZXRBdHRyaWJ1dGUoICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxLzF0dm9kLzF0dm9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgICAgKVxyXG4kYnRucy5jaF8zdHN5ZnJvdm95LnNldEF0dHJpYnV0ZSggICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly9jZG41LmxpdmUtdHYub2QudWE6ODA4MS90di8zdHZvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiICApXHJcbiRidG5zLmNoX3JlcG9ydGVyLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovL2NkbjQubGl2ZS10di5vZC51YTo4MDgxL3R2LzMxY2hvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiIClcclxuJGJ0bnMuY2hfYWNhZGVtaWEuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vY2RuNC5saXZlLXR2Lm9kLnVhOjgwODEvdHYvMzZjaG9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgKVxyXG4kYnRucy5jaF9hMS5zZXRBdHRyaWJ1dGUoICAgICAgICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvYTFvZC9hMW9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgICAgICApXHJcbiRidG5zLmNoX2R1bXNrYXlhLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzg6ODA4MS9kdW1za2EvZHVtc2thLWFici1scS9wbGF5bGlzdC5tM3U4XCIgIClcclxuJGJ0bnMuY2hfZ3R2LnNldEF0dHJpYnV0ZSggICAgICAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL2Exb2QvZ3R2b2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICAgKVxyXG4kYnRucy5jaF9zdHYuc2V0QXR0cmlidXRlKCAgICAgICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvc3R2b2Qvc3R2b2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICApXHJcbiRidG5zLmNoX3VnbmF5YXZvbG5hLnNldEF0dHJpYnV0ZSggJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS93YXZlL3dhdmUtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgICAgIClcclxuJGJ0bnMuY2hfbmVtby5zZXRBdHRyaWJ1dGUoICAgICAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL25lbW8vbW9yLXN1Yi9wbGF5bGlzdC5tM3U4XCIgICAgICAgICAgKVxyXG5cclxuJGJ0bnMuY2hfMWdvcm9kc2tveS5zZXRBdHRyaWJ1dGUoICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxLzF0dm9kLzF0dm9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgKVxyXG4kYnRucy5jaF8zdHN5ZnJvdm95LnNldEF0dHJpYnV0ZSggICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly9jZG41LmxpdmUtdHYub2QudWE6ODA4MS90di8zdHZvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgICApXHJcbiRidG5zLmNoX3JlcG9ydGVyLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovL2NkbjQubGl2ZS10di5vZC51YTo4MDgxL3R2LzMxY2hvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgIClcclxuJGJ0bnMuY2hfYWNhZGVtaWEuc2V0QXR0cmlidXRlKCAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vY2RuNC5saXZlLXR2Lm9kLnVhOjgwODEvdHYvMzZjaG9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgKVxyXG4kYnRucy5jaF9hMS5zZXRBdHRyaWJ1dGUoICAgICAgICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvYTFvZC9hMW9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgICApXHJcbiRidG5zLmNoX2R1bXNrYXlhLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzg6ODA4MS9kdW1za2EvZHVtc2thLWFici9wbGF5bGlzdC5tM3U4XCIgICAgIClcclxuJGJ0bnMuY2hfZ3R2LnNldEF0dHJpYnV0ZSggICAgICAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL2Exb2QvZ3R2b2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICAgKVxyXG4kYnRucy5jaF9zdHYuc2V0QXR0cmlidXRlKCAgICAgICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvc3R2b2Qvc3R2b2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICApXHJcbiRidG5zLmNoX3VnbmF5YXZvbG5hLnNldEF0dHJpYnV0ZSggJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS93YXZlL3dhdmUtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgICAgIClcclxuJGJ0bnMuY2hfbmVtby5zZXRBdHRyaWJ1dGUoICAgICAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL25lbW8vbW9yLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgICAgKVxyXG5cclxuJHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgLy9lLnN0b3BQcm9wYWdhdGlvbigpXHJcbiAgICBpZihlLnRhcmdldC50YWdOYW1lID09PSAnSU5QVVQnKXtcclxuICAgICAgICBpZih3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0ID09PSBlLnRhcmdldCkge1xyXG4gICAgICAgICAgICAkdmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmYWlsZWQpXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQuY2hlY2tlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQgPSBudWxsXHJcbiAgICAgICAgICAgICR2aWRlby5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9IFwiXCJcclxuICAgICAgICAgICAgJHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgJycpXHJcbiAgICAgICAgICAgICRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCAnJylcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLiRmb290ZXIubW92ZU91dCgpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dCA9IGUudGFyZ2V0XHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSkgIGxpbmsgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1ocScpXHJcbiAgICAgICAgICAgIGVsc2UgbGluayA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnZGF0YS1saW5rLWxxJylcclxuICAgICAgICAgICAgJHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgICAgICAgJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgICAgICAgICR2aWRlby5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9IFwiMCAwXCJcclxuICAgICAgICAgICAgaWYoJHZpZGVvLnBsYXkpICR2aWRlby5wbGF5KCk7XHJcbiAgICAgICAgICAgIGVsc2UgYWxlcnQgKCd2aWRlbyBjYW5ub3QgcGxheScpXHJcbiAgICAgICAgICAgIGlmKCF3aW5kb3cudmlld2VyU3RhdGUuJGZvb3Rlci5pc01vdmVkT24pIHdpbmRvdy52aWV3ZXJTdGF0ZS4kZm9vdGVyLm1vdmVPbigpXHJcbiAgICAgICAgICAgICR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZhaWxlZClcclxuICAgICAgICB9XHJcbiAgICB9XHJcbn0pXHJcblxyXG4gZnVuY3Rpb24gZmFpbGVkKGUpIHtcclxuICAgLy8gdmlkZW8gcGxheWJhY2sgZmFpbGVkIC0gc2hvdyBhIG1lc3NhZ2Ugc2F5aW5nIHdoeSAgICAgLSBmcm9tIGh0dHBzOi8vZGV2LnczLm9yZy9odG1sNS9zcGVjLWF1dGhvci12aWV3L3ZpZGVvLmh0bWwjdmlkZW9cclxuICAgc3dpdGNoIChlLnRhcmdldC5lcnJvci5jb2RlKSB7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfQUJPUlRFRDpcclxuICAgICAgIGFsZXJ0KCfQktC+0YHQv9GA0L7QuNC30LLQtdC00LXQvdC40LUg0LLQuNC00LXQviDQv9GA0LXRgNCy0LDQvdC+LicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfTkVUV09SSzpcclxuICAgICAgIGFsZXJ0KCfQntGI0LjQsdC60LAg0YHQtdGC0Lgg0L/RgNC40LLQtdC70LAg0Log0L3QsNGA0YPRiNC10L3QuNGOINC30LDQs9GA0YPQt9C60Lgg0LLQuNC00LXQvicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfREVDT0RFOlxyXG4gICAgICAgYWxlcnQoJ9CS0L7RgdC/0YDQvtC40LfQstC10LTQtdC90LjQtSDQstC40LTQtdC+INC/0YDQtdC60YDQsNGJ0LXQvdC+INC40Lct0LfQsCDQuNGB0LrQsNC20LXQvdC40Lkg0L/RgNC4INC/0LXRgNC10LTQsNGH0LUg0LjQu9C4INC/0L7RgtC+0LzRgywg0YfRgtC+INCy0LjQtNC10L4g0LjRgdC/0L7Qu9GM0LfRg9C10YIg0L3QtdC00L7RgdGC0YPQv9C90YvQtSDQsiDQktCw0YjQtdC8INCx0YDQsNGD0LfQtdGA0LUg0YTRg9C90LrRhtC40LguJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgICBjYXNlIGUudGFyZ2V0LmVycm9yLk1FRElBX0VSUl9TUkNfTk9UX1NVUFBPUlRFRDpcclxuICAgICAgIGFsZXJ0KCfQktC40LTQtdC+INC90LUg0LzQvtC20LXRgiDQsdGL0YLRjCDQt9Cw0LPRgNGD0LbQtdC90L4g0LjQty3Qt9CwINGB0LHQvtGPINCyINCyINC00L7RgdGC0YPQv9C1INC6INGB0LXRgNCy0LXRgNGDINC40LvQuCDRjdGC0L7RgiDQstC40LTQtdC+0YTQvtGA0LzQsNGCINC90LUg0L/QvtC00LTQtdGA0LbQuNCy0LDQtdGC0YHRjyDQktCw0YjQuNC8INCx0YDQsNGD0LfQtdGA0L7QvC4nKTtcclxuICAgICAgIGJyZWFrO1xyXG4gICAgIGRlZmF1bHQ6XHJcbiAgICAgICBhbGVydCgn0J/RgNC+0LjQt9C+0YjQu9CwINC+0YjQuNCx0LrQsC4g0J/QvtC/0YDQvtCx0YPQudGC0LUg0LXRidC1LicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgIH1cclxuIH1cclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICAnY29udGFpbnMnOiBmdW5jdGlvbihlbCwgY2xzKSB7XHJcbiAgICAgICAgaWYoZWwuY2xhc3NMaXN0KSByZXR1cm4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNscylcclxuICAgICAgICB2YXIgYXJyID0gZWwuZ2V0QXR0cmlidXRlKCdjbGFzcycpLnNwbGl0KCcgJylcclxuICAgICAgICBmb3IodmFyIGk9MDsgaTxhcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZihhcnJbaV0gPT0gY2xzKSByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH0sXHJcbiAgICAnYWRkJzogZnVuY3Rpb24oZWwsIGNscykge1xyXG4gICAgICAgIGlmKGVsLmNsYXNzTGlzdCkge1xyXG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKGNscylcclxuICAgICAgICAgICAgcmV0dXJuIFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZighd2luZG93LnZpZXdlclN0YXRlLmNsYXNzTGlzdC5jb250YWlucyhlbCwgY2xzKSl7XHJcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBlbC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgKyAnICcgKyBjbHMpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgICdyZW1vdmUnOiBmdW5jdGlvbihlbCwgY2xzKSB7XHJcbiAgICAgICAgaWYoZWwuY2xhc3NMaXN0KSB7XHJcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xzKVxyXG4gICAgICAgICAgICByZXR1cm4gXHJcbiAgICAgICAgfSBcclxuICAgICAgICB2YXIgYXJyID0gZWwuZ2V0QXR0cmlidXRlKCdjbGFzcycpLnNwbGl0KCcgJylcclxuICAgICAgICB2YXIgcmVtb3ZlZCA9ICcnXHJcbiAgICAgICAgZm9yKHZhciBpPTA7IGk8YXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoYXJyW2ldICE9IGNscykge1xyXG4gICAgICAgICAgICAgICAgcmVtb3ZlZCArPSBhcnJbaV0gKyAnICdcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgcmVtb3ZlZClcclxuICAgIH1cclxufSIsIid1c2Ugc3RyaWN0J1xuXG52YXIgJGJveCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYm94XG52YXIgJGJ0bkZ1bGxTY3IgPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0bkZ1bGxTY3JcbnZhciAkc3ZnRnVsbFNjck9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZ1bGxzY3Jfb24nKVxudmFyICRzdmdGdWxsU2NyT2ZmID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZ1bGxzY3Jfb2ZmJylcbnZhciAkYnRuTWVudU9mZiA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuTWVudU9mZlxudmFyICRzaWRlTWVudUJveCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc2lkZU1lbnVCb3hcbnZhciAkZm9vdGVyID0gd2luZG93LnZpZXdlclN0YXRlLiRmb290ZXJcbnZhciAkZm9vdGVyX19jZW50ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19jZW50ZXInKSBcbnZhciBkdXJhdGlvbkZvb3RlckFzQ3RybCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5kdXJhdGlvbkZvb3RlckFzQ3RybFxudmFyIGNsYXNzTGlzdCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5jbGFzc0xpc3RcbnZhciBpZCA9IHVuZGVmaW5lZFxuXG5pZiAoIHdpbmRvdy52aWV3ZXJTdGF0ZS5pc0Z1bGxTY3JlZW5BbGxvd2VkICkge1xuICAkYnRuTWVudU9mZi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICRidG5GdWxsU2NyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgIGJ0bkhhbmRsZXIoZSlcbiAgICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5hc2skYm94SW5GdWxsU2NyZWVuKCkpIHtcbiAgICAgICAgICBnZXRPZmZGdWxsc2NyZWVuKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZ29GdWxsU2NyZWVuKClcbiAgICAgIH1cbiAgfSlcbn0gZWxzZSBpZiAod2luZG93LnZpZXdlclN0YXRlLmlzX2lQYWRfaVBob25lICYmXG4gICAgICAgICAgICF3aW5kb3cudmlld2VyU3RhdGUuaXNfaVBhZF9pUGhvbmVfaW5GdWxsU2NyZWVuKSB7XG4gICRidG5GdWxsU2NyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIGFsZXJ0KCfQp9GC0L7QsdGLINC+0LHRgNC10YHRgtC4INC/0L7Qu9C90L7RjdC60YDQsNC90L3Ri9C5INGA0LXQttC40Lwg0L3QsNC00L4g0YHQtNC10LvQsNGC0Ywg0LLRgdC10LPQviDQvdC10YHQutC+0LvRjNC60L4g0YjQsNCz0L7QsjpcXG4nXG4gICAgICAgICsgJ9Co0LDQsyAxLiDQndCw0LbQvNC40YLQtSDQvdCwINC60L3QvtC/0LrRgyBcItCe0YLQv9GA0LDQstC40YLRjFwiICjQstGL0LPQu9GP0LTQuNGCINC60LDQuiDQutCy0LDQtNGA0LDRgiDRgdC+INGB0YLRgNC10LvQvtGH0LrQvtC5INCy0LLQtdGA0YUpINGB0L/RgNCw0LLQsCDQstCy0LXRgNGF0YMg0Y3QutGA0LDQvdCwINC4INCy0YvQsdC10YDQuNGC0LUg0L/Rg9C90LrRgjog0J3QsCDRjdC60YDQsNC9IMKr0JTQvtC80L7QucK7LlxcbidcbiAgICAgICAgKyAn0KjQsNCzIDIuINCj0LrQsNC20LjRgtC1INC20LXQu9Cw0LXQvNC+0LUg0L3QsNC30LLQsNC90LjQtSDQuCDQvdCw0LbQvNC40YLQtSBcItCU0L7QsdCw0LLQuNGC0YxcIi5cXG4nXG4gICAgICAgICsgJ9Cf0L7RgdC70LUg0L3QsNC20LDRgtC40Y8g0LrQvdC+0L/QutC4IFwi0JTQvtCx0LDQstC40YLRjFwiINCS0LDRgSDQv9C10YDQtdCx0YDQvtGB0LjRgiDQvdCwINGA0LDQsdC+0YfQuNC5INGB0YLQvtC7LCDQs9C00LUg0JLRiyDRgdC80L7QttC10YLQtSDRg9Cy0LjQtNC10YLRjCDRgdCy0LXQttC10YHQvtC30LTQsNC90L3Rg9GOINGB0YHRi9C70LrRgy5cXG4nXG4gICAgICAgICsgJ9CX0LDQudC00Y8g0L3QsCDRgdCw0LnRgiDQvdCw0LbQsNGC0LjQtdC8INC90LAg0Y3RgtGDINGB0YHRi9C70LrRgyDQktGLINCy0YHQtdCz0LTQsCDQsdGD0LTQtdGC0LUg0YHQvNC+0YLRgNC10YLRjCDQotCSINCyINC/0L7Qu9C90L7RjdC60YDQsNC90L3QvtC8INGA0LXQttC40LzQtS5cXG4nXG4gICAgICAgICsgJ9CU0LvRjyDRg9C00LDQu9C10L3QuNGPINGB0YHRi9C70LrQuCDQvdGD0LbQvdC+INC10LUg0L3QsNC20LDRgtGMINC4INC/0L7QtNC10YDQttCw0YLRjCwg0LfQsNGC0LXQvCDQvdCw0LbQsNGC0Ywg0LrRgNC10YHRgtC40Log0LIg0LvQtdCy0L7QvCDQstC10YDRhdC90LXQvCDRg9Cz0LvRgy4nKVxuICAgIH0pXG4gICAgY2xhc3NMaXN0LmFkZCgkc3ZnRnVsbFNjck9uLCAnb2ZmJylcbiAgICAkYnRuTWVudU9mZi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJ0bkhhbmRsZXIpXG59IGVsc2UgaWYgKHdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZV9pbkZ1bGxTY3JlZW4gfHxcbiAgICAgICAgICAgIXdpbmRvdy52aWV3ZXJTdGF0ZS5pc0Z1bGxTY3JlZW5BbGxvd2VkKSB7XG4gICAgJGJ0bkZ1bGxTY3Iuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICRidG5NZW51T2ZmLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgYnRuSGFuZGxlcilcbn1cblxuZnVuY3Rpb24gZ29GdWxsU2NyZWVuKCkge1xuICAgIGNsYXNzTGlzdC5hZGQoJHN2Z0Z1bGxTY3JPZmYsICdhY3RpdmUnKVxuICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z0Z1bGxTY3JPbiwgJ2FjdGl2ZScpXG4gICAgaWYgKCRib3gucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgJGJveC5yZXF1ZXN0RnVsbHNjcmVlbigpXG4gICAgfSBlbHNlIGlmICgkYm94Lm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XG4gICAgICAgICRib3gubW96UmVxdWVzdEZ1bGxTY3JlZW4oKVxuICAgIH0gZWxzZSBpZiAoJGJveC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAkYm94LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKClcbiAgICB9IGVsc2UgaWYgKCRib3gubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAkYm94Lm1zUmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgIH1cbn1cbmZ1bmN0aW9uIGdldE9mZkZ1bGxzY3JlZW4oKSB7XG4gIGNsYXNzTGlzdC5hZGQoJHN2Z0Z1bGxTY3JPbiwgJ2FjdGl2ZScpXG4gIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z0Z1bGxTY3JPZmYsICdhY3RpdmUnKVxuICBpZihkb2N1bWVudC5leGl0RnVsbHNjcmVlbikge1xuICAgIGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKCk7XG4gIH0gZWxzZSBpZihkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKSB7XG4gICAgZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbigpO1xuICB9IGVsc2UgaWYoZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4pIHtcbiAgICBkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbigpO1xuICB9ZWxzZSBpZiAoZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbikge1xuXHRkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKCk7XG4gIH1cbn1cbmZ1bmN0aW9uIGJ0bkhhbmRsZXIoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICBpZighd2luZG93LnZpZXdlclN0YXRlLmlzJHNpZGVNZW51Qm94SGlkZGVuICYmICF3aW5kb3cudmlld2VyU3RhdGUuaXMkZm9vdGVySGlkZGVuKSB7XG4gICAgICAgICRzaWRlTWVudUJveC5oaWRlKClcbiAgICAgICAgJGZvb3Rlci5oaWRlKClcbiAgICAgICAgJGJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJveEhhbmRsZXIpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgJHNpZGVNZW51Qm94LnNob3coKVxuICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRmb290ZXIub2JqZWN0LCAnY3RybCcpXG4gICAgICAgIGNsZWFyVGltZW91dChpZClcbiAgICAgICAgJGJveC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGJveEhhbmRsZXIpXG4gICAgICAgICRmb290ZXIub2JqZWN0LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZm9vdGVySGFuZGxlcilcbiAgICB9XG59XG5mdW5jdGlvbiBib3hIYW5kbGVyKGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgJGJveC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGJveEhhbmRsZXIpXG4gICAgc2hvd0N0cmwoKVxuICAgIGlkID0gc2V0VGltZW91dCggZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICBoaWRlQ3RybCgpXG4gICAgICAgICAgICAgJGJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGJveEhhbmRsZXIpXG4gICAgICAgICB9ICwgZHVyYXRpb25Gb290ZXJBc0N0cmwpXG59XG5mdW5jdGlvbiBmb290ZXJIYW5kbGVyKGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgY2xlYXJUaW1lb3V0KGlkKVxuICAgIGlkID0gc2V0VGltZW91dCggZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICBoaWRlQ3RybCgpXG4gICAgICAgICAgICAgJGZvb3Rlci5vYmplY3QucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmb290ZXJIYW5kbGVyKVxuICAgICAgICAgICAgICRib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBib3hIYW5kbGVyKVxuICAgICAgICAgfSAsIGR1cmF0aW9uRm9vdGVyQXNDdHJsKVxufVxuZnVuY3Rpb24gc2hvd0N0cmwoKSB7XG4gICAgJGZvb3Rlci5vYmplY3QuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmb290ZXJIYW5kbGVyKVxuICAgIGNsYXNzTGlzdC5hZGQoJGZvb3Rlci5vYmplY3QsICdjdHJsJylcbiAgICAkZm9vdGVyLnNob3coKVxufVxuZnVuY3Rpb24gaGlkZUN0cmwoKSB7XG4gICAgJGZvb3Rlci5vYmplY3QucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmb290ZXJIYW5kbGVyKVxuICAgICRmb290ZXIuaGlkZSgpXG4gICAgc2V0VGltZW91dChmdW5jdGlvbigpe1xuICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRmb290ZXIub2JqZWN0LCAnY3RybCcpXG4gICAgfSwgd2luZG93LnZpZXdlclN0YXRlLmR1cmF0aW9uU2hvd0hpZGVNZW51KVxufVxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZSA9IHtcclxuICAgICckYm94JzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJveCcpLFxyXG4gICAgJyR2aWRlbyc6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlbycpLFxyXG4gICAgJyRzb3VyY2UnOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc291cmNlJyksXHJcbiAgICAnJHNpZGVNZW51Qm94Jzoge1xyXG4gICAgICAgICdvYmplY3QnOiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpLFxyXG4gICAgICAgICdoaWRlJzogbnVsbCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgZnVuY3Rpb24gLT4gdm9pZFxyXG4gICAgICAgICdzaG93JzogbnVsbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgZnVuY3Rpb24gLT4gdm9pZFxyXG4gICAgfSxcclxuICAgICckc2xpZGVyJzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNpZGViYXJfX3NsaWRlcicpLFxyXG4gICAgJyRmb290ZXInOiB7XHJcbiAgICAgICAgJ29iamVjdCc6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXInKSxcclxuICAgICAgICAnaGlkZSc6IG51bGwsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGZ1bmN0aW9uIC0+IHZvaWRcclxuICAgICAgICAnc2hvdyc6IG51bGwsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGZ1bmN0aW9uIC0+IHZvaWRcclxuICAgICAgICAnbW92ZU9uJzogbnVsbCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGZ1bmN0aW9uIC0+IHZvaWRcclxuICAgICAgICAnbW92ZU91dCc6IG51bGwsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGZ1bmN0aW9uIC0+IHZvaWRcclxuICAgICAgICAnaXNNb3ZlZE9uJzogZmFsc2UgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGJvb2xlYW5cclxuICAgIH0sXHJcbiAgICAnJGJ0bkhlbHAnOiAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fbGVmdF9faGVscCcpLFxyXG4gICAgJyRidG5QbGF5JzogICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX2xlZnRfX3BsYXknKSxcclxuICAgICckYnRuVm9sdW1lJzogICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19sZWZ0X192b2x1bWUnKSxcclxuICAgICckYnRuUXVhbGl0eSc6ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19sZWZ0X19xdWFsaXR5JyksXHJcbiAgICAnJGJ0blNjYWxlJzogICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3Rlcl9fcmlnaHRfX3NjYWxlX2J0bicpLFxyXG4gICAgJyRidG5NZW51T2ZmJzogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX3JpZ2h0X19tZW51LW9mZicpLFxyXG4gICAgJyRidG5GdWxsU2NyJzogIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX3JpZ2h0X19mdWxsc2NyJyksXHJcbiAgICAnYWN0aXZlJGlucHV0JzogbnVsbCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBvYmplY3RcclxuICAgICdoaWdoUXVhbGl0eSc6IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGJvb2xlYW5cclxuICAgICdpcyRzaWRlTWVudUJveEhpZGRlbic6IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGJvb2xlYW5cclxuICAgICdpcyRmb290ZXJIaWRkZW4nOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGJvb2xlYW5cclxuICAgICdpc1ZpZGVvV29ya2luZyc6IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGJvb2xlYW5cclxuICAgICdpc0Z1bGxTY3JlZW5BbGxvd2VkJzogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGJvb2xlYW5cclxuICAgICdpc19pUGFkX2lQaG9uZSc6IC8oaVBob25lfGlQb2R8aVBhZCkuKkFwcGxlV2ViS2l0L2kudGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCksICAgLy8gIGJvb2xlYW5cclxuICAgICdpc19pUGFkX2lQaG9uZV9pbkZ1bGxTY3JlZW4nOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGJvb2xlYW5cclxuICAgICdhc2skYm94SW5GdWxsU2NyZWVuJzogbnVsbCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGZ1bmN0aW9uIC0+IGJvb2xlYW5cclxuICAgICdkdXJhdGlvblNob3dIaWRlTWVudSc6IDUwMCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIG1zXHJcbiAgICAnZHVyYXRpb25TY2FsZVN1Ym1lbnUnOiA0MDAwLFxyXG4gICAgJ2R1cmF0aW9uRm9vdGVyQXNDdHJsJzogNTAwMCxcclxuICAgICd0aW1lckZvckVycm9yUGFnZSc6IHVuZGVmaW5lZCxcclxuICAgICdjbGFzc0xpc3QnOiB7XHJcbiAgICAgICAgJ2NvbnRhaW5zJzogbnVsbCxcclxuICAgICAgICAnYWRkJzogbnVsbCxcclxuICAgICAgICAncmVtb3ZlJzogbnVsbFxyXG4gICAgIH1cclxuICB9O1xyXG5cclxuICB3aW5kb3cudmlld2VyU3RhdGUuaXNWaWRlb1dvcmtpbmcgPSByZXF1aXJlKCcuL2Fza1ZpZGVvV29ya2luZy5qcycpXHJcbiAgd2luZG93LnZpZXdlclN0YXRlLmlzRnVsbFNjcmVlbkFsbG93ZWQgPSByZXF1aXJlKCcuL2Fza0Z1bGxTY3JlZW4uanMnKVxyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZV9pbkZ1bGxTY3JlZW4gPSByZXF1aXJlKCcuL2Fza19pUGFkX2lQaG9uZV9GdWxsU2NyZWVuLmpzJylcclxuICB3aW5kb3cudmlld2VyU3RhdGUuYXNrJGJveEluRnVsbFNjcmVlbiA9IHJlcXVpcmUoJy4vYXNrJGJveEluRnVsbFNjcmVlbi5qcycpXHJcbiAgd2luZG93LnZpZXdlclN0YXRlLmNsYXNzTGlzdCA9IHJlcXVpcmUoJy4vY2xhc3NMaXN0LmpzJylcclxuICAgIFxyXG4gIHJlcXVpcmUoJy4vc2NyZWVuSGVpZ2h0LmpzJylcclxuICByZXF1aXJlKCcuL3NldE1lbnVBbmRGb290ZXJNZXRob2RzLmpzJylcclxuICBpZighd2luZG93LnZpZXdlclN0YXRlLmlzX2lQYWRfaVBob25lKSByZXF1aXJlKCcuL2J1dHRvblZvbHVtZS5qcycpXHJcbiAgLy8gICAgSW5pdCBjb21wbGV0ZWRcclxuICByZXF1aXJlKCcuL2NoYW5uZWxTZWxlY3Rvci5qcycpXHJcbiAgcmVxdWlyZSgnLi9mdWxsc2NyZWVuLmpzJylcclxuICByZXF1aXJlKCcuL2J1dHRvblF1YWxpdHkuanMnKVxyXG4gIHJlcXVpcmUoJy4vYnV0dG9uU2NhbGUuanMnKVxyXG4gIHJlcXVpcmUoJy4vYnV0dG9uUGxheVBhdXNlLmpzJylcclxuIC8vICAgICAgICAgICAgYWxlcnQoXCJJIGFtIGhlcmVcIilcclxuIH0iLCIndXNlIHN0cmljdCdcclxuXHJcbnNldEZvbnRTaXplKClcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHNldEZvbnRTaXplKVxyXG5mdW5jdGlvbiBzZXRGb250U2l6ZSgpIHtcclxuICAgIHZhciBmb250U2l6ZSA9IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0IC8gMjBcclxuICAgIGlmKGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0ID4gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCkge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuZm9udFNpemUgPSAwLjQgKiBmb250U2l6ZSArICdweCdcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5mb250U2l6ZSA9IGZvbnRTaXplICsgJ3B4J1xyXG4gICAgfVxyXG59IiwiJ3VzZSBzdHJpY3QnXHJcblxyXG4vLyBodHRwOi8vcGF1bGlyaXNoLmNvbS8yMDExL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtYW5pbWF0aW5nL1xyXG4vLyBodHRwOi8vbXkub3BlcmEuY29tL2Vtb2xsZXIvYmxvZy8yMDExLzEyLzIwL3JlcXVlc3RhbmltYXRpb25mcmFtZS1mb3Itc21hcnQtZXItYW5pbWF0aW5nXHJcblxyXG4vLyByZXF1ZXN0QW5pbWF0aW9uRnJhbWUgcG9seWZpbGwgYnkgRXJpayBNw7ZsbGVyLiBmaXhlcyBmcm9tIFBhdWwgSXJpc2ggYW5kIFRpbm8gWmlqZGVsXHJcblxyXG4vLyBNSVQgbGljZW5zZVxyXG5cclxudmFyIGxhc3RUaW1lID0gMDtcclxudmFyIHZlbmRvcnMgPSBbJ21zJywgJ21veicsICd3ZWJraXQnLCAnbyddO1xyXG5mb3IodmFyIHggPSAwOyB4IDwgdmVuZG9ycy5sZW5ndGggJiYgIXdpbmRvdy5yZXF1ZXN0QW5pbWF0aW9uRnJhbWU7ICsreCkge1xyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2ZW5kb3JzW3hdKydSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcclxuICAgIHdpbmRvdy5jYW5jZWxBbmltYXRpb25GcmFtZSA9IHdpbmRvd1t2ZW5kb3JzW3hdKydDYW5jZWxBbmltYXRpb25GcmFtZSddIFxyXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHx8IHdpbmRvd1t2ZW5kb3JzW3hdKydDYW5jZWxSZXF1ZXN0QW5pbWF0aW9uRnJhbWUnXTtcclxufVxyXG5cclxuaWYgKCF3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lKVxyXG4gICAgd2luZG93LnJlcXVlc3RBbmltYXRpb25GcmFtZSA9IGZ1bmN0aW9uKGNhbGxiYWNrLCBlbGVtZW50KSB7XHJcbiAgICAgICAgdmFyIGN1cnJUaW1lID0gbmV3IERhdGUoKS5nZXRUaW1lKCk7XHJcbiAgICAgICAgdmFyIHRpbWVUb0NhbGwgPSAzMjsgIC8vICAgIE1hdGgubWF4KDAsIDE2IC0gKGN1cnJUaW1lIC0gbGFzdFRpbWUpKTtcclxuICAgICAgICB2YXIgaWQgPSB3aW5kb3cuc2V0VGltZW91dChmdW5jdGlvbigpIHsgY2FsbGJhY2soY3VyclRpbWUgKyB0aW1lVG9DYWxsKTsgfSwgdGltZVRvQ2FsbCk7XHJcbiAgICAgICAgbGFzdFRpbWUgPSBjdXJyVGltZSArIHRpbWVUb0NhbGw7XHJcbiAgICAgICAgcmV0dXJuIGlkO1xyXG4gICAgfTtcclxuXHJcbmlmICghd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lKVxyXG4gICAgd2luZG93LmNhbmNlbEFuaW1hdGlvbkZyYW1lID0gZnVuY3Rpb24oaWQpIHtcclxuICAgICAgICBjbGVhclRpbWVvdXQoaWQpO1xyXG4gICAgfTtcclxuLy8gIEVuZCByRkEgcG9seWZpbGxcclxuXHJcbnZhciAkc2lkZU1lbnVCb3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJHNpZGVNZW51Qm94XHJcbnZhciAkZm9vdGVyID0gd2luZG93LnZpZXdlclN0YXRlLiRmb290ZXJcclxudmFyIGR1cmF0aW9uID0gd2luZG93LnZpZXdlclN0YXRlLmR1cmF0aW9uU2hvd0hpZGVNZW51XHJcblxyXG53aW5kb3cudmlld2VyU3RhdGUuJHNpZGVNZW51Qm94LmhpZGUgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGlkZSlcclxuICAgIGZ1bmN0aW9uIGhpZGUodGltZVN0YW1wKSB7XHJcbiAgICAgICAgaWYgKCFzdGFydFRpbWUpIHN0YXJ0VGltZSA9IHRpbWVTdGFtcFxyXG4gICAgICAgIHZhciBwcm9ncmVzcyA9ICh0aW1lU3RhbXAgLSBzdGFydFRpbWUpIC8gZHVyYXRpb25cclxuICAgICAgICBpZiAocHJvZ3Jlc3MgPD0gMSkge1xyXG4gICAgICAgICAgICAkc2lkZU1lbnVCb3gub2JqZWN0LnN0eWxlLm9wYWNpdHkgPSAxIC0gcHJvZ3Jlc3NcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhpZGUpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJHNpZGVNZW51Qm94Lm9iamVjdC5zdHlsZS5vcGFjaXR5ID0gMFxyXG4gICAgICAgICAgICAkc2lkZU1lbnVCb3gub2JqZWN0LnN0eWxlLnJpZ2h0ID0gJy01ZW0nXHJcbiAgICAgICAgICAgIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaXMkc2lkZU1lbnVCb3hIaWRkZW4gPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG53aW5kb3cudmlld2VyU3RhdGUuJHNpZGVNZW51Qm94LnNob3cgPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAkc2lkZU1lbnVCb3gub2JqZWN0LnN0eWxlLnJpZ2h0ID0gJydcclxuICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShzaG93KVxyXG4gICAgZnVuY3Rpb24gc2hvdyh0aW1lU3RhbXApIHtcclxuICAgICAgICBpZiAoIXN0YXJ0VGltZSkgc3RhcnRUaW1lID0gdGltZVN0YW1wXHJcbiAgICAgICAgdmFyIHByb2dyZXNzID0gKHRpbWVTdGFtcCAtIHN0YXJ0VGltZSkgLyBkdXJhdGlvblxyXG4gICAgICAgIGlmIChwcm9ncmVzcyA8PSAxKSB7XHJcbiAgICAgICAgICAgICRzaWRlTWVudUJveC5vYmplY3Quc3R5bGUub3BhY2l0eSA9IHByb2dyZXNzXHJcbiAgICAgICAgICAgIHJlcXVlc3RBbmltYXRpb25GcmFtZShzaG93KVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICRzaWRlTWVudUJveC5vYmplY3Quc3R5bGUub3BhY2l0eSA9IDFcclxuICAgICAgICAgICAgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5pcyRzaWRlTWVudUJveEhpZGRlbiA9IGZhbHNlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG53aW5kb3cudmlld2VyU3RhdGUuJGZvb3Rlci5oaWRlID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKGhpZGUpXHJcbiAgICBmdW5jdGlvbiBoaWRlKHRpbWVTdGFtcCkge1xyXG4gICAgICAgIGlmICghc3RhcnRUaW1lKSBzdGFydFRpbWUgPSB0aW1lU3RhbXBcclxuICAgICAgICB2YXIgcHJvZ3Jlc3MgPSAodGltZVN0YW1wIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uXHJcbiAgICAgICAgaWYgKHByb2dyZXNzIDw9IDEpIHtcclxuICAgICAgICAgICAgJGZvb3Rlci5vYmplY3Quc3R5bGUub3BhY2l0eSA9IDEgLSBwcm9ncmVzc1xyXG4gICAgICAgICAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoaGlkZSlcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkZm9vdGVyLm9iamVjdC5zdHlsZS5vcGFjaXR5ID0gMFxyXG4gICAgICAgICAgICAkZm9vdGVyLm9iamVjdC5zdHlsZS5ib3R0b20gPSAnLTE0JSdcclxuICAgICAgICAgICAgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5pcyRmb290ZXJIaWRkZW4gPSB0cnVlXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcblxyXG53aW5kb3cudmlld2VyU3RhdGUuJGZvb3Rlci5zaG93ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgJGZvb3Rlci5vYmplY3Quc3R5bGUuYm90dG9tID0gJzAnXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUoc2hvdylcclxuICAgIGZ1bmN0aW9uIHNob3codGltZVN0YW1wKSB7XHJcbiAgICAgICAgaWYgKCFzdGFydFRpbWUpIHN0YXJ0VGltZSA9IHRpbWVTdGFtcFxyXG4gICAgICAgIHZhciBwcm9ncmVzcyA9ICh0aW1lU3RhbXAgLSBzdGFydFRpbWUpIC8gZHVyYXRpb25cclxuICAgICAgICBpZiAocHJvZ3Jlc3MgPD0gMSkge1xyXG4gICAgICAgICAgICAkZm9vdGVyLm9iamVjdC5zdHlsZS5vcGFjaXR5ID0gcHJvZ3Jlc3NcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKHNob3cpXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJGZvb3Rlci5vYmplY3Quc3R5bGUub3BhY2l0eSA9IDFcclxuICAgICAgICAgICAgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5pcyRmb290ZXJIaWRkZW4gPSBmYWxzZVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG53aW5kb3cudmlld2VyU3RhdGUuJGZvb3Rlci5tb3ZlT24gPSBmdW5jdGlvbiAoKSB7XHJcbiAgICB2YXIgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAkZm9vdGVyLm9iamVjdC5zdHlsZS5ib3R0b20gPSAnLTE0JSdcclxuICAgICRzaWRlTWVudUJveC5vYmplY3Quc3R5bGUuaGVpZ2h0ID0gJzEwMCUnXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobW92ZU9uKVxyXG4gICAgZnVuY3Rpb24gbW92ZU9uKHRpbWVTdGFtcCkge1xyXG4gICAgICAgIGlmICghc3RhcnRUaW1lKSBzdGFydFRpbWUgPSB0aW1lU3RhbXBcclxuICAgICAgICB2YXIgcHJvZ3Jlc3MgPSAodGltZVN0YW1wIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uXHJcbiAgICAgICAgaWYgKHByb2dyZXNzIDw9IDEpIHtcclxuICAgICAgICAgICAgJGZvb3Rlci5vYmplY3Quc3R5bGUuYm90dG9tID0gLTE0ICsgMTQgKiBwcm9ncmVzcyArICclJ1xyXG4gICAgICAgICAgICAkc2lkZU1lbnVCb3gub2JqZWN0LnN0eWxlLmhlaWdodCA9IDEwMCAtIDE0ICogcHJvZ3Jlc3MgKyAnJSdcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1vdmVPbilcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkZm9vdGVyLm9iamVjdC5zdHlsZS5ib3R0b20gPSAnMCdcclxuICAgICAgICAgICAgJHNpZGVNZW51Qm94Lm9iamVjdC5zdHlsZS5oZWlnaHQgPSAnODYlJ1xyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuJGZvb3Rlci5pc01vdmVkT24gPSB0cnVlXHJcbiAgICAgICAgICAgIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgICAgIH1cclxuICAgIH1cclxufVxyXG53aW5kb3cudmlld2VyU3RhdGUuJGZvb3Rlci5tb3ZlT3V0ID0gZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyIHN0YXJ0VGltZSA9IHVuZGVmaW5lZFxyXG4gICAgJGZvb3Rlci5vYmplY3Quc3R5bGUuYm90dG9tID0gJzAnXHJcbiAgICAkc2lkZU1lbnVCb3gub2JqZWN0LnN0eWxlLmhlaWdodCA9ICc4NiUnXHJcbiAgICByZXF1ZXN0QW5pbWF0aW9uRnJhbWUobW92ZU9uKVxyXG4gICAgZnVuY3Rpb24gbW92ZU9uKHRpbWVTdGFtcCkge1xyXG4gICAgICAgIGlmICghc3RhcnRUaW1lKSBzdGFydFRpbWUgPSB0aW1lU3RhbXBcclxuICAgICAgICB2YXIgcHJvZ3Jlc3MgPSAodGltZVN0YW1wIC0gc3RhcnRUaW1lKSAvIGR1cmF0aW9uXHJcbiAgICAgICAgaWYgKHByb2dyZXNzIDw9IDEpIHtcclxuICAgICAgICAgICAgJGZvb3Rlci5vYmplY3Quc3R5bGUuYm90dG9tID0gLTE0ICogcHJvZ3Jlc3MgKyAnJSdcclxuICAgICAgICAgICAgJHNpZGVNZW51Qm94Lm9iamVjdC5zdHlsZS5oZWlnaHQgPSA4NiArIDE0ICogcHJvZ3Jlc3MgKyAnJSdcclxuICAgICAgICAgICAgcmVxdWVzdEFuaW1hdGlvbkZyYW1lKG1vdmVPbilcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAkZm9vdGVyLm9iamVjdC5zdHlsZS5ib3R0b20gPSAnLTE0JSdcclxuICAgICAgICAgICAgJHNpZGVNZW51Qm94Lm9iamVjdC5zdHlsZS5oZWlnaHQgPSAnMTAwJSdcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLiRmb290ZXIuaXNNb3ZlZE9uID0gZmFsc2VcclxuICAgICAgICAgICAgc3RhcnRUaW1lID0gdW5kZWZpbmVkXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59XHJcbiJdfQ==
