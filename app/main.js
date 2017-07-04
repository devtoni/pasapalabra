var core = (function() {
    "use strict";

    var collection = [
        { letter: "a", answer: "abducir", status: 0, question: ("CON LA A. Dicho de una supuesta criatura extraterrestre: Apoderarse de alguien") },
        { letter: "b", answer: "ballena", status: 0, question: ("CON LA B. mamífero marino del grupo de los cetáceos que puede medir más de treinta metros de longitud y 150 toneladas de peso") },
        { letter: "c", answer: "bacteria", status: 0, question: ("CONTIENE LA C. microorganismos unicelulares que solo se pueden observar al microscopio") },
        { letter: "d", answer: "diarrea", status: 0, question: ("CON LA D. Anormalidad en la función del aparato digestivo caracterizada por frecuentes evacuaciones y su consistencia líquida") },
        { letter: "e", answer: "ectoplasma", status: 0, question: ("CON LA E. Gelatinoso y se encuentra debajo de la membrana plasmática. Los cazafantasmas medían su radiación") },
        { letter: "f", answer: "fuego", status: 0, question: ("CON LA F. Emisión de luz y calor producida por la combustión de una materia") },
        { letter: "g", answer: "galaxia", status: 0, question: ("CON LA G. Conjunto enorme de estrellas, polvo interestelar, gases y partículas") },
        { letter: "h", answer: "harakiri", status: 0, question: ("CON LA H. Suicidio ritual japonés por desentrañamiento") },
        { letter: "i", answer: "iglesia", status: 0, question: ("CON LA I. Templo cristiano") },
        { letter: "j", answer: "jabali", status: 0, question: ("CON LA J. Variedad salvaje del cerdo que sale en la película 'El Rey León', de nombre Pumba") },
        { letter: "k", answer: "karate", status: 0, question: ("CON LA K. Sistema de combate sin armas  o arte marcial de autodefensa  de origen japonés") },
        { letter: "l", answer: "licantropo", status: 0, question: ("CON LA L. Hombre lobo") },
        { letter: "m", answer: "misantropo", status: 0, question: ("CON LA M. Persona que huye del trato con otras personas o siente gran aversión hacia ellas") },
        { letter: "n", answer: "necedad", status: 0, question: ("CON LA N. Demostración de poca inteligencia") },
        { letter: "ñ", answer: "señal", status: 0, question: ("CONTIENE LA Ñ. Indicio que permite deducir algo de lo que no se tiene un conocimiento directo.") },
        { letter: "o", answer: "odin", status: 0, question: ("CON LA O. considerado el dios principal de la mitología nórdica y algunas religiones etenas") },
        { letter: "p", answer: "protoss", status: 0, question: ("CON LA P. Raza ancestral tecnológicamente avanzada que se caracteriza por sus grandes poderes psíonicos del videojuego StarCraft") },
        { letter: "q", answer: "queso", status: 0, question: ("CON LA Q. Producto obtenido por la maduración de la cuajada de la leche") },
        { letter: "r", answer: "reloj", status: 0, question: ("CON LA R. Instrumento para medir el tiempo o para indicar la hora del día") },
        { letter: "s", answer: "estrella", status: 0, question: ("CONTIENE LA S. cuerpo celeste de gran tamaño, constituido por plasma, con forma esférica, que brilla con luz propia") },
        { letter: "t", answer: "terminator", status: 0, question: ("CON LA T. Película del director James Cameron que consolidó a Arnold Schwarzenegger como actor en 1984") },
        { letter: "u", answer: "unamuno", status: 0, question: ("CON LA U. Escritor y filósofo español de la generación del 98 autor del libro 'Niebla' en 1914") },
        { letter: "v", answer: "vikingos", status: 0, question: ("CON LA V. Nombre dado a los miembros de los pueblos nórdicos originarios de Escandinavia, famosos por sus incursiones y pillajes en Europa") },
        { letter: "w", answer: "sandwich", status: 0, question: ("CONTIENE LA W. Emparedado hecho con dos rebanadas de pan entre las cuales se coloca jamón y queso") },
        { letter: "x", answer: "botox", status: 0, question: ("CONTIENE LA X. Toxina bacteriana utilizada en cirujía estética") },
        { letter: "y", answer: "peyote", status: 0, question: ("CONTIENE LA Y. Pequeño cáctus conocido por sus alcaloides psicoactivos utilizado de forma ritual y medicinal por indígenas americanos") },
        { letter: "z", answer: "zen", status: 0, question: ("CON LA Z. Escuela de budismo que busca la experiencia de la sabiduría más allá del discurso racional") },
    ];

    var num = 0;

    var answer = collection[num].answer;
    var resp = document.getElementById("answer");
    var letter = collection[num].letter;

    // checking the num 
    var checkNum = function() {
        if (num < collection.length) {
            checkStat();
        } else {
            var com = completed(); // only true if every status property in collection is != 0;
            if (com) {
                fin();
            } else {
                num = 0;
                checkStat();
            }
        }
    }

    // then check the stat
    var checkStat = function() {
        if (collection[num].status === 0) {
            writeQuestion();
        } else {
            num++;
            checkNum();
        }
    }

    // write question
    var writeQuestion = function() {
        var resp = document.getElementById("answer");
        var pregunta = document.getElementById("pregunta");
        pregunta.innerHTML = collection[num].question;
        resp.focus();
        interactions.erase(resp);
    }

    // check if we answered all the questions
    var completed = function() {
        return collection.every((el) => el.status !== 0);
    }

    // we prevent the default behaviour because if we don't do that the next description don't appear
    var preventDef = function(event) {
        if (event.keyCode == 13) {
            event.preventDefault();
        }
    }

    // send answer normalized the answer to lower case and call check answer
    var sendAnswer = function(val) {
        val = val.toLowerCase();
        checkAnswer(val);
    }

    // checking the answer
    var checkAnswer = function(ans) {
        letter = collection[num].letter;
        answer = collection[num].answer;
        if (ans === answer) {
            collection[num].status = 1;
            user.addPoints();
            interactions.addClass(letter, "green");
            interactions.upload(1, 0, 1);
            num++;
            checkNum();
        } else if (ans === 'pasapalabra') {
            collection[num].status = 0;
            interactions.addClass(letter, 'blue');
            num++;
            checkNum();
        } else {
            collection[num].status = 2;
            interactions.addClass(letter, 'red');
            interactions.upload(0, 1, 1);
            num++;
            checkNum();
        }
    }

    // start the crono and call for the first question
    var start = function() {
            crono.actOrDeact();
            writeQuestion();
        }

    //results push the user name and points to the array userData.
    var resultados = function() {
        user.userData.push([{
            nameU: userName,
            pointsU: points
        }]);
    };

    // when u finish by click the user score doesn't show on the ranking, we alert with the points and no more
    var finishByClick = function() {
        var [userName, points] = user.showCurrentUser();
        alert("Vaya, has decidido finalizar antes de tiempo " + userName + ", tus puntos han sido de " + points + ".");
        var turnToPlay = confirm('Quieres volver a jugar?');
        if (turnToPlay) {
            this.value = 'EMPEZAR';
            restart();
        } else {
            alert('Hasta otra!!');
        }
    };

    var finCrono = function() {
        crono.actOrDeact();
        user.addResults();
        var volver = confirm('Vaya!!, se acabó el tiempo, volver a jugar?');
        if (volver) {
            restart();
        } else {
            interactions.showTable();
            alert('Hasta otra!');
        }
    };

    var fin = function() {
        crono.actOrDeact();
        user.addResults(); // add results
        var volver = confirm("volver a jugar?");
        if (volver) {
            restart();
        } else {
            interactions.showTable();
            alert('Hasta otra!');
        }
    };

    var status0 = function() {
        for (var i = 0; i < collection.length; i++) {
            collection[i].status = 0;
        }
    };

    var restart = function() {
        status0();
        var letters = Array.from(document.querySelectorAll(".circle-of-words a"));
        letters.forEach(letter => {
            interactions.removeClass(letter, ['red', 'blue', 'green']);
        });
        num = 0;
        user.resetPoints();
        user.getName();
        interactions.restart();
        start(); // call again for the first letter
    };


    // get the answer typped by the user
    resp.addEventListener("keydown", function(e) {
        if (e.keyCode == 13) {
            var val = e.target.value;
            sendAnswer(val);
            preventDef(e);
        }
    }, false);

    return {
        write: writeQuestion,
        prevent: preventDef,
        finish: fin,
        finishByClick: finishByClick,
       finishByCrono: finCrono,
        start: start
    };

})();
