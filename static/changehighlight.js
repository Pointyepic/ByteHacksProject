var index=0;
function changeHighlight(sentence) {
    var section=document.getElementById("textbox");
    var children = section.childNodes;
    for(var i = 0; i < children.length; i++) {
        section.removeChild(children[i]);
    }
    var text=document.createElement('p');
    text.appendChild(document.createTextNode(sentence.substring(0,index)));
    var letter=document.createElement('mark');
    letter.appendChild(document.createTextNode(sentence.substring(index,index+1)));
    text.appendChild(letter);
    text.appendChild(document.createTextNode(sentence.substring(index+1)));
    section.appendChild(text);
    index++;
    //fqfwer
}
