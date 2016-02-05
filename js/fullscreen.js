'use strict'

var $btnFullScr = window.viewerState.$btnFullScr
var $box = window.viewerState.$box
//test()
function test() {
    if ($box.requestFullscreen) {
      alert('requestFullscreen()')
    } else if ($box.requestFullScreen) {
      alert('requestFullScreen()')
    } else if ($box.webkitRequestFullscreen) {
      alert('webkitRequestFullscreen()')
    } else if ($box.webkitRequestFullScreen) {
      alert('webkitRequestFullScreen()')
    } else if ($box.mozRequestFullScreen) {
      alert('mozRequestFullScreen()')
    } else if ($box.mozRequestFullscreen) {
      alert('mozRequestFullscreen()')
    } else if ($box.msRequestFullscreen) {
      alert('msRequestFullscreen()')
    } else if ($box.webkitSupportsFullscreen) {
      alert('Safari!!! webkitSupportsFullscreen()')
    }
     else alert('No fullscreen')
}


if (
  $box.requestFullscreen ||
  $box.requestFullScreen ||
  $box.webkitRequestFullscreen ||
  $box.webkitRequestFullScreen ||
  $box.mozRequestFullScreen ||
  $box.mozRequestFullscreen ||
  $box.msRequestFullscreen
) {
  $btnFullScr.addEventListener('click', function () {
    if ($box.requestFullscreen) {
      $box.requestFullscreen()
    } else if ($box.requestFullScreen) {
      $box.requestFullScreen()
    } else if ($box.webkitRequestFullscreen) {
      $box.webkitRequestFullscreen()
    } else if ($box.webkitRequestFullScreen) {
      $box.webkitRequestFullScreen()
    } else if ($box.mozRequestFullScreen) {
      $box.mozRequestFullScreen()
    } else if ($box.mozRequestFullscreen) {
      $box.mozRequestFullscreen()
    } else if ($box.msRequestFullscreen) {
      $box.msRequestFullscreen()
    } else console.log('No fullscreen available')
  })
}       //else $btn.style.display = 'none'


document.addEventListener('fullscreenchange', hideShowControls)
document.addEventListener('webkitfullscreenchange', hideShowControls)
document.addEventListener('mozfullscreenchange', hideShowControls)
document.addEventListener('MSFullscreenChange', hideShowControls)

function hideShowControls () {
  if (
    document.fullscreenElement === $box ||
    document.webkitFullscreenElement === $box ||
    document.mozFullScreenElement === $box ||
    document.msFullscreenElement === $box
  ) {
    alert('Fullscreen on')
  } else {
    alert('Fullscreen off')
  }
}