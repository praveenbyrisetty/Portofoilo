import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* Shared rotating wrapper */
function Spin({ children, speed = 0.3 }) {
  const ref = useRef();
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * speed; });
  return <group ref={ref}>{children}</group>;
}

/* Bloch sphere: sphere + 3 orbital rings */
function BlochSphere({ position = [0,0,0], color = '#a855f7' }) {
  const ref = useRef();
  useFrame((_, dt) => { if (ref.current) ref.current.rotation.y += dt * 0.6; });
  return (
    <group ref={ref} position={position}>
      <mesh><sphereGeometry args={[0.7, 16, 16]} /><meshStandardMaterial color="#09090B" roughness={0.7} metalness={0.3} /></mesh>
      <mesh><sphereGeometry args={[0.72, 8, 8]} /><meshBasicMaterial color={color} wireframe transparent opacity={0.35} /></mesh>
      {/* XY ring */}
      <mesh><torusGeometry args={[0.85, 0.02, 8, 32]} /><meshBasicMaterial color={color} transparent opacity={0.3} /></mesh>
      {/* XZ ring */}
      <mesh rotation={[Math.PI/2,0,0]}><torusGeometry args={[0.85, 0.02, 8, 32]} /><meshBasicMaterial color={color} transparent opacity={0.2} /></mesh>
      {/* YZ ring */}
      <mesh rotation={[0,0,Math.PI/2]}><torusGeometry args={[0.85, 0.02, 8, 32]} /><meshBasicMaterial color={color} transparent opacity={0.2} /></mesh>
      {/* State vector arrow */}
      <mesh position={[0, 0.5, 0]}><coneGeometry args={[0.08, 0.3, 6]} /><meshBasicMaterial color="#F59E0B" /></mesh>
      <mesh><cylinderGeometry args={[0.02, 0.02, 1, 4]} /><meshBasicMaterial color="#F59E0B" transparent opacity={0.6} /></mesh>
    </group>
  );
}

/* 1. FLQC — server icosahedron on top, 3 client cubes below, qubit particles flowing */
function FLQCScene() {
  const particles = useRef([]);
  const groupRef = useRef();
  
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (groupRef.current) groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.3;
    particles.current.forEach((p, i) => {
      if (p) {
        const prog = ((t * 0.8 + i * 0.7) % 2) / 2;
        p.position.y = 1.8 - prog * 4;
        p.material.opacity = prog < 0.1 || prog > 0.9 ? 0 : 0.7;
      }
    });
  });

  const clients = [[-2.2, -2.5, 0], [0, -2.5, 0], [2.2, -2.5, 0]];
  return (
    <group ref={groupRef}>
      {/* Server */}
      <Spin speed={0.5}>
        <mesh position={[0, 1.8, 0]}><icosahedronGeometry args={[0.9, 0]} /><meshStandardMaterial color="#09090B" roughness={0.7} flatShading /></mesh>
        <mesh position={[0, 1.8, 0]}><icosahedronGeometry args={[0.9, 0]} /><meshBasicMaterial color="#F59E0B" wireframe transparent opacity={0.45} /></mesh>
      </Spin>
      {/* Clients + beams + particles */}
      {clients.map((pos, i) => (
        <group key={i}>
          <mesh position={pos}><boxGeometry args={[0.7, 0.7, 0.7]} /><meshStandardMaterial color="#09090B" roughness={0.9} flatShading /></mesh>
          <mesh position={pos}><boxGeometry args={[0.7, 0.7, 0.7]} /><meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.3} /></mesh>
          {/* Beam line */}
          <mesh position={[pos[0]/2, (1.8+pos[1])/2, 0]} rotation={[0, 0, Math.atan2(pos[0], 4.3)]}><cylinderGeometry args={[0.015, 0.015, 4.5, 4]} /><meshBasicMaterial color="#3B82F6" transparent opacity={0.12} /></mesh>
          {/* Flowing particle */}
          <mesh ref={el => particles.current[i] = el} position={[pos[0]/2, 0, 0]}><sphereGeometry args={[0.08, 6, 6]} /><meshBasicMaterial color="#06b6d4" transparent opacity={0.7} /></mesh>
        </group>
      ))}
    </group>
  );
}

/* 2. Two-Qubit Entanglement — two Bloch spheres with entanglement wave */
function TwoQubitScene() {
  const waveRef = useRef();
  useFrame(({ clock }) => {
    if (waveRef.current) waveRef.current.material.opacity = 0.15 + Math.sin(clock.getElapsedTime() * 4) * 0.15;
  });
  return (
    <>
      <BlochSphere position={[-1.6, 0, 0]} color="#a855f7" />
      <BlochSphere position={[1.6, 0, 0]} color="#a855f7" />
      {/* Entanglement wave link */}
      <mesh ref={waveRef} rotation={[0, 0, Math.PI/2]}><cylinderGeometry args={[0.03, 0.03, 3.2, 4]} /><meshBasicMaterial color="#F59E0B" transparent opacity={0.3} /></mesh>
      <mesh rotation={[0, 0, Math.PI/2]}><torusGeometry args={[1.6, 0.015, 8, 32, Math.PI]} /><meshBasicMaterial color="#F59E0B" transparent opacity={0.15} /></mesh>
    </>
  );
}

/* 3. BB84 — polarized photon travelling through quantum channel to key */
function BB84Scene() {
  const photonRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (photonRef.current) {
      photonRef.current.position.x = -3 + ((t * 1.2) % 6);
      photonRef.current.rotation.z = t * 4;
      photonRef.current.rotation.x = t * 2;
    }
  });
  return (
    <>
      {/* Emitter laser */}
      <mesh position={[-3.2, 0, 0]}><boxGeometry args={[0.5, 0.8, 0.5]} /><meshStandardMaterial color="#09090B" roughness={0.8} flatShading /></mesh>
      <mesh position={[-3.2, 0, 0]}><boxGeometry args={[0.5, 0.8, 0.5]} /><meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.35} /></mesh>
      {/* Channel beam */}
      <mesh rotation={[0, 0, Math.PI/2]}><cylinderGeometry args={[0.015, 0.015, 6, 4]} /><meshBasicMaterial color="#3B82F6" transparent opacity={0.1} /></mesh>
      {/* Photon — octahedron for polarization */}
      <group ref={photonRef}>
        <mesh><octahedronGeometry args={[0.25, 0]} /><meshBasicMaterial color="#60a5fa" wireframe transparent opacity={0.85} /></mesh>
        <mesh><octahedronGeometry args={[0.18, 0]} /><meshBasicMaterial color="#93c5fd" transparent opacity={0.4} /></mesh>
      </group>
      {/* Receiver — key-shaped torus */}
      <Spin speed={0.5}>
        <mesh position={[3.2, 0, 0]}><torusGeometry args={[0.45, 0.12, 8, 6]} /><meshStandardMaterial color="#09090B" roughness={0.8} flatShading /></mesh>
        <mesh position={[3.2, 0, 0]}><torusGeometry args={[0.45, 0.12, 8, 6]} /><meshBasicMaterial color="#F59E0B" wireframe transparent opacity={0.45} /></mesh>
        <mesh position={[3.2, -0.7, 0]}><boxGeometry args={[0.1, 0.5, 0.1]} /><meshBasicMaterial color="#F59E0B" transparent opacity={0.4} /></mesh>
      </Spin>
    </>
  );
}

