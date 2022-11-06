import { useLoader } from "@react-three/fiber"
import { useEffect } from "react"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"

const Track = () => {
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/track.glb"
  )

  return (
    <mesh>
      <primitive object={gltf.scene} />
      <meshBasicMaterial />
    </mesh>
  )
}

export default Track
