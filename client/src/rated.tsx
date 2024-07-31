import TopRated from "./topRated"



const Rated = () => {

    return (
        <>
        <div className="px-36 py-12 flex flex-col gap-12">
        <h1 className="text-sec text-4xl">Best rated games</h1>
        <div className="text-prim w-full h-96 pl-10 pt-11 bg-sec">
        <TopRated/>
        </div>
        </div>
        </>
    )
}
export default Rated