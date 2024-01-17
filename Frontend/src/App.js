import React from 'react'
import Signup from './Signup'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Login from './Login'
import Dashboard from './Dashboard'
import Home from './Home'

function App() {
  return (
    <BrowserRouter>
        <div>
          <Routes>
            <Route path='/' element={<Home/>}></Route>
            <Route path='/register' element={<Signup/>}></Route>
            <Route path='/login' element={<Login/>}></Route>
            <Route path='/dashboard' element={<Dashboard/>}></Route>
          </Routes>
        </div>
    </BrowserRouter>
    
  )
}

export default App