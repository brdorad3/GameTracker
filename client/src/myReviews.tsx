import Navbar from "./navbar"
import { useLocation } from "react-router-dom"

const MyReviews = () => {
const navigate = useLocation()
  console.log(navigate.state)
  const res = navigate.state
    console.log(res)
    return(
        <>
        <Navbar></Navbar>
        <div className="w-screen h-[90%] flex">
            <div className="w-[40%]  h-full flex items-center justify-center">
                    <h1>Filters;</h1>
            </div>
            <div className="w-full  h-full flex items-end justify-center">
        <div className="w-[90%] bg-acc h-[80%] flex justify-evenly">
            <div className="grow-[2] flex flex-col">
                <div className="flex justify-between px-8 py-7">
                    <div className="w-[60%] flex justify-center ">Game</div>
                    <div className="w-[20%]  flex justify-center">Status</div>
                    <div className="w-[20%]  flex justify-center">Score</div>
                </div>
                
                <div className="flex flex-col gap-5 ">
                {
                    res &&
                    res.map((slot: any) => (
                        <div className="flex justify-between px-8">
                            <div className="flex grow-[5] max-w-[60%] gap-3">
                        <img src={slot.cover} alt="" className="w-12 h-16" />
                        <h1 className="pt-1">{slot.game}</h1>
                        </div>
                        <div className="w-[20%] flex justify-center">
                            <p>{slot.status}</p>
                        </div>
                        <div className="w-[20%] flex justify-center">
                            <p>{slot.rating}</p>
                        </div>
                        </div>
                    ))
                }
                </div>
                <div className="relative w-full h-full">
               
            </div>
            </div>

        </div>
            </div>

        </div>
        </>
    )
}
export default MyReviews