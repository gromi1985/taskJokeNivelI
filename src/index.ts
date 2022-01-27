/**Variables para la peticion asincronica */
const API_URL = "https://icanhazdadjoke.com/";
const API_OPCIONES_PETICION = {
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

let jokeGeneral: string = "";


const button = document.querySelector(".boton-request");
const HTMLResponse = document.querySelector("#chiste");
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

  //Solo le permito votar 1
  disabledButtonFace();

  //Muestro por consola el arreglo de objetos
  console.log(reportAcudits);
}

function calificacion(buttonElements: NodeListOf<Element>): void {
  /**Habilito los botones de caritas */
  buttonElements.forEach((button) => {
    button.removeAttribute("disabled");
    button.addEventListener("click", captureParcialData);
  });
}

if (button && HTMLResponse && buttonFace) {
  button.addEventListener("click", () => {
    const myFirstPromise = fetch(API_URL, API_OPCIONES_PETICION)
      .then((response) => response.json())
      .then((data) => {
        if (data.status == 200) {
          let cleanElement = HTMLResponse.querySelector("p");
          if (cleanElement != undefined) cleanElement.remove();

          let newJoke = document.createElement("p");
          newJoke.classList.add("jokeData");
          newJoke.innerHTML = data.joke;
          HTMLResponse.append(newJoke);

          jokeGeneral = data.joke;
          calificacion(buttonFace);
        }
      });

    myFirstPromise.catch((error) =>
      console.log("Error en la promesa: ", error)
    );
  });
}