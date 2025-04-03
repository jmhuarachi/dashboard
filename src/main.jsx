import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { ChartProvider } from './context/ChartContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ChartProvider>
      <App />
    </ChartProvider>
    
  </StrictMode>,
)
