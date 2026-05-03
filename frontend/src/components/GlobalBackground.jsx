import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Stars } from '@react-three/drei';

function SlowDrift() {
  const ref = useRef();
  useFrame(({ clock }) => {
    if (ref.current) ref.current.rotation.y = clock.getElapsedTime() * 0.008;
  });
  return (
    <group ref={ref}>
      <Stars radius={200} depth={80} count={3000} factor={4} saturation={0} fade speed={0.5} />
    </group>
  );
}

export default function GlobalBackground() {
  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', zIndex: 0, pointerEvents: 'none', background: '#09090B' }}>
      <Canvas camera={{ position: [0, 0, 1], fov: 60 }} gl={{ alpha: false, antialias: false, powerPreference: 'low-power' }}>
        <color attach="background" args={['#09090B']} />
        <SlowDrift />
      </Canvas>
    </div>
  );
}
