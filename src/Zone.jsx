import { useState } from 'react';
import { Text } from '@react-three/drei';

export default function Zone({ position, label, onOpen }) {
  const [hovered, setHovered] = useState(false);

  return (
    <group position={position}>
      <mesh
        castShadow
        onClick={onOpen}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'auto'; }}
      >
        <boxGeometry args={[3, 2, 3]} />
        <meshStandardMaterial color={hovered ? '#f97316' : '#3b82f6'} />
      </mesh>
      <Text position={[0, 2, 0]} fontSize={0.5} anchorX="center">{label}</Text>
    </group>
  );
}
