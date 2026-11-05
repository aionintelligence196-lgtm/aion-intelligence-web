import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sparkles, Icosahedron, Torus } from '@react-three/drei';
import { EffectComposer, Bloom } from '@react-three/postprocessing';
import * as THREE from 'three';

// The central glowing core
const Core = () => {
  const coreRef = useRef();

  useFrame(({ clock }) => {
    // Continuous slow rotation
    coreRef.current.rotation.y += 0.005;
    coreRef.current.rotation.x += 0.005;
    
    // Pulsing scale effect
    const scale = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.05;
    coreRef.current.scale.set(scale, scale, scale);
  });

  return (
    <Icosahedron ref={coreRef} args={[1, 0]} >
      <meshStandardMaterial 
        color="#00ff00" // Aion neon green
        emissive="#00ff00" 
        emissiveIntensity={2} 
        wireframe={true} 
      />
    </Icosahedron>
  );
};

// The rotating translucent shields
const Shields = () => {
  const shield1 = useRef();
  const shield2 = useRef();
  const shield3 = useRef();

  useFrame(() => {
    shield1.current.rotation.x += 0.004;
    shield1.current.rotation.y += 0.006;
    
    shield2.current.rotation.x -= 0.005;
    shield2.current.rotation.z += 0.004;

    shield3.current.rotation.y -= 0.003;
    shield3.current.rotation.z -= 0.005;
  });

  const shieldMaterial = new THREE.MeshPhysicalMaterial({
    color: "#00ff00",
    transparent: true,
    opacity: 0.1,
    roughness: 0.1,
    transmission: 0.9, // Glass-like effect
    thickness: 0.5,
  });

  return (
    <>
      <Torus ref={shield1} args={[1.8, 0.02, 16, 100]} material={shieldMaterial} />
      <Torus ref={shield2} args={[2.2, 0.02, 16, 100]} material={shieldMaterial} />
      <Torus ref={shield3} args={[2.6, 0.02, 16, 100]} material={shieldMaterial} />
    </>
  );
};

// Main Canvas Setup
const CyberCore = () => {
  return (
    <div className="w-full h-full min-h-[500px] cursor-grab active:cursor-grabbing">
      <Canvas camera={{ position: [0, 0, 5], fov: 60 }}>
        <color attach="background" args={['#000000']} />
        
        <ambientLight intensity={0.5} />
        
        <Core />
        <Shields />
        
        {/* The floating encrypted network packets */}
        <Sparkles 
          count={150} 
          scale={6} 
          size={2} 
          speed={0.4} 
          color="#00ff00" 
        />

        {/* Adds the UE5-style neon glow */}
        <EffectComposer>
          <Bloom luminanceThreshold={0.2} luminanceSmoothing={0.9} height={300} />
        </EffectComposer>

        {/* Allows the user to slowly drag and look around it */}
        <OrbitControls 
          enableZoom={false} 
          enablePan={false} 
          autoRotate={true} 
          autoRotateSpeed={0.5} 
        />
      </Canvas>
    </div>
  );
};

export default CyberCore;