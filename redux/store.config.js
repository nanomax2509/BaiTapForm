import { createStore, combineReducers } from "redux";

import { reactFormReducer } from "../redux/react-form.reducer";


const rootReducer = combineReducers({

  reactFormReducer,
});


export const store = createStore(
  rootReducer,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
