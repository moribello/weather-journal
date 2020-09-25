Udacity Front-End Developer Project: Weather Journal App
====================================

Pre-requisites:
---------------
- Modern standards-compliant browser
- **node** version 12.18.3 or later
- **node** dependencies:
    - express 4.17.1 or later
    - body-parser 1.19.0 or later
    - CORS 2.8.5 or later

Description:
------------
This project had several requirements, all to be performed using
JavaScript:
    - Retrieve user input for current zip code and how the user is feeling
    - Incorporate the user-supplied zip code into an API call to openweathermap.org
    - Use a GET route that returns the projectData object from the node server
    - Use a POST route that adds temperature, current date, and the user's
    feelings from the initial page input to the projectData object.

User Input:
-----------
User input is accomplished via two text areas in the *index.html* page. Once the
user has entered text in the **zip code** and **feeling** fields they can click
the **generate** button; an event listener then runs code to pass the zip code,
user's feelings, and current date (generated as part of the *app.js* code) to
the node server (running on *server.js*).

GET Data
----------
On the server side (code in *server.js*) a GET route is set up to fetch data
from openweathermap.org using an API key obtained from openweathermap.org, hard
coded in *app.js*, and passed to openweathermap.org from the server. This route
and returned data is then passed back to the user-side using a callback function
in the GET route. Note that this function is asynchronous and is not triggered
until the user has clicked the **generate** button

POST Data:
----------------
The POST data allows the *app.js* script to pass the full URL to create an API
request to as well as the path to store the object on the client side. On the
server side a new entry is made in the specified endpoint for the data send by
the client side POST request.

Additional Features:
----------------------
Although zip code, temperature, date, and user input ("feelings") were the only
required data for this project, several issues arose with the data as provided:
- The current date value was not human-friendly
- Temperature was similarly not human-friendly as it was returned in Kelvin units
- No feedback on zip code was provided
- Additional weather data was available but not provided to the user

Additional features to address this included:
- A friendlier graphical layout, including clearer separation between UI areas
- The date was changed to a more human-friendly format and displayed as part of
the user feedback area on the right
- Temperature was converted to farenheit (the author's native units) with
appropriate notation in the feedback area
- The human-friendly name for the zip code or area provided was retrieved from
the API data and provided as part of the feedback area
- A visible icon based on the user's current weather along with a short
description are displayed in the feedback area
- A more detailed current weather description is provided in the feedback area.
