'use strict'

module.exports = (function () {
    var working
    if(typeof window.viewerState.$video.play === 'function' ) {
        working = true
        console.log('video ok maybe!!!')
    } else {
        working = false
        console.log('no video')
    }
    return working
})()
