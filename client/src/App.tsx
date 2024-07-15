import './App.css'
import axios from "axios"
import { useEffect, useState } from 'react'
import Navbar from './navbar'
import Reviews from './reviews'
import Popular from './popular'
import Rated from './rated'


function App() {

  /*
const [test, setTest] = useState('')

const handleClick = async() => {
await axios.post("http://localhost:8080/https://api.igdb.com/v4/artworks","fields *;", {
  headers: {
    'Accept': 'application/json',
    'Client-ID': '28k8glj9djgyr0opcwll92beduld5h',
    'Authorization': 'Bearer fos399vwik27rr0m3tprazhvafx4zj',
    'x-requested-with': 'XMLHttpRequest',
  },

},
)  .then(function (response) {
  let data = JSON.parse(response.request.response);
  console.log(data)

  if (Array.isArray(data) && data.length > 0 && data[0].url) {
    const imageUrl = data[0].url;
    setTest(imageUrl);
    console.log(data);
    console.log(imageUrl);
  } else {
    console.error('Unexpected response structure:', data);
  }
})
.catch(function (error) {
  console.log(error);
});

}

*/


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
