
import { Link, useNavigate } from "react-router-dom"
import { useAuth } from "./authContext"
import Icon from '@mdi/react';
import { mdiMagnify } from '@mdi/js';
import { useState } from "react";



const Navbar: React.FC = () => {

    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [value, setValue] = useState<string>('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        navigate("/search", {state:{value}})
    }

    return(
        <div className="flex px-56 justify-between items-center w-screen h-[10%]">
            <div>
                <h1 className="text-lg text-sec "><Link to="/">Robnite</Link></h1>
            </div>
            <div className="w-2/4">
                <form onSubmit={handleSubmit} className="w-full relative">
                    <input type="text" 
                    className="w-full h-10 rounded-3xl pl-5"
                    placeholder="Search..."
                    minLength={1}
                    onChange={(e)=> setValue(e.target.value)}
                    value={value}
                    />
                    <button type="submit">
                        <Icon path={mdiMagnify} size={1.3} className="text-prim absolute top-[5px] right-4" />
                    </button>
                </form>
            </div>
            <div className="flex gap-5">
                <Link to="/login"><h2 className="text-lg text-sec">Log in</h2></Link>
                <Link to="/signup"><h2 className="text-lg text-sec">Sign up</h2></Link>
                <div>
            <h1 className="text-white">Welcome, {user?.username || 'User'}!</h1>
            <button onClick={logout} className="text-white">Logout</button>
        </div>
            </div>
        </div>
    )
}
export default Navbar