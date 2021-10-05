import react, {useState} from 'react'

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