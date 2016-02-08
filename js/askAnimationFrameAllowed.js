'use strict'

module.exports = (function () {
    var allowed
    if(typeof requestAnimationFrame  === 'function') {
        allowed = true
        console.log('requestAnimationFrame ok')
    } else {
        allowed = false
        console.log('no requestAnimationFrame')
    }
    return allowed
})()
