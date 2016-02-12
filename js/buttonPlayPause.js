'use strict'

var $video = window.viewerState.$video
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
