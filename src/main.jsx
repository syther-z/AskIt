import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// ReactDOM
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux';
import store from './controllers/states/store.js';
import { BrowserRouter } from 'react-router-dom';
import { createPortal } from 'react-dom';
createRoot(document.getElementById('root')).render(
  // <StrictMode>
    <Provider store={store}>
    <BrowserRouter>
      <App />
      </BrowserRouter>
    </Provider>
  // </StrictMode>,
)


export const Portal = ({ children }) => {
  const ele = document.getElementById('alert-window');
  ele.style.position = 'absolute';
  ele.style.top = '0';
  ele.style.zIndex = '1200';
  return createPortal(children, ele);
}