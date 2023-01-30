import React from "react";
import * as THREE from 'three';

import { Canvas } from "@react-three/fiber";

import Sphere from "./sphere";
import Plane from "./plane";
import Controls from "./controls";

export default function App() {
  const material = new THREE.LineBasicMaterial( { color: 'red' } );
  const points = [];
  points.push( new THREE.Vector2(0, 0) );
  points.push( new THREE.Vector2(2, 2) );
  const geometry = new THREE.BufferGeometry().setFromPoints( points );
  return (
    <Canvas camera={{ position: [2, 2, 2] }}>
      <Controls />
      {/* <fog attach="fog" args={["#041830", 5, 10]} /> */}
      <Sphere />
      <Plane />
      <mesh>
        <line geometry={geometry} material={material} />
      </mesh>
      <arrowHelper args={[new THREE.Vector3(1,0,0), new THREE.Vector3(0,0, 0), 1, , 0.3, 0.2]} />
      <gridHelper args={[20, 40, "white", "#00dcff"]} />
    </Canvas>
  );
}
