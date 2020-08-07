function onClicks() {
    defineOnClicksById('3', function() { clearCompleted(); });
    defineOnClicksById('showComplete', function() { changeView('block', 'none', 'showComplete'); });
    defineOnClicksById('showAll', function() { changeView('block', 'block', 'showAll'); });
    defineOnClicksById('showActive', function() { changeView('none', 'block', 'showActive'); });
    // Listens for enter to be clicked in the text from then calls appendList()
    document.getElementById("input").addEventListener("keyup", function(event) { if (event.keyCode == 13) { appendList(); } }); 
}

function defineOnClicksById(Id, parameters) {
    document.getElementById(Id).onclick = function() { parameters() };
}

function clearCompleted() {
    var element = document.getElementsByClassName('complete');
    while(element[0])
    {
        element[0].parentNode.removeChild(element[0]);
    }
    checkBottomBar();
}

function changeView(style, style1, id) {
    var element = document.getElementsByClassName('complete');
    for(var l = 0; l < element.length; l++)
    {
        element[l].style.display = style;
    }
    element = document.getElementsByClassName('inComplete');
    for(l = 0; l < element.length; l++)
    {
        element[l].style.display = style1;
    }
    var elements = document.getElementsByClassName('view');
    for(var i = 0, iter = elements.length; i < iter; i++) {
        document.getElementById(elements[i].id).className =
        document.getElementById(elements[i].id).className.replace
        ( /(?:^|\s)viewing(?!\S)/g , '' );
    }
    document.getElementById(id).className += " " + "viewing";
}

function checkBottomBar() {
    var element = document.getElementById("list");
    if (element.getElementsByTagName("li").length == 0)
    {
            document.getElementById('foot').className =
            document.getElementById('foot').className.replace
            ( /(?:^|\s)showing(?!\S)/g , '' );
    }
}

function defineTrashcan() {
    var element = document.createElement("button");
        element.innerHTML = '🗑';
        element.setAttribute("tabindex", tabIndex);
        tabIndex++;
        element.setAttribute("class", "discard");
        element.onclick = function()
        {
            var li = element.parentNode;
            if (!li.querySelector(".checkbox").checked)
            {
                updateAmount('subtraction');
            }
            li.parentNode.removeChild(li);
            checkBottomBar();
        };
    return element;
}

function defineCheckbox() {
    var element = document.createElement("input");
        element.setAttribute("type", "checkbox");
        element.setAttribute("tabindex", tabIndex);
        tabIndex++;
        element.setAttribute("class", "checkbox");
        element.onclick = function()
        {
            var li = element.parentNode;
            if (element.checked) {
                element.parentNode.setAttribute('class', 'complete');
                updateAmount('subtraction');
            } else { 
                element.parentNode.setAttribute('class', 'inComplete');
                updateAmount('addition');
            }
            if(document.getElementsByClassName('complete').length == '0')
            {
                document.getElementById('3').className =
                document.getElementById('3').className.replace
                ( /(?:^|\s)showing(?!\S)/g , '' );
            } else {
                document.getElementById('3').className += " " + "showing";
            }
        };
    return element;
}

function defineValue(text) {
    var element = document.createElement("input");
        element.setAttribute('value', text);
        element.setAttribute("tabindex", tabIndex);
        element.setAttribute("type", "textbox");
        tabIndex++;
        element.setAttribute('class','listText');
    return element;
}

function defineLi(text) {
    var checkbox = defineCheckbox();
    var value = defineValue(text);
    var trashcan = defineTrashcan();
    var li = document.createElement("li");
        li.setAttribute("class", "inComplete");
        li.appendChild(checkbox);
        li.appendChild(value);
        li.appendChild(trashcan);
        li.setAttribute("id", "element" + elementId + "");
    return li;
}

function updateAmount(operation) {
    var left = document.getElementById('amountLeft');
    if(operation == 'subtraction') { --amountLeft; }
    else if(operation == 'addition') { ++amountLeft; }
    if (amountLeft == 1)
    {
    left.innerHTML = amountLeft + " Task Left";
    } else {
        left.innerHTML = amountLeft + " Tasks Left";
    }
}

function appendList() {
    var input = document.getElementById('input');
    if (input.value != "") {
        var ul = document.getElementById("list");
        var li = defineLi(input.value);
        ul.insertBefore(li, document.getElementById('foot') );
        elementId++;
        input.value = "";
        input.focus();
        updateAmount('addition');
        if (1 == ul.getElementsByTagName("li").length)
        {
                document.getElementById('foot').className += " " + "showing";
        }
    }
}

var elementId = 0, tabIndex = 3, amountLeft = 0, exp = new Date(), expDays = 30;

exp.setTime(exp.getTime() + (expDays*24*60*60*1000));

onClicks();