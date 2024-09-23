import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from '@mdi/react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { mdiStar } from "@mdi/js";
import {  Navigation } from 'swiper/modules';
import "swiper/css"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';







const Popular = () => {

const [res, setRes] = useState<any[]>([])
const [game, setGame] = useState<any[]>([])

useEffect(() => {
  const fetchPopularityData = async () => {
    try {
      const response = await fetch(
        import.meta.env.VITE_IGDB_API + "/popularity_primitives",
        {
          method: 'POST',
          headers: {
            "Accept": 'application/json',
            'Client-ID': import.meta.env.VITE_CLIENT_ID,
            "Authorization": import.meta.env.VITE_AUTHORIZATION,
          },
          body: `
            fields game_id, popularity_type, value;
            where popularity_type = 2 | popularity_type = 3;
            sort value desc;
            limit 50;
          `,
        }
      );
      const data = await response.json();
      setRes(data);
    } catch (err) {
      console.error(err);
    }
  };
  fetchPopularityData();
}, []);


const calculateCustomPopularity = (gamePop: any[]) => {
  let wantToPlayValue = 0;
  let playingValue = 0;


  gamePop.forEach((pop) => {
    if (pop.popularity_type === 2) {
      wantToPlayValue = pop.value; 
    } else if (pop.popularity_type === 3) {
      playingValue = pop.value; 
    }
  });


  return 0.2 * wantToPlayValue + 0.4 * playingValue;
};


useEffect(() => {
  const fetchGameData = async () => {
    try {
      const gameIds = res.map((slot: any) => slot.game_id).join(',');
      const response = await fetch(
        import.meta.env.VITE_IGDB_API + "/games",
        {
          method: 'POST',
          headers: {
            "Accept": 'application/json',
            'Client-ID': import.meta.env.VITE_CLIENT_ID,
            "Authorization": import.meta.env.VITE_AUTHORIZATION,
          },
          body: `
            fields name, total_rating, cover.url;
            where id = (${gameIds});
            limit 15;
          `,
        }
      );

      const data = await response.json();

      
      const forCover = data.map((game: any) => ({
        ...game,
        coverUrl: game.cover ? game.cover.url.replace('t_thumb', 't_cover_big') : '',
      }));

      
      const gamesWithPopularity = forCover.map((gameData: any) => {
        
        const gamePopularity = res.filter((pop) => pop.game_id === gameData.id);

       
        const customPopularityScore = calculateCustomPopularity(gamePopularity);

        return {
          ...gameData,
          customPopularity: customPopularityScore,
        };
      });

      setGame(gamesWithPopularity);
    } catch (err) {
      console.error(err);
    }
  };

  if (res.length > 0) {
    fetchGameData();
  }
}, [res]);


    return (
        <>
        <div className="px-60 py-12 flex flex-col gap-12 max-2xl:px-5 max-sm:px-2 bg-prim h-[557px]">
          <div className="flex justify-between">
            <div>
        <h1 className="text-sec text-3xl chakra pb-1 font-bold h1">POPULAR RIGHT NOW</h1>
        <div className="w-24 h-[2px] bg-acc"></div>
        </div>
        <div className="self-end">
          <Link to="/popularList" state={res}>
          <p className="ani text-sec chakra seeall">See all</p>
          </Link>
        </div>
          </div>
          
         <div className="relative">
          <Swiper
        
        
        modules={[Navigation]}
        navigation={true} 
        breakpoints={{
          
          365:{
            slidesPerView:2,
            spaceBetween:5
          },
          675: {
            slidesPerView: 3,
            
          },
          880:{
            slidesPerView:4
          },
          1130:{
            slidesPerView:5
          },
          1400:{
            slidesPerView:6
          },
         
        }}
      
      
        
        
      >
          {game ? 
       
            
       game.map((game: any) => (
        game &&
         <SwiperSlide key={game.id}>
           <div className=" bg-sec rounded-b-md min-w-[210px] max-w-[210px] sh10 hover:scale-[1.03] card"  >
             <Link
                               to={`/detail/${game.id}`}
                               state={game.id}
                               key={game.id}
                               className=""
                           >
             {game.coverUrl &&
             <img rel="preload" src={game.coverUrl} className="w-full h-[250px] max-sm:h-[220px]" alt="" />
}
</Link>
           
           <div className="h-full w-full rounded-xl ">
           <Link to={`/detail/${game.id}`}  state={game.id} key={game.id}>
           <p className="overflow-hidden text-nowrap text-ellipsis text-prim chakra text-xl px-2 py-4">{game.name}</p>
           </Link>
           {game.total_rating?
       <div className="flex items-center gap-1 bg-sec rounded-b-md pb-3 justify-end pr-4">
          <Icon path={mdiStar} size={0.8} className="text-acc " />
          <p className="text-prim "> {(game.total_rating/10).toFixed(1)} </p>
         
           </div>:
       <div className="flex items-center gap-1 bg-sec rounded-b-md pb-3 justify-end pr-4">
       <Icon path={mdiStar} size={0.8} className="text-acc " />
       <p className="text-prim"> N/A </p>
      
        </div>  
       
       }
          </div> 
           
          
       </div>
       
       </SwiperSlide>
        
       ))
       
       
     :
       <p className="text-sec">Loading...</p>
       }
          </Swiper>
        </div>
            
            </div>
            
        
        </>
    )
}
export default Popular