import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Register from './components/Register'
import Feed from './components/Feed'
import SingleImage from './components/ImageViewer'
export default function App() {
  return (
    <div className='container'>
      <Router>
        <Routes>
          <Route path='/' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>
          <Route exact path='/feed' element={<Feed/>}/>
          <Route exact path='/image/:id' element={<SingleImage/>}/>
        </Routes>
      </Router>
    </div>
  )
}
