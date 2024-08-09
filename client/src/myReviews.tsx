import Navbar from "./navbar"
import { useLocation } from "react-router-dom"

const MyReviews = () => {
const navigate = useLocation()
  console.log(navigate.state)

    return(
        <>
        <Navbar></Navbar>
        <div className="w-screen h-[90%] flex">
            <div className="w-[40%]  h-full flex items-center justify-center">
                    <h1>Filters;</h1>
            </div>
            <div className="w-full  h-full flex items-end justify-center">
        <div className="w-[90%] bg-acc h-[80%] flex justify-evenly">
            <div className="grow-[2] flex justify-center">game</div>
            <div className=" grow flex justify-center">status</div>
            <div className=" grow flex justify-center">score</div>
        </div>
            </div>

        </div>
        </>
    )
}
export default MyReviews