import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './component/Navbar'
import Home from './content/Home'
import ManageData from './content/ManageData'
import { BrowserRouter, Routes, Route } from "react-router-dom";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <BrowserRouter>
        <Navbar/>
          <Routes>
            <Route>
            <Route path='/' element={<Home />}/>
            <Route path='/manage-data' element={<ManageData />}/>
            </Route>    
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
