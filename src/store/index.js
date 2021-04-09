import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import user from "../reducers/user";
import room from "../reducers/room";
import thunk from "redux-thunk";
const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  user: {},
  room: {},
  errors: {},
  loading: {},
};

const rootReducer = combineReducers({
  user: user,
  room: room,
});

export default function configureStore() {
  return createStore(rootReducer, initialState, composedEnhancer(applyMiddleware(thunk)));
}
