import React, {useState, useEffect} from 'react'
import resultService from './services/results'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import Button from 'react-bootstrap/Button'

import './App.css';

const ResultInput = ({
  date, newDate, winner, setWinner, second, third, fourth, setSecond, 
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
  
  const radios = [
    { name: '2', value: '2' },
    { name: '3', value: '3' },
    { name: '4', value: '4' },
  ];

  {        
  // <div>
  //   # of Players
  //     <input type='radio' name='players' value='2' onChange={({target})=>setPlayers(target.value)}/>
  //     <label htmlFor='2'>2</label>
  //     <input type='radio' name='players' value='3' onChange={({target})=>setPlayers(target.value)}/>
  //     <label htmlFor='3'>3</label>
  //     <input type='radio' name='players' value='4' onChange={({target})=>setPlayers(target.value)}/>
  //     <label htmlFor='4'>4</label>
  // </div>
  }

  return(
    <div>
      <h3>Add New Results</h3>
        <form onSubmit={addResult}>

        <div>
        <div># of Players:</div> 
        <ToggleButtonGroup className="mb-2" name="players">
          {radios.map((r, idx) => (
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
        </div>
        <div style={{display: players === '' ? 'none' : '' }} >
          <div>
            <p>
            <label for="winner">Winner:</label>
            <input  
              name="winner"
              type="text"
              list="roomates"
              id='winner' 
              value={winner} 
              onChange={({target})=>setWinner(target.value)}
            />
            </p>
            </div>
            <div>

            <p>
              <label for="second" > Second:</label>
              <input
                name="second"
                type="text"
                list="roomates"
                id='second'
                value={second}
                onChange={({target})=>setSecond(target.value)}
              />
            </p>

            </div>
            <div style={{display: players === '2' ? 'none' : '' }} >
            <p>
              <label for='third'>Third:</label>
              <input
                name="third"
                type="text"
                list="roomates"
                id='third'
                value={third}
                onChange={({target})=>setThird(target.value)}
              />
            </p>
            </div>
            <div style={{display: players !== '4' ? 'none' : '' }} >
            
            <p>
              <label for="fourth">Fourth:</label>
              <input
                name="fourth"
                type="text"
                list="roomates"
                id='fourth'
                value={fourth}
                onChange={({target})=>setFourth(target.value)}
              />
            </p>
            </div>
          <div>
            Date: 
            <input 
              name="date"
              type="date"
              id='date' 
              value={date} 
              onChange={({target})=>newDate(target.value)}
            />
          </div>
        </div>
        <div>
          <Button type="submit" variant="secondary">Submit</Button>
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
      {
        lastFiveResults.map(g =>{
          return(
            <div key={g.id}>
              <b>{`${g.winner}`}</b> {` - Game on ${g.date}`}
            </div>
          )
        })
      }
    </div>
  )
}

const App = () => {
  const [results, setResults] = useState([]) 
  const [winner, setWinner] = useState('') 
  const [second, setSecond] = useState('') 
  const [third, setThird] = useState('') 
  const [fourth, setFourth] = useState('') 
  const [date, newDate] = useState('') 
  const [players, setPlayers] = useState('4') 

  useEffect(()=>{
    resultService.getAll()
      .then(res => setResults(res))
  },[])

  return (
      <div className="container">
        <h2>Welcome to MKCharts</h2>
        <div>
          <ResultInput
            date={date}
            newDate={newDate}
            winner={winner}
            setWinner={setWinner}
            players={players}
            setPlayers={setPlayers}
            results={results}
            setResults={setResults}
          />
        </div>
        <div>
          <RecentGames
            results={results}
          />
        </div>
      </div>
  )

  }

export default App;
