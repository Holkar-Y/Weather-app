document.querySelector(".container").style.backgroundImage='url("https://images.unsplash.com/photo-1722029155911-369828fb91b4?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDIzfHx8ZW58MHx8fHx8")';

const input=document.querySelector(".input");
const btn=document.querySelector(".btn");
const cityName=document.querySelector(".cityName");
const error=document.querySelector(".error");
const temp=document.querySelector(".temp");
const feels=document.querySelector(".feels");
const max_temp=document.querySelector(".max-temp");
const min_temp=document.querySelector(".min-temp");
const humidity=document.querySelector(".humidity");
const wind=document.querySelector(".wind");
const locationBtn = document.querySelector(".location-btn");
const section2=document.querySelector(".section2");
const section3=document.querySelector(".section3");

function get(){
    if(input.value.trim()===""){
        error.innerText="*Please Enter City*"
        return;
    }
    else{
        getWeather(input.value);
        input.value="";
        error.innerText="";
        section2.classList.remove("hidden");
        section3.classList.remove("hidden");
    }
}
input.addEventListener("keydown",(e)=>{
    if(e.key==="Enter"){
        get();
    }
})
btn.addEventListener("click",()=>{
    get();
})

locationBtn.addEventListener("click", () => {
    if(!navigator.geolocation){
        error.innerText="Geolocation is not supported";
        return;
    }
    navigator.geolocation.getCurrentPosition(
        async (position) => {
            const lat = position.coords.latitude;
            const lon = position.coords.longitude;

            try{
                const api_key = "9a56f84478867f089529fe90b6c76a06";
                const url =
                `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`;

                const response = await fetch(url);
                const data = await response.json();
                updateWeatherUI(data);
                section2.classList.remove("hidden");
                section3.classList.remove("hidden");

            }catch(error){
                console.error(error);
                error.innerText="*Unable to fetch weather*"
            }error.innerText=""
        },
        () => {
            error.innerText="*Location permission denied*";
        }
    );error.innerText="";
});


// https://pro.openweathermap.org/data/2.5/forecast/hourly?q={city name}&appid={API key}
async function getWeather(city){
    let data;
    try{
        const api_key="9a56f84478867f089529fe90b6c76a06";
        const url=`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api_key}&units=metric`;

        const response= await fetch(url);
        data= await response.json();

        if(data.cod=="404"){
            error.innerText="*City not found*";            
            return;
        }
        error.innerText="";
    }
    catch(error){
        error.innerText="*Network error*"
    }error.innerText="";

    const weather= data.weather[0].main;
    if(weather==="Clear"){
        document.querySelector(".container").style.backgroundImage='url("https://images.unsplash.com/photo-1776242315240-ce7afa602e3b?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTh8fGNsZWFyJTIwd2VhdGhlciUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D")';
    }
    else if(weather==="Rain" || weather==="Drizzle"){
        document.querySelector(".container").style.backgroundImage='url("https://plus.unsplash.com/premium_photo-1671229652411-4468b946b787?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTF8fHJhaW4lMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D")';
    }
    else if(weather==="Clouds"){
        document.querySelector(".container").style.backgroundImage='url("https://plus.unsplash.com/premium_photo-1667143329632-6cfb18f6fe7f?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE2fHx8ZW58MHx8fHx8")';
    }
    else if(weather==="Thunderstorm"){
        document.querySelector(".container").style.backgroundImage='url("https://images.unsplash.com/photo-1691438929124-ad2ea67dd190?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTR8fFRodW5kZXJzdG9ybSUyMHdhbGxwYXBlcnxlbnwwfHwwfHx8MA%3D%3D")';
    }
    else if(weather==="Haze" || weather==="Mist" || weather==="Fog" || weather==="Smoke"){
        document.querySelector(".container").style.backgroundImage='url("https://images.unsplash.com/photo-1485236715568-ddc5ee6ca227?w=1000&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8bWlzdCUyMHdlYXRoZXIlMjB3YWxscGFwZXJ8ZW58MHx8MHx8fDA%3D")';
    };
    updateWeatherUI(data)
}
function updateWeatherUI(data){

    cityName.innerText = data.name;
    temp.innerText = `${Math.round(data.main.temp)}°C`;
    feels.innerText = data.weather[0].description;
    max_temp.innerText = `${Math.round(data.main.temp_max)}°C`;
    min_temp.innerText = `${Math.round(data.main.temp_min)}°C`;
    humidity.innerText = `${data.main.humidity}%`;
    wind.innerText = `${data.wind.speed}m/s`;

}