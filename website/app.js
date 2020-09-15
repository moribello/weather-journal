/* Global Variables */
let baseURL = 'https://api.openweathermap.org/data/2.5/weather?q='
// Personal API Key for OpenWeatherMap API
let apiKey = '&APPID=823ffab6e94c31871a1e73f0a8bc0149'

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', performAction);

function performAction(e){
    console.log('Button clicked')
    const zipCode =  document.getElementById('zip').value;
    getWeather(baseURL,zipCode,apiKey)

}

/* Function called by event listener */

/* Function to GET Web API Data*/
const getWeather = async (baseURL, zipCode, key)=>{

  const res = await fetch(baseURL+zipCode+key)
  try {

    const data = await res.json();
    console.log(data)
    return data;
  }  catch(error) {
    console.log("error", error);
    // appropriately handle the error
  }
}
/* Function to POST data */


/* Function to GET Project Data */


