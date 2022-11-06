import * as THREE from "three"
import {
  Environment,
  OrbitControls,
  PerspectiveCamera,
  Sky,
  Text3D,
  Center,
  Text,
} from "@react-three/drei"
import { LayerMaterial, Color, Depth, Noise } from "lamina"
import Track from "./Track"
import Ground from "./Ground"
import Car from "./Car"
import { Physics, Debug } from "@react-three/cannon"
import { Suspense } from "react"

const Scene = () => {
  const fontUrl = "/fonts/Inter_Bold.json"

  return (
    <Suspense fallback={null}>
      <Sky sunPosition={[100, 20, 100]} />
      <Environment background resolution={64}>
        <mesh scale={100}>
          <sphereGeometry args={[1, 64, 64]} />
          <LayerMaterial side={THREE.BackSide}>
            <Color color="blue" alpha={1} />
            <Depth
              colorA="#8fce00"
              colorB="#ea9999"
              alpha={0.5}
              mode="normal"
              near={0}
              far={300}
              origin={[100, 100, 100]}
            />
            <Noise mapping="local" type="cell" scale={0.5} mode="softlight" />
          </LayerMaterial>
        </mesh>
      </Environment>
      <directionalLight
        position={[10, 10, 10]}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />

      <PerspectiveCamera makeDefault position={[-6, 4, 6]} fov={40} />
      <OrbitControls
        target={[-2.5, 0.0, 0.0]}
        zoom={100}
        minDistance={10}
        maxDistance={50}
        minPolarAngle={0}
        maxPolarAngle={Math.PI / 2.1}
      />

      {/*<AsciiRenderer invert />*/}

      <Physics>
        {/*<Debug color="black" scale={1.1}>*/}
        <Track />
        <Ground />
        <Car />

        <Center position={[-5, 0, -20]} rotation={[-Math.PI / 2, 0, 0]}>
          <Text3D
            curveSegments={32}
            bevelEnabled
            bevelSize={0.04}
            bevelThickness={0.1}
            height={0.5}
            lineHeight={0.5}
            letterSpacing={-0.06}
            size={2}
            font={fontUrl}
          >
            {`Jae Seong Lee`}
            <meshStandardMaterial color="#7B7B7B" />
          </Text3D>
        </Center>

        <Text
          position={[-10, 0.1, 10]}
          rotation={[-Math.PI / 2, 0, 0]}
          fontSize={2}
          maxWidth={20}
          lineHeight={1}
          letterSpacing={0.02}
          textAlign={"left"}
          font="https://fonts.gstatic.com/s/raleway/v14/1Ptrg8zYS_SKggPNwK4vaqI.woff"
          anchorX="center"
          anchorY="middle"
          fillOpacity={0.2}
          strokeWidth={"2.5%"}
          strokeColor="#E2ACBA"
        >
          Portfolio
        </Text>
        {/*</Debug>*/}
      </Physics>
    </Suspense>
  )
}

export default Scene
