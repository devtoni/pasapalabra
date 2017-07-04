var interactions = (function() {
    "use strict";
    var green = 0;
    var red = 0;
    var blue = 27;


    var display = function(element) {
        if (element.classList.contains('hide')) {
            element.classList.remove('hide');
            element.classList.add('show');
        } else {
            element.classList.add('show');
        }

    };

    var hide = function(element) {
        if (element.classList.contains('show')) {
            element.classList.remove('show');
            element.classList.add('hide');
        } else {
            element.classList.add('hide');
        }
    };

    var showTable = function() {
        const table = document.getElementById("table");
        const tableBox = document.getElementById("tableBox");
        var userData = sortRanking();
        for (var i = 0; i < userData.length; i++) {
            var row = table.insertRow(i + 1);
            var cell1 = row.insertCell(0);
            var cell2 = row.insertCell(1);
            var cell3 = row.insertCell(2);
            cell1.innerHTML = (i + 1) + "º";
            cell2.innerHTML = userData[i].user;
            cell3.innerHTML = userData[i].points;
        }
        display(tableBox);
    };

    // removes the text even if it is an input or an element with innerHTML
    var eraseText = function(element) {
        if (element.value || element.innerHTML) {
            element.value = "";
            element.innerHTML = "";
        };
    };

    var changeColor = function(element, color) {
        element.classList.add(color);
    };

    // target is the letter we are looking for in the alphabet
    var addClassLetter = function(target, color) {
        target = target.toUpperCase();
        const letters = Array.from(document.querySelectorAll(".circle-of-words a"));
        letters.forEach((letter) => {
            if (letter.dataset.letter === target) {
                removeClass(letter, ['red', 'blue', 'green']);
                letter.classList.add(color);
            }
        });
    };

    var removeClass = function(element, classList) {
        classList.forEach(classEl => {
            if (element.classList.contains(classEl)) {
                element.classList.remove(classEl);
            }
        });
    };

    var uploadState = function(g, r, b) {
        green += g;
        red += r;
        blue -= b;
        writePoints();
    };

    var writePoints = function() {
        var aciertos = document.getElementById("aciertos");
        aciertos.innerHTML = green;
        var fallos = document.getElementById("fallos");
        fallos.innerHTML = red;
        var restante = document.getElementById("restante");
        restante.innerHTML = blue;
    };

    var restartPoints = function() {
        green = 0;
        red = 0;
        blue = 27;
        writePoints();
    };

    var sortRanking = function() {
        var ranking = user.userData; // array of users 
        // sorting the array for higher points
        ranking.sort((userA, userB) => userB.points > userA.points);
        return ranking;
    };

    var changeValue = function(element, value) {
        element.value = value;
    };


    return {
        restart: restartPoints,
        upload: uploadState,
        erase: eraseText,
        showTable: showTable,
        display: display,
        hide: hide,
        addClass: addClassLetter,
        removeClass: removeClass,
        change: changeValue
    };


})();
