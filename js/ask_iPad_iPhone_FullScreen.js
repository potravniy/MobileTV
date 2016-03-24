'use strict'

module.exports = (function() {
    var userAgent = window.navigator.userAgent.toLowerCase()
    var safari = /safari/.test( userAgent )
    if(window.viewerState.is_iPad_iPhone && window.innerHeight >= window.screen.availHeight) {
        return true
    } else if (window.viewerState.is_iPad_iPhone && !safari) {
        //   Phonegap
        return true
    } else return false
})()
