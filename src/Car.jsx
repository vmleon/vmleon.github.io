import { useEffect, useRef } from 'react';
import { useBox } from '@react-three/cannon';
import { useFrame, useThree } from '@react-three/fiber';
import { Vector3 } from 'three';
import { useKeys } from './useKeys';

const CAR_SIZE = [1, 0.5, 2];

export default function Car() {
  const keys = useKeys();

  const [ref, api] = useBox(() => ({
    mass: 10,
    args: CAR_SIZE,
    position: [0, 1, 6],
    angularDamping: 0.9,
    linearDamping: 0.5,
    angularFactor: [0, 1, 0],
  }));

  const rot = useRef([0, 0, 0]);
  const pos = useRef([0, 1, 6]);

  useEffect(() => {
    const u1 = api.rotation.subscribe((v) => (rot.current = v));
    const u2 = api.position.subscribe((v) => (pos.current = v));
    return () => { u1(); u2(); };
  }, [api]);

  const { camera } = useThree();
  const camTarget = useRef(new Vector3());

  useFrame(() => {
    const { forward, backward, left, right } = keys.current;

    if (forward)  api.applyLocalForce([0, 0, -400], [0, 0, 0]);
    if (backward) api.applyLocalForce([0, 0,  200], [0, 0, 0]);
    if (left)  api.angularVelocity.set(0,  1.5, 0);
    if (right) api.angularVelocity.set(0, -1.5, 0);

    const [x, y, z] = pos.current;
    const yaw = rot.current[1];
    const cx = x + Math.sin(yaw) * 7;
    const cy = y + 4;
    const cz = z + Math.cos(yaw) * 7;
    camTarget.current.set(cx, cy, cz);
    camera.position.lerp(camTarget.current, 0.1);
    camera.lookAt(x, y, z);
  });

  return (
    <mesh ref={ref} castShadow>
      <boxGeometry args={CAR_SIZE} />
      <meshStandardMaterial color="#ef4444" />
    </mesh>
  );
}
