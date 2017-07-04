var crono = (function() {

    // 130 seconds 
    var time = 130;
    var timer = 0;

    // while time is bigger than 0, we discount with the function Setinterval
    var discount = function() {
        if (time > 0) {
            time--;
        } else {
            core.finishByCrono();
            time = 130;
        }
    };

    // print the time
    var showCrono = function() {
        var cronoT = document.getElementById('crono');
        cronoT.innerHTML = time;
    };

    // discount and print the time
    var counterDown = function() {
        discount();
        showCrono();
    };

    // depending if the timer is working or not, we activate o deactivate the time
    var actOrDeact = function() {
        if (timer !== 0) {
            clearInterval(timer);
            timer = 0;
        } else {
            if (time == 130) {
                timer = setInterval(counterDown, 1000);
            } else {
                time = 130;
                showCrono();
            }
        }
    };

    return {
        actOrDeact: actOrDeact,
        showCrono: showCrono
    };
})();
