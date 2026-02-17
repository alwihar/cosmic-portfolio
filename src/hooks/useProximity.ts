import { useFrame } from "@react-three/fiber";
import { useState, useRef } from "react";
import * as THREE from "three";

export function useProximity(
  targetPosition: THREE.Vector3,
  threshold: number = 5,
  characterRef?: React.RefObject<THREE.Object3D>
) {
  const [isNear, setIsNear] = useState(false);
  const [distance, setDistance] = useState(Infinity);
  const tempVec = useRef(new THREE.Vector3());

  useFrame(({ scene }) => {
    const character = characterRef?.current ?? scene.getObjectByName("character-root");
    if (!character) return;

    character.getWorldPosition(tempVec.current);
    const dist = tempVec.current.distanceTo(targetPosition);
    setDistance(dist);

    const near = dist < threshold;
    if (near !== isNear) {
      setIsNear(near);
    }
  });

  return { isNear, distance };
}
