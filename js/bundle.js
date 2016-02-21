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
    if (window.viewerState.highQuality) {
        window.viewerState.highQuality = false
        link = window.viewerState.active$input.getAttribute('data-link-lq')
    } else {
        window.viewerState.highQuality = true
        link = window.viewerState.active$input.getAttribute('data-link-hq')
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
window.Hls = null
window.hls = null

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
            link = e.target.getAttribute('data-link-lq')
            
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkM6L1VzZXJzL2EwNS9BcHBEYXRhL1JvYW1pbmcvbnBtL25vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCJqcy9hc2skYm94SW5GdWxsU2NyZWVuLmpzIiwianMvYXNrRnVsbFNjcmVlbi5qcyIsImpzL2Fza1ZpZGVvV29ya2luZy5qcyIsImpzL2Fza19pUGFkX2lQaG9uZV9GdWxsU2NyZWVuLmpzIiwianMvYnV0dG9uUGxheVBhdXNlLmpzIiwianMvYnV0dG9uUXVhbGl0eS5qcyIsImpzL2J1dHRvblNjYWxlLmpzIiwianMvYnV0dG9uVm9sdW1lLmpzIiwianMvY2hhbm5lbFNlbGVjdG9yLmpzIiwianMvY2xhc3NMaXN0LmpzIiwianMvZnVsbHNjcmVlbk9ySGlkZU1lbnUuanMiLCJqcy9tYWluLmpzIiwianMvc2NyZWVuSGVpZ2h0LmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDYkE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ1hBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDUEE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3RDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUNuREE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDM0VBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDL0tBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FDbENBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUN4R0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQ3JEQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IGZ1bmN0aW9uKCkge1xyXG4gICAgaWYgKGRvY3VtZW50LmZ1bGxzY3JlZW5FbGVtZW50IHx8IFxyXG4gICAgICAgIGRvY3VtZW50LndlYmtpdEZ1bGxzY3JlZW5FbGVtZW50IHx8XHJcbiAgICAgICAgZG9jdW1lbnQubW96RnVsbFNjcmVlbkVsZW1lbnQgfHxcclxuICAgICAgICBkb2N1bWVudC5tc0Z1bGxzY3JlZW5FbGVtZW50IHx8XHJcbiAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmlzX2lQYWRfaVBob25lX2luRnVsbFNjcmVlbiApIHtcclxuICAgICAgICByZXR1cm4gdHJ1ZVxyXG4gICAgfSBlbHNlIHJldHVybiBmYWxzZVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSAoZnVuY3Rpb24gKCkge1xyXG4gICAgdmFyICRib3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJGJveFxyXG4gICAgaWYgKCRib3gucmVxdWVzdEZ1bGxzY3JlZW4gfHxcclxuICAgICAgICAkYm94Lm1velJlcXVlc3RGdWxsU2NyZWVuIHx8XHJcbiAgICAgICAgJGJveC53ZWJraXRSZXF1ZXN0RnVsbHNjcmVlbiB8fFxyXG4gICAgICAgICRib3gubXNSZXF1ZXN0RnVsbHNjcmVlbikge1xyXG4gICAgICAgIHJldHVybiB0cnVlIFxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICByZXR1cm4gZmFsc2UgXHJcbiAgICB9XHJcbn0pKClcclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbiAoKSB7XHJcbiAgICBpZih0eXBlb2Ygd2luZG93LnZpZXdlclN0YXRlLiR2aWRlby5wbGF5ID09PSAnZnVuY3Rpb24nICkge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCd2aWRlbyBvayBuZWVkcyB0byBiZSBjb25maXJtZWQnKVxyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGNvbnNvbGUubG9nKCdubyB2aWRlbycpXHJcbiAgICAgICAgcmV0dXJuIGZhbHNlXHJcbiAgICB9XHJcbn0pKClcclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5tb2R1bGUuZXhwb3J0cyA9IChmdW5jdGlvbigpIHtcclxuICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZSAmJiB3aW5kb3cuaW5uZXJIZWlnaHQgPj0gd2luZG93LnNjcmVlbi5hdmFpbEhlaWdodCkge1xyXG4gICAgICAgIHJldHVybiB0cnVlXHJcbiAgICB9IGVsc2UgcmV0dXJuIGZhbHNlXHJcbn0pKClcclxuIiwiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgJHZpZGVvID0gd2luZG93LnZpZXdlclN0YXRlLiR2aWRlbyxcclxuICAgICRidG5QbGF5Rm9vdGVyID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5QbGF5Rm9vdGVyLFxyXG4gICAgJGJ0blBsYXlDdHJsID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5QbGF5Q3RybCxcclxuICAgICRzdmdQbGF5Rm9vdGVyID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3RlciAuYnRuX3BsYXlfX2ljb25fcGxheScpLFxyXG4gICAgJHN2Z1BsYXlDdHJsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2wgLmJ0bl9wbGF5X19pY29uX3BsYXknKSxcclxuICAgICRzdmdQYXVzZUZvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXIgLmJ0bl9wbGF5X19pY29uX3BhdXNlJyksXHJcbiAgICAkc3ZnUGF1c2VDdHJsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnRyb2wgLmJ0bl9wbGF5X19pY29uX3BhdXNlJyksXHJcbiAgICBjbGFzc0xpc3QgPSB3aW5kb3cudmlld2VyU3RhdGUuY2xhc3NMaXN0XHJcblxyXG5pZiAoJHZpZGVvLnBhdXNlZCl7XHJcbiAgICBzZXRJY29uc1BsYXkoKVxyXG59IGVsc2Uge1xyXG4gICAgc2V0SWNvbnNQYXVzZSgpXHJcbn0gXHJcbiRidG5QbGF5Rm9vdGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlUGxheVBhdXNlKVxyXG4kYnRuUGxheUN0cmwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVQbGF5UGF1c2UpXHJcbiR2aWRlby5hZGRFdmVudExpc3RlbmVyKCdwbGF5Jywgc2V0SWNvbnNQYXVzZSgpKVxyXG4kdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGF1c2UnLCBzZXRJY29uc1BsYXkoKSlcclxuJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZnVuY3Rpb24oZSl7XHJcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpXHJcbn0pXHJcbmZ1bmN0aW9uIHRvZ2dsZVBsYXlQYXVzZSgpe1xyXG4gICAgaWYgKCR2aWRlby5wYXVzZWQpICR2aWRlby5wbGF5KCkgXHJcbiAgICBlbHNlICR2aWRlby5wYXVzZSgpXHJcbn1cclxuZnVuY3Rpb24gc2V0SWNvbnNQbGF5KCkge1xyXG4gICAgY2xhc3NMaXN0LmFkZCgkc3ZnUGxheUZvb3RlciwgXCJhY3RpdmVcIilcclxuICAgIGNsYXNzTGlzdC5hZGQoJHN2Z1BsYXlDdHJsLCBcImFjdGl2ZVwiKVxyXG4gICAgY2xhc3NMaXN0LnJlbW92ZSgkc3ZnUGF1c2VGb290ZXIsIFwiYWN0aXZlXCIpXHJcbiAgICBjbGFzc0xpc3QucmVtb3ZlKCRzdmdQYXVzZUN0cmwsIFwiYWN0aXZlXCIpXHJcbn1cclxuZnVuY3Rpb24gc2V0SWNvbnNQYXVzZSgpIHtcclxuICAgIGNsYXNzTGlzdC5hZGQoJHN2Z1BhdXNlRm9vdGVyLCBcImFjdGl2ZVwiKVxyXG4gICAgY2xhc3NMaXN0LmFkZCgkc3ZnUGF1c2VDdHJsLCBcImFjdGl2ZVwiKVxyXG4gICAgY2xhc3NMaXN0LnJlbW92ZSgkc3ZnUGxheUZvb3RlciwgXCJhY3RpdmVcIilcclxuICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z1BsYXlDdHJsLCBcImFjdGl2ZVwiKVxyXG59IiwiJ3VzZSBzdHJpY3QnXHJcblxyXG52YXIgJGJ0blF1YWxpdHkgPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0blF1YWxpdHksXHJcbiAgICAkc3ZnUXVhbGl0eSA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5idG5fcXVhbGl0eV9faWNvbicpLFxyXG4gICAgJHZpZGVvID0gd2luZG93LnZpZXdlclN0YXRlLiR2aWRlbyxcclxuICAgICRzb3VyY2UgPSB3aW5kb3cudmlld2VyU3RhdGUuJHNvdXJjZSxcclxuICAgICRidG5NZW51T2ZmID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5NZW51T2ZmLFxyXG4gICAgY2xhc3NMaXN0ID0gd2luZG93LnZpZXdlclN0YXRlLmNsYXNzTGlzdCxcclxuICAgIGxpbmsgPSAnJ1xyXG5cclxuJGJ0blF1YWxpdHkuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVRdWFsaXR5KVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZnVsbHNjcmVlbmNoYW5nZVwiLCBzdHlsZVF1YWxpdHlCdXR0b24pXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoXCJ3ZWJraXRmdWxsc2NyZWVuY2hhbmdlXCIsIHN0eWxlUXVhbGl0eUJ1dHRvbilcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcihcIm1vemZ1bGxzY3JlZW5jaGFuZ2VcIiwgc3R5bGVRdWFsaXR5QnV0dG9uKVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiTVNGdWxsc2NyZWVuQ2hhbmdlXCIsIHN0eWxlUXVhbGl0eUJ1dHRvbilcclxuJGJ0bk1lbnVPZmYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdHlsZVF1YWxpdHlCdXR0b24pXHJcblxyXG5mdW5jdGlvbiB0b2dnbGVRdWFsaXR5KCl7XHJcbiAgICBpZiAod2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5KSB7XHJcbiAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5ID0gZmFsc2VcclxuICAgICAgICBsaW5rID0gd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1scScpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSA9IHRydWVcclxuICAgICAgICBsaW5rID0gd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1ocScpXHJcbiAgICB9XHJcbiAgICBpZih3aW5kb3cuaGxzKXtcclxuICAgICAgICB3aW5kb3cuaGxzLmRlc3Ryb3koKVxyXG4gICAgICAgIHdpbmRvdy5obHMgPSBuZXcgd2luZG93LkhscygpO1xyXG4gICAgICAgIHdpbmRvdy5obHMuYXR0YWNoTWVkaWEod2luZG93LnZpZXdlclN0YXRlLiR2aWRlbyk7XHJcbiAgICAgICAgd2luZG93Lmhscy5vbih3aW5kb3cuSGxzLkV2ZW50cy5NRURJQV9BVFRBQ0hFRCxmdW5jdGlvbigpIHtcclxuICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2aWRlbyBhbmQgd2luZG93Lmhscy5qcyBhcmUgbm93IGJvdW5kIHRvZ2V0aGVyICFcIik7XHJcbiAgICAgICAgICAgIHdpbmRvdy5obHMubG9hZFNvdXJjZShsaW5rKTtcclxuICAgICAgICAgICAgd2luZG93Lmhscy5vbih3aW5kb3cuSGxzLkV2ZW50cy5NQU5JRkVTVF9QQVJTRUQsIGZ1bmN0aW9uKGV2ZW50LGRhdGEpIHtcclxuICAgICAgICAgICAgICAgIGZvcih2YXIgaT0wOyBpPHdpbmRvdy5obHMubGV2ZWxzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyggaSArICdcXHRiaXRyYXRlOicgKyB3aW5kb3cuaGxzLmxldmVsc1tpXS5iaXRyYXRlICsgJ1xcdGg6JyArIHdpbmRvdy5obHMubGV2ZWxzW2ldLmhlaWdodCArICdcXHR3OicgKyB3aW5kb3cuaGxzLmxldmVsc1tpXS53aWR0aCArICdcXG4nKVxyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgIH0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICAgICRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgfVxyXG4gICAgJHZpZGVvLnBsYXkoKVxyXG4gICAgc3R5bGVRdWFsaXR5QnV0dG9uKClcclxufVxyXG5mdW5jdGlvbiBzdHlsZVF1YWxpdHlCdXR0b24oKSB7XHJcbiAgICBpZiAod2luZG93LnZpZXdlclN0YXRlLmhpZ2hRdWFsaXR5KSB7XHJcbiAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgkc3ZnUXVhbGl0eSwgJ2Rpc2FibGVkJylcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgkc3ZnUXVhbGl0eSwgJ2Rpc2FibGVkJylcclxuICAgIH1cclxufSIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyICRib3ggPSB3aW5kb3cudmlld2VyU3RhdGUuJGJveCxcclxuICAgICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8sXHJcbiAgICAkYnRuU2NhbGUgPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0blNjYWxlLFxyXG4gICAgJHN2Z1NjYWxlID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjYWxlX2JveF9fYnRuX2ljb24nKSxcclxuICAgICRidG5TY2FsZVN1YkJ0bnNCb3ggPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NhbGVfYm94X19zdWJidG5zJyksXHJcbiAgICAkc3ViQnRuVXAgPSB3aW5kb3cudmlld2VyU3RhdGUuJHN1YkJ0blVwLFxyXG4gICAgJHN1YkJ0bkRvd24gPSB3aW5kb3cudmlld2VyU3RhdGUuJHN1YkJ0bkRvd24sXHJcbiAgICAkc3ViQnRuVXBJY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1YmJ0bl91cCcpLFxyXG4gICAgJHN1YkJ0bkRvd25JY29uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnN1YmJ0bl9kb3duJyksXHJcbiAgICAkYnRuTWVudU9mZiA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuTWVudU9mZixcclxuICAgICRidG5NZW51T24gPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0bk1lbnVPbixcclxuICAgIGNsYXNzTGlzdCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5jbGFzc0xpc3QsXHJcbiAgICBpbml0JHZpZGVvSGVpZ2h0ID0gdW5kZWZpbmVkLFxyXG4gICAgaW5pdCR2aWRlb1dpZHRoID0gdW5kZWZpbmVkLFxyXG4gICAgc2NhbGVkSG9yaXNvbnRhbGx5ID0gZmFsc2UsXHJcbiAgICBpZCA9IHVuZGVmaW5lZFxyXG5cclxuY2xhc3NMaXN0LmFkZCgkc3ZnU2NhbGUsICdkaXNhYmxlZCcpXHJcblxyXG4kdmlkZW8uYWRkRXZlbnRMaXN0ZW5lcigncGxheWluZycsIGluaXQpXHJcbiRidG5NZW51T2ZmLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2NhbGVCdG5PbilcclxuJGJ0bk1lbnVPbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHNjYWxlQnRuT2ZmKVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdmdWxsc2NyZWVuY2hhbmdlJywgZnVsbFNjcmVlbkNoYW5nZSlcclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignd2Via2l0ZnVsbHNjcmVlbmNoYW5nZScsIGZ1bGxTY3JlZW5DaGFuZ2UpXHJcbmRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vemZ1bGxzY3JlZW5jaGFuZ2UnLCBmdWxsU2NyZWVuQ2hhbmdlKVxyXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdNU0Z1bGxzY3JlZW5DaGFuZ2UnLCBmdWxsU2NyZWVuQ2hhbmdlKVxyXG5cclxuZnVuY3Rpb24gaW5pdCgpe1xyXG4gICAgc2V0VGltZW91dChzY2FsZUhvcmlzb250YWxseSwgMzAwKVxyXG59XHJcbmZ1bmN0aW9uIHNjYWxlSG9yaXNvbnRhbGx5KCkge1xyXG4gICAgJHZpZGVvLnN0eWxlLndpZHRoID0gJGJveC5jbGllbnRXaWR0aCArICdweCdcclxuICAgICR2aWRlby5zdHlsZS5oZWlnaHQgPSAkYm94LmNsaWVudFdpZHRoICogJHZpZGVvLnZpZGVvSGVpZ2h0IC8gJHZpZGVvLnZpZGVvV2lkdGggKyAncHgnXHJcbiAgICBzY2FsZWRIb3Jpc29udGFsbHkgPSB0cnVlXHJcbiAgICBjb25zb2xlLmxvZygnc2NyZWVuOiAnICsgJGJveC5jbGllbnRXaWR0aCArICd4JyArICRib3guY2xpZW50SGVpZ2h0ICsgXCJcXG5cIlxyXG4gICAgICAgICAgICAgICAgKyAndmlkZW86ICcgKyAkYm94LmNsaWVudFdpZHRoICsgJ3gnICsgJGJveC5jbGllbnRXaWR0aCAqICR2aWRlby52aWRlb0hlaWdodCAvICR2aWRlby52aWRlb1dpZHRoKVxyXG59XHJcbmZ1bmN0aW9uIHNjYWxlVmVydGljYWxseSgpIHtcclxuICAgICR2aWRlby5zdHlsZS53aWR0aCA9ICRib3guY2xpZW50SGVpZ2h0ICogJHZpZGVvLnZpZGVvV2lkdGggLyAkdmlkZW8udmlkZW9IZWlnaHQgKyAncHgnXHJcbiAgICAkdmlkZW8uc3R5bGUuaGVpZ2h0ID0gJGJveC5jbGllbnRIZWlnaHQgKyAncHgnXHJcbiAgICBzY2FsZWRIb3Jpc29udGFsbHkgPSBmYWxzZVxyXG4gICAgY29uc29sZS5sb2coJ3NjcmVlbjogJyArICRib3guY2xpZW50V2lkdGggKyAneCcgKyAkYm94LmNsaWVudEhlaWdodCArIFwiXFxuXCJcclxuICAgICAgICAgICAgICAgICsgJ3ZpZGVvOiAnICsgJGJveC5jbGllbnRIZWlnaHQgKiAkdmlkZW8udmlkZW9XaWR0aCAvICR2aWRlby52aWRlb0hlaWdodCArICd4JyArICRib3guY2xpZW50SGVpZ2h0KVxyXG59XHJcblxyXG5mdW5jdGlvbiBmdWxsU2NyZWVuQ2hhbmdlKCkge1xyXG4gICAgaWYod2luZG93LnZpZXdlclN0YXRlLmFzayRib3hJbkZ1bGxTY3JlZW4oKSl7XHJcbiAgICAgICAgc2NhbGVCdG5PbigpXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIHNjYWxlQnRuT2ZmKClcclxuICAgIH1cclxuICAgIHNldFRpbWVvdXQoc2NhbGVIb3Jpc29udGFsbHksIDMwMClcclxufVxyXG5mdW5jdGlvbiBzY2FsZUJ0bk9uKCkge1xyXG4gICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgaWYgKCRib3guY2xpZW50V2lkdGggIT09ICR2aWRlby5vZmZzZXRXaWR0aCB8fCAkYm94LmNsaWVudEhlaWdodCAhPT0gJHZpZGVvLm9mZnNldEhlaWdodCkge1xyXG4gICAgICAgICAgICAkYnRuU2NhbGUuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCB0b2dnbGVTY3JlZW5BbGlnbilcclxuICAgICAgICAgICAgY2xhc3NMaXN0LnJlbW92ZSgkc3ZnU2NhbGUsICdkaXNhYmxlZCcpXHJcbiAgICAgICAgfSBlbHNlIGNsYXNzTGlzdC5hZGQoJHN2Z1NjYWxlLCAnZGlzYWJsZWQnKVxyXG4gICAgfSwgMzAwKVxyXG59XHJcbmZ1bmN0aW9uIHNjYWxlQnRuT2ZmKCkge1xyXG4gICAgJGJ0blNjYWxlLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdG9nZ2xlU2NyZWVuQWxpZ24pXHJcbiAgICBjbGFzc0xpc3QuYWRkKCRzdmdTY2FsZSwgJ2Rpc2FibGVkJylcclxuICAgIHNldFRpbWVvdXQoc2NhbGVIb3Jpc29udGFsbHksIDMwMClcclxufVxyXG5mdW5jdGlvbiB0b2dnbGVTY3JlZW5BbGlnbigpIHtcclxuICAgIGlmKHNjYWxlZEhvcmlzb250YWxseSl7XHJcbiAgICAgICAgc2NhbGVWZXJ0aWNhbGx5KClcclxuICAgIH0gZWxzZSB7XHJcbiAgICAgICAgc2NhbGVIb3Jpc29udGFsbHkoKVxyXG4gICAgfVxyXG59XHJcbiIsIid1c2Ugc3RyaWN0J1xyXG5cclxudmFyICR2aWRlbyA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8sXHJcbiAgICAkYnRuVm9sdW1lRm9vdGVyID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5Wb2x1bWVGb290ZXIsXHJcbiAgICAkYnRuVm9sdW1lQ3RybCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuVm9sdW1lQ3RybCxcclxuICAgICRzdmdWb2x1bWVPbkZvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXIgLmJ0bl92b2x1bWVfX2ljb25fb24nKSxcclxuICAgICRzdmdWb2x1bWVPbkN0cmwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbCAuYnRuX3ZvbHVtZV9faWNvbl9vbicpLFxyXG4gICAgJHN2Z1ZvbHVtZU9mZkZvb3RlciA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXIgLmJ0bl92b2x1bWVfX2ljb25fb2ZmJyksXHJcbiAgICAkc3ZnVm9sdW1lT2ZmQ3RybCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sIC5idG5fdm9sdW1lX19pY29uX29mZicpLFxyXG4gICAgY2xhc3NMaXN0ID0gd2luZG93LnZpZXdlclN0YXRlLmNsYXNzTGlzdFxyXG5cclxuJGJ0blZvbHVtZUZvb3Rlci5zdHlsZS5kaXNwbGF5ID0gJ2lubGluZS1ibG9jaydcclxuJGJ0blZvbHVtZUN0cmwuc3R5bGUuZGlzcGxheSA9ICdpbmxpbmUtYmxvY2snXHJcblxyXG4kYnRuVm9sdW1lRm9vdGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbXV0ZSlcclxuJGJ0blZvbHVtZUN0cmwuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBtdXRlKVxyXG5cclxuZnVuY3Rpb24gbXV0ZSgpe1xyXG4gICAgaWYgKCR2aWRlby5tdXRlZCl7XHJcbiAgICAgICAgJHZpZGVvLm11dGVkID0gZmFsc2VcclxuICAgICAgICAkdmlkZW8udm9sdW1lID0gMS4wXHJcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgkc3ZnVm9sdW1lT25Gb290ZXIsIFwiYWN0aXZlXCIpXHJcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgkc3ZnVm9sdW1lT25DdHJsLCBcImFjdGl2ZVwiKVxyXG4gICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z1ZvbHVtZU9mZkZvb3RlciwgXCJhY3RpdmVcIilcclxuICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRzdmdWb2x1bWVPZmZDdHJsLCBcImFjdGl2ZVwiKVxyXG4gICAgfSBlbHNlIHtcclxuICAgICAgICAkdmlkZW8udm9sdW1lID0gMC4wXHJcbiAgICAgICAgJHZpZGVvLm11dGVkID0gdHJ1ZVxyXG4gICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z1ZvbHVtZU9uRm9vdGVyLCBcImFjdGl2ZVwiKVxyXG4gICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJHN2Z1ZvbHVtZU9uQ3RybCwgXCJhY3RpdmVcIilcclxuICAgICAgICBjbGFzc0xpc3QuYWRkKCRzdmdWb2x1bWVPZmZGb290ZXIsIFwiYWN0aXZlXCIpXHJcbiAgICAgICAgY2xhc3NMaXN0LmFkZCgkc3ZnVm9sdW1lT2ZmQ3RybCwgXCJhY3RpdmVcIilcclxuICAgIH0gXHJcbn1cclxuIiwiXCJ1c2Ugc3RyaWN0XCJcclxuXHJcbnZhciAkdmlkZW8gPSB3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvLFxyXG4gICAgJHNvdXJjZSA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc291cmNlLFxyXG4gICAgJHNsaWRlciA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kc2xpZGVyLFxyXG4gICAgJHNpZGVNZW51Qm94ID0gd2luZG93LnZpZXdlclN0YXRlLiRzaWRlTWVudUJveCxcclxuICAgIGNsYXNzTGlzdCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS5jbGFzc0xpc3QsXHJcbiAgICBsaW5rID0gJycsXHJcbiAgICAkYnRucyA9IHtcclxuICAgIFwiY2hfMWdvcm9kc2tveVwiOiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF8xZ29yb2Rza295XCIpLFxyXG4gICAgXCJjaF8zdHN5ZnJvdm95XCI6ICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoXzN0c3lmcm92b3lcIiksXHJcbiAgICBcImNoX3JlcG9ydGVyXCI6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfcmVwb3J0ZXJcIiksXHJcbiAgICBcImNoX2FjYWRlbWlhXCI6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfYWNhZGVtaWFcIiksXHJcbiAgICBcImNoX2ExXCI6ICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfYTFcIiksXHJcbiAgICBcImNoX2R1bXNrYXlhXCI6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfZHVtc2theWFcIiksXHJcbiAgICBcImNoX2d0dlwiOiAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIjY2hfZ3R2XCIpLFxyXG4gICAgXCJjaF9zdHZcIjogICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiI2NoX3N0dlwiKSxcclxuICAgIFwiY2hfdWduYXlhdm9sbmFcIjogZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF91Z25heWF2b2xuYVwiKSxcclxuICAgIFwiY2hfbmVtb1wiOiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIiNjaF9uZW1vXCIpXHJcbn1cclxud2luZG93LkhscyA9IG51bGxcclxud2luZG93LmhscyA9IG51bGxcclxuXHJcbiRidG5zLmNoXzFnb3JvZHNrb3kuc2V0QXR0cmlidXRlKCAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS8xdHZvZC8xdHZvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiICAgIClcclxuJGJ0bnMuY2hfM3RzeWZyb3ZveS5zZXRBdHRyaWJ1dGUoICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vY2RuNS5saXZlLXR2Lm9kLnVhOjgwODEvdHYvM3R2b2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiAgKVxyXG4kYnRucy5jaF9yZXBvcnRlci5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly9jZG40LmxpdmUtdHYub2QudWE6ODA4MS90di8zMWNob2QtYWJyLWxxL3BsYXlsaXN0Lm0zdThcIiApXHJcbiRidG5zLmNoX2FjYWRlbWlhLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovL2NkbjQubGl2ZS10di5vZC51YTo4MDgxL3R2LzM2Y2hvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiIClcclxuJGJ0bnMuY2hfYTEuc2V0QXR0cmlidXRlKCAgICAgICAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL2Exb2QvYTFvZC1hYnItbHEvcGxheWxpc3QubTN1OFwiICAgICAgKVxyXG4kYnRucy5jaF9kdW1za2F5YS5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTM4OjgwODEvZHVtc2thL2R1bXNrYS1hYnItbHEvcGxheWxpc3QubTN1OFwiICApXHJcbiRidG5zLmNoX2d0di5zZXRBdHRyaWJ1dGUoICAgICAgICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9hMW9kL2d0dm9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgICAgIClcclxuJGJ0bnMuY2hfc3R2LnNldEF0dHJpYnV0ZSggICAgICAgICAnZGF0YS1saW5rLWxxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL3N0dm9kL3N0dm9kLWFici1scS9wbGF5bGlzdC5tM3U4XCIgICAgKVxyXG4kYnRucy5jaF91Z25heWF2b2xuYS5zZXRBdHRyaWJ1dGUoICdkYXRhLWxpbmstbHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvd2F2ZS93YXZlLWFici1scS9wbGF5bGlzdC5tM3U4XCIgICAgICApXHJcbiRidG5zLmNoX25lbW8uc2V0QXR0cmlidXRlKCAgICAgICAgJ2RhdGEtbGluay1scScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9uZW1vL21vci1zdWIvcGxheWxpc3QubTN1OFwiICAgICAgICAgIClcclxuXHJcbiRidG5zLmNoXzFnb3JvZHNrb3kuc2V0QXR0cmlidXRlKCAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS8xdHZvZC8xdHZvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgIClcclxuJGJ0bnMuY2hfM3RzeWZyb3ZveS5zZXRBdHRyaWJ1dGUoICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vY2RuNS5saXZlLXR2Lm9kLnVhOjgwODEvdHYvM3R2b2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICAgKVxyXG4kYnRucy5jaF9yZXBvcnRlci5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly9jZG40LmxpdmUtdHYub2QudWE6ODA4MS90di8zMWNob2QtYWJyL3BsYXlsaXN0Lm0zdThcIiAgICApXHJcbiRidG5zLmNoX2FjYWRlbWlhLnNldEF0dHJpYnV0ZSggICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovL2NkbjQubGl2ZS10di5vZC51YTo4MDgxL3R2LzM2Y2hvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgIClcclxuJGJ0bnMuY2hfYTEuc2V0QXR0cmlidXRlKCAgICAgICAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL2Exb2QvYTFvZC1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgICAgKVxyXG4kYnRucy5jaF9kdW1za2F5YS5zZXRBdHRyaWJ1dGUoICAgICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTM4OjgwODEvZHVtc2thL2R1bXNrYS1hYnIvcGxheWxpc3QubTN1OFwiICAgICApXHJcbiRidG5zLmNoX2d0di5zZXRBdHRyaWJ1dGUoICAgICAgICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9hMW9kL2d0dm9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgIClcclxuJGJ0bnMuY2hfc3R2LnNldEF0dHJpYnV0ZSggICAgICAgICAnZGF0YS1saW5rLWhxJywgXCJodHRwOi8vNzcuODguMTk2LjEzMzo4MDgxL3N0dm9kL3N0dm9kLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgKVxyXG4kYnRucy5jaF91Z25heWF2b2xuYS5zZXRBdHRyaWJ1dGUoICdkYXRhLWxpbmstaHEnLCBcImh0dHA6Ly83Ny44OC4xOTYuMTMzOjgwODEvd2F2ZS93YXZlLWFici9wbGF5bGlzdC5tM3U4XCIgICAgICAgICApXHJcbiRidG5zLmNoX25lbW8uc2V0QXR0cmlidXRlKCAgICAgICAgJ2RhdGEtbGluay1ocScsIFwiaHR0cDovLzc3Ljg4LjE5Ni4xMzM6ODA4MS9uZW1vL21vci1hYnIvcGxheWxpc3QubTN1OFwiICAgICAgICAgIClcclxuXHJcbiRzbGlkZXIuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbihlKXtcclxuICAgIGlmKGUudGFyZ2V0LnRhZ05hbWUgPT09ICdJTlBVVCcpe1xyXG4gICAgICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQgPT09IGUudGFyZ2V0KSB7XHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQuY2hlY2tlZCA9IGZhbHNlXHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5hY3RpdmUkaW5wdXQgPSBudWxsXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZih3aW5kb3cuSGxzICYmIHdpbmRvdy5IbHMuaXNTdXBwb3J0ZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgd2luZG93Lmhscy5kZXN0cm95KClcclxuICAgICAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgICAgICR2aWRlby5zZXRBdHRyaWJ1dGUoJ3NyYycsICcnKVxyXG4gICAgICAgICAgICAgICAgJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsICcnKVxyXG4gICAgICAgICAgICB9XHJcblxyXG4gICAgICAgICAgICAkdmlkZW8uc3R5bGUuYmFja2dyb3VuZFNpemUgPSBcIlwiXHJcbiAgICAgICAgICAgIGNsYXNzTGlzdC5yZW1vdmUoJHNpZGVNZW51Qm94LCAnc2hvd19mb290ZXInKVxyXG4gICAgICAgICAgICAkdmlkZW8ucmVtb3ZlRXZlbnRMaXN0ZW5lcignZXJyb3InLCBmYWlsZWQpXHJcbiAgICAgICAgICAgICR2aWRlby5zdHlsZS53aWR0aCA9ICcxMDAlJ1xyXG4gICAgICAgICAgICAkdmlkZW8uc3R5bGUuaGVpZ2h0ID0gJ2F1dG8nXHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgd2luZG93LnZpZXdlclN0YXRlLmFjdGl2ZSRpbnB1dCA9IGUudGFyZ2V0XHJcbiAgICAgICAgICAgIHdpbmRvdy52aWV3ZXJTdGF0ZS5oaWdoUXVhbGl0eSA9IGZhbHNlXHJcbiAgICAgICAgICAgIGxpbmsgPSBlLnRhcmdldC5nZXRBdHRyaWJ1dGUoJ2RhdGEtbGluay1scScpXHJcbiAgICAgICAgICAgIFxyXG4gICAgICAgICAgICBpZih3aW5kb3cuSGxzICYmIHdpbmRvdy5IbHMuaXNTdXBwb3J0ZWQoKSkge1xyXG4gICAgICAgICAgICAgICAgaWYod2luZG93Lmhscykgd2luZG93Lmhscy5kZXN0cm95KClcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5obHMgPSBuZXcgd2luZG93LkhscygpO1xyXG4gICAgICAgICAgICAgICAgd2luZG93Lmhscy5hdHRhY2hNZWRpYSh3aW5kb3cudmlld2VyU3RhdGUuJHZpZGVvKTtcclxuICAgICAgICAgICAgICAgIHdpbmRvdy5obHMub24od2luZG93Lkhscy5FdmVudHMuTUVESUFfQVRUQUNIRUQsZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coXCJ2aWRlbyBhbmQgd2luZG93Lmhscy5qcyBhcmUgbm93IGJvdW5kIHRvZ2V0aGVyICFcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Lmhscy5sb2FkU291cmNlKGxpbmspO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5obHMub24od2luZG93Lkhscy5FdmVudHMuTUFOSUZFU1RfUEFSU0VELCBmdW5jdGlvbihldmVudCxkYXRhKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIGZvcih2YXIgaT0wOyBpPHdpbmRvdy5obHMubGV2ZWxzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBpICsgJ1xcdGJpdHJhdGU6JyArIHdpbmRvdy5obHMubGV2ZWxzW2ldLmJpdHJhdGUgKyAnXFx0aDonICsgd2luZG93Lmhscy5sZXZlbHNbaV0uaGVpZ2h0ICsgJ1xcdHc6JyArIHdpbmRvdy5obHMubGV2ZWxzW2ldLndpZHRoICsgJ1xcbicpXHJcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAgICAgfSk7XHJcbiAgICAgICAgICAgIH0gZWxzZSB7XHJcbiAgICAgICAgICAgICAgICAkdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCBsaW5rKVxyXG4gICAgICAgICAgICAgICAgJHNvdXJjZS5zZXRBdHRyaWJ1dGUoJ3NyYycsIGxpbmspXHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgICR2aWRlby5zdHlsZS5iYWNrZ3JvdW5kU2l6ZSA9IFwiMCAwXCJcclxuICAgICAgICAgICAgJHZpZGVvLmFkZEV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZmFpbGVkKVxyXG4gICAgICAgICAgICBpZigkdmlkZW8ucGxheSkgJHZpZGVvLnBsYXkoKTtcclxuICAgICAgICAgICAgZWxzZSBhbGVydCAoJ3ZpZGVvIGNhbm5vdCBwbGF5JylcclxuICAgICAgICAgICAgY2xhc3NMaXN0LmFkZCgkc2lkZU1lbnVCb3gsICdzaG93X2Zvb3RlcicpXHJcbiAgICAgICAgfVxyXG4gICAgfVxyXG59KVxyXG5cclxuZnVuY3Rpb24gZmFpbGVkKGUpIHtcclxuICAgLy8gdmlkZW8gcGxheWJhY2sgZmFpbGVkIC0gc2hvdyBhIG1lc3NhZ2Ugc2F5aW5nIHdoeSAgICAgLSBmcm9tIGh0dHBzOi8vZGV2LnczLm9yZy9odG1sNS9zcGVjLWF1dGhvci12aWV3L3ZpZGVvLmh0bWwjdmlkZW9cclxuICAgc3dpdGNoIChlLnRhcmdldC5lcnJvci5jb2RlKSB7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfQUJPUlRFRDpcclxuICAgICAgIGFsZXJ0KCfQktC+0YHQv9GA0L7QuNC30LLQtdC00LXQvdC40LUg0LLQuNC00LXQviDQv9GA0LXRgNCy0LDQvdC+LicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfTkVUV09SSzpcclxuICAgICAgIGFsZXJ0KCfQntGI0LjQsdC60LAg0YHQtdGC0Lgg0L/RgNC40LLQtdC70LAg0Log0L3QsNGA0YPRiNC10L3QuNGOINC30LDQs9GA0YPQt9C60Lgg0LLQuNC00LXQvicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgICAgY2FzZSBlLnRhcmdldC5lcnJvci5NRURJQV9FUlJfREVDT0RFOlxyXG4gICAgICAgYWxlcnQoJ9CS0L7RgdC/0YDQvtC40LfQstC10LTQtdC90LjQtSDQstC40LTQtdC+INC/0YDQtdC60YDQsNGJ0LXQvdC+INC40Lct0LfQsCDQuNGB0LrQsNC20LXQvdC40Lkg0L/RgNC4INC/0LXRgNC10LTQsNGH0LUg0LjQu9C4INC/0L7RgtC+0LzRgywg0YfRgtC+INCy0LjQtNC10L4g0LjRgdC/0L7Qu9GM0LfRg9C10YIg0L3QtdC00L7RgdGC0YPQv9C90YvQtSDQsiDQktCw0YjQtdC8INCx0YDQsNGD0LfQtdGA0LUg0YTRg9C90LrRhtC40LguJyk7XHJcbiAgICAgICBicmVhaztcclxuICAgICBjYXNlIGUudGFyZ2V0LmVycm9yLk1FRElBX0VSUl9TUkNfTk9UX1NVUFBPUlRFRDpcclxuICAgICAgIGlmICh3aW5kb3cuSGxzICYmIHdpbmRvdy5IbHMuaXNTdXBwb3J0ZWQoKSl7XHJcbiAgICAgICAgICAgYWxlcnQoJ9CS0LjQtNC10L4g0L3QtSDQvNC+0LbQtdGCINCx0YvRgtGMINC30LDQs9GA0YPQttC10L3QviDQuNC3LdC30LAg0YHQsdC+0Y8g0LIg0LIg0LTQvtGB0YLRg9C/0LUg0Log0YHQtdGA0LLQtdGA0YMg0LjQu9C4INGN0YLQvtGCINCy0LjQtNC10L7RhNC+0YDQvNCw0YIg0L3QtSDQv9C+0LTQtNC10YDQttC40LLQsNC10YLRgdGPINCS0LDRiNC40Lwg0LHRgNCw0YPQt9C10YDQvtC8LicpO1xyXG4gICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJHZpZGVvLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2Vycm9yJywgZmFpbGVkKVxyXG4gICAgICAgICAgICBjb25zb2xlLmxvZygnaGxzIGxvYWRpbmcgc3RhcnQgJyArIERhdGUubm93KCkpXHJcbiAgICAgICAgICAgIHZhciBzY3JpcHQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwic2NyaXB0XCIpXHJcbiAgICAgICAgICAgIHNjcmlwdC50eXBlID0gXCJ0ZXh0L2phdmFzY3JpcHRcIlxyXG4gICAgICAgICAgICBpZiAoc2NyaXB0LnJlYWR5U3RhdGUpeyAgLy9JRVxyXG4gICAgICAgICAgICAgICAgc2NyaXB0Lm9ucmVhZHlzdGF0ZWNoYW5nZSA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgaWYgKHNjcmlwdC5yZWFkeVN0YXRlID09IFwibG9hZGVkXCIgfHxcclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNjcmlwdC5yZWFkeVN0YXRlID09IFwiY29tcGxldGVcIil7XHJcbiAgICAgICAgICAgICAgICAgICAgICAgIHNjcmlwdC5vbnJlYWR5c3RhdGVjaGFuZ2UgPSBudWxsO1xyXG4gICAgICAgICAgICAgICAgICAgICAgICBydW5IbHMoKVxyXG4gICAgICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgICAgIH07XHJcbiAgICAgICAgICAgIH0gZWxzZSB7ICAvL090aGVyc1xyXG4gICAgICAgICAgICAgICAgc2NyaXB0Lm9ubG9hZCA9IGZ1bmN0aW9uKCl7XHJcbiAgICAgICAgICAgICAgICAgICAgY29uc29sZS5sb2coJ2hscyBsb2FkZWQgJyArIERhdGUubm93KCkpXHJcbiAgICAgICAgICAgICAgICAgICAgcnVuSGxzKClcclxuICAgICAgICAgICAgICAgIH1cclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICBzY3JpcHQuc3JjID0gJy4vanMvaGxzLm1pbi5qcydcclxuICAgICAgICAgICAgZG9jdW1lbnQuZ2V0RWxlbWVudHNCeVRhZ05hbWUoXCJoZWFkXCIpWzBdLmFwcGVuZENoaWxkKHNjcmlwdClcclxuICAgICAgIH1cclxuICAgICAgIGJyZWFrO1xyXG4gICAgIGRlZmF1bHQ6XHJcbiAgICAgICBhbGVydCgn0J/RgNC+0LjQt9C+0YjQu9CwINC+0YjQuNCx0LrQsC4g0J/QvtC/0YDQvtCx0YPQudGC0LUg0LXRidC1LicpO1xyXG4gICAgICAgYnJlYWs7XHJcbiAgIH1cclxufVxyXG5mdW5jdGlvbiBydW5IbHMoKSB7XHJcbiAgICAkdmlkZW8uc2V0QXR0cmlidXRlKCdzcmMnLCAnJylcclxuICAgICRzb3VyY2Uuc2V0QXR0cmlidXRlKCdzcmMnLCAnJylcclxuICAgIGNvbnNvbGUubG9nKCdjYWxsaW5nIHdpbmRvdy5obHMgJyArIERhdGUubm93KCkpXHJcbiAgICB3aW5kb3cuaGxzID0gbmV3IHdpbmRvdy53aW5kb3cuSGxzKCk7XHJcbiAgICB3aW5kb3cuaGxzLmF0dGFjaE1lZGlhKHdpbmRvdy52aWV3ZXJTdGF0ZS4kdmlkZW8pO1xyXG4gICAgd2luZG93Lmhscy5vbih3aW5kb3cuSGxzLkV2ZW50cy5NRURJQV9BVFRBQ0hFRCwgZnVuY3Rpb24oKSB7XHJcbiAgICAgICAgY29uc29sZS5sb2coXCJ2aWRlbyBhbmQgd2luZG93Lmhscy5qcyBhcmUgbm93IGJvdW5kIHRvZ2V0aGVyICFcIik7XHJcbiAgICAgICAgd2luZG93Lmhscy5sb2FkU291cmNlKGxpbmspO1xyXG4gICAgICAgIHdpbmRvdy5obHMub24od2luZG93Lkhscy5FdmVudHMuTUFOSUZFU1RfUEFSU0VELCBmdW5jdGlvbihldmVudCxkYXRhKSB7XHJcbiAgICAgICAgICAgIGZvcih2YXIgaT0wOyBpPHdpbmRvdy5obHMubGV2ZWxzLmxlbmd0aDsgaSsrKXtcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKCBpICsgJ1xcdGJpdHJhdGU6JyArIHdpbmRvdy5obHMubGV2ZWxzW2ldLmJpdHJhdGUgKyAnXFx0aDonICsgd2luZG93Lmhscy5sZXZlbHNbaV0uaGVpZ2h0ICsgJ1xcdHc6JyArIHdpbmRvdy5obHMubGV2ZWxzW2ldLndpZHRoICsgJ1xcbicpXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9KVxyXG4gICAgfSk7XHJcbiAgICBpZigkdmlkZW8ucGxheSkgJHZpZGVvLnBsYXkoKTtcclxuICAgIGVsc2UgYWxlcnQgKCd2aWRlbyBjYW5ub3QgcGxheScpXHJcblxyXG4gICAgd2luZG93Lmhscy5vbih3aW5kb3cuSGxzLkV2ZW50cy5FUlJPUixmdW5jdGlvbihldmVudCxkYXRhKSB7XHJcbiAgICAgICAgaWYoZGF0YS5mYXRhbCkge1xyXG4gICAgICAgICAgICBzd2l0Y2goZGF0YS50eXBlKSB7XHJcbiAgICAgICAgICAgICAgICBjYXNlIHdpbmRvdy5IbHMuRXJyb3JUeXBlcy5ORVRXT1JLX0VSUk9SOlxyXG4gICAgICAgICAgICAgICAgLy8gdHJ5IHRvIHJlY292ZXIgbmV0d29yayBlcnJvclxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmF0YWwgbmV0d29yayBlcnJvciBlbmNvdW50ZXJlZCwgdHJ5IHRvIHJlY292ZXJcIik7XHJcbiAgICAgICAgICAgICAgICAgICAgd2luZG93Lmhscy5zdGFydExvYWQoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGNhc2Ugd2luZG93Lkhscy5FcnJvclR5cGVzLk1FRElBX0VSUk9SOlxyXG4gICAgICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKFwiZmF0YWwgbWVkaWEgZXJyb3IgZW5jb3VudGVyZWQsIHRyeSB0byByZWNvdmVyXCIpO1xyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5obHMucmVjb3Zlck1lZGlhRXJyb3IoKTtcclxuICAgICAgICAgICAgICAgICAgICBicmVhaztcclxuICAgICAgICAgICAgICAgIGRlZmF1bHQ6XHJcbiAgICAgICAgICAgICAgICAvLyBjYW5ub3QgcmVjb3ZlclxyXG4gICAgICAgICAgICAgICAgICAgIHdpbmRvdy5obHMuZGVzdHJveSgpO1xyXG4gICAgICAgICAgICAgICAgICAgIGJyZWFrO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgfVxyXG4gICAgfSlcclxufSIsIid1c2Ugc3RyaWN0J1xyXG5cclxubW9kdWxlLmV4cG9ydHMgPSB7XHJcbiAgICAnY29udGFpbnMnOiBmdW5jdGlvbihlbCwgY2xzKSB7XHJcbiAgICAgICAgaWYoZWwuY2xhc3NMaXN0KSByZXR1cm4gZWwuY2xhc3NMaXN0LmNvbnRhaW5zKGNscylcclxuICAgICAgICB2YXIgYXJyID0gZWwuZ2V0QXR0cmlidXRlKCdjbGFzcycpLnNwbGl0KCcgJylcclxuICAgICAgICBmb3IodmFyIGk9MDsgaTxhcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZihhcnJbaV0gPT0gY2xzKSByZXR1cm4gdHJ1ZVxyXG4gICAgICAgIH1cclxuICAgICAgICByZXR1cm4gZmFsc2VcclxuICAgIH0sXHJcbiAgICAnYWRkJzogZnVuY3Rpb24oZWwsIGNscykge1xyXG4gICAgICAgIGlmKGVsLmNsYXNzTGlzdCkge1xyXG4gICAgICAgICAgICBlbC5jbGFzc0xpc3QuYWRkKGNscylcclxuICAgICAgICAgICAgcmV0dXJuIFxyXG4gICAgICAgIH1cclxuICAgICAgICBpZighd2luZG93LnZpZXdlclN0YXRlLmNsYXNzTGlzdC5jb250YWlucyhlbCwgY2xzKSl7XHJcbiAgICAgICAgICAgIGVsLnNldEF0dHJpYnV0ZSgnY2xhc3MnLCBlbC5nZXRBdHRyaWJ1dGUoJ2NsYXNzJykgKyAnICcgKyBjbHMpXHJcbiAgICAgICAgfVxyXG4gICAgfSxcclxuICAgICdyZW1vdmUnOiBmdW5jdGlvbihlbCwgY2xzKSB7XHJcbiAgICAgICAgaWYoZWwuY2xhc3NMaXN0KSB7XHJcbiAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoY2xzKVxyXG4gICAgICAgICAgICByZXR1cm4gXHJcbiAgICAgICAgfSBcclxuICAgICAgICB2YXIgYXJyID0gZWwuZ2V0QXR0cmlidXRlKCdjbGFzcycpLnNwbGl0KCcgJylcclxuICAgICAgICB2YXIgcmVzID0gJydcclxuICAgICAgICBmb3IodmFyIGk9MDsgaTxhcnIubGVuZ3RoOyBpKyspe1xyXG4gICAgICAgICAgICBpZihhcnJbaV0gIT0gY2xzKSB7XHJcbiAgICAgICAgICAgICAgICByZXMgKz0gYXJyW2ldICsgJyAnXHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICAgICAgZWwuc2V0QXR0cmlidXRlKCdjbGFzcycsIHJlcylcclxuICAgIH1cclxufSIsIid1c2Ugc3RyaWN0J1xuXG52YXIgJGJveCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYm94LFxuICAgICRidG5GdWxsU2NyT24gPSB3aW5kb3cudmlld2VyU3RhdGUuJGJ0bkZ1bGxTY3JPbixcbiAgICAkYnRuRnVsbFNjck9mZiA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuRnVsbFNjck9mZixcbiAgICAkYnRuTWVudU9mZiA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kYnRuTWVudU9mZixcbiAgICAkYnRuTWVudU9uID0gd2luZG93LnZpZXdlclN0YXRlLiRidG5NZW51T24sXG4gICAgJHNpZGVNZW51Qm94ID0gd2luZG93LnZpZXdlclN0YXRlLiRzaWRlTWVudUJveCxcbiAgICAkY29udHJvbCA9IHdpbmRvdy52aWV3ZXJTdGF0ZS4kY29udHJvbCxcbiAgICAkc3ZnRnVsbFNjck9uID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmJ0bl9fZnVsbHNjci5vbicpLFxuICAgIGR1cmF0aW9uQ3RybFZpc2libGUgPSB3aW5kb3cudmlld2VyU3RhdGUuZHVyYXRpb25DdHJsVmlzaWJsZSxcbiAgICBjbGFzc0xpc3QgPSB3aW5kb3cudmlld2VyU3RhdGUuY2xhc3NMaXN0LFxuICAgIGlkID0gdW5kZWZpbmVkXG5cbmlmICggd2luZG93LnZpZXdlclN0YXRlLmlzRnVsbFNjcmVlbkFsbG93ZWQgKSB7XG4gICRidG5NZW51T2ZmLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSdcbiAgJGJ0bk1lbnVPbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICRidG5GdWxsU2NyT24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBnb0Z1bGxTY3JlZW4pXG4gICRidG5GdWxsU2NyT2ZmLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZ2V0T2ZmRnVsbHNjcmVlbilcbn0gZWxzZSBpZiAod2luZG93LnZpZXdlclN0YXRlLmlzX2lQYWRfaVBob25lICYmXG4gICAgICAgICAgICF3aW5kb3cudmlld2VyU3RhdGUuaXNfaVBhZF9pUGhvbmVfaW5GdWxsU2NyZWVuKSB7XG4gICRidG5GdWxsU2NyT24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBmdW5jdGlvbiAoKSB7XG4gICAgYWxlcnQoJ9Cn0YLQvtCx0Ysg0L7QsdGA0LXRgdGC0Lgg0L/QvtC70L3QvtGN0LrRgNCw0L3QvdGL0Lkg0YDQtdC20LjQvCDQvdCw0LTQviDRgdC00LXQu9Cw0YLRjCDQstGB0LXQs9C+INC90LXRgdC60L7Qu9GM0LrQviDRiNCw0LPQvtCyOlxcbidcbiAgICAgICAgKyAn0KjQsNCzIDEuINCd0LDQttC80LjRgtC1INC90LAg0LrQvdC+0L/QutGDIFwi0J7RgtC/0YDQsNCy0LjRgtGMXCIgKNCy0YvQs9C70Y/QtNC40YIg0LrQsNC6INC60LLQsNC00YDQsNGCINGB0L4g0YHRgtGA0LXQu9C+0YfQutC+0Lkg0LLQstC10YDRhSkg0YHQv9GA0LDQstCwINCy0LLQtdGA0YXRgyDRjdC60YDQsNC90LAg0Lgg0LLRi9Cx0LXRgNC40YLQtSDQv9GD0L3QutGCOiDQndCwINGN0LrRgNCw0L0gwqvQlNC+0LzQvtC5wrsuXFxuJ1xuICAgICAgICArICfQqNCw0LMgMi4g0KPQutCw0LbQuNGC0LUg0LbQtdC70LDQtdC80L7QtSDQvdCw0LfQstCw0L3QuNC1INC4INC90LDQttC80LjRgtC1IFwi0JTQvtCx0LDQstC40YLRjFwiLlxcbidcbiAgICAgICAgKyAn0J/QvtGB0LvQtSDQvdCw0LbQsNGC0LjRjyDQutC90L7Qv9C60LggXCLQlNC+0LHQsNCy0LjRgtGMXCIg0JLQsNGBINC/0LXRgNC10LHRgNC+0YHQuNGCINC90LAg0YDQsNCx0L7Rh9C40Lkg0YHRgtC+0LssINCz0LTQtSDQktGLINGB0LzQvtC20LXRgtC1INGD0LLQuNC00LXRgtGMINGB0LLQtdC20LXRgdC+0LfQtNCw0L3QvdGD0Y4g0YHRgdGL0LvQutGDLlxcbidcbiAgICAgICAgKyAn0JfQsNC50LTRjyDQvdCwINGB0LDQudGCINC90LDQttCw0YLQuNC10Lwg0L3QsCDRjdGC0YMg0YHRgdGL0LvQutGDINCS0Ysg0LLRgdC10LPQtNCwINCx0YPQtNC10YLQtSDRgdC80L7RgtGA0LXRgtGMINCi0JIg0LIg0L/QvtC70L3QvtGN0LrRgNCw0L3QvdC+0Lwg0YDQtdC20LjQvNC1LlxcbidcbiAgICAgICAgKyAn0JTQu9GPINGD0LTQsNC70LXQvdC40Y8g0YHRgdGL0LvQutC4INC90YPQttC90L4g0LXQtSDQvdCw0LbQsNGC0Ywg0Lgg0L/QvtC00LXRgNC20LDRgtGMLCDQt9Cw0YLQtdC8INC90LDQttCw0YLRjCDQv9C+0Y/QstC40LLRiNC40LnRgdGPINC60YDQtdGB0YLQuNC6INCyINC70LXQstC+0Lwg0LLQtdGA0YXQvdC10Lwg0YPQs9C70YMuJylcbiAgICB9KVxuICAgIGNsYXNzTGlzdC5hZGQoJHN2Z0Z1bGxTY3JPbiwgJ2Rpc2FibGVkJylcbiAgICAkYnRuRnVsbFNjck9mZi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgJGJ0bk1lbnVPZmYuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzdGFydFdhdGNoTW9kZSlcbiAgICAkYnRuTWVudU9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbGVhdmVXYXRjaE1vZGUpXG59IGVsc2UgaWYgKHdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZV9pbkZ1bGxTY3JlZW4gfHxcbiAgICAgICAgICAgIXdpbmRvdy52aWV3ZXJTdGF0ZS5pc0Z1bGxTY3JlZW5BbGxvd2VkKSB7XG4gICAgJGJ0bkZ1bGxTY3JPbi5zdHlsZS5kaXNwbGF5ID0gJ25vbmUnXG4gICAgJGJ0bkZ1bGxTY3JPZmYuc3R5bGUuZGlzcGxheSA9ICdub25lJ1xuICAgICRidG5NZW51T2ZmLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc3RhcnRXYXRjaE1vZGUpXG4gICAgJGJ0bk1lbnVPbi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGxlYXZlV2F0Y2hNb2RlKVxufVxuXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiZnVsbHNjcmVlbmNoYW5nZVwiLCBmc0hhbmRsZXIpXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwid2Via2l0ZnVsbHNjcmVlbmNoYW5nZVwiLCBmc0hhbmRsZXIpXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwibW96ZnVsbHNjcmVlbmNoYW5nZVwiLCBmc0hhbmRsZXIpXG5kb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiTVNGdWxsc2NyZWVuQ2hhbmdlXCIsIGZzSGFuZGxlcilcblxuZnVuY3Rpb24gZnNIYW5kbGVyKCkge1xuICAgIGlmKHdpbmRvdy52aWV3ZXJTdGF0ZS5hc2skYm94SW5GdWxsU2NyZWVuKCkpe1xuICAgICAgICBzdGFydFdhdGNoTW9kZSgpXG4gICAgfSBlbHNlIHtcbiAgICAgICAgbGVhdmVXYXRjaE1vZGUoKVxuICAgIH1cbn1cbmZ1bmN0aW9uIGdvRnVsbFNjcmVlbigpIHtcbiAgICBpZiAoJGJveC5yZXF1ZXN0RnVsbHNjcmVlbikge1xuICAgICAgICAkYm94LnJlcXVlc3RGdWxsc2NyZWVuKClcbiAgICB9IGVsc2UgaWYgKCRib3gubW96UmVxdWVzdEZ1bGxTY3JlZW4pIHtcbiAgICAgICAgJGJveC5tb3pSZXF1ZXN0RnVsbFNjcmVlbigpXG4gICAgfSBlbHNlIGlmICgkYm94LndlYmtpdFJlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICRib3gud2Via2l0UmVxdWVzdEZ1bGxzY3JlZW4oKVxuICAgIH0gZWxzZSBpZiAoJGJveC5tc1JlcXVlc3RGdWxsc2NyZWVuKSB7XG4gICAgICAgICRib3gubXNSZXF1ZXN0RnVsbHNjcmVlbigpXG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0T2ZmRnVsbHNjcmVlbigpIHtcbiAgaWYoZG9jdW1lbnQuZXhpdEZ1bGxzY3JlZW4pIHtcbiAgICBkb2N1bWVudC5leGl0RnVsbHNjcmVlbigpO1xuICB9IGVsc2UgaWYoZG9jdW1lbnQubW96Q2FuY2VsRnVsbFNjcmVlbikge1xuICAgIGRvY3VtZW50Lm1vekNhbmNlbEZ1bGxTY3JlZW4oKTtcbiAgfSBlbHNlIGlmKGRvY3VtZW50LndlYmtpdEV4aXRGdWxsc2NyZWVuKSB7XG4gICAgZG9jdW1lbnQud2Via2l0RXhpdEZ1bGxzY3JlZW4oKTtcbiAgfWVsc2UgaWYgKGRvY3VtZW50Lm1zRXhpdEZ1bGxzY3JlZW4pIHtcblx0ZG9jdW1lbnQubXNFeGl0RnVsbHNjcmVlbigpO1xuICB9XG59XG5mdW5jdGlvbiBzdGFydFdhdGNoTW9kZShlKSB7XG4gICAgY2xhc3NMaXN0LmFkZCgkc2lkZU1lbnVCb3gsICdoaWRlX21lbnUnKVxuICAgICRib3guYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBzY3JlZW5DbGlja0hhbmRsZXIpXG4gICAgJGNvbnRyb2wuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBjb250cm9sQ2xpY2tIYW5kbGVyKVxufVxuZnVuY3Rpb24gbGVhdmVXYXRjaE1vZGUoZSkge1xuICAgIGNsZWFyVGltZW91dChpZClcbiAgICBjbGFzc0xpc3QucmVtb3ZlKCRjb250cm9sLCAnc2hvd19jb250cm9sJylcbiAgICAkY29udHJvbC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIGNvbnRyb2xDbGlja0hhbmRsZXIpXG4gICAgJGJveC5yZW1vdmVFdmVudExpc3RlbmVyKCdjbGljaycsIHNjcmVlbkNsaWNrSGFuZGxlcilcbiAgICBjbGFzc0xpc3QucmVtb3ZlKCRzaWRlTWVudUJveCwgJ2hpZGVfbWVudScpXG59XG5mdW5jdGlvbiBzY3JlZW5DbGlja0hhbmRsZXIoZSkge1xuICAgIGUuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAkYm94LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2NyZWVuQ2xpY2tIYW5kbGVyKVxuICAgIGNsYXNzTGlzdC5hZGQoJGNvbnRyb2wsICdzaG93X2NvbnRyb2wnKVxuICAgIGlkID0gc2V0VGltZW91dCggZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRjb250cm9sLCAnc2hvd19jb250cm9sJylcbiAgICAgICAgICAgICAkYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2NyZWVuQ2xpY2tIYW5kbGVyKVxuICAgICAgICAgfSAsIGR1cmF0aW9uQ3RybFZpc2libGUpXG59XG5mdW5jdGlvbiBjb250cm9sQ2xpY2tIYW5kbGVyKGUpIHtcbiAgICBlLnN0b3BQcm9wYWdhdGlvbigpXG4gICAgY2xlYXJUaW1lb3V0KGlkKVxuICAgIGlkID0gc2V0VGltZW91dCggZnVuY3Rpb24oKXtcbiAgICAgICAgICAgICBjbGFzc0xpc3QucmVtb3ZlKCRjb250cm9sLCAnc2hvd19jb250cm9sJylcbiAgICAgICAgICAgICAkYm94LmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgc2NyZWVuQ2xpY2tIYW5kbGVyKVxuICAgICAgICAgfSAsIGR1cmF0aW9uQ3RybFZpc2libGUpXG59XG4iLCIndXNlIHN0cmljdCdcclxuXHJcbndpbmRvdy5vbmxvYWQgPSBmdW5jdGlvbiAoKSB7XHJcbiAgd2luZG93LnZpZXdlclN0YXRlID0ge1xyXG4gICAgJyRib3gnOiAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYm94JyksXHJcbiAgICAnJHZpZGVvJzogICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy52aWRlbycpLFxyXG4gICAgJyRzb3VyY2UnOiAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc291cmNlJyksXHJcbiAgICAnJHNpZGVNZW51Qm94JzogICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyJyksXHJcbiAgICAnJHNsaWRlcic6ICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zaWRlYmFyX19zbGlkZXInKSxcclxuICAgICckZm9vdGVyJzogICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3RlcicpLFxyXG4gICAgJyRjb250cm9sJzogICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbCcpLFxyXG4gICAgJyRidG5QbGF5Rm9vdGVyJzogICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyIC5idG5fcGxheScpLFxyXG4gICAgJyRidG5QbGF5Q3RybCc6ICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbCAuYnRuX3BsYXknKSxcclxuICAgICckYnRuVm9sdW1lRm9vdGVyJzogZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmZvb3RlciAuYnRuX3ZvbHVtZScpLFxyXG4gICAgJyRidG5Wb2x1bWVDdHJsJzogICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbCAuYnRuX3ZvbHVtZScpLFxyXG4gICAgJyRidG5RdWFsaXR5JzogICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuYnRuX3F1YWxpdHknKSxcclxuICAgICckYnRuU2NhbGUnOiAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLnNjYWxlX2JveF9fYnRuJyksXHJcbiAgICAnJHN1YkJ0blVwJzogICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5zY2FsZV9ib3hfX3N1YmJ0bl91cCcpLFxyXG4gICAgJyRzdWJCdG5Eb3duJzogICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuc2NhbGVfYm94X19zdWJidG5fZG93bicpLFxyXG4gICAgJyRidG5NZW51T2ZmJzogICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuZm9vdGVyIC5idG5fX21lbnVfc3dpdGNoJyksXHJcbiAgICAnJGJ0bk1lbnVPbic6ICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5jb250cm9sIC5idG5fX21lbnVfc3dpdGNoJyksXHJcbiAgICAnJGJ0bkZ1bGxTY3JPbic6ICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJy5mb290ZXIgLmJ0bl9fZnVsbHNjcicpLFxyXG4gICAgJyRidG5GdWxsU2NyT2ZmJzogICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udHJvbCAuYnRuX19mdWxsc2NyJyksXHJcbiAgICAnYWN0aXZlJGlucHV0JzogbnVsbCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBvYmplY3RcclxuICAgICdpc1ZpZGVvV29ya2luZyc6IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGJvb2xlYW5cclxuICAgICdpc0Z1bGxTY3JlZW5BbGxvd2VkJzogZmFsc2UsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGJvb2xlYW5cclxuICAgICdpc19pUGFkX2lQaG9uZSc6IC8oaVBob25lfGlQb2R8aVBhZCkuKkFwcGxlV2ViS2l0L2kudGVzdCh3aW5kb3cubmF2aWdhdG9yLnVzZXJBZ2VudCksICAgLy8gIGJvb2xlYW5cclxuICAgICdpc19pUGFkX2lQaG9uZV9pbkZ1bGxTY3JlZW4nOiBmYWxzZSwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGJvb2xlYW5cclxuICAgICdhc2skYm94SW5GdWxsU2NyZWVuJzogbnVsbCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGZ1bmN0aW9uIC0+IGJvb2xlYW5cclxuICAgICdoaWdoUXVhbGl0eSc6IGZhbHNlLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGJvb2xlYW5cclxuICAgICdkdXJhdGlvblNjYWxlU3VibWVudSc6IDQwMDAsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIG1zXHJcbiAgICAnZHVyYXRpb25DdHJsVmlzaWJsZSc6IDUwMDAsICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vICBtc1xyXG4gICAgJ2NsYXNzTGlzdCc6IHtcclxuICAgICAgICAnY29udGFpbnMnOiBudWxsLCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGZ1bmN0aW9uIC0+IGJvb2xlYW5cclxuICAgICAgICAnYWRkJzogbnVsbCwgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGZ1bmN0aW9uIC0+IHZvaWRcclxuICAgICAgICAncmVtb3ZlJzogbnVsbCAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gIGZ1bmN0aW9uIC0+IHZvaWRcclxuICAgICB9XHJcbiAgfTtcclxuXHJcbiAgd2luZG93LnZpZXdlclN0YXRlLmlzVmlkZW9Xb3JraW5nID0gcmVxdWlyZSgnLi9hc2tWaWRlb1dvcmtpbmcuanMnKVxyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZS5pc0Z1bGxTY3JlZW5BbGxvd2VkID0gcmVxdWlyZSgnLi9hc2tGdWxsU2NyZWVuLmpzJylcclxuICB3aW5kb3cudmlld2VyU3RhdGUuaXNfaVBhZF9pUGhvbmVfaW5GdWxsU2NyZWVuID0gcmVxdWlyZSgnLi9hc2tfaVBhZF9pUGhvbmVfRnVsbFNjcmVlbi5qcycpXHJcbiAgd2luZG93LnZpZXdlclN0YXRlLmFzayRib3hJbkZ1bGxTY3JlZW4gPSByZXF1aXJlKCcuL2FzayRib3hJbkZ1bGxTY3JlZW4uanMnKVxyXG4gIHdpbmRvdy52aWV3ZXJTdGF0ZS5jbGFzc0xpc3QgPSByZXF1aXJlKCcuL2NsYXNzTGlzdC5qcycpXHJcbiAgICBcclxuICByZXF1aXJlKCcuL3NjcmVlbkhlaWdodC5qcycpXHJcbiAgLy8gICAgSW5pdCBjb21wbGV0ZWRcclxuICByZXF1aXJlKCcuL2NoYW5uZWxTZWxlY3Rvci5qcycpXHJcbiAgcmVxdWlyZSgnLi9mdWxsc2NyZWVuT3JIaWRlTWVudS5qcycpXHJcbiAgcmVxdWlyZSgnLi9idXR0b25RdWFsaXR5LmpzJylcclxuICByZXF1aXJlKCcuL2J1dHRvblNjYWxlLmpzJylcclxuICByZXF1aXJlKCcuL2J1dHRvblBsYXlQYXVzZS5qcycpXHJcbiAgaWYoIXdpbmRvdy52aWV3ZXJTdGF0ZS5pc19pUGFkX2lQaG9uZSkgcmVxdWlyZSgnLi9idXR0b25Wb2x1bWUuanMnKVxyXG59IiwiJ3VzZSBzdHJpY3QnXHJcblxyXG5zZXRGb250U2l6ZSgpXHJcbndpbmRvdy5hZGRFdmVudExpc3RlbmVyKCdyZXNpemUnLCBzZXRGb250U2l6ZSlcclxuZnVuY3Rpb24gc2V0Rm9udFNpemUoKSB7XHJcbiAgICB2YXIgZm9udFNpemUgPSBkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCAvIDIwXHJcbiAgICBpZihkb2N1bWVudC5ib2R5LmNsaWVudEhlaWdodCA+IGRvY3VtZW50LmJvZHkuY2xpZW50V2lkdGgpIHtcclxuICAgICAgICBkb2N1bWVudC5ib2R5LnN0eWxlLmZvbnRTaXplID0gMC40ICogZm9udFNpemUgKyAncHgnXHJcbiAgICB9IGVsc2Uge1xyXG4gICAgICAgIGRvY3VtZW50LmJvZHkuc3R5bGUuZm9udFNpemUgPSBmb250U2l6ZSArICdweCdcclxuICAgIH1cclxufSJdfQ==
