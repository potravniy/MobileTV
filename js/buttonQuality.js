'use strict'

var $btnQuality = window.viewerState.$btnQuality,
    $svgQuality = document.querySelector('.btn_quality__icon'),
    $video = window.viewerState.$video,
    $source = window.viewerState.$source,
    $btnMenuOn = window.viewerState.$btnMenuOn,
    classList = window.viewerState.classList,
    link = ''

styleQualityButton()

$btnQuality.addEventListener('click', toggleQuality)
document.addEventListener("fullscreenchange", exitFullScreen)
document.addEventListener("webkitfullscreenchange", exitFullScreen)
document.addEventListener("mozfullscreenchange", exitFullScreen)
document.addEventListener("MSFullscreenChange", exitFullScreen)
$btnMenuOn.addEventListener('click', lowerQuality)

function toggleQuality(){
    if (window.viewerState.active$input) {
        if (window.viewerState.highQuality) {
            lowerQuality()
        } else {
            window.viewerState.highQuality = true
            link = window.viewerState.active$input.getAttribute('data-link-hq')
            $video.setAttribute('src', link)
            $source.setAttribute('src', link)
            $video.play()
        }
        styleQualityButton()
    }
}
function exitFullScreen() {
    if(!window.viewerState.ask$boxInFullScreen()){
        lowerQuality()
    }
}
function lowerQuality() {
    window.viewerState.highQuality = false
    link = window.viewerState.active$input.getAttribute('data-link-lq')
    $video.setAttribute('src', link)
    $source.setAttribute('src', link)
    $video.play()
}
function styleQualityButton() {
    if (window.viewerState.highQuality) {
        classList.remove($svgQuality, 'disabled')
    } else {
        classList.add($svgQuality, 'disabled')
    }
}