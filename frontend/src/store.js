import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import {thunk} from 'redux-thunk';
import moviesReducer from "./redux/reducers/reducer";

const rootReducer = combineReducers({
  movies: moviesReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk))
);

export { store };
