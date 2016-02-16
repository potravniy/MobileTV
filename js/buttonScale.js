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
