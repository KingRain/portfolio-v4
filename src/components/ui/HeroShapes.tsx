"use client";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { Mesh, LineSegments, Vector3 } from "three";

export default function HeroShapes() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current) return;

    // ----- Three.js boilerplate
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      canvasRef.current.clientWidth / canvasRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 16;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    renderer.setSize(
      canvasRef.current.clientWidth,
      canvasRef.current.clientHeight
    );
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // Less metallic material for all shapes
    const mainMaterial = new THREE.MeshStandardMaterial({
      color: 0x000000,
      roughness: 0.7, // Increased roughness to reduce metallic look
      metalness: 0.05, // Significantly reduced metalness
    });

    // Colors for outlines - using bold colors
    const outlineColors = [
      0x0000ff, // standard blue
      0x1e90ff, // dodger blue
      0x00bfff, // deep sky blue
      0x87ceeb, // sky blue
    ];

    const meshes: Mesh[] = [];
    const outlines: LineSegments[] = [];
    const velocities: Vector3[] = [];
    const targetVelocities: Vector3[] = [];
    const count = 10; // Number of objects

    // Create shapes - only cubes and pyramids
    for (let i = 0; i < count; i++) {
      // Randomly decide between cube and pyramid
      const size = 0.3 + Math.random() * 1; // Smaller sizes

      const isShape = Math.random() > 0.5;

      // Create geometry - either cube or pyramid
      const geo = isShape
        ? new THREE.BoxGeometry(size, size, size, 4, 4, 4)
        : new THREE.TetrahedronGeometry(size);

      const mesh = new THREE.Mesh(geo, mainMaterial);

      // Position away from the center of the screen
      let x = (Math.random() - 0.5) * 20; // wider spread
      let y = (Math.random() - 0.5) * 12;

      // Ensure distance from center (camera)
      const minDistFromCenter = 5;
      const distFromCenter = Math.sqrt(x * x + y * y);

      if (distFromCenter < minDistFromCenter) {
        // If too close to center, push it outward
        const angle = Math.atan2(y, x);
        x = Math.cos(angle) * minDistFromCenter * (1 + Math.random() * 0.5);
        y = Math.sin(angle) * minDistFromCenter * (1 + Math.random() * 0.5);
      }

      // Keep z position away from camera (which is at z=16)
      const z = (Math.random() - 0.5) * 8;
      // Ensure z is not too close to the camera
      const minZDistance = 6; // Minimum distance from camera
      if (z > camera.position.z - minZDistance) {
        mesh.position.z = camera.position.z - minZDistance - Math.random() * 2;
      } else {
        mesh.position.z = z;
      }

      mesh.position.x = x;
      mesh.position.y = y;

      // Create dotted outline with 2px thickness
      const color =
        outlineColors[Math.floor(Math.random() * outlineColors.length)];
      const lineMaterial = new THREE.LineDashedMaterial({
        color: color,
        dashSize: 0.2,
        gapSize: 0.1,
        linewidth: 2, // Note: linewidth has limited browser support
      });

      const edges = new THREE.EdgesGeometry(geo);
      const line = new THREE.LineSegments(edges, lineMaterial);

      // Compute line distances for dashed lines
      line.computeLineDistances();

      line.position.copy(mesh.position);
      line.rotation.copy(mesh.rotation);
      line.scale.copy(mesh.scale);

      scene.add(mesh);
      scene.add(line);

      meshes.push(mesh);
      outlines.push(line);

      // Very gentle initial velocity
      const vel = new THREE.Vector3(
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.015,
        (Math.random() - 0.5) * 0.008
      );
      velocities.push(vel);
      targetVelocities.push(vel.clone());
    }

    // ----- Lights
    scene.add(new THREE.AmbientLight(0xffffff, 0.8));
    const dir = new THREE.DirectionalLight(0xffffff, 0.9);
    dir.position.set(5, 6, 5);
    scene.add(dir);

    // Create floating animation for each shape
    meshes.forEach((mesh, i) => {
      const outline = outlines[i];

      // Random floating movement in a continuous loop
      gsap.to(mesh.rotation, {
        x: Math.PI * 2 * (Math.random() < 0.5 ? 1 : -1),
        y: Math.PI * 2 * (Math.random() < 0.5 ? 1 : -1),
        z: Math.PI * 2 * (Math.random() < 0.5 ? 1 : -1),
        duration: 20 + Math.random() * 30,
        ease: "sine.inOut",
        repeat: -1,
        onUpdate: () => {
          outline.rotation.copy(mesh.rotation);
        },
      });
    });

    // ----- Render loop with smooth movement
    let lastTime = 0;
    const tick = (currentTime: number) => {
      // Calculate deltaTime for framerate-independent animation
      const deltaTime = lastTime ? (currentTime - lastTime) / 1000 : 0.016;
      lastTime = currentTime;

      // Use deltaTime to scale velocity changes for consistent animation speed
      const boundsLimit = 14;
      const minCameraDistance = 6;

      // Update positions based on velocities
      for (let i = 0; i < meshes.length; i++) {
        // Apply velocity scaled by deltaTime
        const scaledVelocity = velocities[i]
          .clone()
          .multiplyScalar(deltaTime * 60);
        meshes[i].position.add(scaledVelocity);
        outlines[i].position.copy(meshes[i].position);

        // Wrap-around behavior when objects go out of bounds
        if (meshes[i].position.x > boundsLimit + 2) {
          meshes[i].position.x = -boundsLimit;
        } else if (meshes[i].position.x < -boundsLimit - 2) {
          meshes[i].position.x = boundsLimit;
        }

        if (meshes[i].position.y > boundsLimit + 2) {
          meshes[i].position.y = -boundsLimit;
        } else if (meshes[i].position.y < -boundsLimit - 2) {
          meshes[i].position.y = boundsLimit;
        }

        if (meshes[i].position.z > boundsLimit + 2) {
          meshes[i].position.z = -boundsLimit;
        } else if (meshes[i].position.z < -boundsLimit - 2) {
          meshes[i].position.z = boundsLimit;
        }

        // Keep objects away from camera with smooth transition
        if (meshes[i].position.z > camera.position.z - minCameraDistance) {
          meshes[i].position.z = camera.position.z - minCameraDistance - 1;
          if (targetVelocities[i].z > 0) {
            targetVelocities[i].z =
              -Math.abs(targetVelocities[i].z) * (0.8 + Math.random() * 0.4);
          }
        }

        outlines[i].position.copy(meshes[i].position);

        // Occasionally change direction slightly to create more natural movement
        if (Math.random() < 0.005) {
          targetVelocities[i].x += (Math.random() - 0.5) * 0.01;
          targetVelocities[i].y += (Math.random() - 0.5) * 0.01;
          targetVelocities[i].z += (Math.random() - 0.5) * 0.005;
        }

        // Ensure velocity doesn't exceed max speed
        const maxSpeed = 0.03;
        const currentSpeed = targetVelocities[i].length();
        if (currentSpeed > maxSpeed) {
          targetVelocities[i].multiplyScalar(maxSpeed / currentSpeed);
        }
      }

      renderer.render(scene, camera);
      requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);

    // Resize handling
    const onResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      // Get the parent element (HeroSection) dimensions
      const rect =
        canvas.parentElement?.getBoundingClientRect() ||
        canvas.getBoundingClientRect();
      camera.aspect = rect.width / rect.height;
      camera.updateProjectionMatrix();
      renderer.setSize(rect.width, rect.height);
    };
    window.addEventListener("resize", onResize);
    onResize();

    return () => {
      window.removeEventListener("resize", onResize);
      renderer.dispose();
      meshes.forEach((mesh) => mesh.geometry.dispose());
      mainMaterial.dispose();
      scene.traverse((object) => {
        if (object instanceof THREE.LineSegments) {
          (object.material as THREE.Material).dispose();
        }
      });
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
    />
  );
}
