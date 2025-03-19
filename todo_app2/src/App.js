import React, { useState } from 'react'
import Parent from './components/Parent'
import './components/All.css';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import LightModeIcon from '@mui/icons-material/LightMode';
import Button from '@mui/material/Button';

const App = () => {
  const [color, setColor] = useState(true);
  const changeColor = () => {
    setColor(!color)
  }

  return (
    <div>
      <div className={color ? 'theame-color-white' : 'theame-color-black'}>
      <div className="center-button">
        <Button variant="outlined" onClick={changeColor} >
        {color ? <NightsStayIcon /> : <LightModeIcon />}
        </Button>
        </div>
        <Parent color={color} />
      </div>
    </div>
  )
}

export default App