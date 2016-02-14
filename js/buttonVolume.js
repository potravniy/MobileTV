'use strict'

var $video = window.viewerState.$video
var $btnVolume = window.viewerState.$btnVolume
var $svgVolumeOn = document.querySelector('.volume_on')
var $svgVolumeOff = document.querySelector('.volume_off')
var classList = window.viewerState.classList

$btnVolume.style.display = 'inline-block'

$btnVolume.addEventListener('click', function(){
    if ($video.muted){
        $video.muted = false
        $video.volume = 1.0
        classList.add($svgVolumeOn, "active")
        classList.remove($svgVolumeOff, "active")
    } else {
        $video.volume = 0.0
        $video.muted = true
        classList.remove($svgVolumeOn, "active")
        classList.add($svgVolumeOff, "active")
    } 
})
