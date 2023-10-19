export const AuthReducer = (state,action)=>{
    switch(action.type){
        case "TOOGLE_AUTH":
            return{
                ...state,
                auth:action.payload
            }
        case "TOOGLE_SPINNER":
                return{
                    ...state,
                    spinner:action.payload
                }
        default:
            return state
    }  
}