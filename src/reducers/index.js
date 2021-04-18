import { combineReducers} from "redux";
import courses from "./courses";
import auth from './auth'

const rootReducer = combineReducers({
   //Nơi khai báo các reducer con 
   courses,
   auth,
});

export default rootReducer;