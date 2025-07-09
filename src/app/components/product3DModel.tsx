import { Environment, Loader, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useRef } from "react";
import { Box3, Object3D, Vector3 } from "three";

// This helper recenters the loaded model by its bounding box center
function CenteredModel({ url }: { url: string }) {
  const group = useRef<Object3D>(null);
  const { scene } = useGLTF(url);

  useLayoutEffect(() => {
    if (!group.current) return;
    // Compute bounding box center of the model
    const box = new Box3().setFromObject(scene);
    const center = new Vector3();
    box.getCenter(center);
    // Center the model by offsetting it
    group.current.position.set(-center.x, -center.y, -center.z);
  }, [scene]);

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}

export default function Product3DModel({ url }: { url: string }) {
  return (
    <div className="w-full h-full bg-white rounded-lg relative min-h-[320px]">
      <Canvas camera={{ position: [0, 0, 3], fov: 35 }}>
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 6, 3]} intensity={0.8} />
        <Environment preset="warehouse" />
        <Suspense fallback={null}>
          {/* CenteredModel recenters the object before controls */}
          <CenteredModel url={url} />
          <OrbitControls
            makeDefault
            target={[0, 0, 0]}
            minDistance={1.5}
            maxDistance={10}
            enablePan={false}
          />
        </Suspense>
      </Canvas>
      <Loader />
    </div>
  );
}
