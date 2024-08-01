import TopRated from "./topRated"
import { Link } from "react-router-dom"


const Rated = () => {

    return (
        <>
        <div className="px-64 py-12 flex flex-col gap-12">
            <div className="flex justify-between">
        <h1 className="text-sec text-4xl">Best rated games</h1>
        <Link to="/top100" className="self-end"><h2 className="text-sec self-end">See all</h2></Link>
        </div>
        <div className="text-prim w-full h-96  pt-11 bg-sec">
        <TopRated/>
        </div>
        </div>
        </>
    )
}
export default Rated