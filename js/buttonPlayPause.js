'use strict'

var $video = window.viewerState.$video
var $btnPlayPause = window.viewerState.$btnPlay
var $svgPlay = document.querySelector('.play')
var $svgPause = document.querySelector('.pause')
var classList = window.viewerState.classList

if ($video.paused){
    classList.add($svgPlay, "active")
} else {
    classList.add($svgPause, "active")
} 
$btnPlayPause.addEventListener('click', function(){
    if ($video.paused) $video.play() 
    else $video.pause()
})
$video.addEventListener('play', function(){
        classList.add($svgPause, "active")
        classList.remove($svgPlay, "active")
})
$video.addEventListener('pause', function(){
        classList.add($svgPlay, "active")
        classList.remove($svgPause, "active")
})
$video.addEventListener('click', function(e){
        e.preventDefault()
})
