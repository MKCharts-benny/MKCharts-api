import React, {useState, useEffect} from 'react'
import resultService from './services/results'
import ResultInput from './components/ResultInput'
import RecentGames from './components/RecentGames'

import weatherService from './services/weather'

import './App.css';

const App = () => {
  const [allResults, setResults] = useState([])
  const [weatherData, setWeatherData] = useState({})

  useEffect(()=>{
    resultService.getAll()
      .then(res => setResults(res))
    
    weatherService.get("waterloo")
      .then(res => setWeatherData(res.main))

  },[])

  if (weatherData.feels_like){
    console.log("Waterloo's Weather", weatherData);
  }
  return (
      <div className="container" >
        <div className='row' style={{textAlign: 'center'}}>
          <h2>KABAM MKCharts</h2>
          {weatherData.feels_like ? <p>Feels like {Math.floor(weatherData.feels_like)}deg C in Waterloo, ON</p>:""}
        </div>
        <div className='row' >
          <div className='col' >
            <ResultInput
              allResults={allResults}
              setResults={setResults}
            />
          </div>
          <div className='col'>
            <RecentGames
              allResults={allResults}
            />
          </div>
        </div>
      </div>
  )
}

export default App;
