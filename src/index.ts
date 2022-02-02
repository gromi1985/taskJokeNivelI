/**Variables para la peticion asincronica JOKE*/
const API_URL_JOKE_0: string = "https://icanhazdadjoke.com/";
const API_URL_JOKE_1: string = "https://matchilling-chuck-norris-jokes-v1.p.rapidapi.com/jokes/random";


const API_CONF_REQUEST_TEMPLATE = {
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
  units:"metric"
};


/** serializo un objeto en una lista de parámetros de consulta de URL */
const API_URL_WEATHER: string =
  "http://api.openweathermap.org/data/2.5/weather?";
const paramsURL = new URLSearchParams(data_confWeather).toString();
const apiUrlWeatherFinal = API_URL_WEATHER.concat(paramsURL);

//Bloqueamos los parametros de configuracion para que no sea modificable por consola.
Object.freeze(data_confWeather);

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

const iconItemWeather = (id:number):string =>{
  let valueId:number=0;
  let dataImg:string;

   if(id >199 && id < 299) valueId = 1;
  else if(id >299 && id < 399) valueId = 2;
      else if (id >499 && id < 505) valueId = 3;
          else if (id == 511) valueId = 4;
              else if (id >519 && id < 532) valueId = 5;
                else if (id >599 && id < 700) valueId = 6;
                    else if (id >700 && id < 800) valueId = 7;
                        else if (id == 800) valueId = 8;
                            else if (id > 800) valueId = 9;

  switch (valueId){
    case 1:
      dataImg = 'thunder.svg';
      break;
    case 2:
      dataImg = 'rainy-4.svg';
      break;
    case 3:
      dataImg = 'rainy-3.svg';
      break;
    case 4:
      dataImg = 'snowy-5.svg';
      break;
    case 5:
      dataImg = 'rainy-6.svg'
      break;
    case 6:
      dataImg = 'snowy-6.svg'
      break;
    case 8:
      dataImg = 'day.svg';
      break;
    case 9:
      dataImg = 'cloudy.svg';
      break;
    default:
      dataImg = 'day.svg'; 
  }
  return dataImg;
}                     



/******************************JOKE **********************************/
 if (button) {
  button.addEventListener("click", () => {
    seleccionJoke(random(0, 1));
  });
 }

const jokeObtain_0 = () => {
  if (button && HTMLResponseJoke && buttonFace) {
    const myFirstPromise_A = fetch(API_URL_JOKE_0, API_CONF_REQUEST_TEMPLATE)
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
window.addEventListener('load',()=>{
if (HTMLResponseWeather) {
  const myFirstPromise_B = fetch(
    apiUrlWeatherFinal,
    API_CONF_REQUEST_TEMPLATE
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.cod == 200) {
        let cleanElement = HTMLResponseWeather.querySelectorAll("p");
        if (cleanElement) cleanElement.forEach(e => e.remove());

        let newWeatherTemp = document.createElement("p");
        newWeatherTemp.classList.add("dataWeather-temp");
        newWeatherTemp.innerHTML = `${Math.round(+data.main.temp)} °C`;

        let newWeatherImg = document.createElement("img");
        newWeatherImg.classList.add("dataWeather-img");
        newWeatherImg.src = `../img/animated/${iconItemWeather(data.weather[0].id)}`;


        // newWeatherImg.innerHTML = data.weather[0].description;  

       /* let newWeatherCity = document.createElement("p");
        newWeatherCity.classList.add("dataWeather-city");
        newWeatherCity.innerHTML = data.name;   */

        HTMLResponseWeather.append(newWeatherImg);
        HTMLResponseWeather.append(newWeatherTemp);
       // HTMLResponseWeather.append(newWeatherCity);

        weatherGeneral = data.weather;
      }
    });

  myFirstPromise_B.catch((error) =>
    console.log("Error en la promesa: ", error)
  );
}
});