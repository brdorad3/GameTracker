import Navbar from "./navbar"
import { useLocation, Link } from "react-router-dom"
import { useEffect, useState } from "react";
import Icon from "@mdi/react";
import { mdiStar } from "@mdi/js";

const PopularList = () => {

    const location = useLocation();
    const [res, setRes] = useState<any[]>([])
    

    useEffect(() => {
        const fetchData = async () => {
          try {
            const gameIds = location.state.map((slot: any) => slot.game_id).join(',');
            
            const response = await fetch(
              "http://localhost:8080/https://api.igdb.com/v4/games",
              {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Client-ID': '28k8glj9djgyr0opcwll92beduld5h',
                  'Authorization': 'Bearer ag34gl29glo4dukxxlx33gmei0j626',
                },
                body: `fields name, total_rating, cover.url;
                where id = (${gameIds});limit 50;
                `, 
              }
            );
      
            const data = await response.json();
            const forCover = data.map((game: any) => ({
              ...game,
              coverUrl: game.cover ? game.cover.url.replace('t_thumb', 't_cover_big') : '',
            }));
      
            setRes(forCover);
          } catch (err) {
            console.error(err);
          }
        };
      
        if (location.state.length > 0) {
          fetchData();
          
        }
      }, [location.state]);

    return(
        <>
    <Navbar/>
    <div className="grid grid-cols-6 px-64 py-24 gap-y-10 max-sm:px-1 max-sm:grid-cols-2 max-sm:justify-items-center">
    {res &&
   res.map((game) => (
    <div className=" bg-sec rounded-b-md min-w-[210px] max-w-[210px] sh3 hover:scale-[1.03] max-sm:min-w-[170px] max-sm:max-w-[170px]"  >
    <Link
                      to={`/detail/${game.id}`}
                      state={game.id}
                      key={game.id}
                      className=""
                  >
    {game.coverUrl &&
    <img src={game.coverUrl} className="w-full h-[250px] rounded-sm max-sm:h-[220px]" alt="" />
}
</Link>
  
  <div className="py-2">
  <Link to={`/detail/${game.id}`}  state={game.id} key={game.id}>
  <p className="overflow-hidden text-nowrap text-ellipsis text-prim chakra text-xl p-2">{game.name}</p>
  </Link>
  {game.total_rating?
<div className="py-[5px] px-3  float-end flex items-center gap-1 bg-sec rounded-xl mb-2 mr-2 ">
 <Icon path={mdiStar} size={0.8} className="text-acc " />
 <p className="text-prim "> {(game.total_rating/10).toFixed(1)} </p>

  </div>:
<div className="py-[5px] px-3 bg-sec float-end flex gap-1 items-center rounded-xl mb-2 mr-2">
<Icon path={mdiStar} size={0.8} className="text-acc " />
<p className="text-prim"> N/A </p>

</div>  
}
  </div>
</div>
   ))
    }
    </div>
    
        </>
    )
}
export default PopularList