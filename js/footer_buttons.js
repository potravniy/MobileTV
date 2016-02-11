'use strict'

//          Help
var $help = document.querySelector('.help')
var $video = window.viewerState.$video
var $box = window.viewerState.$box

var $btnHelp = window.viewerState.$btnHelp
$btnHelp.addEventListener('click', function(){
    if($help.classList.contains("active")) {
        $help.classList.remove("active")
    } else {
        $help.classList.add("active")
    }
})

//          Play / Pause
var $btnPlayPause = window.viewerState.$btnPlay
var $svgPlay = document.querySelector('.play')
var $svgPause = document.querySelector('.pause')
if ($video.paused){
    $svgPlay.classList.add("active")
} else {
    $svgPause.classList.add("active")
} 
$btnPlayPause.addEventListener('click', function(){
    if ($video.paused) $video.play() 
    else $video.pause()
})
$video.addEventListener('play', function(){
        $svgPause.classList.add("active")
        $svgPlay.classList.remove("active")
})
$video.addEventListener('pause', function(){
        $svgPlay.classList.add("active")
        $svgPause.classList.remove("active")
})

//          Volume
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

//          Quality
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

