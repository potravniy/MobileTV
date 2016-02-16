'use strict'

var $help = document.querySelector('.help'),
    $video = window.viewerState.$video,
    $box = window.viewerState.$box,
    $btnHelp = window.viewerState.$btnHelp,
    classList = window.viewerState.classList

$btnHelp.addEventListener('click', function(){
    if(classList.contains($help, "active")) {
        classList.remove($help, "active")
    } else {
        classList.add($help, "active")
    }
})