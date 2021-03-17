import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import user from "../reducers/user";
import thunk from "redux-thunk";
const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  user: {
    _id: "klhasfklahsjkf",
  },
};

const rootReducer = combineReducers({
  user: user,
});
export default function configureStore() {
  return createStore(rootReducer, initialState, composedEnhancer(applyMiddleware(thunk)));
}
