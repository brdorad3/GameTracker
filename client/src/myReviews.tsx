import Navbar from "./navbar"
import { useLocation, Link } from "react-router-dom"
import { useState, useEffect } from "react"
import Icon from '@mdi/react';
import { mdiTrashCanOutline } from '@mdi/js';
import axios from "axios";



const MyReviews = () => {

const navigate = useLocation()
const [filters, setFilters] = useState('all')
const [res, setRes] = useState(navigate.state)
const [test, setTest] = useState<any[]>([])


useEffect(()=>{

const test = res.filter((slot: any) => {
    if(slot.status == filters){
        
        return slot;
    }
    
})
res.sort((a: any,b: any) => b.rating - a.rating)

setTest(test)

},[filters])

const handleDelete = async (e: any) => {
    setTest(test.filter((item: any) => item.id !== e.id));  
    setRes(res.filter((item: any) => item.id !== e.id));    
   await axios.post(import.meta.env.VITE_URL + "/review-delete", {e})

}
  
    
    return(
        <>
        <Navbar></Navbar>
        <div className="w-full px-60  flex justify-between max-sm:px-2 max-lg:px-5 max-md:flex-col ">
            <div className="w-[40%] flex flex-col items-center mt-[200px] justify-center max-md:mt-10 max-md:w-full">
                    <h1 className="text-lg chakra">Filters;</h1>
                    <div className="pt-5 pb-10">
                            <ul className="flex flex-col gap-1 max-md:flex-row max-md:text-sm">
                                <li className="text-sec space hover:bg-acc rounded-md p-1 cursor-pointer" onClick={()=> setFilters('all')}>All</li>
                                <li className="text-sec space hover:bg-acc rounded-md p-1 cursor-pointer" onClick={()=> setFilters('playing')}>Playing</li>
                                <li className="text-sec space hover:bg-acc rounded-md p-1 cursor-pointer" onClick={()=> setFilters('completed')}>Completed</li>
                                <li className="text-sec space hover:bg-acc rounded-md p-1 cursor-pointer" onClick={()=> setFilters('dropped')}>Dropped</li>
                                <li className="text-sec space hover:bg-acc rounded-md p-1 cursor-pointer" onClick={()=> setFilters('paused')}>Paused</li>
                                <li className="text-sec space hover:bg-acc rounded-md p-1 cursor-pointer" onClick={()=> setFilters('plan')}>Planning</li>
                            </ul>
                    </div>
            </div>
            <div className="w-full flex items-end justify-start">
        <div className="w-full bg-white sh10 mt-[150px] min-h-[70%] flex justify-evenly rounded-lg pb-8 max-md:mt-7">
            <div className="grow-[2] flex flex-col">
                <div className="flex justify-between mx-8 pl-3 py-7 max-md:mx-1 max-md:pl-1">
                    <div className="w-[60%] flex justify-center chakra font-bold text-sec text-sm">GAME</div>
                    <div className="w-[15%]  flex justify-center chakra font-bold text-sec text-sm">STATUS</div>
                    <div className="w-[15%]  flex justify-center chakra font-bold text-sec text-sm">SCORE</div>
                    <div className="w-[10%]"></div>
                </div>
                
                <div className="flex flex-col ">
                {
                    res && filters == 'all' ?
                    res.map((slot: any) => (
                        
                        <div className="flex justify-between mx-8 pl-3 py-5 border-b border-sec max-lg:mx-1"  >
                            <div className="flex grow-[5] max-w-[60%]">
                                <Link to={`/detail/${slot.id}`} state={slot.id} className="flex gap-3">
                        <img src={slot.cover} alt="" className="w-12 h-16" />
                        <h1 className="pt-1 chakra text-sec max-md:text-sm">{slot.game}</h1>
                        </Link>
                        </div>
                        <div className="w-[15%] flex justify-center items-center">
                            <p className="text-sec chakra">{slot.status}</p>
                           
                        </div>
                        <div className="w-[15%] flex justify-center text-sec items-center">
                           {slot.rating != 0 ?
                        slot.rating:
                        <p>N/A</p>   
                        }
                        </div>
                        <div className="w-[10%] flex items-center cursor-pointer" onClick={() => handleDelete(slot)}>
                        <Icon path={mdiTrashCanOutline} size={1} className="text-acc" />
                        </div>
                        </div>
    )):
    test.map((slot: any) => (
                        
        <div className="flex justify-between pl-3 mx-8 py-5 border-b border-sec max-lg:mx-1">
            <div className="flex grow-[5] max-w-[60%] ">
                <Link to={`/detail/${slot.id}`} state={slot.id} className="flex gap-3">
        <img src={slot.cover} alt="" className="w-12 h-16" />
        <h1 className="pt-1 chakra text-sec">{slot.game}</h1>
        </Link>
        </div>
        <div className="w-[15%] flex justify-center items-center">
            <p className="text-sec chakra">{slot.status}</p>
           
        </div>
        <div className="w-[15%] flex justify-center items-center">
            <p className="text-sec chakra font-bold">{slot.rating}</p>
        </div>
        <div className="w-[10%] flex items-center cursor-pointer" onClick={() => handleDelete(slot)}>
        <Icon path={mdiTrashCanOutline} size={1} className="text-acc" />
        </div>
        </div>
                ))}
                </div>
                
            </div>
            
        </div>
            </div>

        </div>
        </>
    )
}
export default MyReviews