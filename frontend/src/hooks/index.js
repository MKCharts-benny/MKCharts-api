   
import { useState } from "react"

export const useField = (result, players) => {
  const [value, setValue] = useState("")

	const id = result
	const name = result
	const type = "text"
  const list = "roomates"
  let disabled =""

  if (((result === "fourth" && (players === "2" || players === "3")) || 
      (result === "third" && players === "2"))){
      disabled="disabled"
  }

  const onChange = (e) => {setValue(e.target.value)}

  return {
		name,
		id,
		type,
    value,
    list,
    disabled,
    onChange
  }
}