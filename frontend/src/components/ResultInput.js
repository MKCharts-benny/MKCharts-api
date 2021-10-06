import React, { useState } from 'react'
import { useField } from "../hooks/index.js"
import resultService from '../services/results'
import ToggleButton from 'react-bootstrap/ToggleButton'
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup'
import Button from 'react-bootstrap/Button'

const ResultInput = ({ allResults, setResults }) => {
    const [date, newDate] = useState('') 
    const [playerCount, setPlayerCount] = useState('4') 
  
    const winner = useField('winner', playerCount)
    const second = useField('second', playerCount)
    const third = useField('third', playerCount)
    const fourth = useField('fourth', playerCount)
  
    const numPlayerCount = ['2','3','4']
    const playerNames = ['Abriel','Avery','Benny','Kelven','Mihir']
  
    //getId for local dev (db.json server)
    const getId = () => (100000 * Math.random()).toFixed(0)
    const asObject = (date, playerCount, winner) => {
      return {
        date,
        playerCount,
        winner,
        id: getId()
      }
    }
  
    const addResult = (event) => {
      event.preventDefault()
  
      const newResult = asObject(date, playerCount, winner.value)
      resultService.postResult(newResult)
        .then(setResults(allResults.concat(newResult)))
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
                      <ToggleButtonGroup className="mb-2" name="playerCount">
                        {numPlayerCount.map((r, idx) => (
                          <ToggleButton
                            key={idx}
                            id={`radio-${idx}`}
                            type="radio"
                            variant="secondary"
                            name="radio"
                            value={r}
                            checked={playerCount === r ? "checked" : ""}
                            onChange={({target})=>{setPlayerCount(target.value)}}
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
                  <td><input {...third}/></td>
                </tr>
                <tr>
                  <td>Fourth</td>
                  <td><input {...fourth}/></td>
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
              </tbody>
              
            </table>
            <datalist 
              id="roomates">
              {playerNames.map((p, idx) => (
                <option
                  key={idx} 
                  value={p}
                />
              ))}
            </datalist>
            <div style={{textAlign: 'center', padding:'10px'}}>
              <Button type="submit" variant="secondary">Submit</Button>
            </div>
        </form>
      </div>
    )
  }

  export default ResultInput