import { createStore } from "redux";
import { combineReducers } from "redux";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import setUserReducer from "./reducers/setUserReducer";

const configureStore = () => {
  return createStore(setUserReducer);
};

export default configureStore;

// const persistConfig = {
//   key: "root",
//   storage,
//   whitelist: ["user"],
// };

// const rootReducer = combineReducers({
//   user: setUserReducer,
// });

// const reducers = persistReducer(persistConfig, rootReducer);

// const store: any = createStore(reducers);

// const persistor = persistStore(store);

// export { store, persistor };
