

import { useEffect, useState } from "react";
import PopGames from "./popularGames";
import { Link } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";
import { Swiper, SwiperSlide } from 'swiper/react';
import { mdiStar } from "@mdi/js";
import { useSwiper } from 'swiper/react';



import {  Navigation } from 'swiper/modules';

import "swiper/css"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';





const Popular = () => {

const [res, setRes] = useState<any[]>([])
const [index, setIndex] = useState(0)
const [show, setShow] = useState(false)
const [game, setGame] = useState<any[]>([])
const swiper = useSwiper();


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
                where popularity_type = 1;
                 sort value desc;limit 100;
                 
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

      useEffect(() => {
        const fetchData = async () => {
          try {
           
            const gameIds = res.map((slot: any) => slot.game_id).join(',');
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
                limit 15;`, 
              }
            );
      
            const data = await response.json();
           
            const forCover = data.map((game: any) => ({
              ...game,
              coverUrl: game.cover ? game.cover.url.replace('t_thumb', 't_cover_big') : '',
            }));
           
            const first = []
            
            
            
              for(let i = 0; i<15; i++){
                const chunk = forCover[i];
    first.push(chunk);
              }
            
               
                
            setGame(first)
            
          } catch (err) {
            console.error(err);
          }
        };
      
        if (res.length > 0) {
          fetchData();
        }
      }, [res]);
   

    return (
        <>
        <div className="px-60 py-12 flex flex-col gap-12 max-xl:px-5 max-sm:px-2">
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
          {game ? 
       
            
       game.map((game: any) => (
         <SwiperSlide key={game.id}>
           <div className=" bg-sec rounded-b-md min-w-[210px] max-w-[210px] sh10 hover:scale-[1.03] max-md:min-w-[40%] max-md:max-w-[40%] z-0"  >
             <Link
                               to={`/detail/${game.id}`}
                               state={game.id}
                               key={game.id}
                               className=""
                           >
             {game.coverUrl &&
             <img src={game.coverUrl} className="w-full h-[250px] max-md:min-h-[180px] max-md:max-h-[180px]" alt="" />
}
</Link>
           
           <div className="h-full w-full rounded-xl ">
           <Link to={`/detail/${game.id}`}  state={game.id} key={game.id}>
           <p className="overflow-hidden text-nowrap text-ellipsis text-prim chakra text-xl px-2 py-4 itemfont ">{game.name}</p>
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
       <p>Loading...</p>
       }
          </Swiper>
        </div>
            
            </div>
            
        
        </>
    )
}
export default Popular