import thunk from "redux-thunk";
import {combineReducers, configureStore} from "@reduxjs/toolkit";
import {authReducer, errorReducer, radiusReducer, shotsReducer} from "./reducers/reducers";
import storage from "redux-persist/lib/storage"
import {
    persistReducer,
    persistStore
} from "redux-persist";

const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['error']
}

const rootReducer = combineReducers({
    shot: shotsReducer,
    radius: radiusReducer,
    error: errorReducer,
    auth: authReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)
export const store = configureStore({
        reducer: persistedReducer,
        middleware: [thunk],
    }
)

export const persistor = persistStore(store)