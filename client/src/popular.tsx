
import { useEffect, useState } from "react";
import PopGames from "./popularGames";
import { Link } from "react-router-dom";


const Popular = () => {

const [res, setRes] = useState<any[]>([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(
              "http://localhost:8080/https://api.igdb.com/v4/popularity_primitives",
              {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Client-ID': '28k8glj9djgyr0opcwll92beduld5h',
                  'Authorization': 'Bearer fos399vwik27rr0m3tprazhvafx4zj',
                },
                body: `fields game_id, popularity_type,value;
                 limit 15;sort value desc;
                 
                 `,
              }
            );
            const data = await response.json();
            console.log(data)

            
            setRes(data);
            
          } catch (err) {
            console.error(err);
          }
        };
        fetchData();
      }, []);

    return (
        <>
        <div className="px-60 py-12 flex flex-col gap-12">
          <div className="">
        <h1 className="text-sec text-3xl chakra pb-1 font-bold">POPULAR RIGHT NOW</h1>
        <div className="w-24 h-[2px] bg-acc"></div>
          </div>
        <div className="flex justify-between px-2">
          
          <PopGames state={res} />
        
            
            </div>
        </div>
        </>
    )
}
export default Popular