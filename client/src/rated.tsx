import TopRated from "./topRated"
import { Link } from "react-router-dom"


const Rated = () => {

    return (
        <>
        <div className="px-60 py-12 flex flex-col gap-12">
            <div className="flex justify-between">
                <div>
        <h1 className="text-sec text-3xl font-bold chakra pb-1">BEST RATED GAMES</h1>
        <div className="w-24 h-[2px] bg-acc"></div>
            </div>
        <Link to="/top100" className="self-end">
        <div className="mr-3">
        <h2 className="text-sec self-end ani chakra">See all</h2>
       
        </div>
        </Link>
        </div>
        <div className=" flex justify-between px-2">
        <TopRated/>
        </div>
        </div>
        </>
    )
}
export default Rated