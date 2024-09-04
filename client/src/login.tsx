import { Link, useNavigate } from "react-router-dom"
import Navbar from "./navbar"
import axios from "axios"
import { useState } from "react"
import { useAuth } from './authContext';




const Login: React.FC = () => {

const { login } = useAuth();
const navigate = useNavigate()
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [message, setMessage] = useState<string[]>([])

const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    
   await axios.post(import.meta.env.VITE_URL + "/login", { username, password })
   .then(function (response) {
    login(response.data.token);
    setMessage([]);
    navigate("/")
  })

.catch(function (e) {
console.log(e)
setMessage(e.response.data.message);
    
});
   
}

    return (
        <>
        <Navbar/>
        <div className="w-screen h-[92%] flex justify-center relative">
            <div className="absolute top-[25%] flex flex-col gap-10 items-center justify-center bg-white py-10 px-10 rounded-lg sh2">
            <h1 className="text-4xl text-sec space font-black">LOGIN</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-12 relative">
                <div className="flex flex-col gap-6">
                <input type="text"
                className="w-80 h-14 rounded-[4px] pl-4 bg-sec placeholder-prim text-prim " 
                minLength={3}
                maxLength={25}
                required
                value={username}
                onChange={(e)=> setUsername(e.target.value)}
                placeholder="Username"
                />
                <input type="password"
                className="w-80 h-14 rounded-[4px] pl-4 bg-sec placeholder-prim text-prim"
                minLength={8}
                maxLength={25}
                required
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                placeholder="Password"
                />
                {message &&
            <p className="text-red-500 font-bold py-1 px-[13px absolute bottom-[66px]">{message}</p>
        }
                
                </div>
                <button type="submit" className="bg-acc text-sec border-2 border-sec px-6 py-3 rounded-[4px] text-lg font-bold chakra">LOGIN</button>
            </form>
            <p className="text-sec space">Don't have an account? <Link to="/signup" className="text-acc border-b-[1px] border-acc chakra">Sign up</Link></p>
            </div>
            
        </div>
        </>
    )
}
export default Login