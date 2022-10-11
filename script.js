const wrapper = document.querySelector(".wrapper")
infoTxt = document.querySelector(".info-txt")
input = document.querySelector(".city-name")
locationBtn = document.querySelector(".button")
weatherIcon = document.querySelector("section img")
arrowBack = document.querySelector("header i")

let apiKey = "8590363f7776e8481222450ead33a7c8";
let api;


input.addEventListener("keyup", e => {
  if(input.value != "" && e.key == "Enter"){
    requestApi(input.value)
  }
})


locationBtn.addEventListener("click", () => {
  if(navigator.geolocation){
    navigator.geolocation.getCurrentPosition(onSuccess, onError)
  }else {
    infoTxt.innerText = "Problem with your browser!"
    infoTxt.classList.add("error");
  }
})


function onSuccess(position) {
    const latitude = position.coords.latitude
    const longitude = position.coords.longitude

    api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${apiKey}`
    fetchData()
}

function onError(error) {
  infoTxt.innerText = error.message;
  infoTxt.classList.add("error");
}


function requestApi(city) {
  api = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`
  fetchData()
}


function fetchData() {
  fetch(api).then(response => response.json()).then(result => weatherDetails(result))
  infoTxt.innerText = "Getting weather!"
  infoTxt.classList.add("pending")
}


function weatherDetails(info) {
    if(info.cod == 404) {
      infoTxt.classList.replace("pending", "error")
      infoTxt.innerText = info.message
    }else {
      wrapper.classList.add("active")

      const name = info.name;
      const country = info.sys.country
      const feels_like = info.main.feels_like
      const humidity = info.main.humidity
      const temp = info.main.temp
      const description = info.weather[0].description
      const id = info.weather[0].id

      if(id >= 200 && id <= 232) {
        weatherIcon.src = "icons/storm.svg"
      }

      if(id >= 300 && id <= 321 || id >= 500 & id <= 531) {
        weatherIcon.src = "icons/rain.svg"
      }
      
      if(id >= 600 && id <= 622) {
        weatherIcon.src = "icons/snow.svg"
      }
      
      if(id >= 701 && id <= 781) {
        weatherIcon.src = "icons/haze.svg"
      }
      
      if(id == 800 ) {
        weatherIcon.src = "icons/clear.svg"
      }
      
      if(id >= 801 && id <= 804) {
        weatherIcon.src = "icons/cloud.svg"
      }


      wrapper.querySelector(".temp .numb").innerText = Math.floor(temp)
      wrapper.querySelector(".temp .numb-2").innerText = Math.floor(feels_like)
      wrapper.querySelector(".weather").innerText = description
      wrapper.querySelector(".location span").innerText = `${name}, ${country}`
      wrapper.querySelector(".humidity span").innerText = humidity

    }
}


arrowBack.addEventListener("click", () => {
    wrapper.classList.remove("active")
    input.value = ""
    infoTxt.classList.remove("pending", "error")
})