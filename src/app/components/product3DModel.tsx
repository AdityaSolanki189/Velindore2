import { Environment, Loader, OrbitControls, useGLTF } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import { Suspense, useLayoutEffect, useRef, useEffect, useState, useCallback } from "react";
import { Box3, Object3D, Vector3, Mesh, Material } from "three";

// This helper recenters the loaded model by its bounding box center
function CenteredModel({ url }: { url: string }) {
  console.log('[CenteredModel] Initializing with URL:', url);
  const group = useRef<Object3D>(null);
  
  // useGLTF handles its own loading and error states
  const gltf = useGLTF(url);
  const scene = gltf.scene;
  
  // Log successful loading
  useEffect(() => {
    if (scene && scene.children.length > 0) {
      console.log('[CenteredModel] GLTF loaded successfully:', {
        url,
        sceneChildren: scene.children.length,
        sceneName: scene.name,
        hasGeometry: scene.children.some((child) => (child as { geometry?: unknown }).geometry)
      });
    } else if (scene) {
      console.warn('[CenteredModel] GLTF loaded but scene is empty:', {
        url,
        scene: scene,
        children: scene.children
      });
    }
  }, [scene, url]);

  useLayoutEffect(() => {
    console.log('[CenteredModel] useLayoutEffect triggered');
    if (!group.current) {
      console.warn('[CenteredModel] Group ref is null');
      return;
    }
    try {
      const box = new Box3().setFromObject(scene);
      const center = new Vector3();
      box.getCenter(center);
      group.current.position.set(-center.x, -center.y, -center.z);
      console.log('[CenteredModel] Model centered at:', { x: -center.x, y: -center.y, z: -center.z });
    } catch (error) {
      console.error('[CenteredModel] Error centering model:', error);
    }
  }, [scene]);

  useEffect(() => {
    return () => {
      console.log('[CenteredModel] Cleaning up resources for URL:', url);
      if (scene) {
        scene.traverse((child: Object3D) => {
          if ((child as Mesh).isMesh) {
            const mesh = child as Mesh;
            if (mesh.geometry) {
              console.log('[CenteredModel] Disposing geometry for mesh:', mesh.name);
              mesh.geometry.dispose();
            }
            if (mesh.material) {
              if (Array.isArray(mesh.material)) {
                mesh.material.forEach((material: Material, index) => {
                  console.log('[CenteredModel] Disposing material', index, 'for mesh:', mesh.name);
                  material.dispose();
                });
              } else {
                console.log('[CenteredModel] Disposing material for mesh:', mesh.name);
                mesh.material.dispose();
              }
            }
          }
        });
      }
    };
  }, [scene, url]);

  return (
    <group ref={group}>
      <primitive object={scene} />
    </group>
  );
}


