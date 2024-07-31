import { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiStar } from '@mdi/js'


const PopGames = (props: any) => {


   const [res, setRes] = useState<any[]>([])

   const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    
    slidesToScroll: 1,
    
  };

    useEffect(() => {
        const fetchData = async () => {
          try {
          const responses = await Promise.all(
            props.state.map((slot: any) => {
                return fetch(
                    "http://localhost:8080/https://api.igdb.com/v4/games",
                    {
                      method: 'POST',
                      headers: {
                        'Accept': 'application/json',
                        'Client-ID': '28k8glj9djgyr0opcwll92beduld5h',
                        'Authorization': 'Bearer fos399vwik27rr0m3tprazhvafx4zj',
                      },
                      body: `fields name, aggregated_rating, cover.url;
                      where id = ${slot.game_id};
                       
                       
                       `,
                    }
                  );
            })
           )

           const data2 = await Promise.all(responses.map((response) => response.json()));
           console.log(data2)
           const data = data2.map((item) => item[0]);

           const forCover = data.map((game: any) =>({
            ...game,
            coverUrl: game.cover ? game.cover.url.replace('t_thumb', 't_cover_big') : '',
            
    }))

           
         setRes(forCover);
            
          } catch (err) {
            console.error(err);
          }
        };
        fetchData();
        
      }, [props.state]);

    return(
        <>
         {res ? 
        <Slider  {...settings}>
            
        {res.map((game: any) => (
            <Link to={`/detail/${game.id}`} state={game.id} key={game.id} className="bg-prim rounded-sm max-w-[190px]">
            <div className="max-w-[190px]  bg-prim rounded-md border-4 border-prim"  >
            <img src={game.coverUrl} className="w-full h-[220px]" alt="" />
            <p className="overflow-hidden text-nowrap text-ellipsis text-sec patrick text-2xl p-1">{game.name}</p>
            {game.aggregated_rating?
        <div className="py-[1px] px-3 text-sec float-end flex items-center bg-sec rounded-xl mb-2 mr-2 ">
           <p className="text-prim"> {(game.aggregated_rating/10).toFixed(1)} </p>
           <Icon path={mdiStar} size={0.8} className="text-prim" />
            </div>:
        <div className="py-[1px] px-3 bg-sec float-end flex items-center rounded-xl mb-2 mr-2">
        <p className="text-prim"> N/A </p>
        <Icon path={mdiStar} size={0.8} className="text-prim" />
         </div>  
        }
            
        </div>
        </Link>

        ))}
        
        
        </Slider>:
        <p>Loading...</p>
        }
        </>
    )
}
export default PopGames