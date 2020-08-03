var stopwatch;
var time=0;
var down=false;
var str='';
document.addEventListener('keydown', function(event) {
    if(event.keyCode == 32 && !down) {
        stopwatch=setInterval(addTime,10);
        console.log('down');
        down=true;
    }
});

document.addEventListener('keyup', function(event) {
    if(event.keyCode == 32) {
        if (time>=20) str=str+'dash ';
        else str=str+"dit ";
        console.log("up:"+time);
        console.log("msg: "+str);
        clearInterval(stopwatch);
        time=0;
        down=false;
    }
});

function addTime() {
    time++;
}