export default function Product3DModel({ url }: { url: string }) {
  console.log('[Product3DModel] Component initializing with URL:', url);
  
  // Device detection
  const isMobile = typeof window !== 'undefined' && (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent));
  console.log('[Product3DModel] Device detection:', {
    isMobile,
    userAgent: typeof window !== 'undefined' ? navigator.userAgent : 'SSR',
    screen: typeof window !== 'undefined' ? { width: screen.width, height: screen.height } : 'SSR',
    devicePixelRatio: typeof window !== 'undefined' ? window.devicePixelRatio : 'SSR'
  });
  
  const [contextLost, setContextLost] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleContextLost = useCallback((event: Event) => {
    event.preventDefault();
    setContextLost(true);
    console.error('[Product3DModel] WebGL context lost - Mobile device may have limited GPU memory', {
      isMobile,
      timestamp: new Date().toISOString(),
      retryCount,
      event
    });
  }, [isMobile, retryCount]);

  const handleContextRestored = useCallback(() => {
    setContextLost(false);
    setRetryCount(prev => prev + 1);
    console.log('[Product3DModel] WebGL context restored', {
      isMobile,
      newRetryCount: retryCount + 1,
      timestamp: new Date().toISOString()
    });
  }, [isMobile, retryCount]);

  useEffect(() => {
    console.log('[Product3DModel] Setting up WebGL context listeners');
    const canvas = canvasRef.current;
    if (!canvas) {
      console.warn('[Product3DModel] Canvas ref is null - cannot set up context listeners');
      return;
    }

    canvas.addEventListener('webglcontextlost', handleContextLost);
    canvas.addEventListener('webglcontextrestored', handleContextRestored);
    console.log('[Product3DModel] WebGL context listeners attached');

    return () => {
      console.log('[Product3DModel] Cleaning up WebGL context listeners');
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, [handleContextLost, handleContextRestored]);

  // Check for WebGL support
  useEffect(() => {
    console.log('[Product3DModel] Checking WebGL support');
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    
    if (!gl) {
      console.error('[Product3DModel] WebGL not supported on this device', {
        isMobile,
        userAgent: navigator.userAgent
      });
    } else {
      const webglContext = gl as WebGLRenderingContext;
      console.log('[Product3DModel] WebGL support confirmed', {
        version: webglContext.getParameter(webglContext.VERSION),
        renderer: webglContext.getParameter(webglContext.RENDERER),
        vendor: webglContext.getParameter(webglContext.VENDOR)
      });
    }
  }, [isMobile]);

  if (contextLost) {
    console.warn('[Product3DModel] Rendering context lost fallback UI');
    return (
      <div className="w-full h-full bg-gray-100 rounded-lg relative min-h-[320px] flex items-center justify-center">
        <div className="text-center">
          <div className="text-gray-600 mb-2">
            {isMobile ? '3D Model unavailable on this device' : '3D Model temporarily unavailable'}
          </div>
          <div className="text-sm text-gray-500 mb-3">
            {isMobile ? 'Your device may have limited 3D graphics support' : 'WebGL context was lost'}
          </div>
          <button 
            onClick={() => {
              console.log('[Product3DModel] User clicked retry, attempt:', retryCount + 1);
              setRetryCount(prev => prev + 1);
            }}
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
        key={`${retryCount}-${url}`} // Include URL in key to force re-mount on URL change
        ref={canvasRef}
        camera={{ position: [0, 0, 3], fov: 35 }}
        gl={{ 
          preserveDrawingBuffer: true, // Enable to prevent context loss
          powerPreference: isMobile ? "default" : "high-performance",
          antialias: !isMobile,
          alpha: true,
          stencil: false,
          depth: true,
          failIfMajorPerformanceCaveat: false
        }}
        onCreated={({ gl, camera }) => {
          console.log('[Product3DModel] Canvas created successfully', {
            isMobile,
            glRenderer: gl.getContext().getParameter(gl.getContext().RENDERER),
            glVendor: gl.getContext().getParameter(gl.getContext().VENDOR),
            glVersion: gl.getContext().getParameter(gl.getContext().VERSION),
            maxTextureSize: gl.getContext().getParameter(gl.getContext().MAX_TEXTURE_SIZE),
            cameraPosition: camera.position,
            pixelRatio: gl.getPixelRatio(),
            domElement: gl.domElement.width + 'x' + gl.domElement.height
          });
          
          gl.debug.checkShaderErrors = false;
          
          // Mobile optimizations
          if (isMobile) {
            console.log('[Product3DModel] Applying mobile optimizations');
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 1.5)); // Lower pixel ratio for mobile
          } else {
            gl.setPixelRatio(Math.min(window.devicePixelRatio, 2));
          }
        }}
        onError={(error) => {
          console.error('[Product3DModel] Canvas error:', error);
        }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[2, 6, 3]} intensity={0.8} />
        <Environment preset="warehouse" />
        <Suspense fallback={
          <mesh>
            <boxGeometry args={[1, 1, 1]} />
            <meshBasicMaterial color="#cccccc" wireframe />
          </mesh>
        }>
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
