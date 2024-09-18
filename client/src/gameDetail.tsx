import {  useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import Navbar from "./navbar";
import Icon from '@mdi/react';
import { mdiStar } from '@mdi/js';
import { mdiChevronDown, mdiHandExtended, mdiController,mdiCheck } from '@mdi/js';
import Cover from "./cover"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";
import { useAuth } from "./authContext";


interface ress{
  _id: string,
  id: any,
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
  category: string,
}

function t(test: any){
 if(test==11) return "M";
 else if(test == 10) return "T"
  else if(test == 9) return "E10"
   else if(test == 8) return "E"
    else if(test == 11) return "AO"

}
const cat = (item: any) => {
  if(item == 0) return "Main game";
  else if(item == 1) return "DLC";
  else if(item == 2) return "Expansion";
  else if(item == 3) return "Bundle";
  else if(item == 4) return "Standalone expansion";
  else if(item == 5) return "Mod";
  else if(item == 6) return "Episode";
  else if(item == 7) return "Season";
  else if(item == 8) return "Remake";
  else if(item == 9) return "Remaster";
  else if(item == 10) return "Expanded game";
  else if(item == 11) return "port";
  else if(item == 12) return "Fork";
  else if(item == 13) return "Pack";
  else if(item == 14) return "Update"
  
}

const GameDetail = () => {


    const location = useLocation();
    const [chars, setChars] = useState(false)
    const [summ, setSumm] = useState(false)
    const [res, setRes] = useState<ress>()
    const [toggle, setToggle] = useState(false)
    const { user } = useAuth()
    const [review, setReview] = useState({
      status: 'playing',
      score: 0,
      game: '',
      user: user,
    })
    const [errMess, setErrMess] = useState('')
    const [planningList, setPlanningList] = useState(false)
    const [sim, setSim] = useState<any[]>([])
    const [gamePop, setGamePop] = useState<any[]>([])
   

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
                  'Authorization': 'Bearer ag34gl29glo4dukxxlx33gmei0j626',
                },
                body: `fields name, artworks.url, cover.url, first_release_date, age_ratings.*, videos.*,
                 aggregated_rating, aggregated_rating_count, rating, rating_count, themes.name,
                 storyline, summary, genres.name, platforms.name, category, status, involved_companies.*, involved_companies.company.name,
                 game_modes.name, player_perspectives.name, similar_games.name, similar_games.cover.url, similar_games.total_rating,
                 franchises.name, expansions.name, collections.name, screenshots.*
                               
                 ;
                where id = ${location.state};
                 `,
              }
            );
            
            const data = await response.json();
      
            if (data.length > 0) {
              const game = data[0];
              const filteredArtworks = game.artworks && game.artworks.filter((artwork: any) => {
                const url = artwork.url.split("/t_thumb/")[1];
                return url.startsWith("ar");
              })
            
            const gamesWithCovers = data.map((game: any) => ({
                ...game,
                
               coverUrl: game.artworks ? game.artworks[0].url.replace('t_thumb', 't_1080p') : `//images.igdb.com/igdb/image/upload/t_screenshot_huge/${game.screenshots[0].image_id}.jpg` ,
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
            
              
              setReview({...review, game: gamesWithCovers[0].name})
           
              
            setRes(gamesWithCovers[0]);
            setSim(gamesWithCovers[0].similar_games)
            }
          } catch (err) {
            console.error(err);
          }
        };
        
        fetchData();
        
      }, [location.state]);

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
                  'Authorization': 'Bearer ag34gl29glo4dukxxlx33gmei0j626',
                },
                body: `fields *;
                
                where game_id = ${res?.id};
                 
                 `,
              }
            );
            const data = await response.json();
            
           
           setGamePop(data)

            
          } catch (err) {
            console.error(err);
          }
        };
        fetchData();
      }, [res]);

      const handleSubmit = async(e: any) => {
        e.preventDefault();
        setToggle(!toggle);
        user ? 
       
       await axios.post(import.meta.env.VITE_URL + "/review", {review}).then((t) => {
        console.log(t.data.message)
        setErrMess(t.data.message)
        setTimeout(()=>{
          setErrMess('');
        }, 3000)
       })
      
      .catch(function (e) {
      console.log(e)
      }):
      alert("Log in to rate games!")
      }






    return(
      <div className="h-screen" id="ccc">
      <Navbar/>
        
   {res &&
   <div className={`${toggle ? "brightness-50 overflow-hidden": "brightness-100"}  relative w-full h-[92%] max-sm:h-[120%] px-64 py-6 text-white max-sm:px-2`}>
    <div className="flex flex-col gap-2">
   <div
     className="absolute inset-0 bg-cover max-sm:bg-center brightness-50"
     style={{ backgroundImage: `url(${res?.filteredArtwork && res.filteredArtwork.length > 0 ? res.filteredArtwork : res.coverUrl})` }}
   ></div>
   <h1 className="relative z-10 text-white text-6xl space max-sm:text-3xl max-sm:pt-4">{res?.name}</h1>
   <div className="flex gap-5 max-sm:pb-3">
    <div className="flex gap-4 w-[270px] pb-2">
    <p className="text-prim relative font-normal">{res.rel}</p>
    {res.age && res.age.length > 0 &&
    <p className="text-white relative">{t(res.age[0].rating)}</p>
  }
  </div>
  <div className="w-[700px] max-sm:hidden">

  </div>
  <div>
  <p className="text-white relative space">{cat(res.category)}</p>
  </div>
   </div>
   <div className="flex gap-5 relative max-sm:grid max-sm:grid-rows-2 max-sm:grid-cols-2">
    <img src={res.realCover} alt="" className="w-[270px] h-[400px] relative max-sm:w-[160px] max-sm:h-[215px] max-sm:row-start-2 max-sm:rounded-md max-sm:justify-self-center max-sm:mt-8" />
    {res.vid && res.vid.length > 0 ?
    <div className="max-sm:w-screen">
  <iframe src={`https://youtube.com/embed/${res.vid[0].video_id}`} className="relative min-w-[700px] h-[400px] max-sm:h-[300px] max-sm:row-start-1 max-sm:max-w-full max-sm:min-w-full" ></iframe></div>:
  res.videos ?
  <div className="max-sm:w-screen">
  <iframe src={`https://youtube.com/embed/${res.videos[0].video_id}`} className="relative min-w-[700px] h-[400px] max-sm:h-[300px] max-sm:row-start-1 max-sm:max-w-full max-sm:min-w-full" ></iframe></div>:
  <div className="relative min-w-[700px] h-[400px] max-sm:h-[300px] bg-prim flex items-center justify-center brightness-200 max-sm:row-start-1 max-sm:max-w-full max-sm:min-w-full">This video is unavailable!</div>
  }
  
  <div className="w-full h-[400px] relative bg-prim flex flex-col justify-around py-2 max-sm:row-start-2 max-sm:px-6 max-sm:h-[270px] max-sm:rounded-sm">
    <div className="flex justify-evenly max-sm:flex-col max-sm:gap-2">
    <div className=" bg-white p-3 rounded-xl sh10 max-sm:p-2">
      <div className="flex gap-2 items-center">

    <Icon path={mdiStar}  className="text-acc max-sm:w-7 w-12"/>
    
      <p className="text-4xl text-sec chakra max-sm:text-2xl">{(res.rating/10).toFixed(1)}</p>
    </div>
      <p className=" text-sec chakra max-sm:text-sm" >{res.rating_count} user ratings</p>
      </div>
    
    <div className="bg-white p-3 rounded-xl sh10 max-sm:p-2">
      <div className="flex items-center gap-1">
    <Icon path={mdiStar}  className="text-acc max-sm:w-7 w-12"/>
      <p className="text-4xl text-sec chakra max-sm:text-2xl">{(res.aggregated_rating/10).toFixed(1)}</p>
     </div>
      <p className="text-sec chakra">{res.aggregated_rating_count} critic reviews</p>
    </div>
</div>
<div className="flex flex-col gap-7 items-center">
  
  <div className="relative">
  <div className="flex items-center rounded-3xl gap-1 sh11 justify-around border-2 bg-acc border-sec w-44 px-3 max-sm:px-2 max-sm:w-36 " >
    <p className="text-sec p-1 text-lg space font-bold hover:cursor-pointer max-sm:text-base" onClick={() => setToggle(!toggle)}>Add to list</p>
    <div className="bg-sec w-[1px] h-12 relative p-0" ></div>
   
   <div onClick={() => setPlanningList(!planningList)}>
    <Icon path={mdiChevronDown} size={1} className="text-sec cursor-pointer" />
    </div>
  

  </div>
  <div className={`${planningList ? 'absolute top-15 rounded-lg w-full h-8 bg-white text-sec font-bold ' : 'hidden'}`}>
    <form onSubmit={handleSubmit}>
    <button className="pl-3 pt-1" type="submit" name="plan" onClick={() => setReview({...review, status: 'plan'})}>Set as planning</button>
    </form>
  </div>
</div>
</div>

  {
    gamePop && gamePop.length > 0 && 
<div className="flex justify-evenly bg-white mx-3 rounded-md  py-2 sh10 max-sm:hidden">
    <div className="flex flex-col items-center">
    <Icon path={mdiHandExtended} size={2} className="text-black"></Icon>
    <p className="text-sec space">Want</p>
    <p>{gamePop.filter((slot: any) => slot.popularity_type === 2) .map((slot: any, index: number) => (
      <span key={index} className="text-sec">{(slot.value * 309002).toFixed(0)} </span> 
    ))} </p>
  </div> 
  <div className="w-[1px] h-full bg-black"></div>
   <div className="flex flex-col items-center">
    <Icon path={mdiController} size={2} className="text-black"></Icon>
    <p className="text-sec space">Playing</p>
    <p>{gamePop.filter((slot: any) => slot.popularity_type === 3) .map((slot: any, index: number) => (
      
      <span className="text-sec" key={index}>{(slot.value * 64000).toFixed(0)} </span> 
    ))} </p>
  </div>
  <div className="w-[1px] h-full bg-black"></div>
   <div className="flex flex-col items-center">
    <Icon path={mdiCheck} size={2} className="text-black"></Icon>
    <p className="text-sec space">Played</p>
    <p>{gamePop.filter((slot: any) => slot.popularity_type === 4) .map((slot: any, index: number) => (
    
      <span className="text-sec" key={index}>{(slot.value * 856218).toFixed(0)} </span> 
    ))} </p>
  </div>
  
  
  </div>
  
  }

  


  </div>
   </div>
  </div>
  {res.themes && 
  <div className="relative mt-5 max-sm:ml-3">
    <ul className="flex flex-wrap gap-2">
   { res.themes.map((theme: any, index: any)=> (
      <li className="text-sec relative bg-prim py-1 px-3 rounded-2xl border-[3px] border-sec" key={index}>{theme.name}</li>
    ))}
    </ul>
  </div>
}
<div className={`w-full  bg-prim relative mt-14 rounded-t-lg py-3 px-4 sh10 border-l-2 border-t border-r-2 border-sec max-sm:px-2 `}>


  
   <div className="bg-white max-w-[75%] rounded-r-3xl p-2 mt-2 border-[3px] border-acc sh10 max-sm:max-w-[85%] max-sm:border-2"> 
<ul className="flex flex-wrap gap-2 items-center">
  <p className="text-lg font-bold text-acc chakra max-sm:text-bass">Genre:</p>
{res && res.genres &&
  res.genres.map((slot: any,  index)=>(
<li className="text-[17px] chakra text-sec font-black max-sm:text-[15px]" key={index}>{slot.name},</li>
  ))
  }
 </ul>
 <ul className="flex flex-wrap gap-2 items-center">
  <p className="text-lg font-bold text-acc chakra max-sm:text-base">Platforms:</p>
{res && res.platforms &&
  res.platforms.map((slot: any, index)=>(
<li className="text-[17px] chakra text-sec font-black max-sm:text-[15px]" key={index}>{slot.name},</li>
  ))
  }
 </ul>
  </div>
  
  {res.summary && 
    res.summary.length < 500 ?
  <p className="text-sec chakra text-xl my-10 bg-white p-3 sh10 rounded-md">{res.summary}</p>:
  <div >

    {res.summary ?(
      summ ?
      <p className="text-sec chakra text-xl py-10">{res.summary.substring(0,10000)}
      <button onClick={()=>setSumm(!summ)} className="text-acc m-1">Less</button>
      </p>:
      <p className="text-sec chakra text-xl py-10 ">{res.summary.substring(0,601)}
      <button onClick={()=>setSumm(!summ)} className="text-acc m-1">More</button>
      </p>
    ) :
    <p>-</p>
   

    }
  
  </div>
  }
  

  <div className="bg-prim w-full  py-6 flex flex-col gap-8 px-10 rounded-md max-sm:px-1">
    <div className="flex justify-evenly items-center border-b border-sec pb-8 max-sm:grid max-sm:grid-cols-2 max-sm:gap-y-4">


    <ol className="bg-white border-2 border-sec p-2 rounded-md h-[250px] shadow-sm w-56 list-disc border-b-8 rounded-b-2xl max-sm:w-40 sh11 max-sm:col-start-1">
    <h2 className="bangers text-2xl text-sec">Main developer</h2>
    <div className="w-[75%] h-[1px] bg-sec mb-3"></div>
    {res.dev ? 
    res.dev.map((slot: any, index: any)=> (
      <li className="text-sec max-sm:text-base text-xl ml-6 font-black max-sm:font-bold" key={index}>{slot.company.name}</li>
    )):
    <p className="text-white max-sm:text-base text-xl font-black ml-6">-</p>}
  </ol>
  <ol className="bg-white border-2 border-sec py-2 pl-3 rounded-md h-[250px]  w-56 list-disc border-b-8 rounded-b-2xl max-sm:w-40">
  <h2 className="text-2xl bangers text-sec  ">Main publisher</h2>
  <div className="w-[75%] h-[1px] bg-sec mb-3"></div>
    {res.publisher && res.publisher.length > 0 ? 
    res.publisher.map((slot: any, index)=> (
      <li className="text-sec max-sm:text-base text-xl font-black ml-6 max-sm:font-bold" key={index}>{slot.company.name}</li>
    )):
    <p className="text-white max-sm:text-base text-xl font-black ml-6">-</p>}
  </ol>
  <ol className="bg-white border-2 border-sec p-2 rounded-md  w-56 list-disc h-[250px] border-b-8 rounded-b-2xl max-sm:w-40">
  <h2 className="text-2xl bangers text-sec">Game modes</h2>
  <div className="w-[75%] h-[1px] bg-sec mb-3"></div>
    {res.game_modes ? 
    res.game_modes.map((slot: any, index)=> (
      <li className="text-sec max-sm:text-base text-xl font-black ml-6 max-sm:font-bold" key={index}>{slot.name}</li>
    )):
    <p className="text-white max-sm:text-base text-xl font-black ml-6">-</p>}
  </ol>
  <ol className="bg-white border-2 border-sec p-2 rounded-md h-[250px] w-56 list-disc border-b-8 rounded-b-2xl max-sm:w-40">
  <h2 className="text-2xl bangers text-sec">player perspectives</h2>
  <div className="w-[75%] h-[1px] bg-sec mb-3"></div>
    {res.player_perspectives ? 
    res.player_perspectives.map((slot: any, index:any)=> (
      <li className="text-sec max-sm:text-base text-xl font-black ml-6 max-sm:font-bold" key={index}>{slot.name}</li>
    )):
    <p className="text-white max-sm:text-base text-xl font-black ml-6">-</p>}
  </ol>
  </div>
    <div className="w-full px-20 flex gap-10 max-sm:px-2 max-sm:grid max-sm:grid-rows-2">
        <div className="flex min-w-[50%] min-h-32 gap-3 rounded-lg justify-between max-sm:row-start-1">
    <div className="py-5 bg-white w-1/2 rounded-sm sh10 pl-5 ">
      <h2 className="text-sec text-3xl bangers ">Franchises</h2> 
      <div className="h-[2px] w-[60%] bg-acc mb-3"></div>
      {res.franchises ? 
    res.franchises.map((slot: any)=>(
      <p className="text-sec text-lg chakra" key={slot.id}>{slot.name}</p>
    ))  :
    <p className="text-lg text-sec">-</p>
    }
    </div>
    
    <div className="py-5 bg-white w-1/2 pl-5 sh10 min-h-32 rounded-sm">
    <h2 className="text-sec text-3xl bangers">Series</h2>
    <div className="h-[2px] w-[40%] bg-acc mb-3"></div>
      {res.collections ? 
    res.collections.map((slot: any)=>(
      <p className="text-sec text-lg chakra" key={slot.id}>{slot.name}</p>
    ))  :
    <p className="text-lg text-sec">-</p>
    }
    </div>
    </div>
      <div className="bg-white rounded-sm p-2 sh10 w-full pl-5 max-sm:row-start-2">
    <h2 className="text-sec text-3xl bangers">DLCs</h2>
    <div className="h-[2px] w-[7%] bg-acc mb-3"></div>
      {res.expansions ? 
    res.expansions.map((slot: any)=>(
      <p className="text-sec text-lg chakra" key={slot.id}>{slot.name}</p>
    ))  :
    <p className="text-xl text-sec">No DLC available</p>
    }
    </div>
  </div>
   
  </div>
  
  <div className={`relative mt-10 bg-white px-3 py-5 sh10 rounded-md  ${chars ? 'text-sec':'text-sec'} `}>
    
    <h1 className="text-sec text-4xl bangers  pl-2">Story</h1>
    <div className="w-12 h-[2px] bg-acc mb-10 ml-2"></div>
    {res.storyline &&
    res.storyline.length < 1500 ?
  <p className="text-sec chakra text-xl ">{res.storyline}</p>:
  <div >

    {res.storyline ?(
      chars ?
      <p className="text-sec chakra text-xl o">{res.storyline.substring(0,10000)}
      <button onClick={()=>setChars(!chars)} className="text-acc m-1">Less</button>
      </p>:
      <p className="text-sec chakra text-xl o">{res.storyline.substring(0,1000)}
      <button onClick={()=>setChars(!chars)} className="text-acc  m-1">More</button>
      </p>
    ) :
    <p>-</p>
   

    }
  
  </div>
  
  }
  </div>
  <div className="flex flex-col p-[10px]  my-10 max-sm:p-1">
    <h2 className="text-sec text-4xl bangers mt-3 pl-2">Similar games</h2>
    <div className="w-32 h-[2px] bg-acc mb-4 ml-2"></div>
    

      
  <Cover tests = {{sim}}  />
    
  

    
  </div>
</div>
 </div>
 


   }
   { errMess &&
   <div className="absolute top-[15%] right-10 bg-white p-3">
   <p className="text-lg text-black">{errMess}</p>
   </div>
   }
   <div className={` ${toggle ? "absolute": "hidden"} z-50 inset-0 top-[25%] left-[30%] w-[650px] h-[350px] bg-sec sh4 rounded-md max-sm:left-4  max-sm:w-[90%] max-sm:h-fit`}>
    <div className=" border-b-2 border-acc flex mt-10 mx-5 max-sm:mx-2">
    <p className="text-white text-2xl space mb-6 ml-2 max-sm:text-lg">{res?.name}</p>
    
    </div>
    <form onSubmit={handleSubmit} className="ml-8  flex gap-10 mt-16 items-center max-sm:ml-1 max-sm:flex-col max-sm:mt-10">
      <div className="flex flex-col">
      <label htmlFor="status" className="text-white text-lg">Status: </label>
      <select name="status" id="status" className="outline-none w-48 h-9 pl-2 rounded-sm bg-prim"
      required
      onChange={(e) => setReview({...review, status: e.target.value})}
      >
        <option value="playing" >Playing</option>
        <option value="completed">Completed</option>
        <option value="plan">Plan to play</option>
        <option value="paused">Paused</option>
        <option value="dropped">Dropped</option>
      </select>
      </div>
      <div className="flex flex-col">
        <label htmlFor="score" className="text-prim text-lg">Score: </label>
      <input type="number"
      id="score"
      name="score"
      min={1}
      max={10}
      className="w-48 h-9 bg-prim pl-2 rounded-sm "
      maxLength={2}
      step = ".1"
      required
      onChange={(e) => setReview({...review, score: Number(e.target.value)}) }
       />
       </div>
       <button type="submit" name="save" className="border-2 border-prim text-acc  h-9 px-5 self-end chakra text-xl font-bold max-sm:mb-3 max-sm:mr-3
       
       ">Save</button>
    </form>
    <p className="text-prim absolute top-2 right-4 space text-xl cursor-pointer" onClick={() => setToggle(!toggle)} >X</p>
  </div>
</div>
  
    )

}
export default GameDetail