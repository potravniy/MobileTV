'use strict'

// var $btn = document.querySelector('.footer__btns__fullscr')
var $video = window.viewerState.$video
test()
function test() {
    if ($video.requestFullscreen) {
      alert('requestFullscreen()')
    } else if ($video.requestFullScreen) {
      alert('requestFullScreen()')
    } else if ($video.webkitRequestFullscreen) {
      alert('webkitRequestFullscreen()')
    } else if ($video.webkitRequestFullScreen) {
      alert('webkitRequestFullScreen()')
    } else if ($video.mozRequestFullScreen) {
      alert('mozRequestFullScreen()')
    } else if ($video.mozRequestFullscreen) {
      alert('mozRequestFullscreen()')
    } else if ($video.msRequestFullscreen) {
      alert('msRequestFullscreen()')
    } else if ($video.webkitSupportsFullscreen) {
      alert('Safari!!! webkitSupportsFullscreen()')
    }
     else alert('No fullscreen')
}


// if (
//   document.fullscreenEnabled ||
//   document.webkitFullscreenEnabled ||
//   document.mozFullScreenEnabled ||
//   document.msFullscreenEnabled
// ) {
//   $btn.addEventListener('click', function () {
//     if ($video.requestFullscreen) {
//       $video.requestFullscreen()
//     } else if ($video.requestFullScreen) {
//       $video.requestFullScreen()
//     } else if ($video.webkitRequestFullscreen) {
//       $video.webkitRequestFullscreen()
//     } else if ($video.webkitRequestFullScreen) {
//       $video.webkitRequestFullScreen()
//     } else if ($video.mozRequestFullScreen) {
//       $video.mozRequestFullScreen()
//     } else if ($video.mozRequestFullscreen) {
//       $video.mozRequestFullscreen()
//     } else if ($video.msRequestFullscreen) {
//       $video.msRequestFullscreen()
//     }
//     console.log('Fullscreen allawed')
//   })
// } console.log('No fullscreen')      //else $btn.style.display = 'none'


// document.addEventListener('fullscreenchange', hideShowControls)
// document.addEventListener('webkitfullscreenchange', hideShowControls)
// document.addEventListener('mozfullscreenchange', hideShowControls)
// document.addEventListener('MSFullscreenChange', hideShowControls)

// function hideShowControls () {
//   if (
//     document.fullscreenElement === $video ||
//     document.webkitFullscreenElement === $video ||
//     document.mozFullScreenElement === $video ||
//     document.msFullscreenElement === $video
//   ) {
//     $video.controls = true
//   } else {
//     $video.controls = false
//   }
// }