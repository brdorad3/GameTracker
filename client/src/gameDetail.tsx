import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import Navbar from "./navbar";
import Icon from '@mdi/react';
import { mdiStar } from '@mdi/js';
import { mdiStarOutline } from '@mdi/js';
import { mdiChevronDown } from '@mdi/js';







interface ress{
  name: string,
  artworks: [],
  coverUrl: string,
  filteredArtwork: string,
  realCover: string,
  rel: number,
  age: any,
  vid: any,
  videos:any,
  aggregated_rating: number,
  aggregated_rating_count: number,
  rating: number,
  rating_count:number,
  themes: any,
  summary: string,
  genres: [],
  platforms: []
}

function t(test: any){
 if(test==11) return "M";
 else if(test == 10) return "T"
  else if(test == 9) return "E10"
   else if(test == 8) return "E"
    else if(test == 11) return "AO"

}

const GameDetail = () => {

    const location = useLocation();
    
    const [res, setRes] = useState<ress>()
    const [gamesWithCovers, setGamesWithCovers] = useState<any[]>([])

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
                body: `fields name, artworks.url, cover.url, first_release_date, age_ratings.*, videos.*,
                 aggregated_rating, aggregated_rating_count, rating, rating_count, themes.name,
                 storyline, summary, genres.name, platforms.name, status, category
                 ;
                where id = ${location.state};
                 `,
              }
            );
            
            const data = await response.json();
            console.log(data)
            if (data.length > 0) {
              const game = data[0];
              const filteredArtworks = game.artworks && game.artworks.filter((artwork: any) => {
                const url = artwork.url.split("/t_thumb/")[1];
                return url.startsWith("ar");
              })
            
           console.log(game)
            const gamesWithCovers = data.map((game: any, index: any) => ({
                ...game,
                coverUrl: game.artworks ? game.artworks[0].url.replace('t_thumb', 't_1080p') : console.error("no link") ,
                filteredArtwork: filteredArtworks ? filteredArtworks[0].url.replace("t_thumb", "t_1080p") : "./public/vite.svg",
                realCover: game.cover ? game.cover.url.replace('t_thumb', 't_cover_big') : '',
                rel: new Date(game.first_release_date * 1000).getFullYear(),
                age: game.age_ratings && game.age_ratings.filter((slot: any)=>{
                  if(slot.category == 1){
                    return slot;
                  }

                }),
                vid: game.videos &&  game.videos.filter((slot:any)=>{
                  if(slot.name == "Launch Trailer"){
                    return slot;
                  }
                  else {
                    return null
                  }
                })

              
                
              }));
            console.log(gamesWithCovers)
            setRes(gamesWithCovers[0]);
            }
          } catch (err) {
            console.error(err);
          }
        };
        fetchData();
      }, []);


    return(
      <div className="h-screen">
      <Navbar/>
        
   {res?.filteredArtwork ? 
   <div className="relative w-full h-[90%] px-64 py-12 text-white">
    <div className="flex flex-col gap-7">
   <div
     className="absolute inset-0 bg-cover brightness-50"
     style={{ backgroundImage: `url(${res?.filteredArtwork})` }}
   ></div>
   <h1 className="relative z-10 text-white text-6xl">{res?.name}</h1>
   <div className="flex gap-4">
    <p className="text-white relative font-normal">{res.rel}</p>
    {res.age &&
    <p className="text-white relative">{t(res.age[0].rating)}</p>
  }
   </div>
   <div className="flex gap-5">
    <img src={res.realCover} alt="" className="w-[270px] h-[400px] relative" />
    {res.vid && res.vid.length > 0 ?
  <iframe src={`https://youtube.com/embed/${res.vid[0].video_id}`} className="relative min-w-[700px] h-[400px] " ></iframe>:
  res.videos ?
  <iframe src={`https://youtube.com/embed/${res.videos[0].video_id}`} className="relative min-w-[700px] h-[400px]" ></iframe>:
  <div className="relative min-w-[700px] h-[400px] bg-prim flex items-center justify-center">This video is unavailable!</div>
  }
  <div className="w-full h-[400px] relative bg-sec flex flex-col justify-around pb-10">
    <div className="flex justify-evenly ">
    <div className=" bg-prim p-3 rounded-xl">
      <div className="flex gap-2 items-center">

    <Icon path={mdiStar} size={2} className="text-sec"/>
    
      <p className="text-4xl">{(res.rating/10).toFixed(1)}</p>
    </div>
      <p className="text-lg">{res.rating_count} user ratings</p>
      </div>
    
    <div className="bg-prim p-3 rounded-xl">
      <div className="flex items-center">
    <Icon path={mdiStar} size={2} className="text-sec"/>
      <p className="text-4xl">{(res.aggregated_rating/10).toFixed(1)}</p>
     </div>
      <p>{res.aggregated_rating_count} critic reviews</p>
    </div>
</div>
<div className="flex flex-col gap-7 items-center">
  <div className="flex flex-col items-center gap-1 bg-prim p-4 rounded-lg">
  <h2 className="text-3xl">Your rating</h2>
  <div className="flex gap-1 items-center">
  <Icon path={mdiStarOutline} size={1.5} className="text-sec"/>
  <p className="text-2xl text-sec">Rate</p>
  </div>
  </div>
  <div>
  <div className="flex items-center gap-1 justify-around border-2 border-prim w-44 px-2 ">
    <p className="text-prim p-1 text-lg font-medium">Add to list</p>
    <div className="bg-prim w-[1px] h-10 relative p-0"></div>
   
    <Icon path={mdiChevronDown} size={1} className="text-prim" />
    
  </div>
</div>
</div>

  </div>
   </div>
  </div>
  {res.themes && 
  <div className="relative mt-5">
    <ul className="flex gap-2">
   { res.themes.map((theme: any, index: any)=> (
      <li className="text-sec relative bg-prim py-1 px-3 rounded-2xl border-[2px] border-sec" key={index}>{theme.name}</li>
    ))}
    </ul>
  </div>
}
<div className="w-full h-[500px] bg-sec relative mt-14 rounded-t-lg py-2 px-5 border-2 border-prim outline outline-[7px] outline-sec">
  
    
<ul className="flex gap-2">
  <p className="text-base font-semibold text-prim">Genre:</p>
{res && res.genres &&
  res.genres.map((slot: any, index)=>(
<li className="text-base font-semibold" key={index}>{slot.name},</li>
  ))
  }
 </ul>
 <ul className="flex gap-2">
  <p className="text-base font-semibold text-prim">Platforms:</p>
{res && res.platforms &&
  res.platforms.map((slot: any, index)=>(
<li className="text-base font-semibold" key={index}>{slot.name},</li>
  ))
  }
 </ul>
  <h3 className="text-prim font-semibold">About</h3>
  <p className=" text-base font-semibold text-prim">{res.summary}</p>
  <div className="bg-prim w-full h-52 p-2">
  
  </div>
</div>
 </div>:
 

 //tjbivbsdifbsvdfvbshjfkdbjfhsvbsjfdh



  <div className="relative w-full h-[90%] px-64 py-12 text-white">
    <div className="flex flex-col gap-7">
  <div
    className="absolute inset-0 bg-cover bg-center brightness-50"
    style={{ backgroundImage: `url(${res?.coverUrl})`, backgroundSize: "cover" }}
  ></div>
  <h1 className=" z-10 text-white text-6xl">{res?.name}</h1>
  <div className="flex gap-4">
    <p className="text-white relative font-normal">{res?.rel}</p>
    {res?.age &&
    <p className="text-white relative">{t(res.age[0].rating)}</p>
  }
   </div>
  <div className="flex gap-5">
    <img src={res?.realCover} alt="" className="w-[270px] h-[400px] z-50 relative" />
    {res?.vid ?
  <iframe src={`https://youtube.com/embed/${res.vid[0].video_id}`} className="relative min-w-[700px] h-[400px] " ></iframe>:
  res?.videos ?
  <iframe src={`https://youtube.com/embed/${res.videos[0].video_id}`} className="relative min-w-[700px] h-[400px]" ></iframe>:
  <div className="relative min-w-[700px] h-[400px] bg-prim flex items-center justify-center">This video is unavailable!</div>
  }
  {res &&
  <div className="w-full h-[400px] relative bg-sec flex flex-col justify-around pb-10">
    <div className="flex justify-evenly ">
    <div className=" bg-prim p-3 rounded-xl">
      <div className="flex gap-2 items-center">

    <Icon path={mdiStar} size={2} className="text-sec"/>
    
      <p className="text-4xl">{(res.rating/10).toFixed(1)}</p>
    </div>
      <p className="text-lg">{res.rating_count} user ratings</p>
      </div>
    
    <div className="bg-prim p-3 rounded-xl">
      <div className="flex items-center">
    <Icon path={mdiStar} size={2} className="text-sec"/>
      <p className="text-4xl">{(res.aggregated_rating/10).toFixed(1)}</p>
     </div>
      <p>{res.aggregated_rating_count} critic reviews</p>
    </div>
</div>
<div className="flex flex-col gap-7 items-center">
  <div className="flex flex-col items-center gap-1 bg-prim p-4 rounded-lg">
  <h2 className="text-3xl">Your rating</h2>
  <div className="flex gap-1 items-center">
  <Icon path={mdiStarOutline} size={1.5} className="text-sec"/>
  <p className="text-2xl text-sec">Rate</p>
  </div>
  </div>
  <div>
  <div className="flex items-center gap-1 justify-around border-2 border-prim w-44 px-2 ">
    <p className="text-prim p-1 text-lg font-medium">Add to list</p>
    <div className="bg-prim w-[1px] h-10 relative p-0"></div>
   
    <Icon path={mdiChevronDown} size={1} className="text-prim" />
    
  </div>
</div>
</div>

  </div>
}
   </div>
</div>
{res?.themes && 
  <div className="relative mt-5">
    <ul className="flex gap-2">
   { res.themes.map((theme: any, index: any)=> (
      <li className="text-sec relative bg-prim py-1 px-3 rounded-2xl border-[2px] border-sec" key={index}>{theme.name}</li>
    ))}
    </ul>
  </div>
}
</div>
   

   }
   
</div>
  
    )

}
export default GameDetail