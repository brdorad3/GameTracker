
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
                 limit 10;sort value desc;
                 
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
        <div className="px-64 py-12 flex flex-col gap-12">
          <div className="flex justify-between">
        <h1 className="text-sec text-4xl">Popular right now</h1>
       <Link to="/top100"> <h2 className="text-sec self-end">See all</h2></Link>
          </div>
        <div className=" w-full h-96 pt-11 bg-sec">
          
          <PopGames state={res} />
        
            
            </div>
        </div>
        </>
    )
}
export default Popular