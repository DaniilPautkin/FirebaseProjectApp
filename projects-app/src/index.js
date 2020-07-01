import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import App from './App'
import './index.css'
// import registerServiceWorker from './registerServiceWorker';
import { store } from './redux/redux-store'

// store.firebaseAuthIsReady.then(() => {
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)
registerServiceWorker()

