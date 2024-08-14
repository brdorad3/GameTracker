import TopRated from "./topRated"
import { Link } from "react-router-dom"


const Rated = () => {

    return (
        <>
        <div className="px-64 py-12 flex flex-col gap-12">
            <div className="flex justify-between">
                <div>
        <h1 className="text-sec text-3xl font-bold chakra pb-1">BEST RATED GAMES</h1>
        <div className="w-24 h-[2px] bg-acc"></div>
            </div>
        <Link to="/top100" className="self-end"><h2 className="text-sec self-end">See all</h2></Link>
        </div>
        <div className="">
        <TopRated/>
        </div>
        </div>
        </>
    )
}
export default Rated