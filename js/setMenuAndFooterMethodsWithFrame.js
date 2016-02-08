'use strict'

var $sideMenuBox = window.viewerState.$sideMenuBox
var $footer = window.viewerState.$footer
var duration = window.viewerState.duration

window.viewerState.$sideMenuBox.hide = function () {
    var startTime = undefined
    requestAnimationFrame(hide)
    function hide(timeStamp) {
        if (!startTime) startTime = timeStamp
        var progress = (timeStamp - startTime) / duration
        if (progress <= 1) {
            $sideMenuBox.object.style.opacity = 1 - progress
            requestAnimationFrame(hide)
        } else {
            $sideMenuBox.object.style.opacity = 0
            $sideMenuBox.object.style.right = '-5em'
            startTime = undefined
            window.viewerState.is$sideMenuBoxHidden = true
        }
    }
}

window.viewerState.$sideMenuBox.show = function () {
    var startTime = undefined
    $sideMenuBox.object.style.right = ''
    requestAnimationFrame(show)
    function show(timeStamp) {
        if (!startTime) startTime = timeStamp
        var progress = (timeStamp - startTime) / duration
        if (progress <= 1) {
            $sideMenuBox.object.style.opacity = progress
            requestAnimationFrame(show)
        } else {
            $sideMenuBox.object.style.opacity = 1
            startTime = undefined
            window.viewerState.is$sideMenuBoxHidden = false
        }
    }
}

window.viewerState.$footer.hide = function () {
    var startTime = undefined
    requestAnimationFrame(hide)
    function hide(timeStamp) {
        if (!startTime) startTime = timeStamp
        var progress = (timeStamp - startTime) / duration
        if (progress <= 1) {
            $footer.object.style.opacity = 1 - progress
            requestAnimationFrame(hide)
        } else {
            $footer.object.style.opacity = 0
            $footer.object.style.bottom = '-10%'
            startTime = undefined
            window.viewerState.is$footerHidden = true
        }
    }
}

window.viewerState.$footer.show = function () {
    var startTime = undefined
    $footer.object.style.bottom = ''
    requestAnimationFrame(show)
    function show(timeStamp) {
        if (!startTime) startTime = timeStamp
        var progress = (timeStamp - startTime) / duration
        if (progress <= 1) {
            $footer.object.style.opacity = progress
            requestAnimationFrame(show)
        } else {
            $footer.object.style.opacity = 1
            startTime = undefined
            window.viewerState.is$footerHidden = false
        }
    }
}
