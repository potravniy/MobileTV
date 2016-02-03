'use strict'

var $video = window.viewerState.$video
var $slider = window.viewerState.$slider
var $footer = window.viewerState.$footer
var $overViewBox = document.querySelector('.box-over-view')
var $btnMenuOff = document.querySelector('.footer__btns__menu-off')
var $arrowMenuOnOff = document.querySelector('.menu_on_off')
var $arrowText = document.querySelector('.menu_on_off__text')
var startTime = undefined
var duration = 1000 //  ms
var duration_fast = 500 //  ms

$btnMenuOff.addEventListener('click', function () {
    requestAnimationFrame(hideMenuHor)
})
$arrowMenuOnOff.addEventListener('click', function () {
    $arrowMenuOnOff.style.borderTopColor =  '#48f';
    $arrowText.innerText = ''
    requestAnimationFrame(showMenuVert)
})

function hideMenuHor (timeStamp) {
  if (!startTime) startTime = timeStamp
  var progress = (timeStamp - startTime) / duration
  if (progress <= 1) {
      $arrowMenuOnOff.style.right = 100 - 100 * progress + '%'
      $footer.style.left = 100 * progress + '%'
      requestAnimationFrame(hideMenuHor)
  } else {
      $arrowMenuOnOff.style.right = 0
      $footer.style.left = 100 + '%'
      startTime = undefined
      turnArrowUp()
      requestAnimationFrame(hideMenuVert)
  }
}
function turnArrowUp() {
    $arrowMenuOnOff.style.borderTop = 'none'
    $arrowMenuOnOff.style.borderRight = '2.5em solid transparent'
    $arrowMenuOnOff.style.borderBottom = '2em solid #48f'
    $arrowMenuOnOff.style.borderLeft = '2.5em solid transparent'
}

function hideMenuVert(timeStamp) {
  if (!startTime) startTime = timeStamp
  var progress = (timeStamp - startTime) / duration
  if (progress <= 1) {
      $arrowMenuOnOff.style.bottom = 100 * progress + '%'
      $overViewBox.style.top = -100 * progress + '%'
      requestAnimationFrame(hideMenuVert)
  } else {
      $arrowMenuOnOff.style.bottom = 100 + '%'
      $overViewBox.style.top = -90 + '%'
      startTime = undefined
      turnArrowDonw()
      requestAnimationFrame(dropDown)
  }
}
function turnArrowDonw() {
    $arrowMenuOnOff.style.borderTop = '2em solid #48f'
    $arrowMenuOnOff.style.borderRight = '2.5em solid transparent'
    $arrowMenuOnOff.style.borderBottom = 'none'
    $arrowMenuOnOff.style.borderLeft = '2.5em solid transparent'
}
function dropDown(timeStamp) {
  if (!startTime) startTime = timeStamp
  var progress = (timeStamp - startTime) / duration_fast
  if (progress <= 1) {
      $arrowMenuOnOff.style.bottom = 100 - 10 * progress + '%'
      requestAnimationFrame(dropDown)
  } else {
      $arrowMenuOnOff.style.bottom = 90 + '%'
      startTime = undefined
      setTimeout(function() {
          $arrowText.innerText = 'menu'
          $arrowMenuOnOff.style.borderTopColor =  'rgba(68, 136, 255, 0.3)';
      }, 300);
  }
}



function showMenuVert (timeStamp) {
  if (!startTime) startTime = timeStamp
  var progress = (timeStamp - startTime) / duration
  if (progress <= 1) {
      $arrowMenuOnOff.style.bottom = 90 - 90 * progress + '%'
      $overViewBox.style.top = -90 + 90 * progress + '%'
    requestAnimationFrame(showMenuVert)
  } else {
      $arrowMenuOnOff.style.bottom = 0
      $overViewBox.style.top = 0
      startTime = undefined
      turnArrowLeft()
      requestAnimationFrame(showMenuHor)
  }
}
function turnArrowLeft() {
    $arrowMenuOnOff.style.borderTop = '1em solid transparent'
    $arrowMenuOnOff.style.borderRight = '5em solid #48f'
    $arrowMenuOnOff.style.borderBottom = '1em solid transparent'
    $arrowMenuOnOff.style.borderLeft = 'none'
}
function showMenuHor (timeStamp) {
  if (!startTime) startTime = timeStamp
  var progress = (timeStamp - startTime) / duration
  if (progress <= 1) {
      $arrowMenuOnOff.style.right = 100 * progress + '%'
      $footer.style.left = 100 - 100 * progress + '%'
      requestAnimationFrame(showMenuHor)
  } else {
      $arrowMenuOnOff.style.right = 100 + '%'
      $footer.style.left = 0
      startTime = undefined
      turnArrowToInit()
  }
}
function turnArrowToInit() {
    $arrowMenuOnOff.style.borderTop = ''
    $arrowMenuOnOff.style.borderRight = ''
    $arrowMenuOnOff.style.borderBottom = ''
    $arrowMenuOnOff.style.borderLeft = ''
}
