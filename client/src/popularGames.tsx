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
    slidesToShow: 6,
    
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
                      body: `fields name, total_rating, cover.url;
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
            <Link to={`/detail/${game.id}`} state={game.id} key={game.id} className="bg-sec rounded-sm max-w-[210px]">
            <div className=" bg-sec rounded-md "  >
            <img src={game.coverUrl} className="w-full h-[250px]" alt="" />
            <div className="py-2">
            <p className="overflow-hidden text-nowrap text-ellipsis text-prim patrick text-2xl p-2">{game.name}</p>
            {game.total_rating?
        <div className="py-[5px] px-3  float-end flex items-center bg-sec rounded-xl mb-2 mr-2 ">
           <p className="text-prim"> {(game.total_rating/10).toFixed(1)} </p>
           <Icon path={mdiStar} size={0.8} className="text-prim" />
            </div>:
        <div className="py-[5px] px-3 bg-sec float-end flex items-center rounded-xl mb-2 mr-2">
        <p className="text-prim"> N/A </p>
        <Icon path={mdiStar} size={0.8} className="text-prim" />
         </div>  
        }
            </div>
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