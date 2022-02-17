import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import store from './store'
import './index.css'
import '../src/slate.css'
import App from './App'

ReactDOM.render(
  <Provider store={store}>
    <App
      style={{
        margin: '0',
        padding: '0',
        display: 'flex',
        justfyContents: 'center',
      }}
    />
  </Provider>,
  document.getElementById('root')
)
