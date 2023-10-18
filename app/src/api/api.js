import axios from 'axios'
import cookie from "js-cookie"

const api = axios.create({
    baseURL:"http://localhost:5000/api"
})

let Api = function(){
    let token=cookie.get('token')
    if(token){
         api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
    return api
}

export default Api;