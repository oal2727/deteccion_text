import {useState,useRef,useEffect} from "react"
import Authenticated from "../../layout/Authenticated"
import Image from "../../api/image"
import Button from "../../components/Button"
import CardImage from "../../components/CardImage"
import Modal from "../../components/Modal"
import SpinnerAnalyze from "../../components/SpinnerAnalyze"
import ModalError from "../../components/ModalError"
import ModalText from "../../components/ModalText"
import toast, { Toaster } from 'react-hot-toast';
import {useAuthContext} from "../../context/AuthContext"
import { useNavigate } from "react-router-dom";

import cookie from "js-cookie"

const OCR = ()=>{

  const {authUser,dispatch} = useAuthContext()

    const [selectedImage, setSelectedImage] = useState(null);
    const [state,setState] = useState(false)
    const [file,setFile] = useState(null)
    const [loadingList,setLoadingList] = useState(false)
    const [modalDescription,setModalDescription] = useState(false)
    const [imagesList,setImageList]= useState([])
    const [descriptionText,setDescriptionText] = useState("")
    const fileInputRef = useRef();
    const [errorModal,setErrorModal] = useState(false)
    const [process,setProcess] = useState(false)
    const navigate = useNavigate()

    const handleImageChange = (e) => {
      const file = e.target.files[0];
      setFile(file)
      if (file) {
        const reader = new FileReader();
        reader.onload = (event) => {
          setSelectedImage(event.target.result);
        };
        setState(true)
        reader.readAsDataURL(file);
      } else {
        setSelectedImage(null);
      }
    };

    const logout = ()=>{
      cookie.remove("token")
      dispatch({"type":"TOOGLE_AUTH","payload":false})
      navigate("/login")
    }

    const handleButtonClick = () => {
        fileInputRef.current.click();
      };

      const getList =async ()=>{ 
        try{
          setLoadingList(true)
          const res = await Image.listImage()
          setImageList(res.data.images)
          setLoadingList(false)
        }catch(err){  
          setLoadingList(false)
          console.log(err)
        }
      }

      const detectionImage = async()=>{
        setState(false)
        try{
          setProcess(true)
          const formData = new FormData()
          formData.append("file",file) 
          const response = await Image.sendImage(formData)
          toast.success(response.data.message)
          setImageList([
            ...imagesList,response.data.response
          ])
          setProcess(false)
         
        }catch(err){
          setErrorModal(true)
          setProcess(false)
        }
      }

      useEffect(()=>{
        getList()
      },[])
   
    return(
        <Authenticated >
          {
            process && 
            <SpinnerAnalyze/> 
          }
          {
            modalDescription && 
            <ModalText description={descriptionText} changeModal={()=>setModalDescription(false)}/>
          }
          {
            errorModal && 
            <ModalError
            closeModal={()=>setErrorModal(false)}
            message="Error al procesar la imagen"/>
          }
            <div className="container">
            <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        ref={fileInputRef}
        onChange={handleImageChange}
      />
           <div className="flex flex-row space-x-4 my-4">
           <Button type="button"
            className="m-4 flex-start bg-green-300"
            onClick={handleButtonClick}
            >Subir Imagen</Button>

          <Button type="button"
            className="m-4 flex-start bg-green-300"
            onClick={()=>logout()}
            >Cerrar  Sessión</Button>
           </div>

            { state && <Modal 
            changeModal={(value)=>setState(value)} 
            analyzeVideo={()=>detectionImage()}
            image={selectedImage}/> }
                <div className="flex flex-row flex-wrap self-center justify-center gap-4">
                {
                !loadingList ? 
                  <>
                    {
                      (imagesList.length) ? 
                       <>
                       {
                         imagesList.map((item,index)=>{
                          return(
                            <CardImage 
                            key={index}
                            showDescription={()=>{
                              setModalDescription(true)
                              setDescriptionText(item.text)
                            }}
                            text={item.text}
                            image={item.uri}/>
                          )
                        })
                       }
                       </>
                      :
                      <p className="text-xl mt-4 text-strong text-red-500">No hay imagenes previamente registrados</p>
                 }
                </>  
                :
                <div className="flex flex-row items-center">
                  <div role="status">
                    <svg aria-hidden="true" className="w-8 h-8 mr-2 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                    </svg>
                    <span className="sr-only">Cargando Datos...</span>
                </div>
                <h1>Cargando Datos..</h1>
                  </div>
                }
                </div>
            </div>
            <Toaster/>
        </Authenticated>
    )
}
export default OCR;