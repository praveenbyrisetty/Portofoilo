import { useRef, useMemo } from 'react';
import { useScroll } from 'framer-motion';
import { Canvas, useFrame } from '@react-three/fiber';
import { Html, Stars } from '@react-three/drei';
import * as THREE from 'three';

const SPACING = 400; // Distance between peaks on Z axis
const OFFSET = 200;  // First peak Z position

// Procedural terrain with distinct mountain peaks
function Terrain({ length }) {
  const geometry = useMemo(() => {
    const depth = length * SPACING + 1000;
    // High resolution grid to make mountains look sharp
    const geo = new THREE.PlaneGeometry(600, depth, 128, Math.floor(depth / 10));
    geo.rotateX(-Math.PI / 2);
    geo.translate(0, 0, -depth / 2 + 500);

    // Calculate mountain peak coordinates
    const mountains = [];
    for (let i = 0; i < length + 2; i++) {
      const progressScale = Math.min(i / (length - 1), 1);
      const isEnd = i >= length - 1;
      
      mountains.push({
        x: isEnd ? 0 : (i % 2 === 0 ? -80 : 80), // Final mountain is centered
        z: -(i * SPACING + OFFSET),
        h: 20 + progressScale * 40 // Height scales from 20 up to 60
      });
    }

    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      
      let height = -40; // Base valley floor depth
      
      // Calculate height based on nearest mountain peak
      for (let m of mountains) {
         const dx = x - m.x;
         const dz = z - m.z;
         const dist = Math.sqrt(dx*dx + dz*dz);
         
         // Mountain shape: steep cone
         // height drops by 0.5 units for every 1 unit of distance
         const mHeight = m.h - dist * 0.5;
         if (mHeight > height) height = mHeight;
      }
      
      // Add jagged rock noise to the surface
      height += (Math.random() * 5 - 2.5);
      pos.setY(i, height);
    }
    geo.computeVertexNormals();
    return geo;
  }, [length]);

  return (
    <group position={[0, 0, 0]}>
      <mesh geometry={geometry}>
        <meshStandardMaterial 
          color="#09090B"
          roughness={0.9}
          metalness={0.2}
          flatShading={true}
        />
      </mesh>
      {/* Blue wireframe overlay for tech aesthetic */}
      <mesh geometry={geometry}>
         <meshBasicMaterial color="#3B82F6" wireframe={true} transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

function Scene({ timeline, scrollYProgress }) {
  const cameraMaxZ = -(timeline.length * SPACING);

  useFrame((state) => {
    const progress = scrollYProgress.get();
    const currentZ = progress * cameraMaxZ;
    
    // Camera is exactly at currentZ (riding the wave)
    state.camera.position.z = currentZ;
    
    // phase = positive index of which peak we're near (0 at first peak, 1 at second, etc.)
    const phase = (-currentZ - OFFSET) / SPACING;
    
    // Smoothly reduce zig-zag amplitude to 0 as we approach the final centered mountain
    let amp = 60;
    if (phase > timeline.length - 2) {
      amp = Math.max(0, 60 * (timeline.length - 1 - phase));
    }
    const currentX = Math.cos(phase * Math.PI) * (phase < 0 ? 0 : -amp);
    state.camera.position.x = currentX;
    
    // Camera Y follows the terrain height (sharp peaks, deep valleys)
    // The peak height increases as we go — this is the key fix
    const progressScale = Math.min(Math.max(phase / (timeline.length - 1), 0), 1);
    const currentPeakHeight = 20 + progressScale * 40;
    
    const distToPeak = Math.abs(Math.round(phase) - phase); // 0 at peak, 0.5 at valley
    const terrainY = (1 - distToPeak * 2) * (currentPeakHeight + 30) - 30; 
    
    // Hover the camera above the terrain — extra clearance so we never clip
    state.camera.position.y = terrainY + 20;
    
    // Look ahead directly at the NEXT peak/valley
    const lookZ = currentZ - 200;
    const lookPhase = (-lookZ - OFFSET) / SPACING;
    
    let lookAmp = 80;
    if (lookPhase > timeline.length - 2) {
      lookAmp = Math.max(0, 80 * (timeline.length - 1 - lookPhase));
    }
    const lookX = Math.cos(lookPhase * Math.PI) * (lookPhase < 0 ? 0 : -lookAmp);
    
    const lookProgressScale = Math.min(Math.max(lookPhase / (timeline.length - 1), 0), 1);
    const lookPeakHeight = 20 + lookProgressScale * 40;
    const lookDistToPeak = Math.abs(Math.round(lookPhase) - lookPhase);
    const lookTerrainY = (1 - lookDistToPeak * 2) * (lookPeakHeight + 30) - 30;
    
    state.camera.lookAt(lookX, lookTerrainY + 5, lookZ);
  });

  return (
    <>
      <ambientLight intensity={0.2} color="#3B82F6" />
      <directionalLight position={[0, 100, -(timeline.length * SPACING + 500)]} intensity={4} color="#F59E0B" />
      <directionalLight position={[100, 200, 0]} intensity={1} color="#3B82F6" />
      
      <fog attach="fog" args={['#09090B', 50, 600]} />
      <Stars radius={300} depth={100} count={4000} factor={6} saturation={0} fade speed={1} />
      
      <Terrain length={timeline.length} />

      {timeline.map((item, index) => {
        const isLast = index === timeline.length - 1;
        const progressScale = index / (timeline.length - 1);
        
        // Milestone is exactly at the peak coordinates
        const itemZ = -(index * SPACING + OFFSET);
        const itemX = isLast ? 0 : (index % 2 === 0 ? -80 : 80);
        const terrainY = 20 + progressScale * 40; // Ascending Peak height
        const isCurrent = item.date === "CURRENT";
        
        return (
          <group key={index} position={[itemX, terrainY, itemZ]}>
            {/* Ground Base */}
            <mesh position={[0, -2, 0]}>
              <cylinderGeometry args={[5, 5, 2, 32]} />
              <meshBasicMaterial color={isCurrent ? "#F59E0B" : "#3B82F6"} transparent opacity={isCurrent ? 0.8 : 0.3} />
            </mesh>
            
            {/* Vertical Marker Beam (Flagpole) */}
            <mesh position={[0, 15, 0]}>
              <cylinderGeometry args={[0.4, 0.4, 34, 8]} />
              <meshBasicMaterial color={isCurrent ? "#F59E0B" : "#3B82F6"} transparent opacity={0.7} />
            </mesh>

            {/* Glowing sphere at the top of the pole */}
            <mesh position={[0, 32, 0]}>
              <sphereGeometry args={[1.5, 16, 16]} />
              <meshBasicMaterial color={isCurrent ? "#F59E0B" : "#3B82F6"} />
            </mesh>
            
            {/* The HTML Flag Card — uses distanceFactor so it stays visible */}
            <Html
              center
              position={[0, 38, 0]}
              distanceFactor={60}
              occlude={false}
              zIndexRange={[100, 0]}
            >
              <div className={`milestone-card ${isCurrent ? 'milestone-card--current' : ''}`} style={{ 
                width: '280px', 
                pointerEvents: 'auto'
              }}>
                <div className="milestone-card__date">{item.date}</div>
                <h3 className="milestone-card__title">{item.title}</h3>
                <p className="milestone-card__desc">{item.description}</p>
              </div>
            </Html>
          </group>
        );
      })}
    </>
  );
}

export default function Journey({ timeline }) {
  const containerRef = useRef(null);
  const height = `calc(100vh + ${timeline.length * 80}vh)`;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  return (
    <section id="journey" ref={containerRef} style={{ height }} className="journey-parallax">
      <div className="journey-parallax__sticky" style={{ background: '#09090B' }}>
        <Canvas camera={{ position: [0, 5, 0], fov: 65 }}>
          <Scene timeline={timeline} scrollYProgress={scrollYProgress} />
        </Canvas>
      </div>
      
      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.5); opacity: 0.5; }
          100% { transform: scale(1); opacity: 1; }
        }
      `}</style>
    </section>
  );
}
