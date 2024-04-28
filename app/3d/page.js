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
            <div style={{ position: 'absolute', bottom: '3%', left: '5%', fontSize: '13px' }}>
                jae seong lee / software developer
            </div>
            <Link style={{ position: 'absolute', top: '5%', left: '5%', fontSize: '13px' }} href="/">
                2D -&gt;
            </Link>

            <Link style={{ position: 'absolute', top: '5%', right: '5%', fontSize: '13px' }} href="/3d">
                {pathname === '/3d' ? 'double click to enter portal' : '< back'}
            </Link>
            <div style={{ position: 'absolute', bottom: '3%', right: '5%', fontSize: '13px' }}>04/28/2024</div>
        </div>
        </>
    );
}

