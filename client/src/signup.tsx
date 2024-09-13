import { Link } from "react-router-dom"
import Navbar from "./navbar"
import { useState } from "react"
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
            <div className="absolute top-[25%] flex flex-col gap-10 items-center justify-center bg-white p-10 sh2 rounded-lg">
            <h1 className="text-4xl text-sec space font-black">SIGNUP</h1>
            <form onSubmit={handleSubmit} className="flex flex-col gap-12">
                <div className="flex flex-col gap-6">
                <input type="text"
                className="w-80 h-14 rounded-[4px] pl-4 bg-sec placeholder-prim text-prim"
                minLength={3}
                maxLength={25}
                required
                value={username}
                id="user"
                onChange={(e)=> setUsername(e.target.value)}
                placeholder="Username"
                />
                <input type="password"
                className="w-80 h-14 rounded-[4px] pl-4 bg-sec placeholder-prim text-prim"
                minLength={8}
                maxLength={25}
                value={password}
                onChange={(e)=> setPassword(e.target.value)}
                required
                placeholder="Password"
                id="password"
                />
                 <input type="password"
                 className="w-80 h-14 rounded-[4px] pl-4 bg-sec placeholder-prim text-prim"
                 minLength={8}
                 maxLength={25}
                 value={confirm}
                onChange={(e)=> setConfirm(e.target.value)}
                 required
                placeholder="Confirm password"
                />
                </div>
                <button type="submit" className=" text-sec border-2 border-sec px-6 py-3 rounded-[4px] bg-acc text-lg font-bold chakra">SIGNUP</button>
            </form>
            <p className="text-sec space">Already have an account? <Link to="/login" className="text-acc border-b-[1px] border-acc chakra">Log in</Link></p>
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