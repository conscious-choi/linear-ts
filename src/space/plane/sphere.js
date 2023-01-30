import React from "react";

export const Sphere = () => {
  return (
    <mesh position={[0, 0.2, 0]}>
      <sphereGeometry attach="geometry" args={[0.3, 20, 20]} />
      <meshBasicMaterial attach="material" color="purple" />
    </mesh>
  );
};

export default Sphere;
