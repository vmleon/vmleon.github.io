import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { Sky } from '@react-three/drei';
import { Physics, usePlane, useBox } from '@react-three/cannon';
import Car from './Car';
import Zone from './Zone';
import Overlay from './Overlay';
import { sections } from './content';

function Ground() {
  const [ref] = usePlane(() => ({ rotation: [-Math.PI / 2, 0, 0] }));
  return (
    <mesh ref={ref} receiveShadow>
      <planeGeometry args={[60, 60]} />
      <meshStandardMaterial color="#6b7280" />
    </mesh>
  );
}

function Wall({ position, args }) {
  const [ref] = useBox(() => ({ type: 'Static', position, args }));
  return (
    <mesh ref={ref}>
      <boxGeometry args={args} />
      <meshStandardMaterial color="#374151" />
    </mesh>
  );
}

export default function World() {
  const [active, setActive] = useState(null);

  return (
    <>
      <Canvas shadows camera={{ position: [0, 5, 14], fov: 50 }}>
        <Sky sunPosition={[10, 5, 10]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

        <Physics gravity={[0, -9.81, 0]}>
          <Ground />

          <Wall position={[  0, 1, -30]} args={[60, 2,  1]} />
          <Wall position={[  0, 1,  30]} args={[60, 2,  1]} />
          <Wall position={[-30, 1,   0]} args={[ 1, 2, 60]} />
          <Wall position={[ 30, 1,   0]} args={[ 1, 2, 60]} />

          <Zone position={[-10, 1,   0]} label="Experience" color="#3b82f6"
                onEnter={() => setActive('experience')} />
          <Zone position={[ 10, 1,   0]} label="Projects"   color="#10b981"
                onEnter={() => setActive('projects')} />
          <Zone position={[  0, 1, -10]} label="About"      color="#f59e0b"
                onEnter={() => setActive('about')} />

          <Car />
        </Physics>
      </Canvas>

      {active && <Overlay section={sections[active]} onClose={() => setActive(null)} />}

      <nav className="nav"><a href="/cv/">View CV →</a></nav>
      <div className="controls">WASD / Arrows to drive</div>
    </>
  );
}
