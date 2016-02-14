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
