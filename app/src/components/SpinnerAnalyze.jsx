import "./analyze.css"
const SpinnerAnalyze =()=>{
    return(
      <>
      <div className="fixed 
        top-0 left-0 z-50 w-screen h-screen p-10
        flex items-center justify-center" 
        >
  <div className="bg-white border w-[250px] h-[150px] items-center justify-center flex m-auto
   py-2 px-5 rounded-lg flex items-center flex-col">
    <div className="loader-dots block relative w-20 h-5 mt-2">
      <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"></div>
      <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"></div>
      <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"></div>
      <div className="absolute top-0 mt-1 w-3 h-3 rounded-full bg-blue-500"></div>
    </div>
    <div className="text-gray-500 text-xl font-medium mt-2 text-center">
     Procesando Imagen..
    </div>
  </div>
  </div>
  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
  </>
    )
}
export default SpinnerAnalyze