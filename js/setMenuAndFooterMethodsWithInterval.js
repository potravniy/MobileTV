'use strict'

var $sideMenuBox = window.viewerState.$sideMenuBox
var $footer = window.viewerState.$footer
var duration = window.viewerState.duration

window.viewerState.$sideMenuBox.hide = function () {
    var startTime = undefined
    var id = setInterval(hide, 40)
    function hide() {
        if (!startTime) startTime = Date.now()
        var progress = (Date.now() - startTime) / duration
        if (progress <= 1) {
            $sideMenuBox.object.style.opacity = 1 - progress
        } else {
            clearInterval(id)
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
    var id = setInterval(show, 40)
    function show() {
        if (!startTime) startTime = Date.now()
        var progress = (Date.now() - startTime) / duration
        if (progress <= 1) {
            $sideMenuBox.object.style.opacity = progress
            requestAnimationFrame(show)
        } else {
            clearInterval(id)
            $sideMenuBox.object.style.opacity = 1
            startTime = undefined
            window.viewerState.is$sideMenuBoxHidden = false
        }
    }
}

window.viewerState.$footer.hide = function () {
    var startTime = undefined
    var id = setInterval(hide, 40)
    function hide() {
        if (!startTime) startTime = Date.now()
        var progress = (Date.now() - startTime) / duration
        if (progress <= 1) {
            $footer.object.style.opacity = 1 - progress
            requestAnimationFrame(hide)
        } else {
            clearInterval(id)
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
    var id = setInterval(show, 40)
    function show() {
        if (!startTime) startTime = Date.now()
        var progress = (Date.now() - startTime) / duration
        if (progress <= 1) {
            $footer.object.style.opacity = progress
            requestAnimationFrame(show)
        } else {
            clearInterval(id)
            $footer.object.style.opacity = 1
            startTime = undefined
            window.viewerState.is$footerHidden = false
        }
    }
}
