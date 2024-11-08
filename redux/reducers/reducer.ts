import { combineReducers } from "redux";
import auth from "../actions/auth";
import rooms from "../actions/rooms";

const rootReducer = combineReducers({ auth: auth, rooms: rooms });

export default rootReducer;
