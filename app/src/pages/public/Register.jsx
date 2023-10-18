import {useState} from "react"
import Input from "../../components/Input";
import Button from "../../components/Button";
import {
  Link,useNavigate
} from "react-router-dom";
import Auth from "../../api/auth"
import toast, { Toaster } from 'react-hot-toast';

const Register =()=>{

  const [loading,setLoading] = useState(false)
  const [form,setForm] = useState({
    firstName:"",
    lastName:"",
    email:"",
    password:""
  })
  const navigate = useNavigate();

  const handleChange = (e)=>{
    setForm({
      ...form,[e.target.name]:e.target.value
    })
  }

  const onSubmit=async(e)=>{
    e.preventDefault();
    try{
      setLoading(true)
      const res = await Auth.Register(form)
      toast.success(res.data)
      setTimeout(()=>{
        navigate("/login");
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
            <form className="flex flex-col"
               onSubmit={onSubmit}
            >
              <Input label="nombre" 
              name="firstName"
              onChange={handleChange}
              type="text" placeholder="Ingrese su Nombre"/>
               <Input label="apellido" 
              name="lastName"
               onChange={handleChange}
               type="text" placeholder="Ingrese su Apellido"/>
                <Input label="Email" 
                 name="email"
                onChange={handleChange}
                type="text" placeholder="Ingrese su correo"/>
                <Input label="contraseña" 
                onChange={handleChange}
                name="password"
                type="password" placeholder="Ingrese su contraseña"/>
                <Button type="submit"
                disabled={loading}
                >{loading ? "Cargando" : "Registrar"}</Button>
                <Link 
                className="my-2 text-center text-red-400"
                to="/login" relative="register">
                Iniciar Sessión
              </Link>
              </form>
              <Toaster/>
          </div>
      </div>
    )
}
export default Register;