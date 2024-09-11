import { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiStar } from '@mdi/js'


const TopRated = (props: any) => {

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
                'Authorization': 'Bearer ag34gl29glo4dukxxlx33gmei0j626',
              },
              body: `fields name,  total_rating, total_rating, cover.url, total_rating_count;
               where total_rating_count > 70;sort total_rating desc;limit 18;
               
               `,
            }
          );
          const data = await response.json();
          
          
  
          const gamesWithCovers = data.map((game: any, index: any) => ({
            ...game,
            coverUrl: game.cover ? game.cover.url.replace('t_thumb', 't_cover_big') : '',
            
          }));

          const first = []
          for(let i = 0; i < gamesWithCovers.length; i += 6){
            const chunk = gamesWithCovers.slice(i, i + 6);
first.push(chunk);
          }

          
          setRes(first);
          
        } catch (err) {
          console.error(err);
        }
      };
      fetchData();
    }, []);

   

 


    return(
        <>
         {res[props.state] ? 
        
            
        res[props.state].map((game: any) => (
            
            <div className=" bg-sec rounded-b-md min-w-[210px] max-w-[210px] sh3 hover:scale-[1.03]"  >
              <Link to={`/detail/${game.id}`} state={game.id} key={game.id} >
            <img src={game.coverUrl} className="w-full h-[250px] " alt="" />
            </Link>
            <div className="py-2">
            <Link to={`/detail/${game.id}`} state={game.id} key={game.id} >
            <p className="overflow-hidden text-nowrap text-ellipsis text-prim chakra text-xl p-2">{game.name}</p>
            </Link>
            {game.total_rating?
        <div className="py-[5px] px-3 float-end flex gap-1 items-center bg-sec rounded-xl mb-2 mr-2">
          <Icon path={mdiStar} size={0.8} className="text-acc" />
           <p className="text-prim "> {(game.total_rating/10).toFixed(1)} </p>
           
            </div>:
        <div className="py-[5px] px-3 bg-sec float-end flex gap-1 items-center rounded-xl mb-2 mr-2">
           <Icon path={mdiStar} size={0.8} className="text-acc" />
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
export default TopRated