'use strict'

var $btnVolume = window.viewerState.$btnVolume
var $svgVolumeOn = document.querySelector('.volume_on')
var $svgVolumeOff = document.querySelector('.volume_off')
$btnVolume.addEventListener('click', function(){
    if ($video.muted){
        $video.muted = false 
        $svgVolumeOn.classList.add("active")
        $svgVolumeOff.classList.remove("active")
    } else {
        $video.muted = true
        $svgVolumeOn.classList.remove("active")
        $svgVolumeOff.classList.add("active")
    } 
})
