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

var $sideMenuBox = window.viewerState.$sideMenuBox,
    $slider = window.viewerState.$slider,
    $banner = document.querySelector('.footer__center__banner'),
    oReq = new XMLHttpRequest(),
    attempt = 0,
    channelList = [],
    chName = '',
    style = document.createElement('style'),
    input = null,
    label = null
style.type = 'text/css'
window.viewerState.chList = {}

oReq.addEventListener("load", processChList)
oReq.addEventListener("error", tryAgain)
oReq.addEventListener("abort", tryAgain)
oReq.open("GET", "./channels.json")
oReq.send()

function tryAgain(e) {
    console.log(e)
    if(attempt < 3) oReq.send()
}
function processChList () {
    channelList = JSON.parse(this.responseText)
    for(var i=0; i<channelList.length; i++){
        if (channelList[i].name === 'banner') {
            $banner.textContent = channelList[i].text
        } else {
            chName = 'ch_' + channelList[i].name
            window.viewerState.chList[chName] = {}
            window.viewerState.chList[chName].lq = channelList[i].lq
            window.viewerState.chList[chName].hq = channelList[i].hq

            input = document.createElement('input')
            input.type = 'radio'
            input.setAttribute('id', chName)
            input.setAttribute('name', 'ch-selector')
            $slider.appendChild(input)

            label = document.createElement('label')
            label.setAttribute('class', 'sidebar__slider__button ' + chName)
            label.setAttribute('for', chName)
            $slider.appendChild(label)

            style.innerHTML += '.sidebar__slider__button.' + chName 
                + ' {background-position: ' + channelList[i].icon_x_position_bw + 'em '
                + channelList[i].icon_y_position + 'em, left;}\n'
            style.innerHTML += '#' + chName + ':checked + label.sidebar__slider__button'
                + ' {background-position: ' + channelList[i].icon_x_position_color + 'em '
                + channelList[i].icon_y_position + 'em, left;}\n'
        }
    }
    document.getElementsByTagName('head')[0].appendChild(style);
    $sideMenuBox.style.visibility = ''
}

},{}],3:[function(require,module,exports){
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

},{}],4:[function(require,module,exports){
'use strict'

module.exports = (function() {
    var userAgent = window.navigator.userAgent.toLowerCase()
    var safari = /safari/.test( userAgent )
    if(window.viewerState.is_iPad_iPhone && window.innerHeight >= window.screen.availHeight) {
        return true
    } else if (window.viewerState.is_iPad_iPhone && !safari) {
        //   Phonegap
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

$btnPlayFooter.addEventListener('click', togglePlayPause)
$btnPlayCtrl.addEventListener('click', togglePlayPause)
$video.addEventListener('click', function(e){
        e.preventDefault()
})
function togglePlayPause(){
    if ($video.paused) {
        $video.play()
        setIconsPause()
    } 
    else {
        $video.pause()
        setIconsPlay()
    }
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
    var ch = window.viewerState.active$input.getAttribute('id')
    if (window.viewerState.highQuality) {
        window.viewerState.highQuality = false
        link = window.viewerState.chList[ch].lq
    } else {
        window.viewerState.highQuality = true
        link = window.viewerState.chList[ch].hq
    }
    if(window.hls){
        window.hls.destroy()
        window.hls = new window.Hls();
        window.hls.attachMedia(window.viewerState.$video);
        window.hls.on(window.Hls.Events.MEDIA_ATTACHED,function() {
            // console.log("video and window.hls.js are now bound together !");
            window.hls.loadSource(link);
            // window.hls.on(window.Hls.Events.MANIFEST_PARSED, function(event,data) {
            //     for(var i=0; i<window.hls.levels.length; i++){
            //         console.log( i + '\tbitrate:' + window.hls.levels[i].bitrate + '\th:' + window.hls.levels[i].height + '\tw:' + window.hls.levels[i].width + '\n')
            //     }
            // })
        });
    } else {
        $video.setAttribute('src', link)
        $source.setAttribute('src', link)
    }
    $video.play()
    styleQualityButton()
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
    $btnScale = window.viewerState.$btnScale,
    $svgScale = document.querySelector('.scale_box__btn_icon'),
    $btnMenuOff = window.viewerState.$btnMenuOff,
    $btnMenuOn = window.viewerState.$btnMenuOn,
    classList = window.viewerState.classList,
    scaledHorisontally = false

classList.add($svgScale, 'disabled')

$video.addEventListener('playing', init)
$btnMenuOff.addEventListener('click', scaleBtnOn)
$btnMenuOn.addEventListener('click', scaleBtnOff)
document.addEventListener('fullscreenchange', fullScreenChange)
document.addEventListener('webkitfullscreenchange', fullScreenChange)
document.addEventListener('mozfullscreenchange', fullScreenChange)
document.addEventListener('MSFullscreenChange', fullScreenChange)

function init(){
    setTimeout(scaleHorisontally, 300)
}
function scaleHorisontally() {
    // console.log('$box.clientWidth: ' + $box.clientWidth
    // + '\n$video.videoHeight: ' + $video.videoHeight
    // + '\n$video.videoWidth: ' + $video.videoWidth)
    $video.style.width = $box.clientWidth + 'px'
    $video.style.height = $box.clientWidth * $video.videoHeight / $video.videoWidth + 'px'
    scaledHorisontally = true
    // console.log('screen: ' + $box.clientWidth + 'x' + $box.clientHeight + "\n"
    //             + 'video: ' + $box.clientWidth + 'x' + $box.clientWidth * $video.videoHeight / $video.videoWidth + '\n')
}
function scaleVertically() {
    $video.style.width = $box.clientHeight * $video.videoWidth / $video.videoHeight + 'px'
    $video.style.height = $box.clientHeight + 'px'
    scaledHorisontally = false
    // console.log('screen: ' + $box.clientWidth + 'x' + $box.clientHeight + "\n"
    //             + 'video: ' + $box.clientHeight * $video.videoWidth / $video.videoHeight + 'x' + $box.clientHeight + '\n')
}

function fullScreenChange() {
    if(window.viewerState.ask$boxInFullScreen()){
        scaleBtnOn()
    } else {
        scaleBtnOff()
    }
    setTimeout(scaleHorisontally, 300)
}
function scaleBtnOn() {
    setTimeout(function () {
        if ($box.clientWidth !== $video.offsetWidth || $box.clientHeight !== $video.offsetHeight) {
            $btnScale.addEventListener('click', toggleScreenAlign)
            classList.remove($svgScale, 'disabled')
        } else classList.add($svgScale, 'disabled')
    }, 300)
}
function scaleBtnOff() {
    $btnScale.removeEventListener('click', toggleScreenAlign)
    classList.add($svgScale, 'disabled')
    setTimeout(scaleHorisontally, 300)
}
function toggleScreenAlign() {
    if(scaledHorisontally){
        scaleVertically()
    } else {
        scaleHorisontally()
    }
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
    $box = window.viewerState.$box,
    classList = window.viewerState.classList,
    link = ''
window.Hls = null
window.hls = null

$slider.addEventListener('click', function(e){
    var ch = ''
    if(e.target.tagName === 'INPUT'){
        if(window.viewerState.active$input === e.target) {
            window.viewerState.active$input.checked = false
            window.viewerState.active$input = null
            if(window.Hls && window.Hls.isSupported()) {
                window.hls.destroy()
            } else {
                // $video.pause()
                $video.removeAttribute('src')
                $source.removeAttribute('src')
            }
            classList.remove($video, 'active')
            classList.remove($box, 'show_footer')
            $video.removeEventListener('error', failed)
            $video.load()
        } else {
            window.viewerState.active$input = e.target
            ch = e.target.getAttribute('id')
            link = window.viewerState.chList[ch].lq
            window.viewerState.highQuality = false
            if(window.Hls && window.Hls.isSupported()) {
                showVideoViaHls()
            } else {
                $video.setAttribute('src', link)
                $source.setAttribute('src', link)
            }
            classList.add($video, 'active')
            $video.addEventListener('error', failed)
            if($video.play) $video.play();
            else alert ('video cannot play')
            classList.add($box, 'show_footer')
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
       if (window.Hls && window.Hls.isSupported()){
           alert('Видео не может быть загружено из-за сбоя в в доступе к серверу или этот видеоформат не поддерживается Вашим браузером.');
       } else {
           loadHls()
       }
       break;
     default:
       alert('Произошла ошибка. Попробуйте еще.');
       break;
   }
}
function loadHls(){
    $video.removeEventListener('error', failed)
    var script = document.createElement("script")
    script.type = "text/javascript"
    if (script.readyState){  //IE
        script.onreadystatechange = function(){
            if (script.readyState == "loaded" ||
                    script.readyState == "complete"){
                script.onreadystatechange = null;
                runHls()
            }
        };
    } else {  //Others
        script.onload = function(){
            runHls()
        }
    }
    script.src = './js/hls.min.js'
    document.getElementsByTagName("head")[0].appendChild(script)
}
function runHls() {
    $video.setAttribute('src', '')
    $source.setAttribute('src', '')
    showVideoViaHls()
    if($video.play) $video.play()
    else alert ('video cannot play')

    window.hls.on(window.Hls.Events.ERROR,function(event,data) {
        if(data.fatal) {
            switch(data.type) {
                case window.Hls.ErrorTypes.NETWORK_ERROR:
                // try to recover network error
                    console.log("fatal network error encountered, try to recover");
                    window.hls.startLoad();
                    break;
                case window.Hls.ErrorTypes.MEDIA_ERROR:
                    console.log("fatal media error encountered, try to recover");
                    window.hls.recoverMediaError();
                    break;
                default:
                // cannot recover
                    window.hls.destroy();
                    break;
            }
        }
    })
}
function showVideoViaHls(){
    if(window.hls) window.hls.destroy()
    window.hls = new window.Hls();
    window.hls.attachMedia(window.viewerState.$video);
    window.hls.on(window.Hls.Events.MEDIA_ATTACHED,function() {
        window.hls.loadSource(link);
        // window.hls.on(window.Hls.Events.MANIFEST_PARSED, function(event,data) {
        //     for(var i=0; i<window.hls.levels.length; i++){
        //         console.log( i + '\tbitrate:' + window.hls.levels[i].bitrate + '\th:' + window.hls.levels[i].height + '\tw:' + window.hls.levels[i].width + '\n')
        //     }
        // })
    });
}
},{}],10:[function(require,module,exports){
'use strict'

//  polyfill for element.classList 
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
    $box = window.viewerState.$box,
    $control = window.viewerState.$control,
    $body = document.querySelector('body'),
    $svgFullScrOn = document.querySelector('.btn__fullscr.on'),
    durationCtrlVisible = window.viewerState.durationCtrlVisible,
    classList = window.viewerState.classList,
    is$bodyHeightChanged = false,
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
        + 'Шаг 2. Укажите желаемое название (например "Одесское ТВ") и нажмите "Добавить".\n'
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

document.addEventListener("fullscreenchange",       fsHandler)
document.addEventListener("webkitfullscreenchange", fsHandler)
document.addEventListener("mozfullscreenchange",    fsHandler)
document.addEventListener("MSFullscreenChange",     fsHandler)

function fsHandler() {
    if (window.viewerState.ask$boxInFullScreen()) {
        if($body.clientHeight < window.screen.availHeight){
            $body.style.height = window.screen.availHeight + 'px'
            is$bodyHeightChanged = true
        }
        startWatchMode()
    } else {
        if(is$bodyHeightChanged){
            $body.style.height = ''
            is$bodyHeightChanged = false
        }
        leaveWatchMode()
    }
}
function goFullScreen() {
         if ($box.requestFullscreen)        $box.requestFullscreen()
    else if ($box.mozRequestFullScreen)     $box.mozRequestFullScreen()
    else if ($box.webkitRequestFullscreen)  $box.webkitRequestFullscreen()
    else if ($box.msRequestFullscreen)      $box.msRequestFullscreen()
}
function getOffFullscreen() {
       if (document.exitFullscreen)         document.exitFullscreen()
  else if (document.mozCancelFullScreen)    document.mozCancelFullScreen()
  else if (document.webkitExitFullscreen)   document.webkitExitFullscreen()
  else if (document.msExitFullscreen)       document.msExitFullscreen()
}
function startWatchMode(e) {
    classList.add($box, 'hide_menu')
    $box.addEventListener('click', screenClickHandler)
    $control.addEventListener('click', controlClickHandler)
}
function leaveWatchMode(e) {
    clearTimeout(id)
    classList.remove($control, 'show_control')
    $control.removeEventListener('click', controlClickHandler)
    $box.removeEventListener('click', screenClickHandler)
    classList.remove($box, 'hide_menu')
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
    'isFullScreenAllowed': false,                                       //  boolean
    'is_iPad_iPhone': /(iPhone|iPod|iPad).*AppleWebKit/i.test(window.navigator.userAgent),   //  boolean
    'is_iPad_iPhone_inFullScreen': false,                               //  boolean
    'ask$boxInFullScreen': null,                                        //  function -> boolean
    'highQuality': false,                                               //  boolean
    'durationCtrlVisible': 5000,                                        //  ms
    'classList': {
        'contains': null,                                               //  function -> boolean
        'add': null,                                                    //  function -> void
        'remove': null                                                  //  function -> void
     }
  };

  require('./askChannelList.js')
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
},{"./ask$boxInFullScreen.js":1,"./askChannelList.js":2,"./askFullScreen.js":3,"./ask_iPad_iPhone_FullScreen.js":4,"./buttonPlayPause.js":5,"./buttonQuality.js":6,"./buttonScale.js":7,"./buttonVolume.js":8,"./channelSelector.js":9,"./classList.js":10,"./fullscreenOrHideMenu.js":11,"./screenHeight.js":13}],13:[function(require,module,exports){
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
},{}]},{},[12]);
