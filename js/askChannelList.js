'use strict'

var $sideMenuBox = window.viewerState.$sideMenuBox,
    $slider = window.viewerState.$slider,
    oReq = new XMLHttpRequest(),
    attempt = 0,
    channelList = [],
    chName = '',
    style = document.createElement('style'),
    input = null,
    label = null
style.type = 'text/css'
window.viewerState.chList = {}

oReq.addEventListener("load", processChList)
oReq.addEventListener("error", tryAgain)
oReq.addEventListener("abort", tryAgain)
oReq.open("GET", "./channels.json")
oReq.send()

function tryAgain(e) {
    console.log(e)
    if(attempt < 5) oReq.send()
}
function processChList () {
    channelList = JSON.parse(this.responseText)
    for(var i=0; i<channelList.length; i++){
        chName = 'ch_' + channelList[i].name
        window.viewerState.chList[chName] = {}
        window.viewerState.chList[chName].lq = channelList[i].lq
        window.viewerState.chList[chName].hq = channelList[i].hq
        input = document.createElement('input')
        input.type = 'radio'
        input.setAttribute('id', chName)
        input.setAttribute('name', 'ch-selector')
        $slider.appendChild(input)
        label = document.createElement('label')
        label.setAttribute('class', 'sidebar__slider__button ' + chName)
        label.setAttribute('for', chName)
        $slider.appendChild(label)
        style.innerHTML += '.sidebar__slider__button.' + chName 
            + ' {background-position: ' + channelList[i].background_x_position_bw + 'em '
            + channelList[i].background_y_position + 'em, left;}\n'
        style.innerHTML += '#' + chName + ':checked + label.sidebar__slider__button'
            + ' {background-position: ' + channelList[i].background_x_position_color + 'em '
            + channelList[i].background_y_position + 'em, left;}\n'
        
    }
    document.getElementsByTagName('head')[0].appendChild(style);
    console.log(style.innerHTML)
    $sideMenuBox.style.visibility = ''
}
