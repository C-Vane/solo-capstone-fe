import { createStore, combineReducers, compose, applyMiddleware } from "redux";
import user from "../reducers/user";
import room from "../reducers/room";
import thunk from "redux-thunk";
import errors from "../reducers/errors";
import loading from "../reducers/loading";
const composedEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const initialState = {
  user: {},
  room: {},
  errors: { active: false, code: 404 },
  loading: { active: true },
};

const rootReducer = combineReducers({
  user: user,
  room: room,
  errors: errors,
  loading: loading,
});

export default function configureStore() {
  return createStore(rootReducer, initialState, composedEnhancer(applyMiddleware(thunk)));
}
