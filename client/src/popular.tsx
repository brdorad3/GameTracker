
import { useEffect, useState } from "react";
import PopGames from "./popularGames";
import { Link } from "react-router-dom";
import Icon from '@mdi/react';
import { mdiChevronLeft, mdiChevronRight } from "@mdi/js";


const Popular = () => {

const [res, setRes] = useState<any[]>([])
const [index, setIndex] = useState(0)
const [show, setShow] = useState(false)

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
                  'Authorization': 'Bearer fos399vwik27rr0m3tprazhvafx4zj',
                },
                body: `fields game_id, popularity_type,value;
                 limit 50;sort value desc;
                 
                 `,
              }
            );
            const data = await response.json();
            
            

            
            setRes(data);
            
          } catch (err) {
            console.error(err);
          }
        };
        fetchData();
      }, []);

      useEffect(() => {
        const timer = setTimeout(() => {
          setShow(true);
        }, 1300);
        return () => clearTimeout(timer);
      }, [])

      const handleRight = () => {
    
        if (index >= 2) {
          setIndex(0);
        } else {
          
          setIndex(index + 1);
        }
      }
      const handleLeft = () => {
        
        if (index <= 0) {
          setIndex(2);
        } else {
          
          setIndex(index - 1);
        }
      }

    return (
        <>
        <div className="px-60 py-12 flex flex-col gap-12 max-md:px-5">
          <div className="flex justify-between">
            <div>
        <h1 className="text-sec text-3xl chakra pb-1 font-bold">POPULAR RIGHT NOW</h1>
        <div className="w-24 h-[2px] bg-acc"></div>
        </div>
        <div className="self-end">
          <Link to="/popularList" state={res}>
          <p className="ani text-sec chakra">See all</p>
          </Link>
        </div>
          </div>
        <div className="flex justify-between px-2 max-md:flex-col max-md:gap-5 py-5 overflow-hidden relative">
          
          {show ?
          <div className="p-[11px] bg-white absolute top-[40%] left-5 z-50 cursor-pointer rounded-full" onClick={() => handleLeft()}>
          <Icon path={mdiChevronLeft} size={1.4} className="text-sec hover:text-slate-600"></Icon>
        </div>:
        null
          }
          
          <PopGames state={{res, index}} />
        
        {show ? 
        <div className="p-[11px] bg-prim absolute top-[40%] right-5 z-50 rounded-full cursor-pointer" onClick={() => handleRight()}>
        <Icon path={mdiChevronRight} size={1.4} className="text-sec hover:text-slate-600"></Icon>
        </div>:
        null
        }
            
            </div>
        </div>
        </>
    )
}
export default Popular