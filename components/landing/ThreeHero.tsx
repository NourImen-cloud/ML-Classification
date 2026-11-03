'use client';

import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function ThreeHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene, Camera, Renderer
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 1000);
    camera.position.set(0, 0, 75);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    container.appendChild(renderer.domElement);

    // Group to hold our data points and decision hyperplane
    const group = new THREE.Group();
    scene.add(group);

    // Create 3D Classification Clusters (Class 0: Green/Cyan, Class 1: Coral/Purple)
    const count = 180;
    const geometry0 = new THREE.BufferGeometry();
    const geometry1 = new THREE.BufferGeometry();

    const positions0: number[] = [];
    const positions1: number[] = [];

    for (let i = 0; i < count; i++) {
      // Cluster 0: Centered around (-18, -12, 0) with noise
      const x0 = -18 + (Math.random() - 0.5) * 32;
      const y0 = -12 + (Math.random() - 0.5) * 28;
      const z0 = (Math.random() - 0.5) * 24;
      positions0.push(x0, y0, z0);

      // Cluster 1: Centered around (+18, +14, 0) with noise
      const x1 = 18 + (Math.random() - 0.5) * 32;
      const y1 = 14 + (Math.random() - 0.5) * 28;
      const z1 = (Math.random() - 0.5) * 24;
      positions1.push(x1, y1, z1);
    }

    geometry0.setAttribute('position', new THREE.Float32BufferAttribute(positions0, 3));
    geometry1.setAttribute('position', new THREE.Float32BufferAttribute(positions1, 3));

    // Particle materials
    const pMaterial0 = new THREE.PointsMaterial({
      color: 0x06D6A0,
      size: 2.2,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const pMaterial1 = new THREE.PointsMaterial({
      color: 0xFF6B6B,
      size: 2.2,
      transparent: true,
      opacity: 0.85,
      blending: THREE.AdditiveBlending,
    });

    const points0 = new THREE.Points(geometry0, pMaterial0);
    const points1 = new THREE.Points(geometry1, pMaterial1);
    group.add(points0);
    group.add(points1);

    // Decision boundary 3D plane (Hyperplane separating the 2 classes)
    const planeGeo = new THREE.PlaneGeometry(80, 50, 16, 16);
    const planeMat = new THREE.MeshBasicMaterial({
      color: 0x00D4FF,
      wireframe: true,
      transparent: true,
      opacity: 0.22,
    });
    const plane = new THREE.Mesh(planeGeo, planeMat);
    plane.rotation.z = Math.PI / 4.2;
    group.add(plane);

    // Glowing coordinate axes
    const axisMat = new THREE.LineBasicMaterial({ color: 0x243B6E, transparent: true, opacity: 0.4 });
    const lineX = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(-45, 0, 0), new THREE.Vector3(45, 0, 0)]),
      axisMat
    );
    const lineY = new THREE.Line(
      new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(0, -35, 0), new THREE.Vector3(0, 35, 0)]),
      axisMat
    );
    group.add(lineX);
    group.add(lineY);

    // Mouse interactivity
    let mouseX = 0;
    let mouseY = 0;
    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseX = ((e.clientX - rect.left) / width - 0.5) * 2;
      mouseY = -((e.clientY - rect.top) / height - 0.5) * 2;
    };
    window.addEventListener('mousemove', onMouseMove);

    // Resize handler
    const onResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', onResize);

    // Animation loop
    let animId: number;
    const animate = () => {
      animId = requestAnimationFrame(animate);

      // Gentle rotation
      group.rotation.y += 0.003;
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, mouseY * 0.35, 0.05);
      group.rotation.y = THREE.MathUtils.lerp(group.rotation.y, group.rotation.y + mouseX * 0.02, 0.05);

      // Plane gentle oscillation
      plane.rotation.y = Math.sin(Date.now() * 0.001) * 0.1;

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('resize', onResize);
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
      renderer.dispose();
      geometry0.dispose();
      geometry1.dispose();
      planeGeo.dispose();
      pMaterial0.dispose();
      pMaterial1.dispose();
      planeMat.dispose();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-0 overflow-hidden opacity-75"
      style={{ filter: 'drop-shadow(0 0 30px rgba(0, 212, 255, 0.15))' }}
    />
  );
}
