
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "./authContext"
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import { useState } from "react";



const Navbar: React.FC = () => {

    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [value, setValue] = useState<string>('')
    const [showMenu, setShowMenu] = useState(false)

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        navigate("/search", {state:{value}})
    }

    return(
        <div className="flex px-64 justify-between items-center w-screen h-[8%] bg-sec max-md:px-5 ">
            <div>
                <h1 className="text-2xl text-prim chakra"><Link to="/">Robnite</Link></h1>
            </div>
            <div className="w-[65%] relative">
                <form onSubmit={handleSubmit} className="w-full relative">
                    <input type="text" 
                    className="w-full h-10 rounded-lg pl-5 bg-white pr-16"
                    placeholder="Search..."
                    minLength={1}
                    maxLength={120}
                    onChange={(e)=> setValue(e.target.value)}
                    onClick={(e) => setShowMenu(!showMenu)}
                    value={value}
                    />
                    <button type="submit">
                        <Icon path={mdiMagnify} size={1.3} className="text-sec absolute top-[5px] right-4" />
                    </button>
                </form>
                <div className={`${showMenu ? "flex": "hidden"} w-full absolute h-16 bg-red-900 top-12 rounded-md`}></div>
            </div>
            <div className="flex gap-5 items-center">
                <Link to="/login"><h2 className="text-lg text-prim chakra">Log in</h2></Link>
                <Link to="/signup"><h2 className="text-lg text-prim chakra">Sign up</h2></Link>
                {user &&
            <button onClick={logout} className="text-acc text-lg chakra font-black">Logout</button>
            }
                <div>
            
            
            
        </div>
            </div>
        </div>
    )
}
export default Navbar