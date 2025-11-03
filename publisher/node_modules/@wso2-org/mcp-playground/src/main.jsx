import React from 'react'
import { createRoot } from 'react-dom/client'
import MCPPlayground from './app/MCPPlayground.tsx'

const root = createRoot(document.getElementById('root'))
root.render(
    <React.StrictMode>
        <MCPPlayground/>
    </React.StrictMode>
)
