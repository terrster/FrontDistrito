import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk'
import reducer from './reducers';

const store = createStore(
    reducer,
    compose( applyMiddleware(thunk),
        // typeof window === 'object' &&
        //     typeof window.__REDUX_DEVTOOLS_EXTENSION__ !== 'undefined' ?
        //         window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
        process.env.REACT_APP_CONFIGURATION === 'localhost' && 
        window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

export default store;