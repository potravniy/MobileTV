'use strict'

var $btnQuality = window.viewerState.$btnQuality
var $svgQuality = document.querySelector('.footer__left__quality svg')
var link = ''
if (window.viewerState.highQuality) {
  $svgQuality.classList.remove('off')
} else {
  $svgQuality.classList.add('off')
}
$btnQuality.addEventListener('click', function(){
    if (window.viewerState.highQuality) {
        window.viewerState.highQuality = false
        $svgQuality.classList.add('off')
        if (window.viewerState.active$input) {
            link = window.viewerState.active$input.getAttribute('data-link-lq')
            window.viewerState.$video.setAttribute('src', link)
            window.viewerState.$source.setAttribute('src', link)
            window.viewerState.$video.play()
        }
    } else {
        window.viewerState.highQuality = true
        $svgQuality.classList.remove('off')
        if (window.viewerState.active$input) {
            link = window.viewerState.active$input.getAttribute('data-link-hq')
            window.viewerState.$video.setAttribute('src', link)
            window.viewerState.$source.setAttribute('src', link)
            window.viewerState.$video.play()
        }
    }
})
