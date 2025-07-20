import { Environment, Loader, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useRef, useEffect, useState, useCallback } from "react";
import { Box3, Object3D, Vector3, Mesh, Material } from "three";

// This helper recenters the loaded model by its bounding box center
function CenteredModel({ url }: { url: string }) {
  const group = useRef<Object3D>(null);
  const { scene } = useGLTF(url);

  useLayoutEffect(() => {
    if (!group.current) return;
    const box = new Box3().setFromObject(scene);
    const center = new Vector3();
    box.getCenter(center);
    group.current.position.set(-center.x, -center.y, -center.z);
  }, [scene]);

  useEffect(() => {
    return () => {
      if (scene) {
        scene.traverse((child: Object3D) => {
          if ((child as Mesh).isMesh) {
            const mesh = child as Mesh;
            if (mesh.geometry) mesh.geometry.dispose();
            if (mesh.material) {
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((material: Material) => material.dispose());
              } else {
                mesh.material.dispose();
              }
            }
          }
        });
      }
    };
  }, [scene]);

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}


export default function Product3DModel({ url }: { url: string }) {
  const [contextLost, setContextLost] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleContextLost = useCallback((event: Event) => {
    event.preventDefault();
    setContextLost(true);
    console.warn('WebGL context lost, attempting recovery...');
  }, []);

  const handleContextRestored = useCallback(() => {
    setContextLost(false);
    setRetryCount(prev => prev + 1);
    console.log('WebGL context restored');
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [handleContextLost, handleContextRestored]);

  if (contextLost) {
    return (
      <div className="w-full h-full bg-gray-100 rounded-lg relative min-h-[320px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 mb-2">3D Model temporarily unavailable</div>
          <button 
            onClick={() => setRetryCount(prev => prev + 1)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full bg-white rounded-lg relative min-h-[320px]">
      <Canvas 
        key={retryCount}
        ref={canvasRef}
        camera={{ position: [0, 0, 3], fov: 35 }}
        gl={{ 
          preserveDrawingBuffer: false,
          powerPreference: "high-performance",
          antialias: true,
          alpha: false
        }}
        onCreated={({ gl }) => {
          gl.debug.checkShaderErrors = false;
        }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 6, 3]} intensity={0.8} />
        <Environment preset="warehouse" />
        <Suspense fallback={null}>
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
