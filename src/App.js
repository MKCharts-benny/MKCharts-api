import React, {useState, useEffect} from 'react'
import resultService from './services/results'

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
  
  return(
    <div>
      <h3>Add New Results</h3>
      <form onSubmit={addResult}>
        <div>
          # of Players
            <input type='radio' name='players' value='2' onChange={({target})=>setPlayers(target.value)}/>
            <label htmlFor='2'>2</label>
            <input type='radio' name='players' value='3' onChange={({target})=>setPlayers(target.value)}/>
            <label htmlFor='3'>3</label>
            <input type='radio' name='players' value='4' onChange={({target})=>setPlayers(target.value)}/>
            <label htmlFor='4'>4</label>
        </div>
        <div style={{display: players === '' ? 'none' : '' }} >
          <div>
            Winner:
            <input  
              name="winner"
              type="text"
              list="roomates"
              id='winner' 
              value={winner} 
              onChange={({target})=>setWinner(target.value)}
            />
            </div>
            <div>
            Second:
            <input  
              name="second"
              type="text"
              list="roomates"
              id='second' 
              value={second} 
              onChange={({target})=>setSecond(target.value)}
            />
            </div>
            <div style={{display: players === '2' ? 'none' : '' }} >
            Third:
            <input
              name="third"
              type="text"
              list="roomates"
              id='third' 
              value={third} 
              onChange={({target})=>setThird(target.value)}
            />
            </div>
            <div style={{display: players !== '4' ? 'none' : '' }} >
            Fourth:
            <input
              name="fourth"
              type="text"
              list="roomates"
              id='fourth' 
              value={fourth} 
              onChange={({target})=>setFourth(target.value)}
            />
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
        <button type="submit">Submit</button>

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
  const [players, setPlayers] = useState('') 

  useEffect(()=>{
    resultService.getAll()
      .then(res => setResults(res))
  },[])

  return (
    <div>
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
