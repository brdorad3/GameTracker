import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiStar,  mdiChevronLeft, mdiChevronRight  } from '@mdi/js'


const PopGames = (props: any) => {


   const [res, setRes] = useState<any[]>([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        const gameIds = props.state.map((slot: any) => slot.game_id).join(',');
        const response = await fetch(
          "http://localhost:8080/https://api.igdb.com/v4/games",
          {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Client-ID': '28k8glj9djgyr0opcwll92beduld5h',
              'Authorization': 'Bearer fos399vwik27rr0m3tprazhvafx4zj',
            },
            body: `fields name, total_rating, cover.url;
            where id = (${gameIds});
            limit 6;`, 
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
  
    if (props.state.length > 0) {
      fetchData();
    }
  }, [props.state]);
  
    return(
        <>
         {res ? 
       
            
        res.map((game: any) => (
            
            <div className=" bg-sec rounded-b-md min-w-[210px] max-w-[210px] sh3 hover:scale-[1.03]"  >
              <Link
                                to={`/detail/${game.id}`}
                                state={game.id}
                                key={game.id}
                                className=""
                            >
              {game.coverUrl &&
              <img src={game.coverUrl} className="w-full h-[250px] " alt="" />
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
        
        
      :
        <p>Loading...</p>
        }
        </>
    )
}
export default PopGames