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
