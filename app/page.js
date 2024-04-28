'use client'

import { createRoot } from 'react-dom/client'
import { Suspense } from 'react'
import { App } from './App'

function Overlay() {
  return (
    <div id="link" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
      <div style={{ position: 'absolute', bottom: '3%', left: '5%', fontSize: '13px' }}>
        jae seong lee / software developer
      </div>
      <a href="/3d" style={{ position: 'absolute', top: '5%', left: '5%', fontSize: '13px' }}>3D —&gt;</a>
      <div style={{ position: 'absolute', bottom: '3%', right: '5%', fontSize: '13px' }}>04/28/2024</div>
    </div>
  )
}

export default function Home() {
    return (
        <>
        <Suspense fallback={null}>
            <App />
        </Suspense>
        <Overlay />
        </>
    )
}

