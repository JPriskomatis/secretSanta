import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ListOfPeople from './components/ListofPeople'
import Snowfall from 'react-snowfall'
import DisplayPeople from './components/DisplayPeople'
import RandomImages from './components/RandomImages'


function App() {
  const [count, setCount] = useState(0)

  return (
    <div>
      <div>
          <RandomImages/>
      </div>
      <div>
          <Snowfall
            snowflakeCount={100}
          />
          <Snowfall
            color='gold'
            snowflakeCount={100}
          />
          <Snowfall
            color='red'
            snowflakeCount={100}
          />
      </div>


      <div className='relative z-10'>
          <ListOfPeople/>
      </div>


    </div>
    
  )
}

export default App
