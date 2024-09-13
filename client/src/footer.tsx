import Icon from "@mdi/react"
import { mdiCopyright } from "@mdi/js"

const Footer = () => {

    return(
        <div className="w-full  bg-sec flex items-center flex-col py-5">
            <div className="flex  items-center gap-1">
                <Icon path={mdiCopyright} size={0.4} className="text-white"></Icon>
                <h1 className="text-prim space ">2024 by Brdorad3</h1>
                </div>
                <h2 className="text-prim space ">Games are provided by <a href="https://igdb.com">IGDB.com</a></h2>
        </div>
    )
}
export default Footer