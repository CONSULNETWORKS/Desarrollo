// rootReducer.jsx
import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Importaciones de tus reducers unificados
import customizationSlice from './CustomizationSlice.jsx';
import authReducer from './authSlice.jsx';
import message from '../../actions/message';

const rootReducer = combineReducers({
  auth: persistReducer(
    {
      key: 'auth',
      storage,
      keyPrefix: 'horus-',
    },
    authReducer,
  ),
  message,
  customization: customizationSlice,
});

export default rootReducer;