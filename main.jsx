import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import 'bootstrap/dist/css/bootstrap.min.css'; 
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Context from './components/AuthContext/Context.jsx';


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Context>
    <App />
    <ToastContainer/>
    </Context>
  </StrictMode>,
)
