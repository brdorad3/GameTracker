import { useLocation } from "react-router-dom"
import { useEffect, useState } from "react";
import Navbar from "./navbar";

interface ress{
  name: string,
  artworks: [],
  coverUrl: string,
  filteredArtwork: string,
  realCover: string,
  rel: number,
  age: any,
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
                body: `fields name, artworks.url, cover.url, first_release_date, age_ratings.* ;
                where id = ${location.state};
                 `,
              }
            );
            
            const data = await response.json();

            if (data.length > 0) {
              const game = data[0];
              const filteredArtworks = game.artworks.filter((artwork: any) => {
                const url = artwork.url.split("/t_thumb/")[1];
                return url.startsWith("ar");
              });
            
           
            const gamesWithCovers = data.map((game: any, index: any) => ({
                ...game,
                coverUrl: game.artworks[0].url ? game.artworks[0].url.replace('t_thumb', 't_1080p') : console.error("no link") ,
                filteredArtwork: filteredArtworks.length > 0 ? filteredArtworks[0].url.replace("t_thumb", "t_1080p") : null,
                realCover: game.cover ? game.cover.url.replace('t_thumb', 't_cover_big') : '',
                rel: new Date(game.first_release_date * 1000).getFullYear(),
                age: game.age_ratings.filter((slot: any)=>{
                  if(slot.category == 1){
                    return slot;
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
   <div className="relative w-full h-[90%] px-56 py-12 text-white">
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
   <div>
    <img src={res.realCover} alt="" className="w-[264px] h-[374px] relative" />
   </div>
  </div>
 </div>:
 
  <div className="relative w-full h-[90%] px-36 py-12 text-white">
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
  <div>
    <img src={res?.realCover} alt="" className="w-[264px] h-[374px] z-50 relative" />
   </div>
</div>
</div>
   

   }
   
</div>
  
    )

}
export default GameDetail