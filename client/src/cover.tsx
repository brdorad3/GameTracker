import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import Icon from '@mdi/react';
import { mdiStar } from '@mdi/js'
import { Link } from "react-router-dom";

const Cover = (props: any) =>{
    
    const forCover = props.tests.map((game: any) =>({
        ...game,
        coverUrl: game.cover ? game.cover.url.replace('t_thumb', 't_cover_big') : '',
        
}))
const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    
    slidesToScroll: 1,
    
  };


    return (
        <>
        {forCover && 
        <Slider  {...settings}>
            
        {forCover.map((game: any) => (
            <Link to={`/detail/${game.id}`} state={game.id} key={game.id} className="bg-sec rounded-sm max-w-[190px]">
            <div className="max-w-[190px]  bg-sec rounded-md" >
            <img src={game.coverUrl} className="w-full h-[220px]" alt="" />
            <p className="overflow-hidden text-nowrap text-ellipsis text-prim patrick text-2xl p-1">{game.name}</p>
            {game.aggregated_rating?
        <div className="py-[2px] px-3 text-prim float-end flex items-center bg-prim rounded-xl mb-1 mr-2 ">
           <p className="text-sec"> {(game.aggregated_rating/10).toFixed(1)} </p>
           <Icon path={mdiStar} size={0.8} className="text-sec" />
            </div>:
        <div className="py-[2px] px-3 text-prim float-end flex items-center bg-prim rounded-xl mb-1 mr-2">
        <p className="text-sec"> N/A </p>
        <Icon path={mdiStar} size={0.8} className="text-sec" />
         </div>  
        }
            
        </div>
        </Link>

        ))}
        
        
        </Slider>
        }
        </>
    )
}
export default Cover