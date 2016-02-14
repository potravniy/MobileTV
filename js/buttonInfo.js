'use strict'

var $help = document.querySelector('.help')
var $video = window.viewerState.$video
var $box = window.viewerState.$box
var $btnHelp = window.viewerState.$btnHelp
var classList = window.viewerState.classList

$btnHelp.addEventListener('click', function(){
    if(classList.contains($help, "active")) {
        classList.remove($help, "active")
    } else {
        classList.add($help, "active")
    }
})