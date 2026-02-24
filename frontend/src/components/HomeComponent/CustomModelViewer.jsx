import { useRef, useState, useEffect, Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { useGLTF, OrbitControls } from "@react-three/drei";

/**
 * Renders your loaded GLB/GLTF model inside the canvas.
 * Receives scrollProgress (0–1) so the model can rotate with scroll.
 */
function Model({ url, scrollProgress = 0, scale = 2 }) {
  const { scene } = useGLTF(url);
  const ref = useRef();

  const rotateY = scrollProgress * Math.PI * 2;
  const rotateX = scrollProgress * Math.PI * 0.15;

  return (
    <primitive
      ref={ref}
      object={scene}
      rotation={[rotateX, rotateY, 0]}
      scale={scale}
    />
  );
}

/**
 * Custom 3D model viewer with optional scroll-driven rotation.
 *
 * How to use:
 * 1. Put your .glb or .gltf file in:  frontend/public/
 *    Example:  frontend/public/my-model.glb
 * 2. Use the component with the public path:
 *    <CustomModelViewer modelUrl="/my-model.glb" scrollProgress={progress} />
 *
 * Supported formats: .glb (recommended), .gltf
 * You can export from Blender, Sketchfab, or use free models from sites like Poly Pizza.
 */
export function CustomModelViewer({
  modelUrl = "/model.glb",
  scrollProgress = 0,
  className = "",
  enableOrbit = false,
  modelScale = 2,
}) {
  return (
    <div className={`relative w-full h-[320px] lg:h-[400px] bg-gray-100/50 rounded-2xl overflow-hidden ${className}`}>
      <Canvas
        camera={{ position: [0, 0, 4], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={1} />
        <directionalLight position={[4, 4, 4]} intensity={1.2} />
        <directionalLight position={[-2, 2, -2]} intensity={0.4} />
        <Suspense
          fallback={
            <mesh>
              <boxGeometry args={[0.5, 0.5, 0.5]} />
              <meshStandardMaterial color="#6366f1" wireframe />
            </mesh>
          }
        >
          <Model url={modelUrl} scrollProgress={scrollProgress} scale={modelScale} />
        </Suspense>
        {enableOrbit && <OrbitControls enableZoom={true} enablePan={false} />}
      </Canvas>
    </div>
  );
}

/**
 * Section that tracks scroll and passes progress to CustomModelViewer.
 * Use this when you want the 3D model to rotate as the user scrolls through the section.
 */
export function ScrollReactiveModelSection({
  modelUrl = "/model.glb",
  className = "",
  enableOrbit = false,
  modelScale = 2,
}) {
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const updateProgress = () => {
      const rect = section.getBoundingClientRect();
      const totalTravel = window.innerHeight + rect.height;
      const currentTravel = window.innerHeight - rect.top;
      setScrollProgress(Math.max(0, Math.min(1, currentTravel / totalTravel)));
    };
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);
    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative flex items-center justify-center min-h-[320px] lg:min-h-[400px] overflow-hidden py-14 lg:py-20 px-6 ${className}`}
    >
      <CustomModelViewer
        modelUrl={modelUrl}
        scrollProgress={scrollProgress}
        enableOrbit={enableOrbit}
        modelScale={modelScale}
      />
    </section>
  );
}

/**
 * Preload your model once to avoid loading delay:
 *   useGLTF.preload('/my-model.glb');
 */
