import { Link } from "react-router-dom"
import Navbar from "./navbar"
import { ChangeEventHandler, ReactEventHandler, useState } from "react"
import axios from "axios"
import { useNavigate } from "react-router-dom"


const Signup = () => {
const navigate = useNavigate()
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [confirm, setConfirm] = useState('')
const [message, setMessage] = useState<string[]>([])

const handleSubmit = async(e: React.FormEvent) => {
    e.preventDefault()
    await axios.post(import.meta.env.VITE_URL + "/signup", { username, password, confirm }).then(function () {
        setMessage([]);
        navigate("/login")
      })
   
   .catch(function (e) {
    const newMessages: string[] = [];
        e.response.data.errors.forEach((element: any) => {
            console.log(element.msg)
            newMessages.push(element.msg)
            
        });
        setMessage(newMessages);
        console.log(message)
  });
        
    
   
}


 

    return (
        <>
        <Navbar/>
        <div className="w-screen h-[90%] flex  justify-center">
            <div className="absolute top-[25%] flex flex-col gap-10 items-center justify-center">
            <h1 className="text-4xl text-sec">Sign up</h1>
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
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                required
                placeholder="Password"
                />
                 <input type="password"
                 className="w-80 h-14 rounded-[4px] pl-4 bg-sec placeholder-prim"
                 minLength={8}
                 maxLength={25}
                 value={confirm}
                onChange={(e)=> setConfirm(e.target.value)}
                 required
                placeholder="Confirm password"
                />
                </div>
                <button type="submit" className="bg-sec text-prim px-6 py-3 rounded-[4px]">Submit</button>
            </form>
            <p className="text-white">Already have an account? <Link to="/login" className="text-sec">Log in</Link></p>
        </div>
         {message.length > 0 && (
                <ul>
                    {message.map((msg, index) => (
                        <li key={index} className="text-white">{msg}</li>
                    ))}
                </ul>
            )}
        
        </div>
        </>
    )
}
export default Signup