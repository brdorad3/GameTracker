import { useAuth } from "./authContext";
import Navbar from "./navbar";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiImageBroken } from '@mdi/js';



const Search = () => {
  const location = useLocation();
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
            body: `search "${location.state.value}"; fields name, cover.url, first_release_date, platforms.name, total_rating, total_rating_count;
             limit 8;
             
             `,
          }
        );
        const data = await response.json();
        
        

        const gamesWithCovers = data.map((game: any, index: any) => ({
          ...game,
          coverUrl: game.cover ? game.cover.url.replace('t_thumb', 't_cover_small_2x') : '',
          rel: new Date(game.first_release_date * 1000).getFullYear(),
         
          
          
        }));
        
        setRes(gamesWithCovers);
        
      } catch (err) {
        console.error(err);
      }
    };
    fetchData();
  }, [location.state.value]);


  return (
    <>
      <Navbar />
      {
        res.length > 0 ?
      
      <ul className="flex flex-col gap-10 px-64 py-10">
        {res.map((game, index) => (
          <li key={index} className="flex gap-5 bg-sec  rounded-xl">
            {game.cover && game.coverUrl ? (
             <Link to={`/detail/${game.id}`} state={game.id} > <img src={game.coverUrl} alt={game.name} className="w-[110px] h-[140px] bg-sec rounded-l-xl" /></Link>
            ) : (
              <div className="w-[110px] h-[140px] bg-sec rounded-xl flex justify-center items-center">
                <Icon path={mdiImageBroken} size={2} className="text-prim"/>
              </div>
              
            )}
            <div>
            <div className="flex gap-2 pt-3">
           <Link to={`/detail/${game.id}`} state={game.id}> <p className="text-white text-xl font-medium ">{game.name}</p> </Link>
            <p className="text-prim text-xl">&#40; {game.rel} &#41;</p>
            </div>
            <div>
            <ul className="flex gap-1">
              
                  { game.platforms && game.platforms.map((platform: any, index: number) => (
                    <li key={index} className="text-acc text-[12px] font-semibold">{platform.name}       /</li>
                  ))}
                </ul>
            </div>
            <div>
              {game.total_rating ? 
            <p className="text-prim">{Math.floor(game.total_rating)}/100 &#40;{game.total_rating_count}&#41; </p>:
            <p className="text-prim">No ratings yet</p>  
            }
              
            </div>
            </div>
          </li>
        ))}
      </ul>:
      <h1 className="text-white">Nuh uh</h1>

}
    </>
  );
};

export default Search;


/*
[
    {
        "id": 119133,
        "age_ratings": [
            57164,
            57165,
            57166,
            57167,
            57168,
            57169,
            57170
        ],
        "aggregated_rating": 96.9,
        "aggregated_rating_count": 14,
        "alternative_names": [
            24917,
            79656,
            83944,
            102386,
            123543,
            130570
        ],
        "artworks": [ !!!!!!!!!!!
            52129
        ],
        "bundles": [
            287975,
            287984
        ],
        "category": 0,
        "cover": 212094,
        "created_at": 1558897244,
        "expansions": [
            240009
        ],
       
        "first_release_date": 1645747200,
        "game_modes": [
            1,
            2,
            3
        ],
        "genres": [
            12,
            31
        ],
        "hypes": 96,
        "involved_companies": [
            158585,
            176259
        ],
        "keywords": [
            17326
        ],
        "multiplayer_modes": [
            28375
        ],
        "name": "Elden Ring",
        "platforms": [
            6,
            48,
            49,
            167,
            169
        ],
        "player_perspectives": [
            2
        ],
        "rating": 95.54719246212946,
        "rating_count": 1021,
        "release_dates": [
            320703,
            320704,
            320705,
            320706,
            320707
        ],
        "screenshots": [//////////
            487786,
            487787,
            487788,
            487789,
            487790,
            487791,
            487792,
            703441
        ],
        "similar_games": [
            19164,
            55038,
            55199,
            81249,
            96217,
            103168,
            103303,
            106987,
            113360,
            115653
        ],
        "slug": "elden-ring",
        "storyline": "Elden Ring takes place in the Lands Between, a fictional realm over which several demigods rule. It was previously ruled over by the immortal Queen Marika, who acted as keeper of the Elden Ring, a powerful force that manifested itself as the physical concept of order. When Marika shattered the Elden Ring and disappeared, her demigod children began fighting over pieces of the Ring in an event called The Shattering. Each demigod has a shard of the Ring called a Great Rune, which corrupts them with power. In the game, the player character is a Tarnished, one of a group of exiles from the Lands Between who are summoned back after the Shattering. The player must traverse the realm to repair the Elden Ring and become the Elden Lord.",
        "summary": "Elden Ring is a fantasy, action and open world game with RPG elements such as stats, weapons and spells. Rise, Tarnished, and be guided by grace to brandish the power of the Elden Ring and become an Elden Lord in the Lands Between.",
        "tags": [
            1,
            17,
            38,
            268435468,
            268435487,
            536888238
        ],
        "themes": [ !!!!!!!!!!!!!!!!!!!!!!!!
            1,
            17,
            38
        ],
        "total_rating": 96.22359623106473,
        "total_rating_count": 1035,
        "updated_at": 1721326011,
        "url": "https://www.igdb.com/games/elden-ring",
        "videos": [
            50583,
            50584,
            58619,
            61874,
            62187,
            62188,
            64564
        ],
        
        "checksum": "cd9b760a-bcbc-e2eb-c00a-50834283bfe0",
        
        "game_localizations": [
            11,
            1484
        ]
    },

    */