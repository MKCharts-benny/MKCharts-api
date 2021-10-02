   
import { useState } from "react"

export const useField = (result) => {
  const [value, setValue] = useState("")

	const id = result
	const name = result
	const list = "roomates"
	const type = "text"
  
  const onChange = (e) => {setValue(e.target.value)}

  return {
		name,
		id,
		type,
    list,
    value,
    onChange
  }
}