
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "./authContext"
import Icon from '@mdi/react';
import { mdiMagnify, mdiImageBroken } from '@mdi/js';
import { useState, useEffect } from "react";



const Navbar: React.FC = () => {

    

    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [value, setValue] = useState<string>('')
    const [showMenu, setShowMenu] = useState(false)
    const [responsiveSearch, setResponsiveSearch] = useState(false)
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
                'Authorization': 'Bearer ag34gl29glo4dukxxlx33gmei0j626',
              },
              body: `search "${value}"; fields name, cover.url, first_release_date, platforms.name, total_rating, total_rating_count, themes;
               limit 5;where themes != (42) & total_rating_count > 0;
               
               `,
            }
          );
          const data = await response.json();
          
          
  
          const gamesWithCovers = data.map((game: any) => ({
            ...game,
            coverUrl: game.cover ? game.cover.url.replace('t_thumb', 't_cover_small') : '',
            rel: new Date(game.first_release_date * 1000).getFullYear(),
           
            
            
          }));
          if(value.length === 0) setRes([])
          let fiv =[]
          for (let i = 0; i < 5; i++ ){
            const chunk = gamesWithCovers[i]
            if(chunk == undefined){
                return;
            }
            fiv.push(chunk)
          }
          
          setRes(fiv);
        } catch (err) {
          console.error(err);
        }
      };
      
      fetchData();
    }, [value]);
  

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(window.innerWidth < 500){
          setResponsiveSearch(!responsiveSearch)
          navigate("/mobsearch")
        }else{
          navigate("/search", {state:{value}})
        }
       
    }


    return(
      
        <div className="flex px-64 justify-between items-center w-screen h-[8%] bg-sec max-md:px-2 ">
          
          
        <div>          
          <h1 className="text-2xl font-medium text-prim chakra"><Link to="/">Robnite</Link></h1>
        </div>
           
            <div className="w-[65%] relative max-sm:w-1/3">
                <form onSubmit={handleSubmit} className="w-full relative">
                    <input type="text" 
                    className="w-full h-10 rounded-md pl-5 bg-white pr-16 sh11 max-sm:hidden"
                    placeholder="Search..."
                    minLength={2}
                    maxLength={120}
                    onChange={(e)=> setValue(e.target.value)}
                    id="search"
                    value={value}
                    onFocus={() => setShowMenu(true)}
                    onBlur={() => setShowMenu(false)}
                    
                    />
                    <button type="submit" id="btn" onClick={handleSubmit}>
                        <Icon path={mdiMagnify}  className="text-sec w-7 max-sm:w-6 absolute top-[5px] right-4 max-sm:text-prim max-sm:top-0" />
                    </button>
                    {responsiveSearch &&
                    <form onSubmit={handleSubmit} className="relative">
                    <input className="bg-white sh10 p-1 rounded-sm absolute top-14 left-0 w-[170%]"
                    minLength={2}
                    maxLength={30}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    id="mobile_search"
                    type="text"></input>
                    
                    </form>
                    }
                </form>
                <div onMouseDown={(e) => e.preventDefault()}
                 className={`${showMenu ? "flex flex-col gap-3": "hidden"} w-full justify-center absolute h-fit min-h-16 bg-white top-12 rounded-md z-50 py-3 px-5`}>
                   {res && res.length > 0 ?
                   res.map((slot:any) => (
                    <div className="flex gap-5 items-center hover:bg-slate-100">
                        {slot.coverUrl  ?
                         <img src={slot.coverUrl} alt="" className="w-12 h-16" />:
                         <Icon path={mdiImageBroken} size={1.3} className="" />
                         }
                         <Link to={`/detail/${slot.id}`} state={slot.id}>
                    <div className="flex gap-1">
                   <p className="hover:underline">{slot.name}</p>
                   <p>&#x28;{slot.rel}&#x29;</p>
                   </div>
                   </Link>
                   </div>
                   )):
                  <p className="">Enter a name</p>
                  }
                </div>
            </div>

            
             <div className="flex gap-5 items-center">
             <Link to="/login"><h2 className="text-lg text-prim chakra nav hover:underline hover:underline-offset-2">Log in</h2></Link>
             <Link to="/signup"><h2 className="text-lg text-prim chakra nav hover:underline hover:underline-offset-2">Sign up</h2></Link>
             {user &&
         <button onClick={logout} className="text-acc text-lg chakra font-black">Logout</button>
         }

         </div>

                </div>
        )
}
export default Navbar