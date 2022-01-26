/**Variables para la peticion asincronica */
var API_URL = "https://icanhazdadjoke.com/";
var API_OPCIONES_PETICION = {
    headers: {
        Accept: "application/json"
    }
};
/**Array de objetos de tipo interfaceUnitJoke y al ser un const debo inicializarla */
var reportAcudits = [];
var jokeGeneral = "";
var button = document.querySelector(".boton-request");
var HTMLResponse = document.querySelector("#chiste");
var buttonFace = document.querySelectorAll(".buttonFace>button");
/**Funcion para desabilitar los botones de carita una vez dada la valoracion */
function disabledButtonFace() {
    buttonFace.forEach(function (button) { return button.setAttribute("disabled", ""); });
}
function captureParcialData(ev) {
    var tmpJoke = {
        joke: jokeGeneral,
        score: this.getAttribute("value") || "0",
        date: new Date().toISOString()
    };
    //Agrego elemento al arreglo de objetos
    reportAcudits.push(tmpJoke);
    //Solo le permito votar 1
    disabledButtonFace();
    //Muestro por consola el arreglo de objetos
    console.log(reportAcudits);
}
function calificacion(buttonElements) {
    /**Habilito los botones de caritas */
    buttonElements.forEach(function (button) {
        button.removeAttribute("disabled");
        button.addEventListener("click", captureParcialData);
    });
}
if (button && HTMLResponse && buttonFace) {
    button.addEventListener("click", function () {
        var myFirstPromise = fetch(API_URL, API_OPCIONES_PETICION)
            .then(function (response) { return response.json(); })
            .then(function (data) {
            if (data.status == 200) {
                var cleanElement = HTMLResponse.querySelector("p");
                if (cleanElement != undefined)
                    cleanElement.remove();
                var newJoke = document.createElement("p");
                newJoke.classList.add("jokeData");
                newJoke.innerHTML = data.joke;
                HTMLResponse.append(newJoke);
                jokeGeneral = data.joke;
                calificacion(buttonFace);
            }
        });
        myFirstPromise["catch"](function (error) {
            return console.log("Error en la promesa: ", error);
        });
    });
}
