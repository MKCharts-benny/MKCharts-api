
import axios from 'axios'

//Router? 

const APIKey = "e8bb8fb1042717249347617e4758b684"

const get = async (cityName) => {
    const response = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}&units=metric`)
    return (response.data)
  }

const weatherService = {get}

export default weatherService