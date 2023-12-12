const apiKey = "55735da7a1ae42e59fa122510231112";
var city = "kota";
let searchCount = 0;
var tempUnit = true;
var removingCount = 0;
const searchbox = document.getElementById("searchBox");
const submitButton = document.getElementById("submit");
const weatherContainer = document.getElementById("weatherContainer");
const weatherInfo = document.getElementById("weatherInfo");
const ncity = document.getElementById("ncity");
const tempreature = document.getElementById("tempreature");
const humidity = document.getElementById("humidity");
const condition = document.getElementById("condition");
const forecastContainer = document.getElementById("forecastContainer");
const tempToogle = document.getElementById("tempToogle");

// to render the forecast data

function forecast(Data) {
  searchCount++;

  console.log(Data.forecast.forecastday);

  var DayData = Data.forecast.forecastday;

  // forcaste data is for the five days,
  // and has 4 basic information showing date,avg temp , avg humidity and condition
  for (var i = 0; i < 5; i++) {
    const newDiv = document.createElement("div");

    newDiv.id = "newDiv";

    const newPara1 = document.createElement("p");
    const newPara2 = document.createElement("p");
    const newPara3 = document.createElement("p");
    const newPara4 = document.createElement("p");

    newPara1.textContent = `Date: ${DayData[i].date}`;
    if (tempUnit) {
      newPara2.textContent = `Avg. Temp: ${DayData[i].day.avgtemp_c}`;
    } else {
      newPara2.textContent = `Avg. Temp: ${DayData[i].day.avgtemp_f}`;
    }
    newPara3.textContent = `Avg. Humidity ${DayData[i].day.avghumidity}`;
    newPara4.textContent = `Date: ${DayData[i].day.condition.text}`;

    newDiv.appendChild(newPara1);
    newDiv.appendChild(newPara2);
    newDiv.appendChild(newPara3);
    newDiv.appendChild(newPara4);

    newDiv.style.backgroundColor = "black";
    // newDiv.style.opacity = 100 + "%";
    newDiv.style.color = "white";

    if (window.innerWidth < 600) {
      newDiv.style.fontSize = 3 + "vw";
      newDiv.style.width = 100 + "px";
      newPara1.style.width = 8 + "em";
    } else {
      newDiv.style.fontSize = 1 + "em";
      newDiv.style.width = 10 + "%";
    }
    newDiv.style.borderRadius = 0.5 + "em";
    newDiv.style.border = ".2em solid white";

    newDiv.style.padding = 2 + "vw";
    newDiv.style.marginLeft = 2 + "em";

    forecastContainer.appendChild(newDiv);
  }
}

//fetching the data front the api , funciton triggered when the search button is clicked

async function weatherData(city) {
  const exp =
    "https://api.weatherapi.com/v1/current.json?key=" + apiKey + "&q=" + city;

  const exp1 =
    "https://api.weatherapi.com/v1/forecast.json?key=" +
    apiKey +
    "&q=" +
    city +
    "&days=" +
    "5";

  const res = await fetch(exp); // it's for the current condition of weather
  const res1 = await fetch(exp1); // for the forecast of next days

  const data = await res.json();
  const data1 = await res1.json();

  return data1;
}

searchbox.addEventListener("input", function () {
  console.log(searchbox.value);
  city = searchbox.value;

  // once the blocks for the forecaste are created the need to be deleted for the next search
  // so if we have already searched a city we need to remove these blocks
  //removeCount keeps in track that we are not trying to remove more elements than necessary.

  if (searchCount > 0 && removingCount === 0) {
    removingCount++;
    for (let i = 0; i < 5; i++) {
      console.log("this works so fine");
      var toRemove = forecastContainer.querySelector("div");
      forecastContainer.removeChild(toRemove);
    }
  }

  searchCount = 0;
});

// loads the data for current day and displays it

async function submitAction() {
  removingCount = 0;
  var Data = await weatherData(city);

  console.log(Data);

  ncity.innerHTML = `City: ${Data.location.name}`;
  humidity.innerHTML = `Humidity: ${Data.current.humidity}`;
  if (tempUnit) {
    tempreature.innerHTML = `Tempreature: ${Data.current.temp_c}`;
  } else {
    tempreature.innerHTML = `Tempreature: ${Data.current.temp_f}`;
  }

  condition.innerHTML = `Condition: ${Data.current.condition.text}`;

  switch (Data.current.condition.text) {
    case "Partly cloudy":
      weatherContainer.style.backgroundImage = "url('./cloudy.jpg')";
      break;

    case "Sunny":
      weatherContainer.style.backgroundImage = "url('./sunny.jpg')";
      break;

    case "Rainy":
      weatherContainer.style.backgroundImage = "url('./rainy.jpg')";
      break;

    default:
      break;
  }

  forecast(Data);
}

// to change tempreature in different unit
// From Celcius to fahrenhite and viseversa

tempToogle.addEventListener("click", function () {
  searchCount++;
  tempUnit = !tempUnit;

  if (removingCount > 0) {
    alert("Search city first");
    return;
  }

  if (tempUnit) {
    tempToogle.innerHTML = "C*";
  } else {
    tempToogle.innerHTML = "F*";
  }

  if (searchCount > 0) {
    for (let i = 0; i < 5; i++) {
      console.log("this works so fine");
      var toRemove = forecastContainer.querySelector("div");
      forecastContainer.removeChild(toRemove);
    }
  }

  submitAction();
});

submitButton.addEventListener("click", function () {
  if (searchCount === 0) {
    submitAction();
  }
});
