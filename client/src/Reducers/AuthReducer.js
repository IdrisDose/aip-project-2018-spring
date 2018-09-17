import { FETCH_USER,USER_LOGIN,USER_REGISTER, USER_VERIFY, USER_EXISTS } from'../Actions/Types';

const initialState = {
  auth: {}
}

export default function(state = initialState, action){
  switch(action.type){
    case FETCH_USER:
    break;
    
    case USER_LOGIN:
      return {
        ...state,
        auth: action.payload
      } 
    

    case USER_REGISTER:
      return {
        ...state,
        auth: action.payload
      }
    
    case USER_VERIFY:
      return {
        ...state,
        auth: action.payload
      }
    
    case USER_EXISTS:
      return {
        ... state,
        auth: action.payload
      }
    default:
      return state;
  }
}