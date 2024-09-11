import Navbar from "./navbar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiImageBroken } from '@mdi/js';



const Search = () => {
  const location = useLocation();
  const [res, setRes] = useState<any[]>([]);
  

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
            body: `search "${location.state.value}"; fields name, cover.url, first_release_date, platforms.name, total_rating, total_rating_count;
             where total_rating_count > 0;limit 20;
             
             `,
          }
        );
        const data = await response.json();
        
        

        const gamesWithCovers = data.map((game: any) => ({
          ...game,
          coverUrl: game.cover ? game.cover.url.replace('t_thumb', 't_cover_small') : '',
          rel: new Date(game.first_release_date * 1000).getFullYear(),
          
          
          
        }));
        
        setRes(gamesWithCovers);
        
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [location.state.value]);


  return (
    <>
      <Navbar />
      {
        res.length > 0 ?
      
      <ul className="flex flex-col gap-5 px-64 py-10">
        {res.map((game: any, index: any) => (
          <li key={index} className="flex gap-5 py-3 rounded-md sh10 mb-5 pl-10 bg-white">
            {game.coverUrl ? (
             <Link to={`/detail/${game.id}`} state={game.id} > <img src={game.coverUrl} alt={game.name} className="w-[80px] h-[106px] " /></Link>
            ) : (
              <div className="w-[110px] h-[140px]  rounded-xl flex justify-center items-center">
                <Icon path={mdiImageBroken} size={2} className="text-sec"/>
              </div>
              
            )}
            <div>
            <div className="flex gap-2 pt-3">
           <Link to={`/detail/${game.id}`} state={game.id}> <p className="text-sec text-xl font-medium hover:underline hover:underline-offset-2">{game.name}</p> </Link>
            <p className="text-sec text-xl">&#40; {game.rel} &#41;</p>
            </div>
            <div>
            <ul className="flex gap-1">
              
                  { game.platforms && game.platforms.map((platform: any, index: number) => (
                    <li key={index} className="text-sec text-[12px] ">{platform.name}       /</li>
                  ))}
                </ul>
            </div>
            <div>
              {game.total_rating ? 
            <p className="text-sec">{Math.floor(game.total_rating)}/100 &#40;{game.total_rating_count}&#41; </p>:
            <p className="text-sec">No ratings yet</p>  
            }
              
            </div>
            </div>
          </li>
        ))}
      </ul>:
      <div className="w-screen h-[92%] flex items-center justify-center"><h1 className="text-sec text-lg font-medium">No results</h1></div>
      

}
    </>
  );
};

export default Search;
