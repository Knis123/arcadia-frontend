
import { createRoot } from 'react-dom/client'
import { ChakraProvider, extendTheme } from '@chakra-ui/react'
import { AuthProvider } from './Context/AuthContext'
import { BrowserRouter } from "react-router-dom";
import App from './App.jsx'

import './index.css'
// Extend colors and fonts
const colors = {
  brand: '#663300',
  second: '#ffcc99'
 
};
const theme = extendTheme({ colors });

createRoot(document.getElementById('root')).render(
  
    <ChakraProvider theme={theme}>
    <BrowserRouter> 
    <AuthProvider>
          <App />
          </AuthProvider>
          </BrowserRouter>
    </ChakraProvider>
 
)