import Navbar from "./Navbar"

const Authenticated = ({children})=>{
    return(
        <div className="flex flex-col">
        <Navbar/>
       <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
        {children}
       </div>
    </div>
    )
}
export default Authenticated;