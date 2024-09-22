import { useState } from "react"
import Navbar from "./navbar"
import { useNavigate } from "react-router-dom"
import Icon from '@mdi/react';
import { mdiMagnify} from '@mdi/js';

const MobSearch = () => {
    const [value, setValue] = useState('')
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
          navigate("/search", {state:{value}})
        
       
    }

    return(
        <>
        <Navbar/>
        <div className="w-screen flex flex-col  h-[92%]">
        <h1 className="text-5xl p-8 space font-medium">Search</h1>
        <form onSubmit={handleSubmit} className="w-full justify-center flex gap-5">
            <input type="text"
             className="w-4/5 h-10  pl-5 bg-prim border-b-2 border-white outline-none"
             placeholder="Search..."
             minLength={2}
             maxLength={120}
             onChange={(e)=> setValue(e.target.value)}
             id="search"
             value={value} />
             <button type="submit">
                <Icon path={mdiMagnify} size={1.2}></Icon>
             </button>
        </form>
        </div>
        </>
    )
}
export default MobSearch