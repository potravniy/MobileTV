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
    if ($video.requestFullscreen) {
      $video.requestFullscreen()
    } else if ($video.requestFullScreen) {
      $video.requestFullScreen()
    } else if ($video.webkitRequestFullscreen) {
      $video.webkitRequestFullscreen()
    } else if ($video.webkitRequestFullScreen) {
      $video.webkitRequestFullScreen()
    } else if ($video.mozRequestFullScreen) {
      $video.mozRequestFullScreen()
    } else if ($video.mozRequestFullscreen) {
      $video.mozRequestFullscreen()
    } else if ($video.msRequestFullscreen) {
      $video.msRequestFullscreen()
    }
  })
} else $btn.style.display = 'none'

document.addEventListener('fullscreenchange', hideShowControls)
document.addEventListener('webkitfullscreenchange', hideShowControls)
document.addEventListener('mozfullscreenchange', hideShowControls)
document.addEventListener('MSFullscreenChange', hideShowControls)

function hideShowControls () {
  if (
    document.fullscreenElement === $video ||
    document.webkitFullscreenElement === $video ||
    document.mozFullScreenElement === $video ||
    document.msFullscreenElement === $video
  ) {
    $video.controls = true
  } else {
    $video.controls = false
  }
}