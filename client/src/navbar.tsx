


const Navbar = () => {

    return(
        <div className="flex justify-evenly items-center w-screen h-20 bg-black">
            <div>
                <h1 className="text-lg text-sec ">Robnite</h1>
            </div>
            <div className="w-2/4">
                <form action="#" className="w-full">
                    <input type="text" 
                    className="w-full h-10 rounded-3xl pl-5"
                    placeholder="Search..."
                    />
                </form>
            </div>
            <div className="flex gap-5">
                <h2 className="text-lg text-sec">Log in</h2>
                <h2 className="text-lg text-sec">Sign up</h2>
            </div>
        </div>
    )
}
export default Navbar