var user = (function() {
    "use strict";

    var startBtn = document.getElementById("startGame");
    var userData = [];
    var userName = "";
    var points = 0;


    var displayName = function() {
        let val = this.value;
        if (val === 'EMPEZAR') {
            this.value = 'FIN';
            getName();
        } else {
            core.finishByClick();
        }
    };

    var getName = function() {
        const box = document.getElementById("box");
        const name = document.getElementById("name");
        interactions.erase(name); // removes previews possible text
        interactions.display(box); // shows the box to put the name
        name.focus();
        name.addEventListener("keydown", function(e) { // when user put Enter
            if (e.keyCode === 13) {
                userName = e.target.value;
                interactions.hide(box); // hiding the box
                core.start();
            }
            core.prevent(e);
        });
    };

    var addPoints = function() {
        points++;
    }

    var resetPoints = function() {
        points = 0;
    }

    var addResults = function() {
        userData.push({
            user: userName,
            points: points
        });
    }

    var showCurrentUser = function() {
        var arr = [userName, points];
        return arr;
    }

    // event Listeners
    startBtn.addEventListener("click", displayName, false);

    return {
        resetPoints: resetPoints,
        addPoints: addPoints,
        addResults: addResults,
        userData: userData,
        displayName: displayName,
        showCurrentUser: showCurrentUser,
        getName: getName
    };
})();