/* 4. Tamper Log — hash chain: 3 blocks linked, integrity pulse */
function TamperLogScene() {
  const refs = [useRef(), useRef(), useRef()];
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    refs.forEach((r, i) => {
      if (r.current) {
        const flash = Math.sin(t * 2 - i * 1.5) > 0.7;
        r.current.material.color.set(flash ? '#10b981' : '#3B82F6');
        r.current.material.opacity = flash ? 0.5 : 0.2;
      }
    });
  });
  const xs = [-2.5, 0, 2.5];
  return (
    <Spin speed={0.15}>
      {xs.map((x, i) => (
        <group key={i}>
          <mesh position={[x, 0, 0]}><boxGeometry args={[1.3, 1.3, 1.3]} /><meshStandardMaterial color="#09090B" roughness={0.9} flatShading /></mesh>
          <mesh position={[x, 0, 0]} ref={refs[i]}><boxGeometry args={[1.3, 1.3, 1.3]} /><meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.2} /></mesh>
          {i < 2 && <mesh position={[x+1.25, 0, 0]} rotation={[0,0,Math.PI/2]}><cylinderGeometry args={[0.025, 0.025, 1.2, 4]} /><meshBasicMaterial color="#94a3b8" transparent opacity={0.3} /></mesh>}
        </group>
      ))}
    </Spin>
  );
}

/* 5. Honeypot — actual jar shape: wide-bottom cylinder + narrow neck + lid */
function HoneypotScene() {
  const pingRef = useRef();
  const jarRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (jarRef.current) jarRef.current.rotation.y += 0.004;
    if (pingRef.current) {
      const s = 1 + (t % 2.5);
      pingRef.current.scale.set(s, s, s);
      pingRef.current.material.opacity = Math.max(0, 0.45 - (t % 2.5) * 0.18);
    }
  });

  // Jar profile via lathe
  const jarGeo = useMemo(() => {
    const pts = [
      new THREE.Vector2(0, 0),
      new THREE.Vector2(1, 0),       // base
      new THREE.Vector2(1.1, 0.3),   // bottom curve
      new THREE.Vector2(1.05, 1.2),  // belly
      new THREE.Vector2(0.6, 1.8),   // neck
      new THREE.Vector2(0.55, 2.0),  // lip
      new THREE.Vector2(0.7, 2.05),  // rim
      new THREE.Vector2(0.7, 2.15),  // rim top
      new THREE.Vector2(0, 2.15),    // cap
    ];
    return new THREE.LatheGeometry(pts, 8);
  }, []);

  return (
    <group ref={jarRef}>
      <mesh geometry={jarGeo} position={[0, -1.2, 0]}><meshStandardMaterial color="#09090B" roughness={0.7} flatShading /></mesh>
      <mesh geometry={jarGeo} position={[0, -1.2, 0]}><meshBasicMaterial color="#F59E0B" wireframe transparent opacity={0.3} /></mesh>
      {/* Honey glow inside */}
      <mesh position={[0, 0, 0]}><sphereGeometry args={[0.5, 6, 6]} /><meshBasicMaterial color="#fbbf24" transparent opacity={0.15} /></mesh>
      {/* Trap ping ring */}
      <mesh ref={pingRef} position={[0, 0.2, 0]} rotation={[Math.PI/2, 0, 0]}><torusGeometry args={[1.2, 0.02, 4, 16]} /><meshBasicMaterial color="#ef4444" transparent opacity={0.4} /></mesh>
    </group>
  );
}

/* 6. Password Manager — proper padlock: box body + arched shackle */
function PasswordScene() {
  const shieldRef = useRef();
  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();
    if (shieldRef.current) {
      shieldRef.current.position.y = 1.8 + Math.sin(t * 1.5) * 0.25;
      shieldRef.current.rotation.y = t * 0.4;
    }
  });

  // Shackle: half-torus
  return (
    <>
      {/* Lock body */}
      <mesh position={[0, -0.6, 0]}><boxGeometry args={[1.6, 1.2, 0.7]} /><meshStandardMaterial color="#09090B" roughness={0.8} flatShading /></mesh>
      <mesh position={[0, -0.6, 0]}><boxGeometry args={[1.6, 1.2, 0.7]} /><meshBasicMaterial color="#f97316" wireframe transparent opacity={0.35} /></mesh>
      {/* Keyhole */}
      <mesh position={[0, -0.5, 0.36]}><sphereGeometry args={[0.12, 6, 6]} /><meshBasicMaterial color="#000" /></mesh>
      <mesh position={[0, -0.7, 0.36]}><boxGeometry args={[0.06, 0.25, 0.02]} /><meshBasicMaterial color="#000" /></mesh>
      {/* Shackle arch */}
      <mesh position={[0, 0.2, 0]}><torusGeometry args={[0.45, 0.09, 8, 12, Math.PI]} /><meshStandardMaterial color="#94a3b8" roughness={0.5} metalness={0.5} /></mesh>
      <mesh position={[0, 0.2, 0]}><torusGeometry args={[0.45, 0.09, 8, 12, Math.PI]} /><meshBasicMaterial color="#cbd5e1" wireframe transparent opacity={0.3} /></mesh>
      {/* Floating shield */}
      <group ref={shieldRef}>
        <mesh><dodecahedronGeometry args={[0.4, 0]} /><meshStandardMaterial color="#09090B" roughness={0.7} flatShading /></mesh>
        <mesh><dodecahedronGeometry args={[0.4, 0]} /><meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.4} /></mesh>
      </group>
    </>
  );
}

