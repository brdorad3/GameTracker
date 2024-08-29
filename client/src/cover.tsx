import Icon from '@mdi/react';
import { mdiStar } from '@mdi/js'
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

const Cover = (props: any) =>{

    const [res, setRes] = useState<any[]>([])
    console.log(props)
    
    useEffect(() => {

        
    const forCover = props.tests.sim.map((game: any) =>({
        ...game,
        coverUrl: game.cover ? game.cover.url.replace('t_thumb', 't_cover_big') : '',
        
}))

const first = []
for(let i = 0; i<forCover.length; i += 5){
  const chunk = forCover.slice(i, i + 5);
first.push(chunk);
}

setRes(first)

    }, [props.tests.sim])
    


    return (
        <>
        {res[props.tests.index] && 
        
            
        res[props.tests.index].map((game: any) => (
            <Link to={`/detail/${game.id}`} state={game.id} key={game.id} className="bg-prim rounded-b-md min-w-[210px] max-w-[210px] sh4 hover:scale-[1.02] ">
            <div className=" rounded-md " >
            <img src={game.coverUrl} className="w-full h-[250px] mg" alt="" />
            <div className="py-2">
            <p className="overflow-hidden text-nowrap text-ellipsis text-sec chakra text-xl p-2 font-medium">{game.name}</p>
            {game.total_rating?
        <div className="py-[5px] px-3  float-end flex items-center gap-1 bg-prim rounded-xl mb-2 mr-2 ">
                      <Icon path={mdiStar} size={0.8} className="text-sec" />
           <p className="text-sec"> {(game.total_rating/10).toFixed(1)} </p>
            </div>:
        <div className="py-[5px] px-3 float-end flex items-center bg-prim gap-1 rounded-xl mb-2 mr-2">
        <Icon path={mdiStar} size={0.8} className="text-sec" />
        <p className="text-sec"> N/A </p>
        
         </div>  
        }
            </div>
        </div>
        </Link>

        ))
        
        
       
        }
        </>
    )
}
export default Cover