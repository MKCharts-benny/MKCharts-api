import React, {useState, useEffect} from 'react'
import resultService from './services/results'
import { useField } from "./hooks/index.js"

import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import Button from 'react-bootstrap/Button'

import './App.css';

const ResultInput = ({
  date, newDate, winner, second, third, last, setSecond, 
  setThird, setFourth, players, setPlayers, results, setResults}) => {
  const getId = () => (100000 * Math.random()).toFixed(0)
  const asObject = (date, players, winner) => {
    return {
      date,
      players,
      winner,
      id: getId()
    }
  }

  console.log(players);
  const addResult = (event) => {
    event.preventDefault()

    const newResult = asObject(date, players, winner)
    resultService.postResult(newResult)
      .then(setResults(results.concat(newResult)))
  }
  
  const numPlayers = [
    { name: '2', value: '2' },
    { name: '3', value: '3' },
    { name: '4', value: '4' },
  ];



  return(
    <div>
      <h3>Add New Results</h3>
        <form onSubmit={addResult}>
        <div >
          <table style={{margin: 'auto'}}>
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
                      value={r.value}
                      checked={players === r.value ? "checked" : ""}
                      onChange={({target})=>setPlayers(target.value)}
                    >
                    {r.name}
                    </ToggleButton>
                ))}
                </ToggleButtonGroup>
              </td>
          </tr>
          
                  <tr>
                    <td>Winner:</td>
                    <td>
                      <input {...winner} />
                    </td>
                  </tr>
                  <tr>
                    <td> Second:</td>
                    <td>
                      <input {...second} />
                    </td>
                  </tr>
                  <tr style={{display: players === '2' ? 'none' : '' }}>
                    <td>Third:</td>
                    <td>
                      <input {...third} />
                    </td>
                  </tr>
                  <tr style={{display: players !== '4' ? 'none' : '' }}>
                    <td>Fourth:</td>
                    <td>
                      <input {...last} />
                    </td>
                  </tr>
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
          
          </table>
          <div style={{textAlign: 'center', padding:'10px'}}><Button type="submit" variant="secondary">Submit</Button></div>
        </div>
        <datalist id="roomates">
          <option value="Benny"/>
          <option value="Kelven"/>
          <option value="Mihir"/>
          <option value="Abriel"/>
          <option value="Avery"/>
        </datalist>
      
      </form>
    </div>
  )
}

const Toggleable = (props) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <span>
      <span style={hideWhenVisible}>
        <button onClick={toggleVisibility}>
          {props.buttonLabel}
        </button>
      </span>
      <span style={showWhenVisible} className="togglableContent">
        <button onClick={toggleVisibility} className="toggleButton">hide</button>
        {props.children}
      </span>
    </span>
  )
}

const RecentGames = ({results}) => {
  const sortedResults = results.sort((a, b) => {
    var dateA = new Date(a.date);
    var dateB = new Date(b.date);
    return dateB - dateA;
  })
  const lastFiveResults = sortedResults.slice(0,5)

  return(
    <div>
      <h3>Recent Races</h3>
      <div style={{textAlign:'center'}}>
        {
          lastFiveResults.map(g =>{
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

  const winner = useField('winner')
  const second = useField('second')
  const third = useField('third')
  const last = useField('last')

  useEffect(()=>{
    resultService.getAll()
      .then(res => setResults(res))
  },[])

  return (
      <div className="container" >
        <div className='row' style={{backgroundColor:"red", textAlign: 'center'}}>
          <h2>Welcome to MKCharts</h2>
        </div>
        <div className='row' >
          <div className='col' >
            <ResultInput
              date={date}
              newDate={newDate}
              winner={winner}
              second = {second}
              third = {third}
              last = {last}
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
