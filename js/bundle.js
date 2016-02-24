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
    $video.style.width = $box.clientWidth + 'px'
    $video.style.height = $box.clientWidth * $video.videoHeight / $video.videoWidth + 'px'
    scaledHorisontally = true
    console.log('screen: ' + $box.clientWidth + 'x' + $box.clientHeight + "\n"
                + 'video: ' + $box.clientWidth + 'x' + $box.clientWidth * $video.videoHeight / $video.videoWidth)
}
function scaleVertically() {
    $video.style.width = $box.clientHeight * $video.videoWidth / $video.videoHeight + 'px'
    $video.style.height = $box.clientHeight + 'px'
    scaledHorisontally = false
    console.log('screen: ' + $box.clientWidth + 'x' + $box.clientHeight + "\n"
                + 'video: ' + $box.clientHeight * $video.videoWidth / $video.videoHeight + 'x' + $box.clientHeight)
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
                $video.setAttribute('src', '')
                $source.setAttribute('src', '')
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
    if (window.viewerState.ask$boxInFullScreen())   startWatchMode()
    else                                            leaveWatchMode()
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
    if(document.querySelector('body').clientHeight < window.screen.availHeight){
        document.querySelector('body').style.height = window.screen.availHeight + 'px'
        is$bodyHeightChanged = true
    }
}
function leaveWatchMode(e) {
    clearTimeout(id)
    classList.remove($control, 'show_control')
    $control.removeEventListener('click', controlClickHandler)
    $box.removeEventListener('click', screenClickHandler)
    classList.remove($box, 'hide_menu')
    if(is$bodyHeightChanged){
        document.querySelector('body').style.height = ''
        is$bodyHeightChanged = false
    }
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2EwNS9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hc2skYm94SW5GdWxsU2NyZWVuLmpzIiwianMvYXNrQ2hhbm5lbExpc3QuanMiLCJqcy9hc2tGdWxsU2NyZWVuLmpzIiwianMvYXNrX2lQYWRfaVBob25lX0Z1bGxTY3JlZW4uanMiLCJqcy9idXR0b25QbGF5UGF1c2UuanMiLCJqcy9idXR0b25RdWFsaXR5LmpzIiwianMvYnV0dG9uU2NhbGUuanMiLCJqcy9idXR0b25Wb2x1bWUuanMiLCJqcy9jaGFubmVsU2VsZWN0b3IuanMiLCJqcy9jbGFzc0xpc3QuanMiLCJqcy9mdWxsc2NyZWVuT3JIaWRlTWVudS5qcyIsImpzL21haW4uanMiLCJqcy9zY3JlZW5IZWlnaHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUMxRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ25JQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbkNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcEdBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNsREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIGlmIChkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCB8fCBcclxuICAgICAgICBkb2N1bWVudC53ZWJraXRGdWxsc2NyZWVuRWxlbWVudCB8fFxyXG4gICAgICAgIGRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbGVtZW50IHx8XHJcbiAgICAgICAgZG9jdW1lbnQubXNGdWxsc2NyZWVuRWxlbWVudCB8fFxyXG4gICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZV9pbkZ1bGxTY3JlZW4gKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSByZXR1cm4gZmFsc2VcclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbnZhciAkc2lkZU1lbnVCb3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJHNpZGVNZW51Qm94LFxyXG4gICAgJHNsaWRlciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc2xpZGVyLFxyXG4gICAgJGJhbm5lciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXJfX2NlbnRlcl9fYmFubmVyJyksXHJcbiAgICBvUmVxID0gbmV3IFhNTEh0dHBSZXF1ZXN0KCksXHJcbiAgICBhdHRlbXB0ID0gMCxcclxuICAgIGNoYW5uZWxMaXN0ID0gW10sXHJcbiAgICBjaE5hbWUgPSAnJyxcclxuICAgIHN0eWxlID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnc3R5bGUnKSxcclxuICAgIGlucHV0ID0gbnVsbCxcclxuICAgIGxhYmVsID0gbnVsbFxyXG5zdHlsZS50eXBlID0gJ3RleHQvY3NzJ1xyXG53aW5kb3cudmlld2VyU3RhdGUuY2hMaXN0ID0ge31cclxuXHJcbm9SZXEuYWRkRXZlbnRMaXN0ZW5lcihcImxvYWRcIiwgcHJvY2Vzc0NoTGlzdClcclxub1JlcS5hZGRFdmVudExpc3RlbmVyKFwiZXJyb3JcIiwgdHJ5QWdhaW4pXHJcbm9SZXEuYWRkRXZlbnRMaXN0ZW5lcihcImFib3J0XCIsIHRyeUFnYWluKVxyXG5vUmVxLm9wZW4oXCJHRVRcIiwgXCIuL2NoYW5uZWxzLmpzb25cIilcclxub1JlcS5zZW5kKClcclxuXHJcbmZ1bmN0aW9uIHRyeUFnYWluKGUpIHtcclxuICAgIGNvbnNvbGUubG9nKGUpXHJcbiAgICBpZihhdHRlbXB0IDwgMykgb1JlcS5zZW5kKClcclxufVxyXG5mdW5jdGlvbiBwcm9jZXNzQ2hMaXN0ICgpIHtcclxuICAgIGNoYW5uZWxMaXN0ID0gSlNPTi5wYXJzZSh0aGlzLnJlc3BvbnNlVGV4dClcclxuICAgIGZvcih2YXIgaT0wOyBpPGNoYW5uZWxMaXN0Lmxlbmd0aDsgaSsrKXtcclxuICAgICAgICBpZiAoY2hhbm5lbExpc3RbaV0ubmFtZSA9PT0gJ2Jhbm5lcicpIHtcclxuICAgICAgICAgICAgJGJhbm5lci50ZXh0Q29udGVudCA9IGNoYW5uZWxMaXN0W2ldLnRleHRcclxuICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICBjaE5hbWUgPSAnY2hfJyArIGNoYW5uZWxMaXN0W2ldLm5hbWVcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmNoTGlzdFtjaE5hbWVdID0ge31cclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmNoTGlzdFtjaE5hbWVdLmxxID0gY2hhbm5lbExpc3RbaV0ubHFcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmNoTGlzdFtjaE5hbWVdLmhxID0gY2hhbm5lbExpc3RbaV0uaHFcclxuXHJcbiAgICAgICAgICAgIGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKVxyXG4gICAgICAgICAgICBpbnB1dC50eXBlID0gJ3JhZGlvJ1xyXG4gICAgICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2lkJywgY2hOYW1lKVxyXG4gICAgICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ25hbWUnLCAnY2gtc2VsZWN0b3InKVxyXG4gICAgICAgICAgICAkc2xpZGVyLmFwcGVuZENoaWxkKGlucHV0KVxyXG5cclxuICAgICAgICAgICAgbGFiZWwgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdsYWJlbCcpXHJcbiAgICAgICAgICAgIGxhYmVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAnc2lkZWJhcl9fc2xpZGVyX19idXR0b24gJyArIGNoTmFtZSlcclxuICAgICAgICAgICAgbGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCBjaE5hbWUpXHJcbiAgICAgICAgICAgICRzbGlkZXIuYXBwZW5kQ2hpbGQobGFiZWwpXHJcblxyXG4gICAgICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gJy5zaWRlYmFyX19zbGlkZXJfX2J1dHRvbi4nICsgY2hOYW1lIFxyXG4gICAgICAgICAgICAgICAgKyAnIHtiYWNrZ3JvdW5kLXBvc2l0aW9uOiAnICsgY2hhbm5lbExpc3RbaV0uaWNvbl94X3Bvc2l0aW9uX2J3ICsgJ2VtICdcclxuICAgICAgICAgICAgICAgICsgY2hhbm5lbExpc3RbaV0uaWNvbl95X3Bvc2l0aW9uICsgJ2VtLCBsZWZ0O31cXG4nXHJcbiAgICAgICAgICAgIHN0eWxlLmlubmVySFRNTCArPSAnIycgKyBjaE5hbWUgKyAnOmNoZWNrZWQgKyBsYWJlbC5zaWRlYmFyX19zbGlkZXJfX2J1dHRvbidcclxuICAgICAgICAgICAgICAgICsgJyB7YmFja2dyb3VuZC1wb3NpdGlvbjogJyArIGNoYW5uZWxMaXN0W2ldLmljb25feF9wb3NpdGlvbl9jb2xvciArICdlbSAnXHJcbiAgICAgICAgICAgICAgICArIGNoYW5uZWxMaXN0W2ldLmljb25feV9wb3NpdGlvbiArICdlbSwgbGVmdDt9XFxuJ1xyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpO1xyXG4gICAgJHNpZGVNZW51Qm94LnN0eWxlLnZpc2liaWxpdHkgPSAnJ1xyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyICRib3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJGJveFxyXG4gICAgaWYgKCRib3gucmVxdWVzdEZ1bGxzY3JlZW4gfHxcclxuICAgICAgICAkYm94Lm1velJlcXVlc3RGdWxsU2NyZWVuIHx8XHJcbiAgICAgICAgJGJveC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbiB8fFxyXG4gICAgICAgICRib3gubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xyXG4gICAgICAgIHJldHVybiB0cnVlIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2UgXHJcbiAgICB9XHJcbn0pKClcclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZSAmJiB3aW5kb3cuaW5uZXJIZWlnaHQgPj0gd2luZG93LnNjcmVlbi5hdmFpbEhlaWdodCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9IGVsc2UgcmV0dXJuIGZhbHNlXHJcbn0pKClcclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgJHZpZGVvID0gd2luZG93LnZpZXdlclN0YXRlLiR2aWRlbyxcclxuICAgICRidG5QbGF5Rm9vdGVyID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5QbGF5Rm9vdGVyLFxyXG4gICAgJGJ0blBsYXlDdHJsID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5QbGF5Q3RybCxcclxuICAgICRzdmdQbGF5Rm9vdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3RlciAuYnRuX3BsYXlfX2ljb25fcGxheScpLFxyXG4gICAgJHN2Z1BsYXlDdHJsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2wgLmJ0bl9wbGF5X19pY29uX3BsYXknKSxcclxuICAgICRzdmdQYXVzZUZvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXIgLmJ0bl9wbGF5X19pY29uX3BhdXNlJyksXHJcbiAgICAkc3ZnUGF1c2VDdHJsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2wgLmJ0bl9wbGF5X19pY29uX3BhdXNlJyksXHJcbiAgICBjbGFzc0xpc3QgPSB3aW5kb3cudmlld2VyU3RhdGUuY2xhc3NMaXN0XHJcblxyXG4kYnRuUGxheUZvb3Rlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZVBsYXlQYXVzZSlcclxuJGJ0blBsYXlDdHJsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlUGxheVBhdXNlKVxyXG4kdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxufSlcclxuZnVuY3Rpb24gdG9nZ2xlUGxheVBhdXNlKCl7XHJcbiAgICBpZiAoJHZpZGVvLnBhdXNlZCkge1xyXG4gICAgICAgICR2aWRlby5wbGF5KClcclxuICAgICAgICBzZXRJY29uc1BhdXNlKClcclxuICAgIH0gXHJcbiAgICBlbHNlIHtcclxuICAgICAgICAkdmlkZW8ucGF1c2UoKVxyXG4gICAgICAgIHNldEljb25zUGxheSgpXHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gc2V0SWNvbnNQbGF5KCkge1xyXG4gICAgY2xhc3NMaXN0LmFkZCgkc3ZnUGxheUZvb3RlciwgXCJhY3RpdmVcIilcclxuICAgIGNsYXNzTGlzdC5hZGQoJHN2Z1BsYXlDdHJsLCBcImFjdGl2ZVwiKVxyXG4gICAgY2xhc3NMaXN0LnJlbW92ZSgkc3ZnUGF1c2VGb290ZXIsIFwiYWN0aXZlXCIpXHJcbiAgICBjbGFzc0xpc3QucmVtb3ZlKCRzdmdQYXVzZUN0cmwsIFwiYWN0aXZlXCIpXHJcbn1cclxuZnVuY3Rpb24gc2V0SWNvbnNQYXVzZSgpIHtcclxuICAgIGNsYXNzTGlzdC5hZGQoJHN2Z1BhdXNlRm9vdGVyLCBcImFjdGl2ZVwiKVxyXG4gICAgY2xhc3NMaXN0LmFkZCgkc3ZnUGF1c2VDdHJsLCBcImFjdGl2ZVwiKVxyXG4gICAgY2xhc3NMaXN0LnJlbW92ZSgkc3ZnUGxheUZvb3RlciwgXCJhY3RpdmVcIilcclxuICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z1BsYXlDdHJsLCBcImFjdGl2ZVwiKVxyXG59IiwiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgJGJ0blF1YWxpdHkgPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0blF1YWxpdHksXHJcbiAgICAkc3ZnUXVhbGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fcXVhbGl0eV9faWNvbicpLFxyXG4gICAgJHZpZGVvID0gd2luZG93LnZpZXdlclN0YXRlLiR2aWRlbyxcclxuICAgICRzb3VyY2UgPSB3aW5kb3cudmlld2VyU3RhdGUuJHNvdXJjZSxcclxuICAgICRidG5NZW51T2ZmID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5NZW51T2ZmLFxyXG4gICAgY2xhc3NMaXN0ID0gd2luZG93LnZpZXdlclN0YXRlLmNsYXNzTGlzdCxcclxuICAgIGxpbmsgPSAnJ1xyXG5cclxuJGJ0blF1YWxpdHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVRdWFsaXR5KVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZnVsbHNjcmVlbmNoYW5nZVwiLCBzdHlsZVF1YWxpdHlCdXR0b24pXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ3ZWJraXRmdWxsc2NyZWVuY2hhbmdlXCIsIHN0eWxlUXVhbGl0eUJ1dHRvbilcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vemZ1bGxzY3JlZW5jaGFuZ2VcIiwgc3R5bGVRdWFsaXR5QnV0dG9uKVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiTVNGdWxsc2NyZWVuQ2hhbmdlXCIsIHN0eWxlUXVhbGl0eUJ1dHRvbilcclxuJGJ0bk1lbnVPZmYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdHlsZVF1YWxpdHlCdXR0b24pXHJcblxyXG5mdW5jdGlvbiB0b2dnbGVRdWFsaXR5KCl7XHJcbiAgICB2YXIgY2ggPSB3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0LmdldEF0dHJpYnV0ZSgnaWQnKVxyXG4gICAgaWYgKHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSkge1xyXG4gICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSA9IGZhbHNlXHJcbiAgICAgICAgbGluayA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5jaExpc3RbY2hdLmxxXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSA9IHRydWVcclxuICAgICAgICBsaW5rID0gd2luZG93LnZpZXdlclN0YXRlLmNoTGlzdFtjaF0uaHFcclxuICAgIH1cclxuICAgIGlmKHdpbmRvdy5obHMpe1xyXG4gICAgICAgIHdpbmRvdy5obHMuZGVzdHJveSgpXHJcbiAgICAgICAgd2luZG93LmhscyA9IG5ldyB3aW5kb3cuSGxzKCk7XHJcbiAgICAgICAgd2luZG93Lmhscy5hdHRhY2hNZWRpYSh3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvKTtcclxuICAgICAgICB3aW5kb3cuaGxzLm9uKHdpbmRvdy5IbHMuRXZlbnRzLk1FRElBX0FUVEFDSEVELGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInZpZGVvIGFuZCB3aW5kb3cuaGxzLmpzIGFyZSBub3cgYm91bmQgdG9nZXRoZXIgIVwiKTtcclxuICAgICAgICAgICAgd2luZG93Lmhscy5sb2FkU291cmNlKGxpbmspO1xyXG4gICAgICAgICAgICB3aW5kb3cuaGxzLm9uKHdpbmRvdy5IbHMuRXZlbnRzLk1BTklGRVNUX1BBUlNFRCwgZnVuY3Rpb24oZXZlbnQsZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpPTA7IGk8d2luZG93Lmhscy5sZXZlbHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBpICsgJ1xcdGJpdHJhdGU6JyArIHdpbmRvdy5obHMubGV2ZWxzW2ldLmJpdHJhdGUgKyAnXFx0aDonICsgd2luZG93Lmhscy5sZXZlbHNbaV0uaGVpZ2h0ICsgJ1xcdHc6JyArIHdpbmRvdy5obHMubGV2ZWxzW2ldLndpZHRoICsgJ1xcbicpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICR2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgICAgJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICB9XHJcbiAgICAkdmlkZW8ucGxheSgpXHJcbiAgICBzdHlsZVF1YWxpdHlCdXR0b24oKVxyXG59XHJcbmZ1bmN0aW9uIHN0eWxlUXVhbGl0eUJ1dHRvbigpIHtcclxuICAgIGlmICh3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkpIHtcclxuICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRzdmdRdWFsaXR5LCAnZGlzYWJsZWQnKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjbGFzc0xpc3QuYWRkKCRzdmdRdWFsaXR5LCAnZGlzYWJsZWQnKVxyXG4gICAgfVxyXG59IiwiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgJGJveCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYm94LFxyXG4gICAgJHZpZGVvID0gd2luZG93LnZpZXdlclN0YXRlLiR2aWRlbyxcclxuICAgICRidG5TY2FsZSA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuU2NhbGUsXHJcbiAgICAkc3ZnU2NhbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NhbGVfYm94X19idG5faWNvbicpLFxyXG4gICAgJGJ0blNjYWxlU3ViQnRuc0JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY2FsZV9ib3hfX3N1YmJ0bnMnKSxcclxuICAgICRzdWJCdG5VcCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc3ViQnRuVXAsXHJcbiAgICAkc3ViQnRuRG93biA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc3ViQnRuRG93bixcclxuICAgICRzdWJCdG5VcEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3ViYnRuX3VwJyksXHJcbiAgICAkc3ViQnRuRG93bkljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3ViYnRuX2Rvd24nKSxcclxuICAgICRidG5NZW51T2ZmID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5NZW51T2ZmLFxyXG4gICAgJGJ0bk1lbnVPbiA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuTWVudU9uLFxyXG4gICAgY2xhc3NMaXN0ID0gd2luZG93LnZpZXdlclN0YXRlLmNsYXNzTGlzdCxcclxuICAgIGluaXQkdmlkZW9IZWlnaHQgPSB1bmRlZmluZWQsXHJcbiAgICBpbml0JHZpZGVvV2lkdGggPSB1bmRlZmluZWQsXHJcbiAgICBzY2FsZWRIb3Jpc29udGFsbHkgPSBmYWxzZVxyXG5cclxuY2xhc3NMaXN0LmFkZCgkc3ZnU2NhbGUsICdkaXNhYmxlZCcpXHJcblxyXG4kdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGxheWluZycsIGluaXQpXHJcbiRidG5NZW51T2ZmLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2NhbGVCdG5PbilcclxuJGJ0bk1lbnVPbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNjYWxlQnRuT2ZmKVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdmdWxsc2NyZWVuY2hhbmdlJywgZnVsbFNjcmVlbkNoYW5nZSlcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsIGZ1bGxTY3JlZW5DaGFuZ2UpXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLCBmdWxsU2NyZWVuQ2hhbmdlKVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdNU0Z1bGxzY3JlZW5DaGFuZ2UnLCBmdWxsU2NyZWVuQ2hhbmdlKVxyXG5cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gICAgc2V0VGltZW91dChzY2FsZUhvcmlzb250YWxseSwgMzAwKVxyXG59XHJcbmZ1bmN0aW9uIHNjYWxlSG9yaXNvbnRhbGx5KCkge1xyXG4gICAgJHZpZGVvLnN0eWxlLndpZHRoID0gJGJveC5jbGllbnRXaWR0aCArICdweCdcclxuICAgICR2aWRlby5zdHlsZS5oZWlnaHQgPSAkYm94LmNsaWVudFdpZHRoICogJHZpZGVvLnZpZGVvSGVpZ2h0IC8gJHZpZGVvLnZpZGVvV2lkdGggKyAncHgnXHJcbiAgICBzY2FsZWRIb3Jpc29udGFsbHkgPSB0cnVlXHJcbiAgICBjb25zb2xlLmxvZygnc2NyZWVuOiAnICsgJGJveC5jbGllbnRXaWR0aCArICd4JyArICRib3guY2xpZW50SGVpZ2h0ICsgXCJcXG5cIlxyXG4gICAgICAgICAgICAgICAgKyAndmlkZW86ICcgKyAkYm94LmNsaWVudFdpZHRoICsgJ3gnICsgJGJveC5jbGllbnRXaWR0aCAqICR2aWRlby52aWRlb0hlaWdodCAvICR2aWRlby52aWRlb1dpZHRoKVxyXG59XHJcbmZ1bmN0aW9uIHNjYWxlVmVydGljYWxseSgpIHtcclxuICAgICR2aWRlby5zdHlsZS53aWR0aCA9ICRib3guY2xpZW50SGVpZ2h0ICogJHZpZGVvLnZpZGVvV2lkdGggLyAkdmlkZW8udmlkZW9IZWlnaHQgKyAncHgnXHJcbiAgICAkdmlkZW8uc3R5bGUuaGVpZ2h0ID0gJGJveC5jbGllbnRIZWlnaHQgKyAncHgnXHJcbiAgICBzY2FsZWRIb3Jpc29udGFsbHkgPSBmYWxzZVxyXG4gICAgY29uc29sZS5sb2coJ3NjcmVlbjogJyArICRib3guY2xpZW50V2lkdGggKyAneCcgKyAkYm94LmNsaWVudEhlaWdodCArIFwiXFxuXCJcclxuICAgICAgICAgICAgICAgICsgJ3ZpZGVvOiAnICsgJGJveC5jbGllbnRIZWlnaHQgKiAkdmlkZW8udmlkZW9XaWR0aCAvICR2aWRlby52aWRlb0hlaWdodCArICd4JyArICRib3guY2xpZW50SGVpZ2h0KVxyXG59XHJcblxyXG5mdW5jdGlvbiBmdWxsU2NyZWVuQ2hhbmdlKCkge1xyXG4gICAgaWYod2luZG93LnZpZXdlclN0YXRlLmFzayRib3hJbkZ1bGxTY3JlZW4oKSl7XHJcbiAgICAgICAgc2NhbGVCdG5PbigpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNjYWxlQnRuT2ZmKClcclxuICAgIH1cclxuICAgIHNldFRpbWVvdXQoc2NhbGVIb3Jpc29udGFsbHksIDMwMClcclxufVxyXG5mdW5jdGlvbiBzY2FsZUJ0bk9uKCkge1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCRib3guY2xpZW50V2lkdGggIT09ICR2aWRlby5vZmZzZXRXaWR0aCB8fCAkYm94LmNsaWVudEhlaWdodCAhPT0gJHZpZGVvLm9mZnNldEhlaWdodCkge1xyXG4gICAgICAgICAgICAkYnRuU2NhbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVTY3JlZW5BbGlnbilcclxuICAgICAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgkc3ZnU2NhbGUsICdkaXNhYmxlZCcpXHJcbiAgICAgICAgfSBlbHNlIGNsYXNzTGlzdC5hZGQoJHN2Z1NjYWxlLCAnZGlzYWJsZWQnKVxyXG4gICAgfSwgMzAwKVxyXG59XHJcbmZ1bmN0aW9uIHNjYWxlQnRuT2ZmKCkge1xyXG4gICAgJGJ0blNjYWxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlU2NyZWVuQWxpZ24pXHJcbiAgICBjbGFzc0xpc3QuYWRkKCRzdmdTY2FsZSwgJ2Rpc2FibGVkJylcclxuICAgIHNldFRpbWVvdXQoc2NhbGVIb3Jpc29udGFsbHksIDMwMClcclxufVxyXG5mdW5jdGlvbiB0b2dnbGVTY3JlZW5BbGlnbigpIHtcclxuICAgIGlmKHNjYWxlZEhvcmlzb250YWxseSl7XHJcbiAgICAgICAgc2NhbGVWZXJ0aWNhbGx5KClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2NhbGVIb3Jpc29udGFsbHkoKVxyXG4gICAgfVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8sXHJcbiAgICAkYnRuVm9sdW1lRm9vdGVyID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5Wb2x1bWVGb290ZXIsXHJcbiAgICAkYnRuVm9sdW1lQ3RybCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuVm9sdW1lQ3RybCxcclxuICAgICRzdmdWb2x1bWVPbkZvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXIgLmJ0bl92b2x1bWVfX2ljb25fb24nKSxcclxuICAgICRzdmdWb2x1bWVPbkN0cmwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbCAuYnRuX3ZvbHVtZV9faWNvbl9vbicpLFxyXG4gICAgJHN2Z1ZvbHVtZU9mZkZvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXIgLmJ0bl92b2x1bWVfX2ljb25fb2ZmJyksXHJcbiAgICAkc3ZnVm9sdW1lT2ZmQ3RybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sIC5idG5fdm9sdW1lX19pY29uX29mZicpLFxyXG4gICAgY2xhc3NMaXN0ID0gd2luZG93LnZpZXdlclN0YXRlLmNsYXNzTGlzdFxyXG5cclxuJGJ0blZvbHVtZUZvb3Rlci5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jaydcclxuJGJ0blZvbHVtZUN0cmwuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snXHJcblxyXG4kYnRuVm9sdW1lRm9vdGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbXV0ZSlcclxuJGJ0blZvbHVtZUN0cmwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBtdXRlKVxyXG5cclxuZnVuY3Rpb24gbXV0ZSgpe1xyXG4gICAgaWYgKCR2aWRlby5tdXRlZCl7XHJcbiAgICAgICAgJHZpZGVvLm11dGVkID0gZmFsc2VcclxuICAgICAgICAkdmlkZW8udm9sdW1lID0gMS4wXHJcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgkc3ZnVm9sdW1lT25Gb290ZXIsIFwiYWN0aXZlXCIpXHJcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgkc3ZnVm9sdW1lT25DdHJsLCBcImFjdGl2ZVwiKVxyXG4gICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z1ZvbHVtZU9mZkZvb3RlciwgXCJhY3RpdmVcIilcclxuICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRzdmdWb2x1bWVPZmZDdHJsLCBcImFjdGl2ZVwiKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkdmlkZW8udm9sdW1lID0gMC4wXHJcbiAgICAgICAgJHZpZGVvLm11dGVkID0gdHJ1ZVxyXG4gICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z1ZvbHVtZU9uRm9vdGVyLCBcImFjdGl2ZVwiKVxyXG4gICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z1ZvbHVtZU9uQ3RybCwgXCJhY3RpdmVcIilcclxuICAgICAgICBjbGFzc0xpc3QuYWRkKCRzdmdWb2x1bWVPZmZGb290ZXIsIFwiYWN0aXZlXCIpXHJcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgkc3ZnVm9sdW1lT2ZmQ3RybCwgXCJhY3RpdmVcIilcclxuICAgIH0gXHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCJcclxuXHJcbnZhciAkdmlkZW8gPSB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvLFxyXG4gICAgJHNvdXJjZSA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc291cmNlLFxyXG4gICAgJHNsaWRlciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc2xpZGVyLFxyXG4gICAgJGJveCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYm94LFxyXG4gICAgY2xhc3NMaXN0ID0gd2luZG93LnZpZXdlclN0YXRlLmNsYXNzTGlzdCxcclxuICAgIGxpbmsgPSAnJ1xyXG53aW5kb3cuSGxzID0gbnVsbFxyXG53aW5kb3cuaGxzID0gbnVsbFxyXG5cclxuJHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgdmFyIGNoID0gJydcclxuICAgIGlmKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdJTlBVVCcpe1xyXG4gICAgICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQgPT09IGUudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQuY2hlY2tlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQgPSBudWxsXHJcbiAgICAgICAgICAgIGlmKHdpbmRvdy5IbHMgJiYgd2luZG93Lkhscy5pc1N1cHBvcnRlZCgpKSB7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuaGxzLmRlc3Ryb3koKVxyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgJycpXHJcbiAgICAgICAgICAgICAgICAkc291cmNlLnNldEF0dHJpYnV0ZSgnc3JjJywgJycpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgkdmlkZW8sICdhY3RpdmUnKVxyXG4gICAgICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRib3gsICdzaG93X2Zvb3RlcicpXHJcbiAgICAgICAgICAgICR2aWRlby5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIGZhaWxlZClcclxuICAgICAgICAgICAgJHZpZGVvLmxvYWQoKVxyXG4gICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQgPSBlLnRhcmdldFxyXG4gICAgICAgICAgICBjaCA9IGUudGFyZ2V0LmdldEF0dHJpYnV0ZSgnaWQnKVxyXG4gICAgICAgICAgICBsaW5rID0gd2luZG93LnZpZXdlclN0YXRlLmNoTGlzdFtjaF0ubHFcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5ID0gZmFsc2VcclxuICAgICAgICAgICAgaWYod2luZG93LkhscyAmJiB3aW5kb3cuSGxzLmlzU3VwcG9ydGVkKCkpIHtcclxuICAgICAgICAgICAgICAgIHNob3dWaWRlb1ZpYUhscygpXHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICAgICAgICAgICAgJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgY2xhc3NMaXN0LmFkZCgkdmlkZW8sICdhY3RpdmUnKVxyXG4gICAgICAgICAgICAkdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmYWlsZWQpXHJcbiAgICAgICAgICAgIGlmKCR2aWRlby5wbGF5KSAkdmlkZW8ucGxheSgpO1xyXG4gICAgICAgICAgICBlbHNlIGFsZXJ0ICgndmlkZW8gY2Fubm90IHBsYXknKVxyXG4gICAgICAgICAgICBjbGFzc0xpc3QuYWRkKCRib3gsICdzaG93X2Zvb3RlcicpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KVxyXG5cclxuZnVuY3Rpb24gZmFpbGVkKGUpIHtcclxuICAgLy8gdmlkZW8gcGxheWJhY2sgZmFpbGVkIC0gc2hvdyBhIG1lc3NhZ2Ugc2F5aW5nIHdoeSAgICAgLSBmcm9tIGh0dHBzOi8vZGV2LnczLm9yZy9odG1sNS9zcGVjLWF1dGhvci12aWV3L3ZpZGVvLmh0bWwjdmlkZW9cclxuICAgc3dpdGNoIChlLnRhcmdldC5lcnJvci5jb2RlKSB7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfQUJPUlRFRDpcclxuICAgICAgIGFsZXJ0KCfQktC+0YHQv9GA0L7QuNC30LLQtdC00LXQvdC40LUg0LLQuNC00LXQviDQv9GA0LXRgNCy0LDQvdC+LicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfTkVUV09SSzpcclxuICAgICAgIGFsZXJ0KCfQntGI0LjQsdC60LAg0YHQtdGC0Lgg0L/RgNC40LLQtdC70LAg0Log0L3QsNGA0YPRiNC10L3QuNGOINC30LDQs9GA0YPQt9C60Lgg0LLQuNC00LXQvicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfREVDT0RFOlxyXG4gICAgICAgYWxlcnQoJ9CS0L7RgdC/0YDQvtC40LfQstC10LTQtdC90LjQtSDQstC40LTQtdC+INC/0YDQtdC60YDQsNGJ0LXQvdC+INC40Lct0LfQsCDQuNGB0LrQsNC20LXQvdC40Lkg0L/RgNC4INC/0LXRgNC10LTQsNGH0LUg0LjQu9C4INC/0L7RgtC+0LzRgywg0YfRgtC+INCy0LjQtNC10L4g0LjRgdC/0L7Qu9GM0LfRg9C10YIg0L3QtdC00L7RgdGC0YPQv9C90YvQtSDQsiDQktCw0YjQtdC8INCx0YDQsNGD0LfQtdGA0LUg0YTRg9C90LrRhtC40LguJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgICBjYXNlIGUudGFyZ2V0LmVycm9yLk1FRElBX0VSUl9TUkNfTk9UX1NVUFBPUlRFRDpcclxuICAgICAgIGlmICh3aW5kb3cuSGxzICYmIHdpbmRvdy5IbHMuaXNTdXBwb3J0ZWQoKSl7XHJcbiAgICAgICAgICAgYWxlcnQoJ9CS0LjQtNC10L4g0L3QtSDQvNC+0LbQtdGCINCx0YvRgtGMINC30LDQs9GA0YPQttC10L3QviDQuNC3LdC30LAg0YHQsdC+0Y8g0LIg0LIg0LTQvtGB0YLRg9C/0LUg0Log0YHQtdGA0LLQtdGA0YMg0LjQu9C4INGN0YLQvtGCINCy0LjQtNC10L7RhNC+0YDQvNCw0YIg0L3QtSDQv9C+0LTQtNC10YDQttC40LLQsNC10YLRgdGPINCS0LDRiNC40Lwg0LHRgNCw0YPQt9C10YDQvtC8LicpO1xyXG4gICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICBsb2FkSGxzKClcclxuICAgICAgIH1cclxuICAgICAgIGJyZWFrO1xyXG4gICAgIGRlZmF1bHQ6XHJcbiAgICAgICBhbGVydCgn0J/RgNC+0LjQt9C+0YjQu9CwINC+0YjQuNCx0LrQsC4g0J/QvtC/0YDQvtCx0YPQudGC0LUg0LXRidC1LicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgIH1cclxufVxyXG5mdW5jdGlvbiBsb2FkSGxzKCl7XHJcbiAgICAkdmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmYWlsZWQpXHJcbiAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKVxyXG4gICAgc2NyaXB0LnR5cGUgPSBcInRleHQvamF2YXNjcmlwdFwiXHJcbiAgICBpZiAoc2NyaXB0LnJlYWR5U3RhdGUpeyAgLy9JRVxyXG4gICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICBpZiAoc2NyaXB0LnJlYWR5U3RhdGUgPT0gXCJsb2FkZWRcIiB8fFxyXG4gICAgICAgICAgICAgICAgICAgIHNjcmlwdC5yZWFkeVN0YXRlID09IFwiY29tcGxldGVcIil7XHJcbiAgICAgICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgIHJ1bkhscygpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9O1xyXG4gICAgfSBlbHNlIHsgIC8vT3RoZXJzXHJcbiAgICAgICAgc2NyaXB0Lm9ubG9hZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgIGNvbnNvbGUubG9nKCdobHMgbG9hZGVkICcgKyBEYXRlLm5vdygpKVxyXG4gICAgICAgICAgICBydW5IbHMoKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxuICAgIHNjcmlwdC5zcmMgPSAnLi9qcy9obHMubWluLmpzJ1xyXG4gICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKHNjcmlwdClcclxufVxyXG5mdW5jdGlvbiBydW5IbHMoKSB7XHJcbiAgICAkdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCAnJylcclxuICAgICRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCAnJylcclxuICAgIHNob3dWaWRlb1ZpYUhscygpXHJcbiAgICBpZigkdmlkZW8ucGxheSkgJHZpZGVvLnBsYXkoKVxyXG4gICAgZWxzZSBhbGVydCAoJ3ZpZGVvIGNhbm5vdCBwbGF5JylcclxuXHJcbiAgICB3aW5kb3cuaGxzLm9uKHdpbmRvdy5IbHMuRXZlbnRzLkVSUk9SLGZ1bmN0aW9uKGV2ZW50LGRhdGEpIHtcclxuICAgICAgICBpZihkYXRhLmZhdGFsKSB7XHJcbiAgICAgICAgICAgIHN3aXRjaChkYXRhLnR5cGUpIHtcclxuICAgICAgICAgICAgICAgIGNhc2Ugd2luZG93Lkhscy5FcnJvclR5cGVzLk5FVFdPUktfRVJST1I6XHJcbiAgICAgICAgICAgICAgICAvLyB0cnkgdG8gcmVjb3ZlciBuZXR3b3JrIGVycm9yXHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmYXRhbCBuZXR3b3JrIGVycm9yIGVuY291bnRlcmVkLCB0cnkgdG8gcmVjb3ZlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuaGxzLnN0YXJ0TG9hZCgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgY2FzZSB3aW5kb3cuSGxzLkVycm9yVHlwZXMuTUVESUFfRVJST1I6XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJmYXRhbCBtZWRpYSBlcnJvciBlbmNvdW50ZXJlZCwgdHJ5IHRvIHJlY292ZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Lmhscy5yZWNvdmVyTWVkaWFFcnJvcigpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICAgICAgZGVmYXVsdDpcclxuICAgICAgICAgICAgICAgIC8vIGNhbm5vdCByZWNvdmVyXHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Lmhscy5kZXN0cm95KCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KVxyXG59XHJcbmZ1bmN0aW9uIHNob3dWaWRlb1ZpYUhscygpe1xyXG4gICAgaWYod2luZG93Lmhscykgd2luZG93Lmhscy5kZXN0cm95KClcclxuICAgIHdpbmRvdy5obHMgPSBuZXcgd2luZG93LkhscygpO1xyXG4gICAgd2luZG93Lmhscy5hdHRhY2hNZWRpYSh3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvKTtcclxuICAgIHdpbmRvdy5obHMub24od2luZG93Lkhscy5FdmVudHMuTUVESUFfQVRUQUNIRUQsZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgd2luZG93Lmhscy5sb2FkU291cmNlKGxpbmspO1xyXG4gICAgICAgIHdpbmRvdy5obHMub24od2luZG93Lkhscy5FdmVudHMuTUFOSUZFU1RfUEFSU0VELCBmdW5jdGlvbihldmVudCxkYXRhKSB7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaT0wOyBpPHdpbmRvdy5obHMubGV2ZWxzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBpICsgJ1xcdGJpdHJhdGU6JyArIHdpbmRvdy5obHMubGV2ZWxzW2ldLmJpdHJhdGUgKyAnXFx0aDonICsgd2luZG93Lmhscy5sZXZlbHNbaV0uaGVpZ2h0ICsgJ1xcdHc6JyArIHdpbmRvdy5obHMubGV2ZWxzW2ldLndpZHRoICsgJ1xcbicpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbn0iLCIndXNlIHN0cmljdCdcclxuXHJcbi8vICBwb2x5ZmlsbCBmb3IgZWxlbWVudC5jbGFzc0xpc3QgXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgJ2NvbnRhaW5zJzogZnVuY3Rpb24oZWwsIGNscykge1xyXG4gICAgICAgIGlmKGVsLmNsYXNzTGlzdCkgcmV0dXJuIGVsLmNsYXNzTGlzdC5jb250YWlucyhjbHMpXHJcbiAgICAgICAgdmFyIGFyciA9IGVsLmdldEF0dHJpYnV0ZSgnY2xhc3MnKS5zcGxpdCgnICcpXHJcbiAgICAgICAgZm9yKHZhciBpPTA7IGk8YXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoYXJyW2ldID09IGNscykgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9LFxyXG4gICAgJ2FkZCc6IGZ1bmN0aW9uKGVsLCBjbHMpIHtcclxuICAgICAgICBpZihlbC5jbGFzc0xpc3QpIHtcclxuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChjbHMpXHJcbiAgICAgICAgICAgIHJldHVybiBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXdpbmRvdy52aWV3ZXJTdGF0ZS5jbGFzc0xpc3QuY29udGFpbnMoZWwsIGNscykpe1xyXG4gICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgZWwuZ2V0QXR0cmlidXRlKCdjbGFzcycpICsgJyAnICsgY2xzKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAncmVtb3ZlJzogZnVuY3Rpb24oZWwsIGNscykge1xyXG4gICAgICAgIGlmKGVsLmNsYXNzTGlzdCkge1xyXG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNscylcclxuICAgICAgICAgICAgcmV0dXJuIFxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgdmFyIGFyciA9IGVsLmdldEF0dHJpYnV0ZSgnY2xhc3MnKS5zcGxpdCgnICcpXHJcbiAgICAgICAgdmFyIHJlcyA9ICcnXHJcbiAgICAgICAgZm9yKHZhciBpPTA7IGk8YXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoYXJyW2ldICE9IGNscykge1xyXG4gICAgICAgICAgICAgICAgcmVzICs9IGFycltpXSArICcgJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCByZXMpXHJcbiAgICB9XHJcbn0iLCIndXNlIHN0cmljdCdcblxudmFyICRib3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJGJveCxcbiAgICAkYnRuRnVsbFNjck9uID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5GdWxsU2NyT24sXG4gICAgJGJ0bkZ1bGxTY3JPZmYgPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0bkZ1bGxTY3JPZmYsXG4gICAgJGJ0bk1lbnVPZmYgPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0bk1lbnVPZmYsXG4gICAgJGJ0bk1lbnVPbiA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuTWVudU9uLFxuICAgICRib3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJGJveCxcbiAgICAkY29udHJvbCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kY29udHJvbCxcbiAgICAkc3ZnRnVsbFNjck9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9fZnVsbHNjci5vbicpLFxuICAgIGR1cmF0aW9uQ3RybFZpc2libGUgPSB3aW5kb3cudmlld2VyU3RhdGUuZHVyYXRpb25DdHJsVmlzaWJsZSxcbiAgICBjbGFzc0xpc3QgPSB3aW5kb3cudmlld2VyU3RhdGUuY2xhc3NMaXN0LFxuICAgIGlzJGJvZHlIZWlnaHRDaGFuZ2VkID0gZmFsc2UsXG4gICAgaWQgPSB1bmRlZmluZWRcblxuaWYgKCB3aW5kb3cudmlld2VyU3RhdGUuaXNGdWxsU2NyZWVuQWxsb3dlZCApIHtcbiAgJGJ0bk1lbnVPZmYuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAkYnRuTWVudU9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgJGJ0bkZ1bGxTY3JPbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGdvRnVsbFNjcmVlbilcbiAgJGJ0bkZ1bGxTY3JPZmYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBnZXRPZmZGdWxsc2NyZWVuKVxufSBlbHNlIGlmICh3aW5kb3cudmlld2VyU3RhdGUuaXNfaVBhZF9pUGhvbmUgJiZcbiAgICAgICAgICAgIXdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZV9pbkZ1bGxTY3JlZW4pIHtcbiAgJGJ0bkZ1bGxTY3JPbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICBhbGVydCgn0KfRgtC+0LHRiyDQvtCx0YDQtdGB0YLQuCDQv9C+0LvQvdC+0Y3QutGA0LDQvdC90YvQuSDRgNC10LbQuNC8INC90LDQtNC+INGB0LTQtdC70LDRgtGMINCy0YHQtdCz0L4g0L3QtdGB0LrQvtC70YzQutC+INGI0LDQs9C+0LI6XFxuJ1xuICAgICAgICArICfQqNCw0LMgMS4g0J3QsNC20LzQuNGC0LUg0L3QsCDQutC90L7Qv9C60YMgXCLQntGC0L/RgNCw0LLQuNGC0YxcIiAo0LLRi9Cz0LvRj9C00LjRgiDQutCw0Log0LrQstCw0LTRgNCw0YIg0YHQviDRgdGC0YDQtdC70L7Rh9C60L7QuSDQstCy0LXRgNGFKSDRgdC/0YDQsNCy0LAg0LLQstC10YDRhdGDINGN0LrRgNCw0L3QsCDQuCDQstGL0LHQtdGA0LjRgtC1INC/0YPQvdC60YI6INCd0LAg0Y3QutGA0LDQvSDCq9CU0L7QvNC+0LnCuy5cXG4nXG4gICAgICAgICsgJ9Co0LDQsyAyLiDQo9C60LDQttC40YLQtSDQttC10LvQsNC10LzQvtC1INC90LDQt9Cy0LDQvdC40LUgKNC90LDQv9GA0LjQvNC10YAgXCLQntC00LXRgdGB0LrQvtC1INCi0JJcIikg0Lgg0L3QsNC20LzQuNGC0LUgXCLQlNC+0LHQsNCy0LjRgtGMXCIuXFxuJ1xuICAgICAgICArICfQn9C+0YHQu9C1INC90LDQttCw0YLQuNGPINC60L3QvtC/0LrQuCBcItCU0L7QsdCw0LLQuNGC0YxcIiDQktCw0YEg0L/QtdGA0LXQsdGA0L7RgdC40YIg0L3QsCDRgNCw0LHQvtGH0LjQuSDRgdGC0L7Quywg0LPQtNC1INCS0Ysg0YHQvNC+0LbQtdGC0LUg0YPQstC40LTQtdGC0Ywg0YHQstC10LbQtdGB0L7Qt9C00LDQvdC90YPRjiDRgdGB0YvQu9C60YMuXFxuJ1xuICAgICAgICArICfQl9Cw0LnQtNGPINC90LAg0YHQsNC50YIg0L3QsNC20LDRgtC40LXQvCDQvdCwINGN0YLRgyDRgdGB0YvQu9C60YMg0JLRiyDQstGB0LXQs9C00LAg0LHRg9C00LXRgtC1INGB0LzQvtGC0YDQtdGC0Ywg0KLQkiDQsiDQv9C+0LvQvdC+0Y3QutGA0LDQvdC90L7QvCDRgNC10LbQuNC80LUuXFxuJ1xuICAgICAgICArICfQlNC70Y8g0YPQtNCw0LvQtdC90LjRjyDRgdGB0YvQu9C60Lgg0L3Rg9C20L3QviDQtdC1INC90LDQttCw0YLRjCDQuCDQv9C+0LTQtdGA0LbQsNGC0YwsINC30LDRgtC10Lwg0L3QsNC20LDRgtGMINC/0L7Rj9Cy0LjQstGI0LjQudGB0Y8g0LrRgNC10YHRgtC40Log0LIg0LvQtdCy0L7QvCDQstC10YDRhdC90LXQvCDRg9Cz0LvRgy4nKVxuICAgIH0pXG4gICAgY2xhc3NMaXN0LmFkZCgkc3ZnRnVsbFNjck9uLCAnZGlzYWJsZWQnKVxuICAgICRidG5GdWxsU2NyT2ZmLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAkYnRuTWVudU9mZi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0V2F0Y2hNb2RlKVxuICAgICRidG5NZW51T24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsZWF2ZVdhdGNoTW9kZSlcbn0gZWxzZSBpZiAod2luZG93LnZpZXdlclN0YXRlLmlzX2lQYWRfaVBob25lX2luRnVsbFNjcmVlbiB8fFxuICAgICAgICAgICAhd2luZG93LnZpZXdlclN0YXRlLmlzRnVsbFNjcmVlbkFsbG93ZWQpIHtcbiAgICAkYnRuRnVsbFNjck9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAkYnRuRnVsbFNjck9mZi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgJGJ0bk1lbnVPZmYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydFdhdGNoTW9kZSlcbiAgICAkYnRuTWVudU9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbGVhdmVXYXRjaE1vZGUpXG59XG5cbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJmdWxsc2NyZWVuY2hhbmdlXCIsICAgICAgIGZzSGFuZGxlcilcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ3ZWJraXRmdWxsc2NyZWVuY2hhbmdlXCIsIGZzSGFuZGxlcilcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJtb3pmdWxsc2NyZWVuY2hhbmdlXCIsICAgIGZzSGFuZGxlcilcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJNU0Z1bGxzY3JlZW5DaGFuZ2VcIiwgICAgIGZzSGFuZGxlcilcblxuZnVuY3Rpb24gZnNIYW5kbGVyKCkge1xuICAgIGlmICh3aW5kb3cudmlld2VyU3RhdGUuYXNrJGJveEluRnVsbFNjcmVlbigpKSAgIHN0YXJ0V2F0Y2hNb2RlKClcbiAgICBlbHNlICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBsZWF2ZVdhdGNoTW9kZSgpXG59XG5mdW5jdGlvbiBnb0Z1bGxTY3JlZW4oKSB7XG4gICAgICAgICBpZiAoJGJveC5yZXF1ZXN0RnVsbHNjcmVlbikgICAgICAgICRib3gucmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgIGVsc2UgaWYgKCRib3gubW96UmVxdWVzdEZ1bGxTY3JlZW4pICAgICAkYm94Lm1velJlcXVlc3RGdWxsU2NyZWVuKClcbiAgICBlbHNlIGlmICgkYm94LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSAgJGJveC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbigpXG4gICAgZWxzZSBpZiAoJGJveC5tc1JlcXVlc3RGdWxsc2NyZWVuKSAgICAgICRib3gubXNSZXF1ZXN0RnVsbHNjcmVlbigpXG59XG5mdW5jdGlvbiBnZXRPZmZGdWxsc2NyZWVuKCkge1xuICAgICAgIGlmIChkb2N1bWVudC5leGl0RnVsbHNjcmVlbikgICAgICAgICBkb2N1bWVudC5leGl0RnVsbHNjcmVlbigpXG4gIGVsc2UgaWYgKGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4pICAgIGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4oKVxuICBlbHNlIGlmIChkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbikgICBkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbigpXG4gIGVsc2UgaWYgKGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4pICAgICAgIGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4oKVxufVxuZnVuY3Rpb24gc3RhcnRXYXRjaE1vZGUoZSkge1xuICAgIGNsYXNzTGlzdC5hZGQoJGJveCwgJ2hpZGVfbWVudScpXG4gICAgJGJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcmVlbkNsaWNrSGFuZGxlcilcbiAgICAkY29udHJvbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNvbnRyb2xDbGlja0hhbmRsZXIpXG4gICAgaWYoZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLmNsaWVudEhlaWdodCA8IHdpbmRvdy5zY3JlZW4uYXZhaWxIZWlnaHQpe1xuICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCdib2R5Jykuc3R5bGUuaGVpZ2h0ID0gd2luZG93LnNjcmVlbi5hdmFpbEhlaWdodCArICdweCdcbiAgICAgICAgaXMkYm9keUhlaWdodENoYW5nZWQgPSB0cnVlXG4gICAgfVxufVxuZnVuY3Rpb24gbGVhdmVXYXRjaE1vZGUoZSkge1xuICAgIGNsZWFyVGltZW91dChpZClcbiAgICBjbGFzc0xpc3QucmVtb3ZlKCRjb250cm9sLCAnc2hvd19jb250cm9sJylcbiAgICAkY29udHJvbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNvbnRyb2xDbGlja0hhbmRsZXIpXG4gICAgJGJveC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcmVlbkNsaWNrSGFuZGxlcilcbiAgICBjbGFzc0xpc3QucmVtb3ZlKCRib3gsICdoaWRlX21lbnUnKVxuICAgIGlmKGlzJGJvZHlIZWlnaHRDaGFuZ2VkKXtcbiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignYm9keScpLnN0eWxlLmhlaWdodCA9ICcnXG4gICAgICAgIGlzJGJvZHlIZWlnaHRDaGFuZ2VkID0gZmFsc2VcbiAgICB9XG59XG5mdW5jdGlvbiBzY3JlZW5DbGlja0hhbmRsZXIoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAkYm94LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2NyZWVuQ2xpY2tIYW5kbGVyKVxuICAgIGNsYXNzTGlzdC5hZGQoJGNvbnRyb2wsICdzaG93X2NvbnRyb2wnKVxuICAgIGlkID0gc2V0VGltZW91dCggZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRjb250cm9sLCAnc2hvd19jb250cm9sJylcbiAgICAgICAgICAgICAkYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2NyZWVuQ2xpY2tIYW5kbGVyKVxuICAgICAgICAgfSAsIGR1cmF0aW9uQ3RybFZpc2libGUpXG59XG5mdW5jdGlvbiBjb250cm9sQ2xpY2tIYW5kbGVyKGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgY2xlYXJUaW1lb3V0KGlkKVxuICAgIGlkID0gc2V0VGltZW91dCggZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRjb250cm9sLCAnc2hvd19jb250cm9sJylcbiAgICAgICAgICAgICAkYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2NyZWVuQ2xpY2tIYW5kbGVyKVxuICAgICAgICAgfSAsIGR1cmF0aW9uQ3RybFZpc2libGUpXG59XG4iLCIndXNlIHN0cmljdCdcclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgd2luZG93LnZpZXdlclN0YXRlID0ge1xyXG4gICAgJyRib3gnOiAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm94JyksXHJcbiAgICAnJHZpZGVvJzogICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlbycpLFxyXG4gICAgJyRzb3VyY2UnOiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc291cmNlJyksXHJcbiAgICAnJHNpZGVNZW51Qm94JzogICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJyksXHJcbiAgICAnJHNsaWRlcic6ICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyX19zbGlkZXInKSxcclxuICAgICckZm9vdGVyJzogICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3RlcicpLFxyXG4gICAgJyRjb250cm9sJzogICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbCcpLFxyXG4gICAgJyRidG5QbGF5Rm9vdGVyJzogICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyIC5idG5fcGxheScpLFxyXG4gICAgJyRidG5QbGF5Q3RybCc6ICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbCAuYnRuX3BsYXknKSxcclxuICAgICckYnRuVm9sdW1lRm9vdGVyJzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3RlciAuYnRuX3ZvbHVtZScpLFxyXG4gICAgJyRidG5Wb2x1bWVDdHJsJzogICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbCAuYnRuX3ZvbHVtZScpLFxyXG4gICAgJyRidG5RdWFsaXR5JzogICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX3F1YWxpdHknKSxcclxuICAgICckYnRuU2NhbGUnOiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjYWxlX2JveF9fYnRuJyksXHJcbiAgICAnJHN1YkJ0blVwJzogICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY2FsZV9ib3hfX3N1YmJ0bl91cCcpLFxyXG4gICAgJyRzdWJCdG5Eb3duJzogICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NhbGVfYm94X19zdWJidG5fZG93bicpLFxyXG4gICAgJyRidG5NZW51T2ZmJzogICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyIC5idG5fX21lbnVfc3dpdGNoJyksXHJcbiAgICAnJGJ0bk1lbnVPbic6ICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sIC5idG5fX21lbnVfc3dpdGNoJyksXHJcbiAgICAnJGJ0bkZ1bGxTY3JPbic6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXIgLmJ0bl9fZnVsbHNjcicpLFxyXG4gICAgJyRidG5GdWxsU2NyT2ZmJzogICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbCAuYnRuX19mdWxsc2NyJyksXHJcbiAgICAnYWN0aXZlJGlucHV0JzogbnVsbCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBvYmplY3RcclxuICAgICdpc0Z1bGxTY3JlZW5BbGxvd2VkJzogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGJvb2xlYW5cclxuICAgICdpc19pUGFkX2lQaG9uZSc6IC8oaVBob25lfGlQb2R8aVBhZCkuKkFwcGxlV2ViS2l0L2kudGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCksICAgLy8gIGJvb2xlYW5cclxuICAgICdpc19pUGFkX2lQaG9uZV9pbkZ1bGxTY3JlZW4nOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGJvb2xlYW5cclxuICAgICdhc2skYm94SW5GdWxsU2NyZWVuJzogbnVsbCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGZ1bmN0aW9uIC0+IGJvb2xlYW5cclxuICAgICdoaWdoUXVhbGl0eSc6IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGJvb2xlYW5cclxuICAgICdkdXJhdGlvbkN0cmxWaXNpYmxlJzogNTAwMCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIG1zXHJcbiAgICAnY2xhc3NMaXN0Jzoge1xyXG4gICAgICAgICdjb250YWlucyc6IG51bGwsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgZnVuY3Rpb24gLT4gYm9vbGVhblxyXG4gICAgICAgICdhZGQnOiBudWxsLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgZnVuY3Rpb24gLT4gdm9pZFxyXG4gICAgICAgICdyZW1vdmUnOiBudWxsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgZnVuY3Rpb24gLT4gdm9pZFxyXG4gICAgIH1cclxuICB9O1xyXG5cclxuICByZXF1aXJlKCcuL2Fza0NoYW5uZWxMaXN0LmpzJylcclxuICB3aW5kb3cudmlld2VyU3RhdGUuaXNGdWxsU2NyZWVuQWxsb3dlZCA9IHJlcXVpcmUoJy4vYXNrRnVsbFNjcmVlbi5qcycpXHJcbiAgd2luZG93LnZpZXdlclN0YXRlLmlzX2lQYWRfaVBob25lX2luRnVsbFNjcmVlbiA9IHJlcXVpcmUoJy4vYXNrX2lQYWRfaVBob25lX0Z1bGxTY3JlZW4uanMnKVxyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZS5hc2skYm94SW5GdWxsU2NyZWVuID0gcmVxdWlyZSgnLi9hc2skYm94SW5GdWxsU2NyZWVuLmpzJylcclxuICB3aW5kb3cudmlld2VyU3RhdGUuY2xhc3NMaXN0ID0gcmVxdWlyZSgnLi9jbGFzc0xpc3QuanMnKVxyXG4gIHJlcXVpcmUoJy4vc2NyZWVuSGVpZ2h0LmpzJylcclxuICAvLyAgICBJbml0IGNvbXBsZXRlZFxyXG4gIHJlcXVpcmUoJy4vY2hhbm5lbFNlbGVjdG9yLmpzJylcclxuICByZXF1aXJlKCcuL2Z1bGxzY3JlZW5PckhpZGVNZW51LmpzJylcclxuICByZXF1aXJlKCcuL2J1dHRvblF1YWxpdHkuanMnKVxyXG4gIHJlcXVpcmUoJy4vYnV0dG9uU2NhbGUuanMnKVxyXG4gIHJlcXVpcmUoJy4vYnV0dG9uUGxheVBhdXNlLmpzJylcclxuICBpZighd2luZG93LnZpZXdlclN0YXRlLmlzX2lQYWRfaVBob25lKSByZXF1aXJlKCcuL2J1dHRvblZvbHVtZS5qcycpXHJcbn0iLCIndXNlIHN0cmljdCdcclxuXHJcbnNldEZvbnRTaXplKClcclxud2luZG93LmFkZEV2ZW50TGlzdGVuZXIoJ3Jlc2l6ZScsIHNldEZvbnRTaXplKVxyXG5mdW5jdGlvbiBzZXRGb250U2l6ZSgpIHtcclxuICAgIHZhciBmb250U2l6ZSA9IGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0IC8gMjBcclxuICAgIGlmKGRvY3VtZW50LmJvZHkuY2xpZW50SGVpZ2h0ID4gZG9jdW1lbnQuYm9keS5jbGllbnRXaWR0aCkge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuZm9udFNpemUgPSAwLjQgKiBmb250U2l6ZSArICdweCdcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgZG9jdW1lbnQuYm9keS5zdHlsZS5mb250U2l6ZSA9IGZvbnRTaXplICsgJ3B4J1xyXG4gICAgfVxyXG59Il19
