/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?zip='
const apiKey = '&APPID=823ffab6e94c31871a1e73f0a8bc0149'// Personal API Key for OpenWeatherMap API

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
//Create a human-friendly date
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
let dateString = `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
//console.log(`Today is ${dateString}`);

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', buttonClick);

/* Function called by event listener */
function buttonClick(evt){
    const feelText = document.getElementById('feelings').value; //variable for text in 'How are you feeling today?' field
    const zipCode = document.getElementById("zip").value; //variable for text in 'Zipcode' field
    getAPIData(baseURL, zipCode, apiKey)
      .then(function (APItemp) {
        postData('http://localhost:8000/addWeather', { temperature: APItemp, date: newDate, userResponse: feelText })
          // update UI
          .then(function () {
            updateUI()
          })
      })
  }
//get API DATA function called above
const getAPIData = async (baseURL, zipCode, apiKey) => {
    const response = await fetch(baseURL + zipCode + apiKey)
    console.log(response);
    try {
      const newData = await response.json();
      return newData;
    } catch (error) {
      console.log("error", error); //deal with error
    }
  };

// Async postData function called during button click event
const postData = async (url = '', data = {}) => {
    const postRequest = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
    },
      body: JSON.stringify(data),
    });
    try {
      const newData = await postRequest.json();
      return newData;
    }
    catch (error) {
      console.log('Error during POST: ', error); //signal error during POST attempt;
    }
  }

//Update the UI using data retrieved from API
const updateUI = async () => {
    const request = await fetch('http://localhost:8000/all');
        try {
            const allData = await request.json();
                let currentDate = allData.Date;
                let currentTemp = allData.temperature.main.temp;
                let friendlyTemp = (((currentTemp - 273.15) * (9/5)) + 32).toFixed(2); //convert from Kelvin to freedom units because I'm in the US and we lag behind the rest of the world in using metric.
                let userResp = allData.userResponse;
                let currentCity = allData.temperature.name; //get vaule for current city based on returned value
                let currentWeath = allData.temperature.weather[0].main; //get value from 'weather' array for current weather title
                let weathIcon = allData.temperature.weather[0].icon; //get value from 'weather' array for current weather icon
                let weathFull = allData.temperature.weather[0].description; //get full weather desxcription
                let iconURL = `http://openweathermap.org/img/wn/${weathIcon}@2x.png`
            document.getElementById('date').innerHTML = dateString;
            document.getElementById('temp').innerHTML = `Current temperature: ${friendlyTemp}\xB0 F`;
            document.getElementById('currentWeather').innerHTML = `Current weather in ${currentCity}: ${weathFull}`
            document.getElementById('content').innerHTML = `Feeling: ${allData.userResponse}`;
            document.getElementById('weatherIcon').innerHTML = `<img src="${iconURL}" alt="${currentWeath}">` //replace path for current weather icon
            document.getElementById('weathDesc').innerHTML = currentWeath;
        } catch (error) {
            console.log("error", error);
        }
}
