'use strict'

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