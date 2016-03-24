'use strict'

var $box = window.viewerState.$box,
    $btnFullScrOn = window.viewerState.$btnFullScrOn,
    $btnFullScrOff = window.viewerState.$btnFullScrOff,
    $btnMenuOff = window.viewerState.$btnMenuOff,
    $btnMenuOn = window.viewerState.$btnMenuOn,
    $box = window.viewerState.$box,
    $control = window.viewerState.$control,
    $body = document.querySelector('body'),
    $svgFullScrOn = document.querySelector('.btn__fullscr.on'),
    durationCtrlVisible = window.viewerState.durationCtrlVisible,
    classList = window.viewerState.classList,
    is$bodyHeightChanged = false,
    id = undefined

if ( window.viewerState.isFullScreenAllowed ) {
  $btnMenuOff.style.display = 'none'
  $btnMenuOn.style.display = 'none'
  $btnFullScrOn.addEventListener('click', goFullScreen)
  $btnFullScrOff.addEventListener('click', getOffFullscreen)
} else if (window.viewerState.is_iPad_iPhone &&
           !window.viewerState.is_iPad_iPhone_inFullScreen) {
  $btnFullScrOn.addEventListener('click', function () {
    alert('Чтобы обрести полноэкранный режим надо сделать всего несколько шагов:\n'
        + 'Шаг 1. Нажмите на кнопку "Отправить" (выглядит как квадрат со стрелочкой вверх) справа вверху экрана и выберите пункт: На экран «Домой».\n'
        + 'Шаг 2. Укажите желаемое название (например "Одесское ТВ") и нажмите "Добавить".\n'
        + 'После нажатия кнопки "Добавить" Вас перебросит на рабочий стол, где Вы сможете увидеть свежесозданную ссылку.\n'
        + 'Зайдя на сайт нажатием на эту ссылку Вы всегда будете смотреть ТВ в полноэкранном режиме.\n'
        + 'Для удаления ссылки нужно ее нажать и подержать, затем нажать появившийся крестик в левом верхнем углу.')
    })
    classList.add($svgFullScrOn, 'disabled')
    $btnFullScrOff.style.display = 'none'
    $btnMenuOff.addEventListener('click', startWatchMode)
    $btnMenuOn.addEventListener('click', leaveWatchMode)
} else if (window.viewerState.is_iPad_iPhone_inFullScreen ||
           !window.viewerState.isFullScreenAllowed) {
    $btnFullScrOn.style.display = 'none'
    $btnFullScrOff.style.display = 'none'
    $btnMenuOff.addEventListener('click', startWatchMode)
    $btnMenuOn.addEventListener('click', leaveWatchMode)
}

document.addEventListener("fullscreenchange",       fsHandler)
document.addEventListener("webkitfullscreenchange", fsHandler)
document.addEventListener("mozfullscreenchange",    fsHandler)
document.addEventListener("MSFullscreenChange",     fsHandler)

function fsHandler() {
    if (window.viewerState.ask$boxInFullScreen()) {
        if($body.clientHeight < window.screen.availHeight){
            $body.style.height = window.screen.availHeight + 'px'
            is$bodyHeightChanged = true
        }
        startWatchMode()
    } else {
        if(is$bodyHeightChanged){
            $body.style.height = ''
            is$bodyHeightChanged = false
        }
        leaveWatchMode()
    }
}
function goFullScreen() {
         if ($box.requestFullscreen)        $box.requestFullscreen()
    else if ($box.mozRequestFullScreen)     $box.mozRequestFullScreen()
    else if ($box.webkitRequestFullscreen)  $box.webkitRequestFullscreen()
    else if ($box.msRequestFullscreen)      $box.msRequestFullscreen()
}
function getOffFullscreen() {
       if (document.exitFullscreen)         document.exitFullscreen()
  else if (document.mozCancelFullScreen)    document.mozCancelFullScreen()
  else if (document.webkitExitFullscreen)   document.webkitExitFullscreen()
  else if (document.msExitFullscreen)       document.msExitFullscreen()
}
function startWatchMode(e) {
    classList.add($box, 'hide_menu')
    $box.addEventListener('click', screenClickHandler)
    $control.addEventListener('click', controlClickHandler)
}
function leaveWatchMode(e) {
    clearTimeout(id)
    classList.remove($control, 'show_control')
    $control.removeEventListener('click', controlClickHandler)
    $box.removeEventListener('click', screenClickHandler)
    classList.remove($box, 'hide_menu')
}
function screenClickHandler(e) {
    e.stopPropagation()
    $box.removeEventListener('click', screenClickHandler)
    classList.add($control, 'show_control')
    id = setTimeout( function(){
             classList.remove($control, 'show_control')
             $box.addEventListener('click', screenClickHandler)
         } , durationCtrlVisible)
}
function controlClickHandler(e) {
    e.stopPropagation()
    clearTimeout(id)
    id = setTimeout( function(){
             classList.remove($control, 'show_control')
             $box.addEventListener('click', screenClickHandler)
         } , durationCtrlVisible)
}
