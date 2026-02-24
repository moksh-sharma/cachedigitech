import { useRef, useEffect, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

/**
 * Loads and displays a .glb model with mouse interactivity (drag + look-at cursor).
 * Uses plain Three.js only (no @react-three/fiber) so it works with React 19.
 * - Transparent background; drag to rotate; model faces cursor on hover.
 */
export function GLBScrollViewer({
  modelUrl = "/humanoid_robot_face.glb",
  className = "",
  modelScale = 2,
  cameraDistance = 4,
  fov = 45,
  cameraX = 0,
  cameraY = 0,
  containerHeight = "1000px",
  sectionMinHeight = "1000px",
  disableScrollEffect = false,
}) {
  const containerRef = useRef(null);
  const sectionRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [containerReady, setContainerReady] = useState(false);

  // Scroll-based 3D emerge: section comes from "inside" the screen as you scroll
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const update = () => {
      const rect = section.getBoundingClientRect();
      const vh = window.innerHeight;
      // 0 = section just entering (top at bottom of viewport), 1 = section in view (top at/near top)
      const p = 1 - Math.max(0, Math.min(1, rect.top / vh));
      setScrollProgress(p);
    };
    update();
    window.addEventListener("scroll", update, { passive: true });
    window.addEventListener("resize", update);
    return () => {
      window.removeEventListener("scroll", update);
      window.removeEventListener("resize", update);
    };
  }, []);

  // Ease out cubic for emerge (optional)
  const eased = 1 - (1 - scrollProgress) ** 3;
  const translateZ = disableScrollEffect ? 0 : -320 + 320 * eased;
  const scale = disableScrollEffect ? 1 : 0.64 + 0.62 * eased;

  // Mouse drag rotation (accumulated)
  const mouseRotRef = useRef({ x: 0, y: 0 });
  const isDraggingRef = useRef(false);
  const prevMouseRef = useRef({ x: 0, y: 0 });
  // Look-at cursor: target rotation so model faces the mouse (-1..1 normalized)
  const lookTargetRef = useRef({ x: 0, y: 0 });
  const lookCurrentRef = useRef({ x: 0, y: 0 });

  // Mouse interactivity: drag to rotate + parallax on move
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onDown = (e) => {
      if (e.button !== 0) return;
      isDraggingRef.current = true;
      prevMouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const onMove = (e) => {
      const rect = container.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const nx = (e.clientX - cx) / (rect.width / 2);
      const ny = (e.clientY - cy) / (rect.height / 2);
      if (isDraggingRef.current) {
        const dx = e.clientX - prevMouseRef.current.x;
        const dy = e.clientY - prevMouseRef.current.y;
        mouseRotRef.current = {
          x: mouseRotRef.current.x + dy * 0.005,
          y: mouseRotRef.current.y + dx * 0.005,
        };
        prevMouseRef.current = { x: e.clientX, y: e.clientY };
      } else {
        // Model looks at cursor: map cursor position to rotation (clamp for smooth range)
        lookTargetRef.current = {
          x: Math.max(-0.4, Math.min(0.4, ny * 0.5)),
          y: Math.max(-0.7, Math.min(0.7, nx * 0.8)),
        };
      }
    };

    const onUp = () => {
      isDraggingRef.current = false;
    };

    const onLeave = () => {
      isDraggingRef.current = false;
      lookTargetRef.current = { x: 0, y: 0 };
    };

    container.addEventListener("mousedown", onDown);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    container.addEventListener("mouseleave", onLeave);
    return () => {
      container.removeEventListener("mousedown", onDown);
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
      container.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  // Parse height for fixed-size init (e.g. "420px" -> 420)
  const heightNum = parseInt(String(containerHeight).replace(/\D/g, ""), 10) || 420;
  const widthNum = 640;

  // Three.js scene: init when container is mounted; use fixed size so we don't depend on layout
  useEffect(() => {
    if (!containerReady) return;
    const container = containerRef.current;
    if (!container) return;

    let scene, camera, renderer, model = null;
    let raf = 0;
    let cancelled = false;

    function initThree(w, h) {
      if (w <= 0 || h <= 0) return;
      scene = new THREE.Scene();
      camera = new THREE.PerspectiveCamera(fov, w / h, 0.1, 100);
      camera.position.set(cameraX, cameraY, cameraDistance);
      camera.lookAt(0, 0, 0);
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0xe5e7eb, 1); // light gray so canvas is visible
      renderer.domElement.style.display = "block";
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      renderer.domElement.style.objectFit = "contain";
      container.appendChild(renderer.domElement);

      // Strong lighting so model is always visible (even dark materials)
      const ambient = new THREE.AmbientLight(0xffffff, 1.2);
      scene.add(ambient);
      const dir1 = new THREE.DirectionalLight(0xffffff, 1.5);
      dir1.position.set(5, 5, 5);
      scene.add(dir1);
      const dir2 = new THREE.DirectionalLight(0xffffff, 0.8);
      dir2.position.set(-5, 3, -5);
      scene.add(dir2);
      const dir3 = new THREE.DirectionalLight(0xffffff, 0.5);
      dir3.position.set(0, -5, 2);
      scene.add(dir3);

      // Debug: add a small cube so we can confirm WebGL is drawing (remove once GLB works)
      const testGeo = new THREE.BoxGeometry(0.5, 0.5, 0.5);
      const testMat = new THREE.MeshStandardMaterial({ color: 0xdc2626 });
      const testCube = new THREE.Mesh(testGeo, testMat);
      testCube.position.set(0, 0, 0);
      scene.add(testCube);
      const removeTestCube = () => {
        scene.remove(testCube);
        testGeo.dispose();
        testMat.dispose();
      };

      const loader = new GLTFLoader();
      loader.load(
        modelUrl,
        (gltf) => {
          if (cancelled) return;
          removeTestCube();
          model = gltf.scene;
          model.traverse((child) => {
            if (child.isMesh) {
              child.visible = true;
              child.frustumCulled = false;
            }
          });
          scene.add(model);

          const box = new THREE.Box3().setFromObject(model);
          const center = new THREE.Vector3();
          box.getCenter(center);
          const size = new THREE.Vector3();
          box.getSize(size);
          const maxDim = Math.max(size.x, size.y, size.z);

          // Only center and scale if we have a valid non-empty box
          if (maxDim > 1e-6 && Number.isFinite(center.x)) {
            model.position.sub(center);
            const targetSize = 2.5;
            let fitScale = targetSize / maxDim;
            fitScale = Math.max(0.01, Math.min(500, fitScale));
            model.scale.setScalar(fitScale * modelScale);
          } else {
            // Empty or invalid box: keep at origin, use default scale
            model.position.set(0, 0, 0);
            model.scale.setScalar(modelScale);
          }

          camera.lookAt(0, 0, 0);
        },
        undefined,
        (err) => {
          console.error("GLB load error:", err);
        }
      );

      const LERP = 0.08;
      function animate() {
        if (cancelled) return;
        raf = requestAnimationFrame(animate);
        if (model) {
          const mr = mouseRotRef.current;
          const target = lookTargetRef.current;
          const cur = lookCurrentRef.current;
          lookCurrentRef.current = {
            x: cur.x + (target.x - cur.x) * LERP,
            y: cur.y + (target.y - cur.y) * LERP,
          };
          const look = lookCurrentRef.current;
          model.rotation.y = mr.y + look.y;
          model.rotation.x = mr.x + look.x;
        }
        if (renderer && scene && camera) renderer.render(scene, camera);
      }
      animate();
    }

    function onResize() {
      if (!container || !renderer || !camera) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      if (w > 0 && h > 0) {
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        renderer.setSize(w, h);
      }
    }

    // Init immediately with fixed dimensions (no waiting for layout)
    initThree(widthNum, heightNum);

    const ro = new ResizeObserver(() => {
      if (renderer) onResize();
    });
    ro.observe(container);
    window.addEventListener("resize", onResize);

    return () => {
      cancelled = true;
      window.removeEventListener("resize", onResize);
      ro.disconnect();
      if (raf) cancelAnimationFrame(raf);
      if (renderer) {
        renderer.dispose();
        if (container && renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, [modelUrl, modelScale, cameraDistance, fov, cameraX, cameraY, containerReady, widthNum, heightNum]);

  return (
    <section
      ref={sectionRef}
      className={`relative w-full flex items-center justify-center overflow-hidden ${className}`}
      style={{ perspective: "1200px", perspectiveOrigin: "50% 50%", minHeight: sectionMinHeight, minWidth: "320px" }}
    >
      <div
        ref={(el) => {
          containerRef.current = el;
          if (el) setContainerReady(true);
        }}
        className="rounded-2xl overflow-hidden bg-gray-100/80 border border-gray-200/60 cursor-grab active:cursor-grabbing"
        style={{
          width: widthNum,
          height: heightNum,
          transform: `translateZ(${translateZ}px) scale(${scale})`,
          transformStyle: "preserve-3d",
        }}
      />
    </section>
  );
}