'use client'

import { App } from './App'
// import { useRoute, useLocation } from 'wouter'

export default function Home() {

    // const [, params] = useRoute('/')
    // const [, setLocation] = useLocation()

    return (
        <>
            <App />
            {/*
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>Jae Seong Lee</div>
            <a style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px' }} href="#" onClick={() => setLocation('/')}>
                {params ? '< back' : 'double click to enter portal'}
            </a>

            </div>
            */}
            {' '}
        </>
    );
}
