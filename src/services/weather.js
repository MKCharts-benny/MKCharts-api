
import axios from 'axios'

const APIKey = "e8bb8fb1042717249347617e4758b684"

const get = async (cityName) => {
    const response = await axios.get(`api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${APIKey}`)
    return (response.data)
  }

const weatherService = {get}

export default weatherService