import Icon from '@mdi/react';
import { mdiStar } from '@mdi/js'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import {  Navigation } from 'swiper/modules';
import "swiper/css"
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';


const Cover = (props: any) =>{
    const [res, setRes] = useState<any[]>([])
    
    useEffect(() => {
        
    const forCover = props.tests.sim.map((game: any) =>({
        ...game,
        coverUrl: game.cover ? game.cover.url.replace('t_thumb', 't_cover_big') : '',
        
}))

setRes(forCover)

    }, [props.tests.sim])


    return (
        <>
       <div className="relative">
          <Swiper
        
        
        modules={[Navigation]}
        navigation={true} 
        breakpoints={{
          
          365:{
            slidesPerView:2,
            spaceBetween:20
          },
          675: {
            slidesPerView: 3,
            spaceBetween: 10
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
          {res ? 
       
            
       res.map((game: any) => (
        game &&
         <SwiperSlide key={game.id}>
           <div className=" bg-sec rounded-b-md min-w-[210px] max-w-[210px] sh10 hover:scale-[1.03]  card3"  >
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
        </>
    )
}
export default Cover