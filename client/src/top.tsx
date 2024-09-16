import Navbar from "./navbar"
import { useEffect, useState} from "react";
import Icon from '@mdi/react';
import { mdiStar } from '@mdi/js'
import { Link } from "react-router-dom";
import { mdiMagnify } from '@mdi/js';



import { mdiMenuUp } from '@mdi/js';

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
    else if(item == 14) return "Upate"
}

const Top100 = () => {

    const [res, setRes] = useState<any[]>([]);
    const [val, setVal] = useState('total_rating')
    const [plat, setPlatform] = useState<any[]>([])
    const [search, setSearch] = useState('');
    const [target, setTarget] = useState('')
    const [closeMenu, setCloseMenu] = useState(false)
    const [year, setYear] = useState<any>()
    const [yearSubmit, setYearSubmit] = useState(false)


    useEffect(()=>{
const fetchData = async () => {
  try{
    const response = await fetch(
      "http://localhost:8080/https://api.igdb.com/v4/platforms",
      {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Client-ID': '28k8glj9djgyr0opcwll92beduld5h',
          'Authorization': 'Bearer ag34gl29glo4dukxxlx33gmei0j626',
        },
        body: `fields name;
        search "${search}";
         limit 5;
         
         `,
      }
    );
    const data = await response.json();
    
    setPlatform(data)
  }catch(e)
  {
    console.error(e)
  }
}
fetchData()
  },[search])

    useEffect(() => {
        const fetchData = async () => {
          try {

            let query = `fields name, total_rating, cover.url, total_rating_count, first_release_date, category, platforms.name;`;
            
            if (target) {
              query += `where total_rating_count > 80 & platforms.name = "${target}"`;
            }else{
              query += `where total_rating_count > 80`
            }
            if (year) {
              query += ` & first_release_date >= ${new Date(year, 0, 1).getTime() / 1000} & first_release_date < ${new Date(Number(year) + 1, 0, 1).getTime() / 1000};`;
          }else{
            query += ";"
          }

            
      
            query += ` sort ${val} desc; limit 100;`;

            const response = await fetch(
              "http://localhost:8080/https://api.igdb.com/v4/games",
              {
                method: 'POST',
                headers: {
                  'Accept': 'application/json',
                  'Client-ID': '28k8glj9djgyr0opcwll92beduld5h',
                  'Authorization': 'Bearer ag34gl29glo4dukxxlx33gmei0j626',
                },
                body: query,
              }
            );
            const data = await response.json();
           
            
    
            const gamesWithCovers = data.map((game: any) => ({
              ...game,
              coverUrl: game.cover ? game.cover.url.replace('t_thumb', 't_cover_small') : '',
              rel: new Date(game.first_release_date * 1000).getFullYear(),
            }));
  
            setRes(gamesWithCovers);
            
          } catch (err) {
            console.error(err);
          }
        };
        fetchData();
      }, [val, target, yearSubmit]);

      const handleChange = (e:any) => {
        e.preventDefault()
        setVal(e.target.value)
       
      }
      const handleInputChange = (e:any) => {
        e.preventDefault()
        setSearch(e.target.value)
        setCloseMenu(false)
       
      }

      const handleMenuClose = () => {
        setTarget('')
        setSearch('')
       
      }
      const handleYearSubmit = (e: any) => {+
        e.preventDefault();
        setYearSubmit(!yearSubmit)
      }

return(
    <>
    <Navbar/>
    <div className="bg-prim">
    <div className="mx-64 bg-white rounded-md sh10 mt-5">
        <div className="pl-[60px] py-8 border-b-2 border-sec">
            <h1 className="text-3xl pb-3 text-sec chakra font-bold">Top 100 games</h1>
            <div className="">
                <div  className="flex gap-5 " >
                  <form >
                    <div className="flex flex-col relative" >
                      
                    <label className="p-1 text-lg text-sec space" htmlFor="platform">Platform:</label>
                    <input type="text" className="rounded-md h-9 w-80 p-1 pl-2 bg-prim sh11 placeholder-slate-600 border-2 border-sec" placeholder="Xbox 360 "
                     id="platform"
                     maxLength={25}
                    onChange={(e) => handleInputChange(e)}
                    value={search}
                    />
                    <div className="absolute top-[41px] right-7 cursor-pointer" onClick={() => handleMenuClose()} >
                      <p className="space">x</p>
                    </div>
                    <div className="absolute top-[42px] right-1  cursor-pointer" onClick={()=>setCloseMenu(true)}>
                    <Icon path={mdiMenuUp} size={1} className="text-sec" />
                    </div>
                    {!closeMenu && search && search.length > 0 &&
                    
                     <ul className="absolute top-20 w-full h-fit bg-white rounded-sm">
                      {plat.map((slot: any, index) => (
                        <li key={index} className="text-lg hover:bg-acc pl-2 chakra cursor-pointer py-1" onClick={(e:any) => setTarget(e.target.innerText)}>{slot.name}</li>
                      ))}
                     </ul>
                    
                    }
                  
                    </div>
                    
                    
                    </form>
                    <form className="flex flex-col relative" onSubmit={(e) => handleYearSubmit(e)}>
                    <label className="p-1 text-lg text-sec space" htmlFor="year">Year:</label>
                    <input type="text" className="rounded-md  h-9 w-80 p-1 pl-2 bg-prim border-2 border-sec sh11 placeholder-slate-600" placeholder="2015 " id="year"
                    minLength={4}
                    maxLength={4}
                    onChange={(e) => setYear(e.target.value)}
                    />
                    <button className="absolute top-[42px] right-2" type="submit" >
                    <Icon path={mdiMagnify} size={1} />
                    </button>
                    </form>
                    <div className="flex items-center gap-2 self-end">
                      <label htmlFor="sort" className="p-1 text-lg text-sec space">Sort by:</label>
                    <select name="sort" id="sort" className="py-1 px-2 rounded-md bg-prim sh11 border-2 border-sec " onChange={handleChange} >
                      <option value="total_rating" className="bg-prim">Rating</option>
                      <option value="total_rating_count" className="bg-prim">Total reviews</option>
                    </select>
                    </div>
                </div>
            </div>
        </div>
        <div className="px-10 py-5 flex flex-col ">
            {res &&
            res.map((slot:any, index) => (
                <div className="flex justify-between border-b-[1px] border-sec py-4 pl-5" key={index}>
                    <div className="flex gap-5">
              <Link to={`/detail/${slot.id}`} state={slot.id}>  <img src={slot.coverUrl} alt="" className="border border-sec" /> </Link>
                <div className="flex flex-col">
                    <div className="flex pt-2">
                    <Link to={`/detail/${slot.id}`} state={slot.id} className="flex items-end gap-1 text-sec gr">
                      <p className=" text-lg  chakra font-bold">{index + 1}. </p>
                    <h3 className=" text-lg  chakra font-black ">{slot.name}</h3></Link>
                    </div>
                    <div className="flex gap-2">
                        <p className="text-sec chakra">{slot.rel}</p>
                        <p className="text-sec space">	&#40;{slot.total_rating_count} total ratings&#41;</p>
                    </div>
                    <div className="self-start  py-[2px] px-[6px] rounded-[4px] border-2 bg-acc border-sec mt-2">
                        <p className="text-sec chakra font-bold">{cat(slot.category)}</p>
                    </div>
                </div>
                </div>
                <div className="flex items-center mr-10 gap-1">
                <Icon path={mdiStar} size={1.4} className="text-acc" />
                    <p className="text-[22px] text-sec chakra font-medium ">{(slot.total_rating/10).toFixed(1)}/10</p>
                    
                </div>
                </div>
            ))
            }
        </div>
    </div>
    </div>
    </>
)
}

export default Top100