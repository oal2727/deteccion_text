import Button from "./Button";
const CardImage = ({image,text,showDescription})=>{
    return(
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
    <img 
    className="w-[300px] h-[300px]"
    src={image} alt="Sunset in the mountains"/>
    <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2 text-center">{text.substring(0,24)}</div>
        {
           24 <  text.length ?
           <Button 
           onClick={showDescription}
           className={"justify-center m-auto flex"}>Ver Mas..</Button>
            : null
        }
    </div>
    </div>
    )
}
export default CardImage;