import './App.css';
import { useState} from 'react';
import LoadImage from '../src/images/icegif-1263.gif'
import {NotificationContainer, NotificationManager} from 'react-notifications';
import 'react-notifications/lib/notifications.css';

function App() {
 let [city, setCity] = useState('')
 let [weatherData, setWeatherData] = useState()
 let [loading, setloading] = useState(false)

 let getCityData= (event)=>{
  event.preventDefault();
  if(city!='')
  {
  setloading(true);
  console.log(city);
  //&lat={lat}&lon={lon}
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=bd6016c523124d219fa1ef1cb56f1171&units=metric`)
    .then((resJ)=>resJ.json())
    .then((finilizeJson)=>{
      if(finilizeJson.cod === "404")
        {
         setWeatherData(undefined)
        NotificationManager.error('Not Found');
        }
      else {
        console.log(finilizeJson)
        setWeatherData(finilizeJson)
      }
      setloading(false)
    })
    
    
    setCity('')
  }
  else
    {
        // toast.error("Input Field is Empty")
        NotificationManager.error('Input Field is Empty');
        // alert("")
    }
 }
  return (
    <div className="w-[100%] h-[100vh] bg-[#4aacb1]">
      {/* <ToastContainer/> */}
      <NotificationContainer/>
        <div className='max-w-[1320px] mx-auto'>
            <h1 className='text-[40px] font-bold py-[50px] text-white'>Weather App</h1>
            <form onSubmit={getCityData}>
                  <input type='text' value={city} className='w-[300px] h-[40px] pl-3 me-2' placeholder='Enter City' onChange={(e)=>setCity(e.target.value)}/>
                  <button className='bg-[#155e75] text-white font-bold p-[10px_20px] rounded-20px'>Find Weather</button>
            </form>

            <div className="w-[400px] mx-auto bg-white shadow-lg mt-[40px] p-[25px] round">
                  <img src={LoadImage} className={`${loading?'':'hidden'}`}/>
                    { 
                      
                        weatherData!==undefined?
                          <>
                              <h3 className="font-bold text-[30px]"> {weatherData.name},<span className="bg-[yellow]"> {weatherData.sys.country}</span></h3>
                                              
                                              <h2 className="font-bold text-[40px]">
                                                 {weatherData.main.temp}°C
                                              </h2>
                                              <img src={`https://openweathermap.org/img/w/${weatherData.weather[0].icon}.png`} alt='Weather Type'/>
                                              <p> Weather: {weatherData.weather[0].main}</p>
                                              <p> Discription: {weatherData.weather[0].description.toUpperCase()}</p>
                                              <p> Humidity: {weatherData.main.humidity}%</p>
                                              <p> Wind: {weatherData.wind.speed}%</p>


                          </>
                        :
                        <h1>Data Not Found</h1>
                    }
                    
            </div>
        </div>
    </div>
  );
}

export default App;
