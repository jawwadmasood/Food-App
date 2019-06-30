// import { createStore } from 'redux';
import reducer from './reducer';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

//persist
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, reducer)

const store = createStore(persistedReducer, applyMiddleware(thunk));
const persistor = persistStore(store);
export {
    store,
    persistor,
}


// //Basic Configuration
// import { createStore } from 'redux';
// import reducer from './reducer';
// const store = createStore(reducer);

// export default store;