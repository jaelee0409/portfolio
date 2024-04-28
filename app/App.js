'use client'

import * as THREE from 'three'
import { useRef, useState } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { Image, ScrollControls, Scroll, useScroll } from '@react-three/drei'
import { proxy, useSnapshot } from 'valtio'
import { easing } from 'maath'

const material = new THREE.LineBasicMaterial({ color: 'white' })
const geometry = new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -0.5, 0), new THREE.Vector3(0, 0.5, 0)])
const state = proxy({
    clicked: null,
    urls: ["nana.png", "1.jpg", "2.jpg", "3.jpg", "4.jpg", "5.jpg", "6.jpg", "7.jpg", "8.jpg", "9.jpg", "10.jpg", "11.jpg", "12.jpg"]
})

function Minimap() {
    const ref = useRef()
    const scroll = useScroll()
    const { urls } = useSnapshot(state)
    const { height } = useThree((state) => state.viewport)
    useFrame((state, delta) => {
        ref.current.children.forEach((child, index) => {
            // Give me a value between 0 and 1
            //   starting at the position of my item
            //   ranging across 4 / total length
            //   make it a sine, so the value goes from 0 to 1 to 0.
            const y = scroll.curve(index / urls.length - 1.5 / urls.length, 4 / urls.length)
            easing.damp(child.scale, 'y', 0.15 + y / 6, 0.15, delta)
        })
    })
    return (
        <group ref={ref}>
            {urls.map((_, i) => (
                <line key={i} geometry={geometry} material={material} position={[i * 0.06 - urls.length * 0.03, -height / 2 + 0.6, 0]} />
            ))}
            </group>
    )
}

function Item({ index, position, scale, c = new THREE.Color(), onItemClick, ...props }) {
    const ref = useRef()
    const linkRef = useRef(null)
    const scroll = useScroll()
    const { clicked, urls } = useSnapshot(state)
    const [hovered, hover] = useState(false)
    const click = () => {
        state.clicked = index === clicked ? null : index;
        onItemClick(index)
    }
    const over = () => hover(true)
    const out = () => hover(false)
    useFrame((state, delta) => {
        const y = scroll.curve(index / urls.length - 1.5 / urls.length, 4 / urls.length)
        easing.damp3(ref.current.scale, [clicked === index ? 4.7 : scale[0], clicked === index ? 5 : 4 + y, 1], 0.15, delta)
        ref.current.material.scale[0] = ref.current.scale.x
        ref.current.material.scale[1] = ref.current.scale.y
        if (clicked !== null && index < clicked) easing.damp(ref.current.position, 'x', position[0] - 2, 0.15, delta)
        if (clicked !== null && index > clicked) easing.damp(ref.current.position, 'x', position[0] + 2, 0.15, delta)
        if (clicked === null || clicked === index) easing.damp(ref.current.position, 'x', position[0], 0.15, delta)
        easing.damp(ref.current.material, 'grayscale', hovered || clicked === index ? 0 : Math.max(0, 1 - y), 0.15, delta)
        easing.dampC(ref.current.material.color, hovered || clicked === index ? 'white' : '#aaa', hovered ? 0.3 : 0.15, delta)
    })
    return <Image ref={ref} {...props} unoptimized={true} position={position} scale={scale} onClick={click} onPointerOver={over} onPointerOut={out} />
}

function Items({ w = 0.7, gap = 0.15, onItemClick }) {
    const { urls } = useSnapshot(state)
    const { width } = useThree((state) => state.viewport)
    const xW = w + gap
    return (
        <ScrollControls horizontal damping={0.1} pages={(width - xW + urls.length * xW) / width}>
            <Minimap />
            <Scroll>
                {urls.map((url, i) => <Item key={i} index={i} position={[i * xW, 0, 0]} scale={[w, 4, 1]} url={url} onItemClick={onItemClick} />) /* prettier-ignore */}
            </Scroll>
        </ScrollControls>
    )
}

export const App = () => {
    const [linkContent, setLinkContent] = useState("Click on a project");
    const [linkHref, setLinkHref] = useState("#");
    const [linkClicked, setLinkClicked] = useState(false);

    const handleItemClick = (itemId) => {
        switch(itemId) {
            case 0:
                setLinkContent("Nana An's art portfolio and E-commerce website")
                setLinkHref("https://www.nanaan.art")
                setLinkClicked(true)
                break;
            case 1:
                setLinkContent("this is a temp project")
                setLinkHref("#")
                break;
            case 2:
                setLinkContent("this is a temp project")
                setLinkHref("#")
                break;
            case 3:
                setLinkContent("this is a temp project")
                setLinkHref("#")
                break;
            case 4:
                setLinkContent("this is a temp project")
                setLinkHref("#")
                break;
            case 5:
                setLinkContent("this is a temp project")
                setLinkHref("#")
                break;
            case 6:
                setLinkContent("this is a temp project")
                setLinkHref("#")
                break;
            case 7:
                setLinkContent("this is a temp project")
                setLinkHref("#")
                break;
            case 8:
                setLinkContent("this is a temp project")
                setLinkHref("#")
                break;
            case 9:
                setLinkContent("this is a temp project")
                setLinkHref("#")
                break;
            case 10:
                setLinkContent("this is a temp project")
                setLinkHref("#")
                break;
            case 11:
                setLinkContent("this is a temp project")
                setLinkHref("#")
                break;
            case 12:
                setLinkContent("this is a temp project")
                setLinkHref("#")
                break;
            default:
                setLinkContent("this is a temp project")
                setLinkHref("#")
                break;
        }
    }

    return (
    <>
    <div id="link" style={{ position: 'absolute', display: 'flex', top: '5%', left: '50%', transform: 'translateX(-50%)', justifyContent: 'center', zIndex: '3' }}>
        <a href={linkHref} target="_blank" className={linkClicked ? 'clicked-link' : 'unclicked-link'} onClick={() => setLinkClicked(false)}>{linkContent}</a>
    </div>
    <Canvas gl={{ antialias: false }} dpr={[1, 1.5]} onPointerMissed={() => (state.clicked = null)}>
        <Items onItemClick={handleItemClick}/>
    </Canvas>
    </>
    )
}

