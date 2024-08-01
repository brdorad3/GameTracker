import Navbar from "./navbar"
import { useEffect, useState } from "react";
import Icon from '@mdi/react';
import { mdiStar } from '@mdi/js'
import { Link } from "react-router-dom";


const cat = (item: any) => {
    if(item == 0) return "Main game";
    else if(item == 1) return "DLC";
    else if(item == 2) return "Expansion";
    else if(item == 3) return "Bundle";
    else if(item == 4) return "Standalone expansion";
    else if(item == 5) return "Mod";
    else if(item == 6) return "Episode";
    else if(item == 7) return "Season";
    else if(item == 8) return "Remake";
    else if(item == 9) return "Remaster";
    else if(item == 10) return "Expanded game";
    else if(item == 11) return "port";
    else if(item == 12) return "Fork";
    else if(item == 13) return "Pack";
    else if(item == 14) return "Upate"
}

const Top100 = () => {

    const [res, setRes] = useState<any[]>([])

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await fetch(
              "http://localhost:8080/https://api.igdb.com/v4/games",
              {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Client-ID': '28k8glj9djgyr0opcwll92beduld5h',
                  'Authorization': 'Bearer fos399vwik27rr0m3tprazhvafx4zj',
                },
                body: `fields name,  total_rating, total_rating, cover.url, total_rating_count, first_release_date, category;
                 where total_rating_count > 90;sort total_rating desc;limit 100;
                 
                 `,
              }
            );
            const data = await response.json();
           
            
    
            const gamesWithCovers = data.map((game: any, index: any) => ({
              ...game,
              coverUrl: game.cover ? game.cover.url.replace('t_thumb', 't_cover_small') : '',
              rel: new Date(game.first_release_date * 1000).getFullYear(),
            }));
  
            console.log(gamesWithCovers)
            setRes(gamesWithCovers);
            
          } catch (err) {
            console.error(err);
          }
        };
        fetchData();
      }, []);

return(
    <>
    <Navbar/>
    <div className="mx-64 bg-sec ">
        <div className=" h-40 border-black border-2 pl-5 pt-4">
            <h1 className="text-3xl pb-3">Top 100 games</h1>
            <div className="">
                
                <form action="#" className="flex gap-5">
                    <div className="flex flex-col">
                    <label className="p-1 text-lg" htmlFor="platform">Platform:</label>
                    <input type="text" className="rounded-md h-9 w-80 p-1" placeholder="Xbox 360 " id="platform" />
                    </div>
                    <div className="flex flex-col">
                    <label className="p-1 text-lg" htmlFor="year">Year:</label>
                    <input type="text" className="rounded-md h-9 w-80 p-1" placeholder="2015 " id="year" />
                    </div>
                    
                </form>
            </div>
        </div>
        <div className="px-10 py-5 flex flex-col gap-5 ">
            {res &&
            res.map((slot:any, index) => (
                <div className="flex justify-between border-b-2 border-prim py-5">
                    <div className="flex gap-5">
                <img src={slot.coverUrl} alt="" />
                <div className="flex flex-col">
                    <div className="flex pt-2">
                    <p className=" text-lg">{index + 1}. </p>
                    <Link to={`/detail/${slot.id}`} state={slot.id}><h3 className=" text-lg">{slot.name}</h3></Link>
                    </div>
                    <div className="flex gap-2">
                        <p>{slot.rel}</p>
                        <p>	&#40;{slot.total_rating_count} total ratings	&#41;</p>
                    </div>
                    <div>
                        <p>{cat(slot.category)}</p>
                    </div>
                </div>
                </div>
                <div className="flex items-center">
                    <p>{(slot.total_rating/10).toFixed(1)}/10</p>
                    <Icon path={mdiStar} size={0.8} className="text-prim" />
                </div>
                </div>
            ))
            }
        </div>
    </div>
    </>
)
}

export default Top100