"use strict"

var $btn = document.querySelector(".footer__btns__align")
var $signVertical = document.querySelector("[title = fit_vertical]")
var $signHorisontal = document.querySelector("[title = fit_horisontal]")

if($signVertical.classList.contains("active")) {
    window.viewerState.alignVertical = true;
} else if($signHorisontal.classList.contains("active")) {
    window.viewerState.alignVertical = false;
} else {
    $signHorisontal.classList.add("active")
    window.viewerState.alignVertical = false;
}

$btn.addEventListener("click", toggleAlign)

function toggleAlign(event) {
    event.stopPropagation()
    if(window.viewerState.alignVertical) {
        $signVertical.classList.remove("active")
        $signHorisontal.classList.add("active")
        window.viewerState.alignVertical = false;
    } else {
        $signHorisontal.classList.remove("active")
        $signVertical.classList.add("active")
        window.viewerState.alignVertical = true;
    }
}