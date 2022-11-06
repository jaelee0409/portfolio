import { useLoader } from "@react-three/fiber"
import { MeshReflectorMaterial } from "@react-three/drei"
import { TextureLoader } from "three"
import { usePlane, useBox } from "@react-three/cannon"

function Cube(props) {
  const [ref] = useBox(() => ({
    mass: 1,
    position: [0, 5, 0],
    rotation: [0.4, 0.2, 0.5],
    ...props,
  }))
  return (
    <mesh receiveShadow castShadow ref={ref}>
      <boxGeometry />
      <meshLambertMaterial color="hotpink" />
    </mesh>
  )
}

const Ground = () => {
  const [ref] = usePlane(() => ({
    rotation: [-Math.PI / 2, 0, 0],
    position: [-5, -0.01, -7],
    type: "Static",
  }))

  const alphaMap = useLoader(
    TextureLoader,
    process.env.PUBLIC_URL + "/textures/alpha-map.png"
  )

  return (
    <>
      <mesh ref={ref}>
        <circleGeometry args={[35, 50]} />
        <MeshReflectorMaterial
          alphaMap={alphaMap}
          transparent={true}
          color={[0.3, 0.6, 0.3]}
          envMapIntensity={0.35}
          metalness={0.05}
          roughness={0.3}
          dithering={true}
          blur={[1024, 512]}
          mixBlur={3}
          mixStrength={3}
          mixContrast={0.7}
          resolution={1024}
          depthScale={0}
          mirror={0}
          minDepthThreshold={0.9}
          maxDepthThreshold={1}
          depthToBlurRatioBias={0.25}
          reflectorOffset={0.02}
        />
      </mesh>
      {/*<Cube position={[0.1, 5, 0]} />
      <Cube position={[0, 10, -1]} />
  <Cube position={[0, 20, -2]} />*/}
    </>
  )
}

export default Ground
