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

//const res = navigate.state
const [test, setTest] = useState<any[]>([])




useEffect(()=>{

console.log(filters)
console.log(res)
const test = res.filter((slot: any) => {
    if(slot.status == filters){
        
        return slot;
    }
    
})
res.sort((a: any,b: any) => b.rating - a.rating)

setTest(test)

},[filters])

test && test.length > 0 && console.log(test)


const handleDelete = async (e: any) => {
    console.log(e)
    console.log(res)
    setTest(test.filter((item: any) => item.id !== e.id));  
    setRes(res.filter((item: any) => item.id !== e.id));    
   await axios.post(import.meta.env.VITE_URL + "/review-delete", {e}).then((res)=>{
    console.log(res)
   })

}
  
    
    return(
        <>
        <Navbar></Navbar>
        <div className="w-screen  flex">
            <div className="w-[40%] flex flex-col items-center mt-[200px]">
                    <h1 className="text-lg chakra">Filters;</h1>
                    <div className="pt-5 pb-10">
                            <ul className="flex flex-col gap-1">
                                <li className="text-sec space hover:bg-acc" onClick={()=> setFilters('all')}>All</li>
                                <li className="text-sec space hover:bg-acc" onClick={()=> setFilters('playing')}>Playing</li>
                                <li className="text-sec space hover:bg-acc" onClick={()=> setFilters('completed')}>Completed</li>
                                <li className="text-sec space hover:bg-acc" onClick={()=> setFilters('dropped')}>Dropped</li>
                                <li className="text-sec space hover:bg-acc" onClick={()=> setFilters('paused')}>Paused</li>
                                <li className="text-sec space hover:bg-acc" onClick={()=> setFilters('plan')}>Planning</li>
                            </ul>
                    </div>
                    <h1 className="pb-3 text-lg">Sort;</h1>
                   <form >
                    <select name="rate" id="rate">
                        <option value="rating">Rating</option>
                        <option value="reviews">Number of ratings</option>
                    </select>
                   </form>

            </div>
            <div className="w-full flex items-end justify-start">
        <div className="w-[90%] bg-sec mt-[150px] min-h-[70%] flex justify-evenly rounded-lg pb-8">
            <div className="grow-[2] flex flex-col">
                <div className="flex justify-between pl-8 py-7">
                    <div className="w-[60%] flex justify-center chakra font-bold text-acc">GAME</div>
                    <div className="w-[15%]  flex justify-center chakra font-bold text-acc">STATUS</div>
                    <div className="w-[15%]  flex justify-center chakra font-bold text-acc">SCORE</div>
                    <div className="w-[10%]"></div>
                </div>
                
                <div className="flex flex-col gap-5 ">
                {
                    res && filters == 'all' ?
                    res.map((slot: any) => (
                        
                        <div className={`flex justify-between pl-8 py-[6px]  `} >
                            <div className="flex grow-[5] max-w-[60%]">
                                <Link to={`/detail/${slot.id}`} state={slot.id} className="flex gap-3">
                        <img src={slot.cover} alt="" className="w-12 h-16" />
                        <h1 className="pt-1 chakra text-white">{slot.game}</h1>
                        </Link>
                        </div>
                        <div className="w-[15%] flex justify-center items-center">
                            <p className="text-prim chakra">{slot.status}</p>
                           
                        </div>
                        <div className="w-[15%] flex justify-center text-prim items-center">
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
                        
        <div className="flex justify-between pl-8 py-[6px] ">
            <div className="flex grow-[5] max-w-[60%] ">
                <Link to={`/detail/${slot.id}`} state={slot.id} className="flex gap-3">
        <img src={slot.cover} alt="" className="w-12 h-16" />
        <h1 className="pt-1 chakra text-white">{slot.game}</h1>
        </Link>
        </div>
        <div className="w-[15%] flex justify-center items-center">
            <p className="text-prim chakra">{slot.status}</p>
           
        </div>
        <div className="w-[15%] flex justify-center items-center">
            <p className="text-prim chakra font-bold">{slot.rating}</p>
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