
import { useEffect, useState } from "react";
import PopGames from "./popularGames";


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
                 limit 8;sort value desc;
                 
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
        <div className="px-36 py-12 flex flex-col gap-12">
        <h1 className="text-sec text-4xl">Popular right now</h1>
        <div className=" w-full h-96 pl-10 pt-11 bg-sec">
          {res ?
          <PopGames state={res} />:
          <p className="text-3xl text-prim">Loading</p>
        }
            
            </div>
        </div>
        </>
    )
}
export default Popular