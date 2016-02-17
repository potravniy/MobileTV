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
