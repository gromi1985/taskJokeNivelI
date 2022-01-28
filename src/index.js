/**Variables para la peticion asincronica JOKE*/
var API_URL_JOKE_0 = "https://icanhazdadjoke.com/";
// const API_URL_JOKE_1: string = "https://api.chucknorris.io/jokes/random";
var API_URL_JOKE_1 = "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random";
var API_OPCIONES_PETICION_JOKE_0 = {
    headers: {
        Accept: "application/json"
    }
};
var API_OPCIONES_PETICION_JOKE_1 = {
    "method": "GET",
    "headers": {
        "accept": "application/json",
        "x-rapidapi-host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
        "x-rapidapi-key": "fa472c5b6fmsh3519c15a39db3b9p1f47b8jsnf07e2c639a4a"
    }
};
var data_confJoke1 = {};
/**Parametros para la peticion asincronica WEATHER*/
var data_confWeather = {
    id: "6356131",
    appid: "3f12566373dfcec257a5ff896a50556e",
    lang: "es"
};
/** serializo un objeto en una lista de parámetros de consulta de URL */
var API_URL_WEATHER = "http://api.openweathermap.org/data/2.5/weather?";
var paramsURL = new URLSearchParams(data_confWeather).toString();
var apiUrlWeatherFinal = API_URL_WEATHER.concat(paramsURL);
//Bloqueamos los parametros de configuracion para que no sea modificable por consola.
Object.freeze(data_confWeather);
// const API_URL_WEATHER = `http://api.openweathermap.org/data/2.5/weather?id=${data_conf.idCity}&appid=${data_conf.appid}&lang=${data_conf.lang} `;
var API_OPCIONES_PETICION_WEATHER = {
    headers: {
        Accept: "application/json"
    }
};
/**Array de objetos de tipo interfaceUnitJoke y al ser un const debo inicializarla */
var reportAcudits = [];
var jokeGeneral = "";
var weatherGeneral = "";
var button = document.querySelector(".boton-request");
var HTMLResponseJoke = document.querySelector("#chiste");
var HTMLResponseWeather = document.querySelector("#elTiempo");
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
    //Solo le permito votar 1 vez
    disabledButtonFace();
    //Muestro por consola el arreglo de objetos
    console.log(reportAcudits);
}
/**Funcion que habilita los botones de caritas y asocia la funcion de captura de cual boton se presionó para valor el joke */
function calificacion(buttonElements) {
    /**Habilito los botones de caritas */
    buttonElements.forEach(function (button) {
        button.removeAttribute("disabled");
        button.addEventListener("click", captureParcialData);
    });
}
/**funcion random para seleccionar a url se va a pedir el joke */
var random = function (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
};
/**Segun el random generado se llama a una u otra url */
var seleccionJoke = function (option) {
    switch (option) {
        case 0:
            console.log('jokeObtain_0');
            jokeObtain_0();
            break;
        case 1:
            console.log('jokeObtain_1');
            jokeObtain_1();
        default:
    }
};
/******************************JOKE **********************************/
if (button) {
    button.addEventListener("click", function () {
        seleccionJoke(random(0, 1));
    });
}
var jokeObtain_0 = function () {
    if (button && HTMLResponseJoke && buttonFace) {
        var myFirstPromise_A = fetch(API_URL_JOKE_0, API_OPCIONES_PETICION_JOKE_0)
            .then(function (response) { return response.json(); })
            .then(function (data) {
            if (data.status == 200) {
                var cleanElement = HTMLResponseJoke.querySelector("p");
                if (cleanElement)
                    cleanElement.remove();
                var newJoke = document.createElement("p");
                newJoke.classList.add("jokeData");
                newJoke.innerHTML = data.joke;
                HTMLResponseJoke.append(newJoke);
                jokeGeneral = data.joke;
                calificacion(buttonFace);
            }
        });
        myFirstPromise_A["catch"](function (error) {
            return console.log("Error en la promesa: ", error);
        });
    }
};
var jokeObtain_1 = function () {
    if (button && HTMLResponseJoke && buttonFace) {
        var myFirstPromise_A = fetch(API_URL_JOKE_1, API_OPCIONES_PETICION_JOKE_1)
            .then(function (response) { return response.json(); })
            .then(function (data) {
            var cleanElement = HTMLResponseJoke.querySelector("p");
            if (cleanElement)
                cleanElement.remove();
            var newJoke = document.createElement("p");
            newJoke.classList.add("jokeData");
            newJoke.innerHTML = data.value;
            HTMLResponseJoke.append(newJoke);
            jokeGeneral = data.value;
            calificacion(buttonFace);
        });
        myFirstPromise_A["catch"](function (error) {
            return console.log("Error en la promesa: ", error);
        });
    }
};
//Opto por indicarle a la promesa el formato de los datos que me devuelcva auqnue en este caso por defecto esta API devuelve los datos en formato de json, por lo que realmente no seria necesario.
/******************************WEATHER **********************************/
if (HTMLResponseWeather) {
    var myFirstPromise_B = fetch(apiUrlWeatherFinal, API_OPCIONES_PETICION_WEATHER)
        .then(function (response) { return response.json(); })
        .then(function (data) {
        if (data.cod == 200) {
            var cleanElement = HTMLResponseWeather.querySelector("p:first-child");
            if (cleanElement)
                cleanElement.remove();
            var newWeather = document.createElement("p");
            newWeather.classList.add("dataWeather");
            newWeather.innerHTML = data.weather[0].description;
            HTMLResponseWeather.append(newWeather);
            weatherGeneral = data.weather;
        }
    });
    myFirstPromise_B["catch"](function (error) {
        return console.log("Error en la promesa: ", error);
    });
}
