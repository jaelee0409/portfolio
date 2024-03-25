'use client'

import * as THREE from 'three'
import * as RAPIER from '@dimforge/rapier3d-compat'
import { useEffect, useRef, useState } from 'react'
import { useRoute, useLocation } from 'wouter'
import { Canvas, useFrame } from '@react-three/fiber'
import { useCursor, MeshReflectorMaterial, Image, Text, Environment, PointerLockControls, KeyboardControls } from '@react-three/drei'
import { Physics } from "@react-three/rapier"
import { easing } from 'maath'
import getUuid from 'uuid-by-string'
import { Player } from "./Player"
import Ecctrl, { EcctrlAnimation } from "ecctrl";

const GOLDENRATIO = 1.61803398875
const keyboardMap = [
    { name: "forward", keys: ["ArrowUp", "KeyW"] },
    { name: "backward", keys: ["ArrowDown", "KeyS"] },
    { name: "leftward", keys: ["ArrowLeft", "KeyA"] },
    { name: "rightward", keys: ["ArrowRight", "KeyD"] },
    { name: "jump", keys: ["Space"] },
    { name: "run", keys: ["Shift"] },
    // Optional animation key map
    { name: "action1", keys: ["1"] },
    { name: "action2", keys: ["2"] },
    { name: "action3", keys: ["3"] },
    { name: "action4", keys: ["KeyF"] },
];

export const App = ({ images }) => (
    <Canvas camera>
        <color attach="background" args={['#191919']} />
        <fog attach="fog" args={['#191919', 0, 15]} />
        <group position={[0, 0, 0]}>
            <Frames images={images} />
            <mesh rotation={[-Math.PI / 2, 0, 0]}>
                <planeGeometry args={[50, 50]} />
                <MeshReflectorMaterial
                blur={[300, 100]}
                resolution={2048}
                mixBlur={1}
                mixStrength={80}
                roughness={1}
                depthScale={1.2}
                minDepthThreshold={0.4}
                maxDepthThreshold={1.4}
                color="#050505"
                metalness={0.5}
            />
                </mesh>
            </group>
            <Environment preset="city" />
            <Physics gravity={[0, 0, 0]}>
                <KeyboardControls map={keyboardMap}>
                    <Ecctrl
                    camInitDis={-0.01} // camera intial position
    camMinDis={-0.01} // camera zoom in closest position
    camFollowMult={1000} // give any big number here, so the camera follows the character instantly
    turnVelMultiplier={1} // Turning speed same as moving speed
    turnSpeed={1000} // give it big turning speed to prevent turning wait time
    mode="CameraBasedMovement" // character's rotation will follow camera's rotation in this mode
    >
                        <Player />
                    </Ecctrl>
                </KeyboardControls>
                </Physics>
    </Canvas>
)

function Frames({ images, q = new THREE.Quaternion(), p = new THREE.Vector3() }) {
    const ref = useRef()
    const clicked = useRef()
    const [, params] = useRoute('/:id')
    const [, setLocation] = useLocation()
    useEffect(() => {
        clicked.current = ref.current.getObjectByName(params?.id)
        if (clicked.current) {
            clicked.current.parent.updateWorldMatrix(true, true)
            clicked.current.parent.localToWorld(p.set(0, GOLDENRATIO / 2, 1.25))
            clicked.current.parent.getWorldQuaternion(q)
        } else {
            p.set(0, 0, 5.5)
            q.identity()
        }
    })
    useFrame((state, dt) => {
        // easing.damp3(state.camera.position, p, 0.4, dt)
        // easing.dampQ(state.camera.quaternion, q, 0.4, dt)
    })
    return (
        <group
        ref={ref}
        onClick={(e) => (e.stopPropagation(), setLocation(clicked.current === e.object ? '/' : '/' + e.object.name))}
        onPointerMissed={() => setLocation('/')}>
        {images.map((props) => <Frame key={props.url} {...props} />)}
    </group>
    )
}

    function Frame({ url, c = new THREE.Color(), ...props }) {
        const image = useRef()
        const frame = useRef()
        const [, params] = useRoute('/item/:id')
        const [hovered, hover] = useState(false)
        const [rnd] = useState(() => Math.random())
        const name = getUuid(url)
        const isActive = params?.id === name
        useCursor(hovered)
        useFrame((state, dt) => {
            image.current.material.zoom = 1.5 + Math.sin(rnd * 10000 + state.clock.elapsedTime / 3) / 2
        })
        return (
            <group {...props}>
                <mesh
                name={name}
                onPointerOver={(e) => (e.stopPropagation(), hover(true))}
                onPointerOut={() => hover(false)}
                scale={[1, 1, 0.05]}
                position={[0, 0.5, 0]}>
                <boxGeometry />
                <meshStandardMaterial color="#151515" metalness={0.5} roughness={0.5} envMapIntensity={2} />
                <mesh ref={frame} raycast={() => null} scale={[0.9, 0.93, 0.9]} position={[0, 0, 0.2]}>
                    <boxGeometry />
                    <meshBasicMaterial toneMapped={false} fog={false} />
                </mesh>
                <Image raycast={() => null} ref={image} position={[0, 0, 0.7]} url={url} />
            </mesh>
            <Text maxWidth={1} anchorX="left" anchorY="top" position={[0.55, 1, 0]} fontSize={0.1}>
                {name.split('-').join(' ')}
            </Text>
        </group>
        )
    }

