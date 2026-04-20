import { useBox } from '@react-three/cannon';
import { Text } from '@react-three/drei';

const SIZE = [3, 2, 3];

export default function Zone({ position, label, color, onEnter }) {
  const [ref] = useBox(() => ({
    type: 'Static',
    args: SIZE,
    position,
    collisionResponse: false,
    onCollideBegin: onEnter,
  }));

  return (
    <>
      <mesh ref={ref}>
        <boxGeometry args={SIZE} />
        <meshStandardMaterial color={color} transparent opacity={0.4} />
      </mesh>
      <Text
        position={[position[0], position[1] + 2, position[2]]}
        fontSize={0.5}
        anchorX="center"
      >
        {label}
      </Text>
    </>
  );
}
