'use strict'

var $btnQuality = window.viewerState.$btnQuality,
    $svgQuality = document.querySelector('.btn_quality__icon'),
    $video = window.viewerState.$video,
    $source = window.viewerState.$source,
    classList = window.viewerState.classList,
    link = ''

styleQualityButton()

$btnQuality.addEventListener('click', function(){
    if (window.viewerState.active$input) {
        if (window.viewerState.highQuality) {
            window.viewerState.highQuality = false
            link = window.viewerState.active$input.getAttribute('data-link-lq')
            $video.setAttribute('src', link)
            $source.setAttribute('src', link)
            $video.play()
        } else {
            window.viewerState.highQuality = true
            link = window.viewerState.active$input.getAttribute('data-link-hq')
            $video.setAttribute('src', link)
            $source.setAttribute('src', link)
            $video.play()
        }
        styleQualityButton()
    }
})

document.addEventListener("fullscreenchange", styleQualityButton)
document.addEventListener("webkitfullscreenchange", styleQualityButton)
document.addEventListener("mozfullscreenchange", styleQualityButton)
document.addEventListener("MSFullscreenChange", styleQualityButton)

function styleQualityButton() {
    if (window.viewerState.highQuality) {
        classList.remove($svgQuality, 'disabled')
    } else {
        classList.add($svgQuality, 'disabled')
    }
}