import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

// Tokyo Night color palette
const COLORS = {
  blue: 0x7aa2f7,
  purple: 0xbb9af7,
  cyan: 0x7dcfff,
  teal: 0x73daca,
  orange: 0xff9e64,
  pink: 0xf7768e,
  bg: 0x1a1b26,
  bgDark: 0x0f0f14,
};

const TerminalAnimations: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [bootComplete, setBootComplete] = useState(false);
  const [showBoot, setShowBoot] = useState(true);
  const mouseRef = useRef({ x: 0, y: 0 });

  // Boot Animation Component
  const BootAnimation = () => {
    const [lines, setLines] = useState<string[]>([]);
    const [scanlinePos, setScanlinePos] = useState(0);
    const [showScanline, setShowScanline] = useState(false);

    useEffect(() => {
      const bootLines = [
        'BIOS v3.14.159 - Portfolio Systems Inc.',
        'Checking memory... 16384 MB OK',
        'Detecting devices...',
        '  [OK] TypeScript Compiler v5.0',
        '  [OK] React Runtime v18.2',
        '  [OK] Node.js Engine v22.x',
        '  [OK] Three.js Graphics v0.182',
        'Loading personality matrix...',
        'Initializing developer profile...',
        '',
        'Welcome to phaneendra@portfolio',
        'Starting terminal interface...',
      ];

      let lineIndex = 0;
      const typeInterval = setInterval(() => {
        if (lineIndex < bootLines.length) {
          setLines(prev => [...prev, bootLines[lineIndex]]);
          lineIndex++;
        } else {
          clearInterval(typeInterval);
          // Brief pause before scanline
          setTimeout(() => {
            setShowScanline(true);
            
            // Animate scanline - slower sweep
            let pos = 0;
            const scanInterval = setInterval(() => {
              pos += 2; // Slower: was 5
              setScanlinePos(pos);
              if (pos >= 100) {
                clearInterval(scanInterval);
                setTimeout(() => {
                  setShowBoot(false);
                  setBootComplete(true);
                }, 400); // Longer fade delay
              }
            }, 25); // Slower: was 20
          }, 500); // 500ms pause before scanline
        }
      }, 150); // Slower line typing: was 80ms

      return () => clearInterval(typeInterval);
    }, []);

    return (
      <div className="fixed inset-0 z-[9999] bg-[#0f0f14] flex items-center justify-center overflow-hidden">
        {/* CRT Overlay */}
        <div className="absolute inset-0 pointer-events-none opacity-10"
          style={{
            background: 'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)',
          }}
        />
        
        {/* Boot Text */}
        <div className="font-mono text-sm text-[#7aa2f7] max-w-2xl w-full px-8">
          {lines.map((line, i) => (
            <div key={i} className="leading-relaxed">
              {line.startsWith('  [OK]') ? (
                <>
                  <span className="text-[#73daca]">  [OK]</span>
                  <span className="text-[#a9b1d6]">{line.slice(6)}</span>
                </>
              ) : line.startsWith('Welcome') ? (
                <span className="text-[#bb9af7] font-bold">{line}</span>
              ) : (
                line
              )}
            </div>
          ))}
          {lines.length > 0 && lines.length < 12 && (
            <span className="inline-block w-2 h-4 bg-[#7aa2f7] animate-pulse ml-1" />
          )}
        </div>

        {/* Scanline Sweep */}
        {showScanline && (
          <div
            className="absolute left-0 right-0 h-1 bg-gradient-to-b from-transparent via-[#7dcfff] to-transparent opacity-80"
            style={{ top: `${scanlinePos}%`, boxShadow: '0 0 20px #7dcfff' }}
          />
        )}
      </div>
    );
  };

  // Three.js Animations
  useEffect(() => {
    if (!containerRef.current || !bootComplete) return;

    const container = containerRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 100;

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // ============================================
    // ORBITING TECH ICONS (as glowing spheres)
    // ============================================
    const techIcons: { mesh: THREE.Mesh; angle: number; speed: number; radius: number; height: number }[] = [];
    const iconColors = [COLORS.blue, COLORS.purple, COLORS.cyan, COLORS.teal, COLORS.orange, COLORS.pink];
    const iconCount = 8;

    for (let i = 0; i < iconCount; i++) {
      const geometry = new THREE.SphereGeometry(2, 16, 16);
      const material = new THREE.MeshBasicMaterial({
        color: iconColors[i % iconColors.length],
        transparent: true,
        opacity: 0.8,
      });
      const sphere = new THREE.Mesh(geometry, material);

      // Create glow effect
      const glowGeometry = new THREE.SphereGeometry(3, 16, 16);
      const glowMaterial = new THREE.MeshBasicMaterial({
        color: iconColors[i % iconColors.length],
        transparent: true,
        opacity: 0.2,
      });
      const glow = new THREE.Mesh(glowGeometry, glowMaterial);
      sphere.add(glow);

      const angle = (i / iconCount) * Math.PI * 2;
      const radius = 60 + Math.random() * 20;
      const height = (Math.random() - 0.5) * 40;

      sphere.position.set(
        Math.cos(angle) * radius,
        height,
        Math.sin(angle) * radius - 50
      );

      scene.add(sphere);
      techIcons.push({
        mesh: sphere,
        angle,
        speed: 0.002 + Math.random() * 0.003,
        radius,
        height,
      });
    }

    // ============================================
    // GEOMETRIC CORNER DECORATIONS
    // ============================================
    const cornerPieces: { mesh: THREE.Mesh; rotSpeed: THREE.Vector3 }[] = [];
    const corners = [
      { x: -70, y: 45 },  // Top-left
      { x: 70, y: 45 },   // Top-right
      { x: -70, y: -45 }, // Bottom-left
      { x: 70, y: -45 },  // Bottom-right
    ];

    corners.forEach((pos, i) => {
      const geometries = [
        new THREE.TetrahedronGeometry(4),
        new THREE.OctahedronGeometry(3),
        new THREE.IcosahedronGeometry(3),
        new THREE.TetrahedronGeometry(4),
      ];

      const material = new THREE.MeshBasicMaterial({
        color: iconColors[i % iconColors.length],
        wireframe: true,
        transparent: true,
        opacity: 0.6,
      });

      const mesh = new THREE.Mesh(geometries[i], material);
      mesh.position.set(pos.x, pos.y, -30);

      scene.add(mesh);
      cornerPieces.push({
        mesh,
        rotSpeed: new THREE.Vector3(
          0.005 + Math.random() * 0.01,
          0.005 + Math.random() * 0.01,
          0.005 + Math.random() * 0.01
        ),
      });
    });

    // ============================================
    // CURSOR FOLLOWER
    // ============================================
    const cursorGeometry = new THREE.SphereGeometry(1.5, 16, 16);
    const cursorMaterial = new THREE.MeshBasicMaterial({
      color: COLORS.cyan,
      transparent: true,
      opacity: 0.9,
    });
    const cursorOrb = new THREE.Mesh(cursorGeometry, cursorMaterial);

    // Cursor glow
    const cursorGlowGeometry = new THREE.SphereGeometry(3, 16, 16);
    const cursorGlowMaterial = new THREE.MeshBasicMaterial({
      color: COLORS.cyan,
      transparent: true,
      opacity: 0.3,
    });
    const cursorGlow = new THREE.Mesh(cursorGlowGeometry, cursorGlowMaterial);
    cursorOrb.add(cursorGlow);

    cursorOrb.position.z = 20;
    scene.add(cursorOrb);

    // Cursor trail
    const trailCount = 8;
    const trail: THREE.Mesh[] = [];
    for (let i = 0; i < trailCount; i++) {
      const trailGeometry = new THREE.SphereGeometry(0.8 - i * 0.08, 8, 8);
      const trailMaterial = new THREE.MeshBasicMaterial({
        color: COLORS.purple,
        transparent: true,
        opacity: 0.4 - i * 0.04,
      });
      const trailOrb = new THREE.Mesh(trailGeometry, trailMaterial);
      trailOrb.position.z = 20;
      scene.add(trailOrb);
      trail.push(trailOrb);
    }

    // Mouse move handler
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 160;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 100;
    };
    window.addEventListener('mousemove', handleMouseMove);

    // ============================================
    // ANIMATION LOOP
    // ============================================
    let frameId: number;
    const trailPositions: { x: number; y: number }[] = Array(trailCount).fill({ x: 0, y: 0 });

    const animate = () => {
      frameId = requestAnimationFrame(animate);

      // Update orbiting icons
      techIcons.forEach((icon) => {
        icon.angle += icon.speed;
        icon.mesh.position.x = Math.cos(icon.angle) * icon.radius;
        icon.mesh.position.z = Math.sin(icon.angle) * icon.radius - 50;
        icon.mesh.position.y = icon.height + Math.sin(icon.angle * 2) * 3;
        icon.mesh.rotation.y += 0.02;
      });

      // Update corner pieces
      cornerPieces.forEach((piece) => {
        piece.mesh.rotation.x += piece.rotSpeed.x;
        piece.mesh.rotation.y += piece.rotSpeed.y;
        piece.mesh.rotation.z += piece.rotSpeed.z;
      });

      // Update cursor follower with smooth easing
      cursorOrb.position.x += (mouseRef.current.x - cursorOrb.position.x) * 0.08;
      cursorOrb.position.y += (mouseRef.current.y - cursorOrb.position.y) * 0.08;

      // Update trail
      for (let i = trailCount - 1; i > 0; i--) {
        trailPositions[i] = { ...trailPositions[i - 1] };
      }
      trailPositions[0] = { x: cursorOrb.position.x, y: cursorOrb.position.y };

      trail.forEach((orb, i) => {
        orb.position.x = trailPositions[i].x;
        orb.position.y = trailPositions[i].y;
      });

      renderer.render(scene, camera);
    };
    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      container.removeChild(renderer.domElement);
      renderer.dispose();
    };
  }, [bootComplete]);

  return (
    <>
      {/* Boot Animation */}
      {showBoot && <BootAnimation />}

      {/* Three.js Canvas Container */}
      <div
        ref={containerRef}
        className="fixed inset-0 -z-10 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse at center, #1a1b26 0%, #0f0f14 100%)',
          opacity: bootComplete ? 1 : 0,
          transition: 'opacity 0.5s ease-in-out',
        }}
      />
    </>
  );
};

export default TerminalAnimations;
