'use strict'

var $btnQuality = window.viewerState.$btnQuality,
    $svgQuality = document.querySelector('.btn_quality__icon'),
    highQuality = window.viewerState.highQuality,
    active$input = window.viewerState.active$input,
    $video = window.viewerState.$video,
    $source = window.viewerState.$source,
    classList = window.viewerState.classList,
    link = ''

styleQualityButton()

$btnQuality.addEventListener('click', function(){
    if (active$input) {
        if (highQuality) {
            highQuality = false
            link = active$input.getAttribute('data-link-lq')
            $video.setAttribute('src', link)
            $source.setAttribute('src', link)
            $video.play()
        } else {
            highQuality = true
            link = active$input.getAttribute('data-link-hq')
            $video.setAttribute('src', link)
            $source.setAttribute('src', link)
            $video.play()
        }
        styleQualityButton()
    }
})

function styleQualityButton() {
    if (highQuality) {
        classList.remove($svgQuality, 'disabled')
    } else {
        classList.add($svgQuality, 'disabled')
    }
}