import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { useSpring, animated } from '@react-spring/three';
import { Text, Float, PerspectiveCamera, OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { gsap } from 'gsap';

// Animated floating cube component
const FloatingCube = ({ position, color, size = 1, speed = 1, onClick, isActive }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  // Animation with react-spring
  const springs = useSpring({
    scale: hovered ? [1.2, 1.2, 1.2] : [1, 1, 1],
    color: hovered ? '#ff6b6b' : color,
    rotation: isActive ? [Math.PI / 4, Math.PI / 4, 0] : [0, 0, 0],
    config: { mass: 2, tension: 300, friction: 20 }
  });

  // Continuous floating animation
  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * speed) * 0.2;
      mesh.current.rotation.x += 0.005 * speed;
      mesh.current.rotation.y += 0.01 * speed;
    }
  });

  return (
    <animated.mesh
      ref={mesh}
      position={position}
      scale={springs.scale}
      rotation={springs.rotation}
      onClick={onClick}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
    >
      <boxGeometry args={[size, size, size]} />
      <animated.meshStandardMaterial color={springs.color} metalness={0.5} roughness={0.2} />
    </animated.mesh>
  );
};

// Animated sphere component
const FloatingSphere = ({ position, color, size = 1, speed = 1 }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const springs = useSpring({
    scale: hovered ? [1.2, 1.2, 1.2] : [1, 1, 1],
    color: hovered ? '#5eead4' : color,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.y = position[1] + Math.cos(state.clock.elapsedTime * speed) * 0.3;
      mesh.current.rotation.z += 0.01 * speed;
    }
  });

  return (
    <animated.mesh
      ref={mesh}
      position={position}
      scale={springs.scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
    >
      <sphereGeometry args={[size, 32, 32]} />
      <animated.meshStandardMaterial 
        color={springs.color} 
        metalness={0.2} 
        roughness={0.1} 
        envMapIntensity={0.8} 
      />
    </animated.mesh>
  );
};

// Animated torus component
const FloatingTorus = ({ position, color, size = 1, speed = 1 }) => {
  const mesh = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const springs = useSpring({
    scale: hovered ? [1.2, 1.2, 1.2] : [1, 1, 1],
    color: hovered ? '#ffbe0b' : color,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  useFrame((state) => {
    if (mesh.current) {
      mesh.current.position.x = position[0] + Math.sin(state.clock.elapsedTime * speed * 0.5) * 0.3;
      mesh.current.rotation.y += 0.01 * speed;
      mesh.current.rotation.z += 0.005 * speed;
    }
  });

  return (
    <animated.mesh
      ref={mesh}
      position={position}
      scale={springs.scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
      castShadow
    >
      <torusGeometry args={[size, size/3, 16, 50]} />
      <animated.meshStandardMaterial 
        color={springs.color} 
        metalness={0.3} 
        roughness={0.4} 
      />
    </animated.mesh>
  );
};

// Animated text component
const AnimatedText = ({ text, position, color = '#ffffff', size = 0.5 }) => {
  const textRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  
  const springs = useSpring({
    scale: hovered ? [1.2, 1.2, 1.2] : [1, 1, 1],
    color: hovered ? '#fb7185' : color,
    config: { mass: 1, tension: 280, friction: 60 }
  });

  useFrame((state) => {
    if (textRef.current) {
      textRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
    }
  });

  return (
    <animated.group
      ref={textRef}
      position={position}
      scale={springs.scale}
      onPointerOver={() => setHovered(true)}
      onPointerOut={() => setHovered(false)}
    >
      <Text
        color={springs.color}
        fontSize={size}
        font="/fonts/Inter-Bold.woff"
        anchorX="center"
        anchorY="middle"
      >
        {text}
      </Text>
    </animated.group>
  );
};

// Particles system
const ParticleSystem = ({ count = 100, color = '#ffffff', size = 0.05 }) => {
  const particles = useRef<THREE.Points>(null);
  const [positions, setPositions] = useState<Float32Array | null>(null);
  
  useEffect(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const i3 = i * 3;
      positions[i3] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = (Math.random() - 0.5) * 10;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;
    }
    setPositions(positions);
  }, [count]);

  useFrame((state) => {
    if (particles.current) {
      particles.current.rotation.y += 0.001;
      particles.current.rotation.x += 0.0005;
    }
  });

  if (!positions) return null;

  return (
    <points ref={particles}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={size}
        color={color}
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
};

// Main scene component
const Scene = () => {
  const [activeIndex, setActiveIndex] = useState(-1);
  const { camera } = useThree();
  const cameraRef = useRef(camera);
  
  const handleCubeClick = (index: number) => {
    setActiveIndex(index === activeIndex ? -1 : index);
    
    // Camera animation with GSAP
    if (index !== activeIndex) {
      const positions = [
        [0, 0, 5],  // Default
        [-3, 1, 4],  // Cube 0
        [0, 2, 4],   // Cube 1
        [3, 1, 4],   // Cube 2
      ];
      
      gsap.to(cameraRef.current.position, {
        x: positions[index + 1][0],
        y: positions[index + 1][1],
        z: positions[index + 1][2],
        duration: 1,
        ease: "power3.inOut"
      });
    } else {
      // Reset camera position
      gsap.to(cameraRef.current.position, {
        x: 0,
        y: 0,
        z: 7,
        duration: 1,
        ease: "power3.inOut"
      });
    }
  };

  return (
    <>
      <PerspectiveCamera makeDefault position={[0, 0, 7]} ref={cameraRef} />
      <OrbitControls enableZoom={false} enablePan={false} />
      
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
      <directionalLight position={[-10, -10, -5]} intensity={0.5} />
      
      <ParticleSystem count={200} color="#8b5cf6" size={0.03} />
      
      <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
        <FloatingCube 
          position={[-3, 0, 0]} 
          color="#3b82f6" 
          size={1.2} 
          speed={1.2} 
          onClick={() => handleCubeClick(0)}
          isActive={activeIndex === 0}
        />
        <AnimatedText 
          text="EXPLORE" 
          position={[-3, -1.5, 0]} 
          color="#93c5fd" 
          size={0.3}
        />
      </Float>
      
      <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.4}>
        <FloatingCube 
          position={[0, 0, 0]} 
          color="#ec4899" 
          size={1.2} 
          speed={1} 
          onClick={() => handleCubeClick(1)}
          isActive={activeIndex === 1}
        />
        <AnimatedText 
          text="CREATE" 
          position={[0, -1.5, 0]} 
          color="#fbcfe8" 
          size={0.3}
        />
      </Float>
      
      <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.6}>
        <FloatingCube 
          position={[3, 0, 0]} 
          color="#10b981" 
          size={1.2} 
          speed={0.8} 
          onClick={() => handleCubeClick(2)}
          isActive={activeIndex === 2}
        />
        <AnimatedText 
          text="SHARE" 
          position={[3, -1.5, 0]} 
          color="#6ee7b7" 
          size={0.3}
        />
      </Float>
      
      <FloatingSphere position={[-2, 2, -2]} color="#f59e0b" size={0.6} speed={1.3} />
      <FloatingSphere position={[2, -2, -1]} color="#8b5cf6" size={0.8} speed={0.9} />
      <FloatingTorus position={[2.5, 2, -1]} color="#06b6d4" size={0.7} speed={1.1} />
      <FloatingTorus position={[-2.5, -1.5, -2]} color="#ef4444" size={0.5} speed={1.4} />
    </>
  );
};

// Main component that wraps the Canvas
const AnimatedScene: React.FC = () => {
  return (
    <div className="w-full h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-violet-800">
      <Canvas shadows>
        <Scene />
      </Canvas>
      <div className="absolute bottom-4 left-0 right-0 text-center text-white text-lg font-bold">
        Click on the shapes to interact
      </div>
    </div>
  );
};

export default AnimatedScene;