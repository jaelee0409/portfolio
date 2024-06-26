'use client'

import * as THREE from 'three'
import * as RAPIER from '@dimforge/rapier3d-compat'
import { useEffect, useRef, useState } from 'react'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { useCursor, MeshPortalMaterial, CameraControls, Gltf, Text } from '@react-three/drei'
import { useRoute, useLocation } from 'wouter'
import { easing, geometry } from 'maath'

import ShinyDiamond from './ShinyDiamond' 

extend(geometry)

// TODO: 

export const App = () => (
    <Canvas camera={{ fov: 75, position: [0, 0, 20] }}>
        <color attach="background" args={['#f0f0f0']} />
        <Frame id="01" name='01' author="Omar Faruq Tawsif" bg="#e4cdac" position={[-2.1, 0, 0.75]} rotation={[0, 0.75, 0]}>
            {/*
                <ShinyDiamond />
                */
            }
        </Frame>
        <Frame id="02" name='02' author="Omar Faruq Tawsif" bg="#e4cdac" position={[-1.15, 0, 0]} rotation={[0, 0.5, 0]}>
            <Gltf src="pickles_3d_version_of_hyuna_lees_illustration-transformed.glb" scale={8} position={[0, -0.7, -2]} />
        </Frame>
        <Frame id="03" name="tea" author="Omar Faruq Tawsif" position={[0, 0, -0.25]}>
            <Gltf src="tea-transformed.glb" position={[0, -2, -3]} />
        </Frame>
        <Frame id="04" name="04" author="Omar Faruq Tawsif" bg="#d1d1ca" position={[1.15, 0, 0]} rotation={[0, -0.5, 0]}>
            <Gltf src="still_life_based_on_heathers_artwork-transformed.glb" scale={2} position={[0, -0.8, -4]} />
        </Frame>
        <Frame id="05" name='05' author="Omar Faruq Tawsif" bg="#e4cdac" position={[2.1, 0, 0.75]} rotation={[0, -0.75, 0]}>
            <Gltf src="ring.glb" position={[15, -15, 15]} />
        </Frame>
        <Rig />
    </Canvas>
)

function Frame({ id, name, author, bg, width = 1, height = 1.61803398875, children, ...props }) {
    const portal = useRef()
    const [, setLocation] = useLocation()
    const [, params] = useRoute('/:id')
    const [hovered, hover] = useState(false)

    useCursor(hovered)
    useFrame((state, dt) => easing.damp(portal.current, 'blend', params?.id === id ? 1 : 0, 0.2, dt))

    return (
        <group {...props}>
            <Text fontSize={0.1} anchorY="top" position={[0.0, 0.715, 0.01]} color={'#ffffff'} material-toneMapped={false}>
                {name}
            </Text>
            {/*
      <Text fontSize={0.1} anchorX="right" position={[0.4, -0.659, 0.01]} material-toneMapped={false}>
        /{id}
      </Text>
      */}
      {/*
      <Text fontSize={0.04} anchorX="right" position={[0.0, -0.677, 0.01]} material-toneMapped={false}>
        {author}
      </Text>
      */}
      <mesh name={id} onDoubleClick={(e) => (e.stopPropagation(), setLocation('/' + e.object.name))} onPointerOver={(e) => hover(true)} onPointerOut={() => hover(false)}>
          <roundedPlaneGeometry args={[width, height, 0.1]} />
          <MeshPortalMaterial ref={portal} events={params?.id === id} side={THREE.DoubleSide}>
              <color attach="background" args={[bg]} />
              {children}
          </MeshPortalMaterial>
      </mesh>
  </group>
    )
}

function Rig({ position = new THREE.Vector3(0, 0, 5), focus = new THREE.Vector3(0, 0, 0) }) {
    const { controls, scene } = useThree()
    const [, params] = useRoute('/:id')

    useEffect(() => {
        const active = scene.getObjectByName(params?.id)
        if (active) {
            active.parent.localToWorld(position.set(0, 0.5, 0.25))
            active.parent.localToWorld(focus.set(0, 0, -2))
        }
        controls?.setLookAt(...position.toArray(), ...focus.toArray(), true)
    })

    return <CameraControls makeDefault minPolarAngle={Math.PI / 8} maxPolarAngle={Math.PI / 2} minAzimuthAngle={-Math.PI / 4} maxAzimuthAngle={Math.PI / 4} minDistance={5} maxDistance={10} minZoom={5} maxZoom={10} />
}

