/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q='
const apiKey = '&APPID=823ffab6e94c31871a1e73f0a8bc0149'// Personal API Key for OpenWeatherMap API

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
//Create a human-friendly date
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['January','February','March','April','May','June','July','August','September','October','November','December'];
let dateString = `${days[d.getDay()]}, ${months[d.getMonth()]} ${d.getDate()}, ${d.getFullYear()}`
console.log(`Today is ${dateString}`);

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', buttonClick);

/* Function called by event listener */
function buttonClick(evt){
    const feelText = document.getElementById('feelings').value; //variable for text in 'How are you feeling today?' field
    const zipCode = document.getElementById("zip").value; //variable for text in 'Zipcode' field
    console.log(zipCode);
    getAPIData(baseURL, zipCode, apiKey)
      .then(function (APItemperature) {
        postData('http://localhost:8000/addWeather', { temperature: APItemperature, date: newDate, userResponse: feelText })
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
      console.log(newData);
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
      let userResp = allData.userResponse;
      let currentCity = allData.temperature.name;
      console.log(`Today's date: ${dateString}`);
      console.log(`Current temperature: ${currentTemp}`);
      console.log(`Current city: ${currentCity}`);
      console.log(allData);
      document.getElementById('date').innerHTML = dateString;
      document.getElementById('temp').innerHTML = currentTemp;
      document.getElementById('content').innerHTML = allData.userResponse;
    } catch (error) {
      console.log("error", error);
    }
  }
