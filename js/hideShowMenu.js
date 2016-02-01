'use strict'

var $video = window.viewerState.$video
var $navBox = document.querySelector('.sidebar')
var $slider = document.querySelector('.sidebar__slider')
var startTime = undefined
var duration = 1500 //  ms

document.addEventListener('fullscreenchange', hideShowMenu)
document.addEventListener('webkitfullscreenchange', hideShowMenu)
document.addEventListener('mozfullscreenchange', hideShowMenu)
document.addEventListener('MSFullscreenChange', hideShowMenu)

function hideShowMenu () {
  if (
    document.fullscreenElement === $video ||
    document.webkitFullscreenElement === $video ||
    document.mozFullScreenElement === $video ||
    document.msFullscreenElement === $video
  ) {
    requestAnimationFrame(showMenu)
  } else {
    requestAnimationFrame(hideMenu)
  }
}
function hideMenu (timeStamp) {
  if (!startTime) startTime = timeStamp
  var progress = (timeStamp - startTime) / duration
  if (progress <= 1) {
    $navBox.style.height = 90 + 10 * progress + '%'
    $slider.style.right = -200 * progress + 'px'
    requestAnimationFrame(hideMenu)
  } else {
    $navBox.style.height = 100 + '%'
    $slider.style.right = -200 + 'px'
    startTime = undefined
  }
}
function showMenu (timeStamp) {
  if (!startTime) startTime = timeStamp
  var progress = (timeStamp - startTime) / duration
  if (progress <= 1) {
    $navBox.style.height = 100 - 10 * progress + '%'
    $slider.style.right = -200 + 200 * progress + 'px'
    requestAnimationFrame(showMenu)
  } else {
    $navBox.style.height = 90 + '%'
    $slider.style.right = 0
    startTime = undefined
  }
}
