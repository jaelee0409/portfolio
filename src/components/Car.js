import { useFrame, useLoader } from "@react-three/fiber"
import { useEffect, useRef } from "react"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader"
import { useControls } from "./useControls"
import { useBox, useRaycastVehicle } from "@react-three/cannon"

const Car = () => {
  const gltf = useLoader(
    GLTFLoader,
    process.env.PUBLIC_URL + "/models/racecar.glb"
  )
  let mesh = gltf.scene

  useControls()

  useEffect(() => {
    mesh.scale.set(0.2, 0.2, 0.2)
    mesh.children[0].position.set(3.4, 0, 2.0)
  }, [mesh])

  return <primitive object={mesh} />
}

export default Car
