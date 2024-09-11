import TopRated from "./topRated"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiChevronRight, mdiChevronLeft } from "@mdi/js";
import { Swiper, SwiperSlide } from 'swiper/react';
import { mdiStar } from "@mdi/js";




import {  Navigation } from 'swiper/modules';

import "swiper/css"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const Rated = () => {

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
            body: `fields name,  total_rating, total_rating, cover.url, total_rating_count;
             where total_rating_count > 70;sort total_rating desc;limit 15;
             
             `,
          }
        );
        const data = await response.json();
        
        

        const gamesWithCovers = data.map((game: any, index: any) => ({
          ...game,
          coverUrl: game.cover ? game.cover.url.replace('t_thumb', 't_cover_big') : '',
          
        }));

        

        
        setRes(gamesWithCovers);
        
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, []);

 


    return (
        <>
        <div className="px-60 py-12 flex flex-col gap-12 max-md:px-2 bg-prim">
            <div className="flex justify-between">
                <div>
        <h1 className="text-sec text-3xl font-bold chakra pb-1 h1">BEST RATED GAMES</h1>
        <div className="w-24 h-[2px] bg-acc"></div>
            </div>
        <Link to="/top100" className="self-end">
        <div className="mr-3">
        <h2 className="text-sec self-end ani chakra seeall">See all</h2>
       
        </div>
        </Link>
        </div>
        <div className="relative">
        <Swiper
        
        
        modules={[Navigation]}
        navigation={true} 
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          400:{
            slidesPerView:2,
          },
          639: {
            slidesPerView: 3,
          },
          865:{
            slidesPerView:4
          },
          1000:{
            slidesPerView:5
          },
          1500:{
            slidesPerView:6
          },
         
        }}
      
        
        
      >
        {res ? 
        
            
        res.map((game: any) => (
          <SwiperSlide key={game.id}>
            <div className=" bg-sec rounded-b-md min-w-[210px] max-w-[210px] sh10 hover:scale-[1.03]"  >
              <Link to={`/detail/${game.id}`} state={game.id} key={game.id} >
            <img src={game.coverUrl} className="w-full h-[250px] " alt="" />
            </Link>
            <div className="">
            <Link to={`/detail/${game.id}`} state={game.id} key={game.id} >
            <p className="overflow-hidden text-nowrap text-ellipsis text-prim chakra text-xl px-2 py-4">{game.name}</p>
            </Link>
            {game.total_rating?
        <div className="flex items-center gap-1 bg-sec rounded-b-md pb-3 justify-end pr-4">
          <Icon path={mdiStar} size={0.8} className="text-acc" />
           <p className="text-prim "> {(game.total_rating/10).toFixed(1)} </p>
           
            </div>:
        <div className="flex items-center gap-1 bg-sec rounded-b-md pb-3 justify-end pr-4">
           <Icon path={mdiStar} size={0.8} className="text-acc" />
        <p className="text-prim"> N/A </p>
       
         </div>  
        }
            </div>
        </div>
        
        </SwiperSlide>
        ))
        
        
        :
        <p>Loading...</p>
        }
        </Swiper>
        </div>
        </div>
        </>
    )
}
export default Rated