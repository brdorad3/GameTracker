import TopRated from "./topRated"
import { Link } from "react-router-dom"
import { useState, useEffect } from "react";
import Icon from "@mdi/react";
import { mdiChevronRight, mdiChevronLeft } from "@mdi/js";

const Rated = () => {

    const [index, setIndex] = useState(0);
    const [show, setShow] = useState(false);

    useEffect(() => {
        const timer = setTimeout(() => {
          setShow(true);
        }, 1500);
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
        <h1 className="text-sec text-3xl font-bold chakra pb-1">BEST RATED GAMES</h1>
        <div className="w-24 h-[2px] bg-acc"></div>
            </div>
        <Link to="/top100" className="self-end">
        <div className="mr-3">
        <h2 className="text-sec self-end ani chakra">See all</h2>
       
        </div>
        </Link>
        </div>
        <div className=" flex justify-between px-2 relative">
        {show ?
          <div className="p-[11px] bg-white absolute top-[40%] left-5 z-50 cursor-pointer rounded-full" onClick={() => handleLeft()}>
          <Icon path={mdiChevronLeft} size={1.4} className="text-sec hover:text-slate-600"></Icon>
        </div>:
        null
          }
        <TopRated state={index} />
        {show ? 
        <div className="p-[11px] bg-white absolute top-[40%] right-5 z-50 rounded-full cursor-pointer" onClick={() => handleRight()}>
        <Icon path={mdiChevronRight} size={1.4} className="text-sec hover:text-slate-600"></Icon>
        </div>:
        null
        }
        </div>
        </div>
        </>
    )
}
export default Rated