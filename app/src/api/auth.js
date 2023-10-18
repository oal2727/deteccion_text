import Api from './api'

export default{
    Register(form){
        return Api().post('/register',form);
    },
    Login(data){
        return Api().post('/login',data)
    },
    Me(){
        return Api().get('/auth')
    },
   
}