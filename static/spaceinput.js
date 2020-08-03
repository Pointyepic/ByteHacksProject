var downtimer, uptimer, stopwatch;
var uptime=0;
var downtime=0;
var stoptime=0;
var down=false;
var up=false;
var start=false;
var finish=false;
var str='';
var letter='';
var sentence; 
var index=0; 
var sound=document.getElementById('audio');

var morselist=['.-','-...','-.-.','-..','.','..-.',
    '--.','....','..','.---','-.-','.-..',
    '--','-.','---','.--.','--.-','.-.','...',
    '-','..-','...-','.--','-..-','-.--','--..',
    '.----','..---','...--','....-','.....',
    '-....','--...','---..','----.','-----'];
var alphabet=['a','b','c','d','e','f','g','h','i','j','k','l','m',
            'n','o','p','q','r','s','t','u','v','w','x','y','z',
            '1','2','3','4','5','6','7','8','9','0'];

function initSentence(line) {
    sentence=line;
}

document.addEventListener('keydown', function(event) {
    if(event.keyCode == 32 && !down) {
        if (up) clearInterval(uptimer);
        console.log("uptime: "+uptime);
        uptime=0;
        up=false;
        sound.play();
        sound.volume=0.5;
        if (!start) {
             stopwatch=setInterval(addStopWatch, 1000);
             start=true;
        }
        downtimer=setInterval(addDownTime,10);
        down=true;
        var button=document.getElementById("button").setAttribute('class','spacedown');
        console.log(sentence.substring(index,index+1).toLocaleLowerCase());
    }
});

document.addEventListener('keyup', function(event) {
    if(event.keyCode == 32) {
        if (downtime>=20) str=str+'-';
        else str=str+".";
        if (str.length>5) str='';
        updateInputBox();
        document.getElementById('audio').pause();
        console.log("downtime:"+downtime);
        console.log(str);
        clearInterval(downtimer);
        downtime=0;
        down=false;
        if (!finish) uptimer=setInterval(addUpTime, 10);
        up=true;
        var button=document.getElementById("button").setAttribute('class','spaceup');
    }
});

function addUpTime() {
    uptime++;
    if (uptime==20 && start) {
        letter=alphabet[morselist.indexOf(str)];
        
        if (letter.toLocaleLowerCase().localeCompare
                    (sentence.substring(index,index+1).toLocaleLowerCase())==0) {
            index++;
            changeHighlight('correct');
        }
        else {
            changeHighlight('wrong')
        }
        if (sentence.substring(index,index+1).localeCompare(' ')==0) {
            index++;
            changeHighlight('correct');
        }
        console.log(letter);
        letter='';
        str='';
        updateInputBox();
    }
}

function addDownTime() {
    downtime++;
}

function addStopWatch() {
    stoptime++;
    updateStopWatch();
}

function updateStopWatch() {
    var timerbox=document.getElementById('stopwatch');
    timerbox.setAttribute('class','stopwatch');
    var children = timerbox.childNodes;
    for(var i = 0; i < children.length; i++) {
        timerbox.removeChild(children[i]);
    }
    var timertext=document.createElement('p');
    timertext.setAttribute('id','timer');
    timertext.appendChild(document.createTextNode('Time: '+stoptime));
    timerbox.appendChild(timertext);
}
function updateInputBox() {
    var inputBox=document.getElementById("inputbox");
    var children = inputBox.childNodes;
    for(var i = 0; i < children.length; i++) {
        inputBox.removeChild(children[i]);
    }
    var text=document.createElement('p');
    text.setAttribute('id','input');
    text.appendChild(document.createTextNode(str));
    inputBox.appendChild(text);
}
function changeHighlight(att) {
    var section=document.getElementById("textbox");
    var children = section.childNodes;
    for(var i = 0; i < children.length; i++) {
        section.removeChild(children[i]);
    }
    var text=document.createElement('p');
    text.setAttribute('id','paragraph');
    if (index<sentence.length) {
        text.appendChild(document.createTextNode(sentence.substring(0,index)));
        var letter=document.createElement('span');
        letter.setAttribute('id', att);
        letter.appendChild(document.createTextNode(sentence.substring(index,index+1)));
        text.appendChild(letter);
        text.appendChild(document.createTextNode(sentence.substring(index+1)));
        section.appendChild(text);
        //index++
    }
    else {
        console.log(length);
        var cpm=(sentence.length.toFixed(2)/(stoptime.toFixed(2)/60.00));
        var wpm=(cpm/5.00).toFixed(2);
        text.appendChild(document.createTextNode("Great Job! You finished the sentence in "+stoptime+" seconds (~"+wpm+" wpm)."));
        clearInterval(stopwatch);
        finish=true;
        section.appendChild(text);
        var homelink=document.createElement('a');
        homelink.setAttribute('href',"home");
        homelink.setAttribute('id',"paragraph");
        homelink.appendChild(document.createTextNode("Try again"));
        section.appendChild(homelink);
    }
}
function showChart(){
    var chart=document.getElementById('morsechart');
    var pic=document.getElementById('image');
    if (document.getElementById('checkbox').checked){
        pic.setAttribute('class','visible');       
    }
    else pic.setAttribute('class','hidden');
}
