   
import { useState } from "react"

export const useField = (result, playerCount) => {
  let [value, setValue] = useState("")

	const id = `${result}Input`
	const position = result
	const type = "text"
  const list = "roomates"
  let onChange = (e) => {
    console.log("onChange", e.target.value);
    setValue(e.target.value)}

  if (((result === "fourth" && (playerCount === "2" || playerCount === "3")) || 
    (result === "third" && playerCount === "2"))){

      const disabled="disabled"

      if(value !== ""){
        setValue("")
      }
      
      return{
          position,
          id,
          type,
          value,
          disabled,
          onChange
      }
  }

  return {
		position,
		id,
		type,
    value,
    list,
    onChange
  }
}