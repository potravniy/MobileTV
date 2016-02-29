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
            console.log("video and window.hls.js are now bound together !");
            window.hls.loadSource(link);
            window.hls.on(window.Hls.Events.MANIFEST_PARSED, function(event,data) {
                for(var i=0; i<window.hls.levels.length; i++){
                    console.log( i + '\tbitrate:' + window.hls.levels[i].bitrate + '\th:' + window.hls.levels[i].height + '\tw:' + window.hls.levels[i].width + '\n')
                }
            })
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
    $btnScaleSubBtnsBox = document.querySelector('.scale_box__subbtns'),
    $subBtnUp = window.viewerState.$subBtnUp,
    $subBtnDown = window.viewerState.$subBtnDown,
    $subBtnUpIcon = document.querySelector('.subbtn_up'),
    $subBtnDownIcon = document.querySelector('.subbtn_down'),
    $btnMenuOff = window.viewerState.$btnMenuOff,
    $btnMenuOn = window.viewerState.$btnMenuOn,
    classList = window.viewerState.classList,
    init$videoHeight = undefined,
    init$videoWidth = undefined,
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
    console.log('$box.clientWidth: ' + $box.clientWidth
    + '\n$video.videoHeight: ' + $video.videoHeight
    + '\n$video.videoWidth: ' + $video.videoWidth)
    $video.style.width = $box.clientWidth + 'px'
    $video.style.height = $box.clientWidth * $video.videoHeight / $video.videoWidth + 'px'
    scaledHorisontally = true
    console.log('screen: ' + $box.clientWidth + 'x' + $box.clientHeight + "\n"
                + 'video: ' + $box.clientWidth + 'x' + $box.clientWidth * $video.videoHeight / $video.videoWidth + '\n')
}
function scaleVertically() {
    $video.style.width = $box.clientHeight * $video.videoWidth / $video.videoHeight + 'px'
    $video.style.height = $box.clientHeight + 'px'
    scaledHorisontally = false
    console.log('screen: ' + $box.clientWidth + 'x' + $box.clientHeight + "\n"
                + 'video: ' + $box.clientHeight * $video.videoWidth / $video.videoHeight + 'x' + $box.clientHeight + '\n')
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
            console.log('hls loaded ' + Date.now())
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
        window.hls.on(window.Hls.Events.MANIFEST_PARSED, function(event,data) {
            for(var i=0; i<window.hls.levels.length; i++){
                console.log( i + '\tbitrate:' + window.hls.levels[i].bitrate + '\th:' + window.hls.levels[i].height + '\tw:' + window.hls.levels[i].width + '\n')
            }
        })
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
        console.log('$body.clientHeight: '+$body.clientHeight
        + '\nwindow.screen.availHeight: '+window.screen.availHeight
        + '\nwindow.outerHeight: ' + window.outerHeight)
        if($body.clientHeight < window.screen.availHeight){
            $body.style.height = window.screen.availHeight + 'px'
            is$bodyHeightChanged = true
            console.log('$body.clientHeight: '+$body.clientHeight
            + '\nwindow.screen.availHeight: '+window.screen.availHeight
            + '\nwindow.outerHeight: ' + window.outerHeight)
            // if(window.outerHeight && $body.clientHeight > window.outerHeight) {
            //     $body.style.height = window.outerHeight + 'px'
            // }
        }
        // console.log('$body.clientHeight: '+$body.clientHeight
        // + '\nwindow.screen.availHeight: '+window.screen.availHeight
        // + '\nwindow.outerHeight: ' + window.outerHeight)
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
},{}]},{},[12])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2EwNS9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hc2skYm94SW5GdWxsU2NyZWVuLmpzIiwianMvYXNrQ2hhbm5lbExpc3QuanMiLCJqcy9hc2tGdWxsU2NyZWVuLmpzIiwianMvYXNrX2lQYWRfaVBob25lX0Z1bGxTY3JlZW4uanMiLCJqcy9idXR0b25QbGF5UGF1c2UuanMiLCJqcy9idXR0b25RdWFsaXR5LmpzIiwianMvYnV0dG9uU2NhbGUuanMiLCJqcy9idXR0b25Wb2x1bWUuanMiLCJqcy9jaGFubmVsU2VsZWN0b3IuanMiLCJqcy9jbGFzc0xpc3QuanMiLCJqcy9mdWxsc2NyZWVuT3JIaWRlTWVudS5qcyIsImpzL21haW4uanMiLCJqcy9zY3JlZW5IZWlnaHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUM3RUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcElBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3BIQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSIsImZpbGUiOiJnZW5lcmF0ZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlc0NvbnRlbnQiOlsiKGZ1bmN0aW9uIGUodCxuLHIpe2Z1bmN0aW9uIHMobyx1KXtpZighbltvXSl7aWYoIXRbb10pe3ZhciBhPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7aWYoIXUmJmEpcmV0dXJuIGEobywhMCk7aWYoaSlyZXR1cm4gaShvLCEwKTt2YXIgZj1uZXcgRXJyb3IoXCJDYW5ub3QgZmluZCBtb2R1bGUgJ1wiK28rXCInXCIpO3Rocm93IGYuY29kZT1cIk1PRFVMRV9OT1RfRk9VTkRcIixmfXZhciBsPW5bb109e2V4cG9ydHM6e319O3Rbb11bMF0uY2FsbChsLmV4cG9ydHMsZnVuY3Rpb24oZSl7dmFyIG49dFtvXVsxXVtlXTtyZXR1cm4gcyhuP246ZSl9LGwsbC5leHBvcnRzLGUsdCxuLHIpfXJldHVybiBuW29dLmV4cG9ydHN9dmFyIGk9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtmb3IodmFyIG89MDtvPHIubGVuZ3RoO28rKylzKHJbb10pO3JldHVybiBzfSkiLCIndXNlIHN0cmljdCdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gZnVuY3Rpb24oKSB7XHJcbiAgICBpZiAoZG9jdW1lbnQuZnVsbHNjcmVlbkVsZW1lbnQgfHwgXHJcbiAgICAgICAgZG9jdW1lbnQud2Via2l0RnVsbHNjcmVlbkVsZW1lbnQgfHxcclxuICAgICAgICBkb2N1bWVudC5tb3pGdWxsU2NyZWVuRWxlbWVudCB8fFxyXG4gICAgICAgIGRvY3VtZW50Lm1zRnVsbHNjcmVlbkVsZW1lbnQgfHxcclxuICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaXNfaVBhZF9pUGhvbmVfaW5GdWxsU2NyZWVuICkge1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9IGVsc2UgcmV0dXJuIGZhbHNlXHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgJHNpZGVNZW51Qm94ID0gd2luZG93LnZpZXdlclN0YXRlLiRzaWRlTWVudUJveCxcclxuICAgICRzbGlkZXIgPSB3aW5kb3cudmlld2VyU3RhdGUuJHNsaWRlcixcclxuICAgICRiYW5uZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyX19jZW50ZXJfX2Jhbm5lcicpLFxyXG4gICAgb1JlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpLFxyXG4gICAgYXR0ZW1wdCA9IDAsXHJcbiAgICBjaGFubmVsTGlzdCA9IFtdLFxyXG4gICAgY2hOYW1lID0gJycsXHJcbiAgICBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyksXHJcbiAgICBpbnB1dCA9IG51bGwsXHJcbiAgICBsYWJlbCA9IG51bGxcclxuc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcydcclxud2luZG93LnZpZXdlclN0YXRlLmNoTGlzdCA9IHt9XHJcblxyXG5vUmVxLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIHByb2Nlc3NDaExpc3QpXHJcbm9SZXEuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIHRyeUFnYWluKVxyXG5vUmVxLmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCB0cnlBZ2Fpbilcclxub1JlcS5vcGVuKFwiR0VUXCIsIFwiLi9jaGFubmVscy5qc29uXCIpXHJcbm9SZXEuc2VuZCgpXHJcblxyXG5mdW5jdGlvbiB0cnlBZ2FpbihlKSB7XHJcbiAgICBjb25zb2xlLmxvZyhlKVxyXG4gICAgaWYoYXR0ZW1wdCA8IDMpIG9SZXEuc2VuZCgpXHJcbn1cclxuZnVuY3Rpb24gcHJvY2Vzc0NoTGlzdCAoKSB7XHJcbiAgICBjaGFubmVsTGlzdCA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpXHJcbiAgICBmb3IodmFyIGk9MDsgaTxjaGFubmVsTGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgaWYgKGNoYW5uZWxMaXN0W2ldLm5hbWUgPT09ICdiYW5uZXInKSB7XHJcbiAgICAgICAgICAgICRiYW5uZXIudGV4dENvbnRlbnQgPSBjaGFubmVsTGlzdFtpXS50ZXh0XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgY2hOYW1lID0gJ2NoXycgKyBjaGFubmVsTGlzdFtpXS5uYW1lXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5jaExpc3RbY2hOYW1lXSA9IHt9XHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5jaExpc3RbY2hOYW1lXS5scSA9IGNoYW5uZWxMaXN0W2ldLmxxXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5jaExpc3RbY2hOYW1lXS5ocSA9IGNoYW5uZWxMaXN0W2ldLmhxXHJcblxyXG4gICAgICAgICAgICBpbnB1dCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2lucHV0JylcclxuICAgICAgICAgICAgaW5wdXQudHlwZSA9ICdyYWRpbydcclxuICAgICAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCdpZCcsIGNoTmFtZSlcclxuICAgICAgICAgICAgaW5wdXQuc2V0QXR0cmlidXRlKCduYW1lJywgJ2NoLXNlbGVjdG9yJylcclxuICAgICAgICAgICAgJHNsaWRlci5hcHBlbmRDaGlsZChpbnB1dClcclxuXHJcbiAgICAgICAgICAgIGxhYmVsID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnbGFiZWwnKVxyXG4gICAgICAgICAgICBsYWJlbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3NpZGViYXJfX3NsaWRlcl9fYnV0dG9uICcgKyBjaE5hbWUpXHJcbiAgICAgICAgICAgIGxhYmVsLnNldEF0dHJpYnV0ZSgnZm9yJywgY2hOYW1lKVxyXG4gICAgICAgICAgICAkc2xpZGVyLmFwcGVuZENoaWxkKGxhYmVsKVxyXG5cclxuICAgICAgICAgICAgc3R5bGUuaW5uZXJIVE1MICs9ICcuc2lkZWJhcl9fc2xpZGVyX19idXR0b24uJyArIGNoTmFtZSBcclxuICAgICAgICAgICAgICAgICsgJyB7YmFja2dyb3VuZC1wb3NpdGlvbjogJyArIGNoYW5uZWxMaXN0W2ldLmljb25feF9wb3NpdGlvbl9idyArICdlbSAnXHJcbiAgICAgICAgICAgICAgICArIGNoYW5uZWxMaXN0W2ldLmljb25feV9wb3NpdGlvbiArICdlbSwgbGVmdDt9XFxuJ1xyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gJyMnICsgY2hOYW1lICsgJzpjaGVja2VkICsgbGFiZWwuc2lkZWJhcl9fc2xpZGVyX19idXR0b24nXHJcbiAgICAgICAgICAgICAgICArICcge2JhY2tncm91bmQtcG9zaXRpb246ICcgKyBjaGFubmVsTGlzdFtpXS5pY29uX3hfcG9zaXRpb25fY29sb3IgKyAnZW0gJ1xyXG4gICAgICAgICAgICAgICAgKyBjaGFubmVsTGlzdFtpXS5pY29uX3lfcG9zaXRpb24gKyAnZW0sIGxlZnQ7fVxcbidcclxuICAgICAgICB9XHJcbiAgICB9XHJcbiAgICBkb2N1bWVudC5nZXRFbGVtZW50c0J5VGFnTmFtZSgnaGVhZCcpWzBdLmFwcGVuZENoaWxkKHN0eWxlKTtcclxuICAgICRzaWRlTWVudUJveC5zdHlsZS52aXNpYmlsaXR5ID0gJydcclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0gKGZ1bmN0aW9uICgpIHtcclxuICAgIHZhciAkYm94ID0gd2luZG93LnZpZXdlclN0YXRlLiRib3hcclxuICAgIGlmICgkYm94LnJlcXVlc3RGdWxsc2NyZWVuIHx8XHJcbiAgICAgICAgJGJveC5tb3pSZXF1ZXN0RnVsbFNjcmVlbiB8fFxyXG4gICAgICAgICRib3gud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4gfHxcclxuICAgICAgICAkYm94Lm1zUmVxdWVzdEZ1bGxzY3JlZW4pIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZSBcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlIFxyXG4gICAgfVxyXG59KSgpXHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24oKSB7XHJcbiAgICBpZih3aW5kb3cudmlld2VyU3RhdGUuaXNfaVBhZF9pUGhvbmUgJiYgd2luZG93LmlubmVySGVpZ2h0ID49IHdpbmRvdy5zY3JlZW4uYXZhaWxIZWlnaHQpIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSBlbHNlIHJldHVybiBmYWxzZVxyXG59KSgpXHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8sXHJcbiAgICAkYnRuUGxheUZvb3RlciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuUGxheUZvb3RlcixcclxuICAgICRidG5QbGF5Q3RybCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuUGxheUN0cmwsXHJcbiAgICAkc3ZnUGxheUZvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXIgLmJ0bl9wbGF5X19pY29uX3BsYXknKSxcclxuICAgICRzdmdQbGF5Q3RybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sIC5idG5fcGxheV9faWNvbl9wbGF5JyksXHJcbiAgICAkc3ZnUGF1c2VGb290ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyIC5idG5fcGxheV9faWNvbl9wYXVzZScpLFxyXG4gICAgJHN2Z1BhdXNlQ3RybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sIC5idG5fcGxheV9faWNvbl9wYXVzZScpLFxyXG4gICAgY2xhc3NMaXN0ID0gd2luZG93LnZpZXdlclN0YXRlLmNsYXNzTGlzdFxyXG5cclxuJGJ0blBsYXlGb290ZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVQbGF5UGF1c2UpXHJcbiRidG5QbGF5Q3RybC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZVBsYXlQYXVzZSlcclxuJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbn0pXHJcbmZ1bmN0aW9uIHRvZ2dsZVBsYXlQYXVzZSgpe1xyXG4gICAgaWYgKCR2aWRlby5wYXVzZWQpIHtcclxuICAgICAgICAkdmlkZW8ucGxheSgpXHJcbiAgICAgICAgc2V0SWNvbnNQYXVzZSgpXHJcbiAgICB9IFxyXG4gICAgZWxzZSB7XHJcbiAgICAgICAgJHZpZGVvLnBhdXNlKClcclxuICAgICAgICBzZXRJY29uc1BsYXkoKVxyXG4gICAgfVxyXG59XHJcbmZ1bmN0aW9uIHNldEljb25zUGxheSgpIHtcclxuICAgIGNsYXNzTGlzdC5hZGQoJHN2Z1BsYXlGb290ZXIsIFwiYWN0aXZlXCIpXHJcbiAgICBjbGFzc0xpc3QuYWRkKCRzdmdQbGF5Q3RybCwgXCJhY3RpdmVcIilcclxuICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z1BhdXNlRm9vdGVyLCBcImFjdGl2ZVwiKVxyXG4gICAgY2xhc3NMaXN0LnJlbW92ZSgkc3ZnUGF1c2VDdHJsLCBcImFjdGl2ZVwiKVxyXG59XHJcbmZ1bmN0aW9uIHNldEljb25zUGF1c2UoKSB7XHJcbiAgICBjbGFzc0xpc3QuYWRkKCRzdmdQYXVzZUZvb3RlciwgXCJhY3RpdmVcIilcclxuICAgIGNsYXNzTGlzdC5hZGQoJHN2Z1BhdXNlQ3RybCwgXCJhY3RpdmVcIilcclxuICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z1BsYXlGb290ZXIsIFwiYWN0aXZlXCIpXHJcbiAgICBjbGFzc0xpc3QucmVtb3ZlKCRzdmdQbGF5Q3RybCwgXCJhY3RpdmVcIilcclxufSIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyICRidG5RdWFsaXR5ID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5RdWFsaXR5LFxyXG4gICAgJHN2Z1F1YWxpdHkgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX3F1YWxpdHlfX2ljb24nKSxcclxuICAgICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8sXHJcbiAgICAkc291cmNlID0gd2luZG93LnZpZXdlclN0YXRlLiRzb3VyY2UsXHJcbiAgICAkYnRuTWVudU9mZiA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuTWVudU9mZixcclxuICAgIGNsYXNzTGlzdCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5jbGFzc0xpc3QsXHJcbiAgICBsaW5rID0gJydcclxuXHJcbiRidG5RdWFsaXR5LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlUXVhbGl0eSlcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZ1bGxzY3JlZW5jaGFuZ2VcIiwgc3R5bGVRdWFsaXR5QnV0dG9uKVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwid2Via2l0ZnVsbHNjcmVlbmNoYW5nZVwiLCBzdHlsZVF1YWxpdHlCdXR0b24pXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3pmdWxsc2NyZWVuY2hhbmdlXCIsIHN0eWxlUXVhbGl0eUJ1dHRvbilcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIk1TRnVsbHNjcmVlbkNoYW5nZVwiLCBzdHlsZVF1YWxpdHlCdXR0b24pXHJcbiRidG5NZW51T2ZmLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3R5bGVRdWFsaXR5QnV0dG9uKVxyXG5cclxuZnVuY3Rpb24gdG9nZ2xlUXVhbGl0eSgpe1xyXG4gICAgdmFyIGNoID0gd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dC5nZXRBdHRyaWJ1dGUoJ2lkJylcclxuICAgIGlmICh3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkpIHtcclxuICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkgPSBmYWxzZVxyXG4gICAgICAgIGxpbmsgPSB3aW5kb3cudmlld2VyU3RhdGUuY2hMaXN0W2NoXS5scVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkgPSB0cnVlXHJcbiAgICAgICAgbGluayA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5jaExpc3RbY2hdLmhxXHJcbiAgICB9XHJcbiAgICBpZih3aW5kb3cuaGxzKXtcclxuICAgICAgICB3aW5kb3cuaGxzLmRlc3Ryb3koKVxyXG4gICAgICAgIHdpbmRvdy5obHMgPSBuZXcgd2luZG93LkhscygpO1xyXG4gICAgICAgIHdpbmRvdy5obHMuYXR0YWNoTWVkaWEod2luZG93LnZpZXdlclN0YXRlLiR2aWRlbyk7XHJcbiAgICAgICAgd2luZG93Lmhscy5vbih3aW5kb3cuSGxzLkV2ZW50cy5NRURJQV9BVFRBQ0hFRCxmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2aWRlbyBhbmQgd2luZG93Lmhscy5qcyBhcmUgbm93IGJvdW5kIHRvZ2V0aGVyICFcIik7XHJcbiAgICAgICAgICAgIHdpbmRvdy5obHMubG9hZFNvdXJjZShsaW5rKTtcclxuICAgICAgICAgICAgd2luZG93Lmhscy5vbih3aW5kb3cuSGxzLkV2ZW50cy5NQU5JRkVTVF9QQVJTRUQsIGZ1bmN0aW9uKGV2ZW50LGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaT0wOyBpPHdpbmRvdy5obHMubGV2ZWxzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggaSArICdcXHRiaXRyYXRlOicgKyB3aW5kb3cuaGxzLmxldmVsc1tpXS5iaXRyYXRlICsgJ1xcdGg6JyArIHdpbmRvdy5obHMubGV2ZWxzW2ldLmhlaWdodCArICdcXHR3OicgKyB3aW5kb3cuaGxzLmxldmVsc1tpXS53aWR0aCArICdcXG4nKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICAgICRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgfVxyXG4gICAgJHZpZGVvLnBsYXkoKVxyXG4gICAgc3R5bGVRdWFsaXR5QnV0dG9uKClcclxufVxyXG5mdW5jdGlvbiBzdHlsZVF1YWxpdHlCdXR0b24oKSB7XHJcbiAgICBpZiAod2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5KSB7XHJcbiAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgkc3ZnUXVhbGl0eSwgJ2Rpc2FibGVkJylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgkc3ZnUXVhbGl0eSwgJ2Rpc2FibGVkJylcclxuICAgIH1cclxufSIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyICRib3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJGJveCxcclxuICAgICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8sXHJcbiAgICAkYnRuU2NhbGUgPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0blNjYWxlLFxyXG4gICAgJHN2Z1NjYWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjYWxlX2JveF9fYnRuX2ljb24nKSxcclxuICAgICRidG5TY2FsZVN1YkJ0bnNCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NhbGVfYm94X19zdWJidG5zJyksXHJcbiAgICAkc3ViQnRuVXAgPSB3aW5kb3cudmlld2VyU3RhdGUuJHN1YkJ0blVwLFxyXG4gICAgJHN1YkJ0bkRvd24gPSB3aW5kb3cudmlld2VyU3RhdGUuJHN1YkJ0bkRvd24sXHJcbiAgICAkc3ViQnRuVXBJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1YmJ0bl91cCcpLFxyXG4gICAgJHN1YkJ0bkRvd25JY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1YmJ0bl9kb3duJyksXHJcbiAgICAkYnRuTWVudU9mZiA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuTWVudU9mZixcclxuICAgICRidG5NZW51T24gPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0bk1lbnVPbixcclxuICAgIGNsYXNzTGlzdCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5jbGFzc0xpc3QsXHJcbiAgICBpbml0JHZpZGVvSGVpZ2h0ID0gdW5kZWZpbmVkLFxyXG4gICAgaW5pdCR2aWRlb1dpZHRoID0gdW5kZWZpbmVkLFxyXG4gICAgc2NhbGVkSG9yaXNvbnRhbGx5ID0gZmFsc2VcclxuXHJcbmNsYXNzTGlzdC5hZGQoJHN2Z1NjYWxlLCAnZGlzYWJsZWQnKVxyXG5cclxuJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXlpbmcnLCBpbml0KVxyXG4kYnRuTWVudU9mZi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNjYWxlQnRuT24pXHJcbiRidG5NZW51T24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY2FsZUJ0bk9mZilcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignZnVsbHNjcmVlbmNoYW5nZScsIGZ1bGxTY3JlZW5DaGFuZ2UpXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3dlYmtpdGZ1bGxzY3JlZW5jaGFuZ2UnLCBmdWxsU2NyZWVuQ2hhbmdlKVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3pmdWxsc2NyZWVuY2hhbmdlJywgZnVsbFNjcmVlbkNoYW5nZSlcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignTVNGdWxsc2NyZWVuQ2hhbmdlJywgZnVsbFNjcmVlbkNoYW5nZSlcclxuXHJcbmZ1bmN0aW9uIGluaXQoKXtcclxuICAgIHNldFRpbWVvdXQoc2NhbGVIb3Jpc29udGFsbHksIDMwMClcclxufVxyXG5mdW5jdGlvbiBzY2FsZUhvcmlzb250YWxseSgpIHtcclxuICAgIGNvbnNvbGUubG9nKCckYm94LmNsaWVudFdpZHRoOiAnICsgJGJveC5jbGllbnRXaWR0aFxyXG4gICAgKyAnXFxuJHZpZGVvLnZpZGVvSGVpZ2h0OiAnICsgJHZpZGVvLnZpZGVvSGVpZ2h0XHJcbiAgICArICdcXG4kdmlkZW8udmlkZW9XaWR0aDogJyArICR2aWRlby52aWRlb1dpZHRoKVxyXG4gICAgJHZpZGVvLnN0eWxlLndpZHRoID0gJGJveC5jbGllbnRXaWR0aCArICdweCdcclxuICAgICR2aWRlby5zdHlsZS5oZWlnaHQgPSAkYm94LmNsaWVudFdpZHRoICogJHZpZGVvLnZpZGVvSGVpZ2h0IC8gJHZpZGVvLnZpZGVvV2lkdGggKyAncHgnXHJcbiAgICBzY2FsZWRIb3Jpc29udGFsbHkgPSB0cnVlXHJcbiAgICBjb25zb2xlLmxvZygnc2NyZWVuOiAnICsgJGJveC5jbGllbnRXaWR0aCArICd4JyArICRib3guY2xpZW50SGVpZ2h0ICsgXCJcXG5cIlxyXG4gICAgICAgICAgICAgICAgKyAndmlkZW86ICcgKyAkYm94LmNsaWVudFdpZHRoICsgJ3gnICsgJGJveC5jbGllbnRXaWR0aCAqICR2aWRlby52aWRlb0hlaWdodCAvICR2aWRlby52aWRlb1dpZHRoICsgJ1xcbicpXHJcbn1cclxuZnVuY3Rpb24gc2NhbGVWZXJ0aWNhbGx5KCkge1xyXG4gICAgJHZpZGVvLnN0eWxlLndpZHRoID0gJGJveC5jbGllbnRIZWlnaHQgKiAkdmlkZW8udmlkZW9XaWR0aCAvICR2aWRlby52aWRlb0hlaWdodCArICdweCdcclxuICAgICR2aWRlby5zdHlsZS5oZWlnaHQgPSAkYm94LmNsaWVudEhlaWdodCArICdweCdcclxuICAgIHNjYWxlZEhvcmlzb250YWxseSA9IGZhbHNlXHJcbiAgICBjb25zb2xlLmxvZygnc2NyZWVuOiAnICsgJGJveC5jbGllbnRXaWR0aCArICd4JyArICRib3guY2xpZW50SGVpZ2h0ICsgXCJcXG5cIlxyXG4gICAgICAgICAgICAgICAgKyAndmlkZW86ICcgKyAkYm94LmNsaWVudEhlaWdodCAqICR2aWRlby52aWRlb1dpZHRoIC8gJHZpZGVvLnZpZGVvSGVpZ2h0ICsgJ3gnICsgJGJveC5jbGllbnRIZWlnaHQgKyAnXFxuJylcclxufVxyXG5cclxuZnVuY3Rpb24gZnVsbFNjcmVlbkNoYW5nZSgpIHtcclxuICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5hc2skYm94SW5GdWxsU2NyZWVuKCkpe1xyXG4gICAgICAgIHNjYWxlQnRuT24oKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBzY2FsZUJ0bk9mZigpXHJcbiAgICB9XHJcbiAgICBzZXRUaW1lb3V0KHNjYWxlSG9yaXNvbnRhbGx5LCAzMDApXHJcbn1cclxuZnVuY3Rpb24gc2NhbGVCdG5PbigpIHtcclxuICAgIHNldFRpbWVvdXQoZnVuY3Rpb24gKCkge1xyXG4gICAgICAgIGlmICgkYm94LmNsaWVudFdpZHRoICE9PSAkdmlkZW8ub2Zmc2V0V2lkdGggfHwgJGJveC5jbGllbnRIZWlnaHQgIT09ICR2aWRlby5vZmZzZXRIZWlnaHQpIHtcclxuICAgICAgICAgICAgJGJ0blNjYWxlLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlU2NyZWVuQWxpZ24pXHJcbiAgICAgICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z1NjYWxlLCAnZGlzYWJsZWQnKVxyXG4gICAgICAgIH0gZWxzZSBjbGFzc0xpc3QuYWRkKCRzdmdTY2FsZSwgJ2Rpc2FibGVkJylcclxuICAgIH0sIDMwMClcclxufVxyXG5mdW5jdGlvbiBzY2FsZUJ0bk9mZigpIHtcclxuICAgICRidG5TY2FsZS5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZVNjcmVlbkFsaWduKVxyXG4gICAgY2xhc3NMaXN0LmFkZCgkc3ZnU2NhbGUsICdkaXNhYmxlZCcpXHJcbiAgICBzZXRUaW1lb3V0KHNjYWxlSG9yaXNvbnRhbGx5LCAzMDApXHJcbn1cclxuZnVuY3Rpb24gdG9nZ2xlU2NyZWVuQWxpZ24oKSB7XHJcbiAgICBpZihzY2FsZWRIb3Jpc29udGFsbHkpe1xyXG4gICAgICAgIHNjYWxlVmVydGljYWxseSgpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNjYWxlSG9yaXNvbnRhbGx5KClcclxuICAgIH1cclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbnZhciAkdmlkZW8gPSB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvLFxyXG4gICAgJGJ0blZvbHVtZUZvb3RlciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuVm9sdW1lRm9vdGVyLFxyXG4gICAgJGJ0blZvbHVtZUN0cmwgPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0blZvbHVtZUN0cmwsXHJcbiAgICAkc3ZnVm9sdW1lT25Gb290ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyIC5idG5fdm9sdW1lX19pY29uX29uJyksXHJcbiAgICAkc3ZnVm9sdW1lT25DdHJsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2wgLmJ0bl92b2x1bWVfX2ljb25fb24nKSxcclxuICAgICRzdmdWb2x1bWVPZmZGb290ZXIgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyIC5idG5fdm9sdW1lX19pY29uX29mZicpLFxyXG4gICAgJHN2Z1ZvbHVtZU9mZkN0cmwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbCAuYnRuX3ZvbHVtZV9faWNvbl9vZmYnKSxcclxuICAgIGNsYXNzTGlzdCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5jbGFzc0xpc3RcclxuXHJcbiRidG5Wb2x1bWVGb290ZXIuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snXHJcbiRidG5Wb2x1bWVDdHJsLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJ1xyXG5cclxuJGJ0blZvbHVtZUZvb3Rlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG11dGUpXHJcbiRidG5Wb2x1bWVDdHJsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbXV0ZSlcclxuXHJcbmZ1bmN0aW9uIG11dGUoKXtcclxuICAgIGlmICgkdmlkZW8ubXV0ZWQpe1xyXG4gICAgICAgICR2aWRlby5tdXRlZCA9IGZhbHNlXHJcbiAgICAgICAgJHZpZGVvLnZvbHVtZSA9IDEuMFxyXG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJHN2Z1ZvbHVtZU9uRm9vdGVyLCBcImFjdGl2ZVwiKVxyXG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJHN2Z1ZvbHVtZU9uQ3RybCwgXCJhY3RpdmVcIilcclxuICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRzdmdWb2x1bWVPZmZGb290ZXIsIFwiYWN0aXZlXCIpXHJcbiAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgkc3ZnVm9sdW1lT2ZmQ3RybCwgXCJhY3RpdmVcIilcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgJHZpZGVvLnZvbHVtZSA9IDAuMFxyXG4gICAgICAgICR2aWRlby5tdXRlZCA9IHRydWVcclxuICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRzdmdWb2x1bWVPbkZvb3RlciwgXCJhY3RpdmVcIilcclxuICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRzdmdWb2x1bWVPbkN0cmwsIFwiYWN0aXZlXCIpXHJcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgkc3ZnVm9sdW1lT2ZmRm9vdGVyLCBcImFjdGl2ZVwiKVxyXG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJHN2Z1ZvbHVtZU9mZkN0cmwsIFwiYWN0aXZlXCIpXHJcbiAgICB9IFxyXG59XHJcbiIsIlwidXNlIHN0cmljdFwiXHJcblxyXG52YXIgJHZpZGVvID0gd2luZG93LnZpZXdlclN0YXRlLiR2aWRlbyxcclxuICAgICRzb3VyY2UgPSB3aW5kb3cudmlld2VyU3RhdGUuJHNvdXJjZSxcclxuICAgICRzbGlkZXIgPSB3aW5kb3cudmlld2VyU3RhdGUuJHNsaWRlcixcclxuICAgICRib3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJGJveCxcclxuICAgIGNsYXNzTGlzdCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5jbGFzc0xpc3QsXHJcbiAgICBsaW5rID0gJydcclxud2luZG93LkhscyA9IG51bGxcclxud2luZG93LmhscyA9IG51bGxcclxuXHJcbiRzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgIHZhciBjaCA9ICcnXHJcbiAgICBpZihlLnRhcmdldC50YWdOYW1lID09PSAnSU5QVVQnKXtcclxuICAgICAgICBpZih3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0ID09PSBlLnRhcmdldCkge1xyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0LmNoZWNrZWQgPSBmYWxzZVxyXG4gICAgICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0ID0gbnVsbFxyXG4gICAgICAgICAgICBpZih3aW5kb3cuSGxzICYmIHdpbmRvdy5IbHMuaXNTdXBwb3J0ZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93Lmhscy5kZXN0cm95KClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgIC8vICR2aWRlby5wYXVzZSgpXHJcbiAgICAgICAgICAgICAgICAkdmlkZW8ucmVtb3ZlQXR0cmlidXRlKCdzcmMnKVxyXG4gICAgICAgICAgICAgICAgJHNvdXJjZS5yZW1vdmVBdHRyaWJ1dGUoJ3NyYycpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgkdmlkZW8sICdhY3RpdmUnKVxyXG4gICAgICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRib3gsICdzaG93X2Zvb3RlcicpXHJcbiAgICAgICAgICAgICR2aWRlby5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIGZhaWxlZClcclxuICAgICAgICAgICAgJHZpZGVvLmxvYWQoKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQgPSBlLnRhcmdldFxyXG4gICAgICAgICAgICBjaCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKVxyXG4gICAgICAgICAgICBsaW5rID0gd2luZG93LnZpZXdlclN0YXRlLmNoTGlzdFtjaF0ubHFcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5ID0gZmFsc2VcclxuICAgICAgICAgICAgaWYod2luZG93LkhscyAmJiB3aW5kb3cuSGxzLmlzU3VwcG9ydGVkKCkpIHtcclxuICAgICAgICAgICAgICAgIHNob3dWaWRlb1ZpYUhscygpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICAgICAgICAgICAgJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2xhc3NMaXN0LmFkZCgkdmlkZW8sICdhY3RpdmUnKVxyXG4gICAgICAgICAgICAkdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmYWlsZWQpXHJcbiAgICAgICAgICAgIGlmKCR2aWRlby5wbGF5KSAkdmlkZW8ucGxheSgpO1xyXG4gICAgICAgICAgICBlbHNlIGFsZXJ0ICgndmlkZW8gY2Fubm90IHBsYXknKVxyXG4gICAgICAgICAgICBjbGFzc0xpc3QuYWRkKCRib3gsICdzaG93X2Zvb3RlcicpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KVxyXG5cclxuZnVuY3Rpb24gZmFpbGVkKGUpIHtcclxuICAgLy8gdmlkZW8gcGxheWJhY2sgZmFpbGVkIC0gc2hvdyBhIG1lc3NhZ2Ugc2F5aW5nIHdoeSAgICAgLSBmcm9tIGh0dHBzOi8vZGV2LnczLm9yZy9odG1sNS9zcGVjLWF1dGhvci12aWV3L3ZpZGVvLmh0bWwjdmlkZW9cclxuICAgc3dpdGNoIChlLnRhcmdldC5lcnJvci5jb2RlKSB7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfQUJPUlRFRDpcclxuICAgICAgIGFsZXJ0KCfQktC+0YHQv9GA0L7QuNC30LLQtdC00LXQvdC40LUg0LLQuNC00LXQviDQv9GA0LXRgNCy0LDQvdC+LicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfTkVUV09SSzpcclxuICAgICAgIGFsZXJ0KCfQntGI0LjQsdC60LAg0YHQtdGC0Lgg0L/RgNC40LLQtdC70LAg0Log0L3QsNGA0YPRiNC10L3QuNGOINC30LDQs9GA0YPQt9C60Lgg0LLQuNC00LXQvicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfREVDT0RFOlxyXG4gICAgICAgYWxlcnQoJ9CS0L7RgdC/0YDQvtC40LfQstC10LTQtdC90LjQtSDQstC40LTQtdC+INC/0YDQtdC60YDQsNGJ0LXQvdC+INC40Lct0LfQsCDQuNGB0LrQsNC20LXQvdC40Lkg0L/RgNC4INC/0LXRgNC10LTQsNGH0LUg0LjQu9C4INC/0L7RgtC+0LzRgywg0YfRgtC+INCy0LjQtNC10L4g0LjRgdC/0L7Qu9GM0LfRg9C10YIg0L3QtdC00L7RgdGC0YPQv9C90YvQtSDQsiDQktCw0YjQtdC8INCx0YDQsNGD0LfQtdGA0LUg0YTRg9C90LrRhtC40LguJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgICBjYXNlIGUudGFyZ2V0LmVycm9yLk1FRElBX0VSUl9TUkNfTk9UX1NVUFBPUlRFRDpcclxuICAgICAgIGlmICh3aW5kb3cuSGxzICYmIHdpbmRvdy5IbHMuaXNTdXBwb3J0ZWQoKSl7XHJcbiAgICAgICAgICAgYWxlcnQoJ9CS0LjQtNC10L4g0L3QtSDQvNC+0LbQtdGCINCx0YvRgtGMINC30LDQs9GA0YPQttC10L3QviDQuNC3LdC30LAg0YHQsdC+0Y8g0LIg0LIg0LTQvtGB0YLRg9C/0LUg0Log0YHQtdGA0LLQtdGA0YMg0LjQu9C4INGN0YLQvtGCINCy0LjQtNC10L7RhNC+0YDQvNCw0YIg0L3QtSDQv9C+0LTQtNC10YDQttC40LLQsNC10YLRgdGPINCS0LDRiNC40Lwg0LHRgNCw0YPQt9C10YDQvtC8LicpO1xyXG4gICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICBsb2FkSGxzKClcclxuICAgICAgIH1cclxuICAgICAgIGJyZWFrO1xyXG4gICAgIGRlZmF1bHQ6XHJcbiAgICAgICBhbGVydCgn0J/RgNC+0LjQt9C+0YjQu9CwINC+0YjQuNCx0LrQsC4g0J/QvtC/0YDQvtCx0YPQudGC0LUg0LXRidC1LicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgIH1cclxufVxyXG5mdW5jdGlvbiBsb2FkSGxzKCl7XHJcbiAgICAkdmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmYWlsZWQpXHJcbiAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKVxyXG4gICAgc2NyaXB0LnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiXHJcbiAgICBpZiAoc2NyaXB0LnJlYWR5U3RhdGUpeyAgLy9JRVxyXG4gICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZiAoc2NyaXB0LnJlYWR5U3RhdGUgPT0gXCJsb2FkZWRcIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHNjcmlwdC5yZWFkeVN0YXRlID09IFwiY29tcGxldGVcIil7XHJcbiAgICAgICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHJ1bkhscygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSBlbHNlIHsgIC8vT3RoZXJzXHJcbiAgICAgICAgc2NyaXB0Lm9ubG9hZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdobHMgbG9hZGVkICcgKyBEYXRlLm5vdygpKVxyXG4gICAgICAgICAgICBydW5IbHMoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNjcmlwdC5zcmMgPSAnLi9qcy9obHMubWluLmpzJ1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKHNjcmlwdClcclxufVxyXG5mdW5jdGlvbiBydW5IbHMoKSB7XHJcbiAgICAkdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCAnJylcclxuICAgICRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCAnJylcclxuICAgIHNob3dWaWRlb1ZpYUhscygpXHJcbiAgICBpZigkdmlkZW8ucGxheSkgJHZpZGVvLnBsYXkoKVxyXG4gICAgZWxzZSBhbGVydCAoJ3ZpZGVvIGNhbm5vdCBwbGF5JylcclxuXHJcbiAgICB3aW5kb3cuaGxzLm9uKHdpbmRvdy5IbHMuRXZlbnRzLkVSUk9SLGZ1bmN0aW9uKGV2ZW50LGRhdGEpIHtcclxuICAgICAgICBpZihkYXRhLmZhdGFsKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaChkYXRhLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2Ugd2luZG93Lkhscy5FcnJvclR5cGVzLk5FVFdPUktfRVJST1I6XHJcbiAgICAgICAgICAgICAgICAvLyB0cnkgdG8gcmVjb3ZlciBuZXR3b3JrIGVycm9yXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmYXRhbCBuZXR3b3JrIGVycm9yIGVuY291bnRlcmVkLCB0cnkgdG8gcmVjb3ZlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuaGxzLnN0YXJ0TG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSB3aW5kb3cuSGxzLkVycm9yVHlwZXMuTUVESUFfRVJST1I6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmYXRhbCBtZWRpYSBlcnJvciBlbmNvdW50ZXJlZCwgdHJ5IHRvIHJlY292ZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Lmhscy5yZWNvdmVyTWVkaWFFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIC8vIGNhbm5vdCByZWNvdmVyXHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Lmhscy5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbmZ1bmN0aW9uIHNob3dWaWRlb1ZpYUhscygpe1xyXG4gICAgaWYod2luZG93Lmhscykgd2luZG93Lmhscy5kZXN0cm95KClcclxuICAgIHdpbmRvdy5obHMgPSBuZXcgd2luZG93LkhscygpO1xyXG4gICAgd2luZG93Lmhscy5hdHRhY2hNZWRpYSh3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvKTtcclxuICAgIHdpbmRvdy5obHMub24od2luZG93Lkhscy5FdmVudHMuTUVESUFfQVRUQUNIRUQsZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgd2luZG93Lmhscy5sb2FkU291cmNlKGxpbmspO1xyXG4gICAgICAgIHdpbmRvdy5obHMub24od2luZG93Lkhscy5FdmVudHMuTUFOSUZFU1RfUEFSU0VELCBmdW5jdGlvbihldmVudCxkYXRhKSB7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaT0wOyBpPHdpbmRvdy5obHMubGV2ZWxzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBpICsgJ1xcdGJpdHJhdGU6JyArIHdpbmRvdy5obHMubGV2ZWxzW2ldLmJpdHJhdGUgKyAnXFx0aDonICsgd2luZG93Lmhscy5sZXZlbHNbaV0uaGVpZ2h0ICsgJ1xcdHc6JyArIHdpbmRvdy5obHMubGV2ZWxzW2ldLndpZHRoICsgJ1xcbicpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn0iLCIndXNlIHN0cmljdCdcclxuXHJcbi8vICBwb2x5ZmlsbCBmb3IgZWxlbWVudC5jbGFzc0xpc3QgXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgJ2NvbnRhaW5zJzogZnVuY3Rpb24oZWwsIGNscykge1xyXG4gICAgICAgIGlmKGVsLmNsYXNzTGlzdCkgcmV0dXJuIGVsLmNsYXNzTGlzdC5jb250YWlucyhjbHMpXHJcbiAgICAgICAgdmFyIGFyciA9IGVsLmdldEF0dHJpYnV0ZSgnY2xhc3MnKS5zcGxpdCgnICcpXHJcbiAgICAgICAgZm9yKHZhciBpPTA7IGk8YXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoYXJyW2ldID09IGNscykgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9LFxyXG4gICAgJ2FkZCc6IGZ1bmN0aW9uKGVsLCBjbHMpIHtcclxuICAgICAgICBpZihlbC5jbGFzc0xpc3QpIHtcclxuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChjbHMpXHJcbiAgICAgICAgICAgIHJldHVybiBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXdpbmRvdy52aWV3ZXJTdGF0ZS5jbGFzc0xpc3QuY29udGFpbnMoZWwsIGNscykpe1xyXG4gICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgZWwuZ2V0QXR0cmlidXRlKCdjbGFzcycpICsgJyAnICsgY2xzKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAncmVtb3ZlJzogZnVuY3Rpb24oZWwsIGNscykge1xyXG4gICAgICAgIGlmKGVsLmNsYXNzTGlzdCkge1xyXG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNscylcclxuICAgICAgICAgICAgcmV0dXJuIFxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgdmFyIGFyciA9IGVsLmdldEF0dHJpYnV0ZSgnY2xhc3MnKS5zcGxpdCgnICcpXHJcbiAgICAgICAgdmFyIHJlcyA9ICcnXHJcbiAgICAgICAgZm9yKHZhciBpPTA7IGk8YXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoYXJyW2ldICE9IGNscykge1xyXG4gICAgICAgICAgICAgICAgcmVzICs9IGFycltpXSArICcgJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCByZXMpXHJcbiAgICB9XHJcbn0iLCIndXNlIHN0cmljdCdcblxudmFyICRib3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJGJveCxcbiAgICAkYnRuRnVsbFNjck9uID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5GdWxsU2NyT24sXG4gICAgJGJ0bkZ1bGxTY3JPZmYgPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0bkZ1bGxTY3JPZmYsXG4gICAgJGJ0bk1lbnVPZmYgPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0bk1lbnVPZmYsXG4gICAgJGJ0bk1lbnVPbiA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuTWVudU9uLFxuICAgICRib3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJGJveCxcbiAgICAkY29udHJvbCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kY29udHJvbCxcbiAgICAkYm9keSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJ2JvZHknKSxcbiAgICAkc3ZnRnVsbFNjck9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9fZnVsbHNjci5vbicpLFxuICAgIGR1cmF0aW9uQ3RybFZpc2libGUgPSB3aW5kb3cudmlld2VyU3RhdGUuZHVyYXRpb25DdHJsVmlzaWJsZSxcbiAgICBjbGFzc0xpc3QgPSB3aW5kb3cudmlld2VyU3RhdGUuY2xhc3NMaXN0LFxuICAgIGlzJGJvZHlIZWlnaHRDaGFuZ2VkID0gZmFsc2UsXG4gICAgaWQgPSB1bmRlZmluZWRcblxuaWYgKCB3aW5kb3cudmlld2VyU3RhdGUuaXNGdWxsU2NyZWVuQWxsb3dlZCApIHtcbiAgJGJ0bk1lbnVPZmYuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAkYnRuTWVudU9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgJGJ0bkZ1bGxTY3JPbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGdvRnVsbFNjcmVlbilcbiAgJGJ0bkZ1bGxTY3JPZmYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBnZXRPZmZGdWxsc2NyZWVuKVxufSBlbHNlIGlmICh3aW5kb3cudmlld2VyU3RhdGUuaXNfaVBhZF9pUGhvbmUgJiZcbiAgICAgICAgICAgIXdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZV9pbkZ1bGxTY3JlZW4pIHtcbiAgJGJ0bkZ1bGxTY3JPbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICBhbGVydCgn0KfRgtC+0LHRiyDQvtCx0YDQtdGB0YLQuCDQv9C+0LvQvdC+0Y3QutGA0LDQvdC90YvQuSDRgNC10LbQuNC8INC90LDQtNC+INGB0LTQtdC70LDRgtGMINCy0YHQtdCz0L4g0L3QtdGB0LrQvtC70YzQutC+INGI0LDQs9C+0LI6XFxuJ1xuICAgICAgICArICfQqNCw0LMgMS4g0J3QsNC20LzQuNGC0LUg0L3QsCDQutC90L7Qv9C60YMgXCLQntGC0L/RgNCw0LLQuNGC0YxcIiAo0LLRi9Cz0LvRj9C00LjRgiDQutCw0Log0LrQstCw0LTRgNCw0YIg0YHQviDRgdGC0YDQtdC70L7Rh9C60L7QuSDQstCy0LXRgNGFKSDRgdC/0YDQsNCy0LAg0LLQstC10YDRhdGDINGN0LrRgNCw0L3QsCDQuCDQstGL0LHQtdGA0LjRgtC1INC/0YPQvdC60YI6INCd0LAg0Y3QutGA0LDQvSDCq9CU0L7QvNC+0LnCuy5cXG4nXG4gICAgICAgICsgJ9Co0LDQsyAyLiDQo9C60LDQttC40YLQtSDQttC10LvQsNC10LzQvtC1INC90LDQt9Cy0LDQvdC40LUgKNC90LDQv9GA0LjQvNC10YAgXCLQntC00LXRgdGB0LrQvtC1INCi0JJcIikg0Lgg0L3QsNC20LzQuNGC0LUgXCLQlNC+0LHQsNCy0LjRgtGMXCIuXFxuJ1xuICAgICAgICArICfQn9C+0YHQu9C1INC90LDQttCw0YLQuNGPINC60L3QvtC/0LrQuCBcItCU0L7QsdCw0LLQuNGC0YxcIiDQktCw0YEg0L/QtdGA0LXQsdGA0L7RgdC40YIg0L3QsCDRgNCw0LHQvtGH0LjQuSDRgdGC0L7Quywg0LPQtNC1INCS0Ysg0YHQvNC+0LbQtdGC0LUg0YPQstC40LTQtdGC0Ywg0YHQstC10LbQtdGB0L7Qt9C00LDQvdC90YPRjiDRgdGB0YvQu9C60YMuXFxuJ1xuICAgICAgICArICfQl9Cw0LnQtNGPINC90LAg0YHQsNC50YIg0L3QsNC20LDRgtC40LXQvCDQvdCwINGN0YLRgyDRgdGB0YvQu9C60YMg0JLRiyDQstGB0LXQs9C00LAg0LHRg9C00LXRgtC1INGB0LzQvtGC0YDQtdGC0Ywg0KLQkiDQsiDQv9C+0LvQvdC+0Y3QutGA0LDQvdC90L7QvCDRgNC10LbQuNC80LUuXFxuJ1xuICAgICAgICArICfQlNC70Y8g0YPQtNCw0LvQtdC90LjRjyDRgdGB0YvQu9C60Lgg0L3Rg9C20L3QviDQtdC1INC90LDQttCw0YLRjCDQuCDQv9C+0LTQtdGA0LbQsNGC0YwsINC30LDRgtC10Lwg0L3QsNC20LDRgtGMINC/0L7Rj9Cy0LjQstGI0LjQudGB0Y8g0LrRgNC10YHRgtC40Log0LIg0LvQtdCy0L7QvCDQstC10YDRhdC90LXQvCDRg9Cz0LvRgy4nKVxuICAgIH0pXG4gICAgY2xhc3NMaXN0LmFkZCgkc3ZnRnVsbFNjck9uLCAnZGlzYWJsZWQnKVxuICAgICRidG5GdWxsU2NyT2ZmLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAkYnRuTWVudU9mZi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0V2F0Y2hNb2RlKVxuICAgICRidG5NZW51T24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsZWF2ZVdhdGNoTW9kZSlcbn0gZWxzZSBpZiAod2luZG93LnZpZXdlclN0YXRlLmlzX2lQYWRfaVBob25lX2luRnVsbFNjcmVlbiB8fFxuICAgICAgICAgICAhd2luZG93LnZpZXdlclN0YXRlLmlzRnVsbFNjcmVlbkFsbG93ZWQpIHtcbiAgICAkYnRuRnVsbFNjck9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAkYnRuRnVsbFNjck9mZi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgJGJ0bk1lbnVPZmYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydFdhdGNoTW9kZSlcbiAgICAkYnRuTWVudU9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbGVhdmVXYXRjaE1vZGUpXG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmdWxsc2NyZWVuY2hhbmdlXCIsICAgICAgIGZzSGFuZGxlcilcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ3ZWJraXRmdWxsc2NyZWVuY2hhbmdlXCIsIGZzSGFuZGxlcilcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3pmdWxsc2NyZWVuY2hhbmdlXCIsICAgIGZzSGFuZGxlcilcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJNU0Z1bGxzY3JlZW5DaGFuZ2VcIiwgICAgIGZzSGFuZGxlcilcblxuZnVuY3Rpb24gZnNIYW5kbGVyKCkge1xuICAgIGlmICh3aW5kb3cudmlld2VyU3RhdGUuYXNrJGJveEluRnVsbFNjcmVlbigpKSB7XG4gICAgICAgIGNvbnNvbGUubG9nKCckYm9keS5jbGllbnRIZWlnaHQ6ICcrJGJvZHkuY2xpZW50SGVpZ2h0XG4gICAgICAgICsgJ1xcbndpbmRvdy5zY3JlZW4uYXZhaWxIZWlnaHQ6ICcrd2luZG93LnNjcmVlbi5hdmFpbEhlaWdodFxuICAgICAgICArICdcXG53aW5kb3cub3V0ZXJIZWlnaHQ6ICcgKyB3aW5kb3cub3V0ZXJIZWlnaHQpXG4gICAgICAgIGlmKCRib2R5LmNsaWVudEhlaWdodCA8IHdpbmRvdy5zY3JlZW4uYXZhaWxIZWlnaHQpe1xuICAgICAgICAgICAgJGJvZHkuc3R5bGUuaGVpZ2h0ID0gd2luZG93LnNjcmVlbi5hdmFpbEhlaWdodCArICdweCdcbiAgICAgICAgICAgIGlzJGJvZHlIZWlnaHRDaGFuZ2VkID0gdHJ1ZVxuICAgICAgICAgICAgY29uc29sZS5sb2coJyRib2R5LmNsaWVudEhlaWdodDogJyskYm9keS5jbGllbnRIZWlnaHRcbiAgICAgICAgICAgICsgJ1xcbndpbmRvdy5zY3JlZW4uYXZhaWxIZWlnaHQ6ICcrd2luZG93LnNjcmVlbi5hdmFpbEhlaWdodFxuICAgICAgICAgICAgKyAnXFxud2luZG93Lm91dGVySGVpZ2h0OiAnICsgd2luZG93Lm91dGVySGVpZ2h0KVxuICAgICAgICAgICAgLy8gaWYod2luZG93Lm91dGVySGVpZ2h0ICYmICRib2R5LmNsaWVudEhlaWdodCA+IHdpbmRvdy5vdXRlckhlaWdodCkge1xuICAgICAgICAgICAgLy8gICAgICRib2R5LnN0eWxlLmhlaWdodCA9IHdpbmRvdy5vdXRlckhlaWdodCArICdweCdcbiAgICAgICAgICAgIC8vIH1cbiAgICAgICAgfVxuICAgICAgICAvLyBjb25zb2xlLmxvZygnJGJvZHkuY2xpZW50SGVpZ2h0OiAnKyRib2R5LmNsaWVudEhlaWdodFxuICAgICAgICAvLyArICdcXG53aW5kb3cuc2NyZWVuLmF2YWlsSGVpZ2h0OiAnK3dpbmRvdy5zY3JlZW4uYXZhaWxIZWlnaHRcbiAgICAgICAgLy8gKyAnXFxud2luZG93Lm91dGVySGVpZ2h0OiAnICsgd2luZG93Lm91dGVySGVpZ2h0KVxuICAgICAgICBzdGFydFdhdGNoTW9kZSgpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgaWYoaXMkYm9keUhlaWdodENoYW5nZWQpe1xuICAgICAgICAgICAgJGJvZHkuc3R5bGUuaGVpZ2h0ID0gJydcbiAgICAgICAgICAgIGlzJGJvZHlIZWlnaHRDaGFuZ2VkID0gZmFsc2VcbiAgICAgICAgfVxuICAgICAgICBsZWF2ZVdhdGNoTW9kZSgpXG4gICAgfVxufVxuZnVuY3Rpb24gZ29GdWxsU2NyZWVuKCkge1xuICAgICAgICAgaWYgKCRib3gucmVxdWVzdEZ1bGxzY3JlZW4pICAgICAgICAkYm94LnJlcXVlc3RGdWxsc2NyZWVuKClcbiAgICBlbHNlIGlmICgkYm94Lm1velJlcXVlc3RGdWxsU2NyZWVuKSAgICAgJGJveC5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpXG4gICAgZWxzZSBpZiAoJGJveC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikgICRib3gud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgIGVsc2UgaWYgKCRib3gubXNSZXF1ZXN0RnVsbHNjcmVlbikgICAgICAkYm94Lm1zUmVxdWVzdEZ1bGxzY3JlZW4oKVxufVxuZnVuY3Rpb24gZ2V0T2ZmRnVsbHNjcmVlbigpIHtcbiAgICAgICBpZiAoZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4pICAgICAgICAgZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKVxuICBlbHNlIGlmIChkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKSAgICBkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKClcbiAgZWxzZSBpZiAoZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4pICAgZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKVxuICBlbHNlIGlmIChkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKSAgICAgICBkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKClcbn1cbmZ1bmN0aW9uIHN0YXJ0V2F0Y2hNb2RlKGUpIHtcbiAgICBjbGFzc0xpc3QuYWRkKCRib3gsICdoaWRlX21lbnUnKVxuICAgICRib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY3JlZW5DbGlja0hhbmRsZXIpXG4gICAgJGNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjb250cm9sQ2xpY2tIYW5kbGVyKVxufVxuZnVuY3Rpb24gbGVhdmVXYXRjaE1vZGUoZSkge1xuICAgIGNsZWFyVGltZW91dChpZClcbiAgICBjbGFzc0xpc3QucmVtb3ZlKCRjb250cm9sLCAnc2hvd19jb250cm9sJylcbiAgICAkY29udHJvbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNvbnRyb2xDbGlja0hhbmRsZXIpXG4gICAgJGJveC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcmVlbkNsaWNrSGFuZGxlcilcbiAgICBjbGFzc0xpc3QucmVtb3ZlKCRib3gsICdoaWRlX21lbnUnKVxufVxuZnVuY3Rpb24gc2NyZWVuQ2xpY2tIYW5kbGVyKGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgJGJveC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcmVlbkNsaWNrSGFuZGxlcilcbiAgICBjbGFzc0xpc3QuYWRkKCRjb250cm9sLCAnc2hvd19jb250cm9sJylcbiAgICBpZCA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgkY29udHJvbCwgJ3Nob3dfY29udHJvbCcpXG4gICAgICAgICAgICAgJGJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcmVlbkNsaWNrSGFuZGxlcilcbiAgICAgICAgIH0gLCBkdXJhdGlvbkN0cmxWaXNpYmxlKVxufVxuZnVuY3Rpb24gY29udHJvbENsaWNrSGFuZGxlcihlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgIGNsZWFyVGltZW91dChpZClcbiAgICBpZCA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgkY29udHJvbCwgJ3Nob3dfY29udHJvbCcpXG4gICAgICAgICAgICAgJGJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcmVlbkNsaWNrSGFuZGxlcilcbiAgICAgICAgIH0gLCBkdXJhdGlvbkN0cmxWaXNpYmxlKVxufVxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZSA9IHtcclxuICAgICckYm94JzogICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJveCcpLFxyXG4gICAgJyR2aWRlbyc6ICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW8nKSxcclxuICAgICckc291cmNlJzogICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNvdXJjZScpLFxyXG4gICAgJyRzaWRlTWVudUJveCc6ICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpLFxyXG4gICAgJyRzbGlkZXInOiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcl9fc2xpZGVyJyksXHJcbiAgICAnJGZvb3Rlcic6ICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXInKSxcclxuICAgICckY29udHJvbCc6ICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2wnKSxcclxuICAgICckYnRuUGxheUZvb3Rlcic6ICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3RlciAuYnRuX3BsYXknKSxcclxuICAgICckYnRuUGxheUN0cmwnOiAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2wgLmJ0bl9wbGF5JyksXHJcbiAgICAnJGJ0blZvbHVtZUZvb3Rlcic6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXIgLmJ0bl92b2x1bWUnKSxcclxuICAgICckYnRuVm9sdW1lQ3RybCc6ICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2wgLmJ0bl92b2x1bWUnKSxcclxuICAgICckYnRuUXVhbGl0eSc6ICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9xdWFsaXR5JyksXHJcbiAgICAnJGJ0blNjYWxlJzogICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY2FsZV9ib3hfX2J0bicpLFxyXG4gICAgJyRzdWJCdG5VcCc6ICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NhbGVfYm94X19zdWJidG5fdXAnKSxcclxuICAgICckc3ViQnRuRG93bic6ICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjYWxlX2JveF9fc3ViYnRuX2Rvd24nKSxcclxuICAgICckYnRuTWVudU9mZic6ICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3RlciAuYnRuX19tZW51X3N3aXRjaCcpLFxyXG4gICAgJyRidG5NZW51T24nOiAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbCAuYnRuX19tZW51X3N3aXRjaCcpLFxyXG4gICAgJyRidG5GdWxsU2NyT24nOiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyIC5idG5fX2Z1bGxzY3InKSxcclxuICAgICckYnRuRnVsbFNjck9mZic6ICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2wgLmJ0bl9fZnVsbHNjcicpLFxyXG4gICAgJ2FjdGl2ZSRpbnB1dCc6IG51bGwsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgb2JqZWN0XHJcbiAgICAnaXNGdWxsU2NyZWVuQWxsb3dlZCc6IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBib29sZWFuXHJcbiAgICAnaXNfaVBhZF9pUGhvbmUnOiAvKGlQaG9uZXxpUG9kfGlQYWQpLipBcHBsZVdlYktpdC9pLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpLCAgIC8vICBib29sZWFuXHJcbiAgICAnaXNfaVBhZF9pUGhvbmVfaW5GdWxsU2NyZWVuJzogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBib29sZWFuXHJcbiAgICAnYXNrJGJveEluRnVsbFNjcmVlbic6IG51bGwsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBmdW5jdGlvbiAtPiBib29sZWFuXHJcbiAgICAnaGlnaFF1YWxpdHknOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBib29sZWFuXHJcbiAgICAnZHVyYXRpb25DdHJsVmlzaWJsZSc6IDUwMDAsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBtc1xyXG4gICAgJ2NsYXNzTGlzdCc6IHtcclxuICAgICAgICAnY29udGFpbnMnOiBudWxsLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGZ1bmN0aW9uIC0+IGJvb2xlYW5cclxuICAgICAgICAnYWRkJzogbnVsbCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGZ1bmN0aW9uIC0+IHZvaWRcclxuICAgICAgICAncmVtb3ZlJzogbnVsbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGZ1bmN0aW9uIC0+IHZvaWRcclxuICAgICB9XHJcbiAgfTtcclxuXHJcbiAgcmVxdWlyZSgnLi9hc2tDaGFubmVsTGlzdC5qcycpXHJcbiAgd2luZG93LnZpZXdlclN0YXRlLmlzRnVsbFNjcmVlbkFsbG93ZWQgPSByZXF1aXJlKCcuL2Fza0Z1bGxTY3JlZW4uanMnKVxyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZV9pbkZ1bGxTY3JlZW4gPSByZXF1aXJlKCcuL2Fza19pUGFkX2lQaG9uZV9GdWxsU2NyZWVuLmpzJylcclxuICB3aW5kb3cudmlld2VyU3RhdGUuYXNrJGJveEluRnVsbFNjcmVlbiA9IHJlcXVpcmUoJy4vYXNrJGJveEluRnVsbFNjcmVlbi5qcycpXHJcbiAgd2luZG93LnZpZXdlclN0YXRlLmNsYXNzTGlzdCA9IHJlcXVpcmUoJy4vY2xhc3NMaXN0LmpzJylcclxuICByZXF1aXJlKCcuL3NjcmVlbkhlaWdodC5qcycpXHJcbiAgLy8gICAgSW5pdCBjb21wbGV0ZWRcclxuICByZXF1aXJlKCcuL2NoYW5uZWxTZWxlY3Rvci5qcycpXHJcbiAgcmVxdWlyZSgnLi9mdWxsc2NyZWVuT3JIaWRlTWVudS5qcycpXHJcbiAgcmVxdWlyZSgnLi9idXR0b25RdWFsaXR5LmpzJylcclxuICByZXF1aXJlKCcuL2J1dHRvblNjYWxlLmpzJylcclxuICByZXF1aXJlKCcuL2J1dHRvblBsYXlQYXVzZS5qcycpXHJcbiAgaWYoIXdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZSkgcmVxdWlyZSgnLi9idXR0b25Wb2x1bWUuanMnKVxyXG59IiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5zZXRGb250U2l6ZSgpXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzZXRGb250U2l6ZSlcclxuZnVuY3Rpb24gc2V0Rm9udFNpemUoKSB7XHJcbiAgICB2YXIgZm9udFNpemUgPSBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCAvIDIwXHJcbiAgICBpZihkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCA+IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgpIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmZvbnRTaXplID0gMC40ICogZm9udFNpemUgKyAncHgnXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuZm9udFNpemUgPSBmb250U2l6ZSArICdweCdcclxuICAgIH1cclxufSJdfQ==
