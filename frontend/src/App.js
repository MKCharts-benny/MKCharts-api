import React, {useState, useEffect} from 'react'
import resultService from './services/results'
import weatherService from './services/weather'
import { useField } from "./hooks/index.js"

import './App.css';

import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import Button from 'react-bootstrap/Button'

const ResultInput = ({
date, newDate, winner, second, third, fourth, 
players, setPlayers,results, setResults}) => {

  const numPlayers = ['2','3','4']
  const playerNames = ['Abriel','Avery','Benny','Kelven','Mihir']

  weatherService.get("montreal").then(res => console.log(res))

  const getId = () => (100000 * Math.random()).toFixed(0)
  const asObject = (date, players, winner) => {
    return {
      date,
      players,
      winner,
      id: getId()
    }
  }

  const addResult = (event) => {
    event.preventDefault()

    const newResult = asObject(date, players, winner.value)
    resultService.postResult(newResult)
      .then(setResults(results.concat(newResult)))
  }
  
  return(
    <div>
      <h3>Add New Results</h3>
        <form onSubmit={addResult}>
          <table style={{margin: 'auto'}}>
            <tbody>
              <tr>
                  <td># of Players:</td>
                  <td style={{textAlign: 'center'}}>
                    <ToggleButtonGroup className="mb-2" name="players">
                      {numPlayers.map((r, idx) => (
                        <ToggleButton
                          key={idx}
                          id={`radio-${idx}`}
                          type="radio"
                          variant="secondary"
                          name="radio"
                          value={r}
                          checked={players === r ? "checked" : ""}
                          onChange={({target})=>{
                            setPlayers(target.value)}}
                        >
                        {r}
                        </ToggleButton>
                    ))}
                    </ToggleButtonGroup>
                  </td>
              </tr>

                  <tr>
                    <td>Winner</td>
                    <td><input {...winner}/></td>
                  </tr>
                  <tr>
                    <td>Second</td>
                    <td><input {...second}/></td>
                  </tr>
                  <tr>
                    <td>Third</td>
                    <td >
                    <input 
                    {...third}
                    />
                    </td>
                  </tr>
                  <tr>
                    <td>Fourth</td>
                    <td><input {...fourth}/></td>
                  </tr>
                            

                  <datalist id="roomates">
                      {playerNames.map(p => (
                        <option value={p}/>
                      ))}
                    </datalist>
              <tr>
                <td>Date:</td>
                <td>
                  <input
                    name="date"
                    type="date"
                    id='date'
                    value={date}
                    onChange={({target})=>newDate(target.value)}
                  />
                </td>
              </tr>
            </tbody>
          </table>
          <div style={{textAlign: 'center', padding:'10px'}}><Button type="submit" variant="secondary">Submit</Button></div>
      </form>
    </div>
  )
}

const RecentGames = ({results}) => {
  let [recentResults, setRecentResults] = useState([]) 

  const sortedResults = results.sort((a, b) => {
    var dateA = new Date(a.date);
    var dateB = new Date(b.date);
    return dateB - dateA;
  })

  useEffect(()=>{
    setRecentResults(sortedResults.slice(0,5))
  },[results]) 

  return(
    <div>
      <h3>Recent Races</h3>
      <div style={{textAlign:'center'}}>
        {
          recentResults.map(g =>{
            return(
              <div key={g.id}>
                <b>{`Winner: ${g.winner}`}</b> {` - Game on ${g.date}`}
              </div>
            )
          })
        }
      </div>
    </div>
  )
}

const App = () => {
  const [results, setResults] = useState([])
  const [date, newDate] = useState('') 
  const [players, setPlayers] = useState('4') 

  const winner = useField('winner', players)
  const second = useField('second', players)
  const third = useField('third', players)
  const fourth = useField('fourth', players)

  console.log("results", results);

  useEffect(()=>{
    resultService.getAll()
      .then(res => setResults(res))
  },[])

  return (
      <div className="container" >
        <div className='row' style={{backgroundColor:"red", textAlign: 'center'}}>
          <h2>KABAM MKCharts</h2>
        </div>
        <div className='row' >
          <div className='col' >
            <ResultInput
              date={date}
              newDate={newDate}
              winner={winner}
              second = {second}
              third = {third}
              fourth = {fourth}
              players={players}
              setPlayers={setPlayers}
              results={results}
              setResults={setResults}
            />
          </div>
          <div className='col'>
            <RecentGames
              results={results}
            />
          </div>
        </div>
      </div>
  )
}

export default App;
