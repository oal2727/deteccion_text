import Api from './api'

export default{
    listImage(){
        return Api().get('/list_images');
    },
    sendImage(data){
        return Api().post('/send_image',data,{
            headers: {
                'Content-Type': 'multipart/form-data',
              },
        })
    },
    
   
}