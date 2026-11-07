import { useMemo, useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useReducedMotion } from "@/hooks/useReducedMotion";

interface Graph {
  nodes: Float32Array;
  links: Float32Array;
}

function buildGraph(count: number, radius: number, linkDistance: number): Graph {
  const vectors: THREE.Vector3[] = [];
  const nodes: number[] = [];

  for (let i = 0; i < count; i += 1) {
    const v = new THREE.Vector3(
      Math.random() * 2 - 1,
      Math.random() * 2 - 1,
      Math.random() * 2 - 1
    )
      .normalize()
      .multiplyScalar(radius * (0.45 + Math.random() * 0.55));
    vectors.push(v);
    nodes.push(v.x, v.y, v.z);
  }

  const links: number[] = [];
  for (let i = 0; i < vectors.length; i += 1) {
    for (let j = i + 1; j < vectors.length; j += 1) {
      if (vectors[i].distanceTo(vectors[j]) < linkDistance) {
        links.push(
          vectors[i].x,
          vectors[i].y,
          vectors[i].z,
          vectors[j].x,
          vectors[j].y,
          vectors[j].z
        );
      }
    }
  }

  return {
    nodes: new Float32Array(nodes),
    links: new Float32Array(links),
  };
}

interface NetworkProps {
  count?: number;
  radius?: number;
  reduced: boolean;
  nodeColor?: string;
  lineColor?: string;
}

function Network({
  count = 78,
  radius = 3.3,
  reduced,
  nodeColor = "#173B35",
  lineColor = "#D77B5B",
}: NetworkProps) {
  const group = useRef<THREE.Group>(null);
  const { pointer } = useThree();
  const graph = useMemo(() => buildGraph(count, radius, 1.95), [count, radius]);

  useFrame((_, delta) => {
    if (!group.current || reduced) return;
    group.current.rotation.y += delta * 0.06;
    group.current.rotation.x += delta * 0.015;
    // Subtle pointer parallax.
    group.current.rotation.z = THREE.MathUtils.lerp(
      group.current.rotation.z,
      pointer.x * 0.18,
      0.03
    );
    group.current.position.y = THREE.MathUtils.lerp(
      group.current.position.y,
      pointer.y * 0.3,
      0.03
    );
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[graph.nodes, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.075}
          color={nodeColor}
          sizeAttenuation
          transparent
          opacity={0.9}
        />
      </points>

      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[graph.links, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={lineColor} transparent opacity={0.16} />
      </lineSegments>
    </group>
  );
}

interface NeuralNetworkProps {
  className?: string;
}

/** Abstract interconnected neural network rendered with React Three Fiber. */
export default function NeuralNetwork({ className }: NeuralNetworkProps) {
  const reduced = useReducedMotion();

  return (
    <div className={className} aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, 1.6]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
        frameloop={reduced ? "demand" : "always"}
      >
        <Network reduced={reduced} />
      </Canvas>
    </div>
  );
}
