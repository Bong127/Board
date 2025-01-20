import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {BrowserRouter, Link, Navigate, Route, Routes, useLocation, useParams} from 'react-router-dom'
import Read from './pages/board/Read'
import List from './pages/board/List'
import Insert from './pages/board/Insert'
import Update from './pages/board/Update'
import Home from './pages/Home'
function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/boards' element={<List/>}></Route>
        <Route path='/boards/:id' element={<Read/>}></Route>
        <Route path='/boards/insert' element={<Insert/>}></Route>
        <Route path='/boards/update/:id' element={<Update/>}></Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
