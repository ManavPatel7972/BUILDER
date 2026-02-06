import { useEffect, useRef } from "react";
import * as THREE from "three";

export const AnimatedBackground = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    renderer.setClearColor(0x0f172a, 0.1);
    containerRef.current.appendChild(renderer.domElement);

    camera.position.z = 5;

    // Create floating geometric shapes
    const geometries = [
      new THREE.OctahedronGeometry(1, 0),
      new THREE.TetrahedronGeometry(1),
      new THREE.IcosahedronGeometry(1, 0),
    ];

    const shapes = [];

    for (let i = 0; i < 5; i++) {
      const geometry = geometries[Math.floor(Math.random() * geometries.length)];
      const material = new THREE.MeshPhongMaterial({
        color: new THREE.Color().setHSL(0.55, 0.8, 0.5 + Math.random() * 0.2), // Blue to cyan
        wireframe: false,
        emissive: new THREE.Color().setHSL(
          0.55,
          0.8,
          0.3 + Math.random() * 0.2
        ),
      });

      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.x = (Math.random() - 0.5) * 10;
      mesh.position.y = (Math.random() - 0.5) * 10;
      mesh.position.z = (Math.random() - 0.5) * 10;

      mesh.userData = {
        velocity: {
          x: (Math.random() - 0.5) * 0.02,
          y: (Math.random() - 0.5) * 0.02,
          z: (Math.random() - 0.5) * 0.02,
        },
        rotationVelocity: {
          x: (Math.random() - 0.5) * 0.005,
          y: (Math.random() - 0.5) * 0.005,
          z: (Math.random() - 0.5) * 0.005,
        },
      };

      scene.add(mesh);
      shapes.push(mesh);
    }

    // Add lighting
    const light1 = new THREE.PointLight(0x4dd0e1, 1, 100);
    light1.position.set(5, 5, 5);
    scene.add(light1);

    const light2 = new THREE.PointLight(0x0096d6, 0.8, 100);
    light2.position.set(-5, -5, 5);
    scene.add(light2);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    // Handle resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      shapes.forEach((shape) => {
        // Update position
        shape.position.x += shape.userData.velocity.x;
        shape.position.y += shape.userData.velocity.y;
        shape.position.z += shape.userData.velocity.z;

        // Update rotation
        shape.rotation.x += shape.userData.rotationVelocity.x;
        shape.rotation.y += shape.userData.rotationVelocity.y;
        shape.rotation.z += shape.userData.rotationVelocity.z;

        // Bounce off boundaries
        const boundary = 6;
        if (shape.position.x > boundary || shape.position.x < -boundary) {
          shape.userData.velocity.x *= -1;
        }
        if (shape.position.y > boundary || shape.position.y < -boundary) {
          shape.userData.velocity.y *= -1;
        }
        if (shape.position.z > boundary || shape.position.z < -boundary) {
          shape.userData.velocity.z *= -1;
        }
      });

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (containerRef.current && renderer.domElement.parentNode) {
        containerRef.current.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900"
    />
  );
};
