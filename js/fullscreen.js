'use strict'

var $btn = document.querySelector('.footer__btns__fullscr')
var $video = window.viewerState.$video
if (
  document.fullscreenEnabled ||
  document.webkitFullscreenEnabled ||
  document.mozFullScreenEnabled ||
  document.msFullscreenEnabled
) {
  $btn.addEventListener('click', function () {
      var a=5
    if ($video.requestFullscreen) {
      $video.requestFullscreen()
    } else if ($video.webkitRequestFullscreen) {
      $video.webkitRequestFullscreen()
    } else if ($video.mozRequestFullScreen) {
      $video.mozRequestFullScreen()
    } else if ($video.msRequestFullscreen) {
      $video.msRequestFullscreen()
    }
  })
}// else $btn.style.display = 'none'
