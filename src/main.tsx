import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./styles/theme.css";
import "./styles/button.css";
import "./styles/input.css";
import "./styles/navbar.css";
import "./styles/components.css";
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
