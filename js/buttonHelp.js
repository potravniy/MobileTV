var $help = document.querySelector('.help')
var $btnHelp = window.viewerState.$btnHelp

$btnHelp.addEventListener('click', function(){
    if($help.classList.contains("active")) {
        $help.classList.remove("active")
    } else {
        $help.classList.add("active")
    }
})