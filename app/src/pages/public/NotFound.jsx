import Button from "../../components/Button";
import { useNavigate } from "react-router-dom";
const NotFound = ()=>{

    const navigate = useNavigate();
    return(
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
          <div className="w-full sm:max-w-md mt-6 px-6 py-4 text-center bg-white shadow-md overflow-hidden
          space-y-4
          sm:rounded-lg">
                <h1 className="text-strong text-3xl">ERROR 404</h1>
                <h2 className="text-strong text-2xl">PAGINA NO ENCONTRADA</h2>
                <Button
                onClick={()=>navigate("/login")}
                >REGRESAR</Button>
            </div>
          </div>
    )
}
export default NotFound;