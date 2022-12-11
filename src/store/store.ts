import {configureStore, Store} from "@reduxjs/toolkit";
import {FLUSH, PAUSE, PERSIST, persistReducer, PURGE, REGISTER, REHYDRATE} from "redux-persist";
import storage from "redux-persist/lib/storage";
import {authReducer} from "../state/slice";


const persistConfig = {key: "root", storage, version: 1};

//const persistedReducer = persistReducer(persistConfig, authReducer);

const persistedReducer = persistReducer<ReturnType<typeof authReducer>>(
    persistConfig,
    authReducer
)

const store: Store<any> = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: {
            ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
        },
    }),
});

export default store