'use client'

import { App } from './App'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function Home() {
    
    const pathname = usePathname()

    return (
        <>
            <App />
            <div id="link" style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
            <div style={{ position: 'absolute', bottom: 40, right: 40, fontSize: '13px' }}>Jae Seong Lee</div>
            <Link style={{ position: 'absolute', top: 40, left: 40, fontSize: '13px' }} href="/">
                {pathname === '/' ? 'double click to enter portal' : '< back'}
            </Link>
            </div>
        </>
    );
}
