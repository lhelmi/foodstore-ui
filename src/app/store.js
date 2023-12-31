import authReducer from '../features/auth/reducer';
import productReducer from '../features/products/reducer';

// (1) import module dari `redux`
import { combineReducers, createStore, applyMiddleware, compose } from 'redux';

// (2) import redux-thunk middleware
import thunk from 'redux-thunk';

// (3) buat composer enhancer untuk menghubungkan dengan Chrome DevTools Redux
const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose; 

// (4) gabung reducer, untuk sementara kosong, karena kita belum membuat reducer
const rootReducers = combineReducers({
    auth : authReducer,
    products : productReducer
});

// (5) buat store, dan gunakan composerEnhancer + middleware thunk 
const store = createStore(rootReducers, composerEnhancer(applyMiddleware(thunk)));

export default store;