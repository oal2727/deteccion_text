const Input =({label,placeholder,type,onChange,name})=>{
    return(
        <div className="mb-4">
      <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
        {label}
      </label>
      <input 
      onChange={onChange}
      className="shadow appearance-none border rounded w-full py-2 px-3 
      text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
      required
      name={name}
       id="username" type={type} placeholder={placeholder}/>
    </div>
    )
}
export default Input;