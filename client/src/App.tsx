import './App.css'
import axios from "axios"
import { useEffect, useState } from 'react'
import Navbar from './navbar'
import Reviews from './reviews'
import Popular from './popular'
import Rated from './rated'
import useAutoLogout from './autoLogout'

function App() {
  
useAutoLogout();

  return (
    <>
    <Navbar/>
    <Reviews/>
    <Popular/>
    <Rated/>
     
    </>
  )
}

export default App
