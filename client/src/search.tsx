
import { useAuth } from "./authContext";
import Navbar from "./navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";

const Search = () => {

const { user } = useAuth();
const location = useLocation();
const [res, setRes] = useState<any[]>([])



useEffect(()=>{
fetch(
    "http://localhost:8080/https://api.igdb.com/v4/games",
    { method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Client-ID': '28k8glj9djgyr0opcwll92beduld5h',
        'Authorization': 'Bearer fos399vwik27rr0m3tprazhvafx4zj',
      },
      body: `search ${ JSON.stringify(location.state.value)}; fields name, id;limit 5;`
  })
    .then(async(response) => {
        
        setRes(await response.json())    })
    .catch(err => {
        console.error(err);
    });

  
},[location.state.value])

    return(
        <>
        <Navbar   />
        
        
        <ul className="flex flex-col gap-10 px-36 py-10">
                {res.map((game, index) => (
                    <li key={index} className="text-white flex">
                        <div className="w-[150px] h-[150px] bg-sec"></div>
                        <p className="text-white ">{game.name}</p>
                    </li>
                ))}
            </ul>
        </>
    )
}

export default Search;