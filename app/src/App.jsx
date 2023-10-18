import Login from "./pages/public/Login"
import Register from "./pages/public/Register"
import OCR from "./pages/private/OCR"
import {useAuthContext} from "./context/AuthContext"
import {Route, Routes,BrowserRouter  } from 'react-router-dom';
import NotFound from "./pages/public/NotFound";
function App() {

  const {authUser} = useAuthContext()


  const SpinnerData = ({spinner,children})=>{
    return(
        <div>
          {
            spinner ? 
            <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900"></div>
        </div>
        :<>
        {children}
        </> 
          }

        </div>
    )
  }

  return (
    <SpinnerData spinner={authUser.spinner}>
      <BrowserRouter basename="/">
      {
        authUser.auth ?
        <Routes>
        <Route exact  path="/" element={<OCR />} />
        <Route path="/ocr" element={<OCR />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="*" element={<NotFound />}/>
      </Routes>
        :
        <Routes>
        <Route exact  path="/" element={<Login />} />
        <Route path="/login" element={<Login />}/>

        <Route path="/register" element={<Register />} />
        <Route path="*" element={<NotFound />}/>

      </Routes>
      }
      </BrowserRouter>
    </SpinnerData>
  )
}

export default App
