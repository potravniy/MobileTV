'use strict'

var $box = window.viewerState.$box
var $btnFullScr = window.viewerState.$btnFullScr
var $svgFullScrOn = document.querySelector('.fullscr_on')
var $svgFullScrOff = document.querySelector('.fullscr_off')
var $btnMenuOff = window.viewerState.$btnMenuOff
var $sideMenuBox = window.viewerState.$sideMenuBox
var $footer = window.viewerState.$footer
var $footer__center = document.querySelector('.footer__center') 
var durationFooterAsCtrl = window.viewerState.durationFooterAsCtrl
var classList = window.viewerState.classList
var id = undefined

if ( window.viewerState.isFullScreenAllowed ) {
  $btnMenuOff.style.display = 'none'
  $btnFullScr.addEventListener('click', function (e) {
      btnHandler(e)
      if(window.viewerState.ask$boxInFullScreen()) {
          getOffFullscreen()
      } else {
          goFullScreen()
      }
  })
} else if (window.viewerState.is_iPad_iPhone &&
           !window.viewerState.is_iPad_iPhone_inFullScreen) {
  $btnFullScr.addEventListener('click', function () {
    alert('Чтобы обрести полноэкранный режим надо сделать всего несколько шагов:\n'
        + 'Шаг 1. Нажмите на кнопку "Отправить" (выглядит как квадрат со стрелочкой вверх) справа вверху экрана и выберите пункт: На экран «Домой».\n'
        + 'Шаг 2. Укажите желаемое название и нажмите "Добавить".\n'
        + 'После нажатия кнопки "Добавить" Вас перебросит на рабочий стол, где Вы сможете увидеть свежесозданную ссылку.\n'
        + 'Зайдя на сайт нажатием на эту ссылку Вы всегда будете смотреть ТВ в полноэкранном режиме.\n'
        + 'Для удаления ссылки нужно ее нажать и подержать, затем нажать крестик в левом верхнем углу.')
    })
    classList.add($svgFullScrOn, 'off')
    $btnMenuOff.addEventListener('click', btnHandler)
} else if (window.viewerState.is_iPad_iPhone_inFullScreen ||
           !window.viewerState.isFullScreenAllowed) {
    $btnFullScr.style.display = 'none'
    $btnMenuOff.addEventListener('click', btnHandler)
}

function goFullScreen() {
    classList.add($svgFullScrOff, 'active')
    classList.remove($svgFullScrOn, 'active')
    if ($box.requestFullscreen) {
        $box.requestFullscreen()
    } else if ($box.mozRequestFullScreen) {
        $box.mozRequestFullScreen()
    } else if ($box.webkitRequestFullscreen) {
        $box.webkitRequestFullscreen()
    } else if ($box.msRequestFullscreen) {
        $box.msRequestFullscreen()
    }
}
function getOffFullscreen() {
  classList.add($svgFullScrOn, 'active')
  classList.remove($svgFullScrOff, 'active')
  if(document.exitFullscreen) {
    document.exitFullscreen();
  } else if(document.mozCancelFullScreen) {
    document.mozCancelFullScreen();
  } else if(document.webkitExitFullscreen) {
    document.webkitExitFullscreen();
  }else if (document.msExitFullscreen) {
	document.msExitFullscreen();
  }
}
function btnHandler(e) {
    e.stopPropagation()
    if(!window.viewerState.is$sideMenuBoxHidden && !window.viewerState.is$footerHidden) {
        $sideMenuBox.hide()
        $footer.hide()
        $box.addEventListener('click', boxHandler)
    } else {
        $sideMenuBox.show()
        classList.remove($footer.object, 'ctrl')
        clearTimeout(id)
        $box.removeEventListener('click', boxHandler)
        $footer.object.removeEventListener('click', footerHandler)
    }
}
function boxHandler(e) {
    e.stopPropagation()
    $box.removeEventListener('click', boxHandler)
    showCtrl()
    id = setTimeout( function(){
             hideCtrl()
             $box.addEventListener('click', boxHandler)
         } , durationFooterAsCtrl)
}
function footerHandler(e) {
    e.stopPropagation()
    clearTimeout(id)
    id = setTimeout( function(){
             hideCtrl()
             $footer.object.removeEventListener('click', footerHandler)
             $box.addEventListener('click', boxHandler)
         } , durationFooterAsCtrl)
}
function showCtrl() {
    $footer.object.addEventListener('click', footerHandler)
    classList.add($footer.object, 'ctrl')
    $footer.show()
}
function hideCtrl() {
    $footer.object.removeEventListener('click', footerHandler)
    $footer.hide()
    setTimeout(function(){
        classList.remove($footer.object, 'ctrl')
    }, window.viewerState.durationShowHideMenu)
}
