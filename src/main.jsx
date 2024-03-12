import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom"

import './index.css'
// import './home.css'
import router from './router.jsx'
import { ContextProvider } from './contexts/ContextProvider'


const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <ContextProvider>
      <RouterProvider router={router} />
    </ContextProvider>
)