/* 7. Credential Ledger — scroll with end-caps and verified seal */
function LedgerScene() {
  const ref = useRef();
  useFrame(({ clock }) => { if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.25; });
  return (
    <group ref={ref}>
      <mesh rotation={[0, 0, Math.PI/2]}><cylinderGeometry args={[0.35, 0.35, 2.8, 8]} /><meshStandardMaterial color="#09090B" roughness={0.8} flatShading /></mesh>
      <mesh rotation={[0, 0, Math.PI/2]}><cylinderGeometry args={[0.35, 0.35, 2.8, 8]} /><meshBasicMaterial color="#eab308" wireframe transparent opacity={0.3} /></mesh>
      {[-1.5, 1.5].map((x, i) => (
        <mesh key={i} position={[x, 0, 0]} rotation={[0, 0, Math.PI/2]}><cylinderGeometry args={[0.5, 0.5, 0.12, 8]} /><meshBasicMaterial color="#F59E0B" wireframe transparent opacity={0.45} /></mesh>
      ))}
      {/* Unrolled parchment sheet */}
      <mesh position={[0, -0.6, 0.3]} rotation={[-0.1, 0, 0]}><planeGeometry args={[2.2, 1.2]} /><meshBasicMaterial color="#fef3c7" transparent opacity={0.08} side={THREE.DoubleSide} /></mesh>
      {/* Verified seal */}
      <Spin speed={0.8}>
        <mesh position={[0, -0.6, 0.5]}><torusGeometry args={[0.3, 0.06, 6, 6]} /><meshBasicMaterial color="#10b981" wireframe transparent opacity={0.6} /></mesh>
      </Spin>
    </group>
  );
}

/* Scene wrapper — consistent lighting matching Journey */
function VisScene({ children }) {
  return (
    <Canvas camera={{ position: [0, 0.5, 6], fov: 50 }} style={{ width: '100%', height: '100%', background: 'transparent' }} gl={{ alpha: true }}>
      <ambientLight intensity={0.25} color="#3B82F6" />
      <directionalLight position={[5, 5, 5]} intensity={1.5} color="#F59E0B" />
      <directionalLight position={[-3, 2, -2]} intensity={0.4} color="#3B82F6" />
      <fog attach="fog" args={['#09090B', 6, 16]} />
      {children}
    </Canvas>
  );
}

/* Lazy wrapper — only mount the heavy Canvas when in viewport */
function LazyVis({ children }) {
  const ref = useRef();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { rootMargin: '200px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} style={{ width: '100%', height: '100%' }}>
      {visible ? <VisScene>{children}</VisScene> : null}
    </div>
  );
}

export default function getVisualizer(id) {
  const map = {
    'quantum-flqc': <FLQCScene />,
    'qubit-entanglement': <TwoQubitScene />,
    'qkd-bb84': <BB84Scene />,
    'tamper-logging': <TamperLogScene />,
    'honeypot': <HoneypotScene />,
    'password-manager': <PasswordScene />,
    'credential-ledger': <LedgerScene />,
  };
  return <LazyVis>{map[id] || <Spin><mesh><icosahedronGeometry args={[1,0]} /><meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.3} /></mesh></Spin>}</LazyVis>;
}

