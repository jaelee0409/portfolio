'use client'

import { App } from './App'

export default function Home() {

    const images = [
        // Front
        { position: [0, 0, 0], rotation: [0, 0, 0], url: './1.jpg'},
        // Back
        // { position: [-0.8, 0, -0.6], rotation: [0, 0, 0], url: 'https://images.pexels.com/photos/5665104/pexels-photo-5665104.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
        // { position: [0.8, 0, -0.6], rotation: [0, 0, 0], url: 'https://images.pexels.com/photos/7911758/pexels-photo-7911758.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1'},
        // Left
        { position: [-2, 0, 0], rotation: [0, Math.PI / 2.5, 0], url: './2.jpg'},
        // { position: [-2.15, 0, 1.5], rotation: [0, Math.PI / 2.5, 0], url: pexel(325185) },
        // { position: [-2, 0, 2.75], rotation: [0, Math.PI / 2.5, 0], url: pexel(358574) },
        // Right
        // { position: [1.75, 0, 0.25], rotation: [0, -Math.PI / 2.5, 0], url: pexel(227675) },
        // { position: [2.15, 0, 1.5], rotation: [0, -Math.PI / 2.5, 0], url: pexel(911738) },
        { position: [2, 0, 0], rotation: [0, -Math.PI / 2.5, 0], url: './3.jpg'}
    ]

    return (
        <App images={images} />
    );
}
