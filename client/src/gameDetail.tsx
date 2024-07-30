import { Link, useLocation } from "react-router-dom"
import { useEffect, useState, useRef } from "react";
import Navbar from "./navbar";
import Icon from '@mdi/react';
import { mdiStar } from '@mdi/js';
import { mdiStarOutline } from '@mdi/js';
import { mdiChevronDown } from '@mdi/js';
import Cover from "./cover"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";







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
  platforms: [],
  dev: any,
  publisher: [],
  game_modes: [],
  player_perspectives: [],
  storyline: string,
  similar_games: [],
  franchises: [],
  collections: [],
  expansions: [],
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
    const [chars, setChars] = useState(false)
    const [summ, setSumm] = useState(false)
    const [res, setRes] = useState<ress>()
    

    useEffect(() => {
      const element = document.getElementById("ccc");
  element?.scrollIntoView();
  },[location.state]);
  
  
  
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
                 storyline, summary, genres.name, platforms.name, category, status, involved_companies.*, involved_companies.company.name,
                 game_modes.name, player_perspectives.name, similar_games.name, similar_games.cover.url, similar_games.aggregated_rating,
                 franchises.name, expansions.name, collections.name
                               
                 ;
                where id = ${location.state};
                 `,
              }
            );
            
            const data = await response.json();
        //    console.log(data)
            if (data.length > 0) {
              const game = data[0];
              const filteredArtworks = game.artworks && game.artworks.filter((artwork: any) => {
                const url = artwork.url.split("/t_thumb/")[1];
                return url.startsWith("ar");
              })
            
        //   console.log(game)
          // console.log(filteredArtworks)
            const gamesWithCovers = data.map((game: any, index: any) => ({
                ...game,
               coverUrl: game.artworks ? game.artworks[0].url.replace('t_thumb', 't_1080p') : console.error("no link") ,
               filteredArtwork: filteredArtworks && filteredArtworks.length > 0 ? filteredArtworks[0].url.replace("t_thumb", "t_1080p") : [],
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
                }),
                dev: game.involved_companies && game.involved_companies.filter((slot:any)=>{
                  if(slot.developer == true) return slot
                }),
                publisher: game.involved_companies && game.involved_companies.filter((slot:any)=>{
                  if(slot.publisher == true) return slot
                }),

              
                
              }));
            
            console.log(gamesWithCovers)
            
            setRes(gamesWithCovers[0]);
            
            }
          } catch (err) {
            console.error(err);
          }
        };
        
        fetchData();
        
      }, [location.state]);


    return(
      <div className="h-screen" id="ccc">
      <Navbar/>
        
   {res?.filteredArtwork && res.filteredArtwork.length > 0 ? 
   <div className="relative w-full h-[90%] px-64 py-12 text-white">
    <div className="flex flex-col gap-7">
   <div
     className="absolute inset-0 bg-cover brightness-50"
     style={{ backgroundImage: `url(${res?.filteredArtwork})` }}
   ></div>
   <h1 className="relative z-10 text-white text-6xl">{res?.name}</h1>
   <div className="flex gap-4">
    <p className="text-white relative font-normal">{res.rel}</p>
    {res.age && res.age.lenght > 0 &&
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
<div className={`w-full  bg-sec relative mt-14 rounded-t-lg py-3 px-4 border-2 border-prim outline outline-[7px] outline-sec`}>
  
   <div className="bg-prim w-3/4 rounded-r-3xl p-2"> 
<ul className="flex flex-wrap gap-2 items-center">
  <p className="text-lg font-bold text-sec comic">Genre:</p>
{res && res.genres &&
  res.genres.map((slot: any, index)=>(
<li className="text-[17px] chakra" key={index}>{slot.name},</li>
  ))
  }
 </ul>
 <ul className="flex flex-wrap gap-2 items-center">
  <p className="text-lg font-bold text-sec comic">Platforms:</p>
{res && res.platforms &&
  res.platforms.map((slot: any, index)=>(
<li className="text-[17px] chakra" key={index}>{slot.name},</li>
  ))
  }
 </ul>
  </div>
  
  {res.summary && 
    res.summary.length < 500 ?
  <p className="text-prim chakra text-xl py-10">{res.summary}</p>:
  <div >

    {res.summary ?(
      summ ?
      <p className="text-prim chakra text-xl py-10">{res.summary.substring(0,10000)}
      <button onClick={()=>setSumm(!summ)} className="text-indigo-800 m-1">Less</button>
      </p>:
      <p className="text-prim chakra text-xl py-10">{res.summary.substring(0,501)}
      <button onClick={()=>setSumm(!summ)} className="text-indigo-800 text-ellipsis m-1">More</button>
      </p>
    ) :
    <p>-</p>
   

    }
  
  </div>
  }
  

  <div className="bg-prim w-full  py-6 flex flex-col gap-8 px-10 ">
    <div className="flex justify-evenly items-center">


    <ol className="border-2 border-sec p-2 rounded-md h-[200px] sh w-56 list-disc ">
    <h2 className="bangers text-2xl text-sec">Main developer</h2>
    <div className="w-[75%] h-[1px] bg-sec mb-3"></div>
    {res.dev ? 
    res.dev.map((slot: any, index: any)=> (
      <li className="text-white indie text-xl ml-9" key={index}>{slot.company.name}</li>
    )):
    <p className="text-white indie text-xl font-black ml-7">-</p>}
  </ol>
  <ol className="border-2 border-sec py-2 pl-3 rounded-md h-[200px] sh w-56 list-disc ">
  <h2 className="text-2xl bangers text-sec  ">Main publisher</h2>
  <div className="w-[75%] h-[1px] bg-sec mb-3"></div>
    {res.publisher && res.publisher.length > 0 ? 
    res.publisher.map((slot: any, index)=> (
      <li className="text-white indie text-xl font-black ml-7" key={index}>{slot.company.name}</li>
    )):
    <p className="text-white indie text-xl font-black ml-7">-</p>}
  </ol>
  <ol className="border-2 border-sec p-2 rounded-md  sh w-56 list-disc h-[200px]">
  <h2 className="text-2xl bangers text-sec">Game modes</h2>
  <div className="w-[75%] h-[1px] bg-sec mb-3"></div>
    {res.game_modes ? 
    res.game_modes.map((slot: any)=> (
      <li className="text-white indie text-xl font-black ml-9">{slot.name}</li>
    )):
    <p className="text-white indie text-xl font-black ml-7">-</p>}
  </ol>
  <ol className="border-2 border-sec p-2 rounded-md h-[200px] sh w-56 list-disc">
  <h2 className="text-2xl bangers text-sec">player perspectives</h2>
  <div className="w-[75%] h-[1px] bg-sec mb-3"></div>
    {res.player_perspectives ? 
    res.player_perspectives.map((slot: any, index:any)=> (
      <li className="text-white indie text-xl font-black ml-9" key={index}>{slot.name}</li>
    )):
    <p className="text-white indie text-xl font-black ml-7">-</p>}
  </ol>
  </div>
    <div className="w-full px-5 flex gap-3">
        <div className="bg-sec flex min-w-[60%] h-26 self-baseline justify-evenly rounded-lg  ">
    <div className="py-5">
      <h2 className="text-prim text-3xl bangers">Franchises</h2> 
      <div className="h-[1px] w-[75%] bg-prim"></div>
      {res.franchises ? 
    res.franchises.map((slot: any)=>(
      <p className="text-prim text-lg chakra">{slot.name}</p>
    ))  :
    <p className="text-lg text-prim">-</p>
    }
    </div>
    <div className="h-[200px] w-1 bg-prim "></div>
    <div className="py-5">
    <h2 className="text-prim text-3xl bangers">Series</h2>
    <div className="h-[1px] w-[75%] bg-prim"></div>
      {res.collections ? 
    res.collections.map((slot: any)=>(
      <p className="text-prim text-lg chakra">{slot.name}</p>
    ))  :
    <p className="text-lg text-prim">-</p>
    }
    </div>
    </div>
      <div className="bg-sec rounded-lg p-2 w-full">
    <h2 className="text-prim text-3xl bangers">DLCs</h2>
    <div className="h-[1px] w-[5%] bg-prim"></div>
      {res.expansions ? 
    res.expansions.map((slot: any)=>(
      <p className="text-prim text-lg chakra">{slot.name}</p>
    ))  :
    <p className="text-xl text-prim">-</p>
    }
    </div>
  </div>
   
  </div>
  
  <div className={`relative mt-10  ${chars ? 'text-white':'text-white'} `}>
    
    <h1 className="text-prim text-4xl bangers mb-4 p-2">Story</h1>
    {res.storyline &&
    res.storyline.length < 1500 ?
  <p className="text-prim chakra text-xl ">{res.storyline}</p>:
  <div >

    {res.storyline ?(
      chars ?
      <p className="text-prim chakra text-xl o">{res.storyline.substring(0,10000)}
      <button onClick={()=>setChars(!chars)} className="text-indigo-800 m-1">Less</button>
      </p>:
      <p className="text-prim chakra text-xl o">{res.storyline.substring(0,1000)}
      <button onClick={()=>setChars(!chars)} className="text-indigo-800 text-ellipsis m-1">More</button>
      </p>
    ) :
    <p>-</p>
   

    }
  
  </div>
  
  }
  </div>
  <div className="flex box-border flex-col p-[10px] gap-11 my-20">
    <h2 className="text-prim text-4xl bangers mt-3">Similar games</h2>
    <div className=" w-full h-96 bg-prim border-2 border-sec outline outline-[10px] outline-prim pt-11">
      
  <Cover tests = {res.similar_games}  />
    
    </div>
  </div>
</div>
 </div>:
 

//
///
////
/////
//////
///////
////////
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
    {res?.vid && res.vid.length > 0 ?
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

{res &&

<div className={`w-full  bg-sec relative mt-14 rounded-t-lg py-3 px-4 border-2 border-prim outline outline-[7px] outline-sec`}>
  
  <div className="bg-prim w-3/4 rounded-r-3xl p-2"> 
<ul className="flex flex-wrap gap-2 items-center">
 <p className="text-lg font-bold text-sec comic">Genre:</p>
{res && res.genres &&
 res.genres.map((slot: any, index)=>(
<li className="text-[17px] chakra" key={index}>{slot.name},</li>
 ))
 }
</ul>
<ul className="flex flex-wrap gap-2 items-center">
 <p className="text-lg font-bold text-sec comic">Platforms:</p>
{res && res.platforms &&
 res.platforms.map((slot: any, index)=>(
<li className="text-[17px] chakra" key={index}>{slot.name},</li>
 ))
 }
</ul>
 </div>
 
 {res.summary && 
   res.summary.length < 500 ?
 <p className="text-prim chakra text-xl py-10">{res.summary}</p>:
 <div >

   {res.summary ?(
     summ ?
     <p className="text-prim chakra text-xl py-10">{res.summary.substring(0,10000)}
     <button onClick={()=>setSumm(!summ)} className="text-indigo-800 m-1">Less</button>
     </p>:
     <p className="text-prim chakra text-xl py-10">{res.summary.substring(0,501)}
     <button onClick={()=>setSumm(!summ)} className="text-indigo-800 text-ellipsis m-1">More</button>
     </p>
   ) :
   <p>-</p>
  

   }
 
 </div>
 }
 

 <div className="bg-prim w-full  py-6 flex flex-col gap-8 px-10 ">
   <div className="flex justify-evenly items-center">


   <ol className="border-2 border-sec p-2 rounded-md h-[200px] sh w-56 list-disc ">
   <h2 className="bangers text-2xl text-sec">Main developer</h2>
   <div className="w-[75%] h-[1px] bg-sec mb-3"></div>
   {res.dev ? 
   res.dev.map((slot: any, index: any)=> (
     <li className="text-white indie text-xl ml-9" key={index}>{slot.company.name}</li>
   )):
   <p className="text-white indie text-xl font-black ml-7">-</p>}
 </ol>
 <ol className="border-2 border-sec py-2 pl-3 rounded-md h-[200px] sh w-56 list-disc ">
 <h2 className="text-2xl bangers text-sec  ">Main publisher</h2>
 <div className="w-[75%] h-[1px] bg-sec mb-3"></div>
   {res.publisher && res.publisher.length > 0 ? 
   res.publisher.map((slot: any, index)=> (
     <li className="text-white indie text-xl font-black ml-7" key={index}>{slot.company.name}</li>
   )):
   <p className="text-white indie text-xl font-black ml-7">-</p>}
 </ol>
 <ol className="border-2 border-sec p-2 rounded-md  sh w-56 list-disc h-[200px]">
 <h2 className="text-2xl bangers text-sec">Game modes</h2>
 <div className="w-[75%] h-[1px] bg-sec mb-3"></div>
   {res.game_modes ? 
   res.game_modes.map((slot: any)=> (
     <li className="text-white indie text-xl font-black ml-9">{slot.name}</li>
   )):
   <p className="text-white indie text-xl font-black ml-7">-</p>}
 </ol>
 <ol className="border-2 border-sec p-2 rounded-md h-[200px] sh w-56 list-disc">
 <h2 className="text-2xl bangers text-sec">player perspectives</h2>
 <div className="w-[75%] h-[1px] bg-sec mb-3"></div>
   {res.player_perspectives ? 
   res.player_perspectives.map((slot: any, index:any)=> (
     <li className="text-white indie text-xl font-black ml-9" key={index}>{slot.name}</li>
   )):
   <p className="text-white indie text-xl font-black ml-7">-</p>}
 </ol>
 </div>
   <div className="w-full px-5 flex gap-3">
       <div className="bg-sec flex min-w-[60%] h-26 self-baseline justify-evenly rounded-lg  ">
   <div className="py-5">
     <h2 className="text-prim text-3xl bangers">Franchises</h2> 
     <div className="h-[1px] w-[75%] bg-prim"></div>
     {res.franchises ? 
   res.franchises.map((slot: any)=>(
     <p className="text-prim text-lg chakra">{slot.name}</p>
   ))  :
   <p className="text-lg text-prim">-</p>
   }
   </div>
   <div className="h-[200px] w-1 bg-prim "></div>
   <div className="py-5">
   <h2 className="text-prim text-3xl bangers">Series</h2>
   <div className="h-[1px] w-[75%] bg-prim"></div>
     {res.collections ? 
   res.collections.map((slot: any)=>(
     <p className="text-prim text-lg chakra">{slot.name}</p>
   ))  :
   <p className="text-lg text-prim">-</p>
   }
   </div>
   </div>
     <div className="bg-sec rounded-lg p-2 w-full">
   <h2 className="text-prim text-3xl bangers">DLCs</h2>
   <div className="h-[1px] w-[5%] bg-prim"></div>
     {res.expansions ? 
   res.expansions.map((slot: any)=>(
     <p className="text-prim text-lg chakra">{slot.name}</p>
   ))  :
   <p className="text-xl text-prim">-</p>
   }
   </div>
 </div>
  
 </div>
 
 <div className={`relative mt-10  ${chars ? 'text-white':'text-white'} `}>
   
   <h1 className="text-prim text-4xl bangers mb-4 p-2">Story</h1>
   {res.storyline &&
   res.storyline.length < 1500 ?
 <p className="text-prim chakra text-xl ">{res.storyline}</p>:
 <div >

   {res.storyline ?(
     chars ?
     <p className="text-prim chakra text-xl o">{res.storyline.substring(0,10000)}
     <button onClick={()=>setChars(!chars)} className="text-indigo-800 m-1">Less</button>
     </p>:
     <p className="text-prim chakra text-xl o">{res.storyline.substring(0,1000)}
     <button onClick={()=>setChars(!chars)} className="text-indigo-800 text-ellipsis m-1">More</button>
     </p>
   ) :
   <p>-</p>
  

   }
 
 </div>
 
 }
 </div>
 <div className="flex box-border flex-col p-[10px] gap-11 my-20">
   <h2 className="text-prim text-4xl bangers mt-3">Similar games</h2>
   <div className=" w-full h-96 bg-prim border-2 border-sec outline outline-[10px] outline-prim pt-11">
     
 <Cover tests = {res.similar_games}  />
   
   </div>
 </div>
</div>

}

</div>
   

   }
   
</div>
  
    )

}
export default GameDetail