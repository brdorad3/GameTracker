import { Link } from "react-router-dom"
import { useAuth } from "./authContext"

const Navbar: React.FC = () => {

    const { user, logout } = useAuth();

    return(
        <div className="flex justify-evenly items-center w-screen h-20">
            <div>
                <h1 className="text-lg text-sec "><Link to="/">Robnite</Link></h1>
            </div>
            <div className="w-2/4">
                <form action="#" className="w-full">
                    <input type="text" 
                    className="w-full h-10 rounded-3xl pl-5"
                    placeholder="Search..."
                    />
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