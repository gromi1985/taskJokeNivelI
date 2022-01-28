/**Variables para la peticion asincronica JOKE*/
const API_URL_JOKE_0: string = "https://icanhazdadjoke.com/";
const API_URL_JOKE_1: string = "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random";


const API_OPCIONES_PETICION_JOKE_0 = {
  headers: {
    Accept: "application/json",
  },
};

const API_OPCIONES_PETICION_JOKE_1 =  {
  "method": "GET",
	"headers": {
		"accept": "application/json",
		"x-rapidapi-host": "matchilling-chuck-norris-jokes-v1.p.rapidapi.com",
		"x-rapidapi-key": "fa472c5b6fmsh3519c15a39db3b9p1f47b8jsnf07e2c639a4a"
	}
};

/**Parametros para la peticion asincronica WEATHER*/
const data_confWeather = {
  id: "6356131",
  appid: "3f12566373dfcec257a5ff896a50556e",
  lang: "es",
};


/** serializo un objeto en una lista de parámetros de consulta de URL */
const API_URL_WEATHER: string =
  "http://api.openweathermap.org/data/2.5/weather?";
const paramsURL = new URLSearchParams(data_confWeather).toString();
const apiUrlWeatherFinal = API_URL_WEATHER.concat(paramsURL);

//Bloqueamos los parametros de configuracion para que no sea modificable por consola.
Object.freeze(data_confWeather);

const API_OPCIONES_PETICION_WEATHER = {
  headers: {
    Accept: "application/json",
  },
};

/**Interface de datos para cada joke */
interface UnitJoke {
  joke: string;
  score: string;
  date: string;
}

/**Array de objetos de tipo interfaceUnitJoke y al ser un const debo inicializarla */
const reportAcudits: UnitJoke[] = [];

var jokeGeneral: string = "";
var weatherGeneral: string = "";

const button = document.querySelector(".boton-request");
const HTMLResponseJoke = document.querySelector("#chiste");
const HTMLResponseWeather = document.querySelector("#elTiempo");
const buttonFace = document.querySelectorAll(".buttonFace>button");

/**Funcion para desabilitar los botones de carita una vez dada la valoracion */
function disabledButtonFace() {
  buttonFace.forEach((button) => button.setAttribute("disabled", ""));
}

function captureParcialData(this: HTMLElement, ev: Event) {
  let tmpJoke: UnitJoke = {
    joke: jokeGeneral,
    score: this.getAttribute("value") || "0",
    date: new Date().toISOString(),
  };

  //Agrego elemento al arreglo de objetos
  reportAcudits.push(tmpJoke);

  //Solo le permito votar 1 vez
  disabledButtonFace();

  //Muestro por consola el arreglo de objetos
  console.log(reportAcudits);
}

/**Funcion que habilita los botones de caritas y asocia la funcion de captura de cual boton se presionó para valor el joke */
function calificacion(buttonElements: NodeListOf<Element>): void {
  /**Habilito los botones de caritas */
  buttonElements.forEach((button) => {
    button.removeAttribute("disabled");
    button.addEventListener("click", captureParcialData);
  });
}

/**funcion random para seleccionar a url se va a pedir el joke */
const random = (min: number, max: number) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

/**Segun el random generado se llama a una u otra url */
const seleccionJoke = (option: number) => {
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
  button.addEventListener("click", () => {
    seleccionJoke(random(0, 1));
  });
 }

const jokeObtain_0 = () => {
  if (button && HTMLResponseJoke && buttonFace) {
    const myFirstPromise_A = fetch(API_URL_JOKE_0, API_OPCIONES_PETICION_JOKE_0)
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 200) {
          let cleanElement = HTMLResponseJoke.querySelector("p");
          if (cleanElement) cleanElement.remove();

          let newJoke = document.createElement("p");
          newJoke.classList.add("jokeData");
          newJoke.innerHTML = data.joke;
          HTMLResponseJoke.append(newJoke);

          jokeGeneral = data.joke;
          calificacion(buttonFace);
        }
      });

    myFirstPromise_A.catch((error) =>
      console.log("Error en la promesa: ", error)
    );
  }
};

const jokeObtain_1 = () => {
  if (button && HTMLResponseJoke && buttonFace) {
      const myFirstPromise_A = fetch(API_URL_JOKE_1, API_OPCIONES_PETICION_JOKE_1)
        .then((response) => response.json())
        .then((data) => {
            let cleanElement = HTMLResponseJoke.querySelector("p");
            if (cleanElement) cleanElement.remove();

            let newJoke = document.createElement("p");
            newJoke.classList.add("jokeData");
            newJoke.innerHTML = data.value;
            HTMLResponseJoke.append(newJoke);

            jokeGeneral = data.value;
            calificacion(buttonFace);
        });

      myFirstPromise_A.catch((error) =>
        console.log("Error en la promesa: ", error)
      );
  }
};

//Opto por indicarle a la promesa el formato de los datos que me devuelcva auqnue en este caso por defecto esta API devuelve los datos en formato de json, por lo que realmente no seria necesario.
/******************************WEATHER **********************************/
if (HTMLResponseWeather) {
  const myFirstPromise_B = fetch(
    apiUrlWeatherFinal,
    API_OPCIONES_PETICION_WEATHER
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod == 200) {
        let cleanElement = HTMLResponseWeather.querySelector("p:first-child");
        if (cleanElement) cleanElement.remove();

        let newWeather = document.createElement("p");
        newWeather.classList.add("dataWeather");
        newWeather.innerHTML = data.weather[0].description;
        HTMLResponseWeather.append(newWeather);

        weatherGeneral = data.weather;
      }
    });

  myFirstPromise_B.catch((error) =>
    console.log("Error en la promesa: ", error)
  );
}
