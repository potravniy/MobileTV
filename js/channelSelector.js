"use strict"

var $video = window.viewerState.$video
var $source = document.querySelector("#source")
var $slider = document.querySelector(".sidebar__slider")
var link = ''
var $btns = {
    "gorodskoy1":  document.querySelector("#ch-1gorodskoy"),
    "tsyfrovoy3":  document.querySelector("#ch-3tsyfrovoy"),
    "reporter":    document.querySelector("#ch-reporter"),
    "academia":    document.querySelector("#ch-academia"),
    "a1":          document.querySelector("#ch-a1"),
    "dumskaya":    document.querySelector("#ch-dumskaya"),
    "gtv":         document.querySelector("#ch-gtv"),
    "stv":         document.querySelector("#ch-stv"),
    "ugnayavolna": document.querySelector("#ch-ugnayavolna"),
    "nemo":        document.querySelector("#ch-nemo")
}
$btns.gorodskoy1.setAttribute(  'data-linkLQ', "http://77.88.196.133:8081/1tvod/1tvod-abr-lq/playlist.m3u8"    )
$btns.tsyfrovoy3.setAttribute(  'data-linkLQ', "http://cdn5.live-tv.od.ua:8081/tv/3tvod-abr-lq/playlist.m3u8"  )
$btns.reporter.setAttribute(    'data-linkLQ', "http://cdn4.live-tv.od.ua:8081/tv/31chod-abr-lq/playlist.m3u8" )
$btns.academia.setAttribute(    'data-linkLQ', "http://cdn4.live-tv.od.ua:8081/tv/36chod-abr-lq/playlist.m3u8" )
$btns.a1.setAttribute(          'data-linkLQ', "http://77.88.196.133:8081/a1od/a1od-abr-lq/playlist.m3u8"      )
$btns.dumskaya.setAttribute(    'data-linkLQ', "http://cdn2.live-tv.od.ua:8081/tv/dumska-abr-lq/playlist.m3u8" )
$btns.gtv.setAttribute(         'data-linkLQ', "http://77.88.196.133:8081/a1od/gtvod-abr-lq/playlist.m3u8"     )
$btns.stv.setAttribute(         'data-linkLQ', "http://77.88.196.133:8081/stvod/stvod-abr-lq/playlist.m3u8"    )
$btns.ugnayavolna.setAttribute( 'data-linkLQ', "http://77.88.196.133:8081/wave/wave-abr-lq/playlist.m3u8"      )
$btns.nemo.setAttribute(        'data-linkLQ', "http://77.88.196.133:8081/nemo/mor-sub/playlist.m3u8"          )

$btns.gorodskoy1.setAttribute(  'data-linkHQ', "http://77.88.196.133:8081/1tvod/1tvod-abr/playlist.m3u8"       )
$btns.tsyfrovoy3.setAttribute(  'data-linkHQ', "http://cdn5.live-tv.od.ua:8081/tv/3tvod-abr/playlist.m3u8"     )
$btns.reporter.setAttribute(    'data-linkHQ', "http://cdn4.live-tv.od.ua:8081/tv/31chod-abr/playlist.m3u8"    )
$btns.academia.setAttribute(    'data-linkHQ', "http://cdn4.live-tv.od.ua:8081/tv/36chod-abr/playlist.m3u8"    )
$btns.a1.setAttribute(          'data-linkHQ', "http://77.88.196.133:8081/a1od/a1od-abr/playlist.m3u8"         )
$btns.dumskaya.setAttribute(    'data-linkHQ', "http://cdn2.live-tv.od.ua:8081/tv/dumska-abr/playlist.m3u8"    )
$btns.gtv.setAttribute(         'data-linkHQ', "http://77.88.196.133:8081/a1od/gtvod-abr/playlist.m3u8"        )
$btns.stv.setAttribute(         'data-linkHQ', "http://77.88.196.133:8081/stvod/stvod-abr/playlist.m3u8"       )
$btns.ugnayavolna.setAttribute( 'data-linkHQ', "http://77.88.196.133:8081/wave/wave-abr/playlist.m3u8"         )
$btns.nemo.setAttribute(        'data-linkHQ', "http://77.88.196.133:8081/nemo/mor-abr/playlist.m3u8"          )

$video.play()

$slider.addEventListener('click', function(event){
    if(event.srcElement.tagName === 'INPUT'){
        if(window.viewerState.highQuality)  link = event.srcElement.getAttribute('data-linkHQ')
        else link = event.srcElement.getAttribute('data-linkLQ')
        $video.setAttribute('src', link)
        $source.setAttribute('src', link)
        $video.play();
    }
})
