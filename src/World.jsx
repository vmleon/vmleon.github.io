import { useState } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sky } from '@react-three/drei';
import Zone from './Zone';
import Overlay from './Overlay';
import { sections } from './content';

export default function World() {
  const [active, setActive] = useState(null);

  return (
    <>
      <Canvas shadows camera={{ position: [0, 5, 14], fov: 50 }}>
        <Sky sunPosition={[10, 5, 10]} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />

        <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
          <planeGeometry args={[60, 60]} />
          <meshStandardMaterial color="#6b7280" />
        </mesh>

        <Zone position={[-8, 1,  0]} label="Experience" onOpen={() => setActive('experience')} />
        <Zone position={[ 8, 1,  0]} label="Projects"   onOpen={() => setActive('projects')} />
        <Zone position={[ 0, 1, -8]} label="About"      onOpen={() => setActive('about')} />

        <OrbitControls maxPolarAngle={Math.PI / 2.2} enablePan={false} />
      </Canvas>

      {active && <Overlay section={sections[active]} onClose={() => setActive(null)} />}

      <nav className="nav"><a href="/cv/">View CV →</a></nav>
    </>
  );
}
