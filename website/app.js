/* Global Variables */
const baseURL = 'https://api.openweathermap.org/data/2.5/weather?q='
const apiKey = '&APPID=823ffab6e94c31871a1e73f0a8bc0149'// Personal API Key for OpenWeatherMap API

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();
console.log(newDate);

// Event listener to add function to existing HTML DOM element
document.getElementById('generate').addEventListener('click', buttonClick);

/* Function called by event listener */
function buttonClick(evt){
    console.log('Button clicked')
    const zipCode =  document.getElementById('zip').value; //get zip code from web page
    let fullURL = baseURL+zipCode+apiKey; //create full URL path using base URL, provided zip code, and apiKEY
    console.log(fullURL)
    const feelToday = document.getElementById('feelings').value //get value for feelings from web page
    //getData(fullURL);
    console.log(`Feeling ${feelToday}`);

}

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
// /* Function to POST data */
// const postData = async ( url = '', data = {})=>{
//     console.log(data);
//  //   const zipCode =  document.getElementById('zip').value;
//         const response = await fetch(url, {
//       method: 'POST',
//       credentials: 'same-origin',
//       headers: {
//           'Content-Type': 'application/json',
//       },
//      // Body data type must match "Content-Type" header
//       body: JSON.stringify(data),
//     });
//
//         try {
//             const newData = await response.json();
//             console.log(newData);
//             return newData;
//       } catch(error) {
//       console.log("error", error);
//       }
//   }

/* Function to GET Project Data */
