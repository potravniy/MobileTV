'use strict'

var $sideMenuBox = window.viewerState.$sideMenuBox
var $footer = window.viewerState.$footer
var duration = 500 //  ms

window.viewerState.$sideMenuBox.hide = function () {
    if(!window.viewerState.is$sideMenuBoxHidden) return
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
            $sideMenuBox.object.style.right = '5em'
            startTime = undefined
            window.viewerState.is$sideMenuBoxHidden = true
        }
    }
}

window.viewerState.$sideMenuBox.show = function () {
    if(window.viewerState.is$sideMenuBoxHidden) return
    var startTime = undefined
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
            $sideMenuBox.object.style.right = ''
            startTime = undefined
            window.viewerState.is$sideMenuBoxHidden = false
        }
    }
}

window.viewerState.$footer.hide = function () {
    if(!window.viewerState.is$footerHidden) return
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
    if(window.viewerState.is$footerHidden) return
    var startTime = undefined
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
            $footer.object.style.bottom = ''
            startTime = undefined
            window.viewerState.is$footerHidden = false
        }
    }
}
