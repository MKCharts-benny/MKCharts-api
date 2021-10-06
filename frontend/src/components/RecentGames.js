import React, { useState,useEffect } from 'react'

const RecentGames = ({allResults}) => {
    let [recentResults, setRecentResults] = useState([]) 
  
    const sortedResults = allResults.sort((a, b) => {
      var dateA = new Date(a.date);
      var dateB = new Date(b.date);
      return dateB - dateA;
    })
  
    useEffect(()=>{
      setRecentResults(sortedResults.slice(0,5))
    },[allResults, sortedResults]) 
  
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

  export default RecentGames