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
    if(attempt < 5) oReq.send()
}
function processChList () {
    channelList = JSON.parse(this.responseText)
    for(var i=0; i<channelList.length; i++){
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
            + ' {background-position: ' + channelList[i].background_x_position_bw + 'em '
            + channelList[i].background_y_position + 'em, left;}\n'
        style.innerHTML += '#' + chName + ':checked + label.sidebar__slider__button'
            + ' {background-position: ' + channelList[i].background_x_position_color + 'em '
            + channelList[i].background_y_position + 'em, left;}\n'
        
    }
    document.getElementsByTagName('head')[0].appendChild(style);
    console.log(style.innerHTML)
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
    scaledHorisontally = false,
    id = undefined

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
    $sideMenuBox = window.viewerState.$sideMenuBox,
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

            $video.style.backgroundSize = ""
            classList.remove($sideMenuBox, 'show_footer')
            $video.removeEventListener('error', failed)
            $video.style.width = '100%'
            $video.style.height = 'auto'
        } else {
            window.viewerState.active$input = e.target
            window.viewerState.highQuality = false
            ch = e.target.getAttribute('id')
            link = window.viewerState.chList[ch].lq
            
            if(window.Hls && window.Hls.isSupported()) {
                if(window.hls) window.hls.destroy()
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

            $video.style.backgroundSize = "0 0"
            $video.addEventListener('error', failed)
            if($video.play) $video.play();
            else alert ('video cannot play')
            classList.add($sideMenuBox, 'show_footer')
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
            $video.removeEventListener('error', failed)
            console.log('hls loading start ' + Date.now())
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
       break;
     default:
       alert('Произошла ошибка. Попробуйте еще.');
       break;
   }
}
function runHls() {
    $video.setAttribute('src', '')
    $source.setAttribute('src', '')
    console.log('calling window.hls ' + Date.now())
    window.hls = new window.window.Hls();
    window.hls.attachMedia(window.viewerState.$video);
    window.hls.on(window.Hls.Events.MEDIA_ATTACHED, function() {
        console.log("video and window.hls.js are now bound together !");
        window.hls.loadSource(link);
        window.hls.on(window.Hls.Events.MANIFEST_PARSED, function(event,data) {
            for(var i=0; i<window.hls.levels.length; i++){
                console.log( i + '\tbitrate:' + window.hls.levels[i].bitrate + '\th:' + window.hls.levels[i].height + '\tw:' + window.hls.levels[i].width + '\n')
            }
        })
    });
    if($video.play) $video.play();
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2EwNS9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hc2skYm94SW5GdWxsU2NyZWVuLmpzIiwianMvYXNrQ2hhbm5lbExpc3QuanMiLCJqcy9hc2tGdWxsU2NyZWVuLmpzIiwianMvYXNrX2lQYWRfaVBob25lX0Z1bGxTY3JlZW4uanMiLCJqcy9idXR0b25QbGF5UGF1c2UuanMiLCJqcy9idXR0b25RdWFsaXR5LmpzIiwianMvYnV0dG9uU2NhbGUuanMiLCJqcy9idXR0b25Wb2x1bWUuanMiLCJqcy9jaGFubmVsU2VsZWN0b3IuanMiLCJqcy9jbGFzc0xpc3QuanMiLCJqcy9mdWxsc2NyZWVuT3JIaWRlTWVudS5qcyIsImpzL21haW4uanMiLCJqcy9zY3JlZW5IZWlnaHQuanMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUNBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDWEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNiQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1BBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDckNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDcERBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQzNFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ2xDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0lBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNwREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBIiwiZmlsZSI6ImdlbmVyYXRlZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzQ29udGVudCI6WyIoZnVuY3Rpb24gZSh0LG4scil7ZnVuY3Rpb24gcyhvLHUpe2lmKCFuW29dKXtpZighdFtvXSl7dmFyIGE9dHlwZW9mIHJlcXVpcmU9PVwiZnVuY3Rpb25cIiYmcmVxdWlyZTtpZighdSYmYSlyZXR1cm4gYShvLCEwKTtpZihpKXJldHVybiBpKG8sITApO3ZhciBmPW5ldyBFcnJvcihcIkNhbm5vdCBmaW5kIG1vZHVsZSAnXCIrbytcIidcIik7dGhyb3cgZi5jb2RlPVwiTU9EVUxFX05PVF9GT1VORFwiLGZ9dmFyIGw9bltvXT17ZXhwb3J0czp7fX07dFtvXVswXS5jYWxsKGwuZXhwb3J0cyxmdW5jdGlvbihlKXt2YXIgbj10W29dWzFdW2VdO3JldHVybiBzKG4/bjplKX0sbCxsLmV4cG9ydHMsZSx0LG4scil9cmV0dXJuIG5bb10uZXhwb3J0c312YXIgaT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2Zvcih2YXIgbz0wO288ci5sZW5ndGg7bysrKXMocltvXSk7cmV0dXJuIHN9KSIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSBmdW5jdGlvbigpIHtcclxuICAgIGlmIChkb2N1bWVudC5mdWxsc2NyZWVuRWxlbWVudCB8fCBcclxuICAgICAgICBkb2N1bWVudC53ZWJraXRGdWxsc2NyZWVuRWxlbWVudCB8fFxyXG4gICAgICAgIGRvY3VtZW50Lm1vekZ1bGxTY3JlZW5FbGVtZW50IHx8XHJcbiAgICAgICAgZG9jdW1lbnQubXNGdWxsc2NyZWVuRWxlbWVudCB8fFxyXG4gICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZV9pbkZ1bGxTY3JlZW4gKSB7XHJcbiAgICAgICAgcmV0dXJuIHRydWVcclxuICAgIH0gZWxzZSByZXR1cm4gZmFsc2VcclxufVxyXG4iLCIndXNlIHN0cmljdCdcclxuXHJcbnZhciAkc2lkZU1lbnVCb3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJHNpZGVNZW51Qm94LFxyXG4gICAgJHNsaWRlciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc2xpZGVyLFxyXG4gICAgb1JlcSA9IG5ldyBYTUxIdHRwUmVxdWVzdCgpLFxyXG4gICAgYXR0ZW1wdCA9IDAsXHJcbiAgICBjaGFubmVsTGlzdCA9IFtdLFxyXG4gICAgY2hOYW1lID0gJycsXHJcbiAgICBzdHlsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3N0eWxlJyksXHJcbiAgICBpbnB1dCA9IG51bGwsXHJcbiAgICBsYWJlbCA9IG51bGxcclxuc3R5bGUudHlwZSA9ICd0ZXh0L2Nzcydcclxud2luZG93LnZpZXdlclN0YXRlLmNoTGlzdCA9IHt9XHJcblxyXG5vUmVxLmFkZEV2ZW50TGlzdGVuZXIoXCJsb2FkXCIsIHByb2Nlc3NDaExpc3QpXHJcbm9SZXEuYWRkRXZlbnRMaXN0ZW5lcihcImVycm9yXCIsIHRyeUFnYWluKVxyXG5vUmVxLmFkZEV2ZW50TGlzdGVuZXIoXCJhYm9ydFwiLCB0cnlBZ2Fpbilcclxub1JlcS5vcGVuKFwiR0VUXCIsIFwiLi9jaGFubmVscy5qc29uXCIpXHJcbm9SZXEuc2VuZCgpXHJcblxyXG5mdW5jdGlvbiB0cnlBZ2FpbihlKSB7XHJcbiAgICBjb25zb2xlLmxvZyhlKVxyXG4gICAgaWYoYXR0ZW1wdCA8IDUpIG9SZXEuc2VuZCgpXHJcbn1cclxuZnVuY3Rpb24gcHJvY2Vzc0NoTGlzdCAoKSB7XHJcbiAgICBjaGFubmVsTGlzdCA9IEpTT04ucGFyc2UodGhpcy5yZXNwb25zZVRleHQpXHJcbiAgICBmb3IodmFyIGk9MDsgaTxjaGFubmVsTGlzdC5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgY2hOYW1lID0gJ2NoXycgKyBjaGFubmVsTGlzdFtpXS5uYW1lXHJcbiAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmNoTGlzdFtjaE5hbWVdID0ge31cclxuICAgICAgICB3aW5kb3cudmlld2VyU3RhdGUuY2hMaXN0W2NoTmFtZV0ubHEgPSBjaGFubmVsTGlzdFtpXS5scVxyXG4gICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5jaExpc3RbY2hOYW1lXS5ocSA9IGNoYW5uZWxMaXN0W2ldLmhxXHJcbiAgICAgICAgaW5wdXQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbnB1dCcpXHJcbiAgICAgICAgaW5wdXQudHlwZSA9ICdyYWRpbydcclxuICAgICAgICBpbnB1dC5zZXRBdHRyaWJ1dGUoJ2lkJywgY2hOYW1lKVxyXG4gICAgICAgIGlucHV0LnNldEF0dHJpYnV0ZSgnbmFtZScsICdjaC1zZWxlY3RvcicpXHJcbiAgICAgICAgJHNsaWRlci5hcHBlbmRDaGlsZChpbnB1dClcclxuICAgICAgICBsYWJlbCA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2xhYmVsJylcclxuICAgICAgICBsYWJlbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3NpZGViYXJfX3NsaWRlcl9fYnV0dG9uICcgKyBjaE5hbWUpXHJcbiAgICAgICAgbGFiZWwuc2V0QXR0cmlidXRlKCdmb3InLCBjaE5hbWUpXHJcbiAgICAgICAgJHNsaWRlci5hcHBlbmRDaGlsZChsYWJlbClcclxuICAgICAgICBzdHlsZS5pbm5lckhUTUwgKz0gJy5zaWRlYmFyX19zbGlkZXJfX2J1dHRvbi4nICsgY2hOYW1lIFxyXG4gICAgICAgICAgICArICcge2JhY2tncm91bmQtcG9zaXRpb246ICcgKyBjaGFubmVsTGlzdFtpXS5iYWNrZ3JvdW5kX3hfcG9zaXRpb25fYncgKyAnZW0gJ1xyXG4gICAgICAgICAgICArIGNoYW5uZWxMaXN0W2ldLmJhY2tncm91bmRfeV9wb3NpdGlvbiArICdlbSwgbGVmdDt9XFxuJ1xyXG4gICAgICAgIHN0eWxlLmlubmVySFRNTCArPSAnIycgKyBjaE5hbWUgKyAnOmNoZWNrZWQgKyBsYWJlbC5zaWRlYmFyX19zbGlkZXJfX2J1dHRvbidcclxuICAgICAgICAgICAgKyAnIHtiYWNrZ3JvdW5kLXBvc2l0aW9uOiAnICsgY2hhbm5lbExpc3RbaV0uYmFja2dyb3VuZF94X3Bvc2l0aW9uX2NvbG9yICsgJ2VtICdcclxuICAgICAgICAgICAgKyBjaGFubmVsTGlzdFtpXS5iYWNrZ3JvdW5kX3lfcG9zaXRpb24gKyAnZW0sIGxlZnQ7fVxcbidcclxuICAgICAgICBcclxuICAgIH1cclxuICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKCdoZWFkJylbMF0uYXBwZW5kQ2hpbGQoc3R5bGUpO1xyXG4gICAgY29uc29sZS5sb2coc3R5bGUuaW5uZXJIVE1MKVxyXG4gICAgJHNpZGVNZW51Qm94LnN0eWxlLnZpc2liaWxpdHkgPSAnJ1xyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyICRib3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJGJveFxyXG4gICAgaWYgKCRib3gucmVxdWVzdEZ1bGxzY3JlZW4gfHxcclxuICAgICAgICAkYm94Lm1velJlcXVlc3RGdWxsU2NyZWVuIHx8XHJcbiAgICAgICAgJGJveC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbiB8fFxyXG4gICAgICAgICRib3gubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xyXG4gICAgICAgIHJldHVybiB0cnVlIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2UgXHJcbiAgICB9XHJcbn0pKClcclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZSAmJiB3aW5kb3cuaW5uZXJIZWlnaHQgPj0gd2luZG93LnNjcmVlbi5hdmFpbEhlaWdodCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9IGVsc2UgcmV0dXJuIGZhbHNlXHJcbn0pKClcclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgJHZpZGVvID0gd2luZG93LnZpZXdlclN0YXRlLiR2aWRlbyxcclxuICAgICRidG5QbGF5Rm9vdGVyID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5QbGF5Rm9vdGVyLFxyXG4gICAgJGJ0blBsYXlDdHJsID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5QbGF5Q3RybCxcclxuICAgICRzdmdQbGF5Rm9vdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3RlciAuYnRuX3BsYXlfX2ljb25fcGxheScpLFxyXG4gICAgJHN2Z1BsYXlDdHJsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2wgLmJ0bl9wbGF5X19pY29uX3BsYXknKSxcclxuICAgICRzdmdQYXVzZUZvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXIgLmJ0bl9wbGF5X19pY29uX3BhdXNlJyksXHJcbiAgICAkc3ZnUGF1c2VDdHJsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2wgLmJ0bl9wbGF5X19pY29uX3BhdXNlJyksXHJcbiAgICBjbGFzc0xpc3QgPSB3aW5kb3cudmlld2VyU3RhdGUuY2xhc3NMaXN0XHJcblxyXG4kYnRuUGxheUZvb3Rlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZVBsYXlQYXVzZSlcclxuJGJ0blBsYXlDdHJsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlUGxheVBhdXNlKVxyXG4kdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgICAgICBlLnByZXZlbnREZWZhdWx0KClcclxufSlcclxuZnVuY3Rpb24gdG9nZ2xlUGxheVBhdXNlKCl7XHJcbiAgICBpZiAoJHZpZGVvLnBhdXNlZCkge1xyXG4gICAgICAgICR2aWRlby5wbGF5KClcclxuICAgICAgICBzZXRJY29uc1BhdXNlKClcclxuICAgIH0gXHJcbiAgICBlbHNlIHtcclxuICAgICAgICAkdmlkZW8ucGF1c2UoKVxyXG4gICAgICAgIHNldEljb25zUGxheSgpXHJcbiAgICB9XHJcbn1cclxuZnVuY3Rpb24gc2V0SWNvbnNQbGF5KCkge1xyXG4gICAgY2xhc3NMaXN0LmFkZCgkc3ZnUGxheUZvb3RlciwgXCJhY3RpdmVcIilcclxuICAgIGNsYXNzTGlzdC5hZGQoJHN2Z1BsYXlDdHJsLCBcImFjdGl2ZVwiKVxyXG4gICAgY2xhc3NMaXN0LnJlbW92ZSgkc3ZnUGF1c2VGb290ZXIsIFwiYWN0aXZlXCIpXHJcbiAgICBjbGFzc0xpc3QucmVtb3ZlKCRzdmdQYXVzZUN0cmwsIFwiYWN0aXZlXCIpXHJcbn1cclxuZnVuY3Rpb24gc2V0SWNvbnNQYXVzZSgpIHtcclxuICAgIGNsYXNzTGlzdC5hZGQoJHN2Z1BhdXNlRm9vdGVyLCBcImFjdGl2ZVwiKVxyXG4gICAgY2xhc3NMaXN0LmFkZCgkc3ZnUGF1c2VDdHJsLCBcImFjdGl2ZVwiKVxyXG4gICAgY2xhc3NMaXN0LnJlbW92ZSgkc3ZnUGxheUZvb3RlciwgXCJhY3RpdmVcIilcclxuICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z1BsYXlDdHJsLCBcImFjdGl2ZVwiKVxyXG59IiwiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgJGJ0blF1YWxpdHkgPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0blF1YWxpdHksXHJcbiAgICAkc3ZnUXVhbGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fcXVhbGl0eV9faWNvbicpLFxyXG4gICAgJHZpZGVvID0gd2luZG93LnZpZXdlclN0YXRlLiR2aWRlbyxcclxuICAgICRzb3VyY2UgPSB3aW5kb3cudmlld2VyU3RhdGUuJHNvdXJjZSxcclxuICAgICRidG5NZW51T2ZmID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5NZW51T2ZmLFxyXG4gICAgY2xhc3NMaXN0ID0gd2luZG93LnZpZXdlclN0YXRlLmNsYXNzTGlzdCxcclxuICAgIGxpbmsgPSAnJ1xyXG5cclxuJGJ0blF1YWxpdHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVRdWFsaXR5KVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZnVsbHNjcmVlbmNoYW5nZVwiLCBzdHlsZVF1YWxpdHlCdXR0b24pXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ3ZWJraXRmdWxsc2NyZWVuY2hhbmdlXCIsIHN0eWxlUXVhbGl0eUJ1dHRvbilcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vemZ1bGxzY3JlZW5jaGFuZ2VcIiwgc3R5bGVRdWFsaXR5QnV0dG9uKVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiTVNGdWxsc2NyZWVuQ2hhbmdlXCIsIHN0eWxlUXVhbGl0eUJ1dHRvbilcclxuJGJ0bk1lbnVPZmYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdHlsZVF1YWxpdHlCdXR0b24pXHJcblxyXG5mdW5jdGlvbiB0b2dnbGVRdWFsaXR5KCl7XHJcbiAgICB2YXIgY2ggPSB3aW5kb3cudmlld2VyU3RhdGUuYWN0aXZlJGlucHV0LmdldEF0dHJpYnV0ZSgnaWQnKVxyXG4gICAgaWYgKHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSkge1xyXG4gICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSA9IGZhbHNlXHJcbiAgICAgICAgbGluayA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5jaExpc3RbY2hdLmxxXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSA9IHRydWVcclxuICAgICAgICBsaW5rID0gd2luZG93LnZpZXdlclN0YXRlLmNoTGlzdFtjaF0uaHFcclxuICAgIH1cclxuICAgIGlmKHdpbmRvdy5obHMpe1xyXG4gICAgICAgIHdpbmRvdy5obHMuZGVzdHJveSgpXHJcbiAgICAgICAgd2luZG93LmhscyA9IG5ldyB3aW5kb3cuSGxzKCk7XHJcbiAgICAgICAgd2luZG93Lmhscy5hdHRhY2hNZWRpYSh3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvKTtcclxuICAgICAgICB3aW5kb3cuaGxzLm9uKHdpbmRvdy5IbHMuRXZlbnRzLk1FRElBX0FUVEFDSEVELGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICBjb25zb2xlLmxvZyhcInZpZGVvIGFuZCB3aW5kb3cuaGxzLmpzIGFyZSBub3cgYm91bmQgdG9nZXRoZXIgIVwiKTtcclxuICAgICAgICAgICAgd2luZG93Lmhscy5sb2FkU291cmNlKGxpbmspO1xyXG4gICAgICAgICAgICB3aW5kb3cuaGxzLm9uKHdpbmRvdy5IbHMuRXZlbnRzLk1BTklGRVNUX1BBUlNFRCwgZnVuY3Rpb24oZXZlbnQsZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgZm9yKHZhciBpPTA7IGk8d2luZG93Lmhscy5sZXZlbHMubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBpICsgJ1xcdGJpdHJhdGU6JyArIHdpbmRvdy5obHMubGV2ZWxzW2ldLmJpdHJhdGUgKyAnXFx0aDonICsgd2luZG93Lmhscy5sZXZlbHNbaV0uaGVpZ2h0ICsgJ1xcdHc6JyArIHdpbmRvdy5obHMubGV2ZWxzW2ldLndpZHRoICsgJ1xcbicpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgfSk7XHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICR2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgICAgJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICB9XHJcbiAgICAkdmlkZW8ucGxheSgpXHJcbiAgICBzdHlsZVF1YWxpdHlCdXR0b24oKVxyXG59XHJcbmZ1bmN0aW9uIHN0eWxlUXVhbGl0eUJ1dHRvbigpIHtcclxuICAgIGlmICh3aW5kb3cudmlld2VyU3RhdGUuaGlnaFF1YWxpdHkpIHtcclxuICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRzdmdRdWFsaXR5LCAnZGlzYWJsZWQnKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBjbGFzc0xpc3QuYWRkKCRzdmdRdWFsaXR5LCAnZGlzYWJsZWQnKVxyXG4gICAgfVxyXG59IiwiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgJGJveCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYm94LFxyXG4gICAgJHZpZGVvID0gd2luZG93LnZpZXdlclN0YXRlLiR2aWRlbyxcclxuICAgICRidG5TY2FsZSA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuU2NhbGUsXHJcbiAgICAkc3ZnU2NhbGUgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NhbGVfYm94X19idG5faWNvbicpLFxyXG4gICAgJGJ0blNjYWxlU3ViQnRuc0JveCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY2FsZV9ib3hfX3N1YmJ0bnMnKSxcclxuICAgICRzdWJCdG5VcCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc3ViQnRuVXAsXHJcbiAgICAkc3ViQnRuRG93biA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc3ViQnRuRG93bixcclxuICAgICRzdWJCdG5VcEljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3ViYnRuX3VwJyksXHJcbiAgICAkc3ViQnRuRG93bkljb24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc3ViYnRuX2Rvd24nKSxcclxuICAgICRidG5NZW51T2ZmID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5NZW51T2ZmLFxyXG4gICAgJGJ0bk1lbnVPbiA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuTWVudU9uLFxyXG4gICAgY2xhc3NMaXN0ID0gd2luZG93LnZpZXdlclN0YXRlLmNsYXNzTGlzdCxcclxuICAgIGluaXQkdmlkZW9IZWlnaHQgPSB1bmRlZmluZWQsXHJcbiAgICBpbml0JHZpZGVvV2lkdGggPSB1bmRlZmluZWQsXHJcbiAgICBzY2FsZWRIb3Jpc29udGFsbHkgPSBmYWxzZSxcclxuICAgIGlkID0gdW5kZWZpbmVkXHJcblxyXG5jbGFzc0xpc3QuYWRkKCRzdmdTY2FsZSwgJ2Rpc2FibGVkJylcclxuXHJcbiR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwbGF5aW5nJywgaW5pdClcclxuJGJ0bk1lbnVPZmYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY2FsZUJ0bk9uKVxyXG4kYnRuTWVudU9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2NhbGVCdG5PZmYpXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ2Z1bGxzY3JlZW5jaGFuZ2UnLCBmdWxsU2NyZWVuQ2hhbmdlKVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd3ZWJraXRmdWxsc2NyZWVuY2hhbmdlJywgZnVsbFNjcmVlbkNoYW5nZSlcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW96ZnVsbHNjcmVlbmNoYW5nZScsIGZ1bGxTY3JlZW5DaGFuZ2UpXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ01TRnVsbHNjcmVlbkNoYW5nZScsIGZ1bGxTY3JlZW5DaGFuZ2UpXHJcblxyXG5mdW5jdGlvbiBpbml0KCl7XHJcbiAgICBzZXRUaW1lb3V0KHNjYWxlSG9yaXNvbnRhbGx5LCAzMDApXHJcbn1cclxuZnVuY3Rpb24gc2NhbGVIb3Jpc29udGFsbHkoKSB7XHJcbiAgICAkdmlkZW8uc3R5bGUud2lkdGggPSAkYm94LmNsaWVudFdpZHRoICsgJ3B4J1xyXG4gICAgJHZpZGVvLnN0eWxlLmhlaWdodCA9ICRib3guY2xpZW50V2lkdGggKiAkdmlkZW8udmlkZW9IZWlnaHQgLyAkdmlkZW8udmlkZW9XaWR0aCArICdweCdcclxuICAgIHNjYWxlZEhvcmlzb250YWxseSA9IHRydWVcclxuICAgIGNvbnNvbGUubG9nKCdzY3JlZW46ICcgKyAkYm94LmNsaWVudFdpZHRoICsgJ3gnICsgJGJveC5jbGllbnRIZWlnaHQgKyBcIlxcblwiXHJcbiAgICAgICAgICAgICAgICArICd2aWRlbzogJyArICRib3guY2xpZW50V2lkdGggKyAneCcgKyAkYm94LmNsaWVudFdpZHRoICogJHZpZGVvLnZpZGVvSGVpZ2h0IC8gJHZpZGVvLnZpZGVvV2lkdGgpXHJcbn1cclxuZnVuY3Rpb24gc2NhbGVWZXJ0aWNhbGx5KCkge1xyXG4gICAgJHZpZGVvLnN0eWxlLndpZHRoID0gJGJveC5jbGllbnRIZWlnaHQgKiAkdmlkZW8udmlkZW9XaWR0aCAvICR2aWRlby52aWRlb0hlaWdodCArICdweCdcclxuICAgICR2aWRlby5zdHlsZS5oZWlnaHQgPSAkYm94LmNsaWVudEhlaWdodCArICdweCdcclxuICAgIHNjYWxlZEhvcmlzb250YWxseSA9IGZhbHNlXHJcbiAgICBjb25zb2xlLmxvZygnc2NyZWVuOiAnICsgJGJveC5jbGllbnRXaWR0aCArICd4JyArICRib3guY2xpZW50SGVpZ2h0ICsgXCJcXG5cIlxyXG4gICAgICAgICAgICAgICAgKyAndmlkZW86ICcgKyAkYm94LmNsaWVudEhlaWdodCAqICR2aWRlby52aWRlb1dpZHRoIC8gJHZpZGVvLnZpZGVvSGVpZ2h0ICsgJ3gnICsgJGJveC5jbGllbnRIZWlnaHQpXHJcbn1cclxuXHJcbmZ1bmN0aW9uIGZ1bGxTY3JlZW5DaGFuZ2UoKSB7XHJcbiAgICBpZih3aW5kb3cudmlld2VyU3RhdGUuYXNrJGJveEluRnVsbFNjcmVlbigpKXtcclxuICAgICAgICBzY2FsZUJ0bk9uKClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2NhbGVCdG5PZmYoKVxyXG4gICAgfVxyXG4gICAgc2V0VGltZW91dChzY2FsZUhvcmlzb250YWxseSwgMzAwKVxyXG59XHJcbmZ1bmN0aW9uIHNjYWxlQnRuT24oKSB7XHJcbiAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICBpZiAoJGJveC5jbGllbnRXaWR0aCAhPT0gJHZpZGVvLm9mZnNldFdpZHRoIHx8ICRib3guY2xpZW50SGVpZ2h0ICE9PSAkdmlkZW8ub2Zmc2V0SGVpZ2h0KSB7XHJcbiAgICAgICAgICAgICRidG5TY2FsZS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRvZ2dsZVNjcmVlbkFsaWduKVxyXG4gICAgICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRzdmdTY2FsZSwgJ2Rpc2FibGVkJylcclxuICAgICAgICB9IGVsc2UgY2xhc3NMaXN0LmFkZCgkc3ZnU2NhbGUsICdkaXNhYmxlZCcpXHJcbiAgICB9LCAzMDApXHJcbn1cclxuZnVuY3Rpb24gc2NhbGVCdG5PZmYoKSB7XHJcbiAgICAkYnRuU2NhbGUucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVTY3JlZW5BbGlnbilcclxuICAgIGNsYXNzTGlzdC5hZGQoJHN2Z1NjYWxlLCAnZGlzYWJsZWQnKVxyXG4gICAgc2V0VGltZW91dChzY2FsZUhvcmlzb250YWxseSwgMzAwKVxyXG59XHJcbmZ1bmN0aW9uIHRvZ2dsZVNjcmVlbkFsaWduKCkge1xyXG4gICAgaWYoc2NhbGVkSG9yaXNvbnRhbGx5KXtcclxuICAgICAgICBzY2FsZVZlcnRpY2FsbHkoKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICBzY2FsZUhvcmlzb250YWxseSgpXHJcbiAgICB9XHJcbn1cclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgJHZpZGVvID0gd2luZG93LnZpZXdlclN0YXRlLiR2aWRlbyxcclxuICAgICRidG5Wb2x1bWVGb290ZXIgPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0blZvbHVtZUZvb3RlcixcclxuICAgICRidG5Wb2x1bWVDdHJsID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5Wb2x1bWVDdHJsLFxyXG4gICAgJHN2Z1ZvbHVtZU9uRm9vdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3RlciAuYnRuX3ZvbHVtZV9faWNvbl9vbicpLFxyXG4gICAgJHN2Z1ZvbHVtZU9uQ3RybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sIC5idG5fdm9sdW1lX19pY29uX29uJyksXHJcbiAgICAkc3ZnVm9sdW1lT2ZmRm9vdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3RlciAuYnRuX3ZvbHVtZV9faWNvbl9vZmYnKSxcclxuICAgICRzdmdWb2x1bWVPZmZDdHJsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2wgLmJ0bl92b2x1bWVfX2ljb25fb2ZmJyksXHJcbiAgICBjbGFzc0xpc3QgPSB3aW5kb3cudmlld2VyU3RhdGUuY2xhc3NMaXN0XHJcblxyXG4kYnRuVm9sdW1lRm9vdGVyLnN0eWxlLmRpc3BsYXkgPSAnaW5saW5lLWJsb2NrJ1xyXG4kYnRuVm9sdW1lQ3RybC5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jaydcclxuXHJcbiRidG5Wb2x1bWVGb290ZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBtdXRlKVxyXG4kYnRuVm9sdW1lQ3RybC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIG11dGUpXHJcblxyXG5mdW5jdGlvbiBtdXRlKCl7XHJcbiAgICBpZiAoJHZpZGVvLm11dGVkKXtcclxuICAgICAgICAkdmlkZW8ubXV0ZWQgPSBmYWxzZVxyXG4gICAgICAgICR2aWRlby52b2x1bWUgPSAxLjBcclxuICAgICAgICBjbGFzc0xpc3QuYWRkKCRzdmdWb2x1bWVPbkZvb3RlciwgXCJhY3RpdmVcIilcclxuICAgICAgICBjbGFzc0xpc3QuYWRkKCRzdmdWb2x1bWVPbkN0cmwsIFwiYWN0aXZlXCIpXHJcbiAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgkc3ZnVm9sdW1lT2ZmRm9vdGVyLCBcImFjdGl2ZVwiKVxyXG4gICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z1ZvbHVtZU9mZkN0cmwsIFwiYWN0aXZlXCIpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgICR2aWRlby52b2x1bWUgPSAwLjBcclxuICAgICAgICAkdmlkZW8ubXV0ZWQgPSB0cnVlXHJcbiAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgkc3ZnVm9sdW1lT25Gb290ZXIsIFwiYWN0aXZlXCIpXHJcbiAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgkc3ZnVm9sdW1lT25DdHJsLCBcImFjdGl2ZVwiKVxyXG4gICAgICAgIGNsYXNzTGlzdC5hZGQoJHN2Z1ZvbHVtZU9mZkZvb3RlciwgXCJhY3RpdmVcIilcclxuICAgICAgICBjbGFzc0xpc3QuYWRkKCRzdmdWb2x1bWVPZmZDdHJsLCBcImFjdGl2ZVwiKVxyXG4gICAgfSBcclxufVxyXG4iLCJcInVzZSBzdHJpY3RcIlxyXG5cclxudmFyICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8sXHJcbiAgICAkc291cmNlID0gd2luZG93LnZpZXdlclN0YXRlLiRzb3VyY2UsXHJcbiAgICAkc2xpZGVyID0gd2luZG93LnZpZXdlclN0YXRlLiRzbGlkZXIsXHJcbiAgICAkc2lkZU1lbnVCb3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJHNpZGVNZW51Qm94LFxyXG4gICAgY2xhc3NMaXN0ID0gd2luZG93LnZpZXdlclN0YXRlLmNsYXNzTGlzdCxcclxuICAgIGxpbmsgPSAnJ1xyXG53aW5kb3cuSGxzID0gbnVsbFxyXG53aW5kb3cuaGxzID0gbnVsbFxyXG5cclxuJHNsaWRlci5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uKGUpe1xyXG4gICAgdmFyIGNoID0gJydcclxuICAgIGlmKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdJTlBVVCcpe1xyXG4gICAgICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQgPT09IGUudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQuY2hlY2tlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQgPSBudWxsXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZih3aW5kb3cuSGxzICYmIHdpbmRvdy5IbHMuaXNTdXBwb3J0ZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93Lmhscy5kZXN0cm95KClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICR2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsICcnKVxyXG4gICAgICAgICAgICAgICAgJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsICcnKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkdmlkZW8uc3R5bGUuYmFja2dyb3VuZFNpemUgPSBcIlwiXHJcbiAgICAgICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJHNpZGVNZW51Qm94LCAnc2hvd19mb290ZXInKVxyXG4gICAgICAgICAgICAkdmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmYWlsZWQpXHJcbiAgICAgICAgICAgICR2aWRlby5zdHlsZS53aWR0aCA9ICcxMDAlJ1xyXG4gICAgICAgICAgICAkdmlkZW8uc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dCA9IGUudGFyZ2V0XHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSA9IGZhbHNlXHJcbiAgICAgICAgICAgIGNoID0gZS50YXJnZXQuZ2V0QXR0cmlidXRlKCdpZCcpXHJcbiAgICAgICAgICAgIGxpbmsgPSB3aW5kb3cudmlld2VyU3RhdGUuY2hMaXN0W2NoXS5scVxyXG4gICAgICAgICAgICBcclxuICAgICAgICAgICAgaWYod2luZG93LkhscyAmJiB3aW5kb3cuSGxzLmlzU3VwcG9ydGVkKCkpIHtcclxuICAgICAgICAgICAgICAgIGlmKHdpbmRvdy5obHMpIHdpbmRvdy5obHMuZGVzdHJveSgpXHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuaGxzID0gbmV3IHdpbmRvdy5IbHMoKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5obHMuYXR0YWNoTWVkaWEod2luZG93LnZpZXdlclN0YXRlLiR2aWRlbyk7XHJcbiAgICAgICAgICAgICAgICB3aW5kb3cuaGxzLm9uKHdpbmRvdy5IbHMuRXZlbnRzLk1FRElBX0FUVEFDSEVELGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwidmlkZW8gYW5kIHdpbmRvdy5obHMuanMgYXJlIG5vdyBib3VuZCB0b2dldGhlciAhXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5obHMubG9hZFNvdXJjZShsaW5rKTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuaGxzLm9uKHdpbmRvdy5IbHMuRXZlbnRzLk1BTklGRVNUX1BBUlNFRCwgZnVuY3Rpb24oZXZlbnQsZGF0YSkge1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBmb3IodmFyIGk9MDsgaTx3aW5kb3cuaGxzLmxldmVscy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggaSArICdcXHRiaXRyYXRlOicgKyB3aW5kb3cuaGxzLmxldmVsc1tpXS5iaXRyYXRlICsgJ1xcdGg6JyArIHdpbmRvdy5obHMubGV2ZWxzW2ldLmhlaWdodCArICdcXHR3OicgKyB3aW5kb3cuaGxzLmxldmVsc1tpXS53aWR0aCArICdcXG4nKVxyXG4gICAgICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICAgICAgfSlcclxuICAgICAgICAgICAgICAgIH0pO1xyXG4gICAgICAgICAgICB9IGVsc2Uge1xyXG4gICAgICAgICAgICAgICAgJHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgbGluaylcclxuICAgICAgICAgICAgICAgICRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkdmlkZW8uc3R5bGUuYmFja2dyb3VuZFNpemUgPSBcIjAgMFwiXHJcbiAgICAgICAgICAgICR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdlcnJvcicsIGZhaWxlZClcclxuICAgICAgICAgICAgaWYoJHZpZGVvLnBsYXkpICR2aWRlby5wbGF5KCk7XHJcbiAgICAgICAgICAgIGVsc2UgYWxlcnQgKCd2aWRlbyBjYW5ub3QgcGxheScpXHJcbiAgICAgICAgICAgIGNsYXNzTGlzdC5hZGQoJHNpZGVNZW51Qm94LCAnc2hvd19mb290ZXInKVxyXG4gICAgICAgIH1cclxuICAgIH1cclxufSlcclxuXHJcbmZ1bmN0aW9uIGZhaWxlZChlKSB7XHJcbiAgIC8vIHZpZGVvIHBsYXliYWNrIGZhaWxlZCAtIHNob3cgYSBtZXNzYWdlIHNheWluZyB3aHkgICAgIC0gZnJvbSBodHRwczovL2Rldi53My5vcmcvaHRtbDUvc3BlYy1hdXRob3Itdmlldy92aWRlby5odG1sI3ZpZGVvXHJcbiAgIHN3aXRjaCAoZS50YXJnZXQuZXJyb3IuY29kZSkge1xyXG4gICAgIGNhc2UgZS50YXJnZXQuZXJyb3IuTUVESUFfRVJSX0FCT1JURUQ6XHJcbiAgICAgICBhbGVydCgn0JLQvtGB0L/RgNC+0LjQt9Cy0LXQtNC10L3QuNC1INCy0LjQtNC10L4g0L/RgNC10YDQstCw0L3Qvi4nKTtcclxuICAgICAgIGJyZWFrO1xyXG4gICAgIGNhc2UgZS50YXJnZXQuZXJyb3IuTUVESUFfRVJSX05FVFdPUks6XHJcbiAgICAgICBhbGVydCgn0J7RiNC40LHQutCwINGB0LXRgtC4INC/0YDQuNCy0LXQu9CwINC6INC90LDRgNGD0YjQtdC90LjRjiDQt9Cw0LPRgNGD0LfQutC4INCy0LjQtNC10L4nKTtcclxuICAgICAgIGJyZWFrO1xyXG4gICAgIGNhc2UgZS50YXJnZXQuZXJyb3IuTUVESUFfRVJSX0RFQ09ERTpcclxuICAgICAgIGFsZXJ0KCfQktC+0YHQv9GA0L7QuNC30LLQtdC00LXQvdC40LUg0LLQuNC00LXQviDQv9GA0LXQutGA0LDRidC10L3QviDQuNC3LdC30LAg0LjRgdC60LDQttC10L3QuNC5INC/0YDQuCDQv9C10YDQtdC00LDRh9C1INC40LvQuCDQv9C+0YLQvtC80YMsINGH0YLQviDQstC40LTQtdC+INC40YHQv9C+0LvRjNC30YPQtdGCINC90LXQtNC+0YHRgtGD0L/QvdGL0LUg0LIg0JLQsNGI0LXQvCDQsdGA0LDRg9C30LXRgNC1INGE0YPQvdC60YbQuNC4LicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfU1JDX05PVF9TVVBQT1JURUQ6XHJcbiAgICAgICBpZiAod2luZG93LkhscyAmJiB3aW5kb3cuSGxzLmlzU3VwcG9ydGVkKCkpe1xyXG4gICAgICAgICAgIGFsZXJ0KCfQktC40LTQtdC+INC90LUg0LzQvtC20LXRgiDQsdGL0YLRjCDQt9Cw0LPRgNGD0LbQtdC90L4g0LjQty3Qt9CwINGB0LHQvtGPINCyINCyINC00L7RgdGC0YPQv9C1INC6INGB0LXRgNCy0LXRgNGDINC40LvQuCDRjdGC0L7RgiDQstC40LTQtdC+0YTQvtGA0LzQsNGCINC90LUg0L/QvtC00LTQtdGA0LbQuNCy0LDQtdGC0YHRjyDQktCw0YjQuNC8INCx0YDQsNGD0LfQtdGA0L7QvC4nKTtcclxuICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICR2aWRlby5yZW1vdmVFdmVudExpc3RlbmVyKCdlcnJvcicsIGZhaWxlZClcclxuICAgICAgICAgICAgY29uc29sZS5sb2coJ2hscyBsb2FkaW5nIHN0YXJ0ICcgKyBEYXRlLm5vdygpKVxyXG4gICAgICAgICAgICB2YXIgc2NyaXB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInNjcmlwdFwiKVxyXG4gICAgICAgICAgICBzY3JpcHQudHlwZSA9IFwidGV4dC9qYXZhc2NyaXB0XCJcclxuICAgICAgICAgICAgaWYgKHNjcmlwdC5yZWFkeVN0YXRlKXsgIC8vSUVcclxuICAgICAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIGlmIChzY3JpcHQucmVhZHlTdGF0ZSA9PSBcImxvYWRlZFwiIHx8XHJcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBzY3JpcHQucmVhZHlTdGF0ZSA9PSBcImNvbXBsZXRlXCIpe1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBzY3JpcHQub25yZWFkeXN0YXRlY2hhbmdlID0gbnVsbDtcclxuICAgICAgICAgICAgICAgICAgICAgICAgcnVuSGxzKClcclxuICAgICAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICB9IGVsc2UgeyAgLy9PdGhlcnNcclxuICAgICAgICAgICAgICAgIHNjcmlwdC5vbmxvYWQgPSBmdW5jdGlvbigpe1xyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCdobHMgbG9hZGVkICcgKyBEYXRlLm5vdygpKVxyXG4gICAgICAgICAgICAgICAgICAgIHJ1bkhscygpXHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgc2NyaXB0LnNyYyA9ICcuL2pzL2hscy5taW4uanMnXHJcbiAgICAgICAgICAgIGRvY3VtZW50LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaGVhZFwiKVswXS5hcHBlbmRDaGlsZChzY3JpcHQpXHJcbiAgICAgICB9XHJcbiAgICAgICBicmVhaztcclxuICAgICBkZWZhdWx0OlxyXG4gICAgICAgYWxlcnQoJ9Cf0YDQvtC40LfQvtGI0LvQsCDQvtGI0LjQsdC60LAuINCf0L7Qv9GA0L7QsdGD0LnRgtC1INC10YnQtS4nKTtcclxuICAgICAgIGJyZWFrO1xyXG4gICB9XHJcbn1cclxuZnVuY3Rpb24gcnVuSGxzKCkge1xyXG4gICAgJHZpZGVvLnNldEF0dHJpYnV0ZSgnc3JjJywgJycpXHJcbiAgICAkc291cmNlLnNldEF0dHJpYnV0ZSgnc3JjJywgJycpXHJcbiAgICBjb25zb2xlLmxvZygnY2FsbGluZyB3aW5kb3cuaGxzICcgKyBEYXRlLm5vdygpKVxyXG4gICAgd2luZG93LmhscyA9IG5ldyB3aW5kb3cud2luZG93LkhscygpO1xyXG4gICAgd2luZG93Lmhscy5hdHRhY2hNZWRpYSh3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvKTtcclxuICAgIHdpbmRvdy5obHMub24od2luZG93Lkhscy5FdmVudHMuTUVESUFfQVRUQUNIRUQsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKFwidmlkZW8gYW5kIHdpbmRvdy5obHMuanMgYXJlIG5vdyBib3VuZCB0b2dldGhlciAhXCIpO1xyXG4gICAgICAgIHdpbmRvdy5obHMubG9hZFNvdXJjZShsaW5rKTtcclxuICAgICAgICB3aW5kb3cuaGxzLm9uKHdpbmRvdy5IbHMuRXZlbnRzLk1BTklGRVNUX1BBUlNFRCwgZnVuY3Rpb24oZXZlbnQsZGF0YSkge1xyXG4gICAgICAgICAgICBmb3IodmFyIGk9MDsgaTx3aW5kb3cuaGxzLmxldmVscy5sZW5ndGg7IGkrKyl7XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggaSArICdcXHRiaXRyYXRlOicgKyB3aW5kb3cuaGxzLmxldmVsc1tpXS5iaXRyYXRlICsgJ1xcdGg6JyArIHdpbmRvdy5obHMubGV2ZWxzW2ldLmhlaWdodCArICdcXHR3OicgKyB3aW5kb3cuaGxzLmxldmVsc1tpXS53aWR0aCArICdcXG4nKVxyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfSlcclxuICAgIH0pO1xyXG4gICAgaWYoJHZpZGVvLnBsYXkpICR2aWRlby5wbGF5KCk7XHJcbiAgICBlbHNlIGFsZXJ0ICgndmlkZW8gY2Fubm90IHBsYXknKVxyXG5cclxuICAgIHdpbmRvdy5obHMub24od2luZG93Lkhscy5FdmVudHMuRVJST1IsZnVuY3Rpb24oZXZlbnQsZGF0YSkge1xyXG4gICAgICAgIGlmKGRhdGEuZmF0YWwpIHtcclxuICAgICAgICAgICAgc3dpdGNoKGRhdGEudHlwZSkge1xyXG4gICAgICAgICAgICAgICAgY2FzZSB3aW5kb3cuSGxzLkVycm9yVHlwZXMuTkVUV09SS19FUlJPUjpcclxuICAgICAgICAgICAgICAgIC8vIHRyeSB0byByZWNvdmVyIG5ldHdvcmsgZXJyb3JcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZhdGFsIG5ldHdvcmsgZXJyb3IgZW5jb3VudGVyZWQsIHRyeSB0byByZWNvdmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5obHMuc3RhcnRMb2FkKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHdpbmRvdy5IbHMuRXJyb3JUeXBlcy5NRURJQV9FUlJPUjpcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhcImZhdGFsIG1lZGlhIGVycm9yIGVuY291bnRlcmVkLCB0cnkgdG8gcmVjb3ZlclwiKTtcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuaGxzLnJlY292ZXJNZWRpYUVycm9yKCk7XHJcbiAgICAgICAgICAgICAgICAgICAgYnJlYWs7XHJcbiAgICAgICAgICAgICAgICBkZWZhdWx0OlxyXG4gICAgICAgICAgICAgICAgLy8gY2Fubm90IHJlY292ZXJcclxuICAgICAgICAgICAgICAgICAgICB3aW5kb3cuaGxzLmRlc3Ryb3koKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgIH1cclxuICAgIH0pXHJcbn0iLCIndXNlIHN0cmljdCdcclxuXHJcbm1vZHVsZS5leHBvcnRzID0ge1xyXG4gICAgJ2NvbnRhaW5zJzogZnVuY3Rpb24oZWwsIGNscykge1xyXG4gICAgICAgIGlmKGVsLmNsYXNzTGlzdCkgcmV0dXJuIGVsLmNsYXNzTGlzdC5jb250YWlucyhjbHMpXHJcbiAgICAgICAgdmFyIGFyciA9IGVsLmdldEF0dHJpYnV0ZSgnY2xhc3MnKS5zcGxpdCgnICcpXHJcbiAgICAgICAgZm9yKHZhciBpPTA7IGk8YXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoYXJyW2ldID09IGNscykgcmV0dXJuIHRydWVcclxuICAgICAgICB9XHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9LFxyXG4gICAgJ2FkZCc6IGZ1bmN0aW9uKGVsLCBjbHMpIHtcclxuICAgICAgICBpZihlbC5jbGFzc0xpc3QpIHtcclxuICAgICAgICAgICAgZWwuY2xhc3NMaXN0LmFkZChjbHMpXHJcbiAgICAgICAgICAgIHJldHVybiBcclxuICAgICAgICB9XHJcbiAgICAgICAgaWYoIXdpbmRvdy52aWV3ZXJTdGF0ZS5jbGFzc0xpc3QuY29udGFpbnMoZWwsIGNscykpe1xyXG4gICAgICAgICAgICBlbC5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgZWwuZ2V0QXR0cmlidXRlKCdjbGFzcycpICsgJyAnICsgY2xzKVxyXG4gICAgICAgIH1cclxuICAgIH0sXHJcbiAgICAncmVtb3ZlJzogZnVuY3Rpb24oZWwsIGNscykge1xyXG4gICAgICAgIGlmKGVsLmNsYXNzTGlzdCkge1xyXG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKGNscylcclxuICAgICAgICAgICAgcmV0dXJuIFxyXG4gICAgICAgIH0gXHJcbiAgICAgICAgdmFyIGFyciA9IGVsLmdldEF0dHJpYnV0ZSgnY2xhc3MnKS5zcGxpdCgnICcpXHJcbiAgICAgICAgdmFyIHJlcyA9ICcnXHJcbiAgICAgICAgZm9yKHZhciBpPTA7IGk8YXJyLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgaWYoYXJyW2ldICE9IGNscykge1xyXG4gICAgICAgICAgICAgICAgcmVzICs9IGFycltpXSArICcgJ1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCByZXMpXHJcbiAgICB9XHJcbn0iLCIndXNlIHN0cmljdCdcblxudmFyICRib3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJGJveCxcbiAgICAkYnRuRnVsbFNjck9uID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5GdWxsU2NyT24sXG4gICAgJGJ0bkZ1bGxTY3JPZmYgPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0bkZ1bGxTY3JPZmYsXG4gICAgJGJ0bk1lbnVPZmYgPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0bk1lbnVPZmYsXG4gICAgJGJ0bk1lbnVPbiA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuTWVudU9uLFxuICAgICRzaWRlTWVudUJveCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc2lkZU1lbnVCb3gsXG4gICAgJGNvbnRyb2wgPSB3aW5kb3cudmlld2VyU3RhdGUuJGNvbnRyb2wsXG4gICAgJHN2Z0Z1bGxTY3JPbiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fX2Z1bGxzY3Iub24nKSxcbiAgICBkdXJhdGlvbkN0cmxWaXNpYmxlID0gd2luZG93LnZpZXdlclN0YXRlLmR1cmF0aW9uQ3RybFZpc2libGUsXG4gICAgY2xhc3NMaXN0ID0gd2luZG93LnZpZXdlclN0YXRlLmNsYXNzTGlzdCxcbiAgICBpZCA9IHVuZGVmaW5lZFxuXG5pZiAoIHdpbmRvdy52aWV3ZXJTdGF0ZS5pc0Z1bGxTY3JlZW5BbGxvd2VkICkge1xuICAkYnRuTWVudU9mZi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICRidG5NZW51T24uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAkYnRuRnVsbFNjck9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZ29GdWxsU2NyZWVuKVxuICAkYnRuRnVsbFNjck9mZi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGdldE9mZkZ1bGxzY3JlZW4pXG59IGVsc2UgaWYgKHdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZSAmJlxuICAgICAgICAgICAhd2luZG93LnZpZXdlclN0YXRlLmlzX2lQYWRfaVBob25lX2luRnVsbFNjcmVlbikge1xuICAkYnRuRnVsbFNjck9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIGFsZXJ0KCfQp9GC0L7QsdGLINC+0LHRgNC10YHRgtC4INC/0L7Qu9C90L7RjdC60YDQsNC90L3Ri9C5INGA0LXQttC40Lwg0L3QsNC00L4g0YHQtNC10LvQsNGC0Ywg0LLRgdC10LPQviDQvdC10YHQutC+0LvRjNC60L4g0YjQsNCz0L7QsjpcXG4nXG4gICAgICAgICsgJ9Co0LDQsyAxLiDQndCw0LbQvNC40YLQtSDQvdCwINC60L3QvtC/0LrRgyBcItCe0YLQv9GA0LDQstC40YLRjFwiICjQstGL0LPQu9GP0LTQuNGCINC60LDQuiDQutCy0LDQtNGA0LDRgiDRgdC+INGB0YLRgNC10LvQvtGH0LrQvtC5INCy0LLQtdGA0YUpINGB0L/RgNCw0LLQsCDQstCy0LXRgNGF0YMg0Y3QutGA0LDQvdCwINC4INCy0YvQsdC10YDQuNGC0LUg0L/Rg9C90LrRgjog0J3QsCDRjdC60YDQsNC9IMKr0JTQvtC80L7QucK7LlxcbidcbiAgICAgICAgKyAn0KjQsNCzIDIuINCj0LrQsNC20LjRgtC1INC20LXQu9Cw0LXQvNC+0LUg0L3QsNC30LLQsNC90LjQtSDQuCDQvdCw0LbQvNC40YLQtSBcItCU0L7QsdCw0LLQuNGC0YxcIi5cXG4nXG4gICAgICAgICsgJ9Cf0L7RgdC70LUg0L3QsNC20LDRgtC40Y8g0LrQvdC+0L/QutC4IFwi0JTQvtCx0LDQstC40YLRjFwiINCS0LDRgSDQv9C10YDQtdCx0YDQvtGB0LjRgiDQvdCwINGA0LDQsdC+0YfQuNC5INGB0YLQvtC7LCDQs9C00LUg0JLRiyDRgdC80L7QttC10YLQtSDRg9Cy0LjQtNC10YLRjCDRgdCy0LXQttC10YHQvtC30LTQsNC90L3Rg9GOINGB0YHRi9C70LrRgy5cXG4nXG4gICAgICAgICsgJ9CX0LDQudC00Y8g0L3QsCDRgdCw0LnRgiDQvdCw0LbQsNGC0LjQtdC8INC90LAg0Y3RgtGDINGB0YHRi9C70LrRgyDQktGLINCy0YHQtdCz0LTQsCDQsdGD0LTQtdGC0LUg0YHQvNC+0YLRgNC10YLRjCDQotCSINCyINC/0L7Qu9C90L7RjdC60YDQsNC90L3QvtC8INGA0LXQttC40LzQtS5cXG4nXG4gICAgICAgICsgJ9CU0LvRjyDRg9C00LDQu9C10L3QuNGPINGB0YHRi9C70LrQuCDQvdGD0LbQvdC+INC10LUg0L3QsNC20LDRgtGMINC4INC/0L7QtNC10YDQttCw0YLRjCwg0LfQsNGC0LXQvCDQvdCw0LbQsNGC0Ywg0L/QvtGP0LLQuNCy0YjQuNC50YHRjyDQutGA0LXRgdGC0LjQuiDQsiDQu9C10LLQvtC8INCy0LXRgNGF0L3QtdC8INGD0LPQu9GDLicpXG4gICAgfSlcbiAgICBjbGFzc0xpc3QuYWRkKCRzdmdGdWxsU2NyT24sICdkaXNhYmxlZCcpXG4gICAgJGJ0bkZ1bGxTY3JPZmYuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICRidG5NZW51T2ZmLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RhcnRXYXRjaE1vZGUpXG4gICAgJGJ0bk1lbnVPbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxlYXZlV2F0Y2hNb2RlKVxufSBlbHNlIGlmICh3aW5kb3cudmlld2VyU3RhdGUuaXNfaVBhZF9pUGhvbmVfaW5GdWxsU2NyZWVuIHx8XG4gICAgICAgICAgICF3aW5kb3cudmlld2VyU3RhdGUuaXNGdWxsU2NyZWVuQWxsb3dlZCkge1xuICAgICRidG5GdWxsU2NyT24uc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICRidG5GdWxsU2NyT2ZmLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgICAkYnRuTWVudU9mZi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHN0YXJ0V2F0Y2hNb2RlKVxuICAgICRidG5NZW51T24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBsZWF2ZVdhdGNoTW9kZSlcbn1cblxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcImZ1bGxzY3JlZW5jaGFuZ2VcIiwgZnNIYW5kbGVyKVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIndlYmtpdGZ1bGxzY3JlZW5jaGFuZ2VcIiwgZnNIYW5kbGVyKVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vemZ1bGxzY3JlZW5jaGFuZ2VcIiwgZnNIYW5kbGVyKVxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIk1TRnVsbHNjcmVlbkNoYW5nZVwiLCBmc0hhbmRsZXIpXG5cbmZ1bmN0aW9uIGZzSGFuZGxlcigpIHtcbiAgICBpZih3aW5kb3cudmlld2VyU3RhdGUuYXNrJGJveEluRnVsbFNjcmVlbigpKXtcbiAgICAgICAgc3RhcnRXYXRjaE1vZGUoKVxuICAgIH0gZWxzZSB7XG4gICAgICAgIGxlYXZlV2F0Y2hNb2RlKClcbiAgICB9XG59XG5mdW5jdGlvbiBnb0Z1bGxTY3JlZW4oKSB7XG4gICAgaWYgKCRib3gucmVxdWVzdEZ1bGxzY3JlZW4pIHtcbiAgICAgICAgJGJveC5yZXF1ZXN0RnVsbHNjcmVlbigpXG4gICAgfSBlbHNlIGlmICgkYm94Lm1velJlcXVlc3RGdWxsU2NyZWVuKSB7XG4gICAgICAgICRib3gubW96UmVxdWVzdEZ1bGxTY3JlZW4oKVxuICAgIH0gZWxzZSBpZiAoJGJveC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAkYm94LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKClcbiAgICB9IGVsc2UgaWYgKCRib3gubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAkYm94Lm1zUmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgIH1cbn1cbmZ1bmN0aW9uIGdldE9mZkZ1bGxzY3JlZW4oKSB7XG4gIGlmKGRvY3VtZW50LmV4aXRGdWxsc2NyZWVuKSB7XG4gICAgZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4oKTtcbiAgfSBlbHNlIGlmKGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4pIHtcbiAgICBkb2N1bWVudC5tb3pDYW5jZWxGdWxsU2NyZWVuKCk7XG4gIH0gZWxzZSBpZihkb2N1bWVudC53ZWJraXRFeGl0RnVsbHNjcmVlbikge1xuICAgIGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKCk7XG4gIH1lbHNlIGlmIChkb2N1bWVudC5tc0V4aXRGdWxsc2NyZWVuKSB7XG5cdGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4oKTtcbiAgfVxufVxuZnVuY3Rpb24gc3RhcnRXYXRjaE1vZGUoZSkge1xuICAgIGNsYXNzTGlzdC5hZGQoJHNpZGVNZW51Qm94LCAnaGlkZV9tZW51JylcbiAgICAkYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2NyZWVuQ2xpY2tIYW5kbGVyKVxuICAgICRjb250cm9sLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY29udHJvbENsaWNrSGFuZGxlcilcbn1cbmZ1bmN0aW9uIGxlYXZlV2F0Y2hNb2RlKGUpIHtcbiAgICBjbGVhclRpbWVvdXQoaWQpXG4gICAgY2xhc3NMaXN0LnJlbW92ZSgkY29udHJvbCwgJ3Nob3dfY29udHJvbCcpXG4gICAgJGNvbnRyb2wucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjb250cm9sQ2xpY2tIYW5kbGVyKVxuICAgICRib3gucmVtb3ZlRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY3JlZW5DbGlja0hhbmRsZXIpXG4gICAgY2xhc3NMaXN0LnJlbW92ZSgkc2lkZU1lbnVCb3gsICdoaWRlX21lbnUnKVxufVxuZnVuY3Rpb24gc2NyZWVuQ2xpY2tIYW5kbGVyKGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgJGJveC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcmVlbkNsaWNrSGFuZGxlcilcbiAgICBjbGFzc0xpc3QuYWRkKCRjb250cm9sLCAnc2hvd19jb250cm9sJylcbiAgICBpZCA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgkY29udHJvbCwgJ3Nob3dfY29udHJvbCcpXG4gICAgICAgICAgICAgJGJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcmVlbkNsaWNrSGFuZGxlcilcbiAgICAgICAgIH0gLCBkdXJhdGlvbkN0cmxWaXNpYmxlKVxufVxuZnVuY3Rpb24gY29udHJvbENsaWNrSGFuZGxlcihlKSB7XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKVxuICAgIGNsZWFyVGltZW91dChpZClcbiAgICBpZCA9IHNldFRpbWVvdXQoIGZ1bmN0aW9uKCl7XG4gICAgICAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgkY29udHJvbCwgJ3Nob3dfY29udHJvbCcpXG4gICAgICAgICAgICAgJGJveC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcmVlbkNsaWNrSGFuZGxlcilcbiAgICAgICAgIH0gLCBkdXJhdGlvbkN0cmxWaXNpYmxlKVxufVxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG53aW5kb3cub25sb2FkID0gZnVuY3Rpb24gKCkge1xyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZSA9IHtcclxuICAgICckYm94JzogICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJveCcpLFxyXG4gICAgJyR2aWRlbyc6ICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcudmlkZW8nKSxcclxuICAgICckc291cmNlJzogICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNvdXJjZScpLFxyXG4gICAgJyRzaWRlTWVudUJveCc6ICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcicpLFxyXG4gICAgJyRzbGlkZXInOiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2lkZWJhcl9fc2xpZGVyJyksXHJcbiAgICAnJGZvb3Rlcic6ICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXInKSxcclxuICAgICckY29udHJvbCc6ICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2wnKSxcclxuICAgICckYnRuUGxheUZvb3Rlcic6ICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3RlciAuYnRuX3BsYXknKSxcclxuICAgICckYnRuUGxheUN0cmwnOiAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2wgLmJ0bl9wbGF5JyksXHJcbiAgICAnJGJ0blZvbHVtZUZvb3Rlcic6IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXIgLmJ0bl92b2x1bWUnKSxcclxuICAgICckYnRuVm9sdW1lQ3RybCc6ICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2wgLmJ0bl92b2x1bWUnKSxcclxuICAgICckYnRuUXVhbGl0eSc6ICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9xdWFsaXR5JyksXHJcbiAgICAnJGJ0blNjYWxlJzogICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY2FsZV9ib3hfX2J0bicpLFxyXG4gICAgJyRzdWJCdG5VcCc6ICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NhbGVfYm94X19zdWJidG5fdXAnKSxcclxuICAgICckc3ViQnRuRG93bic6ICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjYWxlX2JveF9fc3ViYnRuX2Rvd24nKSxcclxuICAgICckYnRuTWVudU9mZic6ICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3RlciAuYnRuX19tZW51X3N3aXRjaCcpLFxyXG4gICAgJyRidG5NZW51T24nOiAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbCAuYnRuX19tZW51X3N3aXRjaCcpLFxyXG4gICAgJyRidG5GdWxsU2NyT24nOiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyIC5idG5fX2Z1bGxzY3InKSxcclxuICAgICckYnRuRnVsbFNjck9mZic6ICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2wgLmJ0bl9fZnVsbHNjcicpLFxyXG4gICAgJ2FjdGl2ZSRpbnB1dCc6IG51bGwsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgb2JqZWN0XHJcbiAgICAnaXNGdWxsU2NyZWVuQWxsb3dlZCc6IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBib29sZWFuXHJcbiAgICAnaXNfaVBhZF9pUGhvbmUnOiAvKGlQaG9uZXxpUG9kfGlQYWQpLipBcHBsZVdlYktpdC9pLnRlc3Qod2luZG93Lm5hdmlnYXRvci51c2VyQWdlbnQpLCAgIC8vICBib29sZWFuXHJcbiAgICAnaXNfaVBhZF9pUGhvbmVfaW5GdWxsU2NyZWVuJzogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBib29sZWFuXHJcbiAgICAnYXNrJGJveEluRnVsbFNjcmVlbic6IG51bGwsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBmdW5jdGlvbiAtPiBib29sZWFuXHJcbiAgICAnaGlnaFF1YWxpdHknOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBib29sZWFuXHJcbiAgICAnZHVyYXRpb25TY2FsZVN1Ym1lbnUnOiA0MDAwLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBtc1xyXG4gICAgJ2R1cmF0aW9uQ3RybFZpc2libGUnOiA1MDAwLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyAgbXNcclxuICAgICdjbGFzc0xpc3QnOiB7XHJcbiAgICAgICAgJ2NvbnRhaW5zJzogbnVsbCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBmdW5jdGlvbiAtPiBib29sZWFuXHJcbiAgICAgICAgJ2FkZCc6IG51bGwsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBmdW5jdGlvbiAtPiB2b2lkXHJcbiAgICAgICAgJ3JlbW92ZSc6IG51bGwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBmdW5jdGlvbiAtPiB2b2lkXHJcbiAgICAgfVxyXG4gIH07XHJcblxyXG4gIHJlcXVpcmUoJy4vYXNrQ2hhbm5lbExpc3QuanMnKVxyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZS5pc0Z1bGxTY3JlZW5BbGxvd2VkID0gcmVxdWlyZSgnLi9hc2tGdWxsU2NyZWVuLmpzJylcclxuICB3aW5kb3cudmlld2VyU3RhdGUuaXNfaVBhZF9pUGhvbmVfaW5GdWxsU2NyZWVuID0gcmVxdWlyZSgnLi9hc2tfaVBhZF9pUGhvbmVfRnVsbFNjcmVlbi5qcycpXHJcbiAgd2luZG93LnZpZXdlclN0YXRlLmFzayRib3hJbkZ1bGxTY3JlZW4gPSByZXF1aXJlKCcuL2FzayRib3hJbkZ1bGxTY3JlZW4uanMnKVxyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZS5jbGFzc0xpc3QgPSByZXF1aXJlKCcuL2NsYXNzTGlzdC5qcycpXHJcbiAgICBcclxuICByZXF1aXJlKCcuL3NjcmVlbkhlaWdodC5qcycpXHJcbiAgLy8gICAgSW5pdCBjb21wbGV0ZWRcclxuICByZXF1aXJlKCcuL2NoYW5uZWxTZWxlY3Rvci5qcycpXHJcbiAgcmVxdWlyZSgnLi9mdWxsc2NyZWVuT3JIaWRlTWVudS5qcycpXHJcbiAgcmVxdWlyZSgnLi9idXR0b25RdWFsaXR5LmpzJylcclxuICByZXF1aXJlKCcuL2J1dHRvblNjYWxlLmpzJylcclxuICByZXF1aXJlKCcuL2J1dHRvblBsYXlQYXVzZS5qcycpXHJcbiAgaWYoIXdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZSkgcmVxdWlyZSgnLi9idXR0b25Wb2x1bWUuanMnKVxyXG59IiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5zZXRGb250U2l6ZSgpXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzZXRGb250U2l6ZSlcclxuZnVuY3Rpb24gc2V0Rm9udFNpemUoKSB7XHJcbiAgICB2YXIgZm9udFNpemUgPSBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCAvIDIwXHJcbiAgICBpZihkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCA+IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgpIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmZvbnRTaXplID0gMC40ICogZm9udFNpemUgKyAncHgnXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuZm9udFNpemUgPSBmb250U2l6ZSArICdweCdcclxuICAgIH1cclxufSJdfQ==
