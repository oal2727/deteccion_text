import { useState } from "react";
import Button from "../../components/Button";
import Input from "../../components/Input";
import Auth from "../../api/auth"
import toast, { Toaster } from 'react-hot-toast';
import {useAuthContext} from "../../context/AuthContext"
import cookie from "js-cookie"
import { useNavigate } from "react-router-dom";

import {
  Link 
} from "react-router-dom";
const Login =()=>{

  const {dispatch} = useAuthContext()
  const [loading,setLoading] = useState(false)
  const [form,setForm] = useState({
    email:"",
    password:""
  })
  const handleChange = (e)=>{
    setForm({
      ...form,[e.target.name]:e.target.value
    })
  }
  const navigate = useNavigate()

  const onSubmit=async(e)=>{
    e.preventDefault();
    try{
      setLoading(true)
      const res = await Auth.Login(form)
      toast.success("Inicio de sessión exitoso")
      cookie.set("token",res.data.token)
      
      setTimeout(()=>{
        dispatch({"type":"TOOGLE_AUTH","payload":true})
        navigate("/ocr");
        setLoading(false)
      },2000)
    
    }catch(error){
      setLoading(false)
      toast.error(error.response.data)
    }
  }

    return(
        <div className="min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100">
          <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
            <form 
            onSubmit={onSubmit}
            className="flex flex-col">
              <Input label="Email" type="email"
              onChange={handleChange}
              name="email"
              placeholder="Ingrese su correo"/>
              <Input label="Contraseña"
               onChange={handleChange}
               name="password"
              type="password" placeholder="Ingrese su contraseña"/>
              <Button type="submit"
              disabled={loading}
              >{loading ? "Cargando" : "Iniciar Session"}</Button>
              <Link 
              className="my-2 text-center text-red-400"
              to="/register" relative="register">
              Registrarse
            </Link>
            </form>
            <Toaster/>
          </div>
      </div>
    )
}
export default Login;