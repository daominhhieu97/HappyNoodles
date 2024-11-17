import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice.tsx';
import cartReducer from './cartSlice.tsx';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import { persistReducer, persistStore } from 'redux-persist';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userReducer);
const cartPersistedReducer = persistReducer(persistConfig, cartReducer);

export const store = configureStore({
  reducer: {
    user: persistedReducer,
    cart: cartPersistedReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
      },
    })
});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
