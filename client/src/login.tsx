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
    console.log(response)
    setMessage([]);
    navigate("/")
  })

.catch(function (e) {
const newMessages: string[] = [];
console.log(e)
   
    console.log( e.response.data.message)
        
    setMessage(e.response.data.message);
    console.log(message)
});
   
}

    return (
        <>
        <Navbar/>
        <div className="w-screen h-[90%] flex justify-center relative">
            <div className="absolute top-[25%] flex flex-col gap-10 items-center justify-center">
            <h1 className="text-4xl text-sec">Log in</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-14">
                <div className="flex flex-col gap-8">
                <input type="text"
                className="w-80 h-14 rounded-[4px] pl-4 bg-sec placeholder-prim"
                minLength={3}
                maxLength={25}
                required
                value={username}
                onChange={(e)=> setUsername(e.target.value)}
                placeholder="Username"
                />
                <input type="password"
                className="w-80 h-14 rounded-[4px] pl-4 bg-sec placeholder-prim"
                minLength={8}
                maxLength={25}
                required
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                placeholder="Password"
                />
                
                </div>
                <button type="submit" className="bg-sec text-prim px-6 py-3 rounded-[4px]">Submit</button>
            </form>
            <p className="text-white">Already have an account? <Link to="/signup" className="text-sec">Sign up</Link></p>
            </div>
            {message &&
            <p className="text-white">{message}</p>
        }
        </div>
        </>
    )
}
export default Login