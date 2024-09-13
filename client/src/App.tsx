import './App.css'
import Navbar from './navbar'
import Reviews from './reviews'
import Popular from './popular'
import Rated from './rated'
import useAutoLogout from './autoLogout'
import Footer from './footer'

function App() {
  
useAutoLogout();

  return (
    <>
    <Navbar/>
    <Reviews/>
    <Popular/>
    <Rated/>
     <Footer/>
    </>
  )
}

export default App
