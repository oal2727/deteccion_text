export const AuthReducer = (state,action)=>{
    switch(action.type){
        case "AUTH_TOKEN":
                return {
                    ...state,
                    userToken: action.payload,
                  };
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
        case "TOGGLE_MESSAGE":
                    return {
                        ...state,
                        message:{
                            description:action.payload.description,
                            show:action.payload.show
                        }
                      };
        case "ME_FIREBASE":
            return{
                ...state,auth:action.payload
            }
        default:
            return state
    }  
}