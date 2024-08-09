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
    slidesToShow: 6,
    //centerMode: true,
    slidesToScroll: 1,
    
  };


    return (
        <>
        {forCover && 
        <Slider  {...settings}>
            
        {forCover.map((game: any) => (
            <Link to={`/detail/${game.id}`} state={game.id} key={game.id} className="bg-prim rounded-sm max-w-[210px] ml-1">
            <div className=" bg-prim rounded-md " >
            <img src={game.coverUrl} className="w-full h-[250px] mg" alt="" />
            <div className="py-2">
            <p className="overflow-hidden text-nowrap text-ellipsis text-sec patrick text-2xl p-2">{game.name}</p>
            {game.total_rating?
        <div className="py-[5px] px-3  float-end flex items-center bg-prim rounded-xl mb-2 mr-2 ">
           <p className="text-sec"> {(game.total_rating/10).toFixed(1)} </p>
           <Icon path={mdiStar} size={0.8} className="text-sec" />
            </div>:
        <div className="py-[5px] px-3 float-end flex items-center bg-prim rounded-xl mb-2 mr-2">
        <p className="text-sec"> N/A </p>
        <Icon path={mdiStar} size={0.8} className="text-sec" />
         </div>  
        }
            </div>
        </div>
        </Link>

        ))}
        
        
        </Slider>
        }
        </>
    )
}
export default Cover